'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import 'react-loading-skeleton/dist/skeleton.css'
import { getCurrentUser } from '@/services/AuthService'
import { useUser } from '@/context/UserContext'
import { getPurchaseHistory, getSellsHistory } from '@/services/history'
import OrderDetailsTable from '@/components/modules/dashboard/orderHistoryTable/OrderDetailsTable'

export default function PurchaseHistoryPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, serError] = useState('')
  const [role, setRole] = useState('')
  const { user } = useUser()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { userId } = await getCurrentUser()

        const purchaseListings = await getPurchaseHistory(userId)

        setData(purchaseListings?.data?.result || [])

        // if (!sellsListings?.success) {
        //   return serError(sellsListings?.message)
        // }
        // if (role === "admin") {
        //   setRole(role)
        //   return setData(sellsListings?.data)
        // }
        // const data = sellsListings?.data.filter((item) => (item.userID?._id).toString() === userId.toString())
        // setData(data)
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
                Loading your purchase history
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
        {/* Stats Cards */}

        {/* Table container with glassmorphism effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="backdrop-blur-md bg-white/5 p-0.5 rounded-xl border border-white/10 shadow-lg overflow-hidden"
        >
          <div className="bg-black/20 rounded-xl overflow-hidden">
            {data.length === 0 ? (
              <p className="text-white">{"You haven't purchased anything yet."}</p>
            ) : (
              <OrderDetailsTable data={data} />
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
