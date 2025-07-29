'use client';

import React from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import styles from './Toast.module.css';
import type { Toast as ToastType } from './ToastContext';

const toastVariants = cva(
  styles.toast,
  {
    variants: {
      type: {
        success: styles.success,
        error: styles.error,
        warning: styles.warning,
        info: styles.info,
      },
    },
    defaultVariants: {
      type: 'info',
    },
  }
);

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

export interface ToastProps extends ToastType {
  onClose: () => void;
}

export function Toast({ type, title, message, onClose }: ToastProps) {
  const Icon = icons[type];

  return (
    <div className={toastVariants({ type })}>
      <div className={styles.iconWrapper}>
        <Icon size={20} />
      </div>
      <div className={styles.content}>
        <h4 className={styles.title}>{title}</h4>
        {message && <p className={styles.message}>{message}</p>}
      </div>
      <button
        onClick={onClose}
        className={styles.closeButton}
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
    </div>
  );
}