'use client'

import { CategorySection } from '@/components/modules/category/Categories'
import { Button } from '@/components/ui/button'
import { useUser } from '@/context/UserContext'
import { getListings } from '@/services/listings'
import { TListing } from '@/types/listings/listing'
import { motion } from 'framer-motion'
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
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
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

const Homepage = () => {
  const { user } = useUser()
  const [featuredListings, setFeaturedListings] = useState<TListing[]>([])
  const [isLoading, setIsLoadingState] = useState(true)

  // Stats for the statistics section
  const stats = [
    {
      value: '50K+',
      label: 'Active Users',
      icon: Users,
      color: 'from-pink-500 to-purple-600',
    },
    {
      value: '100K+',
      label: 'Items Listed',
      icon: Boxes,
      color: 'from-blue-500 to-cyan-600',
    },
    {
      value: '98%',
      label: 'Satisfaction',
      icon: Star,
      color: 'from-amber-500 to-yellow-600',
    },
    {
      value: '$2.5M',
      label: 'Monthly Sales',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-600',
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

  // Process card color classes for featured items
  const getCardColorClass = (index: number) => {
    const colorClasses = [
      'from-pink-500 to-rose-500',
      'from-blue-500 to-cyan-500',
      'from-purple-500 to-indigo-500',
      'from-amber-500 to-orange-500',
      'from-emerald-500 to-teal-500',
      'from-red-500 to-pink-500',
    ]
    return colorClasses[index % colorClasses.length]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-violet-900 text-white">
      {/* Background decoration elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div
          className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-emerald-600/5 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: '3s' }}
        ></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <motion.div
              className="lg:w-1/2 mb-12 lg:mb-0"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="bg-gradient-to-r from-white via-purple-200 to-pink-100 bg-clip-text text-transparent">
                  Discover, Trade, Thrive on Trendora
                </span>
              </h1>
              <p className="text-xl text-purple-100/80 mb-8 max-w-lg">
                Your vibrant marketplace for second-hand treasures. Buy, sell,
                and connect in our sustainable trading community.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/listings">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-8 py-6 rounded-xl shadow-lg shadow-purple-900/30 text-lg border-0 flex items-center gap-2">
                    Explore Marketplace
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </Link>
                {!user && (
                  <Link href="/register">
                    <Button
                      variant="outline"
                      className="bg-white/10 hover:bg-white/20 text-white border-white/20 font-medium px-8 py-6 rounded-xl text-lg"
                    >
                      Join Now
                    </Button>
                  </Link>
                )}
              </div>

              {/* Achievements badges */}
              <motion.div
                className="flex flex-wrap gap-4 mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Star className="text-amber-400 h-4 w-4" />
                  <span className="text-sm text-white/80">
                    Trusted by 50K+ users
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <CheckCircle className="text-emerald-400 h-4 w-4" />
                  <span className="text-sm text-white/80">
                    Verified sellers
                  </span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="lg:w-1/2 relative"
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="relative w-full max-w-lg mx-auto">
                {/* Main hero image */}
                <div className="relative z-10 overflow-hidden rounded-2xl shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-pink-600/30 mix-blend-overlay"></div>
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
                  className="absolute -top-8 -right-8 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 shadow-xl w-48 z-20"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
                      <ShoppingBag className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium text-white">Just Listed</span>
                  </div>
                  <p className="text-xs text-white/70">
                    Vintage Camera Collection in Excellent Condition
                  </p>
                </motion.div>

                <motion.div
                  className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 shadow-xl w-48 z-20"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center">
                      <MessagesSquare className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium text-white">New Message</span>
                  </div>
                  <p className="text-xs text-white/70">
                    {"Is this item still available? I'm interested!"}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* categoires section */}
      <CategorySection />

      {/* Featured Items - Enhanced with vibrant animations */}
      <section className="py-20 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-64 h-64 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div
            className="absolute bottom-10 right-1/4 w-80 h-80 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 rounded-full blur-3xl animate-pulse-slow"
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
              <h2 className="text-3xl sm:text-5xl font-bold mb-2 bg-gradient-to-r from-white via-purple-200 to-pink-100 bg-clip-text text-transparent relative">
                Featured Listings
                <span className="absolute -top-4 -left-6 text-lg text-pink-600 font-normal bg-pink-100/40 rounded-4xl px-2">
                  ✨ Hot items
                </span>
              </h2>
              <p className="text-lg text-purple-100/80">
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
                  className="bg-white/10 hover:bg-white/20 border-white/20 text-white overflow-hidden group relative"
                >
                  <span className="absolute inset-0 w-0 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 ease-out group-hover:w-full"></span>
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
                  className="bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 p-0.5 rounded-xl overflow-hidden"
                >
                  <div className="bg-white/5 h-80 rounded-[calc(0.75rem-1px)] backdrop-blur-sm animate-pulse flex flex-col">
                    <div className="h-48 bg-white/10 animate-pulse"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-white/10 rounded-full w-3/4 animate-pulse"></div>
                      <div className="h-3 bg-white/10 rounded-full animate-pulse"></div>
                      <div className="h-3 bg-white/10 rounded-full w-1/2 animate-pulse"></div>
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
                      '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
                    transition: { duration: 0.2 },
                  }}
                >
                  <Link
                    href={`/product/${listing._id}`}
                    className="block h-full"
                  >
                    <div
                      className={`bg-gradient-to-br ${getCardColorClass(index)} p-0.5 rounded-xl shadow-lg shadow-${getCardColorClass(index).split(' ')[1].replace('to-', '')}/20 overflow-hidden`}
                    >
                      <div className="group h-full backdrop-blur-md bg-black/30 rounded-[calc(0.75rem-1px)] overflow-hidden transition-all duration-300">
                        <div className="h-52 overflow-hidden relative">
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-black/70 via-transparent to-transparent z-10"
                            initial={{ opacity: 0.3 }}
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
                            className={`absolute top-3 right-3 bg-gradient-to-r from-black/60 to-black/60 backdrop-blur-md text-white font-bold px-3 py-1.5 rounded-lg shadow-xl flex items-center z-20`}
                            whileHover={{ scale: 1.1 }}
                            transition={{
                              type: 'spring',
                              stiffness: 400,
                              damping: 10,
                            }}
                          >
                            <span className="mr-1 text-xs text-white/70">
                              $
                            </span>
                            <span className="text-sm">{listing.price}</span>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileHover={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 flex items-center z-10"
                          >
                            <div className="px-2 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs">
                              View Details
                            </div>
                          </motion.div>
                        </div>

                        <div className="p-5">
                          <h3 className="font-bold text-lg text-white group-hover:text-purple-200 transition-colors truncate">
                            {listing.title}
                          </h3>
                          <p className="text-white/70 line-clamp-2 text-sm h-10 my-2">
                            {typeof listing.description === 'string'
                              ? listing.description
                              : 'No description provided'}
                          </p>
                          <div className="flex justify-between items-center mt-3">
                            <motion.span
                              className={`text-xs ${index % 2 === 0 ? 'bg-purple-500/30' : 'bg-pink-500/30'} px-2.5 py-1 rounded-full capitalize flex items-center gap-1`}
                              whileHover={{ scale: 1.05 }}
                              transition={{
                                type: 'spring',
                                stiffness: 400,
                                damping: 10,
                              }}
                            >
                              <span
                                className={`w-2 h-2 rounded-full ${index % 2 === 0 ? 'bg-purple-400' : 'bg-pink-400'}`}
                              ></span>
                              {listing.condition}
                            </motion.span>
                            <span className="text-xs text-white/60 italic">
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
              className="text-center py-16 backdrop-blur-md bg-white/5 rounded-xl border border-white/10"
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <ShoppingBag className="h-8 w-8 text-white/40" />
              </div>
              <p className="text-white/70 text-lg">
                No featured listings available at the moment.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                className="mt-4"
              >
                <Link
                  href="/listings"
                  className="text-lg inline-flex items-center gap-2 text-gradient bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-purple-300 hover:to-pink-300 transition-all"
                >
                  Browse all listings
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ArrowRight className="h-4 w-4 text-pink-400" />
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-100 bg-clip-text text-transparent">
              How Trendora Works
            </h2>
            <p className="text-lg text-purple-100/80 max-w-2xl mx-auto">
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
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 shadow-xl h-full">
                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-xl">
                  1
                </div>
                <div className="mb-6 w-16 h-16 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 flex items-center justify-center">
                  <Search className="h-8 w-8 text-purple-300" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Browse Listings
                </h3>
                <p className="text-purple-100/80">
                  Explore thousands of unique items across diverse categories
                  from sellers in your community.
                </p>
              </div>
            </motion.div>

            <motion.div className="relative mt-8 md:mt-12" variants={fadeIn}>
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 shadow-xl h-full">
                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-white font-bold text-xl">
                  2
                </div>
                <div className="mb-6 w-16 h-16 rounded-full bg-gradient-to-r from-blue-600/20 to-cyan-600/20 flex items-center justify-center">
                  <MessagesSquare className="h-8 w-8 text-blue-300" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Connect & Chat
                </h3>
                <p className="text-purple-100/80">
                  Message sellers directly to ask questions, negotiate prices,
                  and arrange meetups for item handovers.
                </p>
              </div>
            </motion.div>

            <motion.div className="relative mt-8 md:mt-24" variants={fadeIn}>
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 shadow-xl h-full">
                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-xl">
                  3
                </div>
                <div className="mb-6 w-16 h-16 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-600/20 flex items-center justify-center">
                  <PiggyBank className="h-8 w-8 text-amber-300" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Trade Safely
                </h3>
                <p className="text-purple-100/80">
                  Complete your transaction with confidence using our secure
                  payment system or in-person exchanges.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-100 bg-clip-text text-transparent">
              What Our Community Says
            </h2>
            <p className="text-lg text-purple-100/80 max-w-2xl mx-auto">
              Join thousands of satisfied users on Trendora
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeIn}>
              <div className="backdrop-blur-md bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-white/10 rounded-xl p-6 shadow-xl">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-lg mr-3">
                    S
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Sarah Johnson</h4>
                    <p className="text-xs text-white/60">
                      Seller • 50+ transactions
                    </p>
                  </div>
                  <div className="ml-auto flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-amber-400 fill-amber-400"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-purple-100/90 italic">
                  {
                    "Trendora has transformed how I declutter my home. I've sold items I no longer need and found amazing vintage pieces at great prices!"
                  }
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeIn}>
              <div className="backdrop-blur-md bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-white/10 rounded-xl p-6 shadow-xl">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center text-white font-bold text-lg mr-3">
                    M
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Michael Chen</h4>
                    <p className="text-xs text-white/60">
                      Buyer • 27+ transactions
                    </p>
                  </div>
                  <div className="ml-auto flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-amber-400 fill-amber-400"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-purple-100/90 italic">
                  {
                    "The messaging system makes it so easy to negotiate and set up meetups. I've found incredible deals on tech gear that would have cost a fortune new."
                  }
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeIn}>
              <div className="backdrop-blur-md bg-gradient-to-br from-emerald-600/20 to-teal-600/20 border border-white/10 rounded-xl p-6 shadow-xl">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 flex items-center justify-center text-white font-bold text-lg mr-3">
                    A
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Aisha Patel</h4>
                    <p className="text-xs text-white/60">
                      Seller & Buyer • 32+ transactions
                    </p>
                  </div>
                  <div className="ml-auto flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={
                          i < 4
                            ? 'h-4 w-4 fill-amber-400 text-amber-400'
                            : 'h-4 w-4 text-amber-400'
                        }
                      />
                    ))}
                  </div>
                </div>
                <p className="text-purple-100/90 italic">
                  {
                    'I love that Trendora helps reduce waste through second-hand trading. The community is respectful and the platform is so easy to use!'
                  }
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-black/20">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
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
                  className={`bg-gradient-to-br ${stat.color} p-0.5 rounded-xl shadow-lg overflow-hidden`}
                >
                  <div className="bg-black/40 backdrop-blur-sm h-full w-full rounded-[calc(0.75rem-1px)] p-6 flex flex-col items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-3">
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                      {stat.value}
                    </h3>
                    <p className="text-sm text-white/70 text-center">
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
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center backdrop-blur-xl bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-100 bg-clip-text text-transparent">
              Ready to Join the Trendora Community?
            </h2>
            <p className="text-lg text-purple-100/80 mb-8">
              Start buying and selling today. Join thousands of users creating a
              more sustainable future through second-hand trading.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-8 py-6 rounded-xl shadow-lg shadow-purple-900/30 text-lg border-0 w-full sm:w-auto">
                  Create an Account
                </Button>
              </Link>
              <Link href="/listings">
                <Button
                  variant="outline"
                  className="bg-white/10 hover:bg-white/20 border-white/20 text-white font-medium px-8 py-6 rounded-xl text-lg w-full sm:w-auto"
                >
                  Browse Marketplace
                </Button>
              </Link>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 blur-xl -z-10"></div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-gradient-to-br from-blue-600/30 to-cyan-600/30 blur-xl -z-10"></div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Homepage
