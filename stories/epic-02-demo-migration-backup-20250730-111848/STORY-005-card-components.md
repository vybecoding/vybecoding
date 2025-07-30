# STORY-005: Implement Card Components

**Epic:** Demo to Production Migration  
**Priority:** High  
**Story Points:** 8  
**Status:** Partially Complete  
**Created:** 2025-01-30  
**Dev Agent:** James (bmad-dev)

## User Story

**As a** platform user browsing content  
**I want** consistent, visually appealing cards that match the demo exactly  
**So that** I can easily scan and interact with apps, guides, and member information

## Business Value

- Core UI pattern used throughout platform
- Directly impacts content discoverability
- Establishes visual hierarchy
- Improves user engagement with content
- Reduces cognitive load through consistency

## Acceptance Criteria

### ✅ Base Card Component
- [x] Flexible card container with variants
- [x] Proper shadows matching demo (20px blur)
- [x] Dark theme background colors
- [x] Hover state with scale effect
- [ ] Click feedback animation
- [x] Responsive padding adjustments

### ✅ AppCard Component
- [ ] App icon/screenshot display
- [ ] App name and developer info
- [ ] Category and pricing badges
- [ ] Rating display (stars)
- [ ] Download count
- [ ] Featured badge positioning
- [ ] Hover state with shadow increase

### ✅ GuideCard Component
- [ ] Gradient category tag in corner
- [ ] Title with 2-line truncation
- [ ] Author info with avatar
- [ ] Read time and difficulty badges
- [ ] View count and likes
- [ ] Date in corner style
- [ ] Hover lift effect

### ✅ MemberCard Component
- [ ] Avatar with online status
- [ ] Name and title/role
- [ ] Skills tags (max 3 visible)
- [ ] Location and availability
- [ ] Connect button
- [ ] Verified badge if applicable
- [ ] Smooth hover transitions

### 🔍 Visual Verification
- [ ] VERIFY: Shadow blur is exactly 20px
- [ ] VERIFY: Card backgrounds match demo
- [ ] VERIFY: Badge positioning pixel-perfect
- [ ] VERIFY: Hover scale is 1.02
- [ ] VERIFY: Grid gaps are consistent
- [ ] VERIFY: Typography hierarchy correct

## Technical Implementation Details

### Component Architecture
```typescript
// Base Card
interface CardProps {
  variant?: 'default' | 'outlined' | 'elevated' | 'interactive';
  className?: string;
  children: React.ReactNode;
}

// Specialized Cards
interface AppCardProps {
  app: {
    id: string;
    name: string;
    developer: string;
    icon: string;
    category: string;
    pricing: 'free' | 'paid' | 'freemium';
    rating: number;
    downloads: number;
    featured?: boolean;
  };
}
```

### Shadow System
```css
/* Demo shadow values */
.card {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
}

.card:hover {
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.7);
  transform: translateY(-2px) scale(1.02);
}
```

### Grid Layout
```typescript
// Responsive grid for card containers
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

### Demo Reference
- AppCard: `/demo/pages/apps.html`
- GuideCard: `/demo/pages/guides.html`
- MemberCard: `/demo/pages/members.html`
- Shadows: `/demo/css/cards.css`

## Work Completed (Prior to Story)

### ✅ Already Implemented
- Base Card component structure
- Shadow and hover effects (partial)
- Dark theme integration
- Basic responsive behavior

### 🔄 Needs Completion
- Specialized card variants (App, Guide, Member)
- Exact shadow matching
- Badge positioning system
- Grid layout standards
- Visual verification against demo

## Dependencies

### Technical Dependencies
- ✅ Shadcn Card as base
- ✅ Lucide icons for ratings/badges
- ✅ Design system tokens
- ✅ Next.js Image for optimization
- ⚠️ Avatar component for members

### Prerequisite Stories
- ✅ STORY-001: Design System

## Dev Agent Record

### Planning Phase
- [x] Review demo card implementations
- [x] Extract exact measurements
- [ ] Design flexible API
- [ ] Plan badge positioning system

### Implementation Phase - Base
- [x] Create base Card component
- [x] Add shadow system
- [ ] Implement click feedback
- [x] Add hover animations

### Implementation Phase - Variants
- [ ] Build AppCard with all elements
- [ ] Create GuideCard with corner date
- [ ] Implement MemberCard with avatar
- [ ] Add badge positioning system
- [ ] Create loading skeletons

### Verification Phase
- [ ] Visual comparison each variant
- [ ] Test responsive behavior
- [ ] Verify hover states
- [ ] Check grid alignment
- [ ] Validate accessibility

### Documentation Phase
- [ ] Card usage examples
- [ ] Variant documentation
- [ ] Grid layout guide
- [ ] Customization options

## Definition of Done

- [ ] All card variants pixel-perfect
- [ ] Shadows match demo exactly
- [ ] Hover animations smooth
- [ ] Grid layouts consistent
- [ ] Loading states implemented
- [ ] Unit tests written
- [ ] Documentation complete
- [ ] Zero console errors

## Visual Verification Checklist

### Card Dimensions
- [ ] Min height: 200px (AppCard)
- [ ] Padding: 24px all variants
- [ ] Border radius: 12px
- [ ] Image height: 160px (where used)

### Typography
- [ ] Title: 18px font-semibold
- [ ] Subtitle: 14px text-muted
- [ ] Body: 14px regular
- [ ] Badges: 12px font-medium

### Colors
- [ ] Background: #1a1a1a (steel)
- [ ] Hover bg: #242424 (slate)
- [ ] Border: rgba(255,255,255,0.1)
- [ ] Shadow: rgba(0,0,0,0.5)

### Badge Positioning
- [ ] Featured: top-right, -8px offset
- [ ] Category: top-left corner
- [ ] Price: bottom-right
- [ ] Rating: below title

## Notes

### Key Demo Patterns
- Cards use consistent 20px blur shadows
- Hover creates "lift" effect
- Badges overlap card boundaries
- Grid maintains alignment despite varying content
- Loading shows skeleton shapes

### Performance Considerations
- Lazy load images
- Virtualize long lists
- Optimize shadow rendering
- Use CSS transforms for animations
- Implement skeleton loading

### Accessibility
- Proper heading hierarchy
- Alt text for all images
- Keyboard navigation support
- Focus indicators
- Screen reader descriptions

## Next Steps

1. Card components enable content pages
2. STORY-006 will use AppCard
3. Guide pages will use GuideCard
4. Member directory uses MemberCard
5. Pattern extends to other content

## Success Metrics

- Card click-through rate >20%
- Loading time <100ms per card
- Zero layout shifts in grid
- Accessibility score 100
- User satisfaction >4.5/5