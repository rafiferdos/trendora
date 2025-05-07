'use client'

import { motion } from 'framer-motion'
import {
  BarChart3,
  BookOpen,
  ChevronDown,
  Folders,
  Heart,
  Home,
  LifeBuoy,
  LogOut,
  Menu,
  Moon,
  Package,
  PlusCircle,
  ShoppingBag,
  Sun,
  Tag,
  User,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { protectedRoutes } from '@/constants'
import { useUser } from '@/context/UserContext'
import { useWishlist } from '@/context/WishLists.context'
import { cn } from '@/lib/utils'
import { FaShopware } from 'react-icons/fa'
import { FaHeart } from 'react-icons/fa6'
import { toast } from 'sonner'

// Megamenu data
const categories = [
  {
    title: "Electronics",
    href: "/listings?category=electronics",
    icon: <BarChart3 className="h-4 w-4 text-indigo-400" />,
    description: "Smartphones, laptops, and other tech gadgets"
  },
  {
    title: "Fashion",
    href: "/listings?category=fashion",
    icon: <ShoppingBag className="h-4 w-4 text-pink-400" />,
    description: "Clothing, accessories, and footwear"
  },
  {
    title: "Home & Garden",
    href: "/listings?category=home",
    icon: <Home className="h-4 w-4 text-emerald-400" />,
    description: "Furniture, decor, and outdoor items"
  },
  {
    title: "Sports",
    href: "/listings?category=sports",
    icon: <ShoppingBag className="h-4 w-4 text-blue-400" />,
    description: "Equipment, accessories, and apparel"
  },
  {
    title: "Toys & Games",
    href: "/listings?category=toys",
    icon: <ShoppingBag className="h-4 w-4 text-amber-400" />,
    description: "Board games, consoles, and collectibles"
  },
  {
    title: "Books & Media",
    href: "/listings?category=books",
    icon: <BookOpen className="h-4 w-4 text-orange-400" />,
    description: "Books, movies, music, and more"
  },
]

function GlowingTooltip({
  children,
  label,
}: {
  children: ReactNode
  label: string
}) {
  const { theme } = useTheme()
  
  return (
    <span className="relative inline-block group">
      {children}
      <span
        className={`pointer-events-none absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xl 
                   ${theme === 'dark' 
                     ? 'bg-gradient-to-r from-purple-600 to-pink-600 border-white/10' 
                     : 'bg-gradient-to-r from-indigo-600 to-purple-600 border-indigo-200/30'} 
                   p-2 text-xs font-medium text-white opacity-0 
                   shadow-lg ${theme === 'dark' ? 'shadow-purple-500/20' : 'shadow-indigo-500/20'} backdrop-blur-md border
                   scale-75 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 z-50`}
      >
        {label}
        <span
          className={`absolute h-2 w-2 bottom-[95%] left-1/2 -translate-x-1/2 rotate-45 
                   ${theme === 'dark'
                     ? 'bg-gradient-to-br from-purple-600 to-pink-600' 
                     : 'bg-gradient-to-br from-indigo-600 to-purple-600'}`}
        ></span>
      </span>
    </span>
  )
}

function ListItem({
  title,
  href,
  children,
  icon,
}: {
  title: string
  href: string
  children?: React.ReactNode
  icon?: React.ReactNode
}) {
  const { theme } = useTheme()
  
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors 
                     ${theme === 'dark' 
                       ? 'hover:bg-white/10 text-white' 
                       : 'hover:bg-indigo-50 text-gray-800'}`}
        >
          <div className="flex items-center gap-2">
            {icon}
            <div className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{title}</div>
          </div>
          {children && <p className={`line-clamp-2 text-xs ${theme === 'dark' ? 'text-white/70' : 'text-gray-600'}`}>{children}</p>}
        </Link>
      </NavigationMenuLink>
    </li>
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

  const { user, handleLogout } = useUser()
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
            isActive 
              ? theme === 'dark' ? 'text-white' : 'text-indigo-900 text-white' 
              : theme === 'dark' 
                ? 'text-gray-300 hover:text-white' 
                : 'text-gray-700 hover:text-indigo-700',
          )}
        >
          {label}
        </span>

        {isActive && (
          <motion.span
            layoutId="navbar-active"
            className={`absolute inset-0 rounded-full ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                : 'bg-gradient-to-r from-indigo-500 to-purple-500'
            } -z-0`}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          />
        )}

        {/* Hover effect for inactive items */}
        {!isActive && (
          <span 
            className={`absolute inset-0 rounded-full ${
              theme === 'dark' 
                ? 'bg-white/0 hover:bg-white/10' 
                : 'bg-indigo-500/0 hover:bg-indigo-100'
            } transition-all duration-300 -z-0`} 
          />
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
        <span className={`absolute inset-0 rounded-full bg-gradient-to-r ${
          theme === 'dark'
            ? 'from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/20 group-hover:to-pink-500/20'
            : 'from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/20 group-hover:to-purple-500/20'
        } transform transition-all duration-300`}></span>
        <span className={`animate-pulse-slow absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 group-hover:animate-ping rounded-full ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10'
            : 'bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-indigo-500/10'
        } blur-lg transform transition-all duration-300`}></span>
        <Icon className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-300 group-hover:text-white' : 'text-gray-700 group-hover:text-indigo-700'} transition-all duration-300`} />
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
                ? theme === 'dark' ? 'bg-gradient-to-r from-pink-500/30 to-rose-500/30' : 'bg-gradient-to-r from-pink-500/20 to-rose-500/20'
                : theme === 'dark' 
                  ? 'bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/20 group-hover:to-pink-500/20' 
                  : 'bg-gradient-to-r from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/20 group-hover:to-purple-500/20'
            }`}
          />

          {/* Pulsing hover effect */}
          <span
            className={`animate-pulse-slow absolute inset-0 -z-10 
            ${isLiked ? 'opacity-30' : 'opacity-0 group-hover:opacity-100'}
            rounded-full ${theme === 'dark' 
              ? 'bg-gradient-to-r from-pink-500/10 via-rose-500/10 to-pink-500/10'
              : 'bg-gradient-to-r from-pink-500/10 via-rose-500/10 to-pink-500/10'
            }
            blur-lg transform transition-all duration-300`}
          ></span>

          {/* Click animation particles */}
          {isAnimating && (
            <>
              {[...Array(8)].map((_, i) => (
                <motion.span
                  key={i}
                  className={`absolute w-1.5 h-1.5 rounded-full bg-gradient-to-r 
                    ${isLiked
                      ? theme === 'dark' ? 'from-pink-400 to-rose-400' : 'from-pink-400 to-rose-400'
                      : theme === 'dark' ? 'from-purple-400 to-pink-400' : 'from-indigo-400 to-purple-400'
                    }`}
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
            <FaHeart className={`text-xl ${theme === 'dark' ? 'text-white' : 'text-indigo-700'}`} />
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
        className={`flex items-center gap-3 p-3 rounded-xl ${
          theme === 'dark'
            ? 'bg-white/5 hover:bg-white/10'
            : 'bg-indigo-50/50 hover:bg-indigo-100/80'
        } transition-colors relative overflow-hidden`}
      >
        <div className="relative">
          <Heart
            size={18}
            className={isLiked ? 'text-pink-500' : theme === 'dark' ? 'text-gray-300' : 'text-indigo-700'}
            fill={isLiked ? '#ec4899' : 'none'}
          />
          {isLiked && (
            <span className="absolute inset-0 animate-ping opacity-30 bg-pink-500 rounded-full"></span>
          )}
        </div>
        <span className={theme === 'dark' ? 'text-white' : 'text-gray-800'}>Wishlist</span>
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
    toast.success('Logged out successfully!')
    clearWishlist()

    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.replace('/')
    }
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? theme === 'dark'
              ? 'bg-gradient-to-r from-gray-900/90 via-purple-900/90 to-gray-900/90 backdrop-blur-lg shadow-lg shadow-purple-900/20'
              : 'bg-gradient-to-r from-white/90 via-indigo-50/90 to-white/90 backdrop-blur-lg shadow-lg shadow-indigo-200/30'
          : theme === 'dark'
              ? 'bg-gradient-to-r from-gray-900/70 via-purple-900/70 to-gray-900/70 backdrop-blur-md'
              : 'bg-gradient-to-r from-white/70 via-indigo-50/70 to-white/70 backdrop-blur-md',
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        <Link href="/" className="group flex items-center gap-2">
          {/* Logo with animated gradient effect */}
          <div className="relative flex items-center">
            <div 
              className={`absolute inset-0 rounded-xl ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-purple-600/50 via-pink-600/50 to-purple-600/50'
                  : 'bg-gradient-to-r from-indigo-500/50 via-purple-500/50 to-indigo-500/50'
              } blur-md group-hover:blur-xl opacity-75 group-hover:opacity-100 animate-pulse-slow transition-all duration-500`}
            ></div>
            <div 
              className={`relative ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-violet-600'
                  : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600'
              } p-2.5 rounded-xl shadow-lg ${
                theme === 'dark'
                  ? 'shadow-purple-500/30 group-hover:shadow-purple-500/40'
                  : 'shadow-indigo-500/30 group-hover:shadow-indigo-500/40'
              } transition-all duration-300`}
            >
              <FaShopware className="text-white" />
            </div>
            <span 
              className={`ml-3 text-2xl font-bold ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-white via-purple-200 to-pink-100 group-hover:from-white group-hover:via-pink-200 group-hover:to-purple-100'
                  : 'bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 group-hover:from-indigo-800 group-hover:via-purple-700 group-hover:to-indigo-800'
              } bg-clip-text text-transparent transition-all duration-300`}
            >
            Trendora
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-2">
          <NavLink href="/" label="Home" />
          
          {/* Categories Megamenu */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger 
                  className={`bg-transparent ${
                    theme === 'dark' 
                      ? 'hover:bg-white/10 text-gray-300 hover:text-white'
                      : 'hover:bg-indigo-50 text-gray-700 hover:text-indigo-700'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <Folders className="w-4 h-4" />
                    Categories
                  </span>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div 
                    className={`grid grid-cols-2 gap-3 p-6 w-[500px] backdrop-blur-xl ${
                      theme === 'dark'
                        ? 'bg-gradient-to-br from-gray-900/95 via-purple-950/90 to-gray-900/95'
                        : 'bg-gradient-to-br from-white/95 via-indigo-50/90 to-white/95'
                    } rounded-xl`}
                  >
                    <ul className="col-span-2 grid grid-cols-2 gap-3">
                      {categories.map((category) => (
                        <ListItem 
                          key={category.title} 
                          title={category.title} 
                          href={category.href}
                          icon={category.icon}
                        >
                          {category.description}
                        </ListItem>
                      ))}
                    </ul>
                    <div 
                      className={`col-span-2 mt-4 ${
                        theme === 'dark'
                          ? 'bg-gradient-to-r from-purple-900/30 to-pink-900/30'
                          : 'bg-gradient-to-r from-indigo-100/50 to-purple-100/50'
                      } p-3 rounded-lg`}
                    >
                      <div className={`flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-indigo-900'}`}>
                        <Tag className={`h-4 w-4 ${theme === 'dark' ? 'text-pink-400' : 'text-indigo-500'}`} />
                        <span className="text-sm font-medium">Special Deals</span>
                      </div>
                      <p className={`text-xs ${theme === 'dark' ? 'text-white/70' : 'text-gray-600'} mt-1`}>
                        Discover featured items and limited-time offers
                      </p>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <NavLink href="/listings" label="Browse" />
          <NavLink href="/dashboard/user/listings/create-listing" label="Add Listing" />
          <NavLink href="/contact" label="Contact Us" />
          <NavLink href="/help" label="Help" />

          <div className="flex items-center space-x-2 ml-4">
            <div className={`h-8 border-r ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'}`}></div>

            {/* Enhanced Wishlist Button with animation */}
            <WishlistButton />

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="group relative p-1.5 rounded-full overflow-hidden hover:scale-105 transition-all duration-300">
                    {/* Animated gradient ring */}
                    <div 
                      className={`absolute inset-0 rounded-full ${
                        theme === 'dark'
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                          : 'bg-gradient-to-r from-indigo-500 to-purple-500'
                      } animate-spin-slow opacity-70`}
                    ></div>
                    <div 
                      className={`absolute inset-0.5 rounded-full ${
                        theme === 'dark' 
                          ? 'bg-gray-900/90' 
                          : 'bg-white/90'
                      } backdrop-blur-sm`}
                    ></div>

                    <Avatar className="w-9 h-9 cursor-pointer relative">
                      <AvatarImage src={''} />
                      <AvatarFallback 
                        className={`${
                          theme === 'dark'
                            ? 'bg-gradient-to-br from-purple-600 to-pink-600'
                            : 'bg-gradient-to-br from-indigo-600 to-purple-600'
                        } text-white font-medium`}
                      >
                        {name.charAt(0)}
                      </AvatarFallback>

                      {/* Status indicator */}
                      <span 
                        className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 ${
                          theme === 'dark' ? 'border-gray-900' : 'border-white'
                        }`}
                      ></span>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className={`w-64 overflow-hidden rounded-xl ${
                    theme === 'dark'
                      ? 'border-purple-500/20 bg-gradient-to-br from-gray-900/95 via-purple-950/95 to-gray-900/95 text-white shadow-purple-900/30'
                      : 'border-indigo-200/30 bg-gradient-to-br from-white/95 via-indigo-50/95 to-white/95 text-gray-800 shadow-indigo-200/30'
                  } backdrop-blur-xl shadow-xl`}
                >
                  <div className={`p-4 border-b ${theme === 'dark' ? 'border-white/10' : 'border-gray-200/60'}`}>
                    <div className="flex items-center gap-3">
                      <Avatar 
                        className={`w-12 h-12 border-2 ${
                          theme === 'dark' ? 'border-purple-500/30' : 'border-indigo-200'
                        }`}
                      >
                        <AvatarImage src="" />
                        <AvatarFallback 
                          className={`${
                            theme === 'dark'
                              ? 'bg-gradient-to-br from-purple-600 to-pink-600'
                              : 'bg-gradient-to-br from-indigo-600 to-purple-600'
                          } text-white font-semibold`}
                        >
                          {name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 overflow-hidden">
                        <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'} truncate`}>
                          {name}
                        </p>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} truncate`}>
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
                      <DropdownMenuItem 
                        className={`flex gap-2.5 px-3 py-2.5 cursor-pointer ${
                          theme === 'dark'
                            ? 'hover:bg-white/10 focus:bg-white/10'
                            : 'hover:bg-indigo-50 focus:bg-indigo-50'
                        } rounded-lg transition-colors group`}
                      >
                        <div 
                          className={`p-1.5 rounded-md ${
                            theme === 'dark'
                              ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 group-hover:from-purple-500/30 group-hover:to-pink-500/30'
                              : 'bg-gradient-to-br from-indigo-500/10 to-purple-500/10 group-hover:from-indigo-500/20 group-hover:to-purple-500/20'
                          } transition-colors`}
                        >
                          <User
                            size={16}
                            className={
                              theme === 'dark'
                                ? 'text-purple-300 group-hover:text-purple-200'
                                : 'text-indigo-700 group-hover:text-indigo-800'
                            }
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Dashboard</span>
                          <span className={`text-xs ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>
                            View your account
                          </span>
                        </div>
                      </DropdownMenuItem>
                    </Link>

                    <Link href="/dashboard/user/listings">
                      <DropdownMenuItem 
                        className={`flex gap-2.5 px-3 py-2.5 cursor-pointer ${
                          theme === 'dark'
                            ? 'hover:bg-white/10 focus:bg-white/10'
                            : 'hover:bg-indigo-50 focus:bg-indigo-50'
                        } rounded-lg transition-colors group`}
                      >
                        <div 
                          className={`p-1.5 rounded-md ${
                            theme === 'dark'
                              ? 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20 group-hover:from-blue-500/30 group-hover:to-cyan-500/30'
                              : 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10 group-hover:from-blue-500/20 group-hover:to-cyan-500/20'
                          } transition-colors`}
                        >
                          <Package
                            size={16}
                            className={
                              theme === 'dark'
                                ? 'text-blue-300 group-hover:text-blue-200'
                                : 'text-blue-700 group-hover:text-blue-800'
                            }
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                            My Listings
                          </span>
                          <span className={`text-xs ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>
                            Manage your items
                          </span>
                        </div>
                      </DropdownMenuItem>
                    </Link>

                    <Link href="/help">
                      <DropdownMenuItem 
                        className={`flex gap-2.5 px-3 py-2.5 cursor-pointer ${
                          theme === 'dark'
                            ? 'hover:bg-white/10 focus:bg-white/10'
                            : 'hover:bg-indigo-50 focus:bg-indigo-50'
                        } rounded-lg transition-colors group`}
                      >
                        <div 
                          className={`p-1.5 rounded-md ${
                            theme === 'dark'
                              ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/20 group-hover:from-amber-500/30 group-hover:to-orange-500/30'
                              : 'bg-gradient-to-br from-amber-500/10 to-orange-500/10 group-hover:from-amber-500/20 group-hover:to-orange-500/20'
                          } transition-colors`}
                        >
                          <LifeBuoy
                            size={16}
                            className={
                              theme === 'dark'
                                ? 'text-amber-300 group-hover:text-amber-200'
                                : 'text-amber-700 group-hover:text-amber-800'
                            }
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                            Help & Support
                          </span>
                          <span className={`text-xs ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>
                            Get assistance
                          </span>
                        </div>
                      </DropdownMenuItem>
                    </Link>

                    <DropdownMenuSeparator className={`my-1.5 h-px ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'}`} />

                    <DropdownMenuItem
                      className={`flex gap-2.5 px-3 py-2.5 cursor-pointer ${
                        theme === 'dark'
                          ? 'text-white/90 hover:text-white/100 hover:bg-red-500/10 focus:bg-red-500/10'
                          : 'text-gray-700 hover:text-red-700 hover:bg-red-50 focus:bg-red-50'
                      } rounded-lg transition-colors group`}
                      onClick={handleForLogout}
                    >
                      <div 
                        className={`p-1.5 rounded-md ${
                          theme === 'dark'
                            ? 'bg-gradient-to-br from-red-500/20 to-orange-500/20 group-hover:from-red-500/30 group-hover:to-orange-500/30'
                            : 'bg-gradient-to-br from-red-500/10 to-orange-500/10 group-hover:from-red-500/20 group-hover:to-orange-500/20'
                        } transition-colors`}
                      >
                        <LogOut
                          size={16}
                          className={
                            theme === 'dark'
                              ? 'text-red-300 group-hover:text-red-200'
                              : 'text-red-600 group-hover:text-red-700'
                          }
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className={`text-sm font-medium`}>Sign Out</span>
                        <span className={`text-xs ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>
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
                    className={`${
                      theme === 'dark'
                        ? 'text-white hover:text-white hover:bg-white/10'
                        : 'text-indigo-700 hover:text-indigo-800 hover:bg-indigo-50'
                    } transition-all duration-300 hover:scale-105`}
                  >
                    Log In
                  </Button>
                </Link>

                <Link href="/register">
                  <Button 
                    className={`relative overflow-hidden ${
                      theme === 'dark'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-purple-500/20 hover:shadow-purple-500/30'
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-indigo-500/20 hover:shadow-indigo-500/30'
                    } text-white shadow-md hover:shadow-lg transition-all duration-300 border-0 hover:scale-105`}
                  >
                    <span 
                      className={`absolute inset-0 w-full h-full bg-gradient-to-r ${
                        theme === 'dark'
                          ? 'from-purple-600 to-pink-600'
                          : 'from-indigo-600 to-purple-600'
                      } animate-gradient-x [animation-duration:3s]`}
                    ></span>
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
                  className={`group rounded-full h-9 w-9 relative overflow-hidden p-0 ${
                    theme === 'dark'
                      ? 'hover:bg-white/10'
                      : 'hover:bg-indigo-100'
                  }`}
                >
                  <span 
                    className={`absolute inset-0 rounded-full ${
                      theme === 'dark'
                        ? 'bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/20 group-hover:to-pink-500/20'
                        : 'bg-gradient-to-r from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/20 group-hover:to-purple-500/20'
                    } transform transition-all duration-300`}
                  ></span>

                  {theme === 'dark' ? (
                    <Sun className="h-8 w-8 text-yellow-600 group-hover:text-yellow-100 group-hover:rotate-45 transition-all duration-300" />
                  ) : (
                    <Moon className="h-8 w-8 text-indigo-700 group-hover:text-indigo-500 group-hover:-rotate-45 transition-all duration-300" />
                  )}
                </Button>
              </GlowingTooltip>
            )}
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center gap-2">
          {user && (
            <Avatar 
              className={`w-8 h-8 cursor-pointer border-2 ${
                theme === 'dark' ? 'border-purple-500/30' : 'border-indigo-300'
              }`}
            >
              <AvatarImage src="" />
              <AvatarFallback 
                className={`${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-purple-600 to-pink-600'
                    : 'bg-gradient-to-br from-indigo-600 to-purple-600'
                } text-white`}
              >
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
                <Moon className="h-5 w-5 text-indigo-700" />
              )}
            </Button>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full ${
                  theme === 'dark'
                    ? 'bg-white/5 hover:bg-white/10'
                    : 'bg-indigo-100/30 hover:bg-indigo-100/60'
                } transition-colors`}
              >
                <Menu className={`h-5 w-5 ${theme === 'dark' ? 'text-white' : 'text-indigo-700'}`} />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className={`${
                theme === 'dark'
                  ? 'border-purple-500/20 bg-gradient-to-br from-gray-900/95 via-purple-900/90 to-gray-900/95 text-white'
                  : 'border-indigo-200/40 bg-gradient-to-br from-white/95 via-indigo-50/90 to-white/95 text-gray-800'
              } pt-8 px-6 backdrop-blur-xl`}
            >
              <div className="flex flex-col gap-1 mt-6">
                <Link
                  href="/"
                  className={`flex items-center gap-3 p-3 rounded-xl ${
                    theme === 'dark'
                      ? 'bg-white/5 hover:bg-white/10'
                      : 'bg-indigo-50 hover:bg-indigo-100/80'
                  } transition-colors`}
                >
                  <Home size={18} className={theme === 'dark' ? 'text-white' : 'text-indigo-700'} />
                  <span>Home</span>
                </Link>

                <Link
                  href="/listings"
                  className={`flex items-center gap-3 p-3 rounded-xl ${
                    theme === 'dark'
                      ? 'bg-white/5 hover:bg-white/10'
                      : 'bg-indigo-50 hover:bg-indigo-100/80'
                  } transition-colors`}
                >
                  <ShoppingBag size={18} className={theme === 'dark' ? 'text-white' : 'text-indigo-700'} />
                  <span>Browse Listings</span>
                </Link>

                <Link
                  href="/contact"
                  className={`flex items-center gap-3 p-3 rounded-xl ${
                    theme === 'dark'
                      ? 'bg-white/5 hover:bg-white/10'
                      : 'bg-indigo-50 hover:bg-indigo-100/80'
                  } transition-colors`}
                >
                  <Tag size={18} className={theme === 'dark' ? 'text-white' : 'text-indigo-700'} />
                  <span>Contact</span>
                </Link>

                <Link
                  href="/help"
                  className={`flex items-center gap-3 p-3 rounded-xl ${
                    theme === 'dark'
                      ? 'bg-white/5 hover:bg-white/10'
                      : 'bg-indigo-50 hover:bg-indigo-100/80'
                  } transition-colors`}
                >
                  <LifeBuoy size={18} className={theme === 'dark' ? 'text-white' : 'text-indigo-700'} />
                  <span>Help & Support</span>
                </Link>

                <Link
                  href="/dashboard/user/listings/create-listing"
                  className={`flex items-center gap-3 p-3 rounded-xl ${
                    theme === 'dark'
                      ? 'bg-white/5 hover:bg-white/10'
                      : 'bg-indigo-50 hover:bg-indigo-100/80'
                  } transition-colors`}
                >
                  <PlusCircle size={18} className={theme === 'dark' ? 'text-white' : 'text-indigo-700'} />
                  <span>Post New Listing</span>
                </Link>

                {/* Enhanced mobile wishlist button */}
                <MobileWishlistButton />
              </div>

              <div className="mt-8">
                {user ? (
                  <div className="space-y-3">
                    <div 
                      className={`p-5 rounded-xl ${
                        theme === 'dark'
                          ? 'bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border-white/10'
                          : 'bg-gradient-to-br from-indigo-100/50 to-purple-100/50 border-indigo-200/30'
                      } backdrop-blur-md border flex items-center gap-4`}
                    >
                      <div className="relative">
                        <div 
                          className={`absolute inset-0 rounded-full ${
                            theme === 'dark'
                              ? 'bg-gradient-to-r from-purple-600/70 to-pink-600/70'
                              : 'bg-gradient-to-r from-indigo-500/50 to-purple-500/50'
                          } animate-pulse-slow blur-sm`}
                        ></div>
                        <Avatar 
                          className={`w-14 h-14 border-2 ${
                            theme === 'dark' ? 'border-purple-500/40' : 'border-indigo-300/60'
                          } relative`}
                        >
                          <AvatarImage src="" />
                          <AvatarFallback 
                            className={`${
                              theme === 'dark'
                                ? 'bg-gradient-to-br from-purple-600 to-pink-600'
                                : 'bg-gradient-to-br from-indigo-600 to-purple-600'
                            } text-white text-lg font-medium`}
                          >
                            {name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <motion.p
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`font-medium text-lg ${
                            theme === 'dark'
                              ? 'bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent'
                              : 'bg-gradient-to-r from-indigo-800 to-purple-700 bg-clip-text text-transparent'
                          }`}
                        >
                          {name}
                        </motion.p>
                        <motion.p
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          className={`text-xs ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}
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
                        className={`flex items-center gap-3 p-4 rounded-xl ${
                          theme === 'dark'
                            ? 'bg-gradient-to-r from-purple-900/30 to-violet-900/30 hover:from-purple-900/40 hover:to-violet-900/40 border-white/10 shadow-purple-900/5'
                            : 'bg-gradient-to-r from-indigo-100/50 to-purple-100/50 hover:from-indigo-100/70 hover:to-purple-100/70 border-indigo-200/30 shadow-indigo-900/5'
                        } border transition-colors shadow-lg`}
                      >
                        <div 
                          className={`p-2 rounded-lg ${
                            theme === 'dark'
                              ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20'
                              : 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20'
                          }`}
                        >
                          <User size={20} className={theme === 'dark' ? 'text-purple-300' : 'text-indigo-700'} />
                        </div>
                        <div className="flex flex-col">
                          <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Dashboard</span>
                          <span className={`text-xs ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>
                            View your account
                          </span>
                        </div>
                      </motion.div>
                    </Link>

                    <Link href="/dashboard/user/listings">
                      <motion.div
                        whileHover={{ y: -2 }}
                        whileTap={{ y: 0 }}
                        className={`flex items-center gap-3 p-4 rounded-xl ${
                          theme === 'dark'
                            ? 'bg-gradient-to-r from-blue-900/30 to-cyan-900/30 hover:from-blue-900/40 hover:to-cyan-900/40 border-white/10 shadow-blue-900/5'
                            : 'bg-gradient-to-r from-blue-100/50 to-cyan-100/50 hover:from-blue-100/70 hover:to-cyan-100/70 border-blue-200/30 shadow-blue-900/5'
                        } border transition-colors shadow-lg`}
                      >
                        <div 
                          className={`p-2 rounded-lg ${
                            theme === 'dark'
                              ? 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20'
                              : 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20'
                          }`}
                        >
                          <Package size={20} className={theme === 'dark' ? 'text-blue-300' : 'text-blue-700'} />
                        </div>
                        <div className="flex flex-col">
                          <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>My Listings</span>
                          <span className={`text-xs ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>
                            Manage your items
                          </span>
                        </div>
                      </motion.div>
                    </Link>

                    <motion.button
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 0 }}
                      onClick={handleForLogout}
                      className={`w-full flex items-center gap-3 p-4 rounded-xl ${
                        theme === 'dark'
                          ? 'bg-gradient-to-r from-red-900/20 to-orange-900/20 hover:from-red-900/30 hover:to-orange-900/30 border-red-500/20 shadow-red-900/5'
                          : 'bg-gradient-to-r from-red-100/30 to-orange-100/30 hover:from-red-100/50 hover:to-orange-100/50 border-red-200/30 shadow-red-900/5'
                      } border transition-colors shadow-lg`}
                    >
                      <div 
                        className={`p-2 rounded-lg ${
                          theme === 'dark'
                            ? 'bg-gradient-to-br from-red-500/20 to-orange-500/20'
                            : 'bg-gradient-to-br from-red-500/10 to-orange-500/10'
                        }`}
                      >
                        <LogOut size={20} className={theme === 'dark' ? 'text-red-300' : 'text-red-600'} />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Sign Out</span>
                        <span className={`text-xs ${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}>
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
                        className={`w-full h-14 text-lg ${
                          theme === 'dark'
                            ? 'bg-white/5 hover:bg-white/10 text-white border-white/10'
                            : 'bg-white hover:bg-indigo-50 text-indigo-700 border-indigo-200'
                        }`}
                      >
                        Log In
                      </Button>
                    </Link>

                    <Link href="/register" className="w-full">
                      <Button
                        size="lg"
                        className={`w-full border-0 h-14 text-lg relative overflow-hidden ${
                          theme === 'dark'
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                            : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
                        } text-white`}
                      >
                        {/* Enhanced gradient background */}
                        <span 
                          className={`absolute inset-0 w-full h-full ${
                            theme === 'dark'
                              ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                              : 'bg-gradient-to-r from-indigo-600 to-purple-600'
                          } animate-gradient-x [animation-duration:3s]`}
                        ></span>
                        
                        {/* Improved shimmer effect */}
                        <span className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-[-20deg] transform -translate-x-full animate-shine [animation-duration:3s] [animation-iteration-count:infinite]"></span>
                        
                        {/* Subtle shadow inner glow */}
                        <span 
                          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                            theme === 'dark'
                              ? 'bg-gradient-to-r from-pink-500/20 to-purple-600/20'
                              : 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20'
                          } blur-sm`}
                        ></span>
                        
                        {/* Button text */}
                        <span className="relative font-medium">Sign Up</span>
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