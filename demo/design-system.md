# VybeCoding Design System

## Overview

The VybeCoding design system creates a cohesive, futuristic AI-powered development platform aesthetic. It emphasizes dark themes, a signature gradient, and smooth interactions for a premium developer experience.

## Core Design Principles

1. **Dark-First Design**: Built for reduced eye strain during extended coding sessions
2. **Signature Gradient**: One unified purple-pink-orange gradient for brand consistency
3. **Minimal Palette**: Carefully curated colors that serve a purpose
4. **Performance-Focused**: Optimized animations with reduced motion support
5. **Accessibility-First**: Full keyboard navigation, ARIA labels, and screen reader support
6. **Immersive Experience**: Nebula backgrounds with animated stars create depth

## Color System

### Brand Trinity
The core brand identity uses three colors in equal parts:

- **Primary Purple**: `#8a2be2` - Core brand color
- **Secondary Pink**: `#d946a0` - Accent and energy
- **Accent Orange**: `#e96b3a` - Highlights and CTAs

### The Vybe Gradient
One gradient to maintain consistency across all brand elements:

```css
--gradient-vybe: linear-gradient(90deg, #8a2be2 0%, #d946a0 50%, #e96b3a 100%);
```

### Functional Colors
Colors that serve specific UI purposes:

- **Success**: `#00ff88` - Confirmations, positive states
- **Warning**: `#ff8800` - Caution, attention needed
- **Error**: `#ff4444` - Errors, destructive actions
- **Info**: `#00bbff` - Information, links

### Neutral Scale
A simplified grayscale for UI elements:

- **Dark Background**: `#0a0a0a` - Main app background
- **Darker Surface**: `#1a1a1a` - Cards base layer
- **Dark Surface**: `#2a2a2a` - Elevated surfaces
- **Text Primary**: `#ffffff` - Main content
- **Text Secondary**: `#888888` - Supporting text
- **Text Tertiary**: `#666666` - Muted text

## Typography

### Font Families
- **Primary**: Inter, system font stack
- **Monospace**: JetBrains Mono, Fira Code

### Type Scale
A practical scale for all text needs:

- `text-xs`: 0.75rem (12px)
- `text-sm`: 0.875rem (14px)
- `text-base`: 1rem (16px)
- `text-lg`: 1.125rem (18px)
- `text-xl`: 1.25rem (20px)
- `text-2xl`: 1.5rem (24px)
- `text-3xl`: 1.875rem (30px)
- `text-4xl`: 2.25rem (36px)
- `text-5xl`: 3rem (48px)

### Font Weights
- `light`: 300
- `normal`: 400
- `medium`: 500
- `semibold`: 600
- `bold`: 700

## Spacing System

Based on a 4px grid, capped at practical sizes:

- `space-xs`: 0.25rem (4px)
- `space-sm`: 0.5rem (8px)
- `space-md`: 0.75rem (12px)
- `space-lg`: 1rem (16px)
- `space-xl`: 1.5rem (24px)
- `space-2xl`: 2rem (32px)
- `space-3xl`: 3rem (48px)
- `space-4xl`: 4rem (64px)

## Component Patterns

### Buttons

#### Primary Action
- **Style**: Gradient filled background using `--gradient-vybe`
- **Use Case**: Main CTAs (Sign Up, Start Trial, Create)
- **Hover**: Lift effect with glow shadow

#### Secondary Actions
- **Style**: Ghost/outline with colored borders
- **Variants**: Available in purple, pink, and orange
- **Use Case**: Supporting actions (Learn More, Cancel)
- **Hover**: Subtle background tint matching border color

#### Tertiary Actions
- **Style**: Text only, no background or border
- **Variants**: Available in purple, pink, and orange
- **Use Case**: Minimal emphasis (Skip, Maybe Later)
- **Hover**: Color brightens with underline

### Cards

