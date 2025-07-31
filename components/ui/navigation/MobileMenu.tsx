import React from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { UserButton, SignInButton } from '@clerk/nextjs';
import { Button } from '../button/Button';
import styles from './MobileMenu.module.css';

export interface NavItem {
  href: string;
  label: string;
}

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  isSignedIn?: boolean;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navItems,
  isSignedIn = false,
}) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div 
        className={styles.menu} 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <div className={styles.header}>
          <h2 className={styles.title}>Menu</h2>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.navLink}
              onClick={onClose}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          {isSignedIn ? (
            <>
              <Link
                href="/profile"
                className={styles.navLink}
                onClick={onClose}
              >
                Profile
              </Link>
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-vybe-purple/30 mx-auto [&_img]:w-full [&_img]:h-full [&_img]:object-cover">
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
              <button className="w-full px-5 py-2.5 rounded-lg text-white text-sm font-medium bg-gradient-to-r from-vybe-purple via-vybe-pink to-vybe-orange hover:shadow-lg hover:shadow-vybe-pink/25 transition-all duration-300">
                Sign In
              </button>
            </SignInButton>
          )}
        </div>
      </div>
    </div>
  );
};