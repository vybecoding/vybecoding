# USER-002: Apps Submission System

**Epic**: VybeCoding Platform MVP  
**Status**: Ready for Development  
**Priority**: High  
**Estimated Effort**: 5-8 story points  
**Dependencies**: USER-001 (User Profile System) ✅

## User Story

**As a** developer on VybeCoding  
**I want to** submit my applications for showcase  
**So that** I can display my work to potential clients and collaborators

## Acceptance Criteria

### App Submission Form
- [ ] Multi-step form with progress indicator
- [ ] Form saves draft automatically to prevent data loss
- [ ] All fields validate on blur and on submit
- [ ] Mobile-responsive form layout
- [ ] Clear error messages with field highlighting

### App Data Fields
- [ ] **Basic Information**
  - [ ] App name (required, 3-50 characters)
  - [ ] Short description (required, 10-160 characters)
  - [ ] Full description (required, 50-2000 characters, markdown support)
  - [ ] Category (required, select from predefined list)
  - [ ] Tags (optional, up to 5 tags)
  
- [ ] **Visual Assets**
  - [ ] App icon upload (required, 512x512px min, .png/.jpg/.webp)
  - [ ] Screenshots (required, min 2, max 6, 1280x720px min)
  - [ ] Demo video URL (optional, YouTube/Vimeo)
  
- [ ] **Links**
  - [ ] Live app URL (required if web app)
  - [ ] App Store URL (required if iOS app)
  - [ ] Play Store URL (required if Android app)
  - [ ] GitHub repository (optional, public repos only)
  - [ ] Documentation URL (optional)
  
- [ ] **Technical Details**
  - [ ] Tech stack (multi-select from predefined list)
  - [ ] Platform (Web, iOS, Android, Desktop, multi-select)
  - [ ] License type (select from common licenses)

### Submission Workflow
- [ ] Save as draft functionality
- [ ] Preview before submission
- [ ] Edit draft submissions
- [ ] Submit for review action
- [ ] View submission status (draft/submitted/in-review/approved/rejected)
- [ ] Email notification on status change

### Data Storage (Convex)
- [ ] Create `apps` table with appropriate schema
- [ ] Link apps to user profiles via userId
- [ ] Store submission timestamps
- [ ] Track status history
- [ ] Implement soft delete for rejected apps

### Security & Validation
- [ ] Validate all URLs with validator.js
- [ ] Sanitize markdown content with DOMPurify
- [ ] Verify image uploads are valid images
- [ ] Limit file sizes (icon: 2MB, screenshots: 5MB each)
- [ ] Rate limit submissions (max 5 per day per user)
- [ ] CSRF protection on forms

### Profile Integration
- [ ] Display approved apps on user profile
- [ ] Show app count in profile stats
- [ ] Link from app to creator profile
- [ ] Apps section in profile with grid layout

## Technical Requirements

### Frontend Components
```typescript
// Components to create
components/apps/
├── AppSubmissionForm.tsx      // Main multi-step form
├── AppFormSteps/
│   ├── BasicInfoStep.tsx      // Name, description, category
│   ├── VisualAssetsStep.tsx   // Icon and screenshots upload
│   ├── LinksStep.tsx          // URLs and links
│   ├── TechnicalStep.tsx      // Tech stack and platform
│   └── ReviewStep.tsx         // Preview before submit
├── AppCard.tsx                // Display app in grid
├── AppGrid.tsx                // Grid layout for apps
├── AppStatusBadge.tsx         // Show submission status
└── ImageUploader.tsx          // Reusable image upload component
```

### Convex Schema
```typescript
// convex/schema.ts additions
apps: defineTable({
  // Creator info
  userId: v.string(),
  
  // Basic info
  name: v.string(),
  shortDescription: v.string(),
  fullDescription: v.string(),
  category: v.string(),
  tags: v.optional(v.array(v.string())),
  
  // Visual assets
  iconUrl: v.string(),
  screenshots: v.array(v.string()),
  demoVideoUrl: v.optional(v.string()),
  
  // Links
  liveUrl: v.optional(v.string()),
  appStoreUrl: v.optional(v.string()),
  playStoreUrl: v.optional(v.string()),
  githubUrl: v.optional(v.string()),
  documentationUrl: v.optional(v.string()),
  
  // Technical
  techStack: v.array(v.string()),
  platforms: v.array(v.string()),
  license: v.string(),
  
  // Metadata
  status: v.string(), // draft, submitted, in-review, approved, rejected
  statusHistory: v.array(v.object({
    status: v.string(),
    timestamp: v.number(),
    reason: v.optional(v.string())
  })),
  createdAt: v.number(),
  updatedAt: v.number(),
  submittedAt: v.optional(v.number()),
  approvedAt: v.optional(v.number()),
  featured: v.optional(v.boolean()),
  views: v.optional(v.number()),
  likes: v.optional(v.number())
})
.index("by_user", ["userId"])
.index("by_status", ["status"])
.index("by_category", ["category"])
.index("by_created", ["createdAt"])
```

