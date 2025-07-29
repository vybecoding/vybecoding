# VybeCoding Design System

A modern design system built on Shadcn UI components with custom enhancements, using CSS Modules + Tailwind CSS hybrid approach.

## Architecture

This design system uses a layered approach:
- **Shadcn UI**: Base component primitives with consistent behavior
- **Tailwind CSS**: For utility classes and rapid prototyping
- **CSS Modules**: For component-specific styles that can't be expressed with utilities
- **TypeScript**: For type-safe component props and design tokens
- **CVA (class-variance-authority)**: For managing component variants

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

## Shadcn UI Integration

### Component Structure
All UI components follow a wrapper pattern:
```tsx
// components/ui/button/Button.tsx
import { Button as ShadcnButton } from "@/components/ui/button"

export function Button({ variant, gradientFrom, gradientTo, ...props }) {
  const variantMap = {
    primary: "default",
    danger: "destructive",
    success: "default", // with custom styling
  }
  
  // Add gradient support on top of Shadcn
  // Maintain backward compatibility
}
```

### Available Shadcn Components
- **Forms**: Input, Select, Textarea, Checkbox, Radio, Form validation
- **Layout**: Card, Accordion, Tabs, Separator
- **Feedback**: Alert Dialog, Dialog, Toast (Sonner), Sheet
- **Navigation**: Navigation Menu, Dropdown Menu
- **Data Display**: Table, Badge, Label
- **Advanced**: Data Table with TanStack Table integration

### Customization
Each Shadcn component is enhanced with:
- Custom variants (gradient buttons, specialized cards)
- Additional props for VybeCoding-specific features
- CSS Module overrides for unique styling needs
- Dark/light theme variables

## Benefits

1. **No Cascade Issues**: CSS Modules ensure styles don't leak between components
2. **Type Safety**: All design tokens and component props are typed
3. **Consistency**: Shadcn provides consistent base behavior
4. **Performance**: Tree-shakeable components, scoped styles
5. **Developer Experience**: IntelliSense for all design tokens and utilities
6. **Maintainability**: Updates from Shadcn are easy to integrate

## Migration Strategy

### From Custom Components to Shadcn
1. Install Shadcn component: `npx shadcn-ui@latest add [component]`
2. Create wrapper in `components/ui/[component]/[Component].tsx`
3. Map existing props to Shadcn variants
4. Add custom functionality as needed
5. Update imports throughout codebase

### Zero Breaking Changes
The wrapper pattern ensures all existing code continues to work while benefiting from Shadcn's robust foundation.