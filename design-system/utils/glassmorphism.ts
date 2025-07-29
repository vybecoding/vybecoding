/**
 * Glassmorphism Utilities
 * Functions for creating glass-like effects
 */

export interface GlassmorphismOptions {
  blur?: number;
  opacity?: number;
  saturation?: number;
  borderOpacity?: number;
  background?: string;
}

/**
 * Creates glassmorphism styles
 */
export function createGlassmorphism(options: GlassmorphismOptions = {}) {
  const {
    blur = 10,
    opacity = 0.1,
    saturation = 1.5,
    borderOpacity = 0.2,
    background = 'rgba(255, 255, 255, ' + opacity + ')',
  } = options;

  return {
    background,
    backdropFilter: `blur(${blur}px) saturate(${saturation})`,
    WebkitBackdropFilter: `blur(${blur}px) saturate(${saturation})`,
    border: `1px solid rgba(255, 255, 255, ${borderOpacity})`,
  };
}

/**
 * Glassmorphism presets
 */
export const glassPresets = {
  // Light glass effect
  light: createGlassmorphism({
    blur: 10,
    opacity: 0.1,
    saturation: 1.5,
    borderOpacity: 0.2,
  }),
  
  // Dark glass effect
  dark: createGlassmorphism({
    blur: 16,
    opacity: 0.05,
    saturation: 1.2,
    borderOpacity: 0.1,
    background: 'rgba(0, 0, 0, 0.05)',
  }),
  
  // Colored glass effects
  purple: createGlassmorphism({
    blur: 12,
    opacity: 0.1,
    saturation: 1.8,
    borderOpacity: 0.15,
    background: 'rgba(138, 43, 226, 0.1)',
  }),
  
  pink: createGlassmorphism({
    blur: 12,
    opacity: 0.1,
    saturation: 1.8,
    borderOpacity: 0.15,
    background: 'rgba(217, 70, 160, 0.1)',
  }),
  
  // Strong glass effect
  strong: createGlassmorphism({
    blur: 20,
    opacity: 0.2,
    saturation: 2,
    borderOpacity: 0.3,
  }),
  
  // Subtle glass effect
  subtle: createGlassmorphism({
    blur: 5,
    opacity: 0.05,
    saturation: 1.1,
    borderOpacity: 0.1,
  }),
} as const;

/**
 * Creates a frosted glass overlay
 */
export function createFrostedOverlay(opacity: number = 0.7) {
  return {
    position: 'absolute' as const,
    inset: 0,
    background: `rgba(255, 255, 255, ${opacity})`,
    backdropFilter: 'blur(8px) saturate(1.5)',
    WebkitBackdropFilter: 'blur(8px) saturate(1.5)',
  };
}

/**
 * Creates a glass card with shadow
 */
export function createGlassCard(options?: GlassmorphismOptions) {
  return {
    ...createGlassmorphism(options),
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    borderRadius: '16px',
  };
}