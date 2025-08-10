"use client"

import type * as React from "react"
import {
  Calendar,
  Home,
  Inbox,
  Settings,
  BookOpen,
  Users,
  FileText,
  Folder,
  List,
  Bell,
  Heart,
  PlayCircle,
  Search,
  Sparkles,
  HelpCircle,
  UserPlus,
  BarChart3,
  Tag,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { SearchForm } from "./forms/search-form"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Main navigation items
const mainNavItems = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Notifications",
    url: "/notifications",
    icon: Bell,
  },
  {
    title: "Mangás",
    url: "/mangas",
    icon: Bell,
  },
  {
    title: "Wallpapers",
    url: "/wallpapers",
    icon: Calendar,
  },
  {
    title: "Playlists",
    url: "/playlists",
    icon: List,
  },
  {
    title: "Tags",
    url: "/tags",
    icon: Tag,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

// Other navigation items
const otherNavItems = [
  {
    title: "Documentation",
    url: "/documentation",
    icon: FileText,
  },
  {
    title: "Refer a Friend",
    url: "/refer",
    icon: UserPlus,
  },
  {
    title: "Inbox",
    url: "/inbox",
    icon: Inbox,
  },
  {
    title: "Support",
    url: "/support",
    icon: HelpCircle,
  },
]

export function AppSidebar() {
  const { user, logout } = useAuth()
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">S2</span>
          </div>
          <span className="text-white font-semibold text-lg">S2Mangás</span>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input 
            placeholder="Search..." 
            className="pl-10 text-white placeholder-gray-400 focus:border-gray-600"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <kbd className="px-2 py-1 text-xs bg-primary-700 text-gray-300 rounded">⌘</kbd>
            <kbd className="px-2 py-1 text-xs bg-primary-700 text-gray-300 rounded ml-1">F</kbd>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className="text-gray-300 hover:text-white hover:bg-gray-800 data-[active=true]:bg-blue-600 data-[active=true]:text-white"
                  >
                    <a href={item.url} className="flex items-center gap-3 px-3 py-2 rounded-lg">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Other Section */}
        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-2">
            OTHER
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {otherNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className="text-gray-300 hover:text-white hover:bg-gray-800"
                  >
                    <a href={item.url} className="flex items-center gap-3 px-3 py-2 rounded-lg">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="text-gray-300 hover:text-white hover:bg-gray-800">
                  <div className="flex items-center gap-3 w-full">
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                      <UserIcon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-sm font-medium text-white">
                        {user?.username || "Damir S."}
                      </div>
                      <div className="text-xs text-gray-400">
                        {user?.email || "damirschdev@gmail.com"}
                      </div>
                    </div>
                    <ChevronUp className="w-4 h-4 text-gray-400" />
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                side="top" 
                className="w-[--radix-popper-anchor-width] bg-gray-800 border-gray-700"
              >
                <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={logout}
                  className="text-gray-300 hover:text-white hover:bg-gray-700"
                >
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

function UserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
