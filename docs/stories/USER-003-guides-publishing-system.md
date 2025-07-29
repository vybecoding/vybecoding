# USER-003: Guides Publishing System

**Epic**: VybeCoding Platform MVP  
**Status**: Ready for Development  
**Priority**: High  
**Estimated Effort**: 8-10 story points  
**Dependencies**: USER-001 (User Profile System) ✅

## User Story

**As a** developer on VybeCoding  
**I want to** create and publish educational guides and tutorials  
**So that** I can share my knowledge and establish expertise in the community

## Acceptance Criteria

### Guide Editor
- [ ] Markdown editor with live preview (split-screen view)
- [ ] Syntax highlighting for code blocks
- [ ] Support for common markdown features (headers, lists, tables, etc.)
- [ ] Image upload and embedding
- [ ] Auto-save every 60 seconds
- [ ] Keyboard shortcuts for common formatting
- [ ] Mobile-responsive editor interface
- [ ] Word count and estimated reading time display

### Guide Content Features
- [ ] **Code Blocks**
  - [ ] Syntax highlighting for 20+ languages
  - [ ] Copy code button
  - [ ] Line numbers toggle
  - [ ] Language indicator
  - [ ] Support for code diffs

- [ ] **Table of Contents**
  - [ ] Auto-generated from headers
  - [ ] Sticky sidebar navigation
  - [ ] Smooth scroll to sections
  - [ ] Current section highlighting
  - [ ] Collapsible on mobile

- [ ] **Media Support**
  - [ ] Image uploads (max 5MB per image)
  - [ ] Image optimization on upload
  - [ ] Alt text for accessibility
  - [ ] Video embeds (YouTube, Vimeo)
  - [ ] Code sandbox embeds

### Publishing Workflow
- [ ] Save draft functionality
- [ ] Preview mode before publishing
- [ ] Draft/Published status toggle
- [ ] Version history (last 10 versions)
- [ ] Schedule publishing (optional)
- [ ] Unpublish without deletion
- [ ] SEO metadata editing (title, description, image)

### Guide Organization
- [ ] Categories (predefined list)
- [ ] Tags (up to 10 per guide)
- [ ] Series support (group related guides)
- [ ] Difficulty level (Beginner/Intermediate/Advanced)
- [ ] Time to read estimation
- [ ] Related guides suggestions

### Reading Experience
- [ ] Clean, distraction-free reading view
- [ ] Responsive typography
- [ ] Dark/light mode toggle
- [ ] Progress indicator
- [ ] Bookmarking functionality
- [ ] Share buttons (social media, copy link)
- [ ] Print-friendly version
- [ ] Table of contents navigation

### Analytics & Metrics
- [ ] View count tracking
- [ ] Unique readers count
- [ ] Average reading time
- [ ] Completion rate
- [ ] Most popular sections (based on time spent)
- [ ] Reader engagement score

### Profile Integration
- [ ] Display published guides on profile
- [ ] Guide count in profile stats
- [ ] Author bio section on guides
- [ ] Link to author's other guides
- [ ] "Follow author" functionality

## Technical Requirements

### Frontend Components
```typescript
// Components to create
components/guides/
├── GuideEditor/
│   ├── MarkdownEditor.tsx      // Main editor with CodeMirror
│   ├── PreviewPane.tsx         // Live preview with styling
│   ├── EditorToolbar.tsx       // Formatting buttons
│   ├── ImageUploader.tsx       // Drag & drop image upload
│   └── MetadataEditor.tsx      // SEO and guide settings
├── GuideViewer/
│   ├── GuideContent.tsx        // Rendered markdown display
│   ├── TableOfContents.tsx     // Sticky navigation
│   ├── CodeBlock.tsx           // Syntax highlighted code
│   ├── ProgressBar.tsx         // Reading progress
│   └── ShareButtons.tsx        // Social sharing
├── GuideListing/
│   ├── GuideCard.tsx           // Guide preview card
│   ├── GuideGrid.tsx           // Grid layout
│   ├── GuideFilters.tsx        // Category/tag filters
│   └── GuideSearch.tsx         // Search functionality
├── GuideAnalytics.tsx          // Author analytics view
└── GuideVersionHistory.tsx     // Version comparison
```

