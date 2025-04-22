'use client'

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { motion } from 'framer-motion'
import { ArrowRight, Camera, Info, Plus, Sparkles, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form'
import { toast } from 'sonner'

import {
  categoriesArray,
  conditionArray,
  locationArray,
  statusArray,
} from '@/constant'
import { addListingItem, updateListingItem } from '@/services/listings'
import {
  ListingCategory,
  ListingCondition,
  ListingStatus,
} from '@/types/listings/listing'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { createListingSchema, editListingSchema } from './listingFormSchema'

type ListingFormProps = {
  initialData?: Partial<FieldValues> // Used in edit mode
  isEditMode?: boolean
  onStepChange?: (step: number) => void // Callback to parent component
  totalSteps?: number // Optional number of total steps defined by parent
}

export default function ListingForm({
  initialData,
  isEditMode = false,
  onStepChange,
  totalSteps = 4,
}: ListingFormProps) {
  const router = useRouter()

  const [categories] = useState<ListingCategory[]>(categoriesArray)
  const [conditions] = useState<ListingCondition[]>(conditionArray)
  const [statuses] = useState<ListingStatus[]>(statusArray)
  const [locations] = useState<string[]>(locationArray)
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedLocation, setSelectedLocation] = useState<string>(
    isEditMode && initialData?.location === 'Other' ? 'Other' : '',
  )

  // Notify the parent component when the step changes
  useEffect(() => {
    if (onStepChange) {
      onStepChange(currentStep)
    }
  }, [currentStep, onStepChange])

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
    mode: 'onChange',
  })

  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
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
  const formValues = watch()

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // Only do final submission on last step
    if (currentStep < 3) {
      goToNextStep()
      return
    }

    const images = data.images
      .map((img: { value: string }) => img.value)
      .filter((url: string) => url.trim() !== '')

    const payload = {
      ...data,
      images,
      price: parseFloat(data.price),
      ...(data?.location === 'Other' && {
        customLocation: data?.customLocation,
      }),
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
        setCurrentStep(4) // Go to "publish" step before navigation
        setTimeout(() => {
          router.push('/dashboard/user/listings')
        }, 2000)
      } else {
        toast.error(res.message)
      }
    } catch (error: unknown) {
      console.error(error)
      toast.error('Something went wrong!')
    }
  }

  // Steps configuration for the multi-step form - matches the parent steps
  const steps = [
    { id: 1, title: 'Basic Info', fields: ['title', 'category', 'condition'] },
    { id: 2, title: 'Details', fields: ['description', 'price', 'location'] },
    { id: 3, title: 'Images', fields: ['images'] },
  ]

  const goToNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="relative">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1: Basic Information */}
          <motion.div
            initial={{ opacity: 0, x: currentStep === 1 ? 20 : -20 }}
            animate={{
              opacity: currentStep === 1 ? 1 : 0,
              x: currentStep === 1 ? 0 : currentStep < 1 ? 20 : -20,
              display: currentStep === 1 ? 'block' : 'none',
            }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg p-2.5 shadow-lg shadow-purple-500/20">
                <Info className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Basic Information
              </h3>
            </div>

            <div className="backdrop-blur-md bg-white/10 p-6 rounded-xl border border-white/10 shadow-lg">
              <div className="space-y-4">
                {/* Title */}
                <FormField
                  control={control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Listing Title
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-white/20 border-white/10 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
                          placeholder="What are you selling?"
                        />
                      </FormControl>
                      <FormMessage className="text-pink-300" />
                    </FormItem>
                  )}
                />

                {/* Category */}
                <FormField
                  control={control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-white/20 border-white/10 text-white focus:ring-1 focus:ring-purple-400">
                            <SelectValue placeholder="Select Product Category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-gray-800 border-white/10 text-white">
                          {categories.map((cat, i) => (
                            <SelectItem
                              key={i}
                              value={cat}
                              className="focus:bg-purple-800 focus:text-white"
                            >
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-pink-300" />
                    </FormItem>
                  )}
                />

                {/* Condition */}
                <FormField
                  control={control}
                  name="condition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Condition</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-white/20 border-white/10 text-white focus:ring-1 focus:ring-purple-400">
                            <SelectValue placeholder="Select Condition" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-gray-800 border-white/10 text-white">
                          {conditions.map((cond, i) => (
                            <SelectItem
                              key={i}
                              value={cond}
                              className="focus:bg-purple-800 focus:text-white"
                            >
                              {cond}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-pink-300" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </motion.div>

          {/* Step 2: Details */}
          <motion.div
            initial={{ opacity: 0, x: currentStep === 2 ? 20 : -20 }}
            animate={{
              opacity: currentStep === 2 ? 1 : 0,
              x: currentStep === 2 ? 0 : currentStep < 2 ? 20 : -20,
              display: currentStep === 2 ? 'block' : 'none',
            }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg p-2.5 shadow-lg shadow-blue-500/20">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Item Details</h3>
            </div>

            <div className="backdrop-blur-md bg-white/10 p-6 rounded-xl border border-white/10 shadow-lg">
              <div className="space-y-4">
                {/* Description */}
                <FormField
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="h-36 resize-none bg-white/20 border-white/10 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                          placeholder="Provide a detailed description of your item..."
                        />
                      </FormControl>
                      <FormMessage className="text-pink-300" />
                    </FormItem>
                  )}
                />

                {/* Price */}
                <FormField
                  control={control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Price ($)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          step="0.01"
                          className="bg-white/20 border-white/10 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                          placeholder="0.00"
                        />
                      </FormControl>
                      <FormMessage className="text-pink-300" />
                    </FormItem>
                  )}
                />

                {/* Location */}
                <FormField
                  control={control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Location</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value)
                          setSelectedLocation(value)
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-white/20 border-white/10 text-white focus:ring-1 focus:ring-blue-400">
                            <SelectValue placeholder="Select Location" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-gray-800 border-white/10 text-white">
                          {locations.map((loc, idx) => (
                            <SelectItem
                              key={idx}
                              value={loc}
                              className="focus:bg-blue-800 focus:text-white"
                            >
                              {loc}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-pink-300" />
                    </FormItem>
                  )}
                />

                {selectedLocation === 'Other' && (
                  <FormField
                    control={control}
                    name="customLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">
                          Custom Location
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value || ''}
                            className="bg-white/20 border-white/10 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                            placeholder="Enter custom location"
                          />
                        </FormControl>
                        <FormMessage className="text-pink-300" />
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
                        <FormLabel className="text-white">Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-white/20 border-white/10 text-white focus:ring-1 focus:ring-blue-400">
                              <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-gray-800 border-white/10 text-white">
                            {statuses.map((status, idx) => (
                              <SelectItem
                                key={idx}
                                value={status}
                                className="focus:bg-blue-800 focus:text-white"
                              >
                                {status}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-pink-300" />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </div>
          </motion.div>

          {/* Step 3: Images */}
          <motion.div
            initial={{ opacity: 0, x: currentStep === 3 ? 20 : -20 }}
            animate={{
              opacity: currentStep === 3 ? 1 : 0,
              x: currentStep === 3 ? 0 : currentStep < 3 ? 20 : -20,
              display: currentStep === 3 ? 'block' : 'none',
            }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg p-2.5 shadow-lg shadow-emerald-500/20">
                <Camera className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Product Images</h3>
            </div>

            <div className="backdrop-blur-md bg-white/10 p-6 rounded-xl border border-white/10 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <p className="text-white font-medium">Add product photos</p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={addImage}
                  className="bg-emerald-500/20 hover:bg-emerald-500/30 border-emerald-400/30 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Image
                </Button>
              </div>

              <p className="text-white/70 text-sm mb-4">
                High-quality images from multiple angles increase your chances
                of selling.
              </p>

              <div className="grid grid-cols-1 gap-4">
                {imageFields.map((field, index) => (
                  <div key={field.id} className="relative group">
                    <FormField
                      control={control}
                      name={`images.${index}.value`}
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center">
                            <div className="bg-white/10 w-10 h-10 flex items-center justify-center rounded-l-lg border-y border-l border-white/10">
                              <span className="text-white/70 text-sm">
                                {index + 1}
                              </span>
                            </div>
                            <FormControl className="flex-1">
                              <Input
                                {...field}
                                className="rounded-l-none bg-white/20 border-white/10 text-white placeholder:text-white/50 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                                placeholder="Enter image URL"
                              />
                            </FormControl>
                          </div>
                          <FormMessage className="text-pink-300" />
                        </FormItem>
                      )}
                    />

                    {/* Delete button */}
                    {imageFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white/60 hover:text-red-400"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Step 4: Success/Publishing State */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: currentStep === 4 ? 1 : 0,
              scale: currentStep === 4 ? 1 : 0.95,
              display: currentStep === 4 ? 'block' : 'none',
            }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="backdrop-blur-md bg-white/10 p-8 rounded-xl border border-white/10 shadow-lg text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Listing Created Successfully!
              </h3>
              <p className="text-purple-100/80 mb-6">
                Your item has been listed and is now visible to potential
                buyers.
              </p>

              <div className="flex justify-center">
                <Button
                  type="button"
                  onClick={() => router.push('/dashboard/user/listings')}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  View My Listings
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Navigation buttons */}
          {currentStep < 4 && (
            <div className="flex justify-between mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={goToPreviousStep}
                disabled={currentStep === 1}
                className={`px-4 py-2 ${
                  currentStep === 1
                    ? 'opacity-50 cursor-not-allowed bg-white/10 text-white/50 border-white/10'
                    : 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
                }`}
              >
                Previous
              </Button>

              <Button
                type={currentStep === steps.length ? 'submit' : 'button'}
                onClick={
                  currentStep === steps.length ? undefined : goToNextStep
                }
                disabled={isSubmitting}
                className={`px-4 py-2 ${
                  currentStep === steps.length
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                } text-white`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : currentStep === steps.length ? (
                  <span className="flex items-center">
                    Publish Listing <ArrowRight className="ml-2 w-5 h-5" />
                  </span>
                ) : (
                  'Continue'
                )}
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  )
}
