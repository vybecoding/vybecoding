'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  AppWindow, 
  BookOpen, 
  Users, 
  Star,
  User,
  Settings 
} from 'lucide-react'

export interface DashboardTab {
  id: string
  label: string
  href: string
  icon?: React.ElementType
  badge?: string
  disabled?: boolean
}

const primaryTabs: DashboardTab[] = [
  { 
    id: 'review', 
    label: 'Guide Review', 
    href: '/dashboard/review',
    icon: BookOpen
  },
  { 
    id: 'mentorship', 
    label: 'Mentorship', 
    href: '/dashboard/mentorship',
    icon: Users
  },
  { 
    id: 'overview', 
    label: 'Earnings & Analytics', 
    href: '/dashboard/analytics',
    icon: LayoutDashboard,
    badge: 'PRO'
  }
]

const secondaryTabs: DashboardTab[] = [
  { 
    id: 'profile', 
    label: 'Profile', 
    href: '/dashboard/profile',
    icon: User
  },
  { 
    id: 'settings', 
    label: 'Settings', 
    href: '/dashboard/settings',
    icon: Settings
  }
]

export default function DashboardTabs() {
  const pathname = usePathname()

  const isTabActive = (href: string) => {
    if (href === '/dashboard/analytics' && pathname === '/dashboard') return true
    if (pathname.startsWith(href)) return true
    return false
  }

  return (
    <div className="mb-8">
      <div className="flex gap-4 border-b border-white/10 justify-center flex-wrap">
        {/* Primary tabs */}
        {primaryTabs.map((tab) => {
          const Icon = tab.icon
          const isActive = isTabActive(tab.href)
          
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={cn(
                "relative px-6 py-3 font-medium rounded-lg transition-all",
                "hover:bg-white/5",
                isActive && "text-white",
                !isActive && "text-white/60 hover:text-white/80",
                tab.disabled && "opacity-50 cursor-not-allowed pointer-events-none"
              )}
            >
              <span className="flex items-center gap-2">
                {Icon && <Icon className="w-4 h-4" />}
                {tab.label}
                {tab.badge && (
                  <span className="px-2 py-0.5 bg-vybe-pink/20 text-vybe-pink text-xs rounded-full font-medium">
                    {tab.badge}
                  </span>
                )}
              </span>
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-vybe-purple via-vybe-pink to-vybe-orange" />
              )}
            </Link>
          )
        })}
        
        {/* Separator */}
        <div className="w-px h-8 bg-white/10 mx-2 self-center" />
        
        {/* Secondary tabs */}
        {secondaryTabs.map((tab) => {
          const Icon = tab.icon
          const isActive = isTabActive(tab.href)
          
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={cn(
                "relative px-6 py-3 font-medium rounded-lg transition-all",
                "hover:bg-white/5",
                isActive && "text-white",
                !isActive && "text-white/60 hover:text-white/80"
              )}
            >
              <span className="flex items-center gap-2">
                {Icon && <Icon className="w-4 h-4" />}
                {tab.label}
              </span>
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-vybe-purple via-vybe-pink to-vybe-orange" />
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}