# VybeCoding Design System

A modern design system using CSS Modules + Tailwind CSS hybrid approach to prevent CSS cascade issues.

## Architecture

This design system uses a hybrid approach:
- **Tailwind CSS**: For utility classes and rapid prototyping
- **CSS Modules**: For component-specific styles that can't be expressed with utilities
- **TypeScript**: For type-safe component props and design tokens

## Directory Structure

```
design-system/
├── tokens/          # Design tokens (colors, spacing, typography, etc.)
├── utils/           # Utility functions (gradients, glassmorphism, CSS modules helpers)
├── styles/          # Base component styles using variant API
├── components/      # Example components with CSS Modules
└── index.ts        # Main export file
```

## Key Features

### 1. Design Tokens
All design values are defined as TypeScript constants for consistency:
- Colors (brand, AI theme, neutrals, semantic)
- Spacing scale
- Typography (fonts, sizes, weights)
- Shadows and glow effects
- Animation durations and easings

### 2. CSS Modules Integration
Component-specific styles that prevent cascade issues:
```tsx
import styles from './Button.module.css';
const s = createStyles(styles);

<button className={s('button')}>
```

### 3. Tailwind Configuration
Extended with our design tokens:
```js
// Colors: brand-primary, brand-secondary, brand-accent
// Gradients: bg-gradient-vybe, bg-gradient-purple
// Shadows: shadow-glow-purple, shadow-glow-pink
// Animations: animate-glow, animate-gradient-x
```

### 4. Utility Functions

#### Gradients
```ts
import { createGradient, createVybeGradient } from '@vybecoding/design-system';

const customGradient = createGradient({
  angle: 45,
  colorStops: [
    { color: '#8a2be2', position: '0%' },
    { color: '#d946a0', position: '100%' }
  ]
});
```

#### Glassmorphism
```ts
import { createGlassmorphism, glassPresets } from '@vybecoding/design-system';

const glassStyles = createGlassmorphism({
  blur: 16,
  opacity: 0.1,
  saturation: 1.5
});
```

#### CSS Modules Helper
```ts
import { cn, createVariants } from '@vybecoding/design-system';

const buttonVariants = createVariants({
  base: 'px-4 py-2 rounded',
  variants: {
    variant: {
      primary: 'bg-brand-primary',
      secondary: 'bg-brand-secondary'
    }
  }
});
```

## Usage

### In Components
```tsx
import { cn, buttonVariants } from '@vybecoding/design-system';
import styles from './MyComponent.module.css';

export const MyComponent = ({ variant = 'primary' }) => {
  return (
    <button className={cn(
      buttonVariants({ variant }),
      styles.customButton,
      'hover:scale-105'
    )}>
      Click me
    </button>
  );
};
```

### Tailwind Classes
```tsx
// Brand colors
<div className="bg-brand-primary text-white" />
<div className="bg-gradient-vybe" />

// AI theme
<div className="bg-ai-matrixGreen" />

// Shadows
<div className="shadow-glow-purple" />

// Animations
<div className="animate-glow" />
```

## Benefits

1. **No Cascade Issues**: CSS Modules ensure styles don't leak between components
2. **Type Safety**: All design tokens are typed
3. **Consistency**: Single source of truth for design values
4. **Performance**: Tailwind purges unused styles, CSS Modules are scoped
5. **Developer Experience**: IntelliSense for all design tokens and utilities

## Migration from Demo

This design system ports all the design tokens from the demo while solving the CSS cascade issues through proper scoping and the hybrid approach.