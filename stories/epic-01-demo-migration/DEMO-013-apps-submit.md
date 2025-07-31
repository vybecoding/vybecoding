# DEMO-013: Apps Submit Page Migration

**Epic:** Pixel-Perfect Demo Migration  
**Priority:** High  
**Story Points:** 13  
**Status:** Completed ✅  
**Created:** 2025-01-30  
**Completed:** 2025-01-30  
**Demo Path:** `/pages/apps/submit.html`  
**Next.js Route:** `/apps/submit`

## User Story

**As a** developer wanting to submit an app  
**I want** the app submission page to match the demo exactly  
**So that** I can submit my app with the same experience as the original demo

## Acceptance Criteria

### Visual Fidelity
- [x] Multi-step form layout matches demo exactly
- [x] Progress indicator matches demo styling
- [x] Form fields match demo appearance
- [x] Pricing section added to Basic Info step
- [x] Step navigation matches demo

### Interactive Elements
- [x] Multi-step form navigation works identically
- [x] Form validation matches demo behavior
- [x] Save draft functionality with auto-save
- [x] Submit button states match demo
- [x] Terms acceptance checkbox in Submit step

### Form Integration
- [x] Form data persists between steps
- [x] Form submission integrates with database
- [x] Validation errors match demo styling
- [x] 4-step process matching demo (Basic Info, Details, Preview, Submit)

## Visual Verification Checklist
- [x] Demo page at http://localhost:8080/pages/apps/submit.html
- [x] Next.js page at http://localhost:3000/apps/submit
- [x] Multi-step form flow tested completely

## Dependencies
- Design System Foundation (reference)
- DEMO-001: Header/Footer components ✅
- DEMO-002: Dashboard (authentication required) ✅
- Convex database integration ✅

## Definition of Done Checklist
- [x] Pixel-perfect at all breakpoints
- [x] Multi-step form fully functional
- [x] Story completion workflow executed
- [x] Master checklist completed

## Implementation Notes
- Restructured form from 5 steps to 4 steps to match demo
- Added comprehensive pricing section to Basic Info step
- Created separate Preview and Submit steps matching demo
- Implemented auto-save functionality every 30 seconds
- Form uses Convex for data persistence
- All fields are validated according to APP_VALIDATION constants