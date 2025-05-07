import { categoryIcons } from '@/constant'
import { getListings } from '@/services/listings'
import { ListingCategory } from '@/types/listings/listing'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MdOutlineAllOut } from 'react-icons/md'
import { useTheme } from 'next-themes'

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

// Enhanced gradients with dark and light mode versions
const gradients = {
  dark: [
    'from-purple-600 to-indigo-600',
    'from-pink-600 to-rose-600',
    'from-blue-600 to-cyan-600',
    'from-amber-600 to-yellow-600',
    'from-emerald-600 to-teal-600',
    'from-red-600 to-orange-600',
  ],
  light: [
    'from-purple-500 to-indigo-500',
    'from-pink-500 to-rose-500',
    'from-blue-500 to-cyan-500',
    'from-amber-500 to-yellow-500',
    'from-emerald-500 to-teal-500',
    'from-red-500 to-orange-500',
  ]
}

export const CategorySection = () => {
  const router = useRouter()
  const { resolvedTheme } = useTheme()
  const mode = resolvedTheme === 'dark' ? 'dark' : 'light'
  
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
  const loadingPlaceholders = Array(7).fill(0) // Includes "All" category

  return (
    <section className={`py-16 ${
      mode === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-purple-950 to-violet-900' 
        : 'bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100'
    }`}>
      <div className="container mx-auto px-4 relative">
        {/* Background decorations */}
        <div className={`absolute top-10 left-1/4 w-64 h-64 ${
          mode === 'dark' ? 'bg-purple-600/10' : 'bg-purple-500/10'
        } rounded-full blur-3xl`}></div>
        <div className={`absolute bottom-10 right-1/4 w-80 h-80 ${
          mode === 'dark' ? 'bg-pink-600/10' : 'bg-pink-500/10'
        } rounded-full blur-3xl`}></div>
        <div className={`absolute top-20 right-1/4 w-40 h-40 ${
          mode === 'dark' ? 'bg-blue-600/10' : 'bg-blue-500/10'
        } rounded-full blur-3xl`}></div>
        
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${
            mode === 'dark'
              ? 'bg-gradient-to-r from-white via-purple-200 to-pink-100 bg-clip-text text-transparent'
              : 'bg-gradient-to-r from-indigo-800 via-purple-800 to-pink-800 bg-clip-text text-transparent'
          }`}>
            Browse Items by Category
          </h2>
          <p className={`text-lg ${
            mode === 'dark' ? 'text-purple-100/80' : 'text-indigo-900/70'
          } max-w-2xl mx-auto`}>
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
                      className={`bg-gradient-to-br ${gradients[mode][idx % gradients[mode].length]} p-0.5 rounded-xl shadow-lg overflow-hidden opacity-60`}
                      initial="initial"
                      animate="animate"
                      variants={pulseAnimation}
                    >
                      <div className={`${
                        mode === 'dark' 
                          ? 'bg-black/40' 
                          : 'bg-white/40'
                      } backdrop-blur-sm h-full w-full rounded-[calc(0.75rem-1px)] p-6 flex flex-col items-center justify-center`}>
                        <div className={`w-16 h-16 rounded-full ${
                          mode === 'dark' ? 'bg-white/10' : 'bg-black/5'
                        } flex items-center justify-center mb-4`}></div>
                        <div className={`h-4 w-24 ${
                          mode === 'dark' ? 'bg-white/20' : 'bg-black/10'
                        } rounded`}></div>
                        <div className={`w-10 h-0.5 ${
                          mode === 'dark' ? 'bg-white/30' : 'bg-black/20'
                        } mt-4`}></div>
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
                            className={`bg-gradient-to-br ${gradients[mode][idx % gradients[mode].length]} p-0.5 rounded-xl ${
                              mode === 'dark'
                                ? 'shadow-lg shadow-indigo-950/30'
                                : 'shadow-md shadow-indigo-500/20'
                            } overflow-hidden`}
                          >
                            <div className={`${
                              mode === 'dark'
                                ? 'bg-black/40 group-hover:bg-black/30'
                                : 'bg-white/60 group-hover:bg-white/80'
                            } backdrop-blur-sm h-full w-full rounded-[calc(0.75rem-1px)] p-6 flex flex-col items-center justify-center transition-all duration-300`}>
                              <div className={`relative w-16 h-16 rounded-full ${
                                mode === 'dark'
                                  ? 'bg-white/20 group-hover:bg-white/30'
                                  : 'bg-black/10 group-hover:bg-black/15'
                              } flex items-center justify-center mb-4 transition-all duration-300`}>
                                <Icon className={`w-8 h-8 ${
                                  mode === 'dark' ? 'text-white' : 'text-indigo-900'
                                }`} />
                                <motion.div 
                                  className={`absolute inset-0 rounded-full ${
                                    mode === 'dark' ? 'bg-white/5' : 'bg-black/5'
                                  }`}
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
                              <h3 className={`font-medium text-center ${
                                mode === 'dark'
                                  ? 'text-white group-hover:text-white/90'
                                  : 'text-indigo-950 group-hover:text-indigo-800'
                              }`}>
                                {displayName}
                              </h3>
                              <motion.div
                                className={`w-10 h-0.5 ${
                                  mode === 'dark'
                                    ? 'bg-white/40 group-hover:bg-white/70'
                                    : 'bg-indigo-800/30 group-hover:bg-indigo-800/60'
                                } mt-2 group-hover:w-16`}
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
                        className={`bg-gradient-to-br ${
                          mode === 'dark'
                            ? 'from-white/30 to-white/10'
                            : 'from-indigo-400/60 to-indigo-300/40'
                        } p-0.5 rounded-xl ${
                          mode === 'dark'
                            ? 'shadow-lg shadow-indigo-950/30'
                            : 'shadow-md shadow-indigo-500/20'
                        } overflow-hidden`}
                      >
                        <div className={`${
                          mode === 'dark'
                            ? 'bg-black/40 group-hover:bg-black/30'
                            : 'bg-white/70 group-hover:bg-white/90'
                        } backdrop-blur-sm h-full w-full rounded-[calc(0.75rem-1px)] p-6 flex flex-col items-center justify-center transition-all duration-300`}>
                          <div className={`relative w-16 h-16 rounded-full ${
                            mode === 'dark'
                              ? 'bg-white/20 group-hover:bg-white/30'
                              : 'bg-indigo-500/20 group-hover:bg-indigo-500/30'
                          } flex items-center justify-center mb-4 transition-all duration-300`}>
                            <MdOutlineAllOut className={`w-8 h-8 ${
                              mode === 'dark' ? 'text-white' : 'text-indigo-900'
                            }`} />
                            <motion.div 
                              className={`absolute inset-0 rounded-full ${
                                mode === 'dark' ? 'bg-white/5' : 'bg-indigo-500/10'
                              }`}
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
                          <h3 className={`font-medium text-center ${
                            mode === 'dark'
                              ? 'text-white group-hover:text-white/90'
                              : 'text-indigo-950 group-hover:text-indigo-800'
                          }`}>
                            All Categories
                          </h3>
                          <motion.div
                            className={`w-10 h-0.5 ${
                              mode === 'dark'
                                ? 'bg-white/40 group-hover:bg-white/70'
                                : 'bg-indigo-800/30 group-hover:bg-indigo-800/60'
                            } mt-2 group-hover:w-16`}
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
                  className={`col-span-full text-center py-12 backdrop-blur-sm ${
                    mode === 'dark'
                      ? 'bg-white/5 text-white rounded-xl border border-white/10'
                      : 'bg-white/60 text-indigo-900 rounded-xl border border-indigo-100'
                  }`}
                >
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${
                    mode === 'dark' ? 'bg-white/10' : 'bg-indigo-100'
                  } flex items-center justify-center`}>
                    <MdOutlineAllOut className={`w-8 h-8 ${
                      mode === 'dark' ? 'text-white/70' : 'text-indigo-600'
                    }`} />
                  </div>
                  <p className="text-lg mb-2">No categories found</p>
                  <p className={`text-sm ${
                    mode === 'dark' ? 'text-white/60' : 'text-indigo-700/70'
                  }`}>
                    Try refreshing or check back later
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Visual decoration: Floating shapes */}
        {!isLoading && categories.length > 0 && (
          <>
            <motion.div 
              className={`absolute -bottom-6 -left-6 md:left-4 w-12 h-12 ${
                mode === 'dark' 
                  ? 'bg-purple-600/30' 
                  : 'bg-purple-400/30'
              } rounded-full hidden md:block`}
              animate={{
                y: [0, -15, 0],
                x: [0, 10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "loop",
              }}
            />
            <motion.div 
              className={`absolute -bottom-16 right-20 md:right-40 w-8 h-8 ${
                mode === 'dark' 
                  ? 'bg-pink-600/20' 
                  : 'bg-pink-400/20'
              } rounded-full hidden md:block`}
              animate={{
                y: [0, 20, 0],
                x: [0, -15, 0],
              }}
              transition={{
                duration: 7,
                delay: 1,
                repeat: Infinity,
                repeatType: "loop",
              }}
            />
          </>
        )}
      </div>
    </section>
  )
}