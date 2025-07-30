# STORY-001: Setup Design System and Base Components

**Epic:** Demo to Production Migration  
**Priority:** Critical  
**Story Points:** 8  
**Status:** Partially Complete  
**Created:** 2025-01-30  
**Dev Agent:** James (bmad-dev)

## User Story

**As a** developer on the vybecoding platform  
**I want** a comprehensive design system with reusable base components  
**So that** all UI elements maintain pixel-perfect consistency with the demo while being maintainable and scalable

## Business Value

- Eliminates 30+ CSS fix files from the demo
- Provides single source of truth for all design decisions
- Enables rapid component development with consistency
- Reduces CSS bundle size by 65%
- Prevents future style conflicts and drift

## Acceptance Criteria

### ✅ Design System Configuration
- [x] Tailwind config matches demo color palette exactly
- [x] All demo colors ported to design tokens
- [x] Typography scale matches demo (font sizes, line heights, weights)
- [x] Spacing scale consistent with demo patterns
- [x] Animation timings and easings defined
- [ ] Glassmorphism effects properly configured
- [ ] Gradient definitions match demo angles and stops

### ✅ Theme System
- [x] Dark theme as default (matching demo)
- [ ] Light theme with proper token mapping
- [x] Theme persistence in localStorage
- [x] No flash of unstyled content (FOUC)
- [ ] System preference detection
- [x] Smooth theme transitions

### ✅ Base Components
- [x] Button component with all demo variants
- [x] Input components (text, password, textarea)
- [x] Card base component with proper shadows
- [ ] Badge component matching demo styling
- [ ] Tag component with hash prefix
- [x] Form field wrapper with labels
- [ ] Loading states and skeletons

### ✅ Typography Components
- [x] Heading component (h1-h6) with demo styles
- [x] Text component with size/color variants
- [x] Code component with syntax highlighting
- [x] List components (ordered/unordered)
- [ ] Gradient text utility matching demo

### ✅ Layout Components
- [x] Container with max-width constraints
- [x] Stack component for vertical spacing
- [x] Grid component with responsive columns
- [x] Section component with consistent padding
- [x] Divider component with demo styling

### 🔍 Visual Verification
- [ ] VERIFY: All colors match demo hex values exactly
- [ ] VERIFY: Button hover states match demo transitions
- [ ] VERIFY: Card shadows match demo (20px blur radius)
- [ ] VERIFY: Typography sizes match at all breakpoints
- [ ] VERIFY: Spacing scale creates identical layouts
- [ ] VERIFY: Gradient angles match demo (135deg primary)

## Technical Implementation Details

### Design Token Structure
```typescript
// design-system/tokens/colors.ts
export const colors = {
  vybe: {
    // Dark palette from demo
    void: '#000000',
    dark: '#0a0a0a',
    midnight: '#111111',
    shadow: '#1a1a1a',
    steel: '#242424',
    slate: '#2a2a2a',
    
    // Brand colors from demo
    purple: '#8a2be2',
    'purple-light': '#a855f7',
    pink: '#d946a0',
    orange: '#e96b3a',
    
    // Accent colors
    'matrix-green': '#00ff88',
    'neural-purple': '#8844ff',
    cyan: '#06b6d4',
    emerald: '#10b981'
  }
}
```

### Component Architecture
```
components/
├── ui/                    # Shadcn base components
│   ├── button.tsx        # Extended from Shadcn
│   ├── card.tsx          # Extended from Shadcn
│   ├── input.tsx         # Extended from Shadcn
│   └── ...
├── design-system/
│   ├── tokens/           # Design tokens
│   ├── theme/            # Theme provider
│   └── utils/            # Style utilities
└── common/
    ├── GradientText.tsx  # Demo gradient effect
    ├── GlassCard.tsx     # Glassmorphism card
    └── AnimatedLogo.tsx  # Logo with effects
```

### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: { ...designTokens },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'gentle-bounce': 'gentleBounce 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite'
      },
      backdropBlur: {
        'xs': '2px',
        '12': '12px' // For glassmorphism
      }
    }
  }
}
```

## Work Completed (Prior to Story Creation)

### ✅ Already Implemented
- Basic Tailwind configuration
- Theme provider with dark mode
- Button component with Shadcn base
- Form components (Input, Textarea, Select)
- Card component structure
- Layout components (Container, Stack, Grid)
- Typography components (Heading, Text)

### 🔄 Needs Completion
- Gradient text utility component
- Glassmorphism effects configuration
- Badge and Tag components
- Loading states and skeletons
- Visual verification against demo
- Light theme token mapping

## Dependencies

### Technical Dependencies
- ✅ Tailwind CSS v3.4.0
- ✅ Shadcn/ui components
- ✅ Lucide React icons
- ✅ class-variance-authority
- ✅ clsx for class merging

### Prerequisite Stories
- None (foundational story)

## Dev Agent Record

### Planning Phase
- [x] Analyze demo CSS and extract design tokens
- [x] Map demo styles to Tailwind configuration
- [x] Plan component architecture
- [x] Identify Shadcn components to extend

### Implementation Phase
- [x] Setup Tailwind with demo tokens
- [x] Create theme provider system
- [x] Implement base Button component
- [x] Build form component suite
- [x] Create layout components
- [ ] Add gradient and glass effects
- [ ] Complete Badge and Tag components
- [ ] Implement loading states

### Verification Phase
- [ ] Visual comparison with demo
- [ ] Cross-browser testing
- [ ] Responsive breakpoint verification
- [ ] Theme switching validation
- [ ] Performance audit

### Documentation Phase
- [ ] Component usage examples
- [ ] Design token documentation
- [ ] Theme customization guide
- [ ] Migration notes from demo

## Definition of Done

- [x] All design tokens extracted from demo
- [x] Base components created with Shadcn
- [ ] Visual verification passed (pixel-perfect)
- [ ] Unit tests for utility functions
- [ ] Storybook stories for all components
- [ ] Documentation complete
- [ ] Zero CSS conflicts or hacks
- [ ] Performance benchmarks met

## Notes

### Key Findings from Demo Analysis
- Demo uses 30+ CSS fix files indicating iterative design
- Glassmorphism is critical for navigation and cards
- Gradients are 135deg with specific color stops
- Shadows use 20px blur for depth effect
- Animations are subtle (0.3s - 0.8s durations)

### Technical Decisions
- Use CSS variables for dynamic theming
- Extend Shadcn components rather than replacing
- Keep demo's exact color values for consistency
- Use Tailwind's JIT mode for optimal bundle size

### Risks and Mitigations
- **Risk**: Theme flash on initial load
- **Mitigation**: Inline critical CSS in head

- **Risk**: Component style conflicts  
- **Mitigation**: Scoped styling with CSS modules where needed

## Next Steps

Once this story is complete:
1. STORY-002 can begin (Navigation component)
2. All other components can reference design system
3. Visual regression tests can be established
4. Component library can be published

## Success Metrics

- CSS bundle size reduced by 65%
- Zero style conflicts reported
- Component reuse > 80% across pages
- Theme switch < 50ms
- Developer satisfaction with DX