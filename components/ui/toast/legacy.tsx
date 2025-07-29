// Legacy components for backward compatibility
import React from 'react';
import { Toaster } from '@/components/ui/sonner';

// Empty provider since Sonner doesn't need one
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

// ToastContainer is replaced by Sonner's Toaster
export const ToastContainer = Toaster;