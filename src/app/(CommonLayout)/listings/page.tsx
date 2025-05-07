'use client'

import SanitizedImage from '@/components/shared/SanitizedImage'
import { ListingCategory } from '@/types/listings/listing'
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiArrowDown,
  FiFilter,
  FiGrid,
  FiList,
  FiSearch,
  FiX,
  FiSliders,
} from 'react-icons/fi'

const Card = dynamic(() => import('@/components/shared/Card'), {
  ssr: true,
})

interface Listing {
  id?: string
  _id?: string
  title: string
  description: string
  price: number
  condition: string
  category: string
  images?: string[]
  userID?: string
  status?: 'available' | 'sold'
  createdAt?: string
}

// Format category ID to display name (capitalized with spaces)
const formatCategoryName = (categoryId: string): string => {
  // Handle special cases with multiple words
  if (categoryId === 'musicalinstruments') return 'Musical Instruments'
  if (categoryId === 'officesupplies') return 'Office Supplies'
  if (categoryId === 'petsupplies') return 'Pet Supplies'
  if (categoryId === 'babyproducts') return 'Baby Products'
  if (categoryId === 'artcollectibles') return 'Art & Collectibles'
  if (categoryId === 'realestate') return 'Real Estate'

  // Default case: capitalize first letter
  return categoryId.charAt(0).toUpperCase() + categoryId.slice(1)
}

// Dynamic color schemes that respond to theme
const getCardColorSchemes = (theme: string) => {
  return theme === 'dark' 
    ? [
        { bg: 'bg-gradient-to-br from-pink-600 to-rose-600', text: 'text-white' },
        { bg: 'bg-gradient-to-br from-amber-500 to-orange-600', text: 'text-white' },
        { bg: 'bg-gradient-to-br from-emerald-600 to-teal-700', text: 'text-white' },
        { bg: 'bg-gradient-to-br from-sky-500 to-blue-700', text: 'text-white' },
        { bg: 'bg-gradient-to-br from-purple-600 to-indigo-700', text: 'text-white' },
      ]
    : [
        { bg: 'bg-gradient-to-br from-pink-500 to-rose-500', text: 'text-white' },
        { bg: 'bg-gradient-to-br from-amber-400 to-orange-500', text: 'text-white' },
        { bg: 'bg-gradient-to-br from-emerald-500 to-teal-600', text: 'text-white' },
        { bg: 'bg-gradient-to-br from-sky-400 to-blue-600', text: 'text-white' },
        { bg: 'bg-gradient-to-br from-purple-500 to-indigo-600', text: 'text-white' },
      ]
}

