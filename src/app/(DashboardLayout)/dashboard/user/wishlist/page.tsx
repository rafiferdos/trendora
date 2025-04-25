'use client'

import { Button } from '@/components/ui/button'
import { useUser } from '@/context/UserContext'
import { useWishlist } from '@/context/WishLists.context'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { FiEye, FiHeart } from 'react-icons/fi'
import { toast } from 'sonner'

interface Listing {
  id?: string
  _id?: string
  title: string
  description: string
  price: number
  condition: string
  category: string
  images?: string[]
  userID?: {
    _id: string
    name: string
    email: string
  }
  status?: 'available' | 'sold'
}

const WishlistPage = () => {
  const { wishlist, removeWishlist } = useWishlist()
  const [products, setProducts] = useState<Listing[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const { token, user } = useUser()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API}/listings`

        const listingsResponse = await fetch(apiUrl, {
          cache: 'no-store',
          headers: { 'Content-Type': 'application/json' },
        })

        if (!listingsResponse.ok) {
          throw new Error(`HTTP error! status: ${listingsResponse.status}`)
        }

        const listingsData = await listingsResponse.json()

        if (!listingsData.data || !Array.isArray(listingsData.data)) {
          throw new Error('Invalid data format received')
        }

        // Filter listings based on wishlist
        if (wishlist.length) {
          const wishlistListings = listingsData.data.filter((listing: any) =>
            wishlist.includes(listing._id.toString()),
          )
          setProducts(wishlistListings)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        toast.error('Failed to load wishlist items')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [wishlist])

  const handleRemove = async (id: string) => {
    try {
      removeWishlist(id)
      setProducts((prev) => prev.filter((product) => product._id !== id))
    } catch (error) {
      toast.error('Failed to remove item from wishlist')
    }
  }

  // Loading state with animation
  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <div className="relative flex justify-center items-center mb-6">
          <div
            className="w-16 h-16 rounded-full border-4 border-transparent 
                border-t-pink-500 border-r-purple-500 border-b-blue-500
                animate-spin"
          ></div>
          <div
            className="absolute w-10 h-10 rounded-full bg-gradient-to-br from-pink-500/80 to-purple-600/80 
                blur-sm animate-pulse"
          ></div>
        </div>
        <h3 className="text-white text-xl font-medium mb-2">
          Loading your wishlist
        </h3>
        <p className="text-white/60">Retrieving your saved items...</p>
      </div>
    )
  }

  // Empty wishlist state
  if (!wishlist.length || !products.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-[70vh] flex flex-col items-center justify-center"
      >
        <div className="backdrop-blur-md bg-white/5 p-8 rounded-xl border border-white/10 shadow-lg max-w-md w-full text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
            <FiHeart className="h-8 w-8 text-pink-400" />
          </div>
          <h3 className="text-white text-xl font-semibold mb-3">
            Your wishlist is empty
          </h3>
          <p className="text-white/70 mb-6">
            Browse our listings and save your favorite items to view them here
            later
          </p>
          <Link href="/listings">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-6 py-2 rounded-lg border-0">
              Explore Marketplace
            </Button>
          </Link>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-[70vh] p-2 md:p-4"
    >
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-100 bg-clip-text text-transparent">
            My Wishlist
          </h2>
          <p className="text-purple-200/80 mt-1">
            {products.length} saved items
          </p>
        </div>
      </div>

      {/* Card Grid View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="backdrop-blur-md bg-white/5 rounded-xl border border-white/10 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            {/* Product Image */}
            <div className="relative aspect-square">
              {product.status === 'sold' && (
                <div className="absolute inset-0 bg-black/60 z-10 flex items-center justify-center">
                  <div className="bg-red-500 text-white font-bold px-4 py-2 rounded-lg transform rotate-12 text-xl shadow-lg">
                    SOLD OUT
                  </div>
                </div>
              )}
              <Image
                src={product.images?.[0] || '/placeholder.jpg'}
                alt={product.title}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute top-3 right-3 z-10">
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => handleRemove(product._id as string)}
                  className="h-8 w-8 rounded-full bg-black/50 hover:bg-red-500/90 border border-white/20"
                >
                  <FaTrash size={14} />
                </Button>
              </div>
            </div>

            {/* Product Details */}
            <div className="p-5">
              <h3 className="font-bold text-lg text-white group-hover:text-purple-200 transition-colors truncate">
                {product.title}
              </h3>

              <div className="mt-2 flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    product.status === 'available'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {product.status}
                </span>
                <span className="bg-white/10 px-2 py-0.5 rounded-full text-xs text-white/80">
                  {product.condition}
                </span>
              </div>

              <p className="text-white/70 text-sm line-clamp-2 h-10 my-2">
                {product.description}
              </p>

              <div className="flex justify-between items-center mt-3">
                <span className="text-xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  ${product.price}
                </span>

                <Link href={`/product/${product._id}`}>
                  <Button className="rounded-full bg-white/10 hover:bg-white/20 text-white font-medium px-4 py-2 flex items-center gap-2">
                    <FiEye size={16} />
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default WishlistPage
