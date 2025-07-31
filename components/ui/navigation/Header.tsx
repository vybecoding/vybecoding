'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser, SignInButton } from '@clerk/nextjs';
import { Button } from '../button/Button';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import { UserMenu } from './UserMenu';
import { Menu, Bell } from 'lucide-react';
import styles from './Header.module.css';

export interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);
  const pathname = usePathname();
  const { isSignedIn } = useUser();
  
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/guides', label: 'Guides' },
    { href: '/apps', label: 'Apps' },
    { href: '/members', label: 'Members' },
    { href: '/featured', label: 'Featured' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/pricing', label: 'Pricing' },
  ];

  // Check for overlap between navigation and logo/actions
  useEffect(() => {
    const checkOverlap = () => {
      if (!logoRef.current || !navRef.current || !actionsRef.current) return;

      const logoRect = logoRef.current.getBoundingClientRect();
      const navRect = navRef.current.getBoundingClientRect();
      const actionsRect = actionsRef.current.getBoundingClientRect();

      // Add some buffer space (20px on each side)
      const logoRight = logoRect.right + 20;
      const actionsLeft = actionsRect.left - 20;
      
      // Check if nav would overlap with logo or actions
      const wouldOverlap = navRect.left < logoRight || navRect.right > actionsLeft;
      
      setShowHamburger(wouldOverlap);
    };

    // Check on mount and resize
    checkOverlap();
    window.addEventListener('resize', checkOverlap);
    
    // Also check after a small delay to ensure everything is rendered
    const timer = setTimeout(checkOverlap, 100);

    return () => {
      window.removeEventListener('resize', checkOverlap);
      clearTimeout(timer);
    };
  }, [pathname]); // Re-check when route changes

  return (
    <>
      <header ref={headerRef} className={`${styles.header} ${className}`}>
        <nav className={styles.nav} role="navigation" aria-label="Main navigation">
          <div className={styles.container}>
            <div className={styles.content}>
              {/* Logo */}
              <Link ref={logoRef} href="/" className={styles.logoLink}>
                <Logo size="lg" />
              </Link>

              {/* Desktop Navigation - Hide when hamburger should show */}
              <div 
                ref={navRef} 
                className={styles.desktopNav}
                style={{ visibility: showHamburger ? 'hidden' : 'visible' }}
              >
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`${styles.navLink} ${pathname === item.href ? styles.active : ''}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* User Profile Section */}
              <div ref={actionsRef} className={styles.actions}>
                {/* Dynamic Hamburger Menu - Shows when nav would overlap */}
                {showHamburger && (
                  <button
                    className={`${styles.dynamicMenuButton} hidden md:flex`}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-expanded={mobileMenuOpen}
                    aria-label="Toggle navigation menu"
                  >
                    <Menu className="h-6 w-6" />
                  </button>
                )}
                
                {isSignedIn ? (
                  <>
                    {/* Notifications */}
                    <div className="relative hidden sm:block">
                      <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-vybe-pink rounded-full" />
                      </button>
                    </div>
                    
                    {/* User Menu */}
                    <UserMenu />
                  </>
                ) : (
                  <SignInButton mode="modal">
                    <button className="px-5 py-2.5 rounded-lg text-white text-sm font-medium bg-gradient-to-r from-vybe-purple via-vybe-pink to-vybe-orange hover:shadow-lg hover:shadow-vybe-pink/25 hover:-translate-y-0.5 transition-all duration-300">
                      Sign In
                    </button>
                  </SignInButton>
                )}
                
                {/* Mobile Menu Button - Always visible on mobile */}
                <button
                  className={styles.mobileMenuButton}
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-expanded={mobileMenuOpen}
                  aria-label="Toggle mobile menu"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={navItems}
        isSignedIn={isSignedIn}
      />
    </>
  );
};