All cards use the `.vybe-card` class which provides:
- Gradient background with glassmorphism
- Backdrop blur effect
- Subtle border and professional shadow
- 12px border radius

#### Primary Cards
- **Style**: Gradient header backgrounds
- **Class**: `.vybe-card` with styled header
- **Variants**: 
  - Gradient (tri-color header) - Full brand gradient for maximum visual impact
  - Purple - Single color purple gradient header
  - Pink - Single color pink gradient header  
  - Orange - Single color orange gradient header
- **Use Case**: Main content, featured sections, important CTAs
- **Visual Impact**: High prominence with gradient headers
- **Structure**:
```html
<!-- Gradient Header (Primary) -->
<div class="vybe-card overflow-hidden">
  <div class="card-header-gradient" style="padding: 1rem; background: linear-gradient(90deg, rgba(138, 43, 226, 0.2), rgba(217, 70, 160, 0.2), rgba(233, 107, 58, 0.2)); border-bottom: 1px solid rgba(75, 85, 99, 0.4);">
    <h3 class="text-base font-semibold text-white">Card Title</h3>
  </div>
  <div style="padding: 1.25rem;">
    <p class="text-sm text-vybe-gray-400">Card content...</p>
  </div>
</div>

<!-- Purple Header Variant -->
<div class="vybe-card overflow-hidden">
  <div class="card-header-purple" style="padding: 1rem; background: linear-gradient(90deg, rgba(138, 43, 226, 0.15), rgba(138, 43, 226, 0.25)); border-bottom: 1px solid rgba(138, 43, 226, 0.3);">
    <h3 class="text-base font-semibold text-white">Primary Purple</h3>
  </div>
  <div style="padding: 1.25rem;">
    <p class="text-sm text-vybe-gray-400">Card content...</p>
  </div>
</div>
```

#### Secondary Cards
- **Style**: Gradient left border + gradient title accent bar
- **Class**: `.vybe-card` with gradient accents
- **Default**: Always uses gradient accent (var(--gradient-vybe))
- **Use Case**: Important supporting content, section headers (like "Guide Curriculum")
- **Visual Impact**: Moderate emphasis with dual gradient accents
- **Structure**:
```html
<div class="vybe-card relative overflow-hidden">
  <div class="absolute left-0 top-0 bottom-0" style="width: 4px; background: var(--gradient-vybe);"></div>
  <div style="padding: 1.25rem; padding-left: 1.75rem;">
    <h3 class="text-base font-semibold text-white flex items-center gap-2" style="margin-bottom: 0.75rem;">
      <div style="width: 4px; height: 20px; background: linear-gradient(to bottom, #8a2be2, #d946a0, #e96b3a); border-radius: 9999px;"></div>
      Card Title
    </h3>
    <p class="text-sm text-vybe-gray-400">Card content...</p>
  </div>
</div>
```

#### Tertiary Cards
- **Style**: Simple colored left border accent
- **Class**: `.vybe-card` with colored side accent
- **Variants**: Gradient, Purple, Pink, Orange borders
- **Use Case**: Lists, notes, background information
- **Visual Impact**: Minimal emphasis with color coding
- **Size**: Smaller height and text for less prominence
- **Structure**:
```html
<div class="vybe-card relative overflow-hidden">
  <div class="absolute left-0 top-0 bottom-0" style="width: 4px; background: #8a2be2;"></div>
  <div style="padding: 1rem; padding-left: 1.5rem;">
    <h3 class="text-sm font-semibold text-white mb-2">Card Title</h3>
    <p class="text-xs text-vybe-gray-400">Card content...</p>
  </div>
</div>
```

### Specialized Cards

These cards are designed for specific content types with distinct visual treatments:

#### Guide Card
- **Label**: Purple background `rgba(138, 43, 226, 0.75)`
- **Border**: Green verified `rgba(34, 197, 94, 0.3)`
- **Avatar**: Purple-to-pink gradient
- **Features**: Difficulty badge, tags, stats (views, time, likes)
- **Use Case**: Educational content, tutorials

