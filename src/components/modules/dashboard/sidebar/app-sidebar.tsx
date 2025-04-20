"use client"

import * as React from "react"
import {
    AudioWaveform,
    BookOpen,
    PieChart,
    Command,
    GalleryVerticalEnd,
    Settings2,
    SquareTerminal,
} from "lucide-react"


import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import { TeamSwitcher } from "./team-switcher"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"

// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "SwapNest",
            logo: GalleryVerticalEnd,
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "Listings",
            url: "/dashboard/listings",
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "All Listings",
                    url: "/dashboard/listings",
                },
                {
                    title: "Add Listing",
                    url: "/dashboard/listings/add",
                },
                {
                    title: "Edit Listing",
                    url: "/dashboard/listings/edit",
                },
                {
                    title: "Delete Listing",
                    url: "/dashboard/listings/delete",
                },

            ],
        },
        {
            title: "Purchase History",
            url: "/dashboard/purchase-history",
            icon: BookOpen,
        },
        {
            title: "Sales History",
            url: "/dashboard/sales-history",
            icon: PieChart,
        },
        {
            title: "Profile",
            url: "/dashboard/profile",
            icon: Settings2,
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
