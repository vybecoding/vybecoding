# DEMO-010: Guides Main Page Migration

**Epic:** Pixel-Perfect Demo Migration  
**Priority:** High  
**Story Points:** 8  
**Status:** Ready for Development  
**Created:** 2025-01-30  
**Demo Path:** `/pages/guides.html`  
**Next.js Route:** `/guides`

## User Story

**As a** user exploring VybeCoding guides  
**I want** the main guides page to match the demo exactly  
**So that** I can discover guides with the same experience as the original demo

## Acceptance Criteria

### Visual Fidelity
- [ ] Hero section matches demo exactly
- [ ] Featured guides section matches demo layout
- [ ] Category filters match demo styling
- [ ] Guide cards match demo appearance
- [ ] Badge components match demo

### Interactive Elements
- [ ] Category filter buttons function identically
- [ ] Featured guide cards have correct hover effects
- [ ] "Browse All Guides" navigation works correctly
- [ ] Guide difficulty indicators match demo

### Component Architecture
- [ ] Uses Card components from design system foundation
- [ ] Uses Badge components for categories/difficulty
- [ ] Uses Header/Footer from DEMO-001
- [ ] Reusable filter components

## Visual Verification Checklist
- [ ] Demo page at http://localhost:8080/pages/guides.html
- [ ] Next.js page at http://localhost:3000/guides
- [ ] Side-by-side comparison completed

## Dependencies
- Design System Foundation (reference)
- DEMO-001: Header/Footer components
- DEMO-004: Guides Browse (navigation target)

## Definition of Done Checklist
- [ ] Pixel-perfect at all breakpoints
- [ ] All interactive elements function identically
- [ ] Story completion workflow executed  
- [ ] Master checklist completed