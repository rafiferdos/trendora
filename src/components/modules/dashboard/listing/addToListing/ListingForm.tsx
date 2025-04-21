'use client'

import { useEffect, useState } from 'react'
import {
  useForm,
  useFieldArray,
  SubmitHandler,
  FieldValues,
} from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Plus } from 'lucide-react'

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

  const [selectedLocation, setSelectedLocation] = useState<string>('Dhaka') // for edit mode only

  const form = useForm<FieldValues>({
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      price: initialData?.price?.toString() || '',
      category: initialData?.category || 'mobile',
      condition: initialData?.condition || 'good',
      location: initialData?.location || 'Dhaka',
      // customLocation: initialData?.customLocation || '',
      status: initialData?.status || undefined, 
      images: initialData?.images?.map((url: string) => ({ value: url })) || [
        { value: '' },
      ],
    },
  })

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const { append: appendImage, fields: imageFields } = useFieldArray({
    control,
    name: 'images',
  })

  const addImage = () => appendImage({ value: '' })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const images = data.images.map((img: { value: string }) => img.value)

    const payload = {
      ...data,
      images,
      price: parseFloat(data.price),
    }

    try {
      let res
      if (isEditMode && initialData?._id) {
        res = await updateListingItem(initialData._id, payload)
      } else {
        res = await addListingItem(payload)
      }

      if (res.success) {
        toast.success(res.message)
        router.push('/user/dashboard/listings')
      } else {
        toast.error(res.message)
      }
    } catch (error: unknown) {
      console.error(error)
      toast.error('Something went wrong!')
    }
  }

  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-2xl p-5">
      <div className="flex items-center space-x-4 mb-5">
        <h1 className="text-xl font-bold">
          {isEditMode ? 'Edit Listing' : 'Add Listing'}
        </h1>
      </div>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center border-t border-b py-3 my-5">
            <p className="text-primary font-bold text-xl">Basic Information</p>
          </div>

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
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
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
                <FormItem>
                  <FormLabel>Condition</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
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
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value)
                      setSelectedLocation(value)
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
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
                    <FormLabel>Custom Location</FormLabel>
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
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
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
                <FormField
                  key={field.id}
                  control={control}
                  name={`images.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image {index + 1}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="mt-5 w-full" disabled={isSubmitting}>
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
  )
}
