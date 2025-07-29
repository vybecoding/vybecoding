'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useUser, UserButton } from '@clerk/nextjs'
import { Menu, X, Bell, Settings, ChevronDown } from 'lucide-react'

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
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="nav-container">
          <div className="nav-content">
            {/* Logo */}
            <Link href="/" className="logo-wrapper">
              <div className="logo-container">
                <div className="logo-gradient-border">
                  <div className="logo-inner">
                    <span className="logo-v">v</span>
                    <span className="logo-slash">/</span>
                    <span className="logo-c">c</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="desktop-nav">
              <div className="nav-items">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="nav-link"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* User Section */}
              <div className="user-section">
                {isSignedIn ? (
                  <>
                    <button className="icon-button">
                      <Bell className="w-5 h-5" />
                    </button>
                    <button className="icon-button">
                      <Settings className="w-5 h-5" />
                    </button>
                    <div className="user-avatar-wrapper">
                      <UserButton afterSignOutUrl="/" />
                    </div>
                  </>
                ) : (
                  <Link href="/sign-in" className="sign-in-button">
                    Sign In
                  </Link>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-button"
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
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu-container">
            <div className="mobile-menu-content">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="mobile-nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {isSignedIn ? (
                <div className="mobile-user-section">
                  <Link href="/notifications" className="mobile-nav-link">
                    Notifications
                  </Link>
                  <Link href="/settings" className="mobile-nav-link">
                    Settings
                  </Link>
                  <Link href="/profile" className="mobile-nav-link">
                    Profile
                  </Link>
                </div>
              ) : (
                <Link
                  href="/sign-in"
                  className="mobile-sign-in-button"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        /* Navigation Container */
        .nav-container {
          background: rgba(26, 26, 26, 0.4);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .nav-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* Logo Styles */
        .logo-wrapper {
          display: flex;
          align-items: center;
          text-decoration: none;
        }

        .logo-container {
          position: relative;
          width: 48px;
          height: 48px;
        }

        .logo-gradient-border {
          position: absolute;
          inset: 0;
          padding: 2px;
          border-radius: 12px;
          background: linear-gradient(135deg, #ff006e, #8338ec, #3a86ff);
          background-size: 400% 400%;
          animation: gradient-shift 8s ease infinite;
        }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .logo-inner {
          background: #1a1a1a;
          border-radius: 10px;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 600;
          color: white;
        }

        .logo-v, .logo-c {
          display: inline-block;
          animation: rotate-letter 8s linear infinite;
        }

        .logo-slash {
          margin: 0 2px;
          color: rgba(255, 255, 255, 0.5);
        }

        @keyframes rotate-letter {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }

        /* Desktop Navigation */
        .desktop-nav {
          display: none;
          align-items: center;
          gap: 48px;
        }

        @media (min-width: 1250px) {
          .desktop-nav {
            display: flex;
          }
        }

        .nav-items {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .nav-link {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
          transition: all 0.2s ease;
          position: relative;
        }

        .nav-link:hover {
          color: white;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, #ff006e, #8338ec);
          transform: scaleX(0);
          transition: transform 0.2s ease;
        }

        .nav-link:hover::after {
          transform: scaleX(1);
        }

        /* User Section */
        .user-section {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .icon-button {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .icon-button:hover {
          background: rgba(255, 255, 255, 0.08);
          color: white;
          transform: translateY(-1px);
        }

        .user-avatar-wrapper {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          overflow: hidden;
          border: 2px solid rgba(255, 255, 255, 0.1);
        }

        .sign-in-button {
          padding: 8px 20px;
          background: linear-gradient(135deg, #ff006e, #8338ec);
          border-radius: 8px;
          color: white;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .sign-in-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(131, 56, 236, 0.4);
        }

        /* Mobile Menu Button */
        .mobile-menu-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: white;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        @media (min-width: 1250px) {
          .mobile-menu-button {
            display: none;
          }
        }

        .mobile-menu-button:hover {
          background: rgba(255, 255, 255, 0.08);
        }

        /* Mobile Menu Overlay */
        .mobile-menu-overlay {
          position: fixed;
          top: 72px;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 49;
        }

        .mobile-menu-container {
          background: rgba(26, 26, 26, 0.9);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 0 0 20px 20px;
          margin: 0 16px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-top: none;
        }

        .mobile-menu-content {
          padding: 24px;
        }

        .mobile-nav-link {
          display: block;
          padding: 16px 0;
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          font-size: 16px;
          font-weight: 500;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.2s ease;
        }

        .mobile-nav-link:hover {
          color: white;
          padding-left: 8px;
        }

        .mobile-user-section {
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .mobile-sign-in-button {
          display: block;
          width: 100%;
          padding: 12px;
          margin-top: 24px;
          background: linear-gradient(135deg, #ff006e, #8338ec);
          border-radius: 10px;
          color: white;
          text-align: center;
          text-decoration: none;
          font-size: 16px;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .mobile-sign-in-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(131, 56, 236, 0.4);
        }
      `}</style>
    </>
  )
}

export default Navigation