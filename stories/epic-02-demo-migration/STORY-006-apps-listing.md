# STORY-006: Build Apps Listing Page

**Epic:** Demo to Production Migration  
**Priority:** High  
**Story Points:** 8  
**Status:** Ready for Development  
**Created:** 2025-01-30  
**Dev Agent:** Unassigned

## User Story

**As a** platform user looking for AI-powered applications  
**I want** to browse and filter apps exactly like the demo  
**So that** I can discover tools that match my needs and interests

## Business Value

- Primary content discovery mechanism
- Drives app adoption and engagement
- Showcases platform value
- Enables monetization through featured apps
- Critical for developer ecosystem

## Acceptance Criteria

### ✅ Page Layout
- [ ] Header with page title and description
- [ ] Tab navigation (Browse, Featured, Submit)
- [ ] Filter sidebar on desktop
- [ ] Grid layout for app cards
- [ ] Pagination or infinite scroll
- [ ] Mobile-responsive design

### ✅ Filter System
- [ ] Category filter (dropdown or chips)
- [ ] Pricing filter (Free, Paid, Freemium)
- [ ] Platform filter (Web, iOS, Android)
- [ ] Tech stack multi-select
- [ ] Sort options (Popular, New, Rating)
- [ ] Active filter indicators

### ✅ App Grid Display
- [ ] 3-column grid on desktop
- [ ] 2-column tablet, 1-column mobile
- [ ] Consistent card spacing (24px gap)
- [ ] Loading skeletons while fetching
- [ ] Empty state when no results
- [ ] Featured apps highlighted

### ✅ Interactive Features
- [ ] Real-time filter updates
- [ ] Smooth animations on filter
- [ ] Card hover effects
- [ ] Click to app detail page
- [ ] URL updates with filters
- [ ] Back button preserves state

### 🔍 Visual Verification
- [ ] VERIFY: Grid matches demo layout
- [ ] VERIFY: Filter sidebar width (280px)
- [ ] VERIFY: Tab styling identical
- [ ] VERIFY: Card shadows and spacing
- [ ] VERIFY: Mobile filter drawer
- [ ] VERIFY: Loading skeleton style

## Technical Implementation Details

### Page Structure
```typescript
// app/(main)/apps/page.tsx
export default async function AppsPage({
  searchParams
}: {
  searchParams: { category?: string; pricing?: string; platform?: string }
}) {
  const apps = await getApps(searchParams);
  
  return (
    <div className="container">
      <PageHeader />
      <TabNavigation />
      <div className="flex gap-8">
        <FilterSidebar />
        <AppGrid apps={apps} />
      </div>
    </div>
  );
}
```

### Filter Configuration
```typescript
const filters = {
  categories: [
    'Development', 'Design', 'Content',
    'Analytics', 'Communication', 'Automation'
  ],
  pricing: ['free', 'paid', 'freemium'],
  platforms: ['web', 'ios', 'android', 'desktop'],
  techStack: [
    'React', 'Vue', 'Angular', 'Next.js',
    'Node.js', 'Python', 'AI/ML'
  ]
};
```

### Data Fetching
```typescript
// Use Convex for real-time updates
const apps = useQuery(api.apps.list, {
  category: filters.category,
  pricing: filters.pricing,
  platform: filters.platform,
  techStack: filters.techStack,
  sort: sortOption,
  limit: 12,
  cursor: pagination.cursor
});
```

### Demo Reference
- Main page: `/demo/pages/apps.html`
- Filters: `/demo/pages/apps-browse.html`
- Featured: `/demo/pages/apps-featured.html`
- Mobile: `/demo/css/apps-mobile.css`

## Dependencies

### Technical Dependencies
- ✅ Next.js App Router
- ✅ Convex for data
- ✅ AppCard from STORY-005
- ✅ Shadcn Select/Checkbox
- ✅ Design system tokens

### Prerequisite Stories
- ✅ STORY-001: Design System
- ✅ STORY-005: Card Components
- ⚠️ API: Apps query functions

## Dev Agent Record

### Planning Phase
- [ ] Analyze demo apps page flow
- [ ] Design filter state management
- [ ] Plan URL parameter strategy
- [ ] Extract exact layouts

### Implementation Phase
- [ ] Create apps page structure
- [ ] Build filter sidebar component
- [ ] Implement tab navigation
- [ ] Create app grid with cards
- [ ] Add filter state management
- [ ] Implement sorting logic
- [ ] Add pagination/infinite scroll
- [ ] Create loading states
- [ ] Build empty states

### Verification Phase
- [ ] Compare grid to demo
- [ ] Test all filter combinations
- [ ] Verify responsive behavior
- [ ] Check loading performance
- [ ] Validate URL persistence

### Documentation Phase
- [ ] Page structure documentation
- [ ] Filter system guide
- [ ] State management notes
- [ ] Performance considerations

## Definition of Done

- [ ] Pixel-perfect match to demo
- [ ] All filters working correctly
- [ ] Responsive at all breakpoints
- [ ] Loading states smooth
- [ ] URL parameters work
- [ ] Performance <2s load
- [ ] Accessibility compliant
- [ ] Documentation complete

## Visual Verification Checklist

### Desktop Layout (1440px)
- [ ] Container max-width: 1280px
- [ ] Filter sidebar: 280px width
- [ ] Content area: flex-1
- [ ] Grid: 3 columns
- [ ] Card gap: 24px
- [ ] Page padding: 32px

### Mobile Layout (375px)
- [ ] Full width cards
- [ ] Filter button triggers drawer
- [ ] Sticky filter bar
- [ ] Reduced padding: 16px
- [ ] Single column grid

### Component Styles
- [ ] Tab active indicator: gradient
- [ ] Filter chips: outlined style
- [ ] Sort dropdown: right aligned
- [ ] Loading skeleton: pulse animation
- [ ] Empty state: centered icon + text

## Notes

### Demo Observations
- Featured tab shows different layout
- Filters update results instantly
- URL reflects active filters
- Mobile has bottom sheet filters
- Pagination shows 12 items per page

### Technical Decisions
- Use URL params for shareable searches
- Debounce filter changes (300ms)
- Virtual scroll for performance
- Progressive enhancement approach
- Cache filter results

### Performance Optimization
- Server-side initial render
- Client-side filter updates
- Image lazy loading in cards
- Skeleton loading states
- Prefetch on hover

## Next Steps

1. App detail pages (dynamic routes)
2. Submit app form (STORY-007)
3. Featured apps algorithm
4. Developer dashboard
5. App analytics

## Success Metrics

- Page load time <2s
- Filter interaction <100ms
- Bounce rate <30%
- App discovery rate >40%
- Filter usage >60% of visits