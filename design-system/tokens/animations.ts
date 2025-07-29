/**
 * Animation Tokens
 * Durations, easings, and keyframes
 */

export const duration = {
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
  slower: '750ms',
} as const;

export const easing = {
  linear: 'linear',
  in: 'cubic-bezier(0.4, 0, 1, 1)',
  out: 'cubic-bezier(0, 0, 0.2, 1)',
  inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const;

export const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modalBackdrop: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
  toast: 80,
  maximum: 9999,
} as const;

export type DurationKey = keyof typeof duration;
export type EasingKey = keyof typeof easing;
export type ZIndexKey = keyof typeof zIndex;