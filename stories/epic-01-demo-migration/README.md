# Epic 01: Pixel-Perfect Demo Migration

**Epic Owner:** Alex (Architecture) & James (Development)  
**Status:** In Progress  
**Priority:** Critical  
**Target Completion:** 8 weeks  
**Created:** 2025-01-30  
**Restructured:** 2025-01-30

## Epic Overview

This epic tracks the complete pixel-perfect migration of all 46 vybecoding demo HTML pages to a production-ready Next.js application. Each page will be migrated individually with comprehensive visual verification to ensure 100% fidelity to the original design while implementing proper component architecture and maintainable code.

## Business Value

- **Eliminate Technical Debt**: Replace 30+ CSS fix files with proper component architecture
- **Improve Performance**: Reduce bundle size by 65% through proper code organization
- **Enable Rapid Development**: Component-based architecture for faster feature delivery
- **Ensure Consistency**: Design system prevents style drift and conflicts
- **Production Ready**: Scalable foundation for platform growth

## Success Criteria

### Visual Fidelity ✅
- [ ] Every page matches demo pixel-perfectly at all breakpoints
- [ ] All animations match timing and easing exactly
- [ ] Colors, gradients, and shadows are identical
- [ ] Typography matches size, weight, and spacing

### Technical Quality ✅
- [ ] Zero CSS hacks or workarounds
- [ ] 100% TypeScript coverage
- [ ] Lighthouse score >90 on all pages
- [ ] WCAG AA accessibility compliance
- [ ] <2s page load time

### Architecture ✅
- [ ] All components use Shadcn/ui as base
- [ ] Proper use of Lucide icons throughout
- [ ] Design system with tokens implemented
- [ ] No direct DOM manipulation
- [ ] Server/client components properly separated

## Page Migration Stories

This epic contains **46 individual page stories** (DEMO-001 through DEMO-046), one for each HTML page in the demo. Each story focuses on pixel-perfect migration of a single page with comprehensive visual verification.

### Core Pages (Ready for Development)
| Story ID | Page | Path | Priority | Points |
|----------|------|------|----------|--------|
| DEMO-001 | Home/Landing | `/index.html` | Critical | 13 |
| DEMO-002 | Design System Showcase | `/design-system-showcase.html` | High | 8 |
| DEMO-003 | Dashboard Home | `/pages/dashboard.html` | High | 8 |
| DEMO-004 | Apps Browse | `/pages/apps/browse.html` | High | 8 |
| DEMO-005 | Guides Browse | `/pages/guides/browse.html` | High | 8 |

### Authentication Pages
| Story ID | Page | Path | Priority | Points |
|----------|------|------|----------|--------|
| DEMO-006 | Sign In | `/pages/auth/sign-in.html` | High | 5 |
| DEMO-007 | Sign Up | `/pages/auth/sign-up.html` | High | 5 |
| DEMO-008 | Forgot Password | `/pages/auth/forgot-password.html` | Medium | 3 |

### Content Pages  
| Story ID | Page | Path | Priority | Points |
|----------|------|------|----------|--------|
| DEMO-009 | Apps Main | `/pages/apps.html` | High | 8 |
| DEMO-010 | Apps Submit | `/pages/apps/submit.html` | High | 8 |
| DEMO-011 | Guides Main | `/pages/guides.html` | High | 8 |
| DEMO-012 | Guides Submit | `/pages/guides/submit.html` | High | 13 |

### Dashboard Pages
| Story ID | Page | Path | Priority | Points |
|----------|------|------|----------|--------|
| DEMO-013 | Dashboard Overview | `/pages/dashboard/overview.html` | High | 8 |
| DEMO-014 | Dashboard Profile | `/pages/dashboard/profile.html` | High | 8 |
| DEMO-015 | Dashboard Settings | `/pages/dashboard/settings.html` | Medium | 5 |
| DEMO-016 | Dashboard Mentorship | `/pages/dashboard/mentorship.html` | Medium | 8 |
| DEMO-017 | Dashboard Review | `/pages/dashboard/review.html` | Medium | 5 |

### Settings Pages
| Story ID | Page | Path | Priority | Points |
|----------|------|------|----------|--------|
| DEMO-018 | Settings Profile | `/pages/dashboard/settings/profile.html` | Medium | 5 |
| DEMO-019 | Settings Account | `/pages/dashboard/settings/account.html` | Medium | 5 |
| DEMO-020 | Settings Privacy | `/pages/dashboard/settings/privacy.html` | Medium | 5 |
| DEMO-021 | Settings Notifications | `/pages/dashboard/settings/notifications.html` | Medium | 5 |
| DEMO-022 | Settings Billing | `/pages/dashboard/settings/billing.html` | Medium | 5 |