#### App Card
- **Label**: Pink background `rgba(244, 114, 182, 0.75)`
- **Border**: Standard or verified state
- **Avatar**: Initials on gradient background
- **Features**: Tags, creation date, interaction stats
- **Use Case**: Applications, tools, projects

#### Member Card
- **Label**: Gradient background with 75% opacity
- **Border**: Mentor variant `rgba(217, 70, 160, 0.3)`
- **Avatar**: Orange-to-pink gradient
- **Features**: PRO badge, tags, social stats
- **Use Case**: User profiles, team members

#### News Card
- **Label**: Orange background `rgba(251, 146, 60, 0.75)`
- **Border**: Standard dark border
- **Avatar**: Blue circular with gradient
- **Features**: Official badge (blue), timestamp, stats
- **Use Case**: Updates, announcements, articles

#### Premium/Locked Card Variants
- **Premium Guide Card**: Locked state with blurred content
- **Premium App Card**: Purchase required indicator
- **Purchased App Card**: Owned state with success indicators
- **Features**: Lock icons, blur effects, purchase CTAs

All specialized cards maintain consistent:
- Spacing: `mb-2` for title, `mb-3` for meta, `mb-4` for content
- Label sizing: 75% of title text size
- Label positioning: Top-left with specific border radius
- Bottom stats section with `mt-auto` for alignment
- Hover effects: `translateY(-2px)` lift with enhanced shadows

### Effects
- **Glassmorphism**: Semi-transparent with backdrop blur
- **Glow**: Soft shadow in brand colors
- **Nebula Background**: Layered radial gradients creating cosmic depth
- **Rising Stars**: Animated particles with twinkle effect

## Animations

### Core Animations
- **fadeIn**: Smooth entrance animation
- **slideUp**: Upward motion for content reveals
- **pulse**: Subtle scaling for emphasis (2s cubic-bezier)
- **particleFloat**: Floating particles (25s linear cycle)
- **neuralPulse**: Neural node pulsing (8s ease-in-out cycle)
- **Stars animation**: Animated rising stars in nebula background

### Performance Optimizations
- All animations use `transform3d` for GPU acceleration
- `will-change` property on animated elements
- Respects `prefers-reduced-motion` preference

### Timing
- `duration-fast`: 150ms
- `duration-normal`: 300ms
- `duration-slow`: 500ms

## Shadow System

### Elevation Levels
- `shadow-sm`: `0 1px 2px rgba(0, 0, 0, 0.05)`
- `shadow-md`: `0 4px 6px rgba(0, 0, 0, 0.1)`
- `shadow-lg`: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`
- `shadow-xl`: `0 20px 25px rgba(0, 0, 0, 0.1)`
- **Card Shadow**: `0 4px 12px rgba(0, 0, 0, 0.15)`
- **Card Hover Shadow**: `0 8px 24px rgba(0, 0, 0, 0.2)`

### Glow Effects
- **Purple Glow**: `0 4px 20px rgba(138, 43, 226, 0.4)`
- **Pink Glow**: `0 4px 20px rgba(217, 70, 160, 0.4)`
- **Orange Glow**: `0 4px 20px rgba(233, 107, 58, 0.4)`
- **Gradient Glow**: `0 8px 32px rgba(217, 70, 160, 0.3)`

## Border Radius

- `radius-none`: 0
- `radius-sm`: 0.25rem (4px)
- `radius-md`: 0.375rem (6px)
- `radius-lg`: 0.5rem (8px)
- `radius-xl`: 0.75rem (12px)
- `radius-2xl`: 1rem (16px)
- `radius-full`: 9999px

## Special Effects

### Nebula Background
Creates an immersive cosmic atmosphere using layered radial gradients:

```css
/* Primary nebula layer */
background: 
  radial-gradient(ellipse at 15% 30%, rgba(138, 43, 226, 0.08) 0%, transparent 50%),
  radial-gradient(ellipse at 85% 40%, rgba(217, 70, 160, 0.06) 0%, transparent 40%),
  radial-gradient(ellipse at 50% 80%, rgba(233, 107, 58, 0.05) 0%, transparent 60%);

