/**
 * Gradient Utilities
 * Functions for creating and managing gradients
 */

import { colors, gradients } from '../tokens/colors';

export interface GradientOptions {
  type?: 'linear' | 'radial' | 'conic';
  angle?: number;
  colorStops: Array<{
    color: string;
    position?: string;
  }>;
}

/**
 * Creates a custom gradient string
 */
export function createGradient(options: GradientOptions): string {
  const { type = 'linear', angle = 90, colorStops } = options;
  
  const stops = colorStops
    .map(stop => `${stop.color}${stop.position ? ` ${stop.position}` : ''}`)
    .join(', ');
  
  switch (type) {
    case 'radial':
      return `radial-gradient(circle, ${stops})`;
    case 'conic':
      return `conic-gradient(from ${angle}deg, ${stops})`;
    default:
      return `linear-gradient(${angle}deg, ${stops})`;
  }
}

/**
 * Creates the Vybe gradient with custom positions
 */
export function createVybeGradient(
  positions?: { purple?: string; pink?: string; orange?: string }
): string {
  return createGradient({
    colorStops: [
      { color: colors.brand.primary, position: positions?.purple || '0%' },
      { color: colors.brand.secondary, position: positions?.pink || '50%' },
      { color: colors.brand.accent, position: positions?.orange || '100%' },
    ],
  });
}

/**
 * Creates an animated gradient background
 */
export function createAnimatedGradient(
  gradient: string,
  duration: string = '3s'
): {
  background: string;
  backgroundSize: string;
  animation: string;
} {
  return {
    background: gradient,
    backgroundSize: '200% 200%',
    animation: `gradient-shift ${duration} ease infinite`,
  };
}

/**
 * Gradient presets for quick use
 */
export const gradientPresets = {
  vybe: gradients.vybe,
  vybeReverse: gradients.vybeReverse,
  vybeRadial: gradients.vybeRadial,
  purple: gradients.purple,
  pink: gradients.pink,
  orange: gradients.orange,
  ai: gradients.ai,
  
  // Dark mode variants
  vybeDark: createGradient({
    angle: 90,
    colorStops: [
      { color: '#6a1fa6', position: '0%' },
      { color: '#b83890', position: '50%' },
      { color: '#d65a2e', position: '100%' },
    ],
  }),
  
  // Subtle variants
  vybeSubtle: createGradient({
    angle: 90,
    colorStops: [
      { color: 'rgba(138, 43, 226, 0.1)', position: '0%' },
      { color: 'rgba(217, 70, 160, 0.1)', position: '50%' },
      { color: 'rgba(233, 107, 58, 0.1)', position: '100%' },
    ],
  }),
} as const;