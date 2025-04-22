'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
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

// Define the category enum
export enum ListingCategory {
  Electronics = 'electronics',
  Mobile = 'mobile',
  Computers = 'computers',
  Appliances = 'appliances',
  Furniture = 'furniture',
  Clothing = 'clothing',
  Footwear = 'footwear',
  Accessories = 'accessories',
  Vehicles = 'vehicles',
  Books = 'books',
  Sports = 'sports',
  Toys = 'toys',
  Health = 'health',
  Beauty = 'beauty',
  Jewelry = 'jewelry',
  Tools = 'tools',
  Gardening = 'gardening',
  MusicalInstruments = 'musicalinstruments',
  OfficeSupplies = 'officesupplies',
  PetSupplies = 'petsupplies',
  BabyProducts = 'babyproducts',
  ArtCollectibles = 'artcollectibles',
  Gaming = 'gaming',
  Cameras = 'cameras',
  RealEstate = 'realestate',
  Other = 'other',
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
  const [listings, setListings] = useState<Listing[]>([])
  const [filteredListings, setFilteredListings] = useState<Listing[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortOrder, setSortOrder] = useState<string>('default')
  const [showFilters, setShowFilters] = useState<boolean>(false)
  const [filterCondition, setFilterCondition] = useState<string>('all')
  const [filterPriceRange, setFilterPriceRange] = useState<{
    min: number
    max: number
  }>({ min: 0, max: 10000 })

  // Create array of categories from enum
  const categories = Object.values(ListingCategory)

