'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  BadgeDollarSign,
  BarChart3,
  Calendar,
  CreditCard,
  DollarSign,
  LineChart,
  PieChart,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react'
import Link from 'next/link'

// Animation variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.5 },
  }),
}

const SalesAnalytics = () => {
  // Mock data for demonstration
  const salesData = [65, 45, 75, 60, 80, 70, 90, 78, 85, 95, 88, 100]
  const monthLabels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  // Calculate total revenue
  const totalRevenue = salesData
    .reduce((sum, value) => sum + value * 150, 0)
    .toLocaleString()

  // Calculate average transaction value
  const avgTransaction = (
    salesData.reduce((sum, value) => sum + value * 150, 0) /
      salesData.reduce((sum, value) => sum + value, 0) || 0
  ).toFixed(2)

  // Generate chart bars dynamically
  const maxValue = Math.max(...salesData)

  return (
    <div className="min-h-screen w-full pb-20">
      {/* Background decoration elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-40 -left-20 w-72 h-72 bg-gradient-to-br from-amber-600/10 to-yellow-600/10 rounded-full blur-3xl"
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
          className="absolute bottom-40 right-20 w-96 h-96 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-full blur-3xl"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent">
                Sales Analytics
              </h1>
              <p className="text-white/70 mt-1">
                Track your marketplace performance and revenue metrics
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="bg-white/10 hover:bg-white/20 border-white/20 text-white"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Last 30 Days
              </Button>
              <Button className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white border-0">
                <ArrowUpRight className="mr-2 h-4 w-4" />
                Export Report
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: 'Total Revenue',
              value: `$${totalRevenue}`,
              icon: DollarSign,
              change: '+12.5%',
              positive: true,
              color: 'from-emerald-500/20 to-teal-500/20',
              iconColor: 'text-emerald-300',
            },
            {
              title: 'Average Sale',
              value: `$${avgTransaction}`,
              icon: BadgeDollarSign,
              change: '+5.2%',
              positive: true,
              color: 'from-blue-500/20 to-cyan-500/20',
              iconColor: 'text-blue-300',
            },
            {
              title: 'Active Listings',
              value: '142',
              icon: BarChart3,
              change: '-2.4%',
              positive: false,
              color: 'from-violet-500/20 to-purple-500/20',
              iconColor: 'text-violet-300',
            },
            {
              title: 'Total Sold',
              value: '384',
              icon: TrendingUp,
              change: '+18.7%',
              positive: true,
              color: 'from-amber-500/20 to-yellow-500/20',
              iconColor: 'text-amber-300',
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.title}
              custom={i * 0.1}
              variants={fadeIn}
              initial="initial"
              animate="animate"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-5 shadow-lg"
            >
              <div className="flex justify-between">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                >
                  <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
                <div
                  className={`text-xs px-2 py-1 rounded-full flex items-center ${stat.positive ? 'text-emerald-300 bg-emerald-500/20' : 'text-rose-300 bg-rose-500/20'}`}
                >
                  {stat.change}
                  <ArrowUpRight
                    className={`h-3 w-3 ml-1 ${!stat.positive && 'rotate-90'}`}
                  />
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mt-3 text-white">
                {stat.value}
              </h3>
              <p className="text-white/60 text-sm">{stat.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Sales Chart Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 shadow-xl overflow-hidden relative">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-full blur-3xl"></div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <div>
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <LineChart className="mr-2 h-5 w-5 text-amber-300" />
                  Sales Performance
                </h2>
                <p className="text-white/60">
                  Monthly revenue from marketplace sales
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-amber-400 mr-2"></div>
                  <span className="text-sm text-white/70">This Year</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-white/30 mr-2"></div>
                  <span className="text-sm text-white/70">Last Year</span>
                </div>
              </div>
            </div>

            {/* Chart Container */}
            <div className="h-80 relative">
              {/* X Axis Labels */}
              <div className="flex justify-between absolute bottom-0 left-0 right-0 border-t border-white/10 pt-2">
                {monthLabels.map((month) => (
                  <div
                    key={month}
                    className="text-xs text-white/60 text-center w-12"
                  >
                    {month}
                  </div>
                ))}
              </div>

              {/* Y Axis Grid Lines */}
              {[0, 25, 50, 75, 100].map((value, i) => (
                <div
                  key={value}
                  className="absolute w-full border-t border-white/5"
                  style={{ bottom: `${value}%`, height: '1px' }}
                >
                  <span className="absolute -top-2 -left-10 text-xs text-white/40">
                    ${value * 150}
                  </span>
                </div>
              ))}

              {/* Bars */}
              <div className="absolute bottom-8 left-0 right-0 flex justify-between items-end h-[calc(100%-2rem)]">
                {salesData.map((value, index) => (
                  <motion.div
                    key={index}
                    className="w-12 mx-auto relative group"
                    initial={{ height: 0 }}
                    animate={{ height: `${(value / maxValue) * 100}%` }}
                    transition={{ duration: 1, delay: 0.1 * index }}
                  >
                    <div className="absolute inset-x-1.5 bottom-0 top-0 bg-gradient-to-t from-amber-500 to-yellow-400 rounded-t-md opacity-80 group-hover:opacity-100 transition-opacity"></div>

                    {/* Tooltip */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      ${(value * 150).toLocaleString()}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Two Column Layout for Additional Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Category Breakdown */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 shadow-xl h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white flex items-center">
                  <PieChart className="mr-2 h-5 w-5 text-pink-300" />
                  Top Categories
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/60 hover:text-white"
                >
                  View All
                </Button>
              </div>

              {/* Category Bars */}
              <div className="space-y-5">
                {[
                  {
                    name: 'Electronics',
                    value: 42,
                    percentage: 42,
                    color: 'from-blue-500 to-cyan-500',
                  },
                  {
                    name: 'Fashion',
                    value: 28,
                    percentage: 28,
                    color: 'from-pink-500 to-rose-500',
                  },
                  {
                    name: 'Home & Garden',
                    value: 15,
                    percentage: 15,
                    color: 'from-emerald-500 to-teal-500',
                  },
                  {
                    name: 'Sports',
                    value: 8,
                    percentage: 8,
                    color: 'from-amber-500 to-yellow-500',
                  },
                  {
                    name: 'Other',
                    value: 7,
                    percentage: 7,
                    color: 'from-purple-500 to-indigo-500',
                  },
                ].map((category, i) => (
                  <div key={category.name} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/90">{category.name}</span>
                      <span className="text-white/70">
                        ${(category.value * 150).toLocaleString()}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${category.percentage}%` }}
                        transition={{ duration: 1, delay: 0.1 * i }}
                      />
                    </div>
                    <div className="text-xs text-white/50 text-right">
                      {category.percentage}% of sales
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Recent Sales & Top Performers */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 shadow-xl h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white flex items-center">
                  <CreditCard className="mr-2 h-5 w-5 text-emerald-300" />
                  Recent Transactions
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/60 hover:text-white"
                >
                  View All
                </Button>
              </div>

              <div className="space-y-4">
                {[
                  {
                    item: 'Vintage Camera Collection',
                    buyer: 'Alex Morgan',
                    date: '2h ago',
                    price: 349,
                    image: 'https://via.placeholder.com/40',
                  },
                  {
                    item: 'Mechanical Keyboard',
                    buyer: 'Taylor Swift',
                    date: '5h ago',
                    price: 129,
                    image: 'https://via.placeholder.com/40',
                  },
                  {
                    item: 'Designer Sunglasses',
                    buyer: 'Jamie Richards',
                    date: 'Yesterday',
                    price: 99,
                    image: 'https://via.placeholder.com/40',
                  },
                  {
                    item: 'Limited Edition Sneakers',
                    buyer: 'Chris Johnson',
                    date: '2 days ago',
                    price: 199,
                    image: 'https://via.placeholder.com/40',
                  },
                ].map((transaction, i) => (
                  <motion.div
                    key={transaction.item}
                    custom={i * 0.1}
                    variants={fadeIn}
                    initial="initial"
                    animate="animate"
                    whileHover={{ x: 5 }}
                    className="bg-white/5 hover:bg-white/10 transition-colors p-4 rounded-lg border border-white/10"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/20 to-yellow-500/20 overflow-hidden flex-shrink-0 flex items-center justify-center">
                          <img
                            src={transaction.image}
                            alt={transaction.item}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-white">
                            {transaction.item}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center">
                              <Users className="h-3 w-3 text-white/40 mr-1" />
                              <span className="text-xs text-white/60">
                                {transaction.buyer}
                              </span>
                            </div>
                            <span className="text-xs text-white/40">•</span>
                            <span className="text-xs text-white/60">
                              {transaction.date}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="text-sm font-medium text-amber-300">
                        ${transaction.price}
                      </div>
                    </div>
                  </motion.div>
                ))}

                <Link href="/dashboard/user/sales-history">
                  <Button
                    variant="ghost"
                    className="w-full mt-2 border border-white/10 bg-white/5 hover:bg-white/10 text-white"
                  >
                    View Full History
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Insights and Recommendations */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="backdrop-blur-xl bg-gradient-to-br from-amber-900/20 to-yellow-900/20 border border-white/10 rounded-xl p-6 shadow-xl overflow-hidden relative">
            <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-gradient-to-br from-yellow-500/30 to-amber-500/30 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-lg bg-gradient-to-br from-amber-500/20 to-yellow-500/20 mr-4">
                  <Star className="h-6 w-6 text-amber-300 fill-amber-300" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Sales Insights
                  </h2>
                  <p className="text-white/60">
                    AI-powered recommendations to boost your sales
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  {
                    title: 'Optimize Your Pricing',
                    description:
                      'Items in Electronics category priced 5-10% below market average sell 3x faster.',
                    color: 'from-blue-500/20 to-cyan-500/20',
                  },
                  {
                    title: 'Add More Photos',
                    description:
                      'Listings with 5+ quality photos get 70% more views and 45% more inquiries.',
                    color: 'from-pink-500/20 to-rose-500/20',
                  },
                  {
                    title: 'Seasonal Trend Alert',
                    description:
                      'Outdoor equipment sales are trending up 35% as summer approaches.',
                    color: 'from-amber-500/20 to-yellow-500/20',
                  },
                ].map((insight, i) => (
                  <motion.div
                    key={insight.title}
                    custom={i * 0.1}
                    variants={fadeIn}
                    initial="initial"
                    animate="animate"
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className={`bg-gradient-to-br ${insight.color} backdrop-blur-md p-5 rounded-xl border border-white/10`}
                  >
                    <h3 className="text-white font-medium mb-2">
                      {insight.title}
                    </h3>
                    <p className="text-white/70 text-sm">
                      {insight.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default SalesAnalytics
