'use client'

import { useUser } from '@/context/UserContext'
import { useWishlist } from '@/context/WishLists.context'
import { getValidToken } from '@/lib/verifyToken'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  FiAlertCircle,
  FiArrowLeft,
  FiCheckCircle,
  FiHeart,
  FiMessageSquare,
  FiShare2,
} from 'react-icons/fi'
import { toast } from 'sonner'

// You may need to update this interface based on your actual data structure
interface Product {
  _id: string
  title: string
  description: string
  price: number
  condition: string
  category: string
  images: string[]
  userID?: {
    _id: string
    name: string
    email: string
    avatar?: string
  }
  status?: 'available' | 'sold'
  createdAt: string
}

// Color schemes for different categories - you can expand this based on your categories
const categoryColors: Record<
  string,
  { bg: string; accent: string; light: string }
> = {
  default: {
    bg: 'from-purple-600 to-indigo-600',
    accent: 'bg-purple-500',
    light: 'from-purple-200 to-indigo-200',
  },
  electronics: {
    bg: 'from-blue-600 to-cyan-600',
    accent: 'bg-blue-500',
    light: 'from-blue-200 to-cyan-200',
  },
  mobile: {
    bg: 'from-sky-600 to-blue-600',
    accent: 'bg-sky-500',
    light: 'from-sky-200 to-blue-200',
  },
  computers: {
    bg: 'from-cyan-600 to-teal-600',
    accent: 'bg-cyan-500',
    light: 'from-cyan-200 to-teal-200',
  },
  furniture: {
    bg: 'from-amber-600 to-yellow-600',
    accent: 'bg-amber-500',
    light: 'from-amber-200 to-yellow-200',
  },
  clothing: {
    bg: 'from-pink-600 to-rose-600',
    accent: 'bg-pink-500',
    light: 'from-pink-200 to-rose-200',
  },
  vehicles: {
    bg: 'from-red-600 to-orange-600',
    accent: 'bg-red-500',
    light: 'from-red-200 to-orange-200',
  },
  gaming: {
    bg: 'from-green-600 to-emerald-600',
    accent: 'bg-green-500',
    light: 'from-green-200 to-emerald-200',
  },
  jewelry: {
    bg: 'from-amber-600 to-yellow-600',
    accent: 'bg-amber-500',
    light: 'from-amber-200 to-yellow-200',
  },
}

// Get condition badge style
const getConditionBadge = (condition: string) => {
  switch (condition.toLowerCase()) {
    case 'new':
      return 'bg-emerald-500 text-white'
    case 'like new':
      return 'bg-green-500 text-white'
    case 'good':
      return 'bg-blue-500 text-white'
    case 'fair':
      return 'bg-amber-500 text-white'
    case 'poor':
      return 'bg-red-500 text-white'
    default:
      return 'bg-gray-500 text-white'
  }
}

// Format date to readable string
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

