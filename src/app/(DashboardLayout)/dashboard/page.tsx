'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useUser } from '@/context/UserContext'
import { useTheme } from 'next-themes'
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
  LucideIcon,
  LineChart,
  Users,
  TrendingUp,
  CircleUser,
  Bell,
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

// Hover card animation
const hoverCard = {
  rest: {
    scale: 1,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
  hover: {
    scale: 1.03,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
}

interface StatCard {
  label: string
  value: number
  icon: React.ReactNode
  color: string
  lightColor: string
  bgLight: string
  trend?: number
  chartData?: number[]
}

interface QuickAction {
  title: string
  path: string
  description: string
  icon: React.ReactNode
  color: string
  lightColor: string
  bgLight: string
}

interface Activity {
  id: number
  type: string
  title: string
  time: string
  icon: React.ReactNode
  color: string
  lightColor: string
}

const Dashboard = () => {
  const { user } = useUser()
  const { name = '' } = user?.data || {}
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()
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
  
  const isDark = theme === 'dark'

  // Stat cards configuration
  const statCards: StatCard[] = [
    {
      label: 'Profile Views',
      value: stats.views,
      icon: <BarChart3 className={`h-5 w-5 ${isDark ? 'text-purple-300' : 'text-purple-600'}`} />,
      color: 'from-purple-500/20 to-pink-500/20',
      lightColor: 'text-purple-700',
      bgLight: 'bg-purple-50',
      trend: 12,
      chartData: [5, 10, 8, 15, 12, 16, 20]
    },
    {
      label: 'Active Listings',
      value: stats.listings,
      icon: <ShoppingBag className={`h-5 w-5 ${isDark ? 'text-blue-300' : 'text-blue-600'}`} />,
      color: 'from-blue-500/20 to-cyan-500/20',
      lightColor: 'text-blue-700',
      bgLight: 'bg-blue-50',
      trend: 8,
      chartData: [12, 15, 10, 9, 12, 10, 14]
    },
    {
      label: 'Messages',
      value: stats.messages,
      icon: <Gift className={`h-5 w-5 ${isDark ? 'text-amber-300' : 'text-amber-600'}`} />,
      color: 'from-amber-500/20 to-orange-500/20',
      lightColor: 'text-amber-700',
      bgLight: 'bg-amber-50',
      trend: -3,
      chartData: [8, 12, 10, 9, 7, 5, 8]
    },
    {
      label: 'Favorites',
      value: stats.favorites,
      icon: <Star className={`h-5 w-5 ${isDark ? 'text-pink-300' : 'text-pink-600'}`} />,
      color: 'from-pink-500/20 to-rose-500/20',
      lightColor: 'text-pink-700',
      bgLight: 'bg-pink-50',
      trend: 15,
      chartData: [10, 12, 15, 18, 20, 25, 32]
    },
    {
      label: 'Completed Sales',
      value: stats.sales,
      icon: <Tag className={`h-5 w-5 ${isDark ? 'text-emerald-300' : 'text-emerald-600'}`} />,
      color: 'from-emerald-500/20 to-teal-500/20',
      lightColor: 'text-emerald-700',
      bgLight: 'bg-emerald-50',
      trend: 4,
      chartData: [2, 3, 5, 4, 6, 7, 8]
    },
  ]

  // Quick actions
  const quickActions: QuickAction[] = [
    {
      title: 'Create Listing',
      path: '/dashboard/user/listings/create-listing',
      description: 'Add a new item to marketplace',
      icon: <Package className="h-6 w-6" />,
      color: 'from-purple-500 to-pink-500',
      lightColor: 'text-purple-700',
      bgLight: 'from-purple-50 to-pink-50',
    },
    {
      title: 'My Listings',
      path: '/dashboard/user/listings',
      description: 'Manage your posted items',
      icon: <ShoppingBag className="h-6 w-6" />,
      color: 'from-blue-500 to-cyan-500',
      lightColor: 'text-blue-700',
      bgLight: 'from-blue-50 to-cyan-50',
    },
    {
      title: 'Orders',
      path: '/dashboard/orders',
      description: 'View purchase history',
      icon: <Truck className="h-6 w-6" />,
      color: 'from-emerald-500 to-green-500',
      lightColor: 'text-emerald-700',
      bgLight: 'from-emerald-50 to-green-50',
    },
  ]

  // Recent activity data
  const recentActivity: Activity[] = [
    {
      id: 1,
      type: 'message',
      title: 'New message about "Vintage Camera"',
      time: '2 hours ago',
      icon: <Clock className={`h-4 w-4 ${isDark ? 'text-blue-300' : 'text-blue-600'}`} />,
      color: 'from-blue-500/20 to-cyan-500/20',
      lightColor: 'text-blue-600',
    },
    {
      id: 2,
      type: 'view',
      title: 'Your "Leather Jacket" got 15 new views',
      time: 'Today',
      icon: <Star className={`h-4 w-4 ${isDark ? 'text-amber-300' : 'text-amber-600'}`} />,
      color: 'from-amber-500/20 to-orange-500/20',
      lightColor: 'text-amber-600',
    },
    {
      id: 3,
      type: 'offer',
      title: 'New offer on "Mechanical Keyboard"',
      time: 'Yesterday',
      icon: <DollarSign className={`h-4 w-4 ${isDark ? 'text-green-300' : 'text-green-600'}`} />,
      color: 'from-green-500/20 to-emerald-500/20',
      lightColor: 'text-green-600',
    },
    {
      id: 4,
      type: 'sale',
      title: 'You sold "Mountain Bike"',
      time: '3 days ago',
      icon: <Tag className={`h-4 w-4 ${isDark ? 'text-pink-300' : 'text-pink-600'}`} />,
      color: 'from-pink-500/20 to-rose-500/20',
      lightColor: 'text-pink-600',
    },
  ]

  // Notification data
  const notifications = [
    { id: 1, text: "New feature available: Bulk listing uploads", time: "Just now" },
    { id: 2, text: "Marketplace trends report is ready to view", time: "2 hours ago" },
    { id: 3, text: "Your account has been verified", time: "1 day ago" },
  ]

  return (
    <div className={`relative w-full min-h-screen pb-20 ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Background decoration elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {isDark ? (
          <>
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
          </>
        ) : (
          <>
            <motion.div
              className="absolute top-20 -right-20 w-64 h-64 bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.4, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
            <motion.div
              className="absolute bottom-40 left-20 w-80 h-80 bg-gradient-to-br from-blue-300/20 to-cyan-300/20 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: 2,
              }}
            />
            <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-gradient-to-br from-amber-300/10 to-orange-300/10 rounded-full blur-3xl"></div>
          </>
        )}
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Welcome Section */}
        <motion.section
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={`${
            isDark 
              ? 'backdrop-blur-xl bg-white/5 border-white/10' 
              : 'bg-white border-gray-200 shadow-sm'
            } rounded-2xl border p-8 overflow-hidden relative shadow-lg`}>
            {/* Decorative gradient orbs */}
            <div className={`absolute -bottom-8 right-8 w-32 h-32 ${
              isDark 
                ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20'
                : 'bg-gradient-to-br from-purple-200/30 to-pink-200/30'
              } rounded-full blur-xl`}></div>
            <div className={`absolute -top-8 left-1/2 w-24 h-24 ${
              isDark 
                ? 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20' 
                : 'bg-gradient-to-br from-blue-200/30 to-cyan-200/30'
              } rounded-full blur-xl`}></div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
              <div className="flex flex-col md:flex-row items-center gap-5">
                <div className="relative">
                  <div className={`absolute inset-0 rounded-full ${
                    isDark 
                      ? 'bg-gradient-to-r from-purple-600/50 to-pink-600/50' 
                      : 'bg-gradient-to-r from-indigo-400/40 to-violet-400/40'
                    } animate-pulse-slow blur-md`}></div>
                  <Avatar className={`w-20 h-20 ${
                    isDark 
                      ? 'border-2 border-white/20' 
                      : 'border-2 border-indigo-100'
                    } relative`}>
                    <AvatarImage src="" />
                    <AvatarFallback className={`${
                      isDark 
                        ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white' 
                        : 'bg-gradient-to-br from-indigo-500 to-violet-500 text-white'
                      } text-xl font-bold`}>
                      {name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="text-center md:text-left">
                  <motion.h1
                    className={`text-2xl md:text-3xl font-bold mb-1 ${
                      isDark 
                        ? 'bg-gradient-to-r from-white via-purple-200 to-pink-100 bg-clip-text text-transparent' 
                        : 'bg-gradient-to-r from-indigo-700 via-purple-700 to-violet-800 bg-clip-text text-transparent'
                      }`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    Welcome{name ? `, ${name.split(' ')[0]}` : ''}!
                  </motion.h1>
                  <motion.p
                    className={isDark ? 'text-purple-100/80' : 'text-indigo-600'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    Manage your listings and track your marketplace activity
                  </motion.p>
                </div>
              </div>

              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                {/* Notification bell */}
                <div className="relative">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className={`rounded-full ${
                      isDark 
                        ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20' 
                        : 'bg-white border-gray-200 hover:bg-gray-50'
                    }`}>
                    <Bell className={isDark ? "h-5 w-5 text-white" : "h-5 w-5 text-gray-700"} />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">3</span>
                  </Button>
                </div>
                
                <Link href="/dashboard/user/listings/create-listing">
                  <Button className={`relative overflow-hidden ${
                    isDark 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md shadow-purple-500/20 hover:shadow-lg hover:shadow-purple-500/30 border-0' 
                      : 'bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white shadow-md shadow-indigo-300/30 hover:shadow-lg hover:shadow-indigo-400/30 border-0'
                    } transition-all duration-300`}>
                    <span className={`absolute inset-0 w-full h-full bg-gradient-to-r ${
                      isDark 
                        ? 'from-purple-600 to-pink-600'
                        : 'from-indigo-500 to-violet-600'
                      } animate-gradient-x [animation-duration:3s]`}></span>
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
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className={`${
                isDark 
                  ? 'bg-white/5 backdrop-blur-md border border-white/10' 
                  : `bg-white border border-gray-100 ${stat.bgLight}`
              } rounded-xl p-4 shadow-lg`}
            >
              <div className="flex justify-between items-start mb-3">
                <div
                  className={`w-10 h-10 rounded-full ${
                    isDark 
                      ? `bg-gradient-to-br ${stat.color}` 
                      : `bg-gradient-to-br from-${stat.lightColor}/10 to-${stat.lightColor}/20`
                  } flex items-center justify-center`}
                >
                  {stat.icon}
                </div>
                {stat.trend !== undefined && (
                  <span className={`text-xs font-medium px-2 py-1 rounded-full flex items-center ${
                    stat.trend > 0
                      ? isDark ? 'text-emerald-300 bg-emerald-900/30' : 'text-emerald-700 bg-emerald-50'
                      : isDark ? 'text-rose-300 bg-rose-900/30' : 'text-rose-700 bg-rose-50'
                  }`}>
                    {stat.trend > 0 ? '+' : ''}{stat.trend}%
                    {stat.trend > 0 ? (
                      <TrendingUp className="ml-1 h-3 w-3" />
                    ) : (
                      <motion.div 
                        animate={{ rotate: 180 }}
                        transition={{ duration: 0 }}
                      >
                        <TrendingUp className="ml-1 h-3 w-3" />
                      </motion.div>
                    )}
                  </span>
                )}
              </div>
              <p className={isDark ? 'text-white/70 text-sm mb-1' : `${stat.lightColor} text-sm mb-1`}>{stat.label}</p>
              <p className={isDark ? 'text-2xl font-bold text-white' : 'text-2xl font-bold text-gray-900'}>{stat.value}</p>
              
              {/* Mini Chart */}
              {stat.chartData && (
                <div className="mt-2 pt-3 border-t border-dashed border-gray-700/20">
                  <div className="flex items-end h-8 gap-[2px]">
                    {stat.chartData.map((value, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ height: 0 }}
                        animate={{ height: `${(value/Math.max(...stat.chartData || []))*100}%` }}
                        transition={{ delay: 0.5 + (idx * 0.05), duration: 0.5 }}
                        className={`flex-1 rounded-sm ${
                          isDark 
                            ? idx === (stat.chartData || []).length - 1 
                              ? 'bg-white' 
                              : 'bg-white/30' 
                            : idx === (stat.chartData || []).length - 1
                              ? stat.lightColor.replace('text-', 'bg-')
                              : stat.lightColor.replace('text-', 'bg-') + '/40'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.section>

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Quick Actions */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className={`${
              isDark 
                ? 'backdrop-blur-md bg-white/5 border border-white/10' 
                : 'bg-white border border-gray-100'
              } rounded-xl p-6 shadow-xl h-full`}>
              <h2 className={`text-xl font-semibold mb-5 flex items-center ${isDark ? 'text-white' : 'text-gray-800'}`}>
                <span className="mr-2">Quick Actions</span>
                <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-purple-400' : 'bg-indigo-400'} animate-pulse`}></div>
              </h2>

              <div className="space-y-3">
                {quickActions.map((action, i) => (
                  <motion.div
                    key={action.title}
                    custom={i}
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    whileTap={{ scale: 0.98 }}
                    whileHover={isDark ? { x: 5 } : { y: -3, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link href={action.path} className="block">
                      <div className={`flex items-center gap-4 ${
                        isDark 
                          ? 'bg-white/5 hover:bg-white/10 border border-white/10' 
                          : 'bg-gradient-to-r border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md'
                        } ${action.bgLight} transition-all duration-200 p-4 rounded-lg group`}>
                        <div
                          className={`p-3 rounded-lg ${
                            isDark 
                              ? `bg-gradient-to-br ${action.color} shadow-lg` 
                              : `bg-white shadow-md`
                          }`}
                        >
                          <div className={isDark ? 'text-white' : action.lightColor}>
                            {action.icon}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-medium ${
                            isDark 
                              ? 'text-white group-hover:text-purple-200' 
                              : 'text-gray-800 group-hover:text-indigo-700'
                            } transition-colors`}>
                            {action.title}
                          </h3>
                          <p className={`text-sm ${
                            isDark ? 'text-white/60' : 'text-gray-600'
                          }`}>
                            {action.description}
                          </p>
                        </div>
                        <ChevronRight className={`h-5 w-5 ${
                          isDark 
                            ? 'text-white/40 group-hover:text-white/80' 
                            : 'text-gray-400 group-hover:text-indigo-600'
                          } transform group-hover:translate-x-1 transition-all`} />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              {/* Notifications section */}
              <div className="mt-8 pt-6 border-t border-dashed border-gray-700/20">
                <h3 className={`text-lg font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  Recent Notifications
                </h3>
                
                <div className="space-y-3">
                  {notifications.map((notification, i) => (
                    <motion.div 
                      key={notification.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + (i * 0.1) }}
                      className={`${
                        isDark 
                          ? 'bg-white/5 hover:bg-white/10' 
                          : 'bg-gray-50 hover:bg-gray-100'
                        } rounded-lg p-3 cursor-pointer transition-colors`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`${
                          isDark 
                            ? 'bg-blue-500/20' 
                            : 'bg-blue-100'
                          } rounded-full p-2 mt-0.5`}>
                          <Bell className={`h-4 w-4 ${isDark ? 'text-blue-300' : 'text-blue-600'}`} />
                        </div>
                        <div className="flex-1">
                          <p className={isDark ? 'text-white' : 'text-gray-800'}>
                            {notification.text}
                          </p>
                          <span className={`text-xs ${
                            isDark ? 'text-gray-400' : 'text-gray-500'
                          }`}>{notification.time}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-4 text-center">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={isDark ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50'}
                  >
                    View all notifications
                  </Button>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Recent Activity */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-5"
          >
            <div className={`${
              isDark 
                ? 'backdrop-blur-md bg-white/5 border border-white/10' 
                : 'bg-white border border-gray-100'
              } rounded-xl p-6 shadow-xl h-full`}>
              <h2 className={`text-xl font-semibold mb-5 flex items-center justify-between ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}>
                <span>Recent Activity</span>
                <Link href="/dashboard">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={isDark ? 'text-white/60 hover:text-white hover:bg-white/10' : 'text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50'}
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
                    whileHover={isDark ? { x: 3 } : { x: 2, y: -2 }}
                  >
                    <div className="relative">
                      {i < recentActivity.length - 1 && (
                        <div className={`absolute top-10 bottom-0 left-4 w-0.5 ${
                          isDark ? 'bg-white/10' : 'bg-gray-100'
                        } -z-10`}></div>
                      )}

                      <div className="flex gap-4 group">
                        <div className="relative flex-shrink-0">
                          <div className={`absolute inset-0 rounded-full ${
                            isDark 
                              ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30' 
                              : 'bg-gradient-to-r from-indigo-300/30 to-violet-300/30'
                            } animate-pulse-slow blur-sm`}></div>
                          <div className={`w-8 h-8 rounded-full ${
                            isDark 
                              ? 'bg-black/50 backdrop-blur-sm border border-white/20' 
                              : 'bg-white border border-gray-200 shadow-sm'
                            } flex items-center justify-center relative`}>
                            {activity.icon}
                          </div>
                        </div>

                        <div className={`flex-1 ${
                          isDark 
                            ? 'bg-white/5 hover:bg-white/10 border-white/5' 
                            : 'bg-white hover:bg-gray-50 border-gray-100 shadow-sm'
                          } transition-colors duration-200 p-4 rounded-lg border`}>
                          <p className={`${
                            isDark 
                              ? 'text-white group-hover:text-purple-200' 
                              : `text-gray-800 group-hover:${activity.lightColor}`
                            } transition-colors`}>
                            {activity.title}
                          </p>
                          <p className={`text-sm mt-1 ${
                            isDark ? 'text-white/50' : 'text-gray-500'
                          }`}>
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
                    className={isDark 
                      ? 'bg-white/10 hover:bg-white/20 border-white/10 text-white' 
                      : 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200 text-indigo-700'
                    }
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
          
          {/* Performance Insights */}
          <motion.section
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className={`${
              isDark 
                ? 'backdrop-blur-md bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border border-white/10' 
                : 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100/50'
              } rounded-xl p-6 shadow-xl overflow-hidden relative h-full`}>
              <div className={`absolute -top-24 -right-24 w-48 h-48 ${
                isDark 
                  ? 'bg-gradient-to-br from-blue-500/30 to-indigo-500/30' 
                  : 'bg-gradient-to-br from-blue-300/20 to-indigo-300/20'
                } rounded-full blur-3xl`}></div>

              <div className="relative z-10">
                <div className="flex justify-between items-center mb-4">
                  <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-indigo-900'}`}>
                    Performance Insights
                  </h2>
                  <motion.div
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                  >
                    <Button
                      size="sm"
                      variant="ghost"
                      className={`${
                        isDark 
                          ? 'text-white/70 hover:text-white hover:bg-white/10' 
                          : 'text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50'
                        } rounded-full size-8 p-0`}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </motion.div>
                </div>

                <p className={isDark ? 'text-white/70' : 'text-indigo-700'}>
                  Your listings are performing 15% better than last month. Keep it up!
                </p>
                
                {/* Performance chart */}
                <div className="mt-6">
                  <div className={`p-3 rounded-lg ${
                    isDark 
                      ? 'bg-white/5 border border-white/10' 
                      : 'bg-white border border-blue-100'
                    } shadow-sm`}>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className={`text-sm font-medium ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
                        Weekly Performance
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        isDark 
                          ? 'bg-emerald-900/30 text-emerald-300' 
                          : 'bg-emerald-50 text-emerald-700'
                        }`}>
                        +15% 
                      </span>
                    </div>
                    
                    <div className="h-32 flex items-end gap-2 pt-2">
                      {[25, 38, 28, 45, 35, 55, 60].map((height, index) => (
                        <motion.div 
                          key={index}
                          className="flex-1 flex flex-col items-center"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ delay: 0.8 + (index * 0.05), duration: 0.4 }}
                        >
                          <motion.div 
                            className={`w-full ${
                              isDark 
                                ? index === 6 
                                  ? 'bg-gradient-to-t from-blue-500 to-indigo-400' 
                                  : 'bg-white/20'
                                : index === 6
                                  ? 'bg-gradient-to-t from-blue-500 to-indigo-400' 
                                  : 'bg-indigo-200/50'
                              } rounded-t-sm`}
                            style={{ height: `${height}%` }}
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{ delay: 0.8 + (index * 0.05), duration: 0.5 }}
                          />
                          <span className={`text-[10px] mt-1 ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Insight cards */}
                <div className="grid grid-cols-1 gap-3 mt-4">
                  <motion.div 
                    className={`${
                      isDark 
                        ? 'bg-white/5 backdrop-blur-sm border border-white/10' 
                        : 'bg-white border border-blue-100'
                      } p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow`}
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className={`text-xs ${isDark ? 'text-white/50' : 'text-gray-500'}`}>Most Viewed</p>
                        <p className={`font-medium mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          Vintage Camera
                        </p>
                      </div>
                      <div className={`text-xs flex items-center ${
                        isDark ? 'text-emerald-400' : 'text-emerald-600'
                      }`}>
                        +32% <ArrowUpRight className="h-3 w-3 ml-1" />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    className={`${
                      isDark 
                        ? 'bg-white/5 backdrop-blur-sm border border-white/10' 
                        : 'bg-white border border-blue-100'
                      } p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow`}
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className={`text-xs ${isDark ? 'text-white/50' : 'text-gray-500'}`}>Trending Category</p>
                        <p className={`font-medium mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>Electronics</p>
                      </div>
                      <div className={`text-xs flex items-center ${
                        isDark ? 'text-amber-400' : 'text-amber-600'
                      }`}>
                        Popular <Star className={`h-3 w-3 ml-1 ${isDark ? 'fill-amber-400' : 'fill-amber-500'}`} />
                      </div>
                    </div>
                  </motion.div>
                  
                  <Button 
                    variant="ghost" 
                    className={`mt-2 ${
                      isDark 
                        ? 'text-white/70 hover:text-white hover:bg-white/10 border-0' 
                        : 'text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 border-0'
                    }`}
                  >
                    View detailed analytics
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.section>
        </div>

        {/* Recommended Actions Section */}
        <motion.section
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className={`${
            isDark 
              ? 'backdrop-blur-md bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-white/10' 
              : 'bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100/50'
            } rounded-xl p-6 shadow-xl`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-indigo-900'}`}>
                Recommended Actions
              </h2>
              <Button 
                variant="ghost" 
                size="sm" 
                className={isDark ? 'text-white/60 hover:text-white' : 'text-indigo-600 hover:text-indigo-800'}
              >
                Refresh
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: "Complete your profile",
                  description: "Add a profile picture and bio to increase trust",
                  icon: <CircleUser />,
                  color: isDark ? "from-green-600/20 to-emerald-600/20" : "from-green-100 to-emerald-100",
                  textColor: isDark ? "text-emerald-300" : "text-emerald-700",
                  progress: 65
                },
                {
                  title: "Verify your email",
                  description: "Confirm your email address to secure your account",
                  icon: <Star />,
                  color: isDark ? "from-amber-600/20 to-yellow-600/20" : "from-amber-100 to-yellow-100",
                  textColor: isDark ? "text-amber-300" : "text-amber-700",
                  progress: 0
                },
                {
                  title: "Review marketplace trends",
                  description: "See what's popular in your area",
                  icon: <LineChart />,
                  color: isDark ? "from-blue-600/20 to-indigo-600/20" : "from-blue-100 to-indigo-100",
                  textColor: isDark ? "text-blue-300" : "text-blue-700",
                  progress: 100
                }
              ].map((action, i) => (
                <motion.div 
                  key={action.title}
                  variants={hoverCard}
                  initial="rest"
                  whileHover="hover"
                  className={`${
                    isDark 
                      ? 'bg-white/5 border border-white/10' 
                      : 'bg-white border border-gray-100'
                    } rounded-xl p-5 shadow-sm transition-all duration-300`}
                >
                  <div className="flex gap-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${action.color}`}>
                      <div className={action.textColor}>
                        {action.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        {action.title}
                      </h3>
                      <p className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-600'} mt-1`}>
                        {action.description}
                      </p>
                      
                      {/* Progress bar */}
                      <div className={`mt-3 h-1.5 w-full rounded-full ${
                        isDark ? 'bg-white/10' : 'bg-gray-100'
                      }`}>
                        <motion.div 
                          className={`h-full rounded-full ${
                            action.progress === 100
                              ? isDark ? 'bg-green-500' : 'bg-green-500'
                              : isDark ? 'bg-blue-500' : 'bg-indigo-500'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${action.progress}%` }}
                          transition={{ delay: 1 + (i * 0.2), duration: 0.7, ease: "easeOut" }}
                        />
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className={`text-xs ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
                          {action.progress}% Complete
                        </span>
                        {action.progress < 100 && (
                          <Button 
                            size="sm" 
                            variant="link" 
                            className={`px-0 ${isDark ? 'text-blue-300' : 'text-indigo-600'}`}
                          >
                            Start
                          </Button>
                        )}
                        {action.progress === 100 && (
                          <span className={`text-xs ${
                            isDark ? 'text-emerald-400' : 'text-emerald-600'
                          }`}>
                            ✓ Complete
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  )
}

export default Dashboard