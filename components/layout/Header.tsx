'use client'

import * as React from "react"
import Link from "next/link"
import { GradientText } from "@/components/common/GradientText"
import { cn } from "@/lib/utils"

interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = React.useState(false)

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/guides", label: "Guides" },
    { href: "/apps", label: "Apps" },
    { href: "/members", label: "Members" },
    { href: "/featured", label: "Featured" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/pricing", label: "Pricing" },
  ]

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Element
      const mobileMenu = document.getElementById('mobile-menu')
      const profileDropdown = document.getElementById('profileDropdown')
      
      // Close mobile menu
      if (mobileMenu && !mobileMenu.contains(target) && !target.closest('button')) {
        setMobileMenuOpen(false)
      }
      
      // Close profile dropdown
      if (profileDropdown && !profileDropdown.contains(target) && !target.closest('button[data-profile-toggle]')) {
        setProfileDropdownOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <header role="banner">
      <nav 
        className={cn(
          "glassmorphism fixed top-0 left-0 right-0 z-50 border-b-0",
          className
        )} 
        role="navigation" 
        aria-label="Main navigation"
        style={{ marginRight: 0 }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3 flex-1">
              <div className="relative w-8 h-8" role="img" aria-label="vybecoding animated logo">
                {/* Animated logo: Subtle rotating gradient */}
                <div 
                  className="absolute border-2 border-transparent rounded-lg animate-spin-slow" 
                  style={{ 
                    background: 'conic-gradient(from 0deg, #8a2be2 0deg, #d946a0 120deg, #e96b3a 240deg, #8a2be2 360deg)', 
                    backgroundClip: 'padding-box',
                    top: '-0.2px', 
                    left: '-0.2px', 
                    right: '-0.2px', 
                    bottom: '-0.2px' 
                  }} 
                  aria-hidden="true"
                />
                <div 
                  className="absolute inset-0.5 rounded-md flex items-center justify-center" 
                  style={{ 
                    background: 'rgba(30, 37, 46, 1.0)', 
                    overflow: 'hidden', 
                    perspective: '100px' 
                  }}
                >
                  <div 
                    className="text-lg font-semibold relative z-10 flex items-center justify-center"
                    style={{ 
                      width: '24px', 
                      height: '24px', 
                      transformStyle: 'preserve-3d',
                      animation: 'letterRotate 14s linear infinite' 
                    }}
                  >
                    <span 
                      className="text-white leading-none absolute inset-0 flex items-center justify-center" 
                      style={{ 
                        transform: 'rotateY(0deg) translateZ(0px) translateX(0.4px) translateY(-2.0px)', 
                        backfaceVisibility: 'hidden' 
                      }} 
                      aria-hidden="true"
                    >
                      v
                    </span>
                    <span 
                      className="text-white leading-none absolute inset-0 flex items-center justify-center" 
                      style={{ 
                        transform: 'rotateY(180deg) translateZ(0px) translateX(0.4px) translateY(-2.0px)', 
                        backfaceVisibility: 'hidden' 
                      }} 
                      aria-hidden="true"
                    >
                      c
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Logo section */}
              <Link href="/" className="flex items-center" aria-label="vybecoding.ai - Go to homepage">
                <div className="flex flex-col">
                  <GradientText variant="logo" className="text-xl font-semibold">
                    vybecoding.ai
                  </GradientText>
                  <div className="text-xs font-mono tracking-normal">
                    <span className="text-white">code beyond limits</span>
                  </div>
                </div>
                <span 
                  className="px-2 py-0.5 bg-vybe-pink/20 text-vybe-pink text-xs font-medium rounded-full border border-vybe-pink/30 ml-2" 
                  role="status" 
                  aria-label="Beta version"
                >
                  BETA
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <ul 
              className="flex items-center justify-center space-x-0 sm:space-x-0.5 md:space-x-1 lg:space-x-2 xl:space-x-4 2xl:space-x-6 desktop-nav" 
              role="menubar" 
              aria-label="Main menu"
            >
              {navItems.map((item) => (
                <li key={item.href} role="none">
                  <Link
                    href={item.href}
                    className="nav-item"
                    role="menuitem"
                    aria-current={item.href === "/" ? "page" : undefined}
                  >
                    <span className="nav-text">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* User Menu (Right) */}
            <div className="flex items-center justify-end space-x-4 desktop-user-section flex-1">
              {/* Notifications Icon */}
              <div className="relative group">
                <button 
                  className="relative p-2 text-gray-400 hover:text-white transition-colors" 
                  aria-label="Notifications" 
                  aria-describedby="notification-status"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                  </svg>
                  <span 
                    className="absolute top-1 right-1 w-2 h-2 bg-vybe-pink rounded-full" 
                    id="notification-status" 
                    aria-label="New notifications available"
                  />
                </button>
              </div>
              
              {/* User Avatar */}
              <div className="relative">
                <button 
                  className="flex items-center gap-2 p-1 rounded-lg hover:bg-vybe-gray-800/50 transition-colors" 
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  data-profile-toggle
                  aria-label="User menu" 
                  aria-expanded={profileDropdownOpen} 
                  aria-haspopup="menu"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-vybe-purple to-vybe-pink rounded-full" aria-hidden="true" />
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                
                <div 
                  id="profileDropdown" 
                  className={cn(
                    "absolute top-full right-0 mt-2 w-56 bg-vybe-midnight border border-vybe-gray-800 rounded-lg py-2 z-50 shadow-xl",
                    profileDropdownOpen ? "block" : "hidden"
                  )}
                >
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-vybe-gray-700">
                    <div className="text-base font-medium text-white">Alex Developer</div>
                    <div className="text-sm text-vybe-gray-400">@alexdev</div>
                    <div className="text-xs text-vybe-gray-500 mt-1">alex.developer@email.com</div>
                  </div>
                  
                  {/* Menu Items */}
                  <div className="py-2">
                    <Link 
                      href="/dashboard" 
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-vybe-gray-800/50 hover:text-white transition-colors"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                      </svg>
                      Settings
                    </Link>
                  </div>
                  
                  {/* Sign Out */}
                  <div className="border-t border-vybe-gray-700 pt-2">
                    <button 
                      onClick={() => setProfileDropdownOpen(false)} 
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-vybe-gray-800/50 hover:text-red-400 transition-colors"
                    >
                      <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16,17 21,12 16,7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                      </svg>
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button Container */}
            <div className="relative mobile-menu-wrapper" style={{ display: 'none' }}>
              <button 
                className="mobile-menu-button p-2 text-gray-400 hover:text-white transition-colors" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen} 
                aria-controls="mobile-menu" 
                aria-label="Toggle navigation menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
              
              {/* Mobile Menu Dropdown */}
              <div 
                id="mobile-menu" 
                className={cn(
                  "absolute top-full right-0 mt-2 w-56 rounded-lg py-2 z-50",
                  "bg-vybe-midnight/95 backdrop-blur-lg border border-white/10",
                  mobileMenuOpen ? "block" : "hidden"
                )}
                role="navigation" 
                aria-label="Mobile navigation menu"
              >
                {/* Main Navigation */}
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 text-sm text-white font-semibold hover:text-vybe-pink"
                    role="menuitem"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                
                <Link
                  href="/dashboard/settings"
                  className="block px-4 py-2 text-sm text-white font-semibold hover:text-vybe-pink"
                  role="menuitem"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Settings
                  <svg className="w-4 h-4 inline ml-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                  </svg>
                </Link>
                
                {/* Auth */}
                <div className="border-t border-vybe-gray-700 my-2"></div>
                <Link 
                  href="/sign-in" 
                  className="block px-4 py-2 text-sm text-white font-semibold hover:text-vybe-pink"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <button 
                  className="block w-full text-left px-4 py-2 text-sm text-white font-semibold hover:text-vybe-pink"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}