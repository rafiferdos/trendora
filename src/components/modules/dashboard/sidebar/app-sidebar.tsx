'use client'
import * as React from 'react'
import { motion } from 'framer-motion'
import {
  BarChart3,
  ChevronRight,
  Heart,
  Home,
  LogOut,
  MessageCircle,
  Package,
  Plus,
  Settings,
  ShoppingCart,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar'

import { FaShopware } from 'react-icons/fa'
import { useUser } from '@/context/UserContext'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser()
  const router = useRouter()
  const { isMobile, state } = useSidebar()
  const [activeItem, setActiveItem] = React.useState('Dashboard')
  const [expandedItems, setExpandedItems] = React.useState<string[]>([
    'Listings',
  ])

  // Extract user data
  const userName = user?.data?.name || 'SwapNest User'
  const userEmail = user?.data?.email || 'user@swapnest.com'
  const firstLetter = userName.charAt(0).toUpperCase()

  // Handle logout
  const handleLogout = async () => {
    await LogOut()
    router.push('/')
  }

  // Navigation items with vibrant colors
  const navItems = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: Home,
      iconColor: 'text-violet-400',
      bgColor: 'from-violet-600/20 to-purple-600/20',
      borderColor: 'border-violet-500/30',
    },
    {
      title: 'Listings',
      url: '/dashboard/user/listings',
      icon: Package,
      iconColor: 'text-pink-400',
      bgColor: 'from-pink-600/20 to-rose-600/20',
      borderColor: 'border-pink-500/30',
      hasNotification: true,
      items: [
        {
          title: 'All Listings',
          url: '/dashboard/user/listings',
          iconColor: 'text-pink-300',
          bgColor: 'bg-pink-500/10',
        },
        {
          title: 'Create New',
          url: '/dashboard/user/listings/create-listing',
          iconColor: 'text-pink-300',
          bgColor: 'bg-pink-500/10',
        },
      ],
    },
    {
      title: 'Messages',
      url: '/dashboard/messages',
      icon: MessageCircle,
      iconColor: 'text-blue-400',
      bgColor: 'from-blue-600/20 to-cyan-600/20',
      borderColor: 'border-blue-500/30',
      hasNotification: true,
      notificationCount: 4,
    },
    {
      title: 'Purchase History',
      url: '/dashboard/user/purchase-history',
      icon: ShoppingCart,
      iconColor: 'text-emerald-400',
      bgColor: 'from-emerald-600/20 to-teal-600/20',
      borderColor: 'border-emerald-500/30',
    },
    {
      title: 'Sales History',
      url: '/dashboard/user/sales-history',
      icon: BarChart3,
      iconColor: 'text-amber-400',
      bgColor: 'from-amber-600/20 to-yellow-600/20',
      borderColor: 'border-amber-500/30',
    },
    {
      title: 'Wishlist',
      url: '/dashboard/wishlist',
      icon: Heart,
      iconColor: 'text-rose-400',
      bgColor: 'from-rose-600/20 to-red-600/20',
      borderColor: 'border-rose-500/30',
    },
    {
      title: 'Profile Settings',
      url: '/dashboard/settings',
      icon: Settings,
      iconColor: 'text-neutral-400',
      bgColor: 'from-neutral-600/20 to-gray-600/20',
      borderColor: 'border-neutral-500/30',
    },
  ]

  // Toggle expanded status of items with sub-items
  const toggleExpanded = (title: string) => {
    if (expandedItems.includes(title)) {
      setExpandedItems(expandedItems.filter((item) => item !== title))
    } else {
      setExpandedItems([...expandedItems, title])
    }
  }

  // Detect current path to highlight active menu item
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname
      const currentItem = navItems.find(
        (item) =>
          path === item.url ||
          item.items?.some((subItem) => path === subItem.url),
      )
      if (currentItem) {
        setActiveItem(currentItem.title)
        if (currentItem.items && !expandedItems.includes(currentItem.title)) {
          setExpandedItems([...expandedItems, currentItem.title])
        }
      }
    }
  }, [])

  return (
    <Sidebar
      collapsible="icon"
      className="bg-gradient-to-b from-gray-900/90 via-purple-950/80 to-gray-900/90 backdrop-blur-xl border-r border-white/10"
      {...props}
    >
      {/* Header with Logo */}
      <SidebarHeader className="p-4 border-b border-white/10">
        <div className="flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center gap-2"
          >
            {/* App Logo */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/70 to-pink-600/70 rounded-xl blur-sm"></div>
              <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg shadow-purple-900/30">
                <span className="font-bold text-lg text-white">
                  <FaShopware />
                </span>
              </div>
            </div>

            {/* App Name - only show when expanded */}
            {state === 'expanded' && (
              <Link href={'/'}>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="flex flex-col"
                >
                  <span className="font-bold text-lg bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent">
                    SwapNest
                  </span>
                  <span className="text-xs text-white/40">Marketplace</span>
                </motion.div>
              </Link>
            )}
          </motion.div>
        </div>
      </SidebarHeader>

      {/* Main Navigation */}
      <SidebarContent className="px-3 py-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="space-y-1"
        >
          {/* Quick action button */}
          {state === 'expanded' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mb-4"
            >
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 group relative overflow-hidden">
                <span className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-[-20deg] transform -translate-x-full hover:duration-1000 duration-1000 transition-transform group-hover:translate-x-[200%]"></span>
                <Link
                  href="/dashboard/user/listings/create-listing"
                  className="flex items-center justify-center gap-2 relative"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Listing</span>
                </Link>
              </Button>
            </motion.div>
          )}

          {/* Navigation Items */}
          <div className="space-y-1.5">
            {navItems.map((item, index) => (
              <React.Fragment key={item.title}>
                {item.items ? (
                  <Collapsible
                    open={expandedItems.includes(item.title)}
                    onOpenChange={() => toggleExpanded(item.title)}
                  >
                    <CollapsibleTrigger asChild>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                        whileHover={{ x: 5 }}
                        className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-all
                        ${activeItem === item.title
                            ? `bg-gradient-to-r ${item.bgColor} border-l-2 ${item.borderColor}`
                            : 'hover:bg-white/10'
                          }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`p-1.5 rounded-md bg-gradient-to-br ${item.bgColor}`}
                          >
                            <item.icon
                              className={`w-4 h-4 ${item.iconColor}`}
                            />
                          </div>

                          {state === 'expanded' && (
                            <>
                              <span className="text-white/90 truncate">
                                {item.title}
                              </span>
                              {item.hasNotification && (
                                <span className="flex h-2 w-2 rounded-full bg-pink-500"></span>
                              )}
                            </>
                          )}
                        </div>

                        {state === 'expanded' && (
                          <ChevronRight
                            className={`w-4 h-4 text-white/50 transition-transform ${expandedItems.includes(item.title)
                              ? 'rotate-90'
                              : ''
                              }`}
                          />
                        )}
                      </motion.div>
                    </CollapsibleTrigger>

                    {state === 'expanded' && (
                      <CollapsibleContent>
                        <div className="pl-10 mt-1 space-y-1">
                          {item.items.map((subItem, subIndex) => (
                            <Link href={subItem.url} key={subItem.title}>
                              <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  delay: 0.1 * subIndex,
                                  duration: 0.4,
                                }}
                                whileHover={{ x: 5 }}
                                className={`p-2 rounded-md text-sm transition-all
                                ${window.location.pathname === subItem.url
                                    ? `${subItem.bgColor} text-white`
                                    : 'text-white/70 hover:text-white hover:bg-white/10'
                                  }`}
                              >
                                {subItem.title}
                              </motion.div>
                            </Link>
                          ))}
                        </div>
                      </CollapsibleContent>
                    )}
                  </Collapsible>
                ) : (
                  <Link href={item.url}>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                      whileHover={{ x: 5 }}
                      className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-all 
                      ${window.location.pathname === item.url
                          ? `bg-gradient-to-r ${item.bgColor} border-l-2 ${item.borderColor}`
                          : 'hover:bg-white/10'
                        }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`p-1.5 rounded-md bg-gradient-to-br ${item.bgColor}`}
                        >
                          <item.icon className={`w-4 h-4 ${item.iconColor}`} />
                        </div>

                        {state === 'expanded' && (
                          <>
                            <span className="text-white/90 truncate">
                              {item.title}
                            </span>
                            {item.hasNotification && (
                              <div className="flex ml-auto">
                                {item.notificationCount ? (
                                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-pink-600 text-[10px] text-white">
                                    {item.notificationCount}
                                  </span>
                                ) : (
                                  <span className="flex h-2 w-2 rounded-full bg-pink-500"></span>
                                )}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </motion.div>
                  </Link>
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </SidebarContent>

      {/* Footer with User Profile */}
      <SidebarFooter className="p-3 border-t border-white/10 mt-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className={`p-2 rounded-lg bg-gradient-to-br from-purple-900/30 to-indigo-900/30 backdrop-blur-md border border-white/10`}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/70 to-pink-600/70 animate-pulse-slow blur-sm"></div>
              <Avatar className="w-10 h-10 border-2 border-purple-500/40 relative">
                <AvatarImage src="" />
                <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-white font-medium">
                  {firstLetter}
                </AvatarFallback>
              </Avatar>
            </div>

            {state === 'expanded' && (
              <div className="flex flex-col flex-1 min-w-0">
                <p className="font-medium text-sm bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent truncate">
                  {userName}
                </p>
                <p className="text-xs text-white/60 truncate">{userEmail}</p>
              </div>
            )}

            {state === 'expanded' && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLogout}
                className="p-1.5 rounded-md bg-red-500/20 hover:bg-red-500/30 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5 text-red-400" />
              </motion.button>
            )}
          </div>
        </motion.div>
      </SidebarFooter>

      {/* Custom separator bar */}
      <SidebarRail className="bg-gradient-to-b from-purple-500/10 to-pink-500/10 backdrop-blur-xl" />
    </Sidebar>
  )
}