### Guide Pages
| Story ID | Page | Path | Priority | Points |
|----------|------|------|----------|--------|
| DEMO-023 | Guide Detail | `/pages/guide-detail.html` | High | 8 |
| DEMO-024 | Guide Detail Unlocked | `/pages/guide-detail-unlocked.html` | High | 8 |
| DEMO-025 | Guide View | `/pages/guide-view.html` | High | 8 |
| DEMO-026 | Guides Main Alt | `/pages/guides/guides-main.html` | Medium | 5 |
| DEMO-027 | Guide Submit Step 3 | `/pages/guides/submit/step3.html` | Medium | 5 |
| DEMO-028 | Guide Submit Step 4 | `/pages/guides/submit/step4.html` | Medium | 5 |
| DEMO-029 | Guide Submit Step 5 | `/pages/guides/submit/step5.html` | Medium | 5 |

### Profile & Social Pages
| Story ID | Page | Path | Priority | Points |
|----------|------|------|----------|--------|
| DEMO-030 | Profile Main | `/pages/profile.html` | High | 8 |
| DEMO-031 | Profile Info | `/pages/profile/info.html` | Medium | 5 |
| DEMO-032 | Profile Booking | `/pages/profile/booking.html` | Medium | 8 |
| DEMO-033 | Members Directory | `/pages/members.html` | Medium | 8 |

### Utility Pages
| Story ID | Page | Path | Priority | Points |
|----------|------|------|----------|--------|
| DEMO-034 | Featured Content | `/pages/featured.html` | Medium | 8 |
| DEMO-035 | Home Alt | `/pages/home.html` | Low | 5 |
| DEMO-036 | About | `/pages/about.html` | Low | 3 |
| DEMO-037 | Help | `/pages/help.html` | Low | 3 |
| DEMO-038 | Support | `/pages/support.html` | Low | 3 |
| DEMO-039 | Pricing | `/pages/pricing.html` | Medium | 5 |
| DEMO-040 | Notifications | `/pages/notifications.html` | Medium | 5 |

### App Detail Pages
| Story ID | Page | Path | Priority | Points |
|----------|------|------|----------|--------|
| DEMO-041 | App Member Preview | `/pages/app-member-preview.html` | Medium | 5 |
| DEMO-042 | App Native Detail | `/pages/app-native-detail.html` | Medium | 5 |

### Legal Pages
| Story ID | Page | Path | Priority | Points |
|----------|------|------|----------|--------|
| DEMO-043 | Terms of Service | `/pages/terms.html` | Low | 3 |
| DEMO-044 | Privacy Policy | `/pages/privacy.html` | Low | 3 |
| DEMO-045 | Licenses | `/pages/licenses.html` | Low | 3 |
| DEMO-046 | Cookies Policy | `/pages/cookies.html` | Low | 3 |

**Total Story Points:** 298  
**Average per Story:** 6.5 points

## Technical Approach

### 1. Page-by-Page Migration Strategy
- One story per HTML page for focused development
- Each page migrated with pixel-perfect accuracy
- Components extracted and refined during page migration
- Design system patterns established from `/design-system-showcase.html`

### 2. Visual Verification Workflow
Each story includes comprehensive visual verification:

**Development Phase:**
- Run demo server on port 8080: `cd demo && npm start`
- Run Next.js server on port 3000: `npm run dev`
- Side-by-side browser comparison during development

**Quality Assurance Phase:**
- Automated Playwright visual regression tests
- Screenshots at multiple breakpoints (375px, 768px, 1440px)
- Pixel-level difference analysis
- Manual verification checklist completion

**Completion Criteria:**
- Visual diff score < 2% at all breakpoints
- All interactive elements function identically
- Performance metrics maintained or improved
- Accessibility compliance verified

### 3. Story Completion Workflow
Each story follows this completion process:

1. **Development Complete**: All acceptance criteria met
2. **Visual Verification**: Automated and manual QA passed
3. **Story Completion Workflow**: Run `.claude/workflows/story-completion.md`
4. **Master Checklist Activation**: Post-completion quality gates
5. **Documentation Update**: Component docs and patterns recorded

### 4. Design System Integration
- Prioritize design-system-showcase.html patterns over demo inconsistencies
- Extract reusable components during page migration
- Maintain design token consistency across all pages
- Build component library progressively

## Risk Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Style drift from demo | High | Visual verification at each step |
| Performance regression | Medium | Continuous Lighthouse monitoring |
| Accessibility issues | High | Built-in to Shadcn components |
| Browser compatibility | Medium | Test on Chrome, Firefox, Safari |

## Dependencies

- ✅ Next.js 15.4.4 with App Router
- ✅ Shadcn/ui component library
- ✅ Lucide React icons
- ✅ Tailwind CSS with custom config
- ✅ TypeScript strict mode
- ✅ Clerk authentication
- ✅ Convex database

## BMAD Workflow

