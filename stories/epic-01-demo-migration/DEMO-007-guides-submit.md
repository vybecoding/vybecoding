# DEMO-007: Guides Submit Page Migration

**Epic:** Pixel-Perfect Demo Migration  
**Priority:** High  
**Story Points:** 13  
**Status:** APPROVED  
**Created:** 2025-01-30  
**Demo Path:** `/pages/guides/submit.html`  
**Next.js Route:** `/guides/submit`

## User Story

**As a** content creator wanting to submit a guide  
**I want** the guide submission page to match the demo exactly  
**So that** I can create guides with the same experience as the original demo

## Acceptance Criteria

### Visual Fidelity
- [x] Multi-step form layout matches demo exactly
- [x] Markdown editor matches demo appearance
- [x] Progress indicator matches demo styling
- [x] Preview mode matches demo
- [x] Category selection matches demo

### Interactive Elements
- [x] Multi-step form navigation works identically
- [x] Markdown editor functionality matches demo
- [x] Live preview updates correctly
- [x] Category selection works correctly
- [x] Save draft functionality matches demo

### Editor Integration
- [x] Markdown editor with syntax highlighting
- [x] Live preview matches demo styling
- [x] Image upload within editor (placeholder UI)
- [x] Code block formatting matches demo

## Visual Verification Checklist
- [x] Demo page at http://localhost:8080/pages/guides/guides-main.html (Submit tab)
- [x] Next.js page at http://localhost:3000/guides/submit
- [x] Multi-step form and editor tested completely

## Dependencies
- [x] Design System Foundation (reference)
- [x] DEMO-001: Header/Footer components
- [x] DEMO-002: Dashboard (authentication system integrated)
- [x] Markdown editor library setup

## Definition of Done Checklist
- [x] Pixel-perfect at all breakpoints
- [x] Multi-step form fully functional
- [x] Markdown editor working correctly
- [x] Story completion workflow executed
- [x] Master checklist completed

## Implementation Notes

### Key Features Implemented:
- **Multi-step Form**: 5-step guide creation process matching demo exactly
  - Step 1: Overview (title, description, category, difficulty, tags)
  - Step 2: Modules (guide structure with lessons)
  - Step 3: Content (markdown editor with toolbar and live preview)
  - Step 4: Resources (file upload areas)
  - Step 5: Review & Submit (AI review checklist)
- **Progress Indicator**: Visual step navigation with active states
- **Auto-save**: Draft saving functionality with status indicator
- **Form Validation**: Required field validation before step progression
- **Markdown Editor**: Rich toolbar with syntax highlighting
- **Live Preview**: Real-time markdown rendering
- **Responsive Design**: Mobile-friendly layout

### Design Improvements Made:
- Enhanced form validation with better error messages
- Improved accessibility with proper ARIA labels
- Added auto-save functionality for better UX
- Responsive design improvements for mobile devices

### Technical Integration:
- Integrated with existing Convex database schema
- Connected to authentication system via Clerk
- Uses existing guide constants and utilities
- Follows established design system patterns