### Convex Schema
```typescript
// convex/schema.ts additions
guides: defineTable({
  // Author info
  authorId: v.string(),
  
  // Content
  title: v.string(),
  slug: v.string(),
  content: v.string(), // Markdown content
  excerpt: v.string(), // Auto-generated or custom
  
  // Metadata
  category: v.string(),
  tags: v.array(v.string()),
  difficulty: v.string(), // beginner, intermediate, advanced
  readingTime: v.number(), // Estimated minutes
  
  // SEO
  seoTitle: v.optional(v.string()),
  seoDescription: v.optional(v.string()),
  seoImage: v.optional(v.string()),
  
  // Organization
  seriesId: v.optional(v.string()),
  seriesOrder: v.optional(v.number()),
  
  // Status
  status: v.string(), // draft, published, unpublished
  publishedAt: v.optional(v.number()),
  scheduledAt: v.optional(v.number()),
  
  // Versioning
  versions: v.array(v.object({
    content: v.string(),
    title: v.string(),
    savedAt: v.number(),
    wordCount: v.number()
  })),
  
  // Analytics
  views: v.number(),
  uniqueReaders: v.number(),
  totalReadingTime: v.number(),
  completions: v.number(),
  
  // Timestamps
  createdAt: v.number(),
  updatedAt: v.number(),
  lastEditedAt: v.number()
})
.index("by_author", ["authorId"])
.index("by_status", ["status"])
.index("by_category", ["category"])
.index("by_published", ["publishedAt"])
.index("by_slug", ["slug"])

guideSeries: defineTable({
  name: v.string(),
  description: v.string(),
  authorId: v.string(),
  coverImage: v.optional(v.string()),
  createdAt: v.number()
})
.index("by_author", ["authorId"])

guideReadingProgress: defineTable({
  guideId: v.string(),
  userId: v.string(),
  progress: v.number(), // 0-100 percentage
  lastReadAt: v.number(),
  bookmarked: v.boolean(),
  completed: v.boolean()
})
.index("by_user", ["userId"])
.index("by_guide", ["guideId"])
.index("by_user_guide", ["userId", "guideId"])
```

### API Endpoints (Convex Functions)
```typescript
// convex/guides.ts
- createGuide(data) - Create new guide draft
- updateGuide(id, data) - Update guide content/metadata
- publishGuide(id) - Publish a draft guide
- unpublishGuide(id) - Unpublish without deleting
- getGuide(slug) - Get guide by slug
- getGuideById(id) - Get guide by ID
- getUserGuides(userId) - Get all guides by author
- getPublishedGuides(filters) - Get published guides with filters
- saveVersion(id) - Save current version to history
- trackView(guideId, userId) - Track guide view
- updateReadingProgress(guideId, userId, progress) - Track reading
- searchGuides(query) - Full-text search
- getRelatedGuides(guideId) - Get similar guides
```

### Markdown Editor Requirements
- Use CodeMirror 6 or Monaco Editor
- Support GFM (GitHub Flavored Markdown)
- Real-time preview with debouncing
- Custom toolbar with formatting shortcuts
- Image paste support from clipboard
- Table editor helper
- Link auto-detection
- Emoji support with :shortcodes:

### Code Block Features
- Syntax highlighting with Prism.js or Shiki
- Support for 20+ languages minimum
- Line highlighting syntax: ```js {2,4-6}
- Filename display: ```js:app.js
- Copy button with feedback
- Diff syntax support

### Security & Validation
- [ ] Sanitize all markdown with DOMPurify
- [ ] Validate image uploads (type, size)
- [ ] Rate limit guide creation (max 10 per day)
- [ ] Slug validation (URL-safe, unique)
- [ ] XSS prevention in preview and display
- [ ] CSRF protection on all forms
- [ ] Access control (only author can edit)

