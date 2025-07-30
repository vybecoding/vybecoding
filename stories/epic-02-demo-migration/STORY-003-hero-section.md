# STORY-003: Build Home Page Hero Section

**Epic:** Demo to Production Migration  
**Priority:** High  
**Story Points:** 8  
**Status:** Ready for Development  
**Created:** 2025-01-30  
**Dev Agent:** Unassigned

## User Story

**As a** first-time visitor to vybecoding  
**I want** an engaging hero section that matches the demo's visual impact  
**So that** I immediately understand the platform's value and feel compelled to explore further

## Business Value

- First impression determines user engagement
- Communicates core value proposition
- Drives conversions to sign-up
- Establishes brand identity
- Sets quality expectations for entire platform

## Acceptance Criteria

### ✅ Visual Design
- [ ] Background particle animation matches demo
- [ ] Gradient text effect identical to demo
- [ ] Typography hierarchy matches exactly
- [ ] CTA button styling matches demo
- [ ] Responsive scaling preserves design
- [ ] Subtle animations on scroll

### ✅ Content Structure
- [ ] Main headline with gradient effect
- [ ] Subheadline with proper spacing
- [ ] Value proposition text
- [ ] Primary CTA button (Start Building with AI)
- [ ] Secondary text (free, no credit card)
- [ ] Down arrow scroll indicator

### ✅ Animations
- [ ] Fade-in animation on load (0.8s)
- [ ] Slide-up for text elements (0.6s delay)
- [ ] Particle background animation
- [ ] Gradient text shimmer effect
- [ ] Button hover animations
- [ ] Scroll indicator bounce

### ✅ Responsive Behavior
- [ ] Mobile: Stacked layout, smaller text
- [ ] Tablet: Adjusted spacing
- [ ] Desktop: Full hero height (100vh)
- [ ] Text remains readable at all sizes
- [ ] Particles perform well on mobile

### 🔍 Visual Verification
- [ ] VERIFY: Gradient angle is 135deg
- [ ] VERIFY: Main headline is 6xl on desktop
- [ ] VERIFY: Particle colors match demo
- [ ] VERIFY: Button gradient matches exactly
- [ ] VERIFY: Spacing between elements
- [ ] VERIFY: Animation timings match demo

## Technical Implementation Details

### Hero Structure
```typescript
// components/sections/Hero.tsx
interface HeroProps {
  headline: string;
  subheadline: string;
  description: string;
  ctaText: string;
  ctaHref: string;
}
```

### Gradient Text Effect
```css
.gradient-text {
  background: linear-gradient(
    135deg,
    #8a2be2 0%,
    #d946a0 50%,
    #e96b3a 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Particle Background
```typescript
// Using particles.js or custom canvas
const particleConfig = {
  particles: {
    number: { value: 80 },
    color: { value: ['#8a2be2', '#d946a0', '#e96b3a'] },
    size: { value: 3, random: true },
    move: { speed: 1, direction: 'none' }
  }
};
```

### Demo Reference
- Hero HTML: `/demo/index.html`
- Animations: `/demo/css/animations.css`
- Particles: `/demo/js/particles-config.js`

## Dependencies

### Technical Dependencies
- ✅ Framer Motion for animations
- ⚠️ Particles.js or custom implementation
- ✅ Design system tokens
- ✅ Button component from STORY-001

### Prerequisite Stories
- ✅ STORY-001: Design System
- ✅ STORY-002: Navigation (for layout)

## Dev Agent Record

### Planning Phase
- [ ] Analyze demo hero implementation
- [ ] Extract particle configuration
- [ ] Plan animation sequence
- [ ] Design responsive strategy

### Implementation Phase
- [ ] Create Hero component structure
- [ ] Implement gradient text component
- [ ] Add particle background system
- [ ] Build animation sequences
- [ ] Integrate CTA button
- [ ] Add scroll indicator
- [ ] Implement responsive styles

### Verification Phase
- [ ] Visual comparison with demo
- [ ] Animation timing validation
- [ ] Performance testing (FPS)
- [ ] Mobile performance check
- [ ] Cross-browser testing

### Documentation Phase
- [ ] Component usage guide
- [ ] Animation customization
- [ ] Performance notes
- [ ] Particle system docs

## Definition of Done

- [ ] Pixel-perfect match to demo hero
- [ ] All animations smooth (60 FPS)
- [ ] Lighthouse performance >90
- [ ] No console errors
- [ ] Accessible content structure
- [ ] SEO meta tags included
- [ ] Documentation complete

## Visual Verification Checklist

### Typography
- [ ] Headline: 96px (6xl) desktop, 48px mobile
- [ ] Subheadline: 24px (2xl) desktop, 18px mobile
- [ ] Body text: 18px desktop, 16px mobile
- [ ] Line height: 1.2 for headlines, 1.6 for body

### Spacing
- [ ] Hero height: 100vh desktop, auto mobile
- [ ] Padding: 80px top desktop, 40px mobile
- [ ] Element gaps: 32px between sections
- [ ] CTA margin: 48px top

### Colors
- [ ] Background: #000000 (vybe-void)
- [ ] Gradient start: #8a2be2
- [ ] Gradient middle: #d946a0
- [ ] Gradient end: #e96b3a
- [ ] Text: white with opacity variations

## Notes

### Performance Considerations
- Particle system should use requestAnimationFrame
- Consider reducing particles on mobile
- Lazy load particle system
- Use CSS transforms for animations
- Optimize gradient rendering

### Accessibility
- Ensure text contrast passes WCAG
- Provide option to disable animations
- Keyboard navigation for CTA
- Screen reader friendly structure
- Alt text for decorative elements

## Next Steps

1. After hero, implement features section
2. Reuse gradient text in other sections
3. Particle system can enhance other pages
4. Animation patterns establish timing

## Success Metrics

- 80% of visitors see full hero (no bounce)
- CTA click rate >15%
- Page load time <2s
- Animation performance >55 FPS
- Zero accessibility violations