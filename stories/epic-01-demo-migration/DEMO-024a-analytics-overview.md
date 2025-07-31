# DEMO-024a: Analytics Overview Tab Migration

**Epic:** Pixel-Perfect Demo Migration  
**Priority:** High  
**Story Points:** 5  
**Status:** Ready for Development  
**Created:** 2025-01-31  
**Demo Path:** `/pages/dashboard/overview.html` (Overview tab)  
**Next.js Route:** `/dashboard/analytics` (Overview tab)
**Parent Story:** DEMO-024

## User Story

**As a** logged-in user  
**I want** the analytics overview tab to match the demo exactly  
**So that** I can see my earnings and revenue metrics with the same experience as the original demo

## Acceptance Criteria

### Visual Fidelity
- [ ] Current balance card with payout info matches demo
- [ ] 30-day performance card with sales/revenue/avg metrics
- [ ] Daily revenue chart with horizontal bar visualization
- [ ] Top performers section showing top 3 items
- [ ] Recent transactions list with proper formatting
- [ ] Pro upgrade teaser in top performers section

### Data Display
- [ ] Balance displayed with dollar formatting
- [ ] Performance metrics with percentage changes
- [ ] Bar chart percentages calculated correctly
- [ ] Transaction history with time-relative dates
- [ ] Sales summary metrics in transactions section

### Interactive Elements
- [ ] Hover effects on transaction items
- [ ] Upgrade to Pro button links to Insights tab
- [ ] View Complete History button works
- [ ] Responsive layout at all breakpoints

## Implementation Notes

### Chart Implementation
For the daily revenue chart, implement horizontal bars with:
- Gradient fill (purple to pink)
- Percentage-based widths
- Dollar amounts inside bars
- Day labels and sales count
- "Best!" indicator for highest day

### Card Layouts
- Use consistent card styling from design system
- Emoji icons for visual interest (💰, 📈)
- Proper spacing and typography hierarchy

## Dependencies
- Design System Foundation (reference)
- DEMO-021: Dashboard Main (layout)
- Chart visualization approach (CSS-based like demo)

## Definition of Done Checklist
- [ ] Overview tab displays all sections correctly
- [ ] Data visualization matches demo style
- [ ] All interactive elements function
- [ ] Responsive at all breakpoints
- [ ] Performance optimized