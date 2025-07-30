# DEMO-007: Forgot Password Page Migration

**Epic:** Pixel-Perfect Demo Migration  
**Priority:** Medium  
**Story Points:** 3  
**Status:** Ready for Development  
**Created:** 2025-01-30  
**Demo Path:** `/pages/auth/forgot-password.html`  
**Next.js Route:** `/forgot-password`

## User Story

**As a** user who forgot their password  
**I want** the forgot password page to match the demo exactly  
**So that** I can reset my password with the same experience as the original demo

## Acceptance Criteria

### Visual Fidelity
- [ ] Form layout matches demo exactly at all breakpoints
- [ ] Input styling matches demo
- [ ] Button styling matches demo
- [ ] Instructions text matches demo typography
- [ ] Error/success states match demo styling

### Interactive Elements
- [ ] Email validation matches demo behavior
- [ ] Form submission works correctly
- [ ] Button hover states match demo
- [ ] Back to sign-in link functions correctly

### Integration
- [ ] Integrates with Clerk password reset
- [ ] Email sent confirmation matches demo UX
- [ ] Error handling matches demo patterns

## Visual Verification Checklist
- [ ] Demo page at http://localhost:8080/pages/auth/forgot-password.html
- [ ] Next.js page at http://localhost:3000/forgot-password
- [ ] Side-by-side comparison completed

## Dependencies
- Design System Foundation (reference)
- DEMO-001: Header/Footer components
- Clerk authentication setup

## Definition of Done Checklist
- [ ] Pixel-perfect at all breakpoints
- [ ] Password reset integration working
- [ ] Story completion workflow executed
- [ ] Master checklist completed