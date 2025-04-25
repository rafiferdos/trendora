'use client'

import * as React from 'react'
import { ChevronsUpDown, Plus, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string
    logo: React.ElementType
    plan?: string
  }[]
}) {
  const { isMobile } = useSidebar()
  const [activeTeam, setActiveTeam] = React.useState(teams[0])
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false)

  if (!activeTeam) {
    return null
  }

  const gradients = [
    'bg-gradient-to-r from-pink-500 to-purple-600',
    'bg-gradient-to-r from-blue-500 to-cyan-500',
    'bg-gradient-to-r from-emerald-500 to-teal-600',
  ]

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu onOpenChange={(open) => setIsDropdownOpen(open)}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-white/10 data-[state=open]:text-white transition-all duration-300"
            >
              <motion.div
                animate={isDropdownOpen ? { scale: 1.05 } : { scale: 1 }}
                transition={{ duration: 0.2 }}
                className={`flex aspect-square size-8 items-center justify-center rounded-lg ${gradients[0]} text-white shadow-lg shadow-pink-600/20`}
              >
                <activeTeam.logo className="size-4" />
                <motion.span
                  animate={{ opacity: 1, scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
                  className="absolute -top-1 -right-1 flex h-2 w-2"
                >
                  <span className="absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
                </motion.span>
              </motion.div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-white">
                  {activeTeam.name}
                </span>
                {activeTeam.plan && (
                  <span className="truncate text-xs text-white/70 flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-pink-400" />
                    {activeTeam.plan}
                  </span>
                )}
              </div>
              <ChevronsUpDown className="ml-auto text-white/70" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-gradient-to-br from-gray-900/95 via-purple-950/90 to-gray-900/95 backdrop-blur-xl border border-white/10"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-white/70">
              Teams
            </DropdownMenuLabel>
            {teams.map((team, index) => (
              <DropdownMenuItem
                key={team.name}
                onClick={() => setActiveTeam(team)}
                className={`gap-2 p-2 hover:bg-white/10 text-white transition-all duration-200 ${activeTeam.name === team.name ? 'bg-white/10' : ''}`}
              >
                <div
                  className={`flex size-6 items-center justify-center rounded-sm ${gradients[index % gradients.length]} shadow-md`}
                >
                  <team.logo className="size-4 shrink-0 text-white" />
                </div>
                {team.name}
                <DropdownMenuShortcut className="text-white/50">
                  ⌘{index + 1}
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem className="gap-2 p-2 hover:bg-white/10 text-white">
              <div className="flex size-6 items-center justify-center rounded-md bg-gradient-to-r from-blue-500/30 to-cyan-500/30 border border-blue-500/30">
                <Plus className="size-4 text-white" />
              </div>
              <div className="font-medium text-white/80">Add team</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
