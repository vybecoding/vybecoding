import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { Github, Twitter, Linkedin, Youtube } from 'lucide-react';
import styles from './Footer.module.css';

export interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { label: 'Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Integrations', href: '/integrations' },
      { label: 'Changelog', href: '/changelog' },
    ],
    Company: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
    ],
    Resources: [
      { label: 'Documentation', href: '/docs' },
      { label: 'Guides', href: '/guides' },
      { label: 'API Reference', href: '/api' },
      { label: 'Community', href: '/community' },
    ],
    Legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Security', href: '/security' },
    ],
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/vybecoding', label: 'GitHub' },
    { icon: Twitter, href: 'https://twitter.com/vybecoding', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com/company/vybecoding', label: 'LinkedIn' },
    { icon: Youtube, href: 'https://youtube.com/@vybecoding', label: 'YouTube' },
  ];

  return (
    <footer className={`${styles.footer} ${className}`}>
      <div className={styles.container}>
        {/* Top Section */}
        <div className={styles.top}>
          <div className={styles.brand}>
            <Logo size="lg" />
            <p className={styles.description}>
              Empowering developers to code beyond limits with AI-powered tools and collaborative learning.
            </p>
            <div className={styles.social}>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className={styles.links}>
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className={styles.linkGroup}>
                <h3 className={styles.linkGroupTitle}>{category}</h3>
                <ul className={styles.linkList}>
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className={styles.link}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} VybeCoding. All rights reserved.
          </p>
          <div className={styles.bottomLinks}>
            <Link href="/privacy" className={styles.bottomLink}>
              Privacy
            </Link>
            <Link href="/terms" className={styles.bottomLink}>
              Terms
            </Link>
            <Link href="/cookies" className={styles.bottomLink}>
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};