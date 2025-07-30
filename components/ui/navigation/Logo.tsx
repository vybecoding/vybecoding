import React from 'react';
import styles from './Logo.module.css';

export interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'md',
  showText = true 
}) => {
  const sizeClasses = {
    sm: styles.sm,
    md: styles.md,
    lg: styles.lg,
  };

  return (
    <div className={`${styles.logo} ${sizeClasses[size]}`}>
      <div className={styles.icon} role="img" aria-label="vybecoding animated logo">
        <div className={styles.gradient} aria-hidden="true" />
        <div className={styles.inner}>
          <div className={styles.letter}>
            <span className={styles.v} data-letter="v" aria-hidden="true">v</span>
            <span className={styles.c} data-letter="c" aria-hidden="true">c</span>
          </div>
        </div>
      </div>
      
      {showText && (
        <div className="flex items-center">
          <div className={styles.text}>
            <span className={styles.name}>vybecoding.ai</span>
            <div className="text-xs font-mono tracking-normal">
              <span className="text-white">code beyond limits</span>
            </div>
          </div>
          <span className="px-2 py-0.5 bg-vybe-pink/20 text-vybe-pink text-xs font-medium rounded-full border border-vybe-pink/30 ml-2" role="status" aria-label="Beta version">BETA</span>
        </div>
      )}
    </div>
  );
};