'use client'

import { useUser } from '@/context/UserContext'
import { useWishlist } from '@/context/WishLists.context'
import { getValidToken } from '@/lib/verifyToken'
import { useTheme as useNextTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiAlertCircle, FiArrowLeft, FiCheckCircle, FiHeart, FiMessageSquare,
  FiShare2, FiShoppingCart, FiClock, FiInfo, FiTag, FiPackage,
  FiShield, FiTruck, FiRefreshCw, FiMap, FiMoon, FiSun
} from 'react-icons/fi'
import { toast } from 'sonner'

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

// Enhanced category theme system with dark/light modes
const categoryThemes = {
  light: {
    default: {
      primary: '#6d28d9',
      secondary: '#4f46e5',
      accent: '#8b5cf6',
      light: '#c4b5fd',
      muted: '#7c3aed20',
      bg: 'bg-slate-50',
      textPrimary: 'text-slate-900',
      textSecondary: 'text-slate-700',
      cardBg: 'bg-white/90',
      border: 'border-slate-200',
      hover: 'hover:bg-slate-200/70'
    },
    electronics: {
      primary: '#2563eb',
      secondary: '#0891b2',
      accent: '#3b82f6',
      light: '#bfdbfe',
      muted: '#3b82f620',
      bg: 'bg-blue-50',
      textPrimary: 'text-blue-900',
      textSecondary: 'text-blue-700',
      cardBg: 'bg-white/90',
      border: 'border-blue-100',
      hover: 'hover:bg-blue-100/70'
    },
    mobile: {
      primary: '#0284c7',
      secondary: '#2563eb',
      accent: '#38bdf8',
      light: '#bae6fd',
      muted: '#38bdf820',
      bg: 'bg-sky-50',
      textPrimary: 'text-sky-900',
      textSecondary: 'text-sky-700',
      cardBg: 'bg-white/90',
      border: 'border-sky-100',
      hover: 'hover:bg-sky-100/70'
    },
    computers: {
      primary: '#0891b2',
      secondary: '#0f766e',
      accent: '#06b6d4',
      light: '#a5f3fc',
      muted: '#06b6d420',
      bg: 'bg-cyan-50',
      textPrimary: 'text-cyan-900',
      textSecondary: 'text-cyan-700',
      cardBg: 'bg-white/90',
      border: 'border-cyan-100',
      hover: 'hover:bg-cyan-100/70'
    },
    furniture: {
      primary: '#d97706',
      secondary: '#b45309',
      accent: '#fbbf24',
      light: '#fef3c7',
      muted: '#fbbf2420',
      bg: 'bg-amber-50',
      textPrimary: 'text-amber-900',
      textSecondary: 'text-amber-700',
      cardBg: 'bg-white/90',
      border: 'border-amber-100',
      hover: 'hover:bg-amber-100/70'
    },
    clothing: {
      primary: '#db2777',
      secondary: '#be185d',
      accent: '#f472b6',
      light: '#fbcfe8',
      muted: '#f472b620',
      bg: 'bg-pink-50',
      textPrimary: 'text-pink-900',
      textSecondary: 'text-pink-700',
      cardBg: 'bg-white/90',
      border: 'border-pink-100',
      hover: 'hover:bg-pink-100/70'
    },
    vehicles: {
      primary: '#dc2626',
      secondary: '#b91c1c',
      accent: '#f87171',
      light: '#fee2e2',
      muted: '#f8717120',
      bg: 'bg-red-50',
      textPrimary: 'text-red-900',
      textSecondary: 'text-red-700',
      cardBg: 'bg-white/90',
      border: 'border-red-100',
      hover: 'hover:bg-red-100/70'
    },
    gaming: {
      primary: '#059669',
      secondary: '#047857',
      accent: '#10b981',
      light: '#a7f3d0',
      muted: '#10b98120',
      bg: 'bg-emerald-50',
      textPrimary: 'text-emerald-900',
      textSecondary: 'text-emerald-700',
      cardBg: 'bg-white/90',
      border: 'border-emerald-100',
      hover: 'hover:bg-emerald-100/70'
    },
    jewelry: {
      primary: '#ca8a04',
      secondary: '#a16207',
      accent: '#facc15',
      light: '#fef9c3',
      muted: '#facc1520',
      bg: 'bg-yellow-50',
      textPrimary: 'text-yellow-900',
      textSecondary: 'text-yellow-700',
      cardBg: 'bg-white/90',
      border: 'border-yellow-100',
      hover: 'hover:bg-yellow-100/70'
    },
  },
  dark: {
    default: {
      primary: '#8b5cf6',
      secondary: '#6d28d9',
      accent: '#a78bfa',
      light: '#c4b5fd',
      muted: '#7c3aed20',
      bg: 'bg-slate-950',
      textPrimary: 'text-white',
      textSecondary: 'text-slate-300',
      cardBg: 'bg-slate-900/70',
      border: 'border-slate-800',
      hover: 'hover:bg-slate-800'
    },
    electronics: {
      primary: '#3b82f6',
      secondary: '#2563eb',
      accent: '#60a5fa',
      light: '#93c5fd',
      muted: '#3b82f620',
      bg: 'bg-slate-950',
      textPrimary: 'text-white',
      textSecondary: 'text-blue-200',
      cardBg: 'bg-blue-950/40',
      border: 'border-blue-900/50',
      hover: 'hover:bg-blue-900/30'
    },
    mobile: {
      primary: '#0ea5e9',
      secondary: '#0284c7',
      accent: '#38bdf8',
      light: '#bae6fd',
      muted: '#38bdf820',
      bg: 'bg-slate-950',
      textPrimary: 'text-white',
      textSecondary: 'text-sky-200',
      cardBg: 'bg-sky-950/40',
      border: 'border-sky-900/50',
      hover: 'hover:bg-sky-900/30'
    },
    computers: {
      primary: '#06b6d4',
      secondary: '#0891b2',
      accent: '#22d3ee',
      light: '#a5f3fc',
      muted: '#06b6d420',
      bg: 'bg-slate-950',
      textPrimary: 'text-white',
      textSecondary: 'text-cyan-200',
      cardBg: 'bg-cyan-950/40',
      border: 'border-cyan-900/50',
      hover: 'hover:bg-cyan-900/30'
    },
    furniture: {
      primary: '#f59e0b',
      secondary: '#d97706',
      accent: '#fbbf24',
      light: '#fde68a',
      muted: '#fbbf2420',
      bg: 'bg-slate-950',
      textPrimary: 'text-white',
      textSecondary: 'text-amber-200',
      cardBg: 'bg-amber-950/40',
      border: 'border-amber-900/50',
      hover: 'hover:bg-amber-900/30'
    },
    clothing: {
      primary: '#ec4899',
      secondary: '#db2777',
      accent: '#f472b6',
      light: '#fbcfe8',
      muted: '#f472b620',
      bg: 'bg-slate-950',
      textPrimary: 'text-white',
      textSecondary: 'text-pink-200',
      cardBg: 'bg-pink-950/40',
      border: 'border-pink-900/50',
      hover: 'hover:bg-pink-900/30'
    },
    vehicles: {
      primary: '#ef4444',
      secondary: '#dc2626',
      accent: '#f87171',
      light: '#fca5a5',
      muted: '#f8717120',
      bg: 'bg-slate-950',
      textPrimary: 'text-white',
      textSecondary: 'text-red-200',
      cardBg: 'bg-red-950/40',
      border: 'border-red-900/50',
      hover: 'hover:bg-red-900/30'
    },
    gaming: {
      primary: '#10b981',
      secondary: '#059669',
      accent: '#34d399',
      light: '#6ee7b7',
      muted: '#10b98120',
      bg: 'bg-slate-950',
      textPrimary: 'text-white',
      textSecondary: 'text-emerald-200',
      cardBg: 'bg-emerald-950/40',
      border: 'border-emerald-900/50',
      hover: 'hover:bg-emerald-900/30'
    },
    jewelry: {
      primary: '#eab308',
      secondary: '#ca8a04',
      accent: '#facc15',
      light: '#fde047',
      muted: '#facc1520',
      bg: 'bg-slate-950',
      textPrimary: 'text-white',
      textSecondary: 'text-yellow-200',
      cardBg: 'bg-yellow-950/40',
      border: 'border-yellow-900/50',
      hover: 'hover:bg-yellow-900/30'
    },
  }
}

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
  const { theme: currentTheme, setTheme } = useNextTheme()
  const params = useParams()
  const productId = params.id as string
  const { toggleWishlist, isWishlisted } = useWishlist()
  const user = useUser()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<number>(0)
  const [categoryTheme, setCategoryTheme] = useState<string>('default')
  const [isZoomed, setIsZoomed] = useState(false)
  const [wishlistLoading, setWishlistLoading] = useState(false)
  const [messageDisabled, setMessageDisabled] = useState(false)
  const [showFullDesc, setShowFullDesc] = useState(false)

  // Use the appropriate theme based on system or user preference
  const mode = currentTheme === 'dark' ? 'dark' : 'light'
  const theme = categoryThemes[mode][categoryTheme as keyof typeof categoryThemes.light]

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return

      setLoading(true)
      try {
        const token = await getValidToken()
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/listings/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        
        if (!response.ok) {
          throw new Error('Product not found')
        }

        const data = await response.json()
        setProduct(data.data)
        
        // Set theme based on category
        if (data.data.category && 
            Object.keys(categoryThemes.light).includes(data.data.category.toLowerCase())) {
          setCategoryTheme(data.data.category.toLowerCase())
        }
      } catch (err) {
        console.error('Error fetching product:', err)
        setError('Failed to load product details')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId])
  
  const handleMsgReqSent = () => {
    toast.success('Message request sent!', {
      icon: <FiCheckCircle className="text-green-500" />,
      duration: 3000
    })
    setMessageDisabled(true)
  }
  
  const handlePurchase = () => {
    if (!product) return
    
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
  
  const handleShare = async () => {
    if (!product) return

    const shareData = {
      title: `Trendora: ${product.title}`,
      text: `Check out this ${product.condition} ${product.category}: ${product.title} for $${product.price}!`,
      url: window.location.href,
    }

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData)
        toast.success('Shared successfully!')
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          fallbackShare()
        }
      }
    } else {
      fallbackShare()
    }
  }

  const fallbackShare = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => toast.success('Link copied to clipboard!'))
      .catch(() => toast.error('Failed to copy link'))
  }
  
  const handleWishlist = async () => {
    setWishlistLoading(true)
    await toggleWishlist(productId)
    setWishlistLoading(false)
  }
  
  const toggleImageZoom = () => setIsZoomed(!isZoomed)
  
  const toggleTheme = () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark')
  }

  // Loading state
  if (loading) {
    return (
      <div className={`flex min-h-screen items-center justify-center ${mode === 'dark' ? 'bg-slate-950' : 'bg-slate-100'}`}>
        <div className="max-w-md w-full p-8">
          <div className="flex flex-col items-center">
            <div className="relative w-28 h-28">
              <div className={`absolute inset-0 rounded-full ${mode === 'dark' ? 'bg-gradient-to-tr from-purple-600 to-blue-600' : 'bg-gradient-to-tr from-purple-500 to-blue-400'} animate-pulse opacity-75`}></div>
              <div className={`absolute inset-0 rounded-full border-t-4 border-l-4 ${mode === 'dark' ? 'border-white' : 'border-purple-600'} animate-spin`}></div>
              <svg className={`w-full h-full ${mode === 'dark' ? 'text-white/20' : 'text-purple-700/20'}`} viewBox="0 0 100 100" fill="none">
                <path d="M22 50C22 34.536 34.536 22 50 22C65.464 22 78 34.536 78 50C78 65.464 65.464 78 50 78" 
                      stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="mt-8 space-y-3">
              <div className={`h-8 w-3/4 ${mode === 'dark' ? 'bg-white/10' : 'bg-purple-500/10'} rounded-lg animate-pulse mx-auto`}></div>
              <div className={`h-4 w-1/2 ${mode === 'dark' ? 'bg-white/5' : 'bg-purple-500/5'} rounded-lg animate-pulse mx-auto`}></div>
              <div className={`h-20 ${mode === 'dark' ? 'bg-white/5' : 'bg-purple-500/5'} rounded-xl animate-pulse`}></div>
              <div className="grid grid-cols-2 gap-2">
                <div className={`h-12 ${mode === 'dark' ? 'bg-white/5' : 'bg-purple-500/5'} rounded-xl animate-pulse`}></div>
                <div className={`h-12 ${mode === 'dark' ? 'bg-white/10' : 'bg-purple-500/10'} rounded-xl animate-pulse`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!user) return null

  // Error state
  if (error || !product) {
    return (
      <div className={`min-h-screen ${mode === 'dark' ? 'bg-slate-950' : 'bg-slate-100'} flex items-center justify-center p-4`}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`max-w-md w-full ${mode === 'dark' ? 'bg-slate-900/80 border-slate-800' : 'bg-white/90 border-slate-200'} backdrop-blur-xl p-8 rounded-2xl border shadow-xl`}
        >
          <div className={`w-16 h-16 mx-auto rounded-full ${mode === 'dark' ? 'bg-rose-500/20' : 'bg-rose-100'} flex items-center justify-center mb-6`}>
            <FiAlertCircle size={32} className={`${mode === 'dark' ? 'text-rose-500' : 'text-rose-600'}`} />
          </div>
          <h3 className={`text-xl md:text-2xl font-bold ${mode === 'dark' ? 'text-white' : 'text-slate-900'} text-center mb-2`}>
            {error || 'Product not found'}
          </h3>
          <p className={`${mode === 'dark' ? 'text-slate-400' : 'text-slate-600'} text-center mb-8`}>
            The product you&apos;re looking for may have been removed or is no longer available.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => router.back()}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 ${
                mode === 'dark' 
                  ? 'bg-slate-800 hover:bg-slate-700' 
                  : 'bg-slate-200 hover:bg-slate-300'
              } rounded-xl ${mode === 'dark' ? 'text-white' : 'text-slate-900'} transition-all duration-300`}
            >
              <FiArrowLeft size={18} /> Go Back
            </button>
            <Link
              href="/listings"
              className={`flex items-center justify-center gap-2 px-4 py-2.5 ${
                mode === 'dark' 
                  ? 'bg-gradient-to-r from-violet-700 to-indigo-700 hover:from-violet-800 hover:to-indigo-800' 
                  : 'bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600'
              } rounded-xl text-white transition-all duration-300`}
            >
              Browse Marketplace
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.textPrimary} pb-20 relative overflow-hidden`}>
      {/* Dynamic background for different modes */}
      <div className="fixed inset-0 -z-10">
        <div className={`absolute inset-0 ${mode === 'dark' ? 'bg-slate-950/95' : 'bg-white/90'}`}></div>
        <div 
          className="absolute top-0 right-0 w-full h-full opacity-30 blur-3xl" 
          style={{
            background: mode === 'dark'
              ? `radial-gradient(circle at 70% 30%, ${theme.accent}30, transparent 70%)`
              : `radial-gradient(circle at 70% 30%, ${theme.primary}20, transparent 70%)`,
          }}
        ></div>
        <div 
          className="absolute bottom-0 left-0 w-full h-full opacity-20 blur-3xl"
          style={{
            background: mode === 'dark'
              ? `radial-gradient(circle at 30% 70%, ${theme.primary}40, transparent 70%)`
              : `radial-gradient(circle at 30% 70%, ${theme.secondary}10, transparent 70%)`,
          }}
        ></div>
        {mode === 'dark' && (
          <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-soft-light"></div>
        )}
      </div>
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 lg:pt-16">
        {/* Theme toggle and navigation */}
        <div className="flex justify-between items-center mb-6 lg:mb-10">
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => router.back()}
            className={`group flex items-center gap-2.5 ${mode === 'dark' ? 'text-white/60 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
          >
            <span className={`flex items-center justify-center w-8 h-8 rounded-full ${
              mode === 'dark' 
                ? 'bg-white/5 border-white/10 group-hover:bg-white/10 group-hover:border-white/20' 
                : 'bg-slate-100 border-slate-200 group-hover:bg-slate-200 group-hover:border-slate-300'
            } border transition-all duration-300`}>
              <FiArrowLeft size={16} />
            </span>
            <span className="font-medium">Back to listings</span>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className={`flex items-center justify-center w-9 h-9 rounded-full ${
              mode === 'dark' 
                ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                : 'bg-slate-100 border-slate-200 hover:bg-slate-200'
            } border transition-all duration-300`}
            aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
          >
            {mode === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
          </motion.button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Left column: Image gallery */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-3 space-y-4"
          >
            {/* Main image */}
            <div className="relative group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`relative aspect-square rounded-2xl overflow-hidden ${
                    mode === 'dark' ? 'bg-black/40' : 'bg-slate-100'
                  }`}
                  style={{ 
                    boxShadow: mode === 'dark'
                      ? `0 20px 80px -20px ${theme.primary}40`
                      : `0 8px 30px -12px ${theme.primary}30`
                  }}
                >
                  {/* Sold overlay */}
                  {product.status === 'sold' && (
                    <div className="absolute inset-0 flex items-center justify-center z-10 backdrop-blur-sm bg-black/60">
                      <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring" }}
                        className={`px-8 py-4 ${
                          mode === 'dark'
                            ? 'bg-gradient-to-r from-rose-600 to-red-600'
                            : 'bg-gradient-to-r from-rose-500 to-red-500'
                        } rounded-xl transform -rotate-12 shadow-2xl`}
                      >
                        <span className="text-3xl font-bold tracking-wider text-white">SOLD OUT</span>
                      </motion.div>
                    </div>
                  )}
                  
                  {/* Product image */}
                  <div 
                    className={`relative w-full h-full cursor-zoom-in transition-transform duration-500
                              ${isZoomed ? 'scale-150' : 'scale-100'}`}
                    onClick={toggleImageZoom}
                  >
                    <Image
                      src={product.images[selectedImage] || '/placeholder.jpg'}
                      alt={product.title}
                      fill
                      className="object-cover object-center"
                      priority
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Image count badge */}
              {product.images.length > 1 && (
                <div className={`absolute top-4 right-4 ${
                  mode === 'dark' 
                    ? 'bg-black/50'
                    : 'bg-white/70'
                } backdrop-blur-md ${theme.textPrimary} text-sm px-3 py-1.5 rounded-full shadow-lg`}>
                  {selectedImage + 1}/{product.images.length}
                </div>
              )}
              
              {/* Condition badge */}
              <div 
                className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-sm font-medium shadow-lg text-white"
                style={{ 
                  background: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`,
                  boxShadow: `0 4px 12px -2px ${theme.primary}40`
                }}
              >
                {product.condition}
              </div>
            </div>

            {/* Thumbnail gallery */}
            {product.images.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto hide-scrollbar snap-x pb-2">
                {product.images.map((img, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden snap-start border-2
                              transition-all duration-300 ${
                                selectedImage === index
                                  ? `border-2 shadow-lg`
                                  : 'border-transparent opacity-60 hover:opacity-100'
                              }`}
                    style={{ 
                      borderColor: selectedImage === index ? theme.accent : 'transparent',
                      boxShadow: selectedImage === index ? `0 8px 16px -4px ${theme.accent}40` : 'none'
                    }}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={img || '/placeholder.jpg'}
                        alt={`View ${index + 1}`}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>
                  </motion.button>
                ))}
              </div>
            )}
            
            {/* Product description on mobile */}
            <div className="lg:hidden mt-8">
              <div className={`${theme.cardBg} backdrop-blur-md rounded-2xl p-5 ${theme.border} border shadow-lg`}>
                <h3 className={`text-lg font-semibold ${mode === 'dark' ? 'text-white/80' : 'text-slate-900'} mb-3`}>About this item</h3>
                <p className={`${mode === 'dark' ? 'text-white/70' : 'text-slate-700'} ${!showFullDesc && product.description.length > 200 ? 'line-clamp-4' : ''}`}>
                  {product.description}
                </p>
                {product.description.length > 200 && (
                  <button 
                    onClick={() => setShowFullDesc(!showFullDesc)}
                    className="mt-2 text-sm hover:underline"
                    style={{ color: theme.accent }}
                  >
                    {showFullDesc ? 'Show less' : 'Read more'}
                  </button>
                )}
              </div>
            </div>
            
            {/* Quick actions for mobile */}
            <div className="lg:hidden flex gap-2.5">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleWishlist}
                className={`flex-1 py-3.5 rounded-xl ${
                  mode === 'dark'
                    ? 'bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10'
                    : 'bg-white/70 backdrop-blur-md border border-slate-200 hover:bg-slate-100'
                } transition-all flex items-center justify-center gap-2`}
                disabled={wishlistLoading}
              >
                {wishlistLoading ? (
                  <div className={`w-5 h-5 border-2 ${mode === 'dark' ? 'border-white border-t-transparent' : 'border-slate-700 border-t-transparent'} rounded-full animate-spin`}></div>
                ) : (
                  <>
                    <FiHeart 
                      size={18} 
                      className={isWishlisted(productId) ? "text-rose-500 fill-rose-500" : ""} 
                    />
                    {isWishlisted(productId) ? "Saved" : "Save"}
                  </>
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleShare}
                className={`flex-1 py-3.5 rounded-xl ${
                  mode === 'dark'
                    ? 'bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10'
                    : 'bg-white/70 backdrop-blur-md border border-slate-200 hover:bg-slate-100'
                } transition-all flex items-center justify-center gap-2`}
              >
                <FiShare2 size={18} />
                Share
              </motion.button>
            </div>
            
            {/* Product details for desktop */}
            <div className={`hidden lg:block ${theme.cardBg} backdrop-blur-md rounded-2xl p-6 ${theme.border} border shadow-lg`}>
              <h3 className={`text-lg font-semibold ${mode === 'dark' ? 'text-white/90' : 'text-slate-900'} mb-4`}>About this item</h3>
              <p className={`${mode === 'dark' ? 'text-white/70' : 'text-slate-700'} leading-relaxed`}>
                {product.description}
              </p>
              
              {/* Product highlights */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="flex gap-3 items-start">
                  <div className={`p-2.5 rounded-lg ${mode === 'dark' ? 'bg-white/5' : 'bg-slate-100'}`} style={{ color: theme.accent }}>
                    <FiTag size={20} />
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${mode === 'dark' ? 'text-white/80' : 'text-slate-800'}`}>Category</p>
                    <p className={`${mode === 'dark' ? 'text-white/60' : 'text-slate-600'}`}>{product.category}</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className={`p-2.5 rounded-lg ${mode === 'dark' ? 'bg-white/5' : 'bg-slate-100'}`} style={{ color: theme.accent }}>
                    <FiPackage size={20} />
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${mode === 'dark' ? 'text-white/80' : 'text-slate-800'}`}>Condition</p>
                    <p className={`${mode === 'dark' ? 'text-white/60' : 'text-slate-600'}`}>{product.condition}</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className={`p-2.5 rounded-lg ${mode === 'dark' ? 'bg-white/5' : 'bg-slate-100'}`} style={{ color: theme.accent }}>
                    <FiClock size={20} />
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${mode === 'dark' ? 'text-white/80' : 'text-slate-800'}`}>Listed on</p>
                    <p className={`${mode === 'dark' ? 'text-white/60' : 'text-slate-600'}`}>{formatDate(product.createdAt)}</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className={`p-2.5 rounded-lg ${mode === 'dark' ? 'bg-white/5' : 'bg-slate-100'}`} style={{ color: theme.accent }}>
                    <FiInfo size={20} />
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${mode === 'dark' ? 'text-white/80' : 'text-slate-800'}`}>Status</p>
                    <p className={`${mode === 'dark' ? 'text-white/60' : 'text-slate-600'}`}>{product.status === 'sold' ? 'Sold out' : 'Available'}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right column: Product info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Product title and price */}
            <div>
              <div className="flex items-start justify-between gap-4">
                <h1 className={`text-2xl sm:text-3xl font-bold ${theme.textPrimary} leading-tight`}>
                  {product.title}
                </h1>
                
                {/* Desktop actions */}
                <div className="hidden lg:flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleWishlist}
                    disabled={wishlistLoading}
                    className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      mode === 'dark'
                        ? 'bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10'
                        : 'bg-white/70 backdrop-blur-md border border-slate-200 hover:bg-slate-100'
                    } transition-all`}
                  >
                    {wishlistLoading ? (
                      <div className={`w-4 h-4 border-2 ${mode === 'dark' ? 'border-white border-t-transparent' : 'border-slate-700 border-t-transparent'} rounded-full animate-spin`}></div>
                    ) : (
                      <FiHeart 
                        size={18} 
                        className={isWishlisted(productId) ? "text-rose-500 fill-rose-500" : ""} 
                      />
                    )}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleShare}
                    className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      mode === 'dark'
                        ? 'bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10'
                        : 'bg-white/70 backdrop-blur-md border border-slate-200 hover:bg-slate-100'
                    } transition-all`}
                  >
                    <FiShare2 size={18} />
                  </motion.button>
                </div>
              </div>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-2">
                <span 
                  className="text-3xl sm:text-4xl font-bold"
                  style={{ color: theme.accent }}
                >
                  ${product.price.toLocaleString()}
                </span>
                
                {product.status === 'sold' && (
                  <span className={`text-rose-500 font-medium text-sm uppercase tracking-wider ${mode === 'dark' ? 'bg-rose-950/40' : 'bg-rose-100'} px-2 py-0.5 rounded`}>
                    Sold
                  </span>
                )}
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex flex-col gap-3 mt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePurchase}
                disabled={product.status === 'sold'}
                className="w-full py-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-300 text-white"
                style={{ 
                  background: product.status === 'sold' 
                    ? mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(100, 116, 139, 0.2)'
                    : `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`,
                  boxShadow: product.status === 'sold' 
                    ? 'none' 
                    : mode === 'dark' ? `0 8px 24px -6px ${theme.primary}70` : `0 8px 20px -8px ${theme.primary}`,
                  color: product.status === 'sold' 
                    ? mode === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(100, 116, 139, 0.8)'
                    : 'white'
                }}
              >
                <FiShoppingCart size={20} />
                {product.status === 'sold' ? 'Sold Out' : 'Buy Now'}
              </motion.button>
              
              {product.status !== 'sold' && product.userID && user?.user?._id !== product.userID._id && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleMsgReqSent}
                  disabled={messageDisabled}
                  className={`w-full py-4 rounded-xl ${
                    mode === 'dark'
                      ? 'bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/10'
                      : 'bg-white/80 hover:bg-white backdrop-blur-md border border-slate-200'
                  } font-medium flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-60`}
                >
                  <FiMessageSquare size={20} />
                  {messageDisabled ? 'Message Sent' : 'Contact Seller'}
                </motion.button>
              )}
            </div>
            
            {/* Seller info */}
            {product.userID && (
              <div className={`${theme.cardBg} backdrop-blur-md rounded-2xl p-5 ${theme.border} border shadow-lg mt-6`}>
                <h3 className={`text-lg font-semibold ${mode === 'dark' ? 'text-white/80' : 'text-slate-900'} mb-4`}>About the Seller</h3>
                <div className="flex items-center gap-4">
                  <div 
                    className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 shadow-lg"
                    style={{ 
                      background: `linear-gradient(135deg, ${theme.secondary}, ${theme.primary})`,
                      boxShadow: `0 8px 16px -4px ${theme.primary}40`
                    }}
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
                        {product.userID.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className={`font-medium ${theme.textPrimary}`}>
                      {product.userID.name}
                    </h4>
                    <p className={`${mode === 'dark' ? 'text-white/60' : 'text-slate-500'} text-sm`}>{product.userID.email}</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Product benefits */}
            <div className={`${theme.cardBg} backdrop-blur-md rounded-2xl p-5 ${theme.border} border shadow-lg mt-6`}>
              <div className="space-y-4">
                <div className="flex gap-3 items-center">
                  <div className={`p-2 rounded-lg ${mode === 'dark' ? 'bg-emerald-500/10' : 'bg-emerald-100'}`}>
                    <FiShield size={18} className="text-emerald-500" />
                  </div>
                  <div>
                    <p className={`text-sm ${mode === 'dark' ? 'text-white/90' : 'text-slate-700'}`}>Buyer Protection</p>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className={`p-2 rounded-lg ${mode === 'dark' ? 'bg-blue-500/10' : 'bg-blue-100'}`}>
                    <FiTruck size={18} className="text-blue-500" />
                  </div>
                  <div>
                    <p className={`text-sm ${mode === 'dark' ? 'text-white/90' : 'text-slate-700'}`}>Secure Delivery</p>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className={`p-2 rounded-lg ${mode === 'dark' ? 'bg-amber-500/10' : 'bg-amber-100'}`}>
                    <FiRefreshCw size={18} className="text-amber-500" />
                  </div>
                  <div>
                    <p className={`text-sm ${mode === 'dark' ? 'text-white/90' : 'text-slate-700'}`}>Easy Returns</p>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className={`p-2 rounded-lg ${mode === 'dark' ? 'bg-purple-500/10' : 'bg-purple-100'}`}>
                    <FiMap size={18} className="text-purple-500" />
                  </div>
                  <div>
                    <p className={`text-sm ${mode === 'dark' ? 'text-white/90' : 'text-slate-700'}`}>Local Pickup Available</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}