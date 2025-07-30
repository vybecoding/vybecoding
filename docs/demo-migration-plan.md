# Demo to Next.js Migration Plan

## Overview

This document outlines the strategy for creating a pixel-perfect replication of the vybecoding demo using Next.js, React, Tailwind CSS, and Shadcn/ui components. The migration is organized as **Epic-01** with 46 individual page stories.

## Epic Organization

**Epic-01: Pixel-Perfect Demo Migration**
- **46 Individual Stories**: DEMO-001 through DEMO-046  
- **298 Total Story Points**: 8-week development timeline
- **Complete Coverage**: Every HTML page in demo has dedicated story
- **Reference System**: Design system foundation patterns documented

## Current State Analysis

### Demo Structure
- **Technology**: Vite-based static site
- **Pages**: 30+ HTML pages with complex navigation
- **Styling**: Custom CSS with design tokens + Tailwind configuration
- **JavaScript**: Modular ES6 architecture with event-driven communication
- **Design**: Dark theme with purple/pink/orange gradients, glassmorphism effects
- **Issues**: Multiple CSS fix files indicate iterative design challenges

### Existing Next.js App
- Basic setup with Clerk authentication
- Convex for real-time data
- Shadcn/ui components installed
- Minimal pages implemented

## Migration Strategy

### Phase 1: Foundation Setup

#### 1.1 Design System Configuration
```typescript
// tailwind.config.js - Port from demo
{
  theme: {
    extend: {
      colors: {
        vybe: {
          // Dark palette
          'void': '#000000',
          'dark': '#0a0a0a',
          'midnight': '#111111',
          'shadow': '#1a1a1a',
          'steel': '#242424',
          'slate': '#2a2a2a',
          
          // Brand colors
          'purple': '#8a2be2',
          'purple-light': '#a855f7',
          'pink': '#d946a0',
          'orange': '#e96b3a',
          
          // Accent colors
          'matrix-green': '#00ff88',
          'neural-purple': '#8844ff',
          // ... etc
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'gentle-bounce': 'gentleBounce 2s ease-in-out infinite',
        // ... port all animations
      }
    }
  }
}
```

#### 1.2 Component Architecture
```
components/
├── ui/                    # Shadcn components (already setup)
├── layout/
│   ├── Navigation.tsx     # Glassmorphism nav with mobile support
│   ├── Footer.tsx
│   └── PageContainer.tsx
├── effects/
│   ├── GradientText.tsx   # Reusable gradient text component
│   ├── GlassCard.tsx      # Glassmorphism card
│   └── NebulaBg.tsx       # Background effects
├── cards/
│   ├── AppCard.tsx        # App showcase card with badges
│   ├── GuideCard.tsx      # Guide card with date corner
│   └── MemberCard.tsx     # Member/mentor card
└── sections/
    ├── Hero.tsx           # Hero sections with CTAs
    ├── Features.tsx
    └── Pricing.tsx
```

### Phase 2: Core Components Implementation

#### 2.1 Navigation Component
```typescript
// components/layout/Navigation.tsx
export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glassmorphism">
      {/* Port glassmorphism styles */}
      {/* Implement mobile menu toggle */}
      {/* Active state management */}
    </nav>
  )
}
```

#### 2.2 Reusable Effect Components
```typescript
// components/effects/GradientText.tsx
export function GradientText({ children, className }) {
  return (
    <span className={cn(
      "bg-gradient-to-r from-vybe-purple via-vybe-pink to-vybe-orange",
      "bg-clip-text text-transparent",
      className
    )}>
      {children}
    </span>
  )
}
```

#### 2.3 Card Components with Proper Spacing
```typescript
// components/cards/AppCard.tsx
export function AppCard({ app, featured = false }) {
  return (
    <div className="group relative">
      {/* Badge positioning without CSS hacks */}
      {featured && (
        <div className="absolute -top-2 right-4 z-10">
          <Badge variant="featured">Featured</Badge>
        </div>
      )}
      
      <Card className="h-full transition-all hover:scale-105">
        {/* Card content */}
      </Card>
    </div>
  )
}
```

