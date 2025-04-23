import * as React from 'react'
import {
  AudioWaveform,
  BookOpen,
  PieChart,
  Command,
  Settings2,
  GalleryVerticalEnd,
  SquareTerminal,
  Home,
  ShoppingCart,
  Heart,
  Package
} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { TeamSwitcher } from './team-switcher'
import { NavMain } from './nav-main'
import { NavUser } from './nav-user'
import { motion } from 'framer-motion'

// Updated data with more vibrant icons and options
const data = {
  user: {
    name: 'SwapNest User',
    email: 'user@swapnest.com',
    avatar: '/avatars/user.jpg',
  },
  teams: [
    {
      name: 'SwapNest',
      logo: GalleryVerticalEnd,
      plan: 'Pro',
    },
    {
      name: 'Market Hub',
      logo: ShoppingCart,
      plan: 'Business',
    },
    {
      name: 'Trading Co.',
      logo: Command,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: Home,
      isActive: true,
    },
    {
      title: 'Listings',
      url: '/dashboard/user/listings',
      icon: Package,
      isActive: true,
      items: [
        {
          title: 'All Listings',
          url: '/dashboard/user/listings',
        },
        {
          title: 'Create New',
          url: '/dashboard/user/listings/create-listing',
        },
      ]
    },
    {
      title: 'Purchase History',
      url: '/dashboard/purchase-history',
      icon: ShoppingCart,
    },
    {
      title: "API Reference",
      url: "#",
      items: [
        {
          title: "Components",
          url: "#",
        },
        {
          title: "File Conventions",
          url: "#",
        },
        {
          title: "Functions",
          url: "#",
        },
        {
          title: "next.config.js Options",
          url: "#",
        },
        {
          title: "CLI",
          url: "#",
        },
        {
          title: "Edge Runtime",
          url: "#",
        },
      ],
    },
    {
      title: 'Wishlist',
      url: '/dashboard/wishlist',
      icon: Heart,
    },
    {
      title: 'Settings',
      url: '/dashboard/settings',
      icon: Settings2,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      className="bg-gradient-to-b from-gray-900/80 to-purple-950/80 backdrop-blur-xl border-r border-white/10"
      {...props}
    >
      <SidebarHeader className="border-b border-white/10 pb-2">
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="border-t border-white/10 pt-2">
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail className="bg-white/5 backdrop-blur-xl" />
    </Sidebar>
  )
}