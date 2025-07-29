import { toast } from 'sonner';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastOptions {
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

export function useToast() {
  const addToast = (options: ToastOptions) => {
    const { type, title, message, duration } = options;
    
    const toastMessage = message ? `${title}\n${message}` : title;
    
    switch (type) {
      case 'success':
        toast.success(toastMessage, { duration });
        break;
      case 'error':
        toast.error(toastMessage, { duration });
        break;
      case 'warning':
        toast.warning(toastMessage, { duration });
        break;
      case 'info':
      default:
        toast.info(toastMessage, { duration });
        break;
    }
  };

  return { addToast };
}