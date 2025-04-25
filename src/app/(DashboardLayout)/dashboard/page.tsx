'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useUser } from '@/context/UserContext'
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  BarChart3,
  ChevronRight,
  Clock,
  DollarSign,
  Gift,
  Package,
  ShoppingBag,
  Star,
  Tag,
  Truck,
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
}

const Dashboard = () => {
  const { user } = useUser()
  const { name = '' } = user?.data || {}
  const [mounted, setMounted] = useState(false)
  const [stats, setStats] = useState({
    views: 0,
    listings: 0,
    messages: 0,
    favorites: 0,
    sales: 0,
  })

  // Simulate loading stats
  useEffect(() => {
    setMounted(true)

    // Simulate API call to fetch statistics
    const timer = setTimeout(() => {
      setStats({
        views: 245,
        listings: 12,
        messages: 18,
        favorites: 32,
        sales: 8,
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  if (!mounted) return null

  // Mock recent activity data
  const recentActivity = [
    {
      id: 1,
      type: 'message',
      title: 'New message about "Vintage Camera"',
      time: '2 hours ago',
      icon: <Clock className="h-4 w-4 text-blue-300" />,
    },
    {
      id: 2,
      type: 'view',
      title: 'Your "Leather Jacket" got 15 new views',
      time: 'Today',
      icon: <Star className="h-4 w-4 text-amber-300" />,
    },
    {
      id: 3,
      type: 'offer',
      title: 'New offer on "Mechanical Keyboard"',
      time: 'Yesterday',
      icon: <DollarSign className="h-4 w-4 text-green-300" />,
    },
    {
      id: 4,
      type: 'sale',
      title: 'You sold "Mountain Bike"',
      time: '3 days ago',
      icon: <Tag className="h-4 w-4 text-pink-300" />,
    },
  ]

  // Mock quick actions
  const quickActions = [
    {
      title: 'Create Listing',
      path: '/dashboard/user/listings/create-listing',
      description: 'Add a new item to marketplace',
      icon: <Package className="h-6 w-6" />,
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'My Listings',
      path: '/dashboard/user/listings',
      description: 'Manage your posted items',
      icon: <ShoppingBag className="h-6 w-6" />,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Orders',
      path: '/dashboard/orders',
      description: 'View purchase history',
      icon: <Truck className="h-6 w-6" />,
      color: 'from-emerald-500 to-green-500',
    },
  ]

  return (
    <div className="relative w-full min-h-screen pb-20">
      {/* Background decoration elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-20 -right-20 w-64 h-64 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-80 h-80 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: 2,
          }}
        />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Welcome Section */}
        <motion.section
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8 overflow-hidden relative shadow-2xl">
            {/* Decorative gradient orbs */}
            <div className="absolute -bottom-8 right-8 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl"></div>
            <div className="absolute -top-8 left-1/2 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-xl"></div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
              <div className="flex flex-col md:flex-row items-center gap-5">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/50 to-pink-600/50 animate-pulse-slow blur-md"></div>
                  <Avatar className="w-20 h-20 border-2 border-white/20 relative">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-white text-xl font-bold">
                      {name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="text-center md:text-left">
                  <motion.h1
                    className="text-2xl md:text-3xl font-bold mb-1 bg-gradient-to-r from-white via-purple-200 to-pink-100 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    Welcome{name ? `, ${name.split(' ')[0]}` : ''}!
                  </motion.h1>
                  <motion.p
                    className="text-purple-100/80"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    Manage your listings and track your marketplace activity
                  </motion.p>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <Link href="/dashboard/user/listings/create-listing">
                  <Button className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md shadow-purple-500/20 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 border-0">
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 animate-gradient-x [animation-duration:3s]"></span>
                    <span className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-[-20deg] transform -translate-x-full hover:duration-1000 duration-1000 transition-transform hover:translate-x-[200%]"></span>
                    <span className="relative flex items-center">
                      Create New Listing
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </span>
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Stats Cards */}
        <motion.section className="mb-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            {
              label: 'Profile Views',
              value: stats.views,
              icon: <BarChart3 className="h-5 w-5 text-purple-300" />,
              color: 'from-purple-500/20 to-pink-500/20',
            },
            {
              label: 'Active Listings',
              value: stats.listings,
              icon: <ShoppingBag className="h-5 w-5 text-blue-300" />,
              color: 'from-blue-500/20 to-cyan-500/20',
            },
            {
              label: 'Messages',
              value: stats.messages,
              icon: <Gift className="h-5 w-5 text-amber-300" />,
              color: 'from-amber-500/20 to-orange-500/20',
            },
            {
              label: 'Favorites',
              value: stats.favorites,
              icon: <Star className="h-5 w-5 text-pink-300" />,
              color: 'from-pink-500/20 to-rose-500/20',
            },
            {
              label: 'Completed Sales',
              value: stats.sales,
              icon: <Tag className="h-5 w-5 text-emerald-300" />,
              color: 'from-emerald-500/20 to-teal-500/20',
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-lg"
            >
              <div
                className={`w-10 h-10 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}
              >
                {stat.icon}
              </div>
              <p className="text-white/70 text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </motion.div>
          ))}
        </motion.section>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 shadow-xl h-full">
              <h2 className="text-xl font-semibold mb-5 text-white flex items-center">
                <span className="mr-2">Quick Actions</span>
                <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
              </h2>

              <div className="space-y-3">
                {quickActions.map((action, i) => (
                  <motion.div
                    key={action.title}
                    custom={i}
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link href={action.path} className="block">
                      <div className="flex items-center gap-4 bg-white/5 hover:bg-white/10 transition-colors duration-200 p-4 rounded-lg border border-white/10 group">
                        <div
                          className={`p-3 rounded-lg bg-gradient-to-br ${action.color} shadow-lg`}
                        >
                          {action.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-white group-hover:text-purple-200 transition-colors">
                            {action.title}
                          </h3>
                          <p className="text-sm text-white/60">
                            {action.description}
                          </p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-white/40 group-hover:text-white/80 transform group-hover:translate-x-1 transition-all" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Recent Activity */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 shadow-xl h-full">
              <h2 className="text-xl font-semibold mb-5 text-white flex items-center justify-between">
                <span>Recent Activity</span>
                <Link href="/dashboard">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white/60 hover:text-white"
                  >
                    View All
                  </Button>
                </Link>
              </h2>

              <div className="space-y-4">
                {recentActivity.map((activity, i) => (
                  <motion.div
                    key={activity.id}
                    custom={i}
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="relative">
                      {i < recentActivity.length - 1 && (
                        <div className="absolute top-10 bottom-0 left-4 w-0.5 bg-white/10 -z-10"></div>
                      )}

                      <div className="flex gap-4 group">
                        <div className="relative flex-shrink-0">
                          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 animate-pulse-slow blur-sm"></div>
                          <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center relative">
                            {activity.icon}
                          </div>
                        </div>

                        <div className="flex-1 bg-white/5 hover:bg-white/10 transition-colors duration-200 p-4 rounded-lg border border-white/5">
                          <p className="text-white group-hover:text-purple-200 transition-colors">
                            {activity.title}
                          </p>
                          <p className="text-sm text-white/50 mt-1">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Animated call to action */}
              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <Link href="/listings">
                  <Button
                    variant="outline"
                    className="bg-white/10 hover:bg-white/20 border-white/10 text-white"
                  >
                    Explore Marketplace
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </motion.div>
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.section>
        </div>

        {/* Performance Insights (Collapsed by default on mobile) */}
        <motion.section
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="backdrop-blur-md bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border border-white/10 rounded-xl p-6 shadow-xl overflow-hidden relative">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-blue-500/30 to-indigo-500/30 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">
                  Performance Insights
                </h2>
                <motion.div
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.5, type: 'spring' }}
                >
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white/70 hover:text-white rounded-full size-8 p-0"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </motion.div>
              </div>

              <p className="text-white/70">
                Your listings are performing 15% better than last month. Keep it
                up!
              </p>

              {/* Insight cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs text-white/50">Most Viewed</p>
                      <p className="text-white font-medium mt-1">
                        Vintage Camera
                      </p>
                    </div>
                    <div className="text-emerald-400 text-xs flex items-center">
                      +32% <ArrowUpRight className="h-3 w-3 ml-1" />
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs text-white/50">Most Messages</p>
                      <p className="text-white font-medium mt-1">
                        Leather Jacket
                      </p>
                    </div>
                    <div className="text-emerald-400 text-xs flex items-center">
                      +18% <ArrowUpRight className="h-3 w-3 ml-1" />
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs text-white/50">Trending Category</p>
                      <p className="text-white font-medium mt-1">Electronics</p>
                    </div>
                    <div className="text-amber-400 text-xs flex items-center">
                      Popular <Star className="h-3 w-3 ml-1 fill-amber-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  )
}

export default Dashboard