export default function ProductDetailPage() {
  const router = useRouter()
  const params = useParams()
  const productId = params.id as string
  const { toggleWishlist, isWishlisted } = useWishlist()

  const user = useUser()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<number>(0)
  const [colorScheme, setColorScheme] = useState<{
    bg: string
    accent: string
    light: string
  }>(categoryColors.default)

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return

      setLoading(true)
      try {
        // Get the token using the same method as your other authenticated requests
        const token = await getValidToken()

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/listings/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        console.log(response)
        if (!response.ok) {
          throw new Error('Product not found')
        }

        const data = await response.json()
        setProduct(data.data)

        // Set color scheme based on category
        if (data.data.category && categoryColors[data.data.category]) {
          setColorScheme(categoryColors[data.data.category])
        }
      } catch (err) {
        console.error('Error fetching product:', err)
        setError('Failed to load product details. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  const [disable, setDisable] = useState(false)
  // Handle message request sent
  const handleMsgReqSent = () => {
    toast.success('Message request sent successfully!', {
      icon: <FiCheckCircle size={20} className="text-green-500" />,
      style: {
        background: 'rgba(0, 0, 0, 0.5)',
        color: '#fff',
        borderRadius: '9999px',
        border: 'none',
        padding: '16px',
        fontSize: '16px',
        fontWeight: '500',
        textAlign: 'center',
        maxWidth: '400px',
        margin: '0 auto',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.3s ease-in-out',
      },
    })
    //disable the button
    setDisable(true)
  }
  const handlePurchase = () => {
    if (!product) {
      toast.error('Product not available')
      return
    }

    const checkoutData = {
      _id: product._id,
      title: product.title,
      price: product.price,
      images: product.images,
      category: product.category,
      condition: product.condition,
      userID: product.userID,
    }

    const queryString = encodeURIComponent(JSON.stringify(checkoutData))
    router.push(`/checkout?productData=${queryString}`)
  }
  // Add this function before the return statement
  const handleShare = async () => {
    if (!product) return

    const shareData = {
      title: `Trendora: ${product.title}`,
      text: `Check out this ${product.condition} ${product.category}: ${product.title} for $${product.price} on Trendora!`,
      url: window.location.href,
    }

    // Check if the Web Share API is available
    if (
      navigator.share &&
      navigator.canShare &&
      navigator.canShare(shareData)
    ) {
      try {
        await navigator.share(shareData)
        toast.success('Shared successfully!')
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Error sharing:', error)
          // Only show error if user didn't just cancel the share
          fallbackShare()
        }
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      fallbackShare()
    }
  }

  // Fallback sharing method
  const fallbackShare = () => {
    // Create a temporary input to copy the URL
    const url = window.location.href
    const textArea = document.createElement('textarea')
    textArea.value = url
    document.body.appendChild(textArea)
    textArea.select()

    try {
      document.execCommand('copy')
      toast.success('Link copied to clipboard! Share it with your friends.', {
        duration: 3000,
      })
    } catch (err) {
      console.error('Failed to copy link:', err)
      toast.error('Unable to copy link. Try again or share manually.')
    }

    document.body.removeChild(textArea)
  }
  
  // Loading state with animated effects
  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 px-4 py-12 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            {/* Header placeholder */}
            <div className="h-10 w-48 bg-white/20 rounded-lg mb-8"></div>

            {/* Product layout placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image placeholder */}
              <div
                className="aspect-square rounded-3xl bg-black/20 backdrop-blur-lg border border-white/10 
                            overflow-hidden flex items-center justify-center"
              >
                <div
                  className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-blue-500/30 
                              animate-pulse flex items-center justify-center"
                >
                  <div className="w-12 h-12 rounded-full bg-white/20 animate-ping"></div>
                </div>
              </div>

              {/* Details placeholder */}
              <div className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-3xl p-8">
                <div className="h-8 bg-white/20 rounded-lg w-3/4 mb-4"></div>
                <div className="h-6 bg-white/10 rounded-lg w-1/4 mb-8"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-white/10 rounded w-full"></div>
                  <div className="h-4 bg-white/10 rounded w-5/6"></div>
                  <div className="h-4 bg-white/10 rounded w-4/6"></div>
                </div>
                <div className="mt-8 h-10 bg-white/20 rounded-xl w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (!user) return null

  // Error state
  if (error || !product) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 px-4 py-12 md:px-8">
        <div className="max-w-md mx-auto my-20 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl blur-xl opacity-30"></div>
          <div className="relative bg-black/30 backdrop-blur-xl p-10 rounded-3xl border border-white/20 shadow-xl">
            <FiAlertCircle size={48} className="text-red-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3">
              {error || 'Product not found'}
            </h3>
            <p className="text-purple-100 mb-6">
              {"We couldn't find the product you're looking for."}
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => router.back()}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-medium transition-all duration-300"
              >
                Go Back
              </button>
              <Link
                href="/listings"
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl text-white font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-purple-700/30"
              >
                Browse Marketplace
              </Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 px-4 py-12 md:px-8 overflow-hidden">
      {/* Background effects */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-40">
        <div
          className={`absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-gradient-to-r ${colorScheme.light} blur-3xl opacity-20 animate-drift`}
        ></div>
        <div
          className={`absolute bottom-1/3 right-1/3 w-1/3 h-1/3 rounded-full bg-gradient-to-r ${colorScheme.light} blur-3xl opacity-20 animate-drift-slow`}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Back button with animated effect */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-white/80 hover:text-white mb-8 group"
        >
          <span
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 
                        group-hover:bg-white/20 transition-all duration-300"
          >
            <FiArrowLeft size={18} />
          </span>
          <span className="font-medium">Back to results</span>
        </button>

        {/* Product layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product images with gallery */}
          <div className="space-y-4">
            {/* Main image display */}
            <div
              className="aspect-square rounded-3xl bg-black/20 backdrop-blur-lg border border-white/10 
                          overflow-hidden shadow-2xl"
            >
              <div className="relative w-full h-full">
                {product.status === 'sold' && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                    <div className="bg-red-500 text-white font-bold px-8 py-4 rounded-xl transform rotate-12 text-2xl shadow-lg">
                      SOLD OUT
                    </div>
                  </div>
                )}
                <Image
                  src={product.images[selectedImage] || '/placeholder.jpg'}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                  priority
                />
              </div>
            </div>

            {/* Thumbnail gallery */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 snap-x scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 snap-start
                              transition-all duration-300 ${
                                selectedImage === index
                                  ? `border-white shadow-lg shadow-white/20`
                                  : 'border-white/20 opacity-70 hover:opacity-100'
                              }`}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={img || '/placeholder.jpg'}
                        alt={`Product view ${index + 1}`}
                        fill
                        sizes="100px"
                        className="object-cover object-center"
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product details */}
          <div className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl">
            {/* Title and pricing */}
            <div className="mb-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  {product.title}
                </h1>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-medium ${getConditionBadge(product.condition)}`}
                  >
                    {product.condition.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <div
                  className={`inline-block px-4 py-1 rounded-md bg-white/10 text-white/80 text-sm font-medium capitalize`}
                >
                  {product.category.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              </div>
              <div className="mt-6 flex flex-wrap items-end gap-4">
                <div
                  className={`text-5xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent`}
                >
                  ${product.price.toLocaleString()}
                </div>
                <div className="text-white/60 text-sm">
                  Posted: {formatDate(product.createdAt)}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-3">Description</h2>
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                <p className="text-white/80 whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              {product.status !== 'sold' ? (
                <button
                  onClick={handlePurchase}
                  className={`w-full py-4 rounded-xl font-bold text-white text-lg
                            bg-gradient-to-r ${colorScheme.bg} 
                            hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300`}
                >
                  Purchase
                </button>
              ) : (
                <div className="w-full py-4 rounded-xl font-bold text-white/60 text-lg bg-gray-800/50 cursor-not-allowed text-center">
                  No Longer Available
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => toggleWishlist(productId)}
                  className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white
                                 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FiHeart size={18} />
                  <span>Save</span>
                </button>
                <button
                  onClick={() => handleShare()}
                  className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white
                                 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FiShare2 size={18} />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Seller info */}
            {product.userID && (
              <div className="mt-8 pt-6 border-t border-white/10">
                <h2 className="text-xl font-bold text-white mb-4">
                  About the Seller
                </h2>
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex-shrink-0 
                               overflow-hidden border-2 border-white/20"
                  >
                    {product.userID.avatar ? (
                      <Image
                        src={product.userID.avatar}
                        alt={product.userID.name}
                        width={56}
                        height={56}
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white font-bold text-xl">
                        {product.userID.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-white">
                      {product.userID.name}
                    </div>
                    <div className="text-white/60 text-sm flex items-center gap-1">
                      <FiCheckCircle size={14} className="text-green-400" />{' '}
                      Verified Seller
                    </div>
                  </div>
                  <div className="ml-auto">
                    <button
                      onClick={handleMsgReqSent}
                      disabled={disable}
                      className={
                        !disable
                          ? `px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 
                                     text-white transition-all duration-300 
                                     flex items-center gap-2`
                          : 'disabled:opacity-50 cursor-not-allowed px-4 py-2 rounded-xl bg-white/10 text-white transition-all duration-300 flex items-center gap-2'
                      }
                    >
                      <FiMessageSquare size={16} />
                      <span>Message</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Product recommendations would go here */}
      </div>
    </main>
  )
}
