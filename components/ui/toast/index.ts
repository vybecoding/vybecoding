// Re-export Shadcn toast/sonner
export { toast } from 'sonner';
export { Toaster } from '@/components/ui/sonner';

// Export our legacy useToast hook that uses sonner
export { useToast } from './useToast';
export type { ToastType } from './useToast';

// Export legacy components for backward compatibility
export { ToastProvider, ToastContainer } from './legacy';