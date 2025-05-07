'use client'

import { Button } from '@/components/ui/button'
import { useUser } from '@/context/UserContext'
import { useWishlist } from '@/context/WishLists.context'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { FiEye, FiHeart, FiShoppingBag } from 'react-icons/fi'
import { toast } from 'sonner'
import { useTheme } from 'next-themes'

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
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Wait for component to mount to avoid hydration issues
  useEffect(() => setMounted(true), [])
  
  const mode = mounted && (resolvedTheme === 'dark' || theme === 'dark') ? 'dark' : 'light'

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
      toast.success('Item removed from wishlist')
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
            className={`w-16 h-16 rounded-full border-4 border-transparent 
                border-t-pink-500 border-r-purple-500 border-b-blue-500
                animate-spin`}
          ></div>
          <div
            className={`absolute w-10 h-10 rounded-full ${
              mode === 'dark'
                ? 'bg-gradient-to-br from-pink-500/80 to-purple-600/80'
                : 'bg-gradient-to-br from-indigo-500/80 to-purple-600/80'
            } blur-sm animate-pulse`}
          ></div>
        </div>
        <h3 className={`${mode === 'dark' ? 'text-white' : 'text-indigo-900'} text-xl font-medium mb-2`}>
          Loading your wishlist
        </h3>
        <p className={`${mode === 'dark' ? 'text-white/60' : 'text-indigo-700/70'}`}>
          Retrieving your saved items...
        </p>
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
        <motion.div 
          className={`backdrop-blur-md ${
            mode === 'dark'
              ? 'bg-white/5 border-white/10'
              : 'bg-white/70 border-indigo-100'
          } p-8 rounded-xl border shadow-lg max-w-md w-full text-center`}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.div 
            className={`w-24 h-24 mx-auto mb-6 rounded-full ${
              mode === 'dark'
                ? 'bg-white/10'
                : 'bg-indigo-100'
            } flex items-center justify-center relative overflow-hidden`}
            whileHover={{ rotate: 5 }}
          >
            <div className={`absolute inset-0 ${
              mode === 'dark'
                ? 'bg-gradient-to-br from-purple-600/30 to-pink-600/30'
                : 'bg-gradient-to-br from-indigo-500/30 to-purple-500/30'
            } rounded-full`}></div>
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                y: [0, -5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FiHeart className={`h-12 w-12 ${
                mode === 'dark' ? 'text-pink-400' : 'text-pink-500'
              }`} />
            </motion.div>
          </motion.div>
          
          <h3 className={`${
            mode === 'dark' ? 'text-white' : 'text-indigo-900'
          } text-2xl font-semibold mb-3`}>
            Your wishlist is empty
          </h3>
          
          <p className={`${
            mode === 'dark' ? 'text-white/70' : 'text-indigo-700/70'
          } mb-8`}>
            Browse our listings and save your favorite items to view them here later
          </p>
          
          <Link href="/listings">
            <Button 
              className={`${
                mode === 'dark'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
              } text-white font-medium px-6 py-6 rounded-lg border-0 shadow-lg ${
                mode === 'dark' 
                  ? 'shadow-purple-700/20'
                  : 'shadow-indigo-700/20'
              }`}>
              <FiShoppingBag className="mr-2" />
              Explore Marketplace
            </Button>
          </Link>
        </motion.div>
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
      <div className="flex justify-between items-center mb-8">
        <div>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className={`text-2xl md:text-3xl font-bold ${
              mode === 'dark'
                ? 'bg-gradient-to-r from-white via-purple-200 to-pink-100'
                : 'bg-gradient-to-r from-indigo-800 via-purple-700 to-pink-700'
            } bg-clip-text text-transparent`}
          >
            My Wishlist
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={mode === 'dark' ? 'text-purple-200/80' : 'text-indigo-700/80'}
          >
            {products.length} saved item{products.length !== 1 ? 's' : ''}
          </motion.p>
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={`hidden sm:flex items-center gap-2 p-2 px-4 rounded-lg ${
            mode === 'dark'
              ? 'bg-white/5 border-white/10'
              : 'bg-white/60 border-indigo-100'
          } border shadow-sm backdrop-blur-sm`}
        >
          <FiHeart className={mode === 'dark' ? 'text-pink-400' : 'text-pink-500'} />
          <span className={mode === 'dark' ? 'text-white/80' : 'text-indigo-800'}>
            Items you&apos;ve loved
          </span>
        </motion.div>
      </div>

      {/* Card Grid View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className={`backdrop-blur-md ${
              mode === 'dark'
                ? 'bg-white/5 border-white/10'
                : 'bg-white/70 border-indigo-100/60'
            } rounded-xl border overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group`}
          >
            {/* Product Image */}
            <div className="relative aspect-square">
              {product.status === 'sold' && (
                <div className="absolute inset-0 bg-black/60 z-10 flex items-center justify-center">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring" }}
                    className={`px-6 py-3 ${
                      mode === 'dark'
                        ? 'bg-gradient-to-r from-rose-600 to-red-600'
                        : 'bg-gradient-to-r from-rose-500 to-red-500'
                    } text-white font-bold rounded-xl transform rotate-12 text-lg shadow-lg`}
                  >
                    SOLD OUT
                  </motion.div>
                </div>
              )}
              <Image
                src={product.images?.[0] || '/placeholder.jpg'}
                alt={product.title}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute top-3 right-3 z-10">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    size="icon"
                    onClick={() => handleRemove(product._id as string)}
                    className={`h-8 w-8 rounded-full ${
                      mode === 'dark' 
                        ? 'bg-black/50 hover:bg-red-500/90 border-white/20'
                        : 'bg-white/50 hover:bg-red-500 border-gray-200'
                    } border backdrop-blur-sm`}
                  >
                    <FaTrash size={14} className="text-white" />
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* Product Details */}
            <div className="p-5">
              <h3 className={`font-bold text-lg ${
                mode === 'dark' 
                  ? 'text-white group-hover:text-purple-200'
                  : 'text-indigo-900 group-hover:text-purple-700'
              } transition-colors truncate`}>
                {product.title}
              </h3>

              <div className="mt-2 flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    product.status === 'available'
                      ? mode === 'dark'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-green-100 text-green-700'
                      : mode === 'dark'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-red-100 text-red-700'
                  }`}
                >
                  {product.status}
                </span>
                <span className={`${
                  mode === 'dark'
                    ? 'bg-white/10 text-white/80'
                    : 'bg-indigo-100/60 text-indigo-700'
                } px-2 py-0.5 rounded-full text-xs`}>
                  {product.condition}
                </span>
              </div>

              <p className={`${
                mode === 'dark' 
                  ? 'text-white/70' 
                  : 'text-indigo-700/80'
              } text-sm line-clamp-2 h-10 my-2`}>
                {product.description}
              </p>

              <div className="flex justify-between items-center mt-3">
                <span className={`text-xl font-bold ${
                  mode === 'dark'
                    ? 'bg-gradient-to-r from-white to-purple-200'
                    : 'bg-gradient-to-r from-indigo-700 to-purple-600'
                } bg-clip-text text-transparent`}>
                  ${product.price.toLocaleString()}
                </span>

                <Link href={`/product/${product._id}`}>
                  <Button className={`rounded-full ${
                    mode === 'dark'
                      ? 'bg-white/10 hover:bg-white/20 text-white'
                      : 'bg-indigo-100/80 hover:bg-indigo-200 text-indigo-700'
                  } font-medium px-4 py-2 flex items-center gap-2`}>
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