  // Fetch listings
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // Fetch listings
        const listingsResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/listings`,
          {
            cache: 'no-store',
          },
        )
        if (!listingsResponse.ok) throw new Error('Failed to fetch listings')
        const listingsData = await listingsResponse.json()

        setListings(listingsData.data)
        setFilteredListings(listingsData.data)
      } catch (error) {
        console.error(error)
        setError('Failed to load data. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Apply filters when any filter parameter changes
  useEffect(() => {
    let result = [...listings]

    // Filter by search query
    if (searchQuery) {
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter((item) => item.category === selectedCategory)
    }

    // Filter by condition
    if (filterCondition !== 'all') {
      result = result.filter(
        (item) =>
          item.condition.toLowerCase() === filterCondition.toLowerCase(),
      )
    }

    // Filter by price range
    result = result.filter(
      (item) =>
        item.price >= filterPriceRange.min &&
        item.price <= filterPriceRange.max,
    )

    // Apply sorting
    if (sortOrder === 'price-low') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortOrder === 'price-high') {
      result.sort((a, b) => b.price - a.price)
    } else if (sortOrder === 'newest') {
      // If your listings have a timestamp, you can sort by that
      // For now, we'll keep the order as is since we don't have timestamps
    }

    setFilteredListings(result)
  }, [
    searchQuery,
    selectedCategory,
    filterCondition,
    filterPriceRange,
    sortOrder,
    listings,
  ])

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // Handle category selection
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
  }

  // Handle sort order change
  const handleSortChange = (order: string) => {
    setSortOrder(order)
  }

  // Toggle filter panel
  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  // Handle condition filter change
  const handleConditionChange = (condition: string) => {
    setFilterCondition(condition)
  }

  // Handle price range filter change
  const handlePriceRangeChange = (type: 'min' | 'max', value: string) => {
    const numValue = parseInt(value) || 0
    setFilterPriceRange((prev) => ({
      ...prev,
      [type]: numValue,
    }))
  }

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setFilterCondition('all')
    setFilterPriceRange({ min: 0, max: 10000 })
    setSortOrder('default')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 px-4 py-8 md:px-8">
      {/* Floating header section */}
      <section className="max-w-7xl mx-auto mb-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-30"></div>
        <div className="relative bg-black/40 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-2xl border border-white/20">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white to-pink-200 inline-block text-transparent bg-clip-text">
            SwapNest Marketplace
          </h1>
          <p className="text-lg text-white mb-8 max-w-2xl">
            Discover amazing second-hand treasures from our community. Find
            unique items that tell a story.
          </p>

          {/* Search and filter bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300 text-xl" />
              <input
                type="text"
                placeholder="What are you looking for today?"
                value={searchQuery}
                onChange={handleSearch}
                className="w-full py-4 pl-12 pr-4 rounded-xl border border-purple-400/30
                          bg-white/20 backdrop-blur-md focus:bg-white/30
                          placeholder:text-purple-200/90 text-white text-lg
                          focus:ring-2 focus:ring-pink-500/50 focus:border-transparent
                          focus:outline-none transition-all duration-300"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-300 hover:text-white"
                >
                  <FiX size={18} />
                </button>
              )}
            </div>

            <div className="flex gap-3 items-center">
              <button
                onClick={toggleFilters}
                className="flex items-center gap-2 py-4 px-5 rounded-xl 
                          bg-gradient-to-r from-pink-500 to-purple-600 text-white 
                          hover:from-pink-600 hover:to-purple-700 transition-all duration-300
                          shadow-lg shadow-purple-700/30 font-medium"
              >
                <FiFilter size={18} />
                <span>Filters</span>
              </button>

              <div className="relative">
                <button
                  onClick={() =>
                    setSortOrder((prev) =>
                      prev === 'default' ? 'price-low' : 'default',
                    )
                  }
                  className="flex items-center gap-2 py-4 px-5 rounded-xl 
                            bg-white/10 hover:bg-white/20 text-white border border-white/20
                            transition-all duration-300"
                >
                  <FiArrowDown size={18} />
                  <span>Sort</span>
                </button>
                {sortOrder !== 'default' && (
                  <div className="absolute right-0 top-full mt-2 bg-black/30 !backdrop-blur-md rounded-xl overflow-hidden z-20 border border-white/20 w-48 shadow-xl ">
                    <button
                      onClick={() => handleSortChange('default')}
                      className={`w-full text-left px-4 py-3 text-white hover:bg-white/20 transition-all duration-200 ${sortOrder === 'default' ? 'bg-white/20' : ''}`}
                    >
                      Default
                    </button>
                    <button
                      onClick={() => handleSortChange('price-low')}
                      className={`w-full text-left px-4 py-3 text-white hover:bg-white/20 transition-all duration-200 ${sortOrder === 'price-low' ? 'bg-white/20' : ''}`}
                    >
                      Price: Low to High
                    </button>
                    <button
                      onClick={() => handleSortChange('price-high')}
                      className={`w-full text-left px-4 py-3 text-white hover:bg-white/20 transition-all duration-200 ${sortOrder === 'price-high' ? 'bg-white/20' : ''}`}
                    >
                      Price: High to Low
                    </button>
                    <button
                      onClick={() => handleSortChange('newest')}
                      className={`w-full text-left px-4 py-3 text-white hover:bg-white/20 transition-all duration-200 ${sortOrder === 'newest' ? 'bg-white/20' : ''}`}
                    >
                      Newest First
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Filter chips for categories */}
          <div className="flex flex-wrap gap-3 mb-2">
            <span
              onClick={() => handleCategorySelect('all')}
              className={`px-6 py-3 ${
                selectedCategory === 'all'
                  ? 'bg-pink-500 hover:bg-pink-600 shadow-md shadow-pink-600/20'
                  : 'bg-white/10 hover:bg-white/20 border border-white/10'
              } cursor-pointer text-white rounded-full text-sm font-medium 
                transition-all duration-300 backdrop-blur-sm flex items-center gap-2`}
            >
              All Categories
            </span>

            {categories.map((category) => (
              <span
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={`px-6 py-3 ${
                  selectedCategory === category
                    ? 'bg-pink-500 hover:bg-pink-600 shadow-md shadow-pink-600/20'
                    : 'bg-white/10 hover:bg-white/20 border border-white/10'
                } cursor-pointer text-white rounded-full text-sm font-medium 
                  transition-all duration-300 backdrop-blur-sm flex items-center gap-2`}
              >
                {formatCategoryName(category)}
              </span>
            ))}
          </div>

          {/* Advanced filters panel (conditionally rendered) */}
          {showFilters && (
            <div className="mt-6 p-6 bg-black/30 backdrop-blur-md rounded-xl border border-white/10 animate-fadeIn">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-white">
                  Advanced Filters
                </h3>
                <button
                  onClick={resetFilters}
                  className="text-pink-300 hover:text-pink-100 text-sm underline"
                >
                  Reset All
                </button>
              </div>

              {/* Condition filter */}
              <div className="mb-6">
                <h4 className="text-white mb-2 font-medium">Condition</h4>
                <div className="flex flex-wrap gap-2">
                  {['all', 'new', 'like new', 'good', 'fair', 'poor'].map(
                    (condition) => (
                      <button
                        key={condition}
                        onClick={() => handleConditionChange(condition)}
                        className={`px-4 py-2 rounded-lg text-sm ${
                          filterCondition === condition
                            ? 'bg-pink-500 text-white'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        } transition-all duration-200`}
                      >
                        {condition.charAt(0).toUpperCase() + condition.slice(1)}
                      </button>
                    ),
                  )}
                </div>
              </div>

              {/* Price range filter */}
              <div>
                <h4 className="text-white mb-2 font-medium">Price Range</h4>
                <div className="flex gap-4 items-center">
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300">
                      $
                    </span>
                    <input
                      type="number"
                      value={filterPriceRange.min}
                      onChange={(e) =>
                        handlePriceRangeChange('min', e.target.value)
                      }
                      className="w-full py-2 pl-8 pr-4 rounded-lg border border-purple-400/30
                                bg-white/10 backdrop-blur-sm focus:bg-white/20
                                text-white focus:ring-1 focus:ring-pink-500/50 focus:outline-none"
                    />
                  </div>
                  <span className="text-white">to</span>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300">
                      $
                    </span>
                    <input
                      type="number"
                      value={filterPriceRange.max}
                      onChange={(e) =>
                        handlePriceRangeChange('max', e.target.value)
                      }
                      className="w-full py-2 pl-8 pr-4 rounded-lg border border-purple-400/30
                                bg-white/10 backdrop-blur-sm focus:bg-white/20
                                text-white focus:ring-1 focus:ring-pink-500/50 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      {/* Results count */}
      <div className="max-w-7xl mx-auto mb-6 flex justify-between items-center">
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
        <section className="max-w-7xl mx-auto pb-20">
          {viewMode === 'grid' ? (
            <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredListings.map((item, index) => {
                const colorScheme =
                  cardColorSchemes[index % cardColorSchemes.length]

                return (
                  <div
                    key={item._id}
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
                    key={item._id}
                    className={`${colorScheme.bg} ${colorScheme.text} rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex`}
                  >
                    <div className="w-32 h-32 md:w-48 md:h-48">
                      <Image
                        src={item.images?.[0] || '/placeholder.jpg'}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        width={192}
                        height={192}
                      />
                    </div>
                    <div className="p-6 flex-1">
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
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
    </main>
  )
}
