# DEMO-001: Home/Landing Page Migration

**Epic:** Pixel-Perfect Demo Migration  
**Priority:** Critical  
**Story Points:** 13  
**Status:** Ready for Development  
**Created:** 2025-01-30  
**Demo Path:** `/index.html`  
**Next.js Route:** `/`

## User Story

**As a** user visiting the VybeCoding platform  
**I want** the home/landing page to match the demo exactly  
**So that** I experience the same visual design and functionality as the original demo

## Business Value

- **First Impression**: Landing page sets the tone for the entire platform
- **Brand Consistency**: Ensures pixel-perfect brand presentation
- **User Experience**: Maintains familiarity for demo users
- **Foundation**: Establishes component patterns for other pages

## Demo Analysis

### Current Demo Features
- Hero section with animated gradient background
- Main navigation with logo and auth buttons
- Featured content cards with badges
- Call-to-action sections
- Footer with links and social media
- Responsive design across all breakpoints

### Visual Elements
- Dark theme with purple/pink/orange gradients
- Glassmorphism effects on cards
- Lucide icons throughout
- Custom typography with Inter and JetBrains Mono
- Smooth animations and transitions

## Acceptance Criteria

### Visual Fidelity
- [ ] Page matches demo pixel-perfectly at 375px (mobile)
- [ ] Page matches demo pixel-perfectly at 768px (tablet)
- [ ] Page matches demo pixel-perfectly at 1440px (desktop)
- [ ] All gradients, shadows, and effects identical to demo
- [ ] Typography sizes, weights, and spacing match exactly
- [ ] Color values match design tokens exactly
- [ ] Icons match demo (using Lucide React)

### Interactive Elements
- [ ] Navigation menu functions identically to demo
- [ ] All buttons have same hover/focus states as demo
- [ ] Smooth scrolling behavior matches demo
- [ ] Mobile menu toggle works exactly like demo
- [ ] All links route to correct pages (even if placeholder)

### Component Architecture
- [ ] Uses Shadcn/ui components as foundation
- [ ] Follows design-system-showcase.html patterns where applicable
- [ ] Reusable components extracted for Header, Footer, Hero
- [ ] TypeScript strict mode compliance
- [ ] Proper server/client component separation

### Performance & Quality
- [ ] Lighthouse score >90 on all metrics
- [ ] No console errors or warnings
- [ ] WCAG AA accessibility compliance
- [ ] Cross-browser compatibility (Chrome, Firefox, Safari)
- [ ] Loading time <2 seconds

## Visual Verification Checklist

### Development Phase
- [ ] Demo server running on port 8080 (`cd demo && npm start`)
- [ ] Next.js server running on port 3000 (`npm run dev`)
- [ ] Side-by-side browser comparison completed
- [ ] Real-device testing on mobile, tablet, desktop

### Automated Testing
- [ ] Playwright visual regression tests pass
- [ ] Visual diff score <2% at all breakpoints
- [ ] Screenshot comparison at 375px, 768px, 1440px
- [ ] Animation timing matches demo exactly

### Manual Verification
- [ ] All colors match using browser dev tools color picker
- [ ] All spacing and margins measured and verified
- [ ] All fonts, sizes, and weights match demo
- [ ] All interactive states (hover, focus, active) match
- [ ] All animations and transitions match timing and easing

## Technical Implementation

### Next.js App Router Structure
```
app/
├── page.tsx              # Home page component
├── layout.tsx            # Root layout with header/footer
└── globals.css           # Global styles and design tokens
```

### Component Extraction
```
components/
├── ui/                   # Shadcn/ui base components
├── layout/
│   ├── Header.tsx        # Main navigation
│   ├── Footer.tsx        # Site footer
│   └── Navigation.tsx    # Mobile/desktop navigation
├── sections/
│   ├── Hero.tsx          # Hero section with gradient
│   ├── FeaturedCards.tsx # Featured content cards
│   └── CallToAction.tsx  # CTA sections
└── common/
    ├── Badge.tsx         # Reusable badge component
    └── GradientBg.tsx    # Gradient background component
```

### Design System Integration
- [ ] Import color tokens from design-system-showcase.html patterns
- [ ] Use consistent spacing scale (4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px)
- [ ] Implement typography scale matching demo
- [ ] Extract gradient patterns for reuse
- [ ] Create shadow utilities matching demo effects

## Story Completion Workflow

### Post-Development
1. **Visual Verification Complete**: All acceptance criteria met
2. **Run Story Completion Workflow**: Execute `.claude/workflows/story-completion.md`
3. **Automated Tests**: Playwright visual tests pass
4. **Performance Audit**: Lighthouse scores verified

### Master Checklist Activation
After story completion workflow:
- [ ] Component documentation updated
- [ ] Design patterns recorded in component library
- [ ] Reusable components available for other stories
- [ ] Performance benchmarks established
- [ ] Accessibility patterns documented

## Dependencies

### Technical Dependencies
- ✅ Next.js 15.4.4 with App Router
- ✅ Shadcn/ui component library installed
- ✅ Tailwind CSS with custom config
- ✅ Lucide React icons
- ✅ TypeScript strict mode

### Design Dependencies
- ✅ Demo running on port 8080
- ✅ Design system showcase available
- ✅ Color tokens and design patterns documented

### Blocking Dependencies
- None (this is the foundation story)

## Risk Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Complex gradient animations | High | Break down into smaller components, test incrementally |
| Responsive design complexity | Medium | Start mobile-first, progressively enhance |
| Performance with animations | Medium | Use CSS transforms, avoid layout thrashing |
| Component extraction decisions | Low | Follow design-system-showcase.html patterns |

## Notes

- This story establishes the foundation for all other page migrations
- Component patterns created here will be reused throughout the epic
- Focus on pixel-perfect accuracy over optimization (optimization comes in polish phase)
- Document all component decisions for consistency across other stories
- Any deviations from demo must be approved and documented

## Related Stories

**Immediate Dependencies:**
- None (foundation story)

**Stories that depend on this:**
- DEMO-002: Design System Showcase (uses extracted components)
- DEMO-003: Dashboard Home (uses header/footer components)
- All other stories (use navigation and layout components)

## Definition of Done Checklist

### Development Complete
- [ ] All acceptance criteria met
- [ ] TypeScript strict mode compliance
- [ ] No console errors or warnings
- [ ] Cross-browser compatibility verified

### Visual Verification Complete
- [ ] Pixel-perfect at all breakpoints
- [ ] All interactive elements function identically
- [ ] Manual verification checklist completed
- [ ] Automated visual tests pass (<2% diff)

### Quality Assurance Complete
- [ ] Accessibility audit passed (WCAG AA)
- [ ] Performance benchmarks met (Lighthouse >90)
- [ ] Unit tests written for components

### Production Ready
- [ ] Story completion workflow executed
- [ ] Master checklist completed
- [ ] Component documentation updated
- [ ] Ready for other stories to use components