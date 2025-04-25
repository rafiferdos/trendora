'use client'

import ListingForm from '@/components/modules/dashboard/listing/addToListing/ListingForm'
import { motion } from 'framer-motion'
import { Camera, Info, Package, ShoppingBag, Sparkles } from 'lucide-react'
import { useState } from 'react'

const CreateListingPage = () => {
  const [activeStep, setActiveStep] = useState(1)

  // Unified steps array that will be passed to the form component
  const steps = [
    {
      id: 1,
      title: 'Basic Info',
      icon: ShoppingBag,
      description: 'Product name, category, and condition',
    },
    {
      id: 2,
      title: 'Details',
      icon: Info,
      description: 'Description, price, and location',
    },
    {
      id: 3,
      title: 'Photos',
      icon: Camera,
      description: 'High-quality images of your item',
    },
    {
      id: 4,
      title: 'Publish',
      icon: Package,
      description: 'Review and list your item',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-violet-900 p-4 md:p-8">
      {/* Background decoration elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div
          className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-pink-600/20 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-emerald-600/10 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: '3s' }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-100 bg-clip-text text-transparent mb-2">
            Create Your Listing
          </h1>
          <p className="text-purple-200/80 max-w-2xl mx-auto">
            Add your item details to start selling. Quality listings with clear
            photos and descriptions sell faster!
          </p>
        </motion.div>

        {/* Step indicators on desktop - these are visual only and sync with form state */}
        <div className="hidden md:block mb-12">
          <div className="relative">
            {/* Progress bar */}
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden mb-10">
              <motion.div
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500"
                animate={{
                  width: `${((activeStep - 1) / (steps.length - 1)) * 100}%`,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Step markers */}
            <div className="flex justify-between relative -mt-6">
              {steps.map((step) => (
                <div key={step.id} className="flex flex-col items-center">
                  <motion.div
                    animate={{
                      scale: activeStep === step.id ? 1.1 : 1,
                      boxShadow:
                        activeStep === step.id
                          ? '0 0 0 4px rgba(255, 255, 255, 0.1)'
                          : '0 0 0 0px rgba(255, 255, 255, 0)',
                    }}
                    className={`flex items-center justify-center w-12 h-12 rounded-full mb-2
                      ${
                        activeStep >= step.id
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                          : 'bg-white/10 text-white/60'
                      }`}
                  >
                    <step.icon size={20} />
                  </motion.div>
                  <motion.span
                    animate={{
                      color:
                        activeStep === step.id
                          ? 'rgba(255, 255, 255, 0.95)'
                          : 'rgba(255, 255, 255, 0.6)',
                      fontWeight: activeStep === step.id ? 600 : 400,
                    }}
                    className="text-sm block text-center"
                  >
                    {step.title}
                  </motion.span>
                  <motion.span
                    animate={{
                      opacity: activeStep === step.id ? 0.8 : 0.4,
                    }}
                    className="text-xs block text-center text-white max-w-[120px] mt-1"
                  >
                    {step.description}
                  </motion.span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile step progress */}
        <div className="md:hidden mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-white font-medium">
              Step {activeStep} of {steps.length}
            </span>
            <span className="text-white/70 text-sm">
              {steps[activeStep - 1].title}
            </span>
          </div>
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
              animate={{ width: `${(activeStep / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Main content with glassmorphism effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-pink-500/30 to-purple-600/30 rounded-full blur-xl"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-full blur-xl"></div>
          </div>

          {/* Form container with background blur */}
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
            <div className="p-1">
              <div className="bg-gradient-to-br from-purple-600/20 to-pink-500/20 rounded-xl p-6 md:p-8">
                <ListingForm
                  onStepChange={(step) => setActiveStep(step)}
                  totalSteps={steps.length}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="backdrop-blur-md bg-white/5 p-6 rounded-xl border border-white/10 shadow-lg"
          >
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-purple-900/30">
              <Camera className="text-white" size={24} />
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">
              Add Great Photos
            </h3>
            <p className="text-purple-100/80 text-sm">
              {
                "Clear, well-lit photos from multiple angles can increase your item's visibility by up to 70%."
              }
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="backdrop-blur-md bg-white/5 p-6 rounded-xl border border-white/10 shadow-lg"
          >
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-blue-900/30">
              <Sparkles className="text-white" size={24} />
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">
              Price Competitively
            </h3>
            <p className="text-purple-100/80 text-sm">
              Items priced within 15% of market value typically sell 2x faster
              than overpriced listings.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="backdrop-blur-md bg-white/5 p-6 rounded-xl border border-white/10 shadow-lg"
          >
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-emerald-900/30">
              <Package className="text-white" size={24} />
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">
              Detailed Description
            </h3>
            <p className="text-purple-100/80 text-sm">
              Including condition, dimensions, brand, and history can increase
              buyer interest by 40%.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default CreateListingPage