### Phase 3: Page Migration

#### 3.1 Dynamic Routing Structure
```
app/
├── (marketing)/
│   ├── page.tsx           # Home page
│   ├── pricing/page.tsx
│   └── services/page.tsx
├── (auth)/
│   ├── sign-in/[[...sign-in]]/page.tsx
│   └── sign-up/[[...sign-up]]/page.tsx
├── (app)/
│   ├── dashboard/
│   │   ├── layout.tsx     # Dashboard layout with tabs
│   │   ├── page.tsx       # Overview (default)
│   │   ├── mentorship/page.tsx
│   │   ├── review/page.tsx
│   │   └── settings/
│   │       ├── page.tsx
│   │       └── profile/page.tsx
│   ├── apps/
│   │   ├── page.tsx       # Apps listing
│   │   ├── [id]/page.tsx  # App detail
│   │   └── submit/page.tsx
│   ├── guides/
│   │   ├── page.tsx       # Guides listing
│   │   ├── [id]/page.tsx  # Guide detail
│   │   └── create/page.tsx
│   └── members/page.tsx
└── api/
    └── ... (existing API routes)
```

#### 3.2 Page Implementation Order
1. **Home Page** - Hero, features, CTAs
2. **Dashboard Layout** - Tab system, nested routing
3. **Listing Pages** - Apps, Guides, Members with filtering
4. **Detail Pages** - Dynamic routes for app/guide details
5. **Form Pages** - Multi-step forms for submission

### Phase 4: State Management & Data Flow

#### 4.1 Server Components Strategy
```typescript
// app/apps/page.tsx - Server Component
export default async function AppsPage() {
  const apps = await getApps() // Server-side data fetching
  
  return (
    <div>
      <AppsFilter /> {/* Client Component for interactivity */}
      <AppsList apps={apps} /> {/* Server Component */}
    </div>
  )
}
```

#### 4.2 Client State Management
```typescript
// For complex client state (tabs, multi-step forms)
// Use Zustand or Context API
import { create } from 'zustand'

const useDashboardStore = create((set) => ({
  activeTab: 'overview',
  setActiveTab: (tab) => set({ activeTab: tab })
}))
```

### Phase 5: Animation & Effects

#### 5.1 CSS Modules for Complex Animations
```css
/* styles/effects.module.css */
.logoAnimation {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
```

#### 5.2 Framer Motion for Interactive Animations
```typescript
import { motion } from 'framer-motion'

export function AnimatedCard({ children }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.div>
  )
}
```

## Best Practices Implementation

### DO:
1. **Use Shadcn/ui as Base**
   - Extend components rather than creating from scratch
   - Maintain accessibility features
   - Use component variants for different styles

2. **Implement Proper Loading States**
   ```typescript
   export function AppsList({ apps }) {
     if (!apps) return <AppsListSkeleton />
     return <div>{/* Apps grid */}</div>
   }
   ```

3. **Error Boundaries**
   ```typescript
   export function ErrorBoundary({ error }) {
     return <ErrorCard error={error} />
   }
   ```

4. **Image Optimization**
   ```typescript
   import Image from 'next/image'
   
   <Image
     src="/hero-bg.jpg"
     alt="Hero"
     fill
     priority
     className="object-cover"
   />
   ```

### DON'T:
1. **No CSS Hacks**
   - ❌ `text-indent: -9999px`
   - ❌ Absolute positioning for layout
   - ✅ Use proper component composition

2. **No Inline Styles**
   - ❌ `style={{ marginTop: '20px' }}`
   - ✅ Use Tailwind classes or CSS modules

3. **No Direct DOM Manipulation**
   - ❌ `document.getElementById().innerHTML`
   - ✅ Use React state and conditional rendering

## BMAD Workflow Implementation

### Visual Verification Strategy

