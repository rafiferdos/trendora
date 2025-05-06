'use client'

import SanitizedImage from '@/components/shared/SanitizedImage'
import { ListingCategory } from '@/types/listings/listing'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  FiArrowDown,
  FiFilter,
  FiGrid,
  FiList,
  FiSearch,
  FiX,
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

// Array of color schemes for cards
const cardColorSchemes = [
  { bg: 'bg-gradient-to-br from-pink-500 to-rose-500', text: 'text-white' },
  { bg: 'bg-gradient-to-br from-amber-400 to-orange-500', text: 'text-white' },
  { bg: 'bg-gradient-to-br from-emerald-500 to-teal-600', text: 'text-white' },
  { bg: 'bg-gradient-to-br from-sky-400 to-blue-600', text: 'text-white' },
  { bg: 'bg-gradient-to-br from-purple-500 to-indigo-600', text: 'text-white' },
]

export default function AllListsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

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

  // Get values from query params
  // const searchQuery = searchParams.get('searchTerm') || '';
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
  // useEffect(() => {
  //   const fetchFilteredListings = async () => {
  //     setIsLoading(true);
  //     setError(null);

  //     try {
  //       const queryParams = new URLSearchParams();

  //       if (searchQuery) queryParams.set('searchTerm', searchQuery);
  //       if (selectedCategory !== 'all')
  //         queryParams.set('category', selectedCategory);
  //       if (filterCondition !== 'all')
  //         queryParams.set('condition', filterCondition);
  //       if (minPrice) queryParams.set('minPrice', String(minPrice));
  //       if (maxPrice) queryParams.set('maxPrice', String(maxPrice));

  //       const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API}/listings?${queryParams.toString()}`;
  //       console.log('Querying backend with:', apiUrl);

  //       const res = await fetch(apiUrl, {
  //         cache: 'no-store',
  //         headers: { 'Content-Type': 'application/json' },
  //       });

  //       if (!res.ok) {
  //         const text = await res.text();
  //         throw new Error(`${text}`);
  //       }

  //       const data = await res.json();
  //       if (!Array.isArray(data.data)) {
  //         throw new Error('Invalid data format received');
  //       }

  //       let sortedListings = data.data;

  //       if (sortOrder === 'price-low') {
  //         sortedListings = sortedListings.sort((a: any, b: any) => a.price - b.price);
  //       } else if (sortOrder === 'price-high') {
  //         sortedListings = sortedListings.sort((a: any, b: any) => b.price - a.price);
  //       }

  //       setFilteredListings(sortedListings);
  //     } catch (err) {
  //       console.error('Filter fetch failed:', err);
  //       setError(err instanceof Error ? err.message : 'Unknown error');
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchFilteredListings();
  // }, [searchQuery, selectedCategory, filterCondition, minPrice, maxPrice, sortOrder]);
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
    router.push('/')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 px-4 py-8 md:px-8">
      {/* Main content layout with flex */}
      <div className="flex flex-col-reverse lg:flex-row-reverse gap-16">
        {/* Left side content area (70% width) */}
        <div className="w-full lg:w-[70%] lg:pr-8">
          {/* Results count */}
          <div className="max-w-full mx-auto mb-6 flex justify-between items-center">
            <p className="text-purple-100 text-lg">
              <span className="font-bold text-white text-xl mr-1">
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
                              ? 'bg-white/10 text-white'
                              : 'bg-white/5 text-white/70'
                          } 
                          hover:bg-white/20 transition-all duration-300
                          border border-white/10`}
              >
                <FiGrid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center justify-center p-3 rounded-xl 
                          ${
                            viewMode === 'list'
                              ? 'bg-white/10 text-white'
                              : 'bg-white/5 text-white/70'
                          } 
                          hover:bg-white/20 transition-all duration-300
                          border border-white/10`}
              >
                <FiList size={20} />
              </button>
            </div>
          </div>

          {/* Loading state with modern animation */}
          {isLoading && (
            <div className="max-w-md mx-auto my-20 text-center">
              <div className="relative bg-black/40 backdrop-blur-xl p-10 rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 via-pink-500/30 to-blue-500/30 animate-gradient-x"></div>

                {/* Staggered animated dots */}
                <div className="relative flex justify-center items-center gap-4 py-6">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className={`w-4 h-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 animate-bounce`}
                      style={{ animationDelay: `${i * 0.15}s` }}
                    ></div>
                  ))}
                </div>

                {/* Animated glowing ring */}
                <div className="relative flex justify-center items-center my-4">
                  <div
                    className="w-20 h-20 rounded-full border-4 border-transparent 
                          border-t-pink-500 border-r-purple-500 border-b-blue-500
                          animate-spin"
                  ></div>
                  <div
                    className="absolute w-14 h-14 rounded-full bg-gradient-to-br from-pink-500/80 to-purple-600/80 
                          blur-sm animate-pulse"
                  ></div>
                  <div className="absolute">
                    <svg
                      className="w-8 h-8 text-white animate-pulse"
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

                <p className="text-white mt-6 font-medium">
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
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="max-w-md mx-auto my-20 text-center relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl blur-xl opacity-30"></div>
              <div className="relative bg-black/30 backdrop-blur-xl p-10 rounded-3xl border border-white/20 shadow-xl">
                <h3 className="text-2xl font-bold text-white mb-3">
                  Oops! Something went wrong
                </h3>
                <p className="text-purple-100 mb-6">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl text-white font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-purple-700/30"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Listings grid with colorful cards */}
          {!isLoading && !error && (
            <section className="w-full pb-20">
              {viewMode === 'grid' ? (
                <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredListings.map((item, index) => {
                    const colorScheme =
                      cardColorSchemes[index % cardColorSchemes.length]

                    return (
                      <div
                        key={item._id || index}
                        className="transform hover:scale-105 transition-transform duration-300"
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
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {filteredListings.map((item, index) => {
                    const colorScheme =
                      cardColorSchemes[index % cardColorSchemes.length]

                    return (
                      <div
                        key={item._id || index}
                        className={`${colorScheme.bg} ${colorScheme.text} rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex`}
                      >
                        <div className="w-32 h-32 md:w-48 md:h-48">
                          <SanitizedImage
                            src={item.images?.[0] || '/placeholder.jpg'}
                            alt={item.title}
                            className="w-full h-full object-cover rounded-br-2xl"
                            width={192}
                            height={192}
                          />
                        </div>
                        <div className="p-6 flex-1">
                          <h3 className="text-xl font-bold mb-2">
                            {item.title}
                          </h3>
                          <p className="mb-4 opacity-90 line-clamp-2">
                            {item.description}
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-2xl font-bold">
                              ${item.price}
                            </span>
                            <span className="bg-black/20 px-3 py-1 rounded-full text-xs">
                              {item.condition}
                            </span>
                          </div>
                          <button className="mt-4 px-4 py-2 bg-white/20 rounded-lg text-white font-medium hover:bg-white/20 transition-all duration-300">
                            <Link href={`/product/${item._id}`}>
                              View Details
                            </Link>
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </section>
          )}

          {/* Empty state with vibrant design */}
          {!isLoading && !error && filteredListings.length === 0 && (
            <div className="max-w-md mx-auto my-20 text-center relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl blur-xl opacity-30"></div>
              <div className="relative bg-black/30 backdrop-blur-xl p-10 rounded-3xl border border-white/20 shadow-xl">
                <div className="mb-6 bg-gradient-to-br from-pink-500 to-purple-600 p-6 inline-flex rounded-full shadow-lg">
                  <FiSearch size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  No listings found
                </h3>
                <p className="text-purple-100">
                  We couldn&apos;t find any items matching your search. Try
                  different keywords or browse categories.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-6 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl text-white font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-purple-700/30"
                >
                  Browse All Categories
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right side floating header section (30% width) */}
        <div className="w-full lg:w-[30%] lg:pl-4 mb-8 lg:mb-0 lg:pt-18">
          <div className="lg:sticky lg:top-8">
            <section className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-30"></div>
              <div className="relative bg-black/40 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/20">
                <h1 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-white to-pink-200 inline-block text-transparent bg-clip-text">
                Trendora Marketplace
                </h1>
                <p className="text-sm md:text-base text-white mb-6">
                  Discover amazing second-hand treasures from our community.
                </p>

                {/* Search and filter bar */}
                <div className="flex flex-col gap-4 mb-6">
                  <div className="relative flex-grow">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-300 text-lg" />
                    <input
                      type="text"
                      placeholder="What are you looking for?"
                      value={searchQuery}
                      onChange={handleSearch}
                      className="w-full py-3 pl-10 pr-4 rounded-xl border border-purple-400/30
                                bg-white/20 backdrop-blur-md focus:bg-white/30
                                placeholder:text-purple-200/90 text-white
                                focus:ring-2 focus:ring-pink-500/50 focus:border-transparent
                                focus:outline-none transition-all duration-300"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => clearSearch()}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-300 hover:text-white"
                      >
                        <FiX size={16} />
                      </button>
                    )}
                  </div>

                  <div className="flex gap-2 items-center">
                    <button
                      onClick={toggleFilters}
                      className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl 
                                bg-gradient-to-r from-pink-500 to-purple-600 text-white 
                                hover:from-pink-600 hover:to-purple-700 transition-all duration-300
                                shadow-lg shadow-purple-700/30 font-medium"
                    >
                      <FiFilter size={16} />
                      <span>Filters</span>
                    </button>

                    <div className="relative flex-1">
                      <button
                        onClick={() => setShowSortOptions((prev) => !prev)}
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl 
                                  bg-white/10 hover:bg-white/20 text-white border border-white/20
                                  transition-all duration-300"
                      >
                        <FiArrowDown size={16} />
                        <span>Sort</span>
                      </button>
                      {showSortOptions && (
                        <div className="absolute z-10 bg-black">
                          {['default', 'price-low', 'price-high', 'newest'].map(
                            (sortKey) => (
                              <button
                                key={sortKey}
                                onClick={() => {
                                  handleSortChange(sortKey)
                                  setShowSortOptions(false)
                                }}
                                className={`w-full text-left px-4 py-3 text-white hover:bg-white/20 ${
                                  sortOrder === sortKey ? 'bg-white/20' : ''
                                }`}
                              >
                                {sortKey === 'default'
                                  ? 'Default'
                                  : sortKey === 'price-low'
                                    ? 'Price: Low to High'
                                    : sortKey === 'price-high'
                                      ? 'Price: High to Low'
                                      : 'Newest First'}
                              </button>
                            ),
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Filter chips for categories */}
                <div className="flex flex-wrap gap-2 mb-2 overflow-y-auto max-h-60 pr-2 scrollbar-thin scrollbar-thumb-white/20">
                  <span
                    onClick={() => handleCategorySelect('all')}
                    className={`px-3 py-2 ${
                      selectedCategory === 'all'
                        ? 'bg-pink-500 hover:bg-pink-600 shadow-md shadow-pink-600/20'
                        : 'bg-white/10 hover:bg-white/20 border border-white/10'
                    } cursor-pointer text-white rounded-full text-xs font-medium 
                      transition-all duration-300 backdrop-blur-sm flex items-center gap-1 mb-1`}
                  >
                    All
                  </span>

                  {categories.map((category) => (
                    <span
                      key={category}
                      onClick={() => handleCategorySelect(category)}
                      className={`px-3 py-2 ${
                        selectedCategory === category
                          ? 'bg-pink-500 hover:bg-pink-600 shadow-md shadow-pink-600/20'
                          : 'bg-white/10 hover:bg-white/20 border border-white/10'
                      } cursor-pointer text-white rounded-full text-xs font-medium 
                        transition-all duration-300 backdrop-blur-sm flex items-center gap-1 mb-1`}
                    >
                      {formatCategoryName(category)}
                    </span>
                  ))}
                </div>

                {/* Advanced filters panel (conditionally rendered) */}

                <div className="mt-6 p-6 bg-black/30 backdrop-blur-md rounded-xl border border-white/10 animate-fadeIn">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-white">
                      Advanced Filters
                    </h3>
                    <button
                      onClick={resetFilters}
                      className="text-pink-300 hover:text-pink-100 text-xs underline"
                    >
                      Reset All
                    </button>
                  </div>

                  {/* Condition filter */}
                  <div className="mb-6">
                    <h4 className="text-white mb-2 font-medium text-sm">
                      Condition
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {['excellent', 'good', 'fair', 'poor'].map(
                        (condition) => (
                          <button
                            key={condition}
                            onClick={() => handleConditionChange(condition)}
                            className={`px-3 py-1 rounded-lg text-xs ${
                              filterCondition === condition
                                ? 'bg-pink-500 text-white'
                                : 'bg-white/10 text-white hover:bg-white/20'
                            } transition-all duration-200`}
                          >
                            {condition.charAt(0).toUpperCase() +
                              condition.slice(1)}
                          </button>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Price range filter */}
                  <div>
                    <h4 className="text-white mb-2 font-medium text-sm">
                      Price Range
                    </h4>
                    <div className="flex gap-2 items-center">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-300 text-xs">
                          $
                        </span>
                        <input
                          type="number"
                          value={minPrice}
                          onChange={(e) =>
                            handlePriceRangeChange('min', e.target.value)
                          }
                          className="w-full py-2 pl-6 pr-2 rounded-lg border border-purple-400/30
                                      bg-white/10 backdrop-blur-sm focus:bg-white/20
                                      text-white text-xs focus:ring-1 focus:ring-pink-500/50 focus:outline-none"
                        />
                      </div>
                      <span className="text-white">to</span>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-300 text-xs">
                          $
                        </span>
                        <input
                          type="number"
                          value={maxPrice}
                          onChange={(e) =>
                            handlePriceRangeChange('max', e.target.value)
                          }
                          className="w-full py-2 pl-6 pr-2 rounded-lg border border-purple-400/30
                                      bg-white/10 backdrop-blur-sm focus:bg-white/20
                                      text-white text-xs focus:ring-1 focus:ring-pink-500/50 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
