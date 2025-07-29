/**
 * Shadow Tokens
 * Box shadows and glow effects
 */

export const shadows = {
  // Base shadows
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px rgba(0, 0, 0, 0.15)',
  '2xl': '0 25px 50px rgba(0, 0, 0, 0.25)',
  
  // Glow effects
  glowPurple: '0 0 20px rgba(138, 43, 226, 0.3)',
  glowPink: '0 0 20px rgba(217, 70, 160, 0.3)',
  glowOrange: '0 0 20px rgba(233, 107, 58, 0.3)',
  glowGreen: '0 0 20px rgba(0, 255, 136, 0.3)',
  glowCyan: '0 0 20px rgba(0, 102, 255, 0.3)',
  
  // Multi-color glow
  glowVybe: '0 0 20px rgba(138, 43, 226, 0.3), 0 0 30px rgba(217, 70, 160, 0.2), 0 0 40px rgba(233, 107, 58, 0.1)',
} as const;

export type ShadowKey = keyof typeof shadows;