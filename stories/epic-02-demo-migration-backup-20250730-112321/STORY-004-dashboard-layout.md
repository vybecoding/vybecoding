# STORY-004: Create Dashboard Layout System

**Epic:** Demo to Production Migration  
**Priority:** High  
**Story Points:** 13  
**Status:** Ready for Development  
**Created:** 2025-01-30  
**Dev Agent:** Unassigned

## User Story

**As a** authenticated vybecoding user  
**I want** a dashboard with the same tabbed layout and visual design as the demo  
**So that** I can manage all my platform activities from a central, intuitive interface

## Business Value

- Central hub for user activities
- Improves user retention through organization
- Reduces support requests with clear navigation
- Establishes pattern for complex layouts
- Foundation for future dashboard features

## Acceptance Criteria

### ✅ Layout Structure
- [ ] Two-column layout matching demo (sidebar + content)
- [ ] Fixed sidebar with user info and navigation
- [ ] Tab system for content sections
- [ ] Responsive collapse to mobile menu
- [ ] Proper spacing and alignment throughout
- [ ] Breadcrumb navigation where applicable

### ✅ Sidebar Design
- [ ] User avatar and name at top
- [ ] User stats (apps, guides, likes)
- [ ] Navigation menu with icons
- [ ] Active state highlighting
- [ ] Settings link at bottom
- [ ] Glassmorphism effect matching nav

### ✅ Tab System
- [ ] Overview, Apps, Guides, Mentorship, Review tabs
- [ ] Active tab styling matches demo
- [ ] Smooth tab switching (no flicker)
- [ ] Tab content lazy loading
- [ ] URL updates with tab selection
- [ ] Mobile: Horizontal scrollable tabs

### ✅ Content Area
- [ ] Full height with proper padding
- [ ] Background matches demo dark theme
- [ ] Card-based content sections
- [ ] Consistent heading styles
- [ ] Loading states for async content

### 🔍 Visual Verification
- [ ] VERIFY: Sidebar width is 280px desktop
- [ ] VERIFY: Tab height matches demo (48px)
- [ ] VERIFY: Active tab gradient effect
- [ ] VERIFY: Content padding is 32px
- [ ] VERIFY: Mobile menu matches demo
- [ ] VERIFY: All transitions are smooth

## Technical Implementation Details

### Layout Architecture
```typescript
// app/(app)/dashboard/layout.tsx
export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto">
        <DashboardTabs />
        {children}
      </main>
    </div>
  )
}
```

### Tab Configuration
```typescript
const tabs = [
  { id: 'overview', label: 'Overview', href: '/dashboard' },
  { id: 'apps', label: 'My Apps', href: '/dashboard/apps' },
  { id: 'guides', label: 'My Guides', href: '/dashboard/guides' },
  { id: 'mentorship', label: 'Mentorship', href: '/dashboard/mentorship' },
  { id: 'review', label: 'Review', href: '/dashboard/review' }
];
```

### Route Structure
```
app/(app)/dashboard/
├── layout.tsx          # Dashboard layout wrapper
├── page.tsx           # Overview (default tab)
├── apps/page.tsx      # My Apps tab
├── guides/page.tsx    # My Guides tab
├── mentorship/page.tsx # Mentorship tab
├── review/page.tsx    # Review Queue tab
└── settings/
    ├── page.tsx       # Settings main
    └── profile/page.tsx # Profile settings
```

### Demo Reference
- Layout: `/demo/pages/dashboard/index.html`
- Tabs: `/demo/pages/dashboard/overview.html`
- Mobile: `/demo/css/dashboard-mobile.css`

## Dependencies

### Technical Dependencies
- ✅ Next.js App Router for layouts
- ✅ Shadcn Tabs component
- ✅ Lucide icons for sidebar
- ⚠️ User data from Convex
- ✅ Design system tokens

### Prerequisite Stories
- ✅ STORY-001: Design System
- ✅ STORY-002: Navigation
- ⚠️ USER-001: Profile System (for user data)

## Dev Agent Record

### Planning Phase
- [ ] Analyze demo dashboard structure
- [ ] Plan routing architecture
- [ ] Design state management approach
- [ ] Extract measurements and styles

### Implementation Phase
- [ ] Create dashboard layout wrapper
- [ ] Build sidebar component
- [ ] Implement tab navigation
- [ ] Create content area structure
- [ ] Add responsive behavior
- [ ] Integrate with user data
- [ ] Implement loading states

### Verification Phase
- [ ] Visual comparison with demo
- [ ] Test all tab transitions
- [ ] Verify responsive breakpoints
- [ ] Check loading performance
- [ ] Validate accessibility

### Documentation Phase
- [ ] Layout usage documentation
- [ ] Tab system customization
- [ ] State management guide
- [ ] Mobile considerations

## Definition of Done

- [ ] Pixel-perfect match to demo dashboard
- [ ] All tabs functioning with routing
- [ ] Responsive design working
- [ ] Loading states implemented
- [ ] No console errors
- [ ] Accessibility compliant
- [ ] Performance benchmarks met
- [ ] Documentation complete

## Visual Verification Checklist

### Desktop (1440px)
- [ ] Sidebar width: 280px
- [ ] Sidebar padding: 24px
- [ ] Avatar size: 64px
- [ ] Tab height: 48px
- [ ] Tab padding: 16px horizontal
- [ ] Content padding: 32px

### Mobile (375px)
- [ ] Full width layout
- [ ] Collapsible sidebar
- [ ] Horizontal tab scroll
- [ ] Reduced padding: 16px
- [ ] Touch-friendly tap targets

### Colors & Effects
- [ ] Sidebar bg: rgba(26, 26, 26, 0.8)
- [ ] Active tab: gradient indicator
- [ ] Content bg: #0a0a0a
- [ ] Card bg: #1a1a1a
- [ ] Borders: rgba(255,255,255,0.1)

## Notes

### Key Demo Features
- Sidebar has subtle glassmorphism
- Active tab has gradient underline
- Smooth transitions between tabs
- Stats update in real-time
- Mobile menu slides from left

### Implementation Strategy
- Use Next.js parallel routes for tabs
- Implement optimistic UI updates
- Cache tab content for performance
- Progressive enhancement approach

### Potential Challenges
- Tab state persistence on refresh
- Deep linking to specific tabs
- Loading state coordination
- Mobile gesture handling

## Next Steps

After dashboard layout:
1. Each tab content can be built
2. Settings pages use same layout
3. Pattern established for admin views
4. Can add more tabs easily

## Success Metrics

- Tab switch time <100ms
- No layout shift on navigation
- 95% user task completion
- Mobile usability score >90
- Zero navigation errors reported