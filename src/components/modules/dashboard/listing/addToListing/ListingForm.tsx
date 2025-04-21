'use client'

import { useState } from 'react'
import {
  useForm,
  useFieldArray,
  SubmitHandler,
  FieldValues,
} from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Plus } from 'lucide-react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'

import {
  ListingCategory,
  ListingCondition,
  ListingStatus,
} from '@/types/listings/listing'
import { categoriesArray, conditionArray, locationArray, statusArray } from '@/constant'
import { addListingItem, updateListingItem } from '@/services/listings'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { createListingSchema, editListingSchema } from './listingFormSchema'


type ListingFormProps = {
  initialData?: Partial<FieldValues> // Used in edit mode
  isEditMode?: boolean
}

export default function ListingForm({
  initialData,
  isEditMode = false,
}: ListingFormProps) {
  const router = useRouter()

  const [categories] = useState<ListingCategory[]>(categoriesArray)
  const [conditions] = useState<ListingCondition[]>(conditionArray)
  const [statuses] = useState<ListingStatus[]>(statusArray)
  const [locations] = useState<string[]>(locationArray)

  const [selectedLocation, setSelectedLocation] = useState<string>(
    isEditMode && initialData?.location === 'Other' ? 'Other' : '',
  )

  const form = useForm<z.infer<typeof editListingSchema>>({
    resolver: zodResolver(isEditMode ? editListingSchema : createListingSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      price: initialData?.price?.toString() || '',
      category: initialData?.category || '',
      condition: initialData?.condition || '',
      location: initialData?.location || '',
      ...(initialData?.location === 'Other' && {
        customLocation: initialData?.customLocation,
      }),
      ...(isEditMode && { status: initialData?.status }),
      images: initialData?.images?.map((url: string) => ({ value: url })) || [
        { value: '' },
      ],
    },
    mode: 'onChange', // 👈 this enables real-time validation
  })

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const {
    append: appendImage,
    remove: removeImage,
    fields: imageFields,
  } = useFieldArray({
    control,
    name: 'images',
  })

  const addImage = () => appendImage({ value: '' })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const images = data.images
      .map((img: { value: string }) => img.value)
      .filter((url: string ) => url.trim() !== '')


    const payload = {
      ...data,
      images,
      price: parseFloat(data.price),
      ...(data?.location === "Other" && {customLocation: data?.customLocation})
    }
    // console.log("submit the form like this: ",{payload});
    try {
      let res
      if (isEditMode && initialData?._id) {
        res = await updateListingItem(initialData._id, payload)
      } else {
        res = await addListingItem(payload)
      }

      if (res.success) {
        toast.success(res.message)
        router.push('/dashboard/user/listings')
      } else {
        toast.error(res.message)
      }
    } catch (error: unknown) {
      console.error(error)
      toast.error('Something went wrong!')
    }
  }

  return (
    <div className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl flex-grow max-w-2xl p-8 transition-all duration-300">
      <div className="flex items-center space-x-4 mb-5">
        <h1 className="text-xl font-bold">
          {isEditMode ? 'Edit Listing' : 'Add Listing'}
        </h1>
      </div>

      <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        {/* form container here */}
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center space-x-3 border-b pb-2 mb-5">
              <div className="w-1.5 h-6 bg-primary rounded-sm"></div>
              <h2 className="text-xl font-bold text-primary">
                Basic Information
              </h2>
            </div>

            {/* <div className="flex justify-between items-center border-t border-b py-3 my-5">
              <p className="text-primary font-bold text-xl">
                Basic Information
              </p>
            </div> */}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Title */}
              <FormField
                control={control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Listing Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Price */}
              <FormField
                control={control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category */}
              <FormField
                control={control}
                name="category"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Product Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((cat, i) => (
                          <SelectItem key={i} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Condition */}
              <FormField
                control={control}
                name="condition"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Condition</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Condition" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {conditions.map((cond, i) => (
                          <SelectItem key={i} value={cond}>
                            {cond}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Location */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Location</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value)
                        setSelectedLocation(value)
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {locations.map((loc, idx) => (
                          <SelectItem key={idx} value={loc}>
                            {loc}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {selectedLocation === 'Other' && (
                <FormField
                  control={form.control}
                  name="customLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Any Location</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ''}
                          placeholder="Enter custom location"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Status (only in Edit mode) */}
              {isEditMode && (
                <FormField
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {statuses.map((status, idx) => (
                            <SelectItem key={idx} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {/* Description */}
            <div className="my-5">
              <FormField
                control={control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea className="h-36 resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Images */}
            <div>
              <div className="flex justify-between items-center border-t border-b py-3 my-5">
                <p className="text-primary font-bold text-xl">Images</p>
                <Button
                  variant="outline"
                  className="size-10"
                  onClick={addImage}
                  type="button"
                >
                  <Plus className="text-primary" />
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {imageFields.map((field, index) => (
                  <div key={field.id} className="relative">
                    <FormField
                      control={control}
                      name={`images.${index}.value`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Image {index + 1}</FormLabel>
                          <FormControl>
                            <Input {...field} className="pr-10" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Remove button as 'X' icon in top-right corner */}
                    {imageFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 -right-3 rotate-45  text-gray-500 hover:text-red-500 transition-colors"
                      >
                        <X className="w-8 h-8 " />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="mt-5 w-full"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? isEditMode
                  ? 'Updating Listing...'
                  : 'Creating Listing...'
                : isEditMode
                  ? 'Update Listing'
                  : 'Create Listing'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
