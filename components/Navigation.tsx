'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useUser, UserButton } from '@clerk/nextjs'
import { Menu, X, Bell, Settings } from 'lucide-react'

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isSignedIn, user } = useUser()

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Guides', href: '/guides' },
    { label: 'Apps', href: '/apps' },
    { label: 'Members', href: '/members' },
    { label: 'Featured', href: '/featured' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Pricing', href: '/pricing' }
  ]

  return (
    <>
      {/* Main Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-[12px] border-b border-white/8">
        <div className="max-w-[1400px] mx-auto px-6 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative w-12 h-12">
              {/* Animated gradient border */}
              <div className="absolute inset-0 p-0.5 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-gradient-x">
                <div className="bg-[#1a1a1a] rounded-[10px] w-full h-full flex items-center justify-center text-xl font-semibold text-white">
                  <span className="animate-spin-slow">v</span>
                  <span className="text-white/50 mx-0.5">/</span>
                  <span className="animate-spin-slow">c</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-12">
            <div className="flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-white/80 hover:text-white text-[15px] font-medium transition-all duration-200 relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                </Link>
              ))}
            </div>

            {/* User Section */}
            <div className="flex items-center gap-4">
              {isSignedIn ? (
                <>
                  <button className="w-10 h-10 rounded-lg bg-white/5 border border-white/8 text-white/80 hover:bg-white/8 hover:text-white hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center">
                    <Bell className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 rounded-lg bg-white/5 border border-white/8 text-white/80 hover:bg-white/8 hover:text-white hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center">
                    <Settings className="w-5 h-5" />
                  </button>
                  <div className="w-10 h-10 rounded-lg overflow-hidden border-2 border-white/10">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </>
              ) : (
                <Link 
                  href="/sign-in" 
                  className="px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg text-white text-sm font-medium hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden w-10 h-10 rounded-lg bg-white/5 border border-white/8 text-white hover:bg-white/8 transition-all duration-200 flex items-center justify-center"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed top-[72px] left-0 right-0 bottom-0 bg-black/50 z-40 xl:hidden">
          <div className="bg-black/90 backdrop-blur-[20px] mx-4 rounded-b-xl border border-white/8 border-t-0">
            <div className="p-6">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block py-4 text-white/80 hover:text-white hover:pl-2 text-base font-medium border-b border-white/5 last:border-b-0 transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {isSignedIn ? (
                <div className="mt-6 pt-6 border-t border-white/10">
                  <Link href="/notifications" className="block py-4 text-white/80 hover:text-white hover:pl-2 text-base font-medium transition-all duration-200">
                    Notifications
                  </Link>
                  <Link href="/settings" className="block py-4 text-white/80 hover:text-white hover:pl-2 text-base font-medium transition-all duration-200">
                    Settings
                  </Link>
                  <Link href="/profile" className="block py-4 text-white/80 hover:text-white hover:pl-2 text-base font-medium transition-all duration-200">
                    Profile
                  </Link>
                </div>
              ) : (
                <Link
                  href="/sign-in"
                  className="block w-full mt-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg text-white text-center text-base font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navigation