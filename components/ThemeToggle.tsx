'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  size = 'md',
  showLabel = false,
}) => {
  const { theme, toggleTheme } = useTheme();

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSize = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative rounded-lg
        bg-background-secondary hover:bg-background-tertiary
        border border-border hover:border-gray-steel
        transition-all duration-300 ease-in-out
        flex items-center justify-center gap-2
        group
        ${sizeClasses[size]}
        ${showLabel ? 'px-4' : ''}
        ${className}
      `}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      {/* Sun icon for light mode */}
      <svg
        width={iconSize[size]}
        height={iconSize[size]}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          absolute transition-all duration-300
          ${theme === 'dark' 
            ? 'opacity-0 rotate-180 scale-0' 
            : 'opacity-100 rotate-0 scale-100'
          }
          text-orange-DEFAULT group-hover:text-orange-amber
        `}
      >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>

      {/* Moon icon for dark mode */}
      <svg
        width={iconSize[size]}
        height={iconSize[size]}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          absolute transition-all duration-300
          ${theme === 'dark' 
            ? 'opacity-100 rotate-0 scale-100' 
            : 'opacity-0 -rotate-180 scale-0'
          }
          text-purple-DEFAULT group-hover:text-purple-light
        `}
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>

      {showLabel && (
        <span className="text-foreground-secondary group-hover:text-foreground ml-8">
          {theme === 'dark' ? 'Dark' : 'Light'}
        </span>
      )}
    </button>
  );
};

// Alternative toggle with switch design
export const ThemeSwitch: React.FC<ThemeToggleProps> = ({
  className = '',
  showLabel = false,
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {showLabel && (
        <span className="text-sm text-foreground-secondary">
          {theme === 'dark' ? 'Dark' : 'Light'} Mode
        </span>
      )}
      <button
        onClick={toggleTheme}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full
          bg-background-tertiary border border-border
          transition-all duration-300 ease-in-out
          hover:border-gray-steel
          focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2
          focus:ring-offset-background
        `}
        role="switch"
        aria-checked={theme === 'dark'}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      >
        <span
          className={`
            inline-block h-4 w-4 transform rounded-full
            bg-gradient-to-r
            transition-all duration-300 ease-in-out
            ${theme === 'dark' 
              ? 'translate-x-6 from-purple-DEFAULT to-purple-light shadow-glow-purple' 
              : 'translate-x-1 from-orange-DEFAULT to-orange-amber shadow-glow-orange'
            }
          `}
        />
        
        {/* Icons inside the switch */}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`
            absolute left-1 transition-opacity duration-300
            ${theme === 'dark' ? 'opacity-0' : 'opacity-100'}
            text-orange-DEFAULT
          `}
        >
          <circle cx="12" cy="12" r="5" />
        </svg>
        
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`
            absolute right-1 transition-opacity duration-300
            ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}
            text-purple-DEFAULT
          `}
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </button>
    </div>
  );
};