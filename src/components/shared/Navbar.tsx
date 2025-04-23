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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

type UserType = { name: string; image?: string }
interface NavbarProps {
  user?: UserType | null
}

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

export default function Navbar({ user }: NavbarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // State for wishlist animation
  const [lastWishlistClick, setLastWishlistClick] = useState<number | null>(
    null,
  )

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
    href,
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
        router.push('/wishlist')
      }, 600)
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
            <Heart
              fill={isLiked ? '#ec4899' : 'none'}
              className={`h-5 w-5 transition-all duration-300
                ${isLiked ? 'text-pink-500' : 'text-gray-300 group-hover:text-white'}`}
            />
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
        href="/wishlist"
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
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="group-hover:scale-110 transition-transform duration-300"
              >
                <path
                  d="M12 2L19 6V18L12 22L5 18V6L12 2Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-100 group-hover:from-white group-hover:via-pink-200 group-hover:to-purple-100 bg-clip-text text-transparent transition-all duration-300">
              SwapNest
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-2">
          <NavLink href="/all-lists" label="Browse" />
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
                  <button className="group relative p-1 rounded-full overflow-hidden hover:scale-105 transition-all duration-300">
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 group-hover:animate-ping transform transition-all duration-300"></span>
                    <Avatar className="w-8 h-8 cursor-pointer ring-2 ring-purple-500/30 group-hover:ring-purple-500/50 transition-all">
                      <AvatarImage src={user.image} />
                      <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-white font-medium">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 overflow-hidden border-purple-500/20 bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl text-white shadow-xl shadow-purple-500/10"
                >
                  <div className="flex items-center gap-2 p-3 border-b border-white/10">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={user.image} />
                      <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-white">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-sm font-medium text-white truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        user@example.com
                      </p>
                    </div>
                  </div>

                  <div className="p-1">
                    <DropdownMenuItem
                      asChild
                      className="flex gap-2 px-3 py-2 cursor-pointer hover:bg-white/10 focus:bg-white/10 rounded-lg transition-colors"
                    >
                      <Link
                        href="/dashboard"
                        className="flex gap-2 items-center w-full"
                      >
                        <User size={16} />
                        <span>My Account</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      asChild
                      className="flex gap-2 px-3 py-2 cursor-pointer hover:bg-white/10 focus:bg-white/10 rounded-lg transition-colors"
                    >
                      <Link
                        href="/dashboard/listings"
                        className="flex gap-2 items-center w-full"
                      >
                        <Package size={16} />
                        <span>My Listings</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="my-1 h-px bg-white/10" />

                    <DropdownMenuItem
                      className="flex gap-2 px-3 py-2 cursor-pointer text-red-400 hover:text-red-300 hover:bg-red-500/10 focus:bg-red-500/10 rounded-lg transition-colors"
                      onClick={() => console.log('Logout')}
                    >
                      <LogOut size={16} />
                      <span>Log Out</span>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:text-white hover:bg-white/10"
                  >
                    Log In
                  </Button>
                </Link>

                <Link href="/register">
                  <Button className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md shadow-purple-500/20 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 border-0">
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 animate-gradient-x [animation-duration:3s]"></span>
                    <span className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-[-20deg] transform -translate-x-full group-hover:duration-1000 duration-1000 transition-transform group-hover:translate-x-[200%]"></span>
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
                    <Sun className="h-5 w-5 text-yellow-200 group-hover:text-yellow-100 group-hover:rotate-45 transition-all duration-300" />
                  ) : (
                    <Moon className="h-5 w-5 text-purple-200 group-hover:text-white group-hover:-rotate-45 transition-all duration-300" />
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
              <AvatarImage src={user.image} />
              <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-white">
                {user.name.charAt(0)}
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
                  href="/all-lists"
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
                    <div className="p-4 rounded-xl bg-white/5 flex items-center gap-3">
                      <Avatar className="w-10 h-10 border-2 border-purple-500/30">
                        <AvatarImage src={user.image} />
                        <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-white">
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-gray-400">
                          user@example.com
                        </p>
                      </div>
                    </div>

                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors w-full"
                    >
                      <User size={18} />
                      <span>My Account</span>
                    </Link>

                    <Button
                      onClick={() => console.log('Logout')}
                      variant="ghost"
                      className="w-full justify-start gap-3 p-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
                    >
                      <LogOut size={18} />
                      <span>Log Out</span>
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-3">
                    <Link href="/login" className="w-full">
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full bg-white/5 hover:bg-white/10 text-white border-white/10"
                      >
                        Log In
                      </Button>
                    </Link>

                    <Link href="/register" className="w-full">
                      <Button
                        size="lg"
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}

                {mounted && (
                  <Button
                    variant="ghost"
                    onClick={() =>
                      setTheme(theme === 'dark' ? 'light' : 'dark')
                    }
                    className="w-full justify-start gap-3 mt-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    {theme === 'dark' ? (
                      <>
                        <Sun className="h-5 w-5 text-yellow-200" />
                        <span>Switch to Light Mode</span>
                      </>
                    ) : (
                      <>
                        <Moon className="h-5 w-5" />
                        <span>Switch to Dark Mode</span>
                      </>
                    )}
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
