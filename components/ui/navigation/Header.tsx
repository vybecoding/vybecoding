'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser, UserButton, SignInButton } from '@clerk/nextjs';
import { Button } from '../button/Button';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import { Menu, Bell } from 'lucide-react';
import styles from './Header.module.css';

export interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const { isSignedIn } = useUser();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/guides', label: 'Guides' },
    { href: '/apps', label: 'Apps' },
    { href: '/members', label: 'Members' },
    { href: '/featured', label: 'Featured' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/pricing', label: 'Pricing' },
  ];

  return (
    <>
      <header className={`${styles.header} ${className}`}>
        <nav className={styles.nav} role="navigation" aria-label="Main navigation">
          <div className={styles.container}>
            <div className={styles.content}>
              {/* Logo */}
              <Link href="/" className={styles.logoLink}>
                <Logo size="lg" />
              </Link>

              {/* Desktop Navigation */}
              <div className={styles.desktopNav}>
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
              <div className={styles.actions}>
                {isSignedIn ? (
                  <>
                    {/* Notifications */}
                    <div className="relative hidden sm:block">
                      <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-vybe-pink rounded-full" />
                      </button>
                    </div>
                    
                    {/* User Button */}
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-vybe-purple/30 hover:border-vybe-purple/50 transition-colors [&_img]:w-full [&_img]:h-full [&_img]:object-cover">
                      <UserButton 
                        afterSignOutUrl="/" 
                        appearance={{
                          elements: {
                            avatarBox: "w-full h-full",
                            userButtonAvatarBox: "w-full h-full"
                          }
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <SignInButton mode="modal">
                    <button className="px-5 py-2.5 rounded-lg text-white text-sm font-medium bg-gradient-to-r from-vybe-purple via-vybe-pink to-vybe-orange hover:shadow-lg hover:shadow-vybe-pink/25 hover:-translate-y-0.5 transition-all duration-300">
                      Sign In
                    </button>
                  </SignInButton>
                )}
                
                {/* Mobile Menu Button */}
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