import { categoryIcons } from '@/constant'
import { getListings } from '@/services/listings'
import { ListingCategory } from '@/types/listings/listing'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MdOutlineAllOut } from 'react-icons/md'
// Import any icon for the "All" category - using a grid view icon or similar
// import { Grid3x3GapFill } from 'react-icons'

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// Loader animation variants
const pulseAnimation = {
  initial: { scale: 0.95, opacity: 0.7 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { 
      repeat: Infinity,
      repeatType: "reverse" as const, 
      duration: 1.5 
    }
  }
}

// Gradient combinations for categories
const gradients = [
  'from-purple-600 to-indigo-600',
  'from-pink-600 to-rose-600',
  'from-blue-600 to-cyan-600',
  'from-amber-600 to-yellow-600',
  'from-emerald-600 to-teal-600',
  'from-red-600 to-orange-600',
]

export const CategorySection = () => {
  const router = useRouter()
  const [categories, setCategories] = useState<ListingCategory[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true)
      try {
        const { data: listings } = await getListings()

        const allCategories = (listings || [])
          .map((listing) => listing.category)
          .filter((cat): cat is ListingCategory =>
            Object.values(ListingCategory).includes(cat as ListingCategory),
          )

        // Remove duplicates by converting to Set and back to Array
        const uniqueCategories = Array.from(new Set(allCategories))
        setCategories(uniqueCategories)
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const handleCategoryClick = (category: ListingCategory | 'all') => {
    if (category === 'all') {
      router.push('/listings')
    } else {
      router.push(`/listings?category=${category}`)
    }
  }
  
  // Placeholder categories for loading state
  const loadingPlaceholders = Array(7).fill(0) // Increased to include "All" category

  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 via-purple-950 to-violet-900">
      <div className="container mx-auto px-4 relative">
        {/* Background decorations */}
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-1/4 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl"></div>
        
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-100 bg-clip-text text-transparent">
            Browse Items by Category
          </h2>
          <p className="text-lg text-purple-100/80 max-w-2xl mx-auto">
            Discover amazing items across our diverse marketplace categories
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            // Loading state
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {loadingPlaceholders.map((_, idx) => (
                <motion.div 
                  key={`loading-${idx}`}
                  variants={fadeIn}
                  className="group"
                >
                  <div className="w-full">
                    <motion.div
                      className={`bg-gradient-to-br ${gradients[idx % gradients.length]} p-0.5 rounded-xl shadow-lg overflow-hidden opacity-60`}
                      initial="initial"
                      animate="animate"
                      variants={pulseAnimation}
                    >
                      <div className="bg-black/40 backdrop-blur-sm h-full w-full rounded-[calc(0.75rem-1px)] p-6 flex flex-col items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4"></div>
                        <div className="h-4 w-24 bg-white/20 rounded"></div>
                        <div className="w-10 h-0.5 bg-white/30 mt-4"></div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            // Loaded categories
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit="exit"
              key="categories-loaded"
            >
              {categories.length > 0 ? (
                <>
                  {/* Dynamic categories */}
                  {categories.map((category, idx) => {
                    const Icon = categoryIcons[category]
                    const displayName = category
                      .split(/(?=[A-Z])/)
                      .join(' ')
                      .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())

                    return (
                      <motion.div
                        key={category}
                        variants={fadeIn}
                        whileHover={{ y: -8, scale: 1.05, transition: { duration: 0.2 } }}
                        className="group"
                        layout
                      >
                        <button
                          onClick={() => handleCategoryClick(category)}
                          className="w-full"
                        >
                          <div
                            className={`bg-gradient-to-br ${gradients[idx % gradients.length]} p-0.5 rounded-xl shadow-lg overflow-hidden`}
                          >
                            <div className="bg-black/40 backdrop-blur-sm h-full w-full rounded-[calc(0.75rem-1px)] p-6 flex flex-col items-center justify-center transition-all duration-300 group-hover:bg-black/30">
                              <div className="relative w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4 group-hover:bg-white/30 transition-all duration-300">
                                <Icon className="w-8 h-8 text-white" />
                                <motion.div 
                                  className="absolute inset-0 rounded-full bg-white/5"
                                  animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0, 0.3, 0],
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatType: "loop",
                                  }}
                                />
                              </div>
                              <h3 className="font-medium text-center text-white group-hover:text-white/90">
                                {displayName}
                              </h3>
                              <motion.div
                                className="w-10 h-0.5 bg-white/40 mt-2 group-hover:w-16 group-hover:bg-white/70"
                                transition={{ duration: 0.3 }}
                              />
                            </div>
                          </div>
                        </button>
                      </motion.div>
                    )
                  })}

                  {/* Static "All Categories" option */}
                  <motion.div
                    key="all-categories"
                    variants={fadeIn}
                    whileHover={{ y: -8, scale: 1.05, transition: { duration: 0.2 } }}
                    className="group"
                    layout
                  >
                    <button
                      onClick={() => handleCategoryClick('all')}
                      className="w-full"
                    >
                      <div
                        className="bg-gradient-to-br from-white/30 to-white/10 p-0.5 rounded-xl shadow-lg overflow-hidden"
                      >
                        <div className="bg-black/40 backdrop-blur-sm h-full w-full rounded-[calc(0.75rem-1px)] p-6 flex flex-col items-center justify-center transition-all duration-300 group-hover:bg-black/30">
                          <div className="relative w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4 group-hover:bg-white/30 transition-all duration-300">
                            <MdOutlineAllOut className="w-8 h-8 text-white" />
                            <motion.div 
                              className="absolute inset-0 rounded-full bg-white/5"
                              animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0, 0.3, 0],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "loop",
                              }}
                            />
                          </div>
                          <h3 className="font-medium text-center text-white group-hover:text-white/90">
                            All Categories
                          </h3>
                          <motion.div
                            className="w-10 h-0.5 bg-white/40 mt-2 group-hover:w-16 group-hover:bg-white/70"
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                      </div>
                    </button>
                  </motion.div>
                </>
              ) : (
                <motion.div 
                  variants={fadeIn} 
                  className="col-span-full text-center py-10"
                >
                  <p className="text-white text-lg">No categories found</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}