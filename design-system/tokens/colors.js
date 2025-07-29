/**
 * Color Tokens
 * Core color palette for VybeCoding design system
 */

const colors = {
  // Brand Colors
  brand: {
    primary: '#8a2be2',    // Purple
    secondary: '#d946a0',  // Pink
    accent: '#e96b3a',     // Orange
  },

  // Extended Brand Palette
  purple: {
    DEFAULT: '#8a2be2',
    light: '#a855f7',
    violet: '#8B5CF6',
    indigo: '#6366F1',
  },
  
  pink: {
    DEFAULT: '#d946a0',
    magenta: '#ff1493',
    coral: '#ff6b9d',
  },
  
  orange: {
    DEFAULT: '#e96b3a',
    amber: '#F59E0B',
  },

  // AI Theme Colors
  ai: {
    matrixGreen: '#00ff88',
    neuralPurple: '#8844ff',
    quantumOrange: '#ff8800',
    plasmaPink: '#ff44aa',
    fusionCyan: '#0066ff',
    laserRed: '#ff4444',
    voltYellow: '#ffff00',
  },

  // Neutral Colors
  neutral: {
    void: '#000000',
    dark: '#0a0a0a',
    midnight: '#111111',
    shadow: '#1a1a1a',
    steel: '#242424',
    slate: '#2a2a2a',
    carbon: '#333333',
    pewter: '#404040',
    silver: '#666666',
    mist: '#888888',
    fog: '#aaaaaa',
    light: '#cccccc',
    white: '#ffffff',
  },

  // Semantic Colors
  semantic: {
    success: '#00ff88',
    warning: '#ff8800',
    error: '#ff4444',
    info: '#0066ff',
  },
};

// Gradient definitions
const gradients = {
  vybe: 'linear-gradient(90deg, #8a2be2 0%, #d946a0 50%, #e96b3a 100%)',
  vybeReverse: 'linear-gradient(270deg, #8a2be2 0%, #d946a0 50%, #e96b3a 100%)',
  vybeRadial: 'radial-gradient(circle, #8a2be2 0%, #d946a0 50%, #e96b3a 100%)',
  purple: 'linear-gradient(135deg, #8a2be2 0%, #6366F1 100%)',
  pink: 'linear-gradient(135deg, #d946a0 0%, #ff6b9d 100%)',
  orange: 'linear-gradient(135deg, #e96b3a 0%, #F59E0B 100%)',
  ai: 'linear-gradient(90deg, #00ff88 0%, #8844ff 25%, #ff8800 50%, #ff44aa 75%, #0066ff 100%)',
};

module.exports = { colors, gradients };