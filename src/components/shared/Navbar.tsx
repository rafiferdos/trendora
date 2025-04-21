'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Menu, Heart, PlusCircle, Sun, Moon, ShoppingBag } from 'lucide-react'
import { useEffect, useState, ReactNode } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

type UserType = { name: string; image?: string }
interface NavbarProps {
  user?: UserType | null
}

function Tooltip({ children, label }: { children: ReactNode; label: string }) {
  return (
    <span className="relative inline-block group">
      {children}
      <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-xs font-medium text-white opacity-0 shadow-sm group-hover:opacity-100 transition-opacity duration-200">
        {label}
      </span>
    </span>
  )
}

export default function Navbar({ user }: NavbarProps) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const NavLink = ({ href, label }: { href: string; label: string }) => (
    <Link
      href={href}
      className={cn(
        'relative group text-sm font-medium px-3 py-2 rounded-md transition-colors',
        pathname === href
          ? 'text-primary bg-primary/10'
          : 'text-muted-foreground hover:text-primary hover:bg-primary/10',
      )}
    >
      <span className="relative z-10">{label}</span>
    </Link>
  )

  const IconLink = ({
    href,
    icon: Icon,
    label,
  }: {
    href: string
    icon: React.FC<React.SVGProps<SVGSVGElement>>
    label: string
  }) => (
    <Tooltip label={label}>
      <Link
        href={href}
        className="relative p-2.5 rounded-full transition-all duration-200 hover:bg-primary/10"
      >
        <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
      </Link>
    </Tooltip>
  )

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-white/70 to-white/30 dark:from-gray-900/70 dark:to-gray-900/30 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <ShoppingBag className="h-7 w-7 text-primary" />
          <span className="text-xl font-extrabold tracking-tight">
            SwapNest
          </span>
        </Link>

        {/* Desktop */}
        <nav className="hidden lg:flex items-center space-x-4">
          <NavLink href="/all-lists" label="All Lists" />
          <IconLink href="/wishlist" icon={Heart} label="Wishlist" />
          <Tooltip label="Ad Post">
            <Link
              href="/post-ad"
              className="flex items-center gap-1 px-3 py-2 rounded-md text-sm transition-colors text-muted-foreground hover:text-primary hover:bg-primary/10"
            >
              <PlusCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Post Ad</span>
            </Link>
          </Tooltip>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Tooltip label="Account">
                  <Avatar className="cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all">
                    <AvatarImage src={user.image} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Tooltip>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log('Logout')}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/register">
              <Button variant="outline" size="sm">
                Sign Up
              </Button>
            </Link>
          )}

          {mounted && (
            <Tooltip label="Toggle theme">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="rounded-full transition-all hover:bg-primary/10"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </Tooltip>
          )}
        </nav>

        {/* Mobile */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Tooltip label="Menu">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-primary/10"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </Tooltip>
            </SheetTrigger>
            <SheetContent side="right" className="pt-8 space-y-4">
              <NavLink href="/ads" label="All Ads" />
              <div className="flex gap-2 my-2">
                <IconLink href="/wishlist" icon={Heart} label="Wishlist" />
                <Tooltip label="Ad Post">
                  <Link
                    href="/post-ad"
                    className="flex items-center gap-2 p-2 rounded-md text-sm text-muted-foreground hover:text-primary hover:bg-primary/10"
                  >
                    <PlusCircle className="h-5 w-5" />
                    <span>Post Ad</span>
                  </Link>
                </Tooltip>
              </div>

              {user ? (
                <div className="space-y-2">
                  <Link
                    href="/dashboard"
                    className="block w-full px-2 py-1.5 text-sm"
                  >
                    Dashboard
                  </Link>
                  <Button
                    onClick={() => console.log('Logout')}
                    variant="outline"
                    className="w-full"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Link href="/register" className="block w-full">
                  <Button variant="outline" size="sm" className="w-full">
                    Sign Up
                  </Button>
                </Link>
              )}

              {mounted && (
                <Button
                  variant="outline"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="w-full"
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun className="h-4 w-4 mr-2" /> Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="h-4 w-4 mr-2" /> Dark Mode
                    </>
                  )}
                </Button>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
