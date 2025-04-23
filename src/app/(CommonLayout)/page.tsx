'use client'

import { Button } from '@/components/ui/button'
import { protectedRoutes } from '@/constants'
import { useUser } from '@/context/UserContext'
import { logout } from '@/services/AuthService'
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
import { usePathname, useRouter } from 'next/navigation'
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
  const { user, setIsLoading } = useUser()
  const pathname = usePathname()
  const router = useRouter()
  const [featuredListings, setFeaturedListings] = useState<TListing[]>([])
  const [isLoading, setIsLoadingState] = useState(true)

  const handleLogOut = () => {
    logout()
    setIsLoading(true)
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push('/')
    }
  }

  // Categories for the featured categories section
  const categories = [
    {
      name: 'Electronics',
      icon: 'https://img.pikbest.com/ai/illus_our/20230428/8690736d499ac58554cf07afc0ef0507.jpg!w700wp',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'Fashion',
      icon: 'https://www.shutterstock.com/image-vector/3d-girl-teenage-clothes-set-600nw-2449902313.jpg',
      color: 'from-pink-500 to-rose-500',
    },
    {
      name: 'Home & Garden',
      icon: 'https://cdna.artstation.com/p/assets/images/images/039/733/086/large/th-thanh-cg-mini-house.jpg?1626782721',
      color: 'from-amber-500 to-yellow-500',
    },
    {
      name: 'Sports & Outdoors',
      icon: 'https://static.vecteezy.com/system/resources/thumbnails/020/410/093/small_2x/3d-football-object-design-realistic-rendering-abstract-futuristic-background-3d-illustration-motion-geometry-concept-sport-competition-graphic-tournament-game-bet-content-soccer-ball-element-photo.jpg',
      color: 'from-green-500 to-emerald-500',
    },
    {
      name: 'Collectibles',
      icon: 'https://cdn.dribbble.com/userupload/16805340/file/still-2db767d355b367c0428776d17932d26a.png?format=webp&resize=400x300&vertical=center',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      name: 'Vehicles',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKWkn_PC7pmZ7QFgA6C7y3uKst5lq_mTOz1aHpTlqFfYvPUUVYJxwYf7xXWyJnJK8h7yg&usqp=CAU',
      color: 'from-red-500 to-orange-500',
    },
  ]

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
        if (response.success) {
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
                  Discover, Trade, Thrive on SwapNest
                </span>
              </h1>
              <p className="text-xl text-purple-100/80 mb-8 max-w-lg">
                Your vibrant marketplace for second-hand treasures. Buy, sell,
                and connect in our sustainable trading community.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/all-lists">
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
                    alt="SwapNest Marketplace"
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
                    "Is this item still available? I'm interested!"
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-black/20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-100 bg-clip-text text-transparent">
              Explore Categories
            </h2>
            <p className="text-lg text-purple-100/80 max-w-2xl mx-auto">
              Discover items across diverse categories, all in one vibrant
              marketplace
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                variants={fadeIn}
                className="group"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Link
                  href={`/all-lists?category=${category.name.toLowerCase()}`}
                >
                  <div
                    className={`bg-gradient-to-br ${category.color} p-0.5 rounded-xl shadow-lg overflow-hidden`}
                  >
                    <div className="bg-black/40 backdrop-blur-sm h-full w-full rounded-[calc(0.75rem-1px)] p-6 flex flex-col items-center justify-center transition-all duration-300 group-hover:bg-black/30">
                      <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center mb-3 group-hover:bg-white/30 transition-all duration-300">
                        <Image
                          src={category.icon}
                          alt={category.name}
                          width={96}
                          height={96}
                          className="w-24 h-24 rounded-full"
                        />
                      </div>
                      <h3 className="font-medium text-center text-white">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-white via-purple-200 to-pink-100 bg-clip-text text-transparent">
                Featured Listings
              </h2>
              <p className="text-lg text-purple-100/80">
                Explore our handpicked selection of amazing items
              </p>
            </div>
            <Link href="/all-lists">
              <Button
                variant="outline"
                className="bg-white/10 hover:bg-white/20 border-white/20 text-white"
              >
                View All Listings
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white/5 h-72 rounded-xl animate-pulse backdrop-blur-sm"
                ></div>
              ))}
            </div>
          ) : featuredListings.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {featuredListings.map((listing, index) => (
                <motion.div
                  key={listing._id}
                  variants={fadeIn}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Link href={`/product/${listing._id}`}>
                    <div className="group h-full backdrop-blur-md bg-white/5 rounded-xl border border-white/10 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-white/20">
                      <div className="h-48 overflow-hidden relative">
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${getCardColorClass(index)} opacity-40 group-hover:opacity-50 transition-opacity duration-300`}
                        ></div>
                        <Image
                          src={listing.images?.[0] || '/placeholder.jpg'}
                          alt={listing.title}
                          fill
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-md">
                          ${listing.price}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg text-white truncate group-hover:text-purple-200 transition-colors">
                          {listing.title}
                        </h3>
                        <p className="text-white/70 line-clamp-2 text-sm h-10 mb-2">
                          {listing.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs bg-white/10 px-2 py-1 rounded-full capitalize">
                            {listing.condition}
                          </span>
                          <span className="text-xs text-white/60">
                            {new Date(listing.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12 backdrop-blur-md bg-white/5 rounded-xl border border-white/10">
              <p className="text-white/70">
                No featured listings available at the moment.
              </p>
              <Link
                href="/all-lists"
                className="text-purple-400 hover:text-purple-300 mt-2 inline-block"
              >
                Browse all listings
              </Link>
            </div>
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
              How SwapNest Works
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
              Join thousands of satisfied users on SwapNest
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
                  "SwapNest has transformed how I declutter my home. I've sold
                  items I no longer need and found amazing vintage pieces at
                  great prices!"
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
                  "The messaging system makes it so easy to negotiate and set up
                  meetups. I've found incredible deals on tech gear that would
                  have cost a fortune new."
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
                        className="h-4 w-4 text-amber-400"
                        className={
                          i < 4
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-amber-400'
                        }
                      />
                    ))}
                  </div>
                </div>
                <p className="text-purple-100/90 italic">
                  "I love that SwapNest helps reduce waste through second-hand
                  trading. The community is respectful and the platform is so
                  easy to use!"
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
              Ready to Join the SwapNest Community?
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
              <Link href="/all-lists">
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
