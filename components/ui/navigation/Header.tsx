import React from 'react';
import Link from 'next/link';
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

  const navItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/marketplace', label: 'Marketplace' },
    { href: '/mentorship', label: 'Mentorship' },
    { href: '/community', label: 'Community' },
  ];

  return (
    <>
      <header className={`${styles.header} ${className}`}>
        <nav className={styles.nav} role="navigation" aria-label="Main navigation">
          <div className={styles.container}>
            <div className={styles.content}>
              {/* Logo */}
              <Link href="/" className={styles.logoLink}>
                <Logo />
              </Link>

              {/* Desktop Navigation */}
              <div className={styles.desktopNav}>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={styles.navLink}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Auth Buttons */}
              <div className={styles.actions}>
                <Button variant="ghost" size="sm" className={styles.signIn}>
                  Sign In
                </Button>
                <Button variant="primary" size="sm" className={styles.getStarted}>
                  Get Started
                </Button>
                
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