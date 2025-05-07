'use client'

import { CategorySection } from '@/components/modules/category/Categories'
import { Button } from '@/components/ui/button'
import { useUser } from '@/context/UserContext'
import { getListings } from '@/services/listings'
import { TListing } from '@/types/listings/listing'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import {
  ArrowRight,
  Boxes,
  CheckCircle,
  ChevronRight,
  MessagesSquare,
  PiggyBank,
  Search,
  ShoppingBag,
  Star,
  TrendingUp,
  Users,
  Zap,
  ShieldCheck,
  Smile,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

// Animation variants with improved timing
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const Homepage = () => {
  const { resolvedTheme } = useTheme() // Get current theme
  const mode = resolvedTheme === 'dark' ? 'dark' : 'light'
  
  const { user } = useUser()
  const [featuredListings, setFeaturedListings] = useState<TListing[]>([])
  const [isLoading, setIsLoadingState] = useState(true)

  // Enhanced stats with theme-aware colors
  const stats = [
    {
      value: '50K+',
      label: 'Active Users',
      icon: Users,
      colors: {
        dark: {
          gradient: 'from-indigo-500 to-violet-600',
          glow: 'rgba(139, 92, 246, 0.3)',
          iconBg: 'rgba(139, 92, 246, 0.2)',
          text: 'text-indigo-300'
        },
        light: {
          gradient: 'from-indigo-600 to-violet-700',
          glow: 'rgba(79, 70, 229, 0.2)',
          iconBg: 'rgba(79, 70, 229, 0.1)',
          text: 'text-indigo-700'
        }
      }
    },
    {
      value: '100K+',
      label: 'Items Listed',
      icon: Boxes,
      colors: {
        dark: {
          gradient: 'from-sky-500 to-blue-600',
          glow: 'rgba(59, 130, 246, 0.3)',
          iconBg: 'rgba(59, 130, 246, 0.2)',
          text: 'text-sky-300'
        },
        light: {
          gradient: 'from-sky-600 to-blue-700',
          glow: 'rgba(37, 99, 235, 0.2)',
          iconBg: 'rgba(37, 99, 235, 0.1)',
          text: 'text-sky-700'
        }
      }
    },
    {
      value: '98%',
      label: 'Satisfaction',
      icon: Smile,
      colors: {
        dark: {
          gradient: 'from-amber-500 to-yellow-600',
          glow: 'rgba(245, 158, 11, 0.3)',
          iconBg: 'rgba(245, 158, 11, 0.2)',
          text: 'text-amber-300'
        },
        light: {
          gradient: 'from-amber-500 to-yellow-600',
          glow: 'rgba(217, 119, 6, 0.2)',
          iconBg: 'rgba(217, 119, 6, 0.1)',
          text: 'text-amber-700'
        }
      }
    },
    {
      value: '$2.5M',
      label: 'Monthly Sales',
      icon: TrendingUp,
      colors: {
        dark: {
          gradient: 'from-emerald-500 to-green-600',
          glow: 'rgba(16, 185, 129, 0.3)',
          iconBg: 'rgba(16, 185, 129, 0.2)',
          text: 'text-emerald-300'
        },
        light: {
          gradient: 'from-emerald-600 to-green-700',
          glow: 'rgba(5, 150, 105, 0.2)',
          iconBg: 'rgba(5, 150, 105, 0.1)',
          text: 'text-emerald-700'
        }
      }
    },
  ]

  // Fetch featured listings
  useEffect(() => {
    const fetchFeaturedListings = async () => {
      try {
        const response = await getListings()
        if (response && response.success) {
          // Get random 6 listings or fewer if not enough listings
          const shuffled = [...response.data].sort(() => 0.5 - Math.random())
          setFeaturedListings(shuffled.slice(0, 6))
        }
      } catch (error) {
        console.error('Error fetching listings:', error)
      } finally {
        setIsLoadingState(false)
      }
    }

    fetchFeaturedListings()
  }, [])

  // Process card color classes for featured items with theme awareness
  const getCardColorClass = (index: number) => {
    const darkColorClasses = [
      'from-violet-500 to-indigo-600',
      'from-blue-500 to-sky-600',
      'from-fuchsia-500 to-purple-600',
      'from-amber-500 to-orange-600',
      'from-emerald-500 to-teal-600',
      'from-rose-500 to-pink-600',
    ]
    
    const lightColorClasses = [
      'from-violet-600 to-indigo-700',
      'from-blue-600 to-sky-700',
      'from-fuchsia-600 to-purple-700',
      'from-amber-600 to-orange-700',
      'from-emerald-600 to-teal-700',
      'from-rose-600 to-pink-700',
    ]
    
    const colorClasses = mode === 'dark' ? darkColorClasses : lightColorClasses
    return colorClasses[index % colorClasses.length]
  }

  // Features section data
  const features = [
    {
      title: "Verified Users",
      description: "All sellers are verified for your safety and peace of mind",
      icon: ShieldCheck,
      color: mode === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
    },
    {
      title: "Instant Messaging",
      description: "Connect directly with sellers to negotiate and arrange meetups",
      icon: MessagesSquare,
      color: mode === 'dark' ? 'text-sky-400' : 'text-sky-600'
    },
    {
      title: "Fast Transactions",
      description: "Simple, secure payment system makes buying and selling easy",
      icon: Zap,
      color: mode === 'dark' ? 'text-amber-400' : 'text-amber-600'
    }
  ]

  return (
    <div className={`min-h-screen ${mode === 'dark' 
      ? 'bg-gradient-to-br from-gray-900 via-purple-950 to-violet-900 text-white' 
      : 'bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100 text-gray-900'}`}
    >
      {/* Background decoration elements with theme awareness */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 ${
          mode === 'dark' ? 'bg-purple-600/10' : 'bg-purple-500/10'
        } rounded-full blur-3xl animate-pulse-slow`}></div>
        <div
          className={`absolute bottom-1/4 right-1/3 w-80 h-80 ${
            mode === 'dark' ? 'bg-pink-600/10' : 'bg-pink-500/10'
          } rounded-full blur-3xl animate-pulse-slow`}
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className={`absolute top-1/3 right-1/4 w-64 h-64 ${
            mode === 'dark' ? 'bg-blue-600/10' : 'bg-blue-500/10'
          } rounded-full blur-3xl animate-pulse-slow`}
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className={`absolute bottom-1/3 left-1/3 w-72 h-72 ${
            mode === 'dark' ? 'bg-emerald-600/5' : 'bg-emerald-500/10'
          } rounded-full blur-3xl animate-pulse-slow`}
          style={{ animationDelay: '3s' }}
        ></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <motion.div
              className="lg:w-1/2 mb-12 lg:mb-0"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <div className={`inline-block px-4 py-1.5 rounded-full mb-6 text-sm font-medium 
                ${mode === 'dark' 
                  ? 'bg-white/10 text-white/90' 
                  : 'bg-indigo-100 text-indigo-800'}`}
              >
                <span className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    mode === 'dark' ? 'bg-indigo-400' : 'bg-indigo-600'
                  } animate-pulse`}></span>
                  The marketplace for unique treasures
                </span>
              </div>
              
              <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 ${
                mode === 'dark'
                  ? 'bg-gradient-to-r from-white via-purple-200 to-pink-100 bg-clip-text text-transparent'
                  : 'bg-gradient-to-r from-indigo-800 via-purple-800 to-pink-800 bg-clip-text text-transparent'
              }`}>
                Discover, Trade, Thrive on Trendora
              </h1>
              
              <p className={`text-xl ${
                mode === 'dark' ? 'text-purple-100/80' : 'text-indigo-900/70'
              } mb-8 max-w-lg`}>
                Your vibrant marketplace for second-hand treasures. Buy, sell,
                and connect in our sustainable trading community.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/listings">
                  <Button className={`bg-gradient-to-r ${
                    mode === 'dark'
                      ? 'from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-900/30'
                      : 'from-indigo-600 to-fuchsia-600 hover:from-indigo-700 hover:to-fuchsia-700 shadow-lg shadow-indigo-900/20'
                  } text-white font-medium px-8 py-6 rounded-xl text-lg border-0 flex items-center gap-2`}>
                    Explore Marketplace
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </Link>
                {!user && (
                  <Link href="/register">
                    <Button
                      variant="outline"
                      className={`${
                        mode === 'dark'
                          ? 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                          : 'bg-white/70 hover:bg-white/90 text-indigo-900 border-indigo-200'
                      } font-medium px-8 py-6 rounded-xl text-lg`}
                    >
                      Join Now
                    </Button>
                  </Link>
                )}
              </div>

              {/* Features highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                    className={`flex flex-col items-center text-center p-4 rounded-lg ${
                      mode === 'dark' ? 'bg-white/5' : 'bg-white/50'
                    }`}
                  >
                    <div className={`mb-2 ${feature.color}`}>
                      <feature.icon size={24} />
                    </div>
                    <h3 className={`text-sm font-semibold ${
                      mode === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {feature.title}
                    </h3>
                    <p className={`text-xs ${
                      mode === 'dark' ? 'text-white/60' : 'text-gray-600'
                    }`}>
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="lg:w-1/2 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative w-full max-w-lg mx-auto">
                {/* Main hero image with glass effect */}
                <div className={`relative z-10 overflow-hidden rounded-2xl shadow-2xl ${
                  mode === 'dark' ? 'shadow-purple-900/30' : 'shadow-indigo-900/20'
                }`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${
                    mode === 'dark' 
                      ? 'from-purple-600/30 to-pink-600/30' 
                      : 'from-indigo-600/20 to-fuchsia-600/20'
                  } mix-blend-overlay`}></div>
                  <Image
                    src="https://png.pngtree.com/thumb_back/fh260/background/20230930/pngtree-3d-rendered-digital-marketing-mobile-app-for-convenient-online-shopping-image_13551670.png"
                    alt="Trendora Marketplace"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* Floating card elements */}
                <motion.div
                  className={`absolute -top-8 -right-8 ${
                    mode === 'dark'
                      ? 'bg-white/10 backdrop-blur-md border-white/20'
                      : 'bg-white/80 backdrop-blur-sm border-indigo-100'
                  } p-4 rounded-xl border shadow-xl w-48 z-20`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${
                      mode === 'dark'
                        ? 'from-pink-500 to-purple-600'
                        : 'from-pink-600 to-purple-700'
                    } flex items-center justify-center`}>
                      <ShoppingBag size={16} className="text-white" />
                    </div>
                    <span className={`font-medium ${
                      mode === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>Just Listed</span>
                  </div>
                  <p className={`text-xs ${
                    mode === 'dark' ? 'text-white/70' : 'text-gray-700'
                  }`}>
                    Vintage Camera Collection in Excellent Condition
                  </p>
                </motion.div>

                <motion.div
                  className={`absolute -bottom-6 -left-6 ${
                    mode === 'dark'
                      ? 'bg-white/10 backdrop-blur-md border-white/20'
                      : 'bg-white/80 backdrop-blur-sm border-indigo-100'
                  } p-4 rounded-xl border shadow-xl w-48 z-20`}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${
                      mode === 'dark'
                        ? 'from-amber-500 to-orange-600'
                        : 'from-amber-600 to-orange-700'
                    } flex items-center justify-center`}>
                      <MessagesSquare size={16} className="text-white" />
                    </div>
                    <span className={`font-medium ${
                      mode === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>New Message</span>
                  </div>
                  <p className={`text-xs ${
                    mode === 'dark' ? 'text-white/70' : 'text-gray-700'
                  }`}>
                    {"Is this item still available? I'm interested!"}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories section */}
      <CategorySection />

      {/* Featured Items - Enhanced with vibrant animations */}
      <section className="py-20 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10">
          <div className={`absolute top-20 left-1/4 w-64 h-64 ${
            mode === 'dark' ? 'bg-purple-600/10' : 'bg-purple-500/10'
          } rounded-full blur-3xl animate-pulse-slow`}></div>
          <div
            className={`absolute bottom-10 right-1/4 w-80 h-80 ${
              mode === 'dark' ? 'bg-blue-600/10' : 'bg-blue-500/10'
            } rounded-full blur-3xl animate-pulse-slow`}
            style={{ animationDelay: '2.5s' }}
          ></div>
        </div>

        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative">
                <h2 className={`text-3xl sm:text-5xl font-bold mb-2 ${
                  mode === 'dark'
                    ? 'bg-gradient-to-r from-white via-purple-200 to-pink-100 bg-clip-text text-transparent'
                    : 'bg-gradient-to-r from-indigo-800 via-purple-800 to-pink-800 bg-clip-text text-transparent'
                }`}>
                  Featured Listings
                </h2>
                <span className={`absolute -top-4 -left-6 text-lg ${
                  mode === 'dark'
                    ? 'text-pink-600 bg-pink-100/20'
                    : 'text-pink-700 bg-pink-100/50'
                } font-normal rounded-4xl px-2`}>
                  ✨ Hot items
                </span>
              </div>
              <p className={`text-lg ${
                mode === 'dark' ? 'text-purple-100/80' : 'text-indigo-800/80'
              }`}>
                Explore our handpicked selection of amazing items
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link href="/listings">
                <Button
                  variant="outline"
                  className={`${
                    mode === 'dark'
                      ? 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
                      : 'bg-white/50 hover:bg-white/70 border-indigo-200 text-indigo-800'
                  } overflow-hidden group relative`}
                >
                  <span className={`absolute inset-0 w-0 ${
                    mode === 'dark'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                      : 'bg-gradient-to-r from-indigo-500 to-fuchsia-500'
                  } transition-all duration-500 ease-out group-hover:w-full`}></span>
                  <span className="relative flex items-center">
                    View All Listings
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </motion.div>
                  </span>
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`${
                    mode === 'dark'
                      ? 'bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5'
                      : 'bg-gradient-to-br from-indigo-500/5 via-fuchsia-500/5 to-sky-500/5'
                  } p-0.5 rounded-xl overflow-hidden`}
                >
                  <div className={`${
                    mode === 'dark' ? 'bg-white/5' : 'bg-white/30'
                  } h-80 rounded-[calc(0.75rem-1px)] backdrop-blur-sm animate-pulse flex flex-col`}>
                    <div className={`h-48 ${
                      mode === 'dark' ? 'bg-white/10' : 'bg-white/40'
                    } animate-pulse`}></div>
                    <div className="p-4 space-y-3">
                      <div className={`h-4 ${
                        mode === 'dark' ? 'bg-white/10' : 'bg-white/50'
                      } rounded-full w-3/4 animate-pulse`}></div>
                      <div className={`h-3 ${
                        mode === 'dark' ? 'bg-white/10' : 'bg-white/50'
                      } rounded-full animate-pulse`}></div>
                      <div className={`h-3 ${
                        mode === 'dark' ? 'bg-white/10' : 'bg-white/50'
                      } rounded-full w-1/2 animate-pulse`}></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : featuredListings.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {featuredListings.map((listing, index) => (
                <motion.div
                  key={listing._id}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: 'easeOut' },
                    },
                  }}
                  whileHover={{
                    y: -10,
                    boxShadow:
                      mode === 'dark'
                        ? '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)'
                        : '0 20px 25px -5px rgba(79, 70, 229, 0.2), 0 10px 10px -5px rgba(79, 70, 229, 0.1)',
                    transition: { duration: 0.2 },
                  }}
                >
                  <Link
                    href={`/product/${listing._id}`}
                    className="block h-full"
                  >
                    <div
                      className={`bg-gradient-to-br ${getCardColorClass(index)} p-0.5 rounded-xl ${
                        mode === 'dark'
                          ? `shadow-lg shadow-${getCardColorClass(index).split(' ')[1].replace('to-', '')}/20`
                          : `shadow-lg shadow-${getCardColorClass(index).split(' ')[1].replace('to-', '')}/20`
                      } overflow-hidden`}
                    >
                      <div className={`group h-full ${
                        mode === 'dark' ? 'backdrop-blur-md bg-black/30' : 'backdrop-blur-sm bg-white/60'
                      } rounded-[calc(0.75rem-1px)] overflow-hidden transition-all duration-300`}>
                        <div className="h-52 overflow-hidden relative">
                          <motion.div
                            className={`absolute inset-0 ${
                              mode === 'dark'
                                ? 'bg-gradient-to-br from-black/70 via-transparent to-transparent'
                                : 'bg-gradient-to-br from-black/30 via-transparent to-transparent'
                            } z-10`}
                            initial={{ opacity: mode === 'dark' ? 0.3 : 0.1 }}
                            whileHover={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          ></motion.div>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                            className="h-full w-full"
                          >
                            <Image
                              src={listing.images?.[0] || '/placeholder.jpg'}
                              alt={listing.title}
                              fill
                              className="object-cover object-center"
                            />
                          </motion.div>
                          <motion.div
                            className={`absolute top-3 right-3 ${
                              mode === 'dark'
                                ? 'bg-gradient-to-r from-black/60 to-black/60 backdrop-blur-md'
                                : 'bg-gradient-to-r from-white/70 to-white/70 backdrop-blur-sm'
                            } ${
                              mode === 'dark' ? 'text-white' : 'text-gray-900'
                            } font-bold px-3 py-1.5 rounded-lg shadow-xl flex items-center z-20`}
                            whileHover={{ scale: 1.1 }}
                            transition={{
                              type: 'spring',
                              stiffness: 400,
                              damping: 10,
                            }}
                          >
                            <span className={`mr-1 text-xs ${
                              mode === 'dark' ? 'text-white/70' : 'text-gray-600'
                            }`}>
                              $
                            </span>
                            <span className="text-sm">{listing.price}</span>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileHover={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${
                              mode === 'dark' ? 'from-black/80' : 'from-black/60'
                            } to-transparent p-3 flex items-center z-10`}
                          >
                            <div className={`px-2 py-1 ${
                              mode === 'dark' ? 'bg-white/20' : 'bg-white/40'
                            } backdrop-blur-md rounded-full text-xs text-white`}>
                              View Details
                            </div>
                          </motion.div>
                        </div>

                        <div className="p-5">
                          <h3 className={`font-bold text-lg ${
                            mode === 'dark'
                              ? 'text-white group-hover:text-purple-200'
                              : 'text-gray-900 group-hover:text-purple-700'
                            } transition-colors truncate`}
                          >
                            {listing.title}
                          </h3>
                          <p className={`${
                            mode === 'dark' ? 'text-white/70' : 'text-gray-700'
                          } line-clamp-2 text-sm h-10 my-2`}>
                            {typeof listing.description === 'string'
                              ? listing.description
                              : 'No description provided'}
                          </p>
                          <div className="flex justify-between items-center mt-3">
                            <motion.span
                              className={`text-xs ${
                                mode === 'dark'
                                  ? index % 2 === 0 ? 'bg-purple-500/30' : 'bg-pink-500/30'
                                  : index % 2 === 0 ? 'bg-purple-200' : 'bg-pink-200'
                              } px-2.5 py-1 rounded-full capitalize flex items-center gap-1 ${
                                mode === 'dark' ? 'text-white/90' : 'text-gray-800'
                              }`}
                              whileHover={{ scale: 1.05 }}
                              transition={{
                                type: 'spring',
                                stiffness: 400,
                                damping: 10,
                              }}
                            >
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  mode === 'dark'
                                    ? index % 2 === 0 ? 'bg-purple-400' : 'bg-pink-400'
                                    : index % 2 === 0 ? 'bg-purple-500' : 'bg-pink-500'
                                }`}
                              ></span>
                              {listing.condition}
                            </motion.span>
                            <span className={`text-xs ${
                              mode === 'dark' ? 'text-white/60' : 'text-gray-500'
                            } italic`}>
                              {listing.createdAt
                                ? new Date(
                                    listing.createdAt,
                                  ).toLocaleDateString()
                                : 'Recently added'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`text-center py-16 backdrop-blur-md ${
                mode === 'dark' ? 'bg-white/5' : 'bg-white/30'
              } rounded-xl border ${
                mode === 'dark' ? 'border-white/10' : 'border-indigo-100'
              }`}
            >
              <div className={`w-20 h-20 mx-auto mb-4 rounded-full ${
                mode === 'dark' ? 'bg-white/5' : 'bg-white/30'
              } flex items-center justify-center border ${
                mode === 'dark' ? 'border-white/10' : 'border-indigo-100'
              }`}>
                <ShoppingBag className={`h-8 w-8 ${
                  mode === 'dark' ? 'text-white/40' : 'text-indigo-400'
                }`} />
              </div>
              <p className={`${
                mode === 'dark' ? 'text-white/70' : 'text-gray-600'
              } text-lg`}>
                No featured listings available at the moment.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                className="mt-4"
              >
                <Link
                  href="/listings"
                  className={`text-lg inline-flex items-center gap-2 bg-gradient-to-r ${
                    mode === 'dark'
                      ? 'from-purple-400 to-pink-400 hover:from-purple-300 hover:to-pink-300'
                      : 'from-indigo-600 to-fuchsia-600 hover:from-indigo-700 hover:to-fuchsia-700'
                  } bg-clip-text text-transparent transition-all`}
                >
                  Browse all listings
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ArrowRight className={`h-4 w-4 ${
                      mode === 'dark' ? 'text-pink-400' : 'text-fuchsia-600'
                    }`} />
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className={`py-16 ${
        mode === 'dark' ? 'bg-black/20' : 'bg-indigo-900/5'
      } backdrop-blur-sm`}>
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
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
              How Trendora Works
            </h2>
            <p className={`text-lg ${
              mode === 'dark' ? 'text-purple-100/80' : 'text-indigo-800/80'
            } max-w-2xl mx-auto`}>
              Follow these simple steps to start trading on our marketplace
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="relative" variants={fadeIn}>
              <div className={`backdrop-blur-md ${
                mode === 'dark'
                  ? 'bg-white/5 border-white/10'
                  : 'bg-white/50 border-indigo-100'
              } border rounded-xl p-6 shadow-xl h-full`}>
                <div className={`absolute -top-4 -right-4 w-12 h-12 rounded-full ${
                  mode === 'dark'
                    ? 'bg-gradient-to-br from-purple-600 to-pink-600'
                    : 'bg-gradient-to-br from-purple-700 to-pink-700'
                } flex items-center justify-center text-white font-bold text-xl`}>
                  1
                </div>
                <div className={`mb-6 w-16 h-16 rounded-full ${
                  mode === 'dark'
                    ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20'
                    : 'bg-gradient-to-r from-purple-100 to-pink-100'
                } flex items-center justify-center`}>
                  <Search className={`h-8 w-8 ${
                    mode === 'dark' ? 'text-purple-300' : 'text-purple-700'
                  }`} />
                </div>
                <h3 className={`text-xl font-semibold ${
                  mode === 'dark' ? 'text-white' : 'text-gray-900'
                } mb-3`}>
                  Browse Listings
                </h3>
                <p className={`${
                  mode === 'dark' ? 'text-purple-100/80' : 'text-indigo-900/80'
                }`}>
                  Explore thousands of unique items across diverse categories
                  from sellers in your community.
                </p>
              </div>
            </motion.div>

            <motion.div className="relative mt-8 md:mt-12" variants={fadeIn}>
              <div className={`backdrop-blur-md ${
                mode === 'dark'
                  ? 'bg-white/5 border-white/10'
                  : 'bg-white/50 border-indigo-100'
              } border rounded-xl p-6 shadow-xl h-full`}>
                <div className={`absolute -top-4 -right-4 w-12 h-12 rounded-full ${
                  mode === 'dark'
                    ? 'bg-gradient-to-br from-blue-600 to-cyan-600'
                    : 'bg-gradient-to-br from-blue-700 to-cyan-700'
                } flex items-center justify-center text-white font-bold text-xl`}>
                  2
                </div>
                <div className={`mb-6 w-16 h-16 rounded-full ${
                  mode === 'dark'
                    ? 'bg-gradient-to-r from-blue-600/20 to-cyan-600/20'
                    : 'bg-gradient-to-r from-blue-100 to-cyan-100'
                } flex items-center justify-center`}>
                  <MessagesSquare className={`h-8 w-8 ${
                    mode === 'dark' ? 'text-blue-300' : 'text-blue-700'
                  }`} />
                </div>
                <h3 className={`text-xl font-semibold ${
                  mode === 'dark' ? 'text-white' : 'text-gray-900'
                } mb-3`}>
                  Connect & Chat
                </h3>
                <p className={`${
                  mode === 'dark' ? 'text-purple-100/80' : 'text-indigo-900/80'
                }`}>
                  Message sellers directly to ask questions, negotiate prices,
                  and arrange meetups for item handovers.
                </p>
              </div>
            </motion.div>

            <motion.div className="relative mt-8 md:mt-24" variants={fadeIn}>
              <div className={`backdrop-blur-md ${
                mode === 'dark'
                  ? 'bg-white/5 border-white/10'
                  : 'bg-white/50 border-indigo-100'
              } border rounded-xl p-6 shadow-xl h-full`}>
                <div className={`absolute -top-4 -right-4 w-12 h-12 rounded-full ${
                  mode === 'dark'
                    ? 'bg-gradient-to-br from-amber-500 to-orange-600'
                    : 'bg-gradient-to-br from-amber-600 to-orange-700'
                } flex items-center justify-center text-white font-bold text-xl`}>
                  3
                </div>
                <div className={`mb-6 w-16 h-16 rounded-full ${
                  mode === 'dark'
                    ? 'bg-gradient-to-r from-amber-500/20 to-orange-600/20'
                    : 'bg-gradient-to-r from-amber-100 to-orange-100'
                } flex items-center justify-center`}>
                  <PiggyBank className={`h-8 w-8 ${
                    mode === 'dark' ? 'text-amber-300' : 'text-amber-700'
                  }`} />
                </div>
                <h3 className={`text-xl font-semibold ${
                  mode === 'dark' ? 'text-white' : 'text-gray-900'
                } mb-3`}>
                  Trade Safely
                </h3>
                <p className={`${
                  mode === 'dark' ? 'text-purple-100/80' : 'text-indigo-900/80'
                }`}>
                  Complete your transaction with confidence using our secure
                  payment system or in-person exchanges.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-16 ${
        mode === 'dark' ? 'bg-black/20' : 'bg-indigo-900/5'
      }`}>
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div
                  className={`bg-gradient-to-br ${stat.colors[mode].gradient} p-0.5 rounded-xl shadow-lg overflow-hidden`}
                  style={{ boxShadow: `0 8px 32px -8px ${stat.colors[mode].glow}` }}
                >
                  <div className={`${
                    mode === 'dark' 
                      ? 'bg-black/40 backdrop-blur-sm' 
                      : 'bg-white/80 backdrop-blur-sm'
                  } h-full w-full rounded-[calc(0.75rem-1px)] p-6 flex flex-col items-center justify-center`}>
                    <div className={`w-12 h-12 rounded-full 
                      ${mode === 'dark' ? 'bg-white/20' : 'bg-white'} 
                      flex items-center justify-center mb-3`}
                      style={{ backgroundColor: stat.colors[mode].iconBg }}
                    >
                      <stat.icon className={`h-6 w-6 ${stat.colors[mode].text}`} />
                    </div>
                    <h3 className={`text-2xl sm:text-3xl font-bold ${
                      mode === 'dark' ? 'text-white' : 'text-gray-900'
                    } mb-1`}>
                      {stat.value}
                    </h3>
                    <p className={`text-sm ${
                      mode === 'dark' ? 'text-white/70' : 'text-gray-700'
                    } text-center`}>
                      {stat.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className={`absolute top-0 left-1/4 w-96 h-96 ${
            mode === 'dark' 
              ? 'bg-purple-600/20' 
              : 'bg-purple-500/10'
          } rounded-full blur-3xl`}></div>
          <div className={`absolute bottom-0 right-1/4 w-96 h-96 ${
            mode === 'dark' 
              ? 'bg-blue-600/20' 
              : 'bg-blue-500/10'
          } rounded-full blur-3xl`}></div>
        </div>

        <div className="container mx-auto px-4">
          <motion.div
            className={`max-w-3xl mx-auto text-center backdrop-blur-xl ${
              mode === 'dark'
                ? 'bg-white/5 border-white/10'
                : 'bg-white/60 border-indigo-100'
            } p-8 md:p-12 rounded-3xl border shadow-2xl relative`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${
              mode === 'dark'
                ? 'bg-gradient-to-r from-white via-purple-200 to-pink-100 bg-clip-text text-transparent'
                : 'bg-gradient-to-r from-indigo-800 via-purple-800 to-pink-800 bg-clip-text text-transparent'
            }`}>
              Ready to Join the Trendora Community?
            </h2>
            <p className={`text-lg ${
              mode === 'dark' ? 'text-purple-100/80' : 'text-indigo-900/80'
            } mb-8`}>
              Start buying and selling today. Join thousands of users creating a
              more sustainable future through second-hand trading.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button className={`bg-gradient-to-r ${
                  mode === 'dark'
                    ? 'from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-900/30'
                    : 'from-indigo-600 to-fuchsia-600 hover:from-indigo-700 hover:to-fuchsia-700 shadow-lg shadow-indigo-900/20'
                  } text-white font-medium px-8 py-6 rounded-xl text-lg border-0 w-full sm:w-auto`}>
                  Create an Account
                </Button>
              </Link>
              <Link href="/listings">
                <Button
                  variant="outline"
                  className={`${
                    mode === 'dark'
                      ? 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
                      : 'bg-white/50 hover:bg-white/90 border-indigo-200 text-indigo-900'
                  } font-medium px-8 py-6 rounded-xl text-lg w-full sm:w-auto`}
                >
                  Browse Marketplace
                </Button>
              </Link>
            </div>

            {/* Decorative elements */}
            <div className={`absolute -top-4 -right-4 w-24 h-24 rounded-full ${
              mode === 'dark' 
                ? 'bg-gradient-to-br from-purple-600/30 to-pink-600/30'
                : 'bg-gradient-to-br from-indigo-600/20 to-fuchsia-600/20'
            } blur-xl -z-10`}></div>
            <div className={`absolute -bottom-4 -left-4 w-24 h-24 rounded-full ${
              mode === 'dark'
                ? 'bg-gradient-to-br from-blue-600/30 to-cyan-600/30'
                : 'bg-gradient-to-br from-blue-600/20 to-cyan-600/20'
            } blur-xl -z-10`}></div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Homepage