export default function AllListsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const [listings, setListings] = useState<Listing[]>([])
  const [filteredListings, setFilteredListings] = useState<Listing[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState<boolean>(false)
  const [showSortOptions, setShowSortOptions] = useState(false)
  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.get('searchTerm') || '',
  )

  // Theme detection
  useEffect(() => {
    setMounted(true)
  }, [])

  // Current theme mode
  const currentTheme = mounted && theme ? theme : 'dark'
  const mode = currentTheme === 'dark' ? 'dark' : 'light'
  const cardColorSchemes = getCardColorSchemes(mode)

  // Get values from query params
  const selectedCategory = searchParams.get('category') || 'all'
  const filterCondition = searchParams.get('condition') || 'all'
  const minPrice = Number(searchParams.get('minPrice') || 0)
  const maxPrice = Number(searchParams.get('maxPrice') || 10000000)
  const sortOrder = searchParams.get('sort') || 'default'

  const categories = Object.values(ListingCategory)

  // Update URL query
  const updateQueryParam = (key: string, value: string | number) => {
    const params = new URLSearchParams(window.location.search)
    if (value === '' || value === 'all' || value === 0 || value === 10000000) {
      params.delete(key)
    } else {
      params.set(key, String(value))
    }
    router.push(`?${params.toString()}`)
  }

  // FETCH Listings
  useEffect(() => {
    const fetchFilteredListings = async () => {
      try {
        const queryParams = new URLSearchParams()

        if (searchQuery) queryParams.set('searchTerm', searchQuery)
        if (selectedCategory !== 'all')
          queryParams.set('category', selectedCategory)
        if (filterCondition !== 'all')
          queryParams.set('condition', filterCondition)
        if (minPrice) queryParams.set('minPrice', String(minPrice))
        if (maxPrice) queryParams.set('maxPrice', String(maxPrice))

        const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API}/listings?${queryParams.toString()}`
        console.log('Querying backend with:', apiUrl)

        const res = await fetch(apiUrl, {
          cache: 'no-store',
          headers: { 'Content-Type': 'application/json' },
        })

        const data = await res.json()

        if (!res.ok) {
          if (res.status === 404) {
            // ✅ Gracefully handle empty listings
            setFilteredListings([])
            setError(null)
            return
          }

          throw new Error(data.message || 'Something went wrong')
        }

        if (!Array.isArray(data.data)) {
          throw new Error('Invalid data format received')
        }

        let sortedListings = data.data

        // Sort by newest first by default (assuming items have a createdAt field)
        // This will show the most recently added items first
        if (sortOrder === 'newest' || sortOrder === 'default') {
          sortedListings = sortedListings.sort((a: any, b: any) => {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
          })
        } else if (sortOrder === 'price-low') {
          sortedListings = sortedListings.sort(
            (a: any, b: any) => a.price - b.price,
          )
        } else if (sortOrder === 'price-high') {
          sortedListings = sortedListings.sort(
            (a: any, b: any) => b.price - a.price,
          )
        }

        setFilteredListings(sortedListings)
      } catch (err) {
        console.error('Filter fetch failed:', err)
        setFilteredListings([]) // Optional fallback
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setIsLoading(false)
      }
    }

    fetchFilteredListings()
  }, [
    searchQuery,
    selectedCategory,
    filterCondition,
    minPrice,
    maxPrice,
    sortOrder,
  ])

  // Handlers that update URL
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    updateQueryParam('searchTerm', e.target.value)
  }

  const clearSearch = () => {
    setSearchQuery('')
    updateQueryParam('searchTerm', '')
  }

  const handleCategorySelect = (categoryId: string) => {
    updateQueryParam('category', categoryId)
  }

  const handleSortChange = (order: string) => {
    updateQueryParam('sort', order)
    setShowSortOptions(false)
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  const handleConditionChange = (condition: string) => {
    updateQueryParam('condition', condition)
  }

  const handlePriceRangeChange = (type: 'min' | 'max', value: string) => {
    const numValue = parseInt(value) || 0
    if (type === 'min') updateQueryParam('minPrice', numValue)
    else updateQueryParam('maxPrice', numValue)
  }

  const resetFilters = () => {
    router.push('/listings')
  }

  const toggleTheme = () => {
    setTheme(mode === 'dark' ? 'light' : 'dark')
  }

  return (
    <main className={`min-h-screen px-4 py-8 md:px-8 transition-all duration-500 ${
      mode === 'dark'
        ? 'bg-gradient-to-br from-gray-900 via-purple-950 to-violet-900'
        : 'bg-gradient-to-br from-white via-indigo-50/40 to-purple-50/60'
    }`}>
      {/* Theme toggle button */}
      <motion.button
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onClick={toggleTheme}
        className={`absolute top-4 right-4 p-3 rounded-full ${
          mode === 'dark'
            ? 'bg-white/10 hover:bg-white/20 text-yellow-200'
            : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-900'
        } transition-all duration-300 border ${
          mode === 'dark' ? 'border-white/10' : 'border-indigo-200'
        }`}
      >
        {mode === 'dark' ? (
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="lucide lucide-sun"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </motion.svg>
        ) : (
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="lucide lucide-moon"
            animate={{ rotate: [0, -360] }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </motion.svg>
        )}
      </motion.button>

      {/* Main content layout with flex */}
      <div className="flex flex-col-reverse lg:flex-row-reverse gap-16">
        {/* Left side content area (70% width) */}
        <div className="w-full lg:w-[70%] lg:pr-8">
          {/* Results count */}
          <motion.div 
            className={`max-w-full mx-auto mb-6 flex justify-between items-center ${
              mode === 'dark' ? '' : 'text-indigo-950'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className={`${
              mode === 'dark' ? 'text-purple-100' : 'text-indigo-700'
            } text-lg`}>
              <span className={`font-bold ${
                mode === 'dark' ? 'text-white' : 'text-indigo-900'
              } text-xl mr-1`}>
                {filteredListings.length}
              </span>{' '}
              incredible finds waiting for you
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center justify-center p-3 rounded-xl 
                          ${
                            viewMode === 'grid'
                              ? mode === 'dark'
                                ? 'bg-white/20 text-white shadow-purple-500/20'
                                : 'bg-indigo-500 text-white shadow-indigo-500/30'
                              : mode === 'dark'
                                ? 'bg-white/5 text-white/70'
                                : 'bg-white/60 text-indigo-500'
                          } 
                          hover:${mode === 'dark' ? 'bg-white/20' : 'bg-indigo-500/90'} ${viewMode === 'grid' ? 'shadow-lg' : ''} transition-all duration-300
                          border ${mode === 'dark' ? 'border-white/10' : viewMode === 'grid' ? 'border-indigo-500' : 'border-indigo-200'}`}
              >
                <FiGrid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center justify-center p-3 rounded-xl 
                          ${
                            viewMode === 'list'
                              ? mode === 'dark'
                                ? 'bg-white/20 text-white shadow-purple-500/20'
                                : 'bg-indigo-500 text-white shadow-indigo-500/30'
                              : mode === 'dark'
                                ? 'bg-white/5 text-white/70'
                                : 'bg-white/60 text-indigo-500'
                          } 
                          hover:${mode === 'dark' ? 'bg-white/20' : 'bg-indigo-500/90'} ${viewMode === 'list' ? 'shadow-lg' : ''} transition-all duration-300
                          border ${mode === 'dark' ? 'border-white/10' : viewMode === 'list' ? 'border-indigo-500' : 'border-indigo-200'}`}
              >
                <FiList size={20} />
              </button>
            </div>
          </motion.div>

          {/* Loading state with modern animation */}
          <AnimatePresence>
            {isLoading && (
              <motion.div 
                className="max-w-md mx-auto my-20 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <div className={`relative ${
                  mode === 'dark' 
                    ? 'bg-black/40 border-white/20'
                    : 'bg-white/40 border-indigo-200/50'
                } backdrop-blur-xl p-10 rounded-3xl border shadow-2xl overflow-hidden`}>
                  {/* Animated gradient background */}
                  <div className={`absolute inset-0 ${
                    mode === 'dark'
                      ? 'bg-gradient-to-r from-purple-600/30 via-pink-500/30 to-blue-500/30'
                      : 'bg-gradient-to-r from-purple-400/20 via-pink-300/20 to-blue-300/20'
                  } animate-gradient-x`}></div>

                  {/* Staggered animated dots */}
                  <div className="relative flex justify-center items-center gap-4 py-6">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className={`w-4 h-4 rounded-full ${
                          mode === 'dark'
                            ? 'bg-gradient-to-r from-pink-500 to-purple-600'
                            : 'bg-gradient-to-r from-indigo-500 to-purple-500'
                        } animate-bounce`}
                        style={{ animationDelay: `${i * 0.15}s` }}
                      ></div>
                    ))}
                  </div>

                  {/* Animated glowing ring */}
                  <div className="relative flex justify-center items-center my-4">
                    <div
                      className={`w-20 h-20 rounded-full border-4 border-transparent 
                          ${
                            mode === 'dark'
                              ? 'border-t-pink-500 border-r-purple-500 border-b-blue-500'
                              : 'border-t-indigo-500 border-r-purple-500 border-b-blue-400'
                          }
                          animate-spin`}
                    ></div>
                    <div
                      className={`absolute w-14 h-14 rounded-full ${
                        mode === 'dark'
                          ? 'bg-gradient-to-br from-pink-500/80 to-purple-600/80'
                          : 'bg-gradient-to-br from-indigo-500/60 to-purple-500/60'
                      } 
                          blur-sm animate-pulse`}
                    ></div>
                    <div className="absolute">
                      <svg
                        className={`w-8 h-8 ${
                          mode === 'dark' ? 'text-white' : 'text-indigo-900'
                        } animate-pulse`}
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        ></path>
                      </svg>
                    </div>
                  </div>

                  <p className={`${
                    mode === 'dark' ? 'text-white' : 'text-indigo-900'
                  } mt-6 font-medium`}>
                    <span className="inline-block animate-pulse">
                      Discovering amazing treasures
                    </span>
                    <span className="inline-block animate-bounce mx-1">.</span>
                    <span
                      className="inline-block animate-bounce mx-1"
                      style={{ animationDelay: '0.2s' }}
                    >
                      .
                    </span>
                    <span
                      className="inline-block animate-bounce mx-1"
                      style={{ animationDelay: '0.4s' }}
                    >
                      .
                    </span>
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error state */}
          <AnimatePresence>
            {!isLoading && error && (
              <motion.div 
                className="max-w-md mx-auto my-20 text-center relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className={`absolute inset-0 ${
                  mode === 'dark'
                    ? 'bg-gradient-to-r from-red-500 to-pink-500'
                    : 'bg-gradient-to-r from-red-400 to-pink-400'
                } rounded-3xl blur-xl opacity-30`}></div>
                <div className={`relative ${
                  mode === 'dark'
                    ? 'bg-black/30 border-white/20'
                    : 'bg-white/40 border-red-200'
                } backdrop-blur-xl p-10 rounded-3xl border shadow-xl`}>
                  <h3 className={`text-2xl font-bold ${
                    mode === 'dark' ? 'text-white' : 'text-red-800'
                  } mb-3`}>
                    Oops! Something went wrong
                  </h3>
                  <p className={`${
                    mode === 'dark' ? 'text-purple-100' : 'text-red-600'
                  } mb-6`}>{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className={`px-6 py-3 ${
                      mode === 'dark'
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 shadow-purple-700/30'
                        : 'bg-gradient-to-r from-red-500 to-pink-500 shadow-red-500/30'
                    } rounded-xl text-white font-medium hover:${
                      mode === 'dark'
                        ? 'from-pink-600 hover:to-purple-700'
                        : 'from-red-600 hover:to-pink-600'
                    } transition-all duration-300 shadow-lg`}
                  >
                    Try Again
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Listings grid with colorful cards */}
          <AnimatePresence>
            {!isLoading && !error && filteredListings.length > 0 && (
              <motion.section 
                className="w-full pb-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {viewMode === 'grid' ? (
                  <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                    {filteredListings.map((item, index) => {
                      const colorScheme = cardColorSchemes[index % cardColorSchemes.length]

                      return (
                        <motion.div
                          key={item._id || index}
                          className="transform hover:scale-105 transition-transform duration-300"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.4 }}
                          whileHover={{ y: -5 }}
                        >
                          <Card
                            id={item.id}
                            _id={item._id || ''}
                            title={item.title}
                            price={item.price}
                            condition={item.condition}
                            image={item.images?.[0] || '/placeholder.jpg'}
                            colorScheme={colorScheme}
                          />
                        </motion.div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {filteredListings.map((item, index) => {
                      const colorScheme = cardColorSchemes[index % cardColorSchemes.length]

                      return (
                        <motion.div
                          key={item._id || index}
                          className={`${colorScheme.bg} ${colorScheme.text} rounded-xl overflow-hidden ${
                            mode === 'dark' ? 'shadow-lg' : 'shadow-md'
                          } hover:shadow-2xl transition-all duration-300 flex`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.4 }}
                          whileHover={{ scale: 1.02, x: 5 }}
                        >
                          <div className="w-32 h-32 md:w-48 md:h-48 relative overflow-hidden">
                            <SanitizedImage
                              src={item.images?.[0] || '/placeholder.jpg'}
                              alt={item.title}
                              className="w-full h-full object-cover"
                              width={192}
                              height={192}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                          </div>
                          <div className="p-6 flex-1">
                            <h3 className="text-xl font-bold mb-2 line-clamp-1">
                              {item.title}
                            </h3>
                            <p className="mb-4 opacity-90 line-clamp-2 text-sm">
                              {item.description}
                            </p>
                            <div className="flex justify-between items-center">
                              <span className="text-2xl font-bold">
                                ${item.price.toLocaleString()}
                              </span>
                              <span className="bg-black/20 px-3 py-1 rounded-full text-xs">
                                {item.condition}
                              </span>
                            </div>
                            <Link href={`/product/${item._id}`}>
                              <motion.button 
                                whileTap={{ scale: 0.95 }}
                                className="mt-4 px-6 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white font-medium hover:bg-white/30 transition-all duration-300 flex items-center gap-2"
                              >
                                View Details
                                <motion.svg 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  width="16" 
                                  height="16" 
                                  viewBox="0 0 24 24" 
                                  fill="none" 
                                  stroke="currentColor" 
                                  strokeWidth="2" 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" 
                                  className="lucide lucide-arrow-right"
                                  animate={{ x: [0, 5, 0] }}
                                  transition={{ repeat: Infinity, duration: 2 }}
                                >
                                  <path d="M5 12h14" />
                                  <path d="m12 5 7 7-7 7" />
                                </motion.svg>
                              </motion.button>
                            </Link>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                )}
              </motion.section>
            )}
          </AnimatePresence>

          {/* Empty state with vibrant design */}
          <AnimatePresence>
            {!isLoading && !error && filteredListings.length === 0 && (
              <motion.div 
                className="max-w-md mx-auto my-20 text-center relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <div className={`absolute inset-0 ${
                  mode === 'dark'
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500'
                    : 'bg-gradient-to-r from-indigo-400 to-purple-400'
                } rounded-3xl blur-xl opacity-30`}></div>
                <div className={`relative ${
                  mode === 'dark'
                    ? 'bg-black/30 border-white/20'
                    : 'bg-white/60 border-indigo-200'
                } backdrop-blur-xl p-10 rounded-3xl border shadow-xl`}>
                  <motion.div 
                    className={`mb-6 ${
                      mode === 'dark'
                        ? 'bg-gradient-to-br from-pink-500 to-purple-600'
                        : 'bg-gradient-to-br from-indigo-500 to-purple-500'
                    } p-6 inline-flex rounded-full shadow-lg`}
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <FiSearch size={32} className="text-white" />
                  </motion.div>
                  <h3 className={`text-2xl font-bold ${
                    mode === 'dark' ? 'text-white' : 'text-indigo-900'
                  } mb-3`}>
                    No listings found
                  </h3>
                  <p className={`${
                    mode === 'dark' ? 'text-purple-100' : 'text-indigo-700'
                  }`}>
                    We couldn&apos;t find any items matching your search. Try
                    different keywords or browse categories.
                  </p>
                  <motion.button
                    onClick={resetFilters}
                    className={`mt-6 px-6 py-3 ${
                      mode === 'dark'
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 shadow-purple-700/30'
                        : 'bg-gradient-to-r from-indigo-500 to-purple-500 shadow-indigo-500/30'
                    } rounded-xl text-white font-medium hover:${
                      mode === 'dark'
                        ? 'from-pink-600 hover:to-purple-700'
                        : 'from-indigo-600 hover:to-purple-600'
                    } transition-all duration-300 shadow-lg`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Browse All Categories
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right side floating header section (30% width) */}
        <div className="w-full lg:w-[30%] lg:pl-4 mb-8 lg:mb-0 lg:pt-18">
          <div className="lg:sticky lg:top-8">
            <motion.section 
              className="relative"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className={`absolute inset-0 ${
                mode === 'dark'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-500'
              } rounded-3xl blur-2xl opacity-30`}></div>
              <div className={`relative ${
                mode === 'dark'
                  ? 'bg-black/40 border-white/20'
                  : 'bg-white/60 border-indigo-200'
              } backdrop-blur-xl p-6 rounded-3xl shadow-2xl border`}>
                <h1 className={`text-2xl md:text-3xl font-bold mb-3 ${
                  mode === 'dark'
                    ? 'bg-gradient-to-r from-white to-pink-200 inline-block text-transparent bg-clip-text'
                    : 'bg-gradient-to-r from-indigo-700 to-purple-600 inline-block text-transparent bg-clip-text'
                }`}>
                  Trendora Marketplace
                </h1>
                <p className={`text-sm md:text-base ${
                  mode === 'dark' ? 'text-white' : 'text-indigo-900'
                } mb-6`}>
                  Discover amazing second-hand treasures from our community.
                </p>

                {/* Search and filter bar */}
                <div className="flex flex-col gap-4 mb-6">
                  <div className="relative flex-grow group">
                    <FiSearch className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                      mode === 'dark' ? 'text-purple-300' : 'text-indigo-500'
                    } text-lg z-10`} />
                    <input
                      type="text"
                      placeholder="What are you looking for?"
                      value={searchQuery}
                      onChange={handleSearch}
                      className={`w-full py-3 pl-10 pr-4 rounded-xl border ${
                        mode === 'dark'
                          ? 'border-purple-400/30 bg-white/10 backdrop-blur-md focus:bg-white/20 placeholder:text-purple-200/90 text-white'
                          : 'border-indigo-300/50 bg-white/60 backdrop-blur-md focus:bg-white/80 placeholder:text-indigo-500/70 text-indigo-900'
                      }
                      focus:ring-2 ${
                        mode === 'dark'
                          ? 'focus:ring-pink-500/50'
                          : 'focus:ring-indigo-400/50'
                      } focus:border-transparent
                      focus:outline-none transition-all duration-300`}
                    />
                    {searchQuery && (
                      <button
                        onClick={() => clearSearch()}
                        className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                          mode === 'dark'
                            ? 'text-purple-300 hover:text-white'
                            : 'text-indigo-500 hover:text-indigo-800'
                        }`}
                      >
                        <FiX size={16} />
                      </button>
                    )}

                    {/* Add animated focus ring */}
                    <motion.span 
                      className={`absolute inset-0 rounded-xl ${
                        mode === 'dark'
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                          : 'bg-gradient-to-r from-indigo-400 to-purple-400'
                      } opacity-0 group-focus-within:opacity-100 -z-10 blur-sm transition-opacity duration-300`}
                      animate={{ 
                        scale: [1, 1.02, 1],
                      }}
                      transition={{ 
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut"
                      }}
                    />
                  </div>

                  <div className="flex gap-2 items-center">
                    <motion.button
                      onClick={toggleFilters}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl 
                                ${
                                  mode === 'dark'
                                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-purple-700/30'
                                    : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 shadow-indigo-500/30'
                                } text-white 
                                transition-all duration-300
                                shadow-lg font-medium`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FiFilter size={16} />
                      <span>Filters</span>
                    </motion.button>

                    <div className="relative flex-1">
                      <motion.button
                        onClick={() => setShowSortOptions((prev) => !prev)}
                        className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl 
                                  ${
                                    mode === 'dark'
                                      ? 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                                      : 'bg-white/60 hover:bg-white/80 text-indigo-700 border-indigo-200'
                                  }
                                  transition-all duration-300 border`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FiArrowDown size={16} />
                        <span>Sort</span>
                      </motion.button>
                      {showSortOptions && (
                        <motion.div 
                          className={`absolute z-10 w-full mt-2 rounded-xl overflow-hidden ${
                            mode === 'dark'
                              ? 'bg-black/80 backdrop-blur-lg border border-white/10'
                              : 'bg-white/90 backdrop-blur-lg shadow-lg border border-indigo-100'
                          }`}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          {[
                            { key: 'default', label: 'Default' },
                            { key: 'price-low', label: 'Price: Low to High' },
                            { key: 'price-high', label: 'Price: High to Low' },
                            { key: 'newest', label: 'Newest First' }
                          ].map((sort) => (
                            <motion.button
                              key={sort.key}
                              onClick={() => handleSortChange(sort.key)}
                              className={`w-full text-left px-4 py-3 ${
                                mode === 'dark'
                                  ? `text-white ${sortOrder === sort.key ? 'bg-white/20' : 'hover:bg-white/10'}`
                                  : `text-indigo-900 ${sortOrder === sort.key ? 'bg-indigo-100' : 'hover:bg-indigo-50'}`
                              } transition-colors flex items-center justify-between`}
                              whileHover={{ x: 3 }}
                            >
                              {sort.label}
                              {sortOrder === sort.key && (
                                <motion.svg 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  width="16" 
                                  height="16" 
                                  viewBox="0 0 24 24" 
                                  fill="none" 
                                  stroke="currentColor" 
                                  strokeWidth="2" 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" 
                                  className={mode === 'dark' ? 'text-pink-400' : 'text-indigo-600'}
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1, rotate: 360 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <path d="M20 6 9 17l-5-5" />
                                </motion.svg>
                              )}
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Filter chips for categories */}
                <div className={`flex flex-wrap gap-2 mb-2 overflow-y-auto max-h-60 pr-2 ${
                  mode === 'dark' 
                    ? 'scrollbar-thin scrollbar-thumb-white/20' 
                    : 'scrollbar-thin scrollbar-thumb-indigo-300'
                }`}>
                  <motion.span
                    onClick={() => handleCategorySelect('all')}
                    className={`px-3 py-2 ${
                      selectedCategory === 'all'
                        ? mode === 'dark'
                          ? 'bg-pink-500 hover:bg-pink-600 shadow-md shadow-pink-600/20'
                          : 'bg-indigo-500 hover:bg-indigo-600 shadow-md shadow-indigo-500/20 text-white'
                        : mode === 'dark'
                          ? 'bg-white/10 hover:bg-white/20 border border-white/10'
                          : 'bg-white/60 hover:bg-indigo-100 border border-indigo-200 text-indigo-700'
                    } cursor-pointer ${
                      mode === 'dark' || selectedCategory === 'all' ? 'text-white' : ''
                    } rounded-full text-xs font-medium 
                      transition-all duration-300 backdrop-blur-sm flex items-center gap-1 mb-1`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    All
                  </motion.span>

                  {categories.map((category) => (
                    <motion.span
                      key={category}
                      onClick={() => handleCategorySelect(category)}
                      className={`px-3 py-2 ${
                        selectedCategory === category
                          ? mode === 'dark'
                            ? 'bg-pink-500 hover:bg-pink-600 shadow-md shadow-pink-600/20'
                            : 'bg-indigo-500 hover:bg-indigo-600 shadow-md shadow-indigo-500/20 text-white'
                          : mode === 'dark'
                            ? 'bg-white/10 hover:bg-white/20 border border-white/10'
                            : 'bg-white/60 hover:bg-indigo-100 border border-indigo-200 text-indigo-700'
                      } cursor-pointer ${
                        mode === 'dark' || selectedCategory === category ? '' : ''
                      } rounded-full text-xs font-medium 
                        transition-all duration-300 backdrop-blur-sm flex items-center gap-1 mb-1`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {formatCategoryName(category)}
                    </motion.span>
                  ))}
                </div>

                {/* Advanced filters panel */}
                <div className={`mt-6 p-6 ${
                  mode === 'dark'
                    ? 'bg-black/30 border-white/10'
                    : 'bg-white/50 border-indigo-100'
                } backdrop-blur-md rounded-xl border animate-fadeIn`}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className={`text-lg font-semibold ${
                      mode === 'dark' ? 'text-white' : 'text-indigo-900'
                    }`}>
                      <motion.span
                        className="inline-flex items-center gap-2"
                        animate={{ x: [0, 3, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        <FiSliders size={16} />
                        Advanced Filters
                      </motion.span>
                    </h3>
                    <button
                      onClick={resetFilters}
                      className={`${
                        mode === 'dark' 
                          ? 'text-pink-300 hover:text-pink-100' 
                          : 'text-indigo-600 hover:text-indigo-800'
                      } text-xs underline`}
                    >
                      Reset All
                    </button>
                  </div>

                  {/* Condition filter */}
                  <div className="mb-6">
                    <h4 className={`${
                      mode === 'dark' ? 'text-white' : 'text-indigo-900'
                    } mb-2 font-medium text-sm`}>
                      Condition
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {['excellent', 'good', 'fair', 'poor'].map(
                        (condition) => (
                          <motion.button
                            key={condition}
                            onClick={() => handleConditionChange(condition)}
                            className={`px-3 py-1 rounded-lg text-xs ${
                              filterCondition === condition
                                ? mode === 'dark'
                                  ? 'bg-pink-500 text-white'
                                  : 'bg-indigo-500 text-white'
                                : mode === 'dark'
                                  ? 'bg-white/10 text-white hover:bg-white/20'
                                  : 'bg-white/60 text-indigo-800 hover:bg-indigo-100'
                            } transition-all duration-200`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {condition.charAt(0).toUpperCase() +
                              condition.slice(1)}
                          </motion.button>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Price range filter */}
                  <div>
                    <h4 className={`${
                      mode === 'dark' ? 'text-white' : 'text-indigo-900'
                    } mb-2 font-medium text-sm`}>
                      Price Range
                    </h4>
                    <div className="flex gap-2 items-center">
                      <div className="relative group">
                        <span className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                          mode === 'dark' ? 'text-purple-300' : 'text-indigo-600'
                        } text-xs`}>
                          $
                        </span>
                        <input
                          type="number"
                          value={minPrice}
                          onChange={(e) =>
                            handlePriceRangeChange('min', e.target.value)
                          }
                          className={`w-full py-2 pl-6 pr-2 rounded-lg border ${
                            mode === 'dark'
                              ? 'border-purple-400/30 bg-white/10 focus:bg-white/20 text-white'
                              : 'border-indigo-300/50 bg-white/60 focus:bg-white/80 text-indigo-900'
                          } backdrop-blur-sm text-xs focus:ring-1 ${
                            mode === 'dark'
                              ? 'focus:ring-pink-500/50'
                              : 'focus:ring-indigo-400/50'
                          } focus:outline-none`}
                        />
                        {/* Animated focus ring */}
                        <motion.span 
                          className={`absolute inset-0 rounded-lg ${
                            mode === 'dark'
                              ? 'bg-purple-500/30'
                              : 'bg-indigo-400/20'
                          } opacity-0 group-focus-within:opacity-100 -z-10 blur-sm transition-opacity duration-300`}
                        />
                      </div>
                      <span className={`${
                        mode === 'dark' ? 'text-white' : 'text-indigo-900'
                      }`}>to</span>
                      <div className="relative group">
                        <span className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                          mode === 'dark' ? 'text-purple-300' : 'text-indigo-600'
                        } text-xs`}>
                          $
                        </span>
                        <input
                          type="number"
                          value={maxPrice}
                          onChange={(e) =>
                            handlePriceRangeChange('max', e.target.value)
                          }
                          className={`w-full py-2 pl-6 pr-2 rounded-lg border ${
                            mode === 'dark'
                              ? 'border-purple-400/30 bg-white/10 focus:bg-white/20 text-white'
                              : 'border-indigo-300/50 bg-white/60 focus:bg-white/80 text-indigo-900'
                          } backdrop-blur-sm text-xs focus:ring-1 ${
                            mode === 'dark'
                              ? 'focus:ring-pink-500/50'
                              : 'focus:ring-indigo-400/50'
                          } focus:outline-none`}
                        />
                        {/* Animated focus ring */}
                        <motion.span 
                          className={`absolute inset-0 rounded-lg ${
                            mode === 'dark'
                              ? 'bg-purple-500/30'
                              : 'bg-indigo-400/20'
                          } opacity-0 group-focus-within:opacity-100 -z-10 blur-sm transition-opacity duration-300`}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-gradient-to-br from-pink-400/20 to-purple-600/20 blur-xl -z-10" />
                <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full bg-gradient-to-br from-blue-400/20 to-cyan-500/20 blur-xl -z-10" />
                
                {mounted && mode === 'light' && (
                  <motion.div 
                    className="absolute top-2 right-2 opacity-70"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.6, 0.8, 0.6]
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity
                    }}
                  >
                    <svg width="80" height="80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                      <path d="M50 5 L55 40 L90 50 L55 60 L50 95 L45 60 L10 50 L45 40 Z" fill="url(#star-gradient)" />
                      <defs>
                        <linearGradient id="star-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#818cf8" />
                          <stop offset="100%" stopColor="#c084fc" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </motion.div>
                )}

                {mounted && mode === 'dark' && (
                  <motion.div 
                    className="absolute -top-6 -right-6 opacity-70"
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <svg width="120" height="120" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="url(#circle-gradient)" strokeWidth="1" />
                      <defs>
                        <linearGradient id="circle-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#d946ef" stopOpacity="0.6" />
                          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.6" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </motion.div>
                )}
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </main>
  )
}