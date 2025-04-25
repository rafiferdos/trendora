'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BellRing, X, ShoppingBag, Check } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { formatDistanceToNow } from 'date-fns'
import Image from 'next/image'

// Define the notification product type
type NotificationProduct = {
  id: string
  title: string
  image: string
  price: number
  createdAt: string
}

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasUnread, setHasUnread] = useState(true)
  const [products, setProducts] = useState<NotificationProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch latest products when component mounts
  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        // You would typically make an API call here to fetch the latest products
        // For now, we'll use mock data
        const mockProducts: NotificationProduct[] = [
          {
            id: '1',
            title: 'Premium Mechanical Keyboard',
            image: '/placeholder-product.jpg',
            price: 129.99,
            createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
          },
          {
            id: '2',
            title: 'Wireless Gaming Mouse',
            image: '/placeholder-product.jpg',
            price: 59.99,
            createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
          },
          {
            id: '3',
            title: 'Ultra HD Monitor',
            image: '/placeholder-product.jpg',
            price: 299.99,
            createdAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(), // 6 hours ago
          },
        ]
        
        setProducts(mockProducts)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching products:', error)
        setIsLoading(false)
      }
    }
    
    fetchLatestProducts()
    
    // Check local storage for notification state
    const notificationState = localStorage.getItem('swapnest_notifications')
    if (notificationState) {
      setHasUnread(JSON.parse(notificationState).hasUnread)
    }
  }, [])

  const handleMarkAsRead = () => {
    setHasUnread(false)
    localStorage.setItem('swapnest_notifications', JSON.stringify({ hasUnread: false }))
  }

  // Close when clicking outside
  useEffect(() => {
    if (!isOpen) return
    
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('[data-notification-container]')) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  return (
    <div className="relative" data-notification-container>
      <motion.button
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="relative p-1.5 rounded-full bg-white/5 hover:bg-white/15 transition-all"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notifications"
      >
        <BellRing className="h-4 w-4 text-white/70" />
        {hasUnread && (
          <span className="absolute top-0.5 right-1 h-2 w-2 bg-pink-500 rounded-full border border-gray-900"></span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 bg-gradient-to-br from-gray-900/95 to-purple-950/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl z-50"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-white">Latest Products</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-white/70 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={14} />
                </Button>
              </div>
              <Separator className="bg-white/10 my-2" />
              
              {isLoading ? (
                <div className="py-6 flex items-center justify-center">
                  <div className="animate-spin h-5 w-5 border-2 border-white/20 border-t-purple-500 rounded-full"></div>
                </div>
              ) : products.length > 0 ? (
                <div className="space-y-2 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
                  {products.map((product) => (
                    <Link 
                      href={`/product/${product.id}`} 
                      key={product.id}
                      className="block"
                    >
                      <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <div className="w-12 h-12 bg-white/10 rounded-md flex items-center justify-center overflow-hidden">
                          {/* Fallback icon if no image */}
                          <ShoppingBag className="h-6 w-6 text-purple-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-white truncate">{product.title}</h4>
                          <p className="text-xs text-white/60">${product.price}</p>
                          <p className="text-xs text-purple-400">
                            {formatDistanceToNow(new Date(product.createdAt), { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-center py-6 text-sm text-white/60">No new products</p>
              )}
              
              <Separator className="bg-white/10 my-2" />
              <div className="flex justify-end">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-white hover:bg-white/10 flex items-center gap-1.5"
                  onClick={handleMarkAsRead}
                  disabled={!hasUnread}
                >
                  <Check size={12} />
                  <span>Mark as read</span>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}