# Theme System Documentation

## Overview

The vybecoding app uses a comprehensive theme system built with React Context, CSS custom properties, and Tailwind CSS. The system supports both dark and light themes with automatic persistence and system preference detection.

## Features

- **Dark/Light Theme Support**: Full theme switching with smooth transitions
- **Persistence**: Theme preference saved to localStorage
- **SSR Safe**: No flash of unstyled content (FOUC)
- **System Preference Detection**: Automatically follows OS theme preference
- **CSS Custom Properties**: Dynamic theming with CSS variables
- **Tailwind Integration**: Seamless integration with Tailwind classes

## Usage

### Basic Theme Toggle

```tsx
import { ThemeToggle } from '@/components/ThemeToggle';

// Simple icon toggle
<ThemeToggle />

// Toggle with size variants
<ThemeToggle size="sm" />
<ThemeToggle size="md" /> // default
<ThemeToggle size="lg" />

// Toggle with label
<ThemeToggle showLabel />
```

### Switch Style Toggle

```tsx
import { ThemeSwitch } from '@/components/ThemeToggle';

// Switch style toggle
<ThemeSwitch />

// With label
<ThemeSwitch showLabel />
```

### Accessing Theme in Components

```tsx
import { useTheme } from '@/contexts/ThemeContext';

function MyComponent() {
  const { theme, toggleTheme, setTheme } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle</button>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('light')}>Light</button>
    </div>
  );
}
```

## CSS Variables

The theme system defines CSS custom properties that automatically update based on the current theme:

### Background Colors
- `--background`: Main background color
- `--background-secondary`: Secondary background
- `--background-tertiary`: Tertiary background
- `--background-elevated`: Elevated surface background

### Text Colors
- `--foreground`: Primary text color
- `--foreground-secondary`: Secondary text
- `--foreground-tertiary`: Tertiary text
- `--foreground-muted`: Muted text

### Brand Colors
- `--brand-primary`: Purple (#8a2be2)
- `--brand-secondary`: Pink (#d946a0)
- `--brand-accent`: Orange (#e96b3a)

### Semantic Colors
- `--success`: Success state color
- `--warning`: Warning state color
- `--error`: Error state color
- `--info`: Info state color

## Tailwind Classes

Use the theme-aware Tailwind classes:

```tsx
// Backgrounds
<div className="bg-background">Main background</div>
<div className="bg-background-secondary">Secondary</div>
<div className="bg-card">Card background</div>

// Text
<p className="text-foreground">Primary text</p>
<p className="text-foreground-secondary">Secondary</p>
<p className="text-foreground-muted">Muted</p>

// Borders
<div className="border border-border">Default border</div>
<div className="border border-subtle">Subtle border</div>

// Brand colors
<div className="bg-brand-primary">Purple</div>
<div className="text-brand-secondary">Pink text</div>

// Glow effects
<button className="shadow-glow-purple">Purple glow</button>
<button className="shadow-glow-pink">Pink glow</button>
```

## Configuration

The theme system can be configured in the layout:

```tsx
<ThemeProvider
  defaultTheme="dark"        // Default theme
  storageKey="vybe-theme"    // localStorage key
  enableSystem={true}        // Follow system preference
>
  {children}
</ThemeProvider>
```

## Demo

Visit `/theme-demo` to see all theme components and color variations in action.