### Story Lifecycle
1. **Planning (SM)**: Story created with acceptance criteria
2. **Architecture Review (Architect)**: Technical approach validated
3. **Development (Dev)**: Implementation following story
4. **Visual Verification (QA)**: Pixel-perfect validation
5. **Documentation (Doc Writer)**: Component docs created

### Sub-Agent Responsibilities
- **bmad-sm**: Creates detailed stories with visual verification tasks
- **bmad-architect**: Reviews technical approach and patterns
- **bmad-dev**: Implements components and pages
- **bmad-qa**: Performs visual verification against demo
- **bmad-doc-writer**: Documents components and patterns

## Progress Tracking

### Week 1-2: Critical Pages (15 stories)
**Priority: Critical & High**
- [ ] DEMO-001: Home/Landing (13 pts)
- [ ] DEMO-002: Design System Showcase (8 pts)
- [ ] DEMO-003: Dashboard Home (8 pts)
- [ ] DEMO-004: Apps Browse (8 pts)
- [ ] DEMO-005: Guides Browse (8 pts)
- [ ] DEMO-006: Sign In (5 pts)
- [ ] DEMO-007: Sign Up (5 pts)
- [ ] DEMO-009: Apps Main (8 pts)
- [ ] DEMO-010: Apps Submit (8 pts)
- [ ] DEMO-011: Guides Main (8 pts)
- [ ] DEMO-012: Guides Submit (13 pts)
- [ ] DEMO-013: Dashboard Overview (8 pts)
- [ ] DEMO-014: Dashboard Profile (8 pts)
- [ ] DEMO-023: Guide Detail (8 pts)
- [ ] DEMO-030: Profile Main (8 pts)

**Subtotal: 148 story points**

### Week 3-4: Content & Dashboard Pages (16 stories)
**Priority: High & Medium**
- [ ] DEMO-015 through DEMO-022: Dashboard & Settings pages (45 pts)
- [ ] DEMO-024 through DEMO-029: Guide pages (36 pts)
- [ ] DEMO-031 through DEMO-034: Profile & utility pages (29 pts)

**Subtotal: 110 story points**

### Week 5-6: Utility & Detail Pages (10 stories)
**Priority: Medium**
- [ ] DEMO-035 through DEMO-042: App details & utilities (42 pts)

**Subtotal: 42 story points**

### Week 7-8: Polish & Legal Pages (5 stories)
**Priority: Low**
- [ ] DEMO-043 through DEMO-046: Legal pages (12 pts)
- [ ] Final visual regression testing
- [ ] Performance optimization
- [ ] Production deployment preparation

**Subtotal: 12 story points**

### Sprint Velocity
- **Target**: 35-40 story points per week
- **Week 1-2**: 74 pts/week (foundational pages)
- **Week 3-4**: 55 pts/week (content pages)
- **Week 5-6**: 21 pts/week (detail pages)
- **Week 7-8**: 6 pts/week (polish & legal)

## Definition of Done

Each story is considered complete when:

### Development Criteria
- [ ] All acceptance criteria met
- [ ] Page matches demo pixel-perfectly at all breakpoints
- [ ] All interactive elements function identically to demo
- [ ] Components follow design-system-showcase.html patterns
- [ ] TypeScript strict mode compliance (no errors)
- [ ] No console errors or warnings

### Visual Verification Criteria
- [ ] Side-by-side comparison completed (port 8080 vs 3000)
- [ ] Automated Playwright visual tests pass (<2% diff)
- [ ] Screenshots validated at 375px, 768px, 1440px breakpoints
- [ ] Manual verification checklist completed
- [ ] All animations and transitions match demo timing

### Quality Assurance Criteria
- [ ] Unit tests written (>90% coverage for new components)
- [ ] Accessibility audit passed (WCAG AA compliance)
- [ ] Performance benchmarks met (Lighthouse score >90)
- [ ] Cross-browser compatibility verified (Chrome, Firefox, Safari)

### Completion Workflow
- [ ] Story completion workflow executed (`.claude/workflows/story-completion.md`)
- [ ] Master checklist activated and completed
- [ ] Component documentation updated
- [ ] Design patterns recorded for reuse
- [ ] Code reviewed and approved by dev agent

### Production Readiness
- [ ] No temporary fixes or workarounds
- [ ] Error boundaries implemented where needed
- [ ] Loading states implemented
- [ ] Responsive design verified on real devices

## Notes

- This epic establishes the production foundation for vybecoding
- Visual fidelity is paramount - no compromises on pixel-perfect
- Each story builds on previous work - maintain quality throughout
- TRAIL system will capture all learning for future migrations
- Regular demos to stakeholders after each week

## Related Documentation

- [Demo Migration Plan](/docs/demo-migration-plan.md)
- [Migration Progress Report](/docs/migration-progress-report.md)
- [Component Architecture](/docs/architecture/components.md)
- [Visual Verification Guide](/docs/testing/visual-verification.md)