### Performance Optimization
- [ ] Lazy load images in guides
- [ ] Virtual scrolling for long guides
- [ ] CDN for guide images
- [ ] Cache rendered markdown
- [ ] Debounce auto-save
- [ ] Optimize reading progress tracking

### Categories (Predefined)
- Getting Started
- Tutorials
- How-To Guides
- Best Practices
- Architecture & Design
- Performance
- Security
- Testing
- DevOps
- Career Development
- Project Showcases
- Tips & Tricks

### SEO Requirements
- [ ] Generate slugs from titles
- [ ] Meta tags for social sharing
- [ ] Structured data (Article schema)
- [ ] Sitemap inclusion
- [ ] Canonical URLs
- [ ] Reading time in meta

## UI/UX Requirements

### Editor Experience
- Split-screen editor/preview (toggleable)
- Distraction-free writing mode
- Auto-save indicator
- Unsaved changes warning
- Keyboard shortcuts guide
- Markdown cheat sheet

### Reading Experience
- Clean typography (Inter font)
- Optimal line length (65-75 chars)
- Generous whitespace
- Smooth scrolling
- Reading progress indicator
- Estimated time remaining

### Mobile Optimization
- Touch-friendly editor controls
- Swipe between editor/preview
- Optimized table display
- Collapsible code blocks
- Responsive images

## Integration Points

### With USER-001 (Profile System)
- Display guides on author profile
- Guide count in profile stats
- Author information on guides
- Link between guides and profiles

### With USER-002 (Apps System)
- Link guides to related apps
- "Build this app" tutorials
- App documentation guides

### With Future Stories
- USER-004: Guide comments/discussions
- USER-005: Guide recommendations
- USER-006: Premium guides/courses

## Testing Requirements

### Unit Tests
- [ ] Markdown parsing and sanitization
- [ ] Slug generation
- [ ] Reading time calculation
- [ ] Version history management

### Integration Tests
- [ ] Complete publishing workflow
- [ ] Image upload and optimization
- [ ] Search functionality
- [ ] Analytics tracking

### E2E Tests
- [ ] Write and publish guide
- [ ] Edit published guide
- [ ] Reading experience
- [ ] Profile integration

## Security Considerations

1. **Content Security**: All markdown sanitized with DOMPurify
2. **Image Security**: Validate types, scan uploads, enforce size limits
3. **XSS Prevention**: Careful handling of user content in preview/display
4. **Access Control**: Strict author-only editing permissions
5. **Rate Limiting**: Prevent spam and abuse
6. **Data Privacy**: Reading progress tied to authenticated users only

## Dev Agent Record

### Implementation Plan
1. [ ] Set up Convex schema for guides
2. [ ] Create markdown editor component
3. [ ] Implement preview functionality
4. [ ] Build guide viewer with syntax highlighting
5. [ ] Add publishing workflow
6. [ ] Integrate with user profiles
7. [ ] Implement analytics tracking
8. [ ] Add search and filtering
9. [ ] Create reading progress tracking
10. [ ] Write comprehensive tests

### Technical Decisions
- [ ] CodeMirror 6 for markdown editing
- [ ] Shiki for syntax highlighting
- [ ] Convex storage for images
- [ ] React Markdown for rendering
- [ ] Fuse.js for client-side search

### Files to Create/Modify
- `convex/schema.ts` - Add guides tables
- `convex/guides.ts` - CRUD operations
- `lib/markdown.ts` - Markdown utilities
- `lib/constants/guides.ts` - Guide constants
- `components/guides/*` - All guide components
- `app/guides/*` - Guide pages
- `app/write/*` - Editor pages
- `app/dashboard/guides/*` - Author dashboard

---

**Created**: 2025-01-29  
**Story Manager**: Stella (bmad-sm)