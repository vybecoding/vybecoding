'use client';

import Cal, { getCalApi } from '@calcom/embed-react';
import { useEffect } from 'react';

interface CalEmbedProps {
  calLink: string;
  config?: {
    layout?: 'month_view' | 'column_view' | 'week_view';
    theme?: 'light' | 'dark' | 'auto';
    hideEventTypeDetails?: boolean;
    styles?: {
      branding?: {
        brandColor?: string;
      };
    };
  };
  className?: string;
}

export function CalEmbed({ calLink, config, className }: CalEmbedProps) {
  useEffect(() => {
    // Initialize Cal.com embed API
    (async function () {
      const cal = await getCalApi();
      
      // Configure namespace for this embed
      cal('ui', {
        theme: config?.theme || 'auto',
        styles: config?.styles || {
          branding: {
            brandColor: '#6366f1', // Your brand color
          },
        },
        hideEventTypeDetails: config?.hideEventTypeDetails || false,
        layout: config?.layout || 'month_view',
      });
    })();
  }, [config]);

  return (
    <Cal
      calLink={calLink}
      style={{ width: '100%', height: '100%', overflow: 'scroll' }}
      config={config as any}
      className={className}
    />
  );
}