### API Endpoints (Convex Functions)
```typescript
// convex/apps.ts
- createApp(data) - Create new app draft
- updateApp(id, data) - Update existing app
- submitApp(id) - Change status from draft to submitted
- getApp(id) - Get single app details
- getUserApps(userId) - Get all apps by user
- getApprovedApps(filters) - Get approved apps with filtering
- deleteApp(id) - Soft delete app
- uploadImage(file, type) - Handle image uploads
```

### Form Validation Rules
- App name: 3-50 chars, alphanumeric + spaces
- Short description: 10-160 chars
- Full description: 50-2000 chars, markdown allowed
- URLs: Valid URL format, HTTPS required for live apps
- Images: Valid image formats, size limits enforced
- At least 2 screenshots required
- GitHub URLs must be public repositories

### Categories (Predefined)
- Web Application
- Mobile Application  
- Desktop Application
- Browser Extension
- API/Backend Service
- Developer Tool
- Game
- Educational
- Business/Productivity
- Social/Communication
- Entertainment
- Other

### Tech Stack Options (Predefined)
- Frontend: React, Vue, Angular, Svelte, Next.js, etc.
- Backend: Node.js, Python, Ruby, Go, Java, etc.
- Database: PostgreSQL, MySQL, MongoDB, Redis, etc.
- Cloud: AWS, Google Cloud, Azure, Vercel, etc.
- Mobile: React Native, Flutter, Swift, Kotlin, etc.

## UI/UX Requirements

### Form Design
- Clean, modern multi-step form
- Progress indicator at top
- Smooth transitions between steps
- Auto-save indicator
- Clear CTAs for "Save Draft" and "Continue"

### Image Upload UX
- Drag & drop support
- Preview uploaded images
- Reorder screenshots
- Clear file size/format requirements
- Progress bars for uploads

### Responsive Design
- Mobile-first approach
- Touch-friendly controls
- Appropriate keyboard on mobile
- Collapsible form sections on small screens

## Integration Points

### With USER-001 (Profile System)
- Link apps to user profiles
- Show app count in profile stats
- Display approved apps on profile page
- Use existing user authentication

### With Future Stories
- USER-003: App discovery/search
- USER-004: App reviews/ratings
- USER-005: Featured apps system

## Testing Requirements

### Unit Tests
- [ ] Form validation logic
- [ ] Image upload validation
- [ ] URL validation
- [ ] Status transition logic

### Integration Tests  
- [ ] Complete form submission flow
- [ ] Draft save and resume
- [ ] Image upload to storage
- [ ] Profile integration

### E2E Tests
- [ ] Full submission journey
- [ ] Edit existing app
- [ ] View on profile
- [ ] Status updates

## Security Considerations

1. **Input Validation**: All fields validated with validator.js
2. **XSS Prevention**: Markdown sanitized with DOMPurify  
3. **File Upload Security**: Validate mime types, scan for malware
4. **Rate Limiting**: Prevent spam submissions
5. **Access Control**: Users can only edit their own apps
6. **HTTPS Only**: All external URLs must use HTTPS

## Dev Agent Record

### Implementation Plan
1. Set up Convex schema and migrations
2. Create reusable ImageUploader component
3. Build form step components
4. Implement form state management
5. Add Convex functions for CRUD operations
6. Integrate with user profiles
7. Add email notifications
8. Write comprehensive tests

### Technical Decisions
- Use react-hook-form for form management
- Uploadthing or Convex storage for images
- Zod for schema validation
- TanStack Query for data fetching
- Sonner for toast notifications

### Notes
- Consider implementing auto-save with debouncing
- Add analytics to track popular categories
- Plan for moderation dashboard (admin story)
- Consider implementing app templates

---

**Created**: 2025-01-29  
**Last Updated**: 2025-01-29  
**Story Manager**: Stella (bmad-sm)