'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUser, UserButton } from '@clerk/nextjs'
import { Menu, X, Bell } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isSignedIn } = useUser()
  const pathname = usePathname()

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Guides', href: '/guides' },
    { label: 'Apps', href: '/apps' },
    { label: 'Members', href: '/members' },
    { label: 'Featured', href: '/featured' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Pricing', href: '/pricing' }
  ]

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  return (
    <>
      {/* Main Navigation - Demo Accurate */}
      <nav className="glassmorphism fixed top-0 left-0 right-0 z-50" role="navigation" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center gap-3 flex-1">
              {/* Animated Logo Icon */}
              <div className="relative w-8 h-8" role="img" aria-label="vybecoding animated logo">
                <div 
                  className="absolute inset-0 rounded-lg animate-spin-slow"
                  style={{
                    background: 'conic-gradient(from 0deg, #8a2be2 0deg, #d946a0 120deg, #e96b3a 240deg, #8a2be2 360deg)',
                    padding: '2px'
                  }}
                >
                  <div className="bg-vybe-shadow rounded-md w-full h-full flex items-center justify-center">
                    <div className="text-lg font-semibold text-white">
                      v<span className="text-white/50 mx-0.5">/</span>c
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Logo Text */}
              <Link href="/" className="flex items-center">
                <div className="flex flex-col">
                  <span className="text-xl font-semibold gradient-text">vybecoding.ai</span>
                  <div className="text-xs font-mono tracking-normal text-white">
                    code beyond limits
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-vybe-pink/20 text-vybe-pink text-xs font-medium rounded-full border border-vybe-pink/30 ml-2">
                  BETA
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <ul className="hidden xl:flex items-center justify-center space-x-6" role="menubar">
              {navItems.map((item) => (
                <li key={item.label} role="none">
                  <Link
                    href={item.href}
                    className={cn(
                      "nav-item px-4 py-2 text-sm font-medium transition-all duration-200 relative",
                      "text-white/80 hover:text-white",
                      pathname === item.href && "text-white"
                    )}
                    role="menuitem"
                    aria-current={pathname === item.href ? 'page' : undefined}
                  >
                    <span className="nav-text">{item.label}</span>
                    {pathname === item.href && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-vybe-purple via-vybe-pink to-vybe-orange"
                        layoutId="navbar-indicator"
                        transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            {/* User Section */}
            <div className="hidden xl:flex items-center justify-end space-x-4 flex-1">
              {isSignedIn ? (
                <>
                  {/* Notifications */}
                  <div className="relative group">
                    <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                      <Bell className="w-5 h-5" />
                      <span className="absolute top-1 right-1 w-2 h-2 bg-vybe-pink rounded-full" />
                    </button>
                  </div>
                  
                  {/* User Button */}
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-vybe-purple/30 hover:border-vybe-purple/50 transition-colors">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </>
              ) : (
                <Link 
                  href="/sign-in" 
                  className={cn(
                    "px-5 py-2.5 rounded-lg text-white text-sm font-medium",
                    "bg-gradient-to-r from-vybe-purple via-vybe-pink to-vybe-orange",
                    "hover:shadow-lg hover:shadow-vybe-pink/25 hover:-translate-y-0.5",
                    "transition-all duration-300"
                  )}
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all duration-200 flex items-center justify-center"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40 xl:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Menu Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-vybe-dark/95 backdrop-blur-xl z-50 xl:hidden border-l border-white/10"
            >
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <span className="text-lg font-semibold gradient-text">Menu</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Mobile Menu Items */}
              <nav className="p-6">
                <ul className="space-y-1">
                  {navItems.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className={cn(
                          "block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200",
                          pathname === item.href
                            ? "bg-vybe-purple/20 text-white"
                            : "text-white/70 hover:text-white hover:bg-white/5"
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                
                {/* Mobile User Section */}
                <div className="mt-8 pt-8 border-t border-white/10">
                  {isSignedIn ? (
                    <div className="space-y-4">
                      <Link
                        href="/notifications"
                        className="block px-4 py-3 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all"
                      >
                        Notifications
                      </Link>
                      <Link
                        href="/profile"
                        className="block px-4 py-3 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all"
                      >
                        Profile
                      </Link>
                    </div>
                  ) : (
                    <Link
                      href="/sign-in"
                      className="block w-full px-5 py-3 bg-gradient-to-r from-vybe-purple via-vybe-pink to-vybe-orange rounded-lg text-white text-center font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                  )}
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navigation