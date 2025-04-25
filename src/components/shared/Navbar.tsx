'use client'

import { motion } from 'framer-motion'
import {
  Heart,
  Home,
  LogOut,
  Menu,
  Moon,
  Package,
  PlusCircle,
  Sun,
  User,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { FaHeart } from 'react-icons/fa6'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useUser } from '@/context/UserContext'
import { cn } from '@/lib/utils'
import { FaShopware } from 'react-icons/fa'
import { useWishlist } from '@/context/WishLists.context'
import { protectedRoutes } from '@/constants'

// type UserType = { name: string; email: string }

function GlowingTooltip({
  children,
  label,
}: {
  children: ReactNode
  label: string
}) {
  return (
    <span className="relative inline-block group">
      {children}
      <span
        className="pointer-events-none absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xl 
                   bg-gradient-to-r from-purple-600 to-pink-600 p-2 text-xs font-medium text-white opacity-0 
                   shadow-lg shadow-purple-500/20 backdrop-blur-md border border-white/10
                   scale-75 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 z-50"
      >
        {label}
        <span
          className="absolute h-2 w-2 bottom-[95%] left-1/2 -translate-x-1/2 rotate-45 
                   bg-gradient-to-br from-purple-600 to-pink-600"
        ></span>
      </span>
    </span>
  )
}

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { wishlist, clearWishlist } = useWishlist()

  // State for wishlist animation
  const [lastWishlistClick, setLastWishlistClick] = useState<number | null>(
    null,
  )

  const { user, handleLogout, setIsLoading } = useUser()
  const { name = '', email = '' } = user?.data || {}

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [scrolled])

  const NavLink = ({ href, label }: { href: string; label: string }) => {
    const isActive = pathname === href

    return (
      <Link href={href} className="relative group px-4 py-2">
        <span
          className={cn(
            'relative z-10 text-sm font-medium transition-colors',
            isActive ? 'text-white' : 'text-gray-300 hover:text-white',
          )}
        >
          {label}
        </span>

        {isActive && (
          <motion.span
            layoutId="navbar-active"
            className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 -z-0"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          />
        )}

        {/* Hover effect for inactive items */}
        {!isActive && (
          <span className="absolute inset-0 rounded-full bg-white/0 hover:bg-white/10 transition-all duration-300 -z-0" />
        )}
      </Link>
    )
  }

  const IconLink = ({
    href = '/dashboard/user/wishlist',
    icon: Icon,
    label,
  }: {
    href: string
    icon: React.FC<React.SVGProps<SVGSVGElement>>
    label: string
  }) => (
    <GlowingTooltip label={label}>
      <Link
        href={href}
        className="group relative p-3 rounded-full overflow-hidden transition-all duration-300"
      >
        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/20 group-hover:to-pink-500/20 transform transition-all duration-300"></span>
        <span className="animate-pulse-slow absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 group-hover:animate-ping rounded-full bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 blur-lg transform transition-all duration-300"></span>
        <Icon className="h-5 w-5 text-gray-300 group-hover:text-white transition-all duration-300" />
      </Link>
    </GlowingTooltip>
  )

  // Animated wishlist button with clicking effect
  function WishlistButton() {
    const [isLiked, setIsLiked] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)

    const handleWishlistClick = (e: React.MouseEvent) => {
      e.preventDefault()
      setIsLiked(!isLiked)
      setIsAnimating(true)
      // Store timestamp of click for animation triggers
      setLastWishlistClick(Date.now())

      // Navigate after animation completes
      setTimeout(() => {
        router.push('/dashboard/user/wishlist')
      }, 500)
    }

    return (
      <GlowingTooltip label="Wishlist">
        <button
          onClick={handleWishlistClick}
          className="group relative p-3 rounded-full overflow-hidden transition-all duration-300"
        >
          {/* Background effects */}
          <span
            className={`absolute inset-0 rounded-full transition-all duration-500
            ${
              isLiked
                ? 'bg-gradient-to-r from-pink-500/30 to-rose-500/30'
                : 'bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/20 group-hover:to-pink-500/20'
            }`}
          />

          {/* Pulsing hover effect */}
          <span
            className={`animate-pulse-slow absolute inset-0 -z-10 
            ${isLiked ? 'opacity-30' : 'opacity-0 group-hover:opacity-100'}
            rounded-full bg-gradient-to-r from-pink-500/10 via-rose-500/10 to-pink-500/10 
            blur-lg transform transition-all duration-300`}
          ></span>

          {/* Click animation particles */}
          {isAnimating && (
            <>
              {[...Array(8)].map((_, i) => (
                <motion.span
                  key={i}
                  className={`absolute w-1.5 h-1.5 rounded-full bg-gradient-to-r 
                    ${isLiked ? 'from-pink-400 to-rose-400' : 'from-purple-400 to-pink-400'}`}
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 1,
                    scale: 0.8,
                  }}
                  animate={{
                    x: (Math.random() - 0.5) * 30,
                    y: (Math.random() - 0.5) * 30,
                    opacity: 0,
                    scale: Math.random() + 0.5,
                    rotate: Math.random() * 360,
                  }}
                  transition={{ duration: 0.6 }}
                  onAnimationComplete={() => setIsAnimating(false)}
                />
              ))}
            </>
          )}

          {/* Heart icon with animation */}
          <motion.div
            animate={isAnimating ? { scale: [1, 1.5, 1] } : {}}
            transition={{ duration: 0.4 }}
            className="relative z-10"
          >
            {/* <Heart
              fill={isLiked ? '#ec4899' : 'none'}
              className={`h-5 w-5 transition-all duration-300
                ${isLiked ? 'text-pink-500' : 'text-gray-300 group-hover:text-white'}`}
            /> */}

            <FaHeart className="text-xl text-white" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-1 text-xs">
              {wishlist.length || 0}
            </span>
          </motion.div>
        </button>
      </GlowingTooltip>
    )
  }

  // Enhanced Mobile Wishlist Button
  function MobileWishlistButton() {
    const [isLiked, setIsLiked] = useState(false)

    useEffect(() => {
      // Sync with desktop button if clicked recently (within 2 seconds)
      if (lastWishlistClick && Date.now() - lastWishlistClick < 2000) {
        setIsLiked(true)
      }
    }, [lastWishlistClick])

    return (
      <Link
        href="/dashboard/user/wishlist"
        className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors relative overflow-hidden"
      >
        <div className="relative">
          <Heart
            size={18}
            className={isLiked ? 'text-pink-500' : ''}
            fill={isLiked ? '#ec4899' : 'none'}
          />
          {isLiked && (
            <span className="absolute inset-0 animate-ping opacity-30 bg-pink-500 rounded-full"></span>
          )}
        </div>
        <span>Wishlist</span>
        {isLiked && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs px-1.5 py-0.5 rounded-full bg-pink-500/20 text-pink-500 border border-pink-500/30">
            New
          </span>
        )}
      </Link>
    )
  }

  const handleForLogout = async () => {
    await handleLogout()
    clearWishlist()
    setIsLoading(true)
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.replace('/')
    }
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-gradient-to-r from-gray-900/90 via-purple-900/90 to-gray-900/90 backdrop-blur-lg shadow-lg shadow-purple-900/20'
          : 'bg-gradient-to-r from-gray-900/70 via-purple-900/70 to-gray-900/70 backdrop-blur-md',
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        <Link href="/" className="group flex items-center gap-2">
          {/* Logo with animated gradient effect */}
          <div className="relative flex items-center">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/50 via-pink-600/50 to-purple-600/50 blur-md group-hover:blur-xl opacity-75 group-hover:opacity-100 animate-pulse-slow transition-all duration-500"></div>
            <div className="relative bg-gradient-to-r from-purple-500 via-pink-500 to-violet-600 p-2.5 rounded-xl shadow-lg shadow-purple-500/30 group-hover:shadow-xl group-hover:shadow-purple-500/40 transition-all duration-300">
              <FaShopware />
            </div>
            <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-100 group-hover:from-white group-hover:via-pink-200 group-hover:to-purple-100 bg-clip-text text-transparent transition-all duration-300">
              SwapNest
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-2">
          <NavLink href="/listings" label="Browse" />
          <NavLink
            href="/dashboard/user/listings/create-listing"
            label="Sell"
          />

          <div className="flex items-center space-x-2 ml-4">
            <div className="h-8 border-r border-white/10"></div>

            {/* Enhanced Wishlist Button with animation */}
            <WishlistButton />

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="group relative p-1.5 rounded-full overflow-hidden hover:scale-105 transition-all duration-300">
                    {/* Animated gradient ring */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 animate-spin-slow opacity-70"></div>
                    <div className="absolute inset-0.5 rounded-full bg-gray-900/90 backdrop-blur-sm"></div>

                    <Avatar className="w-9 h-9 cursor-pointer relative">
                      <AvatarImage src={""} />
                      <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-white font-medium">
                        {name.charAt(0)}
                      </AvatarFallback>

                      {/* Status indicator */}
                      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-gray-900"></span>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-64 overflow-hidden rounded-xl border-purple-500/20 bg-gradient-to-br from-gray-900/95 via-purple-950/95 to-gray-900/95 backdrop-blur-xl text-white shadow-xl shadow-purple-900/30"
                >
                  <div className="p-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12 border-2 border-purple-500/30">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-white font-semibold">
                          {name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 overflow-hidden">
                        <p className="font-semibold text-white truncate">
                          {name}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {email}
                        </p>
                        <span className="inline-flex items-center mt-1 text-xs gap-1 text-emerald-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                          Online
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    <Link href="/dashboard">
                      <DropdownMenuItem className="flex gap-2.5 px-3 py-2.5 cursor-pointer hover:bg-white/10 focus:bg-white/10 rounded-lg transition-colors group">
                        <div className="p-1.5 rounded-md bg-gradient-to-br from-purple-500/20 to-pink-500/20 group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-colors">
                          <User
                            size={16}
                            className="text-purple-300 group-hover:text-purple-200"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">Dashboard</span>
                          <span className="text-xs text-white/60">
                            View your account
                          </span>
                        </div>
                      </DropdownMenuItem>
                    </Link>

                    <Link href="/dashboard/user/listings">
                      <DropdownMenuItem className="flex gap-2.5 px-3 py-2.5 cursor-pointer hover:bg-white/10 focus:bg-white/10 rounded-lg transition-colors group">
                        <div className="p-1.5 rounded-md bg-gradient-to-br from-blue-500/20 to-cyan-500/20 group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-colors">
                          <Package
                            size={16}
                            className="text-blue-300 group-hover:text-blue-200"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            My Listings
                          </span>
                          <span className="text-xs text-white/60">
                            Manage your items
                          </span>
                        </div>
                      </DropdownMenuItem>
                    </Link>

                    <DropdownMenuSeparator className="my-1.5 h-px bg-white/10" />

                    <DropdownMenuItem
                      className="flex gap-2.5 px-3 py-2.5 cursor-pointer text-white/90 hover:text-white/100 hover:bg-red-500/10 focus:bg-red-500/10 rounded-lg transition-colors group"
                      onClick={handleForLogout}
                    >
                      <div className="p-1.5 rounded-md bg-gradient-to-br from-red-500/20 to-orange-500/20 group-hover:from-red-500/30 group-hover:to-orange-500/30 transition-colors">
                        <LogOut
                          size={16}
                          className="text-red-300 group-hover:text-red-200"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">Sign Out</span>
                        <span className="text-xs text-white/60">
                          Log out of your account
                        </span>
                      </div>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
                  >
                    Log In
                  </Button>
                </Link>

                <Link href="/register">
                  <Button className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md shadow-purple-500/20 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 border-0 hover:scale-105">
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 animate-gradient-x [animation-duration:3s]"></span>
                    <span className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-[-20deg] transform -translate-x-full hover:duration-1000 duration-1000 transition-transform hover:translate-x-[200%]"></span>
                    <span className="relative">Sign Up</span>
                  </Button>
                </Link>
              </div>
            )}

            {mounted && (
              <GlowingTooltip label="Toggle theme">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="group rounded-full h-9 w-9 relative overflow-hidden p-0"
                >
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/20 group-hover:to-pink-500/20 transform transition-all duration-300"></span>

                  {theme === 'dark' ? (
                    <Sun className="h-8 w-8 text-yellow-600 group-hover:text-yellow-100 group-hover:rotate-45 transition-all duration-300" />
                  ) : (
                    <Moon className="h-8 w-8 text-purple-200 group-hover:text-white group-hover:-rotate-45 transition-all duration-300" />
                  )}
                </Button>
              </GlowingTooltip>
            )}
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center gap-2">
          {user && (
            <Avatar className="w-8 h-8 cursor-pointer border-2 border-purple-500/30">
              <AvatarImage src="" />
              <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-white">
                {name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          )}

          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-full"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-yellow-200" />
              ) : (
                <Moon className="h-5 w-5 text-purple-200" />
              )}
            </Button>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Menu className="h-5 w-5 text-white" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="border-purple-500/20 bg-gradient-to-br from-gray-900/95 via-purple-900/90 to-gray-900/95 pt-8 px-6 backdrop-blur-xl text-white"
            >
              <div className="flex flex-col gap-1 mt-6">
                <Link
                  href="/listings"
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <Home size={18} />
                  <span>Browse Listings</span>
                </Link>

                <Link
                  href="/post-ad"
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <PlusCircle size={18} />
                  <span>Post New Listing</span>
                </Link>

                {/* Enhanced mobile wishlist button */}
                <MobileWishlistButton />
              </div>

              <div className="mt-8">
                {user ? (
                  <div className="space-y-3">
                    <div className="p-5 rounded-xl bg-gradient-to-br from-purple-900/30 to-indigo-900/30 backdrop-blur-md border border-white/10 flex items-center gap-4">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/70 to-pink-600/70 animate-pulse-slow blur-sm"></div>
                        <Avatar className="w-14 h-14 border-2 border-purple-500/40 relative">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-white text-lg font-medium">
                            {name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <motion.p
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="font-medium text-lg bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
                        >
                          {name}
                        </motion.p>
                        <motion.p
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          className="text-xs text-white/60"
                        >
                          {email}
                        </motion.p>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                          className="mt-1 flex items-center gap-1.5"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                          <span className="text-xs text-emerald-400">
                            Active Now
                          </span>
                        </motion.div>
                      </div>
                    </div>

                    <Link href="/dashboard">
                      <motion.div
                        whileHover={{ y: -2 }}
                        whileTap={{ y: 0 }}
                        className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-purple-900/30 to-violet-900/30 hover:from-purple-900/40 hover:to-violet-900/40 border border-white/10 transition-colors shadow-lg shadow-purple-900/5"
                      >
                        <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                          <User size={20} className="text-purple-300" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium">Dashboard</span>
                          <span className="text-xs text-white/60">
                            View your account
                          </span>
                        </div>
                      </motion.div>
                    </Link>

                    <Link href="/dashboard/user/listings">
                      <motion.div
                        whileHover={{ y: -2 }}
                        whileTap={{ y: 0 }}
                        className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-blue-900/30 to-cyan-900/30 hover:from-blue-900/40 hover:to-cyan-900/40 border border-white/10 transition-colors shadow-lg shadow-blue-900/5"
                      >
                        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
                          <Package size={20} className="text-blue-300" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium">My Listings</span>
                          <span className="text-xs text-white/60">
                            Manage your items
                          </span>
                        </div>
                      </motion.div>
                    </Link>

                    <motion.button
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 0 }}
                      onClick={handleForLogout}
                      className="w-full flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-red-900/20 to-orange-900/20 hover:from-red-900/30 hover:to-orange-900/30 border border-red-500/20 transition-colors shadow-lg shadow-red-900/5"
                    >
                      <div className="p-2 rounded-lg bg-gradient-to-br from-red-500/20 to-orange-500/20">
                        <LogOut size={20} className="text-red-300" />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="font-medium">Sign Out</span>
                        <span className="text-xs text-white/60">
                          Log out of your account
                        </span>
                      </div>
                    </motion.button>
                  </div>
                ) : (
                  <div className="grid gap-3">
                    <Link href="/login" className="w-full">
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full bg-white/5 hover:bg-white/10 text-white border-white/10 h-14 text-lg"
                      >
                        Log In
                      </Button>
                    </Link>

                    <Link href="/register" className="w-full">
                      <Button
                        size="lg"
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 h-14 text-lg relative overflow-hidden"
                      >
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 animate-gradient-x [animation-duration:3s]"></span>
                        <span className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-[-20deg] transform -translate-x-full animate-shine [animation-duration:3s] [animation-iteration-count:infinite]"></span>
                        <span className="relative">Sign Up</span>
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
