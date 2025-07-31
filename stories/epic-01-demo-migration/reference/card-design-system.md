# VybeCoding Card Design System

## Overview
The VybeCoding design system uses a three-tier card hierarchy with specific styling patterns for each level.

## Card Hierarchy

### 1. Primary Cards
Primary cards use a **header bar style** for major content sections and important features.

**Characteristics:**
- Dark header section at the top containing the title
- Header background: `rgba(20, 20, 20, 0.8)` or similar dark shade
- Clear separation between header and content
- Used for main dashboard widgets, major form sections

**Variants:**
- **Primary Default**: Subtle gray header
- **Primary Gradient**: Gradient header for maximum visual impact
- **Primary Purple**: Purple header for brand-focused content
- **Primary Pink**: Pink header for CTAs and user engagement
- **Primary Orange**: Orange header for highlights and promotions

**Example Use Cases:**
- Dashboard sections (Daily Revenue Trend, Recent Transactions)
- Major form sections (Resources & Downloads)
- Review sections (AI Review Checklist, Guide Summary)

### 2. Secondary Cards
Secondary cards use **icons with optional colored borders** for moderate emphasis.

**Characteristics:**
- Icon placed inline with the title (no header bar)
- Optional colored border variants
- More subtle than primary cards

**Variants:**
- **Secondary Default**: Icon only, standard border
- **Secondary Purple**: Icon + purple border all around
- **Secondary Pink**: Icon + pink border all around
- **Secondary Orange**: Icon + orange border all around

**Example Use Cases:**
- Feature lists
- Settings sections
- Information cards
- Stats displays with context

### 3. Tertiary Cards
Tertiary cards have minimal styling for background information.

**Characteristics:**
- Minimal accent, mostly for grouping related content
- Very subtle borders
- Background information display

**Variants:**
- **Tertiary Default**: Minimal accent
- **Tertiary Purple**: Purple accent for supporting content
- **Tertiary Pink**: Pink accent for additional information
- **Tertiary Orange**: Orange accent for notes

## Implementation Guidelines

### When to Use Each Type

**Use Primary Cards for:**
- Main dashboard widgets with data visualization
- Multi-step form sections that need clear headers
- Important feature sections that require strong visual hierarchy
- Sections containing multiple sub-elements

**Use Secondary Cards for:**
- Individual features or options
- Settings groups
- Informational sections with icons
- Medium-priority content areas

**Use Tertiary Cards for:**
- Supporting information
- Notes and tips
- Background content
- Low-priority groupings

### Color Usage

- **Purple**: Brand-focused features, primary actions
- **Pink**: User engagement, CTAs, interactive elements
- **Orange**: Highlights, promotions, attention-grabbing content
- **Default/Gray**: Standard content, neutral information

## Base Styling

All cards share these base properties:
```css
background: rgba(26, 26, 26, 0.8);
backdrop-filter: blur(10px);
border: 1px solid rgba(51, 51, 51, 0.4);
border-radius: 0.5rem;
```

Hover state:
```css
background: rgba(42, 42, 42, 0.8);
border-color: rgba(64, 64, 64, 0.5);
transform: translateY(-2px);
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
```

## Component Structure

### Primary Card
```tsx
<Card variant="primary" headerVariant="default|gradient|purple|pink|orange">
  <CardHeader>
    <CardTitle>Title Goes Here</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

### Secondary Card
```tsx
<Card variant="secondary" colorVariant="default|purple|pink|orange">
  <CardContent>
    <div className="flex items-center gap-3">
      <Icon className="w-5 h-5" />
      <CardTitle>Title Goes Here</CardTitle>
    </div>
    {/* Rest of content */}
  </CardContent>
</Card>
```

## Migration Notes

### From Purple Accent Line
The previous implementation used a small purple gradient line next to titles:
```tsx
<div className="w-1 h-4 bg-gradient-to-b from-vybe-purple to-vybe-pink rounded-full" />
```

This should be replaced with either:
1. Primary card with header (for major sections)
2. Secondary card with icon (for feature sections)

### Icon Selection
Choose icons that clearly represent the content:
- 📊 Charts/Analytics: BarChart3, TrendingUp, LineChart
- 💰 Financial: DollarSign, CreditCard, Wallet
- 📁 Resources: Upload, Download, FileText, Folder
- ✅ Reviews/Checklists: CheckCircle, ClipboardCheck
- 👥 User/Social: Users, UserPlus, Heart
- ⚡ Performance: Zap, Activity, Gauge