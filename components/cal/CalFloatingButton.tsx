'use client';

import { getCalApi } from '@calcom/embed-react';
import { useEffect } from 'react';

interface CalFloatingButtonProps {
  calLink: string;
  buttonText?: string;
  buttonPosition?: 'bottom-right' | 'bottom-left';
  buttonColor?: string;
  hideButtonIcon?: boolean;
}

export function CalFloatingButton({
  calLink,
  buttonText = 'Book a meeting',
  buttonPosition = 'bottom-right',
  buttonColor = '#6366f1',
  hideButtonIcon = false,
}: CalFloatingButtonProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      
      // Configure floating button
      cal('floatingButton', {
        calLink,
        buttonText,
        buttonPosition,
        buttonColor,
        hideButtonIcon,
      });

      // Configure UI
      cal('ui', {
        theme: 'auto',
        styles: {
          branding: {
            brandColor: buttonColor,
          },
        },
      });
    })();

    // Cleanup on unmount
    return () => {
      (async function () {
        const cal = await getCalApi();
        // Remove floating button and any Cal.com elements
        const calElements = document.querySelectorAll('[data-cal-namespace], .cal-floating-button, [class*="cal-"], [id*="cal-"]');
        calElements.forEach(element => {
          if (element && element.parentNode) {
            element.remove();
          }
        });
        // Also call destroy
        (cal as any)('destroy');
      })();
    };
  }, [calLink, buttonText, buttonPosition, buttonColor, hideButtonIcon]);

  return null; // The floating button is rendered by Cal.com
}