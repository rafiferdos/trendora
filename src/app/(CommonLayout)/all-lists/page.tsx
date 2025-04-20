import { FiGrid, FiList, FiSearch, FiFilter, FiArrowDown } from 'react-icons/fi'
import dynamic from 'next/dynamic'

// Import Card component dynamically to avoid issues with Image component
const Card = dynamic(() => import('@/components/shared/Card'), {
  ssr: true,
})

interface Listing {
  _id: string
  title: string
  description: string
  price: number
  condition: string
  images?: string[]
  userID?: string
  status?: 'available' | 'sold'
}

async function getListings() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/listings`, {
    cache: 'no-store',
  })
  if (!res.ok) throw new Error('Failed to fetch listings')
  return res.json()
}

// Array of color schemes for cards
const cardColorSchemes = [
  { bg: 'bg-gradient-to-br from-pink-500 to-rose-500', text: 'text-white' },
  { bg: 'bg-gradient-to-br from-amber-400 to-orange-500', text: 'text-white' },
  { bg: 'bg-gradient-to-br from-emerald-500 to-teal-600', text: 'text-white' },
  { bg: 'bg-gradient-to-br from-sky-400 to-blue-600', text: 'text-white' },
  { bg: 'bg-gradient-to-br from-purple-500 to-indigo-600', text: 'text-white' },
]

export default async function AllListsPage() {
  let listings: Listing[] = []
  try {
    const result = await getListings()
    listings = result.data
  } catch (error) {
    console.error(error)
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
                className="w-full py-4 pl-12 pr-4 rounded-xl border border-purple-400/30
                          bg-white/20 backdrop-blur-md focus:bg-white/30
                          placeholder:text-purple-200/90 text-white text-lg
                          focus:ring-2 focus:ring-pink-500/50 focus:border-transparent
                          focus:outline-none transition-all duration-300"
              />
            </div>

            <div className="flex gap-3 items-center">
              <button
                className="flex items-center gap-2 py-4 px-5 rounded-xl 
                          bg-gradient-to-r from-pink-500 to-purple-600 text-white 
                          hover:from-pink-600 hover:to-purple-700 transition-all duration-300
                          shadow-lg shadow-purple-700/30 font-medium"
              >
                <FiFilter size={18} />
                <span>Filters</span>
              </button>

              <button
                className="flex items-center gap-2 py-4 px-5 rounded-xl 
                          bg-white/10 hover:bg-white/20 text-white border border-white/20
                          transition-all duration-300"
              >
                <FiArrowDown size={18} />
                <span>Sort</span>
              </button>
            </div>
          </div>

          {/* Filter chips */}
          <div className="flex flex-wrap gap-3 mb-2">
            <span
              className="px-6 py-3 bg-pink-500 hover:bg-pink-600 cursor-pointer
                        text-white rounded-full text-sm font-medium transition-all duration-300
                        shadow-md shadow-pink-600/20 flex items-center gap-2"
            >
              All Categories
            </span>
            <span
              className="px-6 py-3 bg-white/10 hover:bg-white/20 cursor-pointer
                        text-white rounded-full text-sm font-medium transition-all duration-300
                        border border-white/10 backdrop-blur-sm"
            >
              Electronics
            </span>
            <span
              className="px-6 py-3 bg-white/10 hover:bg-white/20 cursor-pointer
                        text-white rounded-full text-sm font-medium transition-all duration-300
                        border border-white/10 backdrop-blur-sm"
            >
              Furniture
            </span>
            <span
              className="px-6 py-3 bg-white/10 hover:bg-white/20 cursor-pointer
                        text-white rounded-full text-sm font-medium transition-all duration-300
                        border border-white/10 backdrop-blur-sm"
            >
              Clothing
            </span>
            <span
              className="px-6 py-3 bg-white/10 hover:bg-white/20 cursor-pointer
                        text-white rounded-full text-sm font-medium transition-all duration-300
                        border border-white/10 backdrop-blur-sm"
            >
              Decor
            </span>
          </div>
        </div>
      </section>

      {/* Results count */}
      <div className="max-w-7xl mx-auto mb-6 flex justify-between items-center">
        <p className="text-purple-100 text-lg">
          <span className="font-bold text-white text-xl mr-1">
            {listings.length}
          </span>{' '}
          incredible finds waiting for you
        </p>

        <div className="flex gap-3">
          <button
            className="flex items-center justify-center p-3 rounded-xl 
                      bg-white/10 hover:bg-white/20 text-white transition-all duration-300
                      border border-white/10"
          >
            <FiGrid size={20} />
          </button>
          <button
            className="flex items-center justify-center p-3 rounded-xl 
                      bg-white/5 hover:bg-white/10 text-white/70 transition-all duration-300
                      border border-white/5"
          >
            <FiList size={20} />
          </button>
        </div>
      </div>

      {/* Listings grid with colorful cards */}
      <section className="max-w-7xl mx-auto pb-20">
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {listings.map((item, index) => {
            const colorScheme =
              cardColorSchemes[index % cardColorSchemes.length]

            return (
              <div
                key={item._id}
                className="transform hover:scale-105 transition-transform duration-300"
              >
                <Card
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
      </section>

      {/* Empty state with vibrant design */}
      {listings.length === 0 && (
        <div className="max-w-md mx-auto my-20 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl blur-xl opacity-30"></div>
          <div className="relative bg-white/10 backdrop-blur-xl p-10 rounded-3xl border border-white/20 shadow-xl">
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
            <button className="mt-6 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl text-white font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-purple-700/30">
              Browse All Categories
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
