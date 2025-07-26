'use client';

import { getCalApi } from '@calcom/embed-react';
import { useEffect } from 'react';

interface CalButtonProps {
  calLink: string;
  buttonText?: string;
  className?: string;
  price?: number;
  currency?: string;
}

export function CalButton({ 
  calLink, 
  buttonText = 'Book a Call', 
  className = '',
  price,
  currency = 'USD'
}: CalButtonProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      // Pre-load the modal
      cal('preload', { calLink });
    })();
  }, [calLink]);

  const handleClick = async () => {
    const cal = await getCalApi();
    
    // Open Cal.com in a modal
    cal('modal', {
      calLink,
      config: {
        theme: 'auto',
        styles: {
          branding: {
            brandColor: '#6366f1',
          },
        },
      },
    });
  };

  return (
    <button
      data-cal-link={calLink}
      data-cal-config='{"layout":"month_view","theme":"auto"}'
      onClick={handleClick}
      className={`bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors ${className}`}
    >
      {buttonText}
      {price && (
        <span className="ml-2 text-sm opacity-90">
          ({currency} {price})
        </span>
      )}
    </button>
  );
}