'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUser } from '@/context/UserContext'
import { getCurrentUser } from '@/services/AuthService'
import { getSellsHistory } from '@/services/history'
import { Sale } from '@/types/sales/sales'
import { format } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion'
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Package,
  RefreshCw,
  Search,
  ShoppingBag,
  TrendingUp,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import 'react-loading-skeleton/dist/skeleton.css'

export default function SalesHistoryPage() {
  const [salesData, setSalesData] = useState<Sale[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const { user } = useUser()
  // Derived states
  const filteredSales = salesData.filter((sale) => {
    const matchesSearch =
      searchTerm === '' ||
      sale.itemID?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.buyerID?.name?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === 'all' || sale.status === filterStatus

    return matchesSearch && matchesStatus
  })

  const totalRevenue = salesData.reduce(
    (sum, sale) => sum + (sale.itemID?.price || 0),
    0,
  )
  const pendingCount = salesData.filter(
    (sale) => sale.status === 'pending',
  ).length
  const completedCount = salesData.filter(
    (sale) => sale.status === 'completed',
  ).length

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { userId } = await getCurrentUser()
        const salesResponse = await getSellsHistory(userId)

        if (salesResponse && salesResponse.data && salesResponse.data.result) {
          setSalesData(salesResponse.data.result)
          console.log('salesResponse', salesResponse.data.result)
        } else {
          setError('Failed to fetch sales data')
        }
      } catch (error) {
        console.error('Error fetching sales history:', error)
        setError('An error occurred while fetching your sales history')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Loading state with nice animation
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-violet-900 p-8 flex items-center justify-center">
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 shadow-2xl p-8 max-w-md w-full">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="relative flex justify-center items-center">
              <div
                className="w-24 h-24 rounded-full border-4 border-transparent 
                    border-t-purple-500 border-r-pink-500 border-b-blue-500
                    animate-spin"
              ></div>
              <div
                className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/70 to-pink-600/70 
                    blur-sm animate-pulse"
              ></div>
              <DollarSign className="absolute text-white h-8 w-8" />
            </div>

            <p className="text-xl font-medium text-white text-center">
              <span className="inline-block animate-pulse">
                Loading your sales history
              </span>
              <span className="inline-block animate-bounce mx-0.5">.</span>
              <span
                className="inline-block animate-bounce mx-0.5"
                style={{ animationDelay: '0.2s' }}
              >
                .
              </span>
              <span
                className="inline-block animate-bounce mx-0.5"
                style={{ animationDelay: '0.4s' }}
              >
                .
              </span>
            </p>

            <div className="w-full space-y-3">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-16 bg-white/5 rounded-xl animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-violet-900 p-8 flex items-center justify-center">
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 shadow-2xl p-8 max-w-md w-full text-center">
          <div className="mb-6 flex items-center justify-center">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            Failed to Load Sales History
          </h3>
          <p className="text-white/70 mb-6">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  // Empty state
  if (salesData.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-violet-900 p-8 flex items-center justify-center">
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 shadow-2xl p-8 max-w-md w-full text-center">
          <div className="mb-6 flex items-center justify-center">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
              <ShoppingBag className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            No Sales History Yet
          </h3>
          <p className="text-white/70 mb-6">
            You haven't sold any items yet. When you do, they will appear here.
          </p>
          <Link href="/dashboard/user/listings/create-listing">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
              Create a Listing
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-violet-900 p-4 md:p-8">
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
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-100 bg-clip-text text-transparent">
            Sales History
          </h1>
          <p className="text-purple-200/80 mt-2">
            Track your sales, revenue, and buyer information
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="backdrop-blur-md bg-gradient-to-br from-purple-500/20 to-pink-600/20 p-5 rounded-xl border border-white/10 shadow-lg"
          >
            <div className="flex items-center mb-2">
              <div className="p-2 bg-white/10 rounded-lg mr-3">
                <DollarSign className="h-5 w-5 text-purple-300" />
              </div>
              <h3 className="text-white/70 font-medium">Total Revenue</h3>
            </div>
            <p className="text-3xl font-bold text-white">
              ${totalRevenue.toFixed(2)}
            </p>
            <div className="mt-2 text-sm text-white/60 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>From {salesData.length} sales</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="backdrop-blur-md bg-gradient-to-br from-blue-500/20 to-cyan-600/20 p-5 rounded-xl border border-white/10 shadow-lg"
          >
            <div className="flex items-center mb-2">
              <div className="p-2 bg-white/10 rounded-lg mr-3">
                <Package className="h-5 w-5 text-blue-300" />
              </div>
              <h3 className="text-white/70 font-medium">Total Sales</h3>
            </div>
            <p className="text-3xl font-bold text-white">{salesData.length}</p>
            <div className="mt-2 text-sm text-white/60 flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              <span>All time</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="backdrop-blur-md bg-gradient-to-br from-green-500/20 to-emerald-600/20 p-5 rounded-xl border border-white/10 shadow-lg"
          >
            <div className="flex items-center mb-2">
              <div className="p-2 bg-white/10 rounded-lg mr-3">
                <CheckCircle className="h-5 w-5 text-green-300" />
              </div>
              <h3 className="text-white/70 font-medium">Completed</h3>
            </div>
            <p className="text-3xl font-bold text-white">{completedCount}</p>
            <div className="mt-2 text-sm text-white/60 flex items-center">
              <span>
                {Math.round((completedCount / salesData.length) * 100)}% of
                total
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="backdrop-blur-md bg-gradient-to-br from-amber-500/20 to-orange-600/20 p-5 rounded-xl border border-white/10 shadow-lg"
          >
            <div className="flex items-center mb-2">
              <div className="p-2 bg-white/10 rounded-lg mr-3">
                <Clock className="h-5 w-5 text-amber-300" />
              </div>
              <h3 className="text-white/70 font-medium">Pending</h3>
            </div>
            <p className="text-3xl font-bold text-white">{pendingCount}</p>
            <div className="mt-2 text-sm text-white/60 flex items-center">
              <span>Awaiting completion</span>
            </div>
          </motion.div>
        </div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mb-8"
        >
          <div className="backdrop-blur-md bg-white/5 p-4 rounded-xl border border-white/10 shadow-lg">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                <Input
                  placeholder="Search by product name or buyer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30"
                />
              </div>

              <div className="flex space-x-2 md:w-auto w-full">
                <Button
                  variant={filterStatus === 'all' ? 'default' : 'outline'}
                  className={
                    filterStatus === 'all'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0'
                      : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                  }
                  onClick={() => setFilterStatus('all')}
                >
                  All
                </Button>
                <Button
                  variant={filterStatus === 'completed' ? 'default' : 'outline'}
                  className={
                    filterStatus === 'completed'
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0'
                      : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                  }
                  onClick={() => setFilterStatus('completed')}
                >
                  Completed
                </Button>
                <Button
                  variant={filterStatus === 'pending' ? 'default' : 'outline'}
                  className={
                    filterStatus === 'pending'
                      ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white border-0'
                      : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                  }
                  onClick={() => setFilterStatus('pending')}
                >
                  Pending
                </Button>
                <Button
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  onClick={() => {
                    setSearchTerm('')
                    setFilterStatus('all')
                  }}
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sales List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="backdrop-blur-md bg-white/5 p-0.5 rounded-xl border border-white/10 shadow-lg overflow-hidden"
        >
          <div className="bg-black/20 rounded-xl overflow-hidden">
            {filteredSales.length > 0 ? (
              <div className="divide-y divide-white/10">
                <AnimatePresence>
                  {filteredSales.map((sale, index) => (
                    <motion.div
                      key={sale._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      className="p-4 md:p-6 hover:bg-white/5 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                        {/* Product image */}
                        <div className="w-20 h-20 md:w-16 md:h-16 relative rounded-lg overflow-hidden bg-white/10 flex-shrink-0">
                          {sale.itemID?.images?.[0] ? (
                            <Image
                              src={sale.itemID.images[0]}
                              alt={sale.itemID.title || 'Product'}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800">
                              <Package className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                        </div>

                        {/* Sale info */}
                        <div className="flex-grow">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-white">
                                {sale.itemID?.title || 'Unnamed Product'}
                              </h3>
                              <div className="flex flex-wrap gap-2 items-center mt-1">
                                <Badge
                                  className={`${
                                    sale.status === 'completed'
                                      ? 'bg-green-500/20 text-green-300 hover:bg-green-500/30'
                                      : 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30'
                                  }`}
                                >
                                  {sale.status}
                                </Badge>
                                <span className="text-sm text-white/60">
                                  {sale.createdAt &&
                                    format(
                                      new Date(sale.createdAt),
                                      'MMM dd, yyyy',
                                    )}
                                </span>
                              </div>
                            </div>

                            <div className="mt-2 md:mt-0 md:text-right">
                              <div className="text-xl font-bold text-white">
                                ${sale.itemID?.price || '0.00'}
                              </div>
                              <div className="text-sm text-white/60">
                                Buyer: {sale.buyerID?.name || 'Unknown'}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action button */}
                        <div className="md:self-center mt-3 md:mt-0 w-full md:w-auto">
                          <Link href={`/product/${sale.itemID?._id}`}>
                            <Button
                              variant="outline"
                              className="bg-white/10 border-white/20 text-white hover:bg-white/20 w-full md:w-auto"
                            >
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="p-8 text-center">
                <div className="inline-flex items-center justify-center p-4 bg-white/5 rounded-full mb-4">
                  <Search className="h-6 w-6 text-white/40" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">
                  No matching sales found
                </h3>
                <p className="text-white/60 max-w-md mx-auto">
                  Try adjusting your search or filter criteria to find what
                  you're looking for.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