/* Secondary nebula layer */
background: 
  radial-gradient(ellipse at 70% 20%, rgba(217, 70, 160, 0.05) 0%, transparent 40%),
  radial-gradient(ellipse at 30% 60%, rgba(138, 43, 226, 0.04) 0%, transparent 50%);
```

### Rising Stars Animation
```css
.star {
  position: absolute;
  width: 2px;
  height: 2px;
  background: white;
  opacity: 0;
  animation: rise 15s linear infinite;
}

@keyframes rise {
  0% {
    transform: translateY(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh);
    opacity: 0;
  }
}
```

### Animated Particles
- **Rising Stars**: White dots animated throughout nebula background
- **Floating Particles**: Purple particles with 25s linear float cycle
- **Neural Nodes**: Orange pulsing nodes with 8s ease-in-out cycle creating network effect

## Implementation

### Using the Gradient
```css
/* Text gradient */
.gradient-text {
  background: var(--gradient-vybe);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Background gradient */
.gradient-bg {
  background: var(--gradient-vybe);
}

/* Gradient with opacity */
background: linear-gradient(90deg, 
  rgba(138, 43, 226, 0.2), 
  rgba(217, 70, 160, 0.2), 
  rgba(233, 107, 58, 0.2)
);
```

### Glassmorphism Effect
```css
.vybe-card {
  background: rgba(26, 26, 26, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(51, 51, 51, 0.4);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.vybe-card:hover {
  background: rgba(42, 42, 42, 0.8);
  border-color: rgba(64, 64, 64, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

/* Light glassmorphism variant */
.glassmorphism-light {
  background: linear-gradient(to bottom right, rgba(31, 41, 55, 0.4), rgba(55, 65, 81, 0.3), rgba(75, 85, 99, 0.2));
  backdrop-filter: blur(12px);
  border-radius: 0.75rem;
}
```

### Accessibility Features
- **Skip to Content**: Hidden link for keyboard navigation
- **ARIA Labels**: All interactive elements properly labeled
- **Focus Indicators**: Custom focus styles with brand colors
- **Keyboard Navigation**: Full keyboard support for all interactions
- **Screen Reader Support**: Semantic HTML with proper roles
- **Motion Preferences**: Animations respect `prefers-reduced-motion`
- **Color Contrast**: All text meets WCAG AA standards
- **Navigation Aids**: Sticky TOC and back-to-top button

## File Structure

```
demo/
├── css/
│   ├── design-tokens.css         # CSS custom properties
│   ├── styles.css                # Component styles
│   └── layers.css                # CSS layer organization
├── design-system-showcase.html   # Interactive showcase
└── design-system.md              # This documentation
```

## Utility Classes

### Spacing Utilities
- `p-0` to `p-5`: Padding (0 to 1.25rem)
- `px-2`, `px-3`: Horizontal padding
- `py-1`, `py-0.5`: Vertical padding
- `pt-3`, `pt-4`: Padding top
- `mb-2`, `mb-3`, `mb-4`: Margin bottom
- `mt-auto`: Margin top auto
- `gap-1` to `gap-4`: Flexbox gap

### Display & Layout
- `flex`, `flex-1`: Flexbox utilities
- `flex-wrap`, `flex-shrink-0`: Flex modifiers
- `items-center`, `items-start`: Align items
- `justify-between`: Justify content
- `hidden`, `block`, `lg:block`: Display utilities
- `relative`, `absolute`, `fixed`: Position
- `z-10`, `z-50`: Z-index levels
- `overflow-hidden`, `overflow-visible`: Overflow

### Typography
- `text-xs` to `text-5xl`: Font sizes
- `font-medium`, `font-semibold`, `font-bold`: Font weights
- `line-clamp-2`: Limit text to 2 lines
- `gradient-text`: Apply gradient to text

### Colors & Backgrounds
- `text-white`, `text-vybe-gray-400`: Text colors
- `bg-vybe-purple`, `bg-vybe-pink/10`: Backgrounds
- `border-vybe-purple/30`: Border colors
- `hover:text-vybe-purple-light`: Hover states

### Interactive States
- `transition-all`, `transition-colors`: Transitions
- `hover:bg-vybe-dark/50`: Hover backgrounds
- `animate-pulse`: Pulse animation
- `cursor-pointer`: Cursor style

### Sizing
- `w-3` to `w-10`: Fixed widths
- `h-3` to `h-10`: Fixed heights
- `rounded`, `rounded-full`, `rounded-lg`: Border radius

## Responsive Design

### Breakpoints
```css
/* Mobile First Approach */
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
```

### Responsive Grid
```css
/* Mobile: 1 column */
grid-template-columns: 1fr;

/* Tablet: 2 columns */
@media (min-width: 768px) {
  grid-template-columns: repeat(2, 1fr);
}

/* Desktop: 3 columns */
@media (min-width: 1024px) {
  grid-template-columns: repeat(3, 1fr);
}
```

### Responsive Utilities
- `lg:block`: Show on large screens
- `hidden lg:block`: Hide on mobile, show on desktop

## Quick Reference

### Essential Colors
- **Gradient**: `var(--gradient-vybe)`
- **Purple**: `#8a2be2`
- **Pink**: `#d946a0`
- **Orange**: `#e96b3a`

### Card Hierarchy
1. **Primary Cards**: Header backgrounds (gray default, gradient variant)
2. **Secondary Cards**: Dual gradient accents (border + title bar)
3. **Tertiary Cards**: Simple side accent
4. **Specialized Cards**: Content-specific with labels and unique features

### Common Patterns
- **Gradient Text**: `.gradient-text`
- **Card Base**: `.vybe-card`
- **Focus State**: `outline: 2px solid var(--color-brand-secondary)`
- **Hover Lift**: `transform: translateY(-2px)`
- **Smooth Transitions**: `transition: all 0.3s ease`

### Badge Implementations
```html
<!-- Difficulty Badge -->
<span class="px-2 py-1 bg-vybe-purple/10 text-vybe-purple-light border border-vybe-purple/20 rounded text-xs">
  Intermediate
</span>

<!-- PRO Badge -->
<span class="px-2 py-0.5 bg-gradient-to-br from-vybe-orange to-vybe-pink text-white text-xs font-medium rounded animate-pulse">
  PRO
</span>

<!-- Official Badge -->
<div class="px-2 py-0.5 bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded text-xs font-medium">
  <svg class="w-3.5 h-3.5" ...><!-- checkmark icon --></svg>
  Official
</div>

<!-- Mentor Badge -->
<span class="text-amber-500">
  <svg class="w-3 h-3"><!-- star icon --></svg>
</span>
```

### Avatar Styles
```html
<!-- Gradient Avatar -->
<div class="w-10 h-10 rounded-full bg-gradient-to-br from-vybe-purple to-vybe-pink flex items-center justify-center text-white font-bold">
  JD
</div>

<!-- Avatar with Ring -->
<div class="avatar-ring">
  <div class="w-10 h-10 rounded-full bg-gradient-to-br from-vybe-orange to-vybe-pink"></div>
</div>
```

### Label Positioning
```css
/* Top-left card labels */
.card-label {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  padding: 0.25rem 0.75rem;
  font-size: 0.625rem; /* 75% of base text */
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 0 0.375rem 0.375rem 0;
  opacity: 0.75;
}
```

This design system provides everything needed to build consistent, beautiful, and accessible interfaces while maintaining the VybeCoding brand identity.