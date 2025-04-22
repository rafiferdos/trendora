'use client'

import ListingForm from '@/components/modules/dashboard/listing/addToListing/ListingForm'
import { motion } from 'framer-motion'
import { Camera, Package, ShoppingBag, TrendingUp } from 'lucide-react'
import { useState } from 'react'

const CreateListingPage = () => {
  const [activeStep, setActiveStep] = useState(1)

  // The steps in the listing creation process
  const steps = [
    { id: 1, title: 'Basic Info', icon: ShoppingBag },
    { id: 2, title: 'Add Photos', icon: Camera },
    { id: 3, title: 'Set Price', icon: TrendingUp },
    { id: 4, title: 'Publish', icon: Package },
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

        {/* Step indicators */}
        <div className="hidden md:flex justify-center mb-8">
          <div className="flex items-center bg-white/5 backdrop-blur-lg rounded-xl p-1.5 border border-white/10 shadow-lg">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => setActiveStep(step.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeStep === step.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-900/30'
                      : 'hover:bg-white/10 text-purple-100'
                  }`}
                >
                  <div
                    className={`rounded-full p-1.5 ${
                      activeStep === step.id ? 'bg-white/20' : 'bg-white/10'
                    }`}
                  >
                    <step.icon size={16} />
                  </div>
                  <span className="text-sm font-medium">{step.title}</span>
                </button>

                {index < steps.length - 1 && (
                  <div className="h-0.5 w-4 bg-white/10"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile step indicators */}
        <div className="md:hidden mb-6">
          <div className="overflow-x-auto pb-2">
            <div className="flex min-w-max">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => setActiveStep(step.id)}
                    className={`flex flex-col items-center px-3 py-2 rounded-lg transition-all duration-300 ${
                      activeStep === step.id
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                        : 'hover:bg-white/10 text-purple-100'
                    }`}
                  >
                    <div
                      className={`rounded-full p-1.5 mb-1 ${
                        activeStep === step.id ? 'bg-white/20' : 'bg-white/10'
                      }`}
                    >
                      <step.icon size={16} />
                    </div>
                    <span className="text-xs font-medium whitespace-nowrap">
                      {step.title}
                    </span>
                  </button>

                  {index < steps.length - 1 && (
                    <div className="h-0.5 w-4 bg-white/10 self-center"></div>
                  )}
                </div>
              ))}
            </div>
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
                <ListingForm />
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
              Clear, well-lit photos from multiple angles can increase your
              item's visibility by up to 70%.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="backdrop-blur-md bg-white/5 p-6 rounded-xl border border-white/10 shadow-lg"
          >
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-blue-900/30">
              <TrendingUp className="text-white" size={24} />
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
