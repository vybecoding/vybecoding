'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../button/Button';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import { Menu } from 'lucide-react';
import styles from './Header.module.css';

export interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

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

              {/* User Profile Section (like demo) */}
              <div className={styles.actions}>
                {/* User Avatar/Profile */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-vybe-purple to-vybe-orange flex items-center justify-center">
                    <span className="text-white text-sm font-bold">U</span>
                  </div>
                  <span className="text-white text-sm font-medium hidden sm:block">User</span>
                </div>
                
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
      />
    </>
  );
};