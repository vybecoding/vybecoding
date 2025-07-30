# STORY-007: Create Multi-Step Forms

**Epic:** Demo to Production Migration  
**Priority:** High  
**Story Points:** 13  
**Status:** Ready for Development  
**Created:** 2025-01-30  
**Dev Agent:** Unassigned

## User Story

**As a** content creator on vybecoding  
**I want** intuitive multi-step forms that match the demo's design  
**So that** I can easily submit apps and guides without feeling overwhelmed

## Business Value

- Reduces form abandonment through progressive disclosure
- Improves data quality with structured input
- Enhances user experience for content submission
- Increases platform content generation
- Establishes pattern for complex workflows

## Acceptance Criteria

### ✅ Form Structure
- [ ] Progress indicator matches demo style
- [ ] Step navigation (next/back/skip)
- [ ] Form state persistence between steps
- [ ] Validation per step before proceeding
- [ ] Review step before submission
- [ ] Success confirmation screen

### ✅ App Submission Form (4 steps)
- [ ] Step 1: Basic Info (name, description, category)
- [ ] Step 2: Technical Details (platform, stack, pricing)
- [ ] Step 3: Visual Assets (icon, screenshots, video)
- [ ] Step 4: Links & Review (urls, final check)
- [ ] Draft saving functionality
- [ ] Image upload with preview

### ✅ Guide Creation Form (5 steps)
- [ ] Step 1: Guide Basics (title, summary, category)
- [ ] Step 2: Content (markdown editor with preview)
- [ ] Step 3: Metadata (difficulty, duration, prerequisites)
- [ ] Step 4: Resources (links, downloads, code samples)
- [ ] Step 5: Preview & Publish
- [ ] Auto-save functionality

### ✅ Visual Design
- [ ] Progress bar with gradient fill
- [ ] Step numbers with completion states
- [ ] Smooth transitions between steps
- [ ] Error states match demo styling
- [ ] Loading states during submission
- [ ] Mobile-optimized layout

### 🔍 Visual Verification
- [ ] VERIFY: Progress bar height (8px)
- [ ] VERIFY: Step indicator size (40px)
- [ ] VERIFY: Form field styling matches
- [ ] VERIFY: Button placement and size
- [ ] VERIFY: Animation timing (300ms)
- [ ] VERIFY: Mobile step layout

## Technical Implementation Details

### Form Architecture
```typescript
// components/forms/MultiStepForm.tsx
interface MultiStepFormProps {
  steps: FormStep[];
  onSubmit: (data: any) => Promise<void>;
  defaultValues?: any;
}

interface FormStep {
  id: string;
  title: string;
  description?: string;
  fields: FieldConfig[];
  validation: ZodSchema;
  isOptional?: boolean;
}
```

### State Management
```typescript
// Using Zustand for form state
const useFormStore = create((set) => ({
  currentStep: 0,
  formData: {},
  errors: {},
  updateField: (step, field, value) => {...},
  nextStep: () => {...},
  previousStep: () => {...},
  submitForm: async () => {...}
}));
```

### Progress Indicator
```css
/* Demo progress bar styling */
.progress-bar {
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.progress-fill {
  background: linear-gradient(90deg, #8a2be2, #d946a0);
  transition: width 300ms ease;
}
```

### Demo Reference
- App form: `/demo/pages/apps-submit.html`
- Guide form: `/demo/pages/guides-create.html`
- Progress styles: `/demo/css/forms.css`
- Validation: `/demo/js/form-validation.js`

## Dependencies

### Technical Dependencies
- ✅ React Hook Form
- ✅ Zod for validation
- ✅ Shadcn form components
- ⚠️ File upload solution
- ⚠️ Markdown editor
- ✅ Design system

### Prerequisite Stories
- ✅ STORY-001: Design System
- ✅ STORY-005: Card Components (for preview)

## Dev Agent Record

### Planning Phase
- [ ] Analyze demo form flows
- [ ] Design validation strategy
- [ ] Plan file upload approach
- [ ] Extract form measurements

### Implementation Phase
- [ ] Create MultiStepForm base
- [ ] Build progress indicator
- [ ] Implement step navigation
- [ ] Add form state management
- [ ] Create app submission steps
- [ ] Build guide creation steps
- [ ] Add file upload handlers
- [ ] Implement validation logic
- [ ] Add draft/autosave
- [ ] Create success screens

### Verification Phase
- [ ] Test complete form flows
- [ ] Verify validation works
- [ ] Check responsive behavior
- [ ] Test file uploads
- [ ] Validate accessibility

### Documentation Phase
- [ ] Form builder guide
- [ ] Validation patterns
- [ ] State management docs
- [ ] Customization examples

## Definition of Done

- [ ] Both forms pixel-perfect match
- [ ] All validations working
- [ ] File uploads functional
- [ ] Draft saving works
- [ ] Mobile responsive
- [ ] Accessible forms
- [ ] Loading states smooth
- [ ] Documentation complete

## Visual Verification Checklist

### Form Layout
- [ ] Container max-width: 720px
- [ ] Step padding: 48px desktop, 24px mobile
- [ ] Field spacing: 24px between groups
- [ ] Button group: right-aligned

### Progress Indicator
- [ ] Bar height: 8px
- [ ] Step circles: 40px diameter
- [ ] Active step: gradient border
- [ ] Completed: solid fill
- [ ] Connector lines: 2px

### Field Styling
- [ ] Input height: 48px
- [ ] Label size: 14px medium
- [ ] Error text: 12px red-500
- [ ] Help text: 12px muted
- [ ] Focus ring: 2px purple

## Notes

### Form Flow Best Practices
- Show clear progress throughout
- Allow backward navigation
- Save progress automatically
- Validate on step completion
- Show summary before submit

### Technical Considerations
- Debounce auto-save (1s)
- Compress images client-side
- Show upload progress
- Handle network failures
- Prevent duplicate submissions

### Accessibility Requirements
- Keyboard navigation
- Screen reader announcements
- Error messages linked to fields
- Clear focus indicators
- Progress updates announced

## Next Steps

1. Integration with backend APIs
2. Email notifications on submission
3. Admin review interface
4. Analytics on form completion
5. A/B testing form variations

## Success Metrics

- Form completion rate >60%
- Average time to complete <5min
- Error rate per field <5%
- Draft recovery usage >30%
- Mobile completion rate >50%