Each story includes explicit visual verification tasks to ensure pixel-perfect replication. This approach:
- Prevents drift from the demo design
- Catches issues early before they compound
- Creates learning patterns for TRAIL system
- Provides clear definition of "done"

### Enhanced Story Template

```markdown
STORY-XXX: [Component/Feature Name]

## Implementation Tasks
- [ ] Create component file structure
- [ ] Port HTML structure from demo
- [ ] Apply Tailwind classes and design tokens
- [ ] Add interactivity and state management
- [ ] Implement error handling

## Visual Verification Tasks
- [ ] VERIFY: Start dev server (`npm run dev`)
- [ ] VERIFY: Component renders without errors
- [ ] VERIFY: Visual match to demo/pages/[page].html
- [ ] VERIFY: All hover/active states work correctly
- [ ] VERIFY: Animations match demo timing and easing

## Responsive Verification
- [ ] VERIFY: Mobile (375px) layout matches demo
- [ ] VERIFY: Tablet (768px) layout matches demo
- [ ] VERIFY: Desktop (1440px) layout matches demo
- [ ] VERIFY: No horizontal scroll at any breakpoint

## Quality Checks
- [ ] VERIFY: No console errors or warnings
- [ ] VERIFY: Accessibility (keyboard navigation, ARIA labels)
- [ ] VERIFY: Performance (no layout shifts, optimized images)
- [ ] VERIFY: Cross-browser compatibility (Chrome, Firefox, Safari)
```

### Epic Structure with Verification
```
EPIC: Migrate Demo to Production Next.js App
├── STORY-001: Setup Design System and Base Components
│   ├── Implementation Tasks
│   │   ├── Port Tailwind configuration from demo
│   │   ├── Create gradient text component
│   │   ├── Create glassmorphism component
│   │   └── Setup component library structure
│   └── Verification Tasks
│       ├── VERIFY: Colors match demo exactly
│       ├── VERIFY: Gradients render correctly
│       └── VERIFY: Glass effects work on all backgrounds
│
├── STORY-002: Implement Navigation Component
│   ├── Implementation Tasks
│   │   ├── Create Navigation.tsx with glassmorphism
│   │   ├── Implement mobile menu toggle
│   │   ├── Add active state management
│   │   └── Setup sticky scroll behavior
│   └── Verification Tasks
│       ├── VERIFY: Matches demo navigation exactly
│       ├── VERIFY: Mobile menu animation timing (300ms)
│       ├── VERIFY: Glassmorphism blur effect (12px)
│       └── VERIFY: Active states highlight correctly
│
├── STORY-003: Build Home Page Hero Section
│   ├── Implementation Tasks
│   │   ├── Create Hero component with animations
│   │   ├── Implement gradient text effects
│   │   ├── Add CTA buttons with hover states
│   │   └── Setup background nebula effect
│   └── Verification Tasks
│       ├── VERIFY: Text sizes match demo (6xl/8xl)
│       ├── VERIFY: Gradient angles are correct (135deg)
│       ├── VERIFY: Animations match (fade-in 0.8s, slide-up 0.6s)
│       └── VERIFY: Mobile layout stacks correctly
│
├── STORY-004: Create Dashboard Layout System
│   ├── Implementation Tasks
│   │   ├── Setup dashboard layout with sidebar
│   │   ├── Implement tab navigation system
│   │   ├── Create nested routing structure
│   │   └── Add loading states for tab content
│   └── Verification Tasks
│       ├── VERIFY: Tab switching preserves state
│       ├── VERIFY: Active tab styling matches demo
│       ├── VERIFY: Content transitions smoothly
│       └── VERIFY: Mobile dashboard is accessible
│
├── STORY-005: Implement Card Components
│   ├── Implementation Tasks
│   │   ├── Create AppCard with badge positioning
│   │   ├── Create GuideCard with date corner
│   │   ├── Create MemberCard with avatar
│   │   └── Implement card hover effects
│   └── Verification Tasks
│       ├── VERIFY: Badge positioning without CSS hacks
│       ├── VERIFY: Card shadows match (blur: 20px)
│       ├── VERIFY: Hover scale animation (1.05)
│       └── VERIFY: Grid spacing is consistent
│
├── STORY-006: Build Apps Listing Page
│   ├── Implementation Tasks
│   │   ├── Create apps page with filters
│   │   ├── Implement tab navigation (browse/featured/submit)
│   │   ├── Add category filtering
│   │   └── Setup grid layout with proper spacing
│   └── Verification Tasks
│       ├── VERIFY: Grid matches demo (3 columns desktop)
│       ├── VERIFY: Filter animations work smoothly
│       ├── VERIFY: Featured badge positioning
│       └── VERIFY: Mobile layout (1 column)
│
├── STORY-007: Create Multi-Step Forms
│   ├── Implementation Tasks
│   │   ├── Build app submission form (4 steps)
│   │   ├── Build guide creation form (5 steps)
│   │   ├── Implement progress indicators
│   │   └── Add form validation and error states
│   └── Verification Tasks
│       ├── VERIFY: Step indicators match demo styling
│       ├── VERIFY: Form fields have correct styling
│       ├── VERIFY: Validation messages appear correctly
│       └── VERIFY: Progress saves between steps
│
└── STORY-008: Polish and Production Readiness
    ├── Implementation Tasks
    │   ├── Add remaining animations
    │   ├── Implement loading skeletons
    │   ├── Optimize images and fonts
    │   └── Setup error boundaries
    └── Verification Tasks
        ├── VERIFY: All animations match demo timing
        ├── VERIFY: Loading states appear correctly
        ├── VERIFY: Lighthouse score >90
        └── VERIFY: No console errors in production build
```

### Sub-Agent Utilization with Verification

#### Development Flow
1. **bmad-sm**: Creates detailed stories with verification tasks
2. **bmad-architect**: Reviews approach before implementation
3. **bmad-dev**: Implements following the story template
4. **bmad-qa**: Executes all verification tasks
5. **bmad-doc-writer**: Documents verified components

#### Verification Workflow
```bash
# 1. Start story
"Implement STORY-002: Navigation Component"
# bmad-dev creates the component

# 2. Run verification
"Verify Navigation component against demo"
# bmad-qa runs through all verification tasks

# 3. Fix issues if needed
"Fix the mobile menu transition timing"
# bmad-dev adjusts based on QA feedback

# 4. Document when verified
"Document the Navigation component API"
# bmad-doc-writer creates usage docs
```

#### TRAIL Integration
Each verification failure becomes a learning opportunity:
- "Navigation blur should be 12px not 10px" → Saved to TRAIL
- "Hero gradient angle is 135deg not 45deg" → Saved to TRAIL
- "Card shadows need 20px blur for correct depth" → Saved to TRAIL

These patterns prevent the same mistakes in future components.

## Technical Implementation Details

### 1. Styling Approach
```typescript
// Use cn() utility for conditional classes
import { cn } from '@/lib/utils'

<div className={cn(
  "base-classes",
  isActive && "active-classes",
  isPremium && "premium-classes"
)} />
```

### 2. Data Fetching Patterns
```typescript
// Server Component (default)
async function Page() {
  const data = await fetchData()
  return <ClientComponent initialData={data} />
}

// Client Component (when needed)
'use client'
function InteractiveComponent() {
  const { data, isLoading } = useQuery()
  // ...
}
```

### 3. Form Handling
```typescript
// Use react-hook-form with zod validation
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email()
})
```

## Performance Considerations

1. **Code Splitting**
   - Use dynamic imports for heavy components
   - Lazy load non-critical features

2. **Image Optimization**
   - Use Next.js Image component
   - Implement blur placeholders
   - Optimize asset sizes

3. **Font Loading**
   ```typescript
   // app/layout.tsx
   import { Inter, JetBrains_Mono } from 'next/font/google'
   
   const inter = Inter({ 
     subsets: ['latin'],
     variable: '--font-inter'
   })
   ```

## Migration Timeline with Verification Milestones

### Week 1: Foundation and Design System
- **Days 1-2**: Setup and design system configuration
- **Days 3-4**: Base component creation
- **Day 5**: Visual verification of all base components
- **Milestone**: All colors, gradients, and effects match demo ✓

### Week 2: Navigation and Home Page
- **Days 1-2**: Navigation component with mobile menu
- **Day 3**: Home page hero and features
- **Days 4-5**: Visual verification and adjustments
- **Milestone**: Home page pixel-perfect match ✓

### Week 3: Dashboard System
- **Days 1-2**: Dashboard layout and routing
- **Days 3-4**: Tab systems and content panels
- **Day 5**: Comprehensive dashboard verification
- **Milestone**: Dashboard fully functional with all tabs ✓

### Week 4: Content Pages (Apps/Guides/Members)
- **Days 1-2**: Card components and grids
- **Days 3-4**: Listing pages with filters
- **Day 5**: Detail pages and verification
- **Milestone**: All content pages match demo ✓

### Week 5: Interactive Features
- **Days 1-2**: Multi-step form implementation
- **Days 3-4**: Submission workflows
- **Day 5**: End-to-end form verification
- **Milestone**: Forms work identically to demo ✓

### Week 6: Polish and Production
- **Days 1-2**: Animation polish and loading states
- **Days 3-4**: Performance optimization
- **Day 5**: Final visual regression testing
- **Milestone**: Production-ready with >90 Lighthouse score ✓

## Success Criteria

### Visual Fidelity
1. **Pixel-Perfect Match**: Every component matches demo exactly
   - Colors, gradients, shadows are identical
   - Spacing and layout match at all breakpoints
   - Animations have same timing and easing
   - Typography matches size and weight

### Technical Quality
2. **Performance**: Lighthouse score >90
   - First Contentful Paint <1.5s
   - No layout shifts (CLS <0.1)
   - Optimized images with blur placeholders

3. **Accessibility**: WCAG AA compliant
   - All interactive elements keyboard accessible
   - Proper ARIA labels and roles
   - Color contrast passes AA standards

4. **Code Quality**: Clean, maintainable architecture
   - No CSS hacks or workarounds
   - Consistent component patterns
   - Comprehensive documentation
   - Type-safe with TypeScript

### Verification Checklist
- [ ] All 30+ pages migrated and verified
- [ ] Every component passes visual verification
- [ ] Mobile experience matches demo
- [ ] No console errors or warnings
- [ ] TRAIL system has captured all learnings
- [ ] Documentation complete for all components

## Visual Verification Tools

### Recommended Setup
```bash
# Install Playwright for visual testing
npm install -D playwright @playwright/test

# Create visual test helper
# tests/visual-verification.spec.ts
import { test, expect } from '@playwright/test'

test('Navigation matches demo', async ({ page }) => {
  // Load demo
  await page.goto('file:///path/to/demo/index.html')
  const demoNav = await page.locator('nav').screenshot()
  
  // Load Next.js version
  await page.goto('http://localhost:3000')
  const nextNav = await page.locator('nav').screenshot()
  
  // Compare
  expect(nextNav).toMatchSnapshot('navigation.png')
})
```

### Manual Verification Process
1. Open demo in one browser tab
2. Open Next.js app in another tab
3. Use browser DevTools to:
   - Compare computed styles
   - Check actual pixel dimensions
   - Verify animation timings
   - Test responsive breakpoints

### Common Verification Points
- **Gradients**: Check angle, color stops, and transparency
- **Shadows**: Verify blur radius, spread, and color
- **Spacing**: Use DevTools to measure margins/padding
- **Animations**: Check duration, easing, and keyframes
- **Typography**: Verify font-size, line-height, letter-spacing

This enhanced plan with built-in verification ensures a truly pixel-perfect migration while maintaining code quality and learning from any discrepancies along the way.