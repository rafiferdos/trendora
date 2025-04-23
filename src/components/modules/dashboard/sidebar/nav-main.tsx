"use client"

import { ChevronRight, type LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <SidebarGroup>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
      >
        <SidebarMenu>
          {items.map((menuItem, index) => (
            <motion.div key={menuItem.title} variants={item}>
              <Collapsible
                asChild
                defaultOpen={menuItem.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={menuItem.title}
                      className="text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 data-[active]:bg-gradient-to-r data-[active]:from-purple-600/30 data-[active]:to-pink-600/30 data-[active]:border-l-2 data-[active]:border-l-pink-500"
                    >
                      {menuItem.icon && (
                        <div className="relative">
                          <menuItem.icon className="text-white/70" />
                          {index < 3 && (
                            <span className="absolute -top-1 -right-1 flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
                            </span>
                          )}
                        </div>
                      )}
                      <span className="text-white/90">{menuItem.title}</span>
                      {menuItem.items && menuItem.items.length > 0 && (
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 text-white/70" />
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {menuItem.items && menuItem.items.length > 0 && (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {menuItem.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              className="hover:bg-white/10 text-white/70 hover:text-white data-[active]:text-pink-300 data-[active]:bg-pink-900/20 transition-all duration-200"
                            >
                              <a href={subItem.url}>
                                <span>{subItem.title}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  )}
                </SidebarMenuItem>
              </Collapsible>
            </motion.div>
          ))}
        </SidebarMenu>
      </motion.div>
    </SidebarGroup>
  )
}