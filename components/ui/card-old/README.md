# Universal Card Component System

A robust, flexible card component system built with CSS Modules and Tailwind that eliminates CSS cascade conflicts.

## Problem Solved

The demo had 30+ CSS fix files dealing with card-related issues:
- Badge spacing inconsistencies
- Card height problems
- Grid layout conflicts
- Label duplication
- Hover state issues

This system solves all these problems with:
- **CSS Modules**: No cascade conflicts
- **Consistent spacing**: Built-in spacing system
- **Type-safe variants**: TypeScript interfaces
- **Glassmorphism**: Modern glass effect
- **Responsive grids**: Auto-adjusting layouts

## Components

### Base Components

#### Card
The foundation component with variants and built-in features.

```tsx
<Card 
  variant="guide"
  date={new Date()}
  stats={<div>Stats here</div>}
  onClick={() => {}}
>
  Content here
</Card>
```

#### CardGrid
Responsive grid container with multiple layout options.

```tsx
<CardGrid columns="auto" gap="md" maxWidth="xl">
  <Card>...</Card>
  <Card>...</Card>
</CardGrid>
```

### Specialized Cards

#### GuideCard
For educational content with author info, difficulty, and engagement metrics.

```tsx
<GuideCard
  title="React Best Practices"
  author={{ name: "John Doe", avatar: "/avatar.jpg" }}
  description="Learn React the right way"
  tags={["React", "JavaScript"]}
  views={1000}
  likes={50}
  difficulty="intermediate"
  duration="20 min"
/>
```

#### AppCard
For showcasing applications with ratings and download stats.

```tsx
<AppCard
  title="Code Editor"
  developer="DevCorp"
  icon="/icon.png"
  category="Development"
  pricing="freemium"
  rating={4.5}
  downloads={5000}
/>
```

#### MemberCard
For team/community member profiles with availability status.

```tsx
<MemberCard
  name="Jane Smith"
  avatar="/jane.jpg"
  role="Senior Developer"
  expertise={["React", "Node.js"]}
  location="San Francisco"
  isAvailable={true}
  rating={4.8}
  hourlyRate={150}
/>
```

#### NewsCard
For news/blog content with featured images.

```tsx
<NewsCard
  title="Breaking: New Framework Released"
  excerpt="A revolutionary new framework..."
  author={{ name: "Tech Reporter" }}
  image="/news.jpg"
  category="Technology"
  readTime="5 min"
  date={new Date()}
/>
```

## Features

### No CSS Conflicts
- Uses CSS Modules for complete style isolation
- No specificity wars or !important overrides
- Each component has its own scoped styles

### Consistent Design
- Glassmorphism background effect
- Hover states with translateY animation
- Type labels in top-left corner
- Dates in top-right corner
- Stats section pinned to bottom

### Responsive
- Auto-adjusting grid layouts
- Mobile-optimized spacing
- Flexible card heights

### Accessible
- Proper ARIA labels
- Keyboard navigation
- Focus indicators

### Type-Safe
- Full TypeScript support
- Intellisense for all props
- Compile-time type checking

## Usage

```tsx
import { CardGrid, GuideCard, AppCard } from '@/components/ui/card';

export function MyPage() {
  return (
    <CardGrid columns="auto" gap="md">
      <GuideCard {...guideProps} />
      <AppCard {...appProps} />
    </CardGrid>
  );
}
```

## Migration from Demo

Replace old card HTML:
```html
<!-- Old -->
<div class="minimal-card" onclick="showGuideDetail()">
  <span class="badge">GUIDE</span>
  ...
</div>

<!-- New -->
<GuideCard 
  title="..." 
  onClick={() => showGuideDetail()}
/>
```

## Benefits

1. **Maintainability**: Single source of truth for card styles
2. **Consistency**: All cards follow the same design system
3. **Performance**: CSS Modules = smaller bundle size
4. **Developer Experience**: Type-safe, auto-complete props
5. **No More Fixes**: Eliminates need for CSS override files