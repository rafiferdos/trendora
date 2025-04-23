"use client";

import { AppSidebar } from '@/components/modules/dashboard/sidebar/app-sidebar'
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
import { motion } from 'framer-motion'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="bg-gradient-to-br from-gray-900 via-purple-950 to-violet-900 min-h-screen">
            {/* Background decoration elements */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-emerald-600/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '3s' }}></div>
            </div>

            <SidebarProvider>
                <AppSidebar />
                <SidebarInset className="backdrop-blur-sm">
                    <header
                        className="flex h-16 shrink-0 items-center gap-2 transition-all ease-linear bg-white/5 backdrop-blur-md border-b border-white/10 px-2 group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
                    >
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1 hover:bg-white/10 transition-all" />
                            <Separator orientation="vertical" className="mr-2 h-4 bg-white/20" />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbLink href="#" className="text-white/70 hover:text-white transition-all">
                                            Dashboard
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator className="hidden md:block text-white/40" />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage className="text-white font-medium">SwapNest</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                    </header>
                    <div className="p-4 pt-2">
                        <div className="rounded-xl overflow-hidden">
                            {children}
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </div>
    );
};

export default DashboardLayout