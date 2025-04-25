'use client'

import { NotificationBell } from '@/components/modules/dashboard/notification/NotificationBell'
import { AppSidebar } from '@/components/modules/dashboard/sidebar/app-sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { useUser } from '@/context/UserContext'
import { motion } from 'framer-motion'
import {
  BellRing,
  ChevronRight,
  LayoutDashboard,
  RefreshCcw,
  Search,
  Settings2,
} from 'lucide-react'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser()
  const { name = '', email = '' } = user?.data || {}

  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-950 to-violet-900 min-h-screen">
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

      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="backdrop-blur-sm">
          <header
            className="flex h-16 shrink-0 items-center justify-between transition-all duration-300 ease-in-out 
             bg-gradient-to-r from-gray-900/60 via-purple-950/60 to-gray-900/60 backdrop-blur-xl 
             border-b border-white/10 px-4 shadow-lg shadow-purple-900/10
             group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
          >
            <div className="flex items-center gap-3">
              {/* Left Section with Toggle and Breadcrumb */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full blur-sm"></div>
                <SidebarTrigger className="relative bg-white/5 hover:bg-white/15 p-1.5 rounded-full transition-all duration-300" />
              </motion.div>

              <Separator
                orientation="vertical"
                className="h-6 bg-gradient-to-b from-white/5 to-white/20"
              />

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center"
              >
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink
                        href="/dashboard"
                        className="text-white/70 hover:text-white transition-all flex items-center gap-1.5 hover:underline"
                      >
                        <div className="p-1 rounded-md bg-white/10">
                          <LayoutDashboard className="h-3 w-3 text-purple-300" />
                        </div>
                        <span>Dashboard</span>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block text-white/40">
                      <ChevronRight className="h-3 w-3" />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                      <BreadcrumbPage className="bg-gradient-to-r from-white via-purple-200 to-pink-100 bg-clip-text text-transparent font-medium flex items-center gap-1.5">
                        <motion.div
                          animate={{ rotate: [0, 5, 0, -5, 0] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3,
                          }}
                        >
                          <div className="p-1 rounded-md bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                            <RefreshCcw className="h-3 w-3 text-white" />
                          </div>
                        </motion.div>
                        <span>SwapNest</span>
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </motion.div>
            </div>

            {/* Right Section with Quick Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="relative hidden md:block"
              >
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                  <Search className="h-3.5 w-3.5 text-white/50" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="py-1.5 pl-8 pr-3 rounded-lg bg-white/5 border border-white/10 text-sm text-white/80 
                  placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-purple-500/50 
                  focus:bg-white/10 transition-all w-40 focus:w-60"
                />
              </motion.div>

              {/* Notification Bell */}

              {/* <div className="relative z-50">
                <NotificationBell />
              </div> */}

              {/* Separator */}
              <Separator
                orientation="vertical"
                className="h-6 bg-gradient-to-b from-white/5 to-white/20 hidden sm:block"
              />

              {/* User Profile Mini */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 p-1.5 pr-3 rounded-lg transition-all cursor-pointer border border-white/10"
              >
                <Avatar className="h-6 w-6">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-white text-xs font-medium">
                    {name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-white/80 hidden sm:block">
                  {name || email}
                </span>
              </motion.div>
            </div>
          </header>

          <div className="p-4 pt-2">
            <div className="rounded-xl overflow-hidden">{children}</div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}

export default DashboardLayout
