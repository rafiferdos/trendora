'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, ListFilter, Search, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

import { DataTable } from '@/components/modules/dashboard/listing/dataTable/DataTable'
import { getListings } from '@/services/listings'
import { TListing } from '@/types/listings/listing'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { getCurrentUser } from '@/services/AuthService'
import { getColumns } from '@/components/modules/dashboard/listing/columns/Columns'
import { useUser } from '@/context/UserContext'
import { getSellsHistory } from '@/services/history'
import TransactionTable, {
  TTransaction,
} from '@/components/modules/dashboard/transactionTable/TransactionTable'

export default function SalesHistoryPage() {
  const [transactionData, setTransactionData] = useState<TTransaction[]>([])
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, serError] = useState('')
  const [role, setRole] = useState('')
  const { user } = useUser()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { role, userId } = await getCurrentUser()
        const salesHistories = await getSellsHistory(userId)


        if (!salesHistories?.success) {
          return serError(salesHistories?.message)
        }

        setTransactionData(salesHistories.data?.result)
      } catch (error) {

      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-violet-900 p-8">
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 shadow-2xl p-8">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="relative flex justify-center items-center">
              <div
                className="w-20 h-20 rounded-full border-4 border-transparent 
                    border-t-pink-500 border-r-purple-500 border-b-blue-500
                    animate-spin"
              ></div>
              <div
                className="absolute w-14 h-14 rounded-full bg-gradient-to-br from-pink-500/80 to-purple-600/80 
                    blur-sm animate-pulse"
              ></div>
            </div>

            <p className="text-xl font-medium text-white">
              <span className="inline-block animate-pulse">
                Loading your listings
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

            <div className="w-full max-w-md space-y-3">
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-violet-900 p-4 md:p-8">
      {/* Background decoration elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div
          className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-pink-600/20 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: '1s' }}
        ></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 shadow-2xl p-6 md:p-8"
      >
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-100 bg-clip-text text-transparent">
              {role === 'admin' ? 'All' : 'Your'} Listings
            </h2>
          </div>

          {role === 'admin' ? (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                onClick={() => window.location.reload()}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <ListFilter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          ) : (
            <Link href="/dashboard/user/listings/create-listing">
              <Button className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md shadow-purple-500/20 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 border-0">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 animate-gradient-x [animation-duration:3s]"></span>
                <span className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-[-20deg] transform -translate-x-full group-hover:duration-1000 duration-1000 transition-transform group-hover:translate-x-[200%]"></span>
                <Plus className="mr-2 h-4 w-4 relative z-10" />
                <span className="relative z-10">Create New Listing</span>
              </Button>
            </Link>
          )}
        </div>

        {/* Stats Cards */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="backdrop-blur-md bg-gradient-to-br from-pink-500/20 to-purple-600/20 p-4 rounded-xl border border-white/10 shadow-lg"
          >
            <h3 className="text-white/70 text-sm font-medium mb-1">
              Total Listings
            </h3>
            <p className="text-3xl font-bold text-white">{transactionData.length}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="backdrop-blur-md bg-gradient-to-br from-blue-500/20 to-cyan-600/20 p-4 rounded-xl border border-white/10 shadow-lg"
          >
            <h3 className="text-white/70 text-sm font-medium mb-1">
              Available Items
            </h3>
            <p className="text-3xl font-bold text-white">
              {transactionData.filter((item) => item.status === 'available').length}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="backdrop-blur-md bg-gradient-to-br from-emerald-500/20 to-teal-600/20 p-4 rounded-xl border border-white/10 shadow-lg"
          >
            <h3 className="text-white/70 text-sm font-medium mb-1">
              Sold Items
            </h3>
            <p className="text-3xl font-bold text-white">
              {transactionData.filter((item) => item.status === 'sold').length}
            </p>
          </motion.div>
        </div> */}

        {/* Table container with glassmorphism effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="backdrop-blur-md bg-white/5 p-0.5 rounded-xl border border-white/10 shadow-lg overflow-hidden"
        >
          <div className="bg-black/20 rounded-xl overflow-hidden">
            {transactionData.length === 0 ? (
              <p className="text-white">You haven't sell anything yet.</p>
            ) : (
              <TransactionTable transactions={transactionData} />
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
