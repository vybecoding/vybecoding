# Visual Verification Test Suite

Comprehensive Playwright test suite for verifying pixel-perfect migration from the demo site to the Next.js implementation.

## Overview

This test suite compares the visual appearance, interactions, and functionality between:
- **Demo site**: Static HTML/CSS/JS site (localhost:8080)
- **Next.js app**: Production application (localhost:3000)

## Features

- 🎨 **Visual Comparison**: Pixel-by-pixel screenshot comparisons
- 📱 **Responsive Testing**: Tests at 375px (mobile), 768px (tablet), 1440px (desktop)
- 🎯 **Component Testing**: Individual component verification
- ⚡ **Interaction Testing**: Hover states, animations, form interactions
- ♿ **Accessibility Checks**: ARIA labels, keyboard navigation
- 📊 **Performance Metrics**: Load times, CLS, resource usage
- 📈 **Progress Reporting**: Comprehensive migration status reports

## Quick Start

### Run All Tests
```bash
./run-visual-tests.sh
```

### Run Specific Test
```bash
npx playwright test tests/01-landing-page.spec.ts --config=playwright.config.ts
```

### Generate Migration Report
```bash
node generate-migration-report.js
```

## Test Coverage

### Priority Pages (in order)
1. **Landing Page** - Hero, features, CTAs, animations
2. **Navigation** - Header, footer, mobile menu, glassmorphism
3. **Apps Browse** - Grid layout, cards, filters, search
4. **Guides Browse** - List layout, tags, categories
5. **Auth Pages** - Sign up/in forms, validation, social login
6. **Dashboard** - Layout, tabs, stats, charts
7. **Profile Pages** - Public profiles, stats, content
8. **Content Creation** - Multi-step forms, editors

### What's Tested

#### Visual Elements
- Colors, gradients, shadows
- Typography (size, weight, spacing)
- Layout and spacing
- Images and icons
- Backgrounds and effects

#### Interactions
- Hover states
- Click actions
- Form inputs
- Navigation flows
- Loading states

#### Responsive Behavior
- Mobile layout (375px)
- Tablet layout (768px)
- Desktop layout (1440px)
- No horizontal scroll
- Proper stacking

#### Functionality
- Form validation
- Tab switching
- Modal dialogs
- Search/filter
- Multi-step forms

## File Structure

```
__tests__/visual-verification/
├── helpers/
│   ├── visual-compare.ts    # Core comparison utilities
│   └── test-utils.ts        # Helper functions
├── tests/
│   ├── 01-landing-page.spec.ts
│   ├── 02-navigation.spec.ts
│   ├── 03-apps-browse.spec.ts
│   ├── 04-guides-browse.spec.ts
│   ├── 05-auth-pages.spec.ts
│   ├── 06-dashboard.spec.ts
│   ├── 07-profile-pages.spec.ts
│   └── 08-content-creation.spec.ts
├── reports/
│   ├── screenshots/         # Visual comparisons
│   ├── summary.md          # Test summary
│   ├── migration-progress.md
│   └── visual-diff-report.html
├── playwright.config.ts     # Test configuration
├── run-visual-tests.sh     # Test runner
└── generate-migration-report.js
```

## Understanding Results

### Test Output
- ✅ **Passed**: Visual match within threshold
- ❌ **Failed**: Visual differences detected
- 🟡 **Warning**: Minor differences (acceptable)

### Reports

#### summary.md
Quick overview of test results with pass/fail status.

#### migration-progress.md
Detailed analysis including:
- Visual fidelity percentage
- Component completion status
- Critical issues
- Recommendations

#### visual-diff-report.html
Interactive HTML report with:
- Progress visualization
- Page-by-page status
- Metric cards

### Screenshots
All screenshots saved in `reports/screenshots/`:
- `{component}-demo.png` - Demo version
- `{component}-next.png` - Next.js version
- `{component}.png` - Diff visualization

## Configuration

### Thresholds
Adjust in test files:
```typescript
threshold: 0.1,  // 10% difference allowed
maxDiffPixels: 100  // Max 100 different pixels
```

### Viewport Sizes
Modify in `playwright.config.ts`:
```typescript
viewport: { width: 1440, height: 900 }
```

### Timeouts
For slow-loading pages:
```typescript
waitTime: 2000  // Wait 2 seconds before screenshot
```

## Troubleshooting

### Common Issues

**Tests fail with "element not found"**
- Check selectors match both demo and Next.js
- Add fallback selectors: `.class1, .class2`

**High visual difference percentage**
- Check for animation differences
- Disable animations: `animations: 'disabled'`
- Increase threshold for gradient backgrounds

**Servers not starting**
- Ensure ports 3000 and 8080 are free
- Check Node.js and Python are installed
- Run servers manually before tests

### Debug Mode
```bash
# Run with headed browser
npx playwright test --headed

# Run with trace viewer
npx playwright test --trace on
npx playwright show-trace
```

## Best Practices

1. **Run tests frequently** - After each component update
2. **Review screenshots** - Don't just rely on pass/fail
3. **Update baselines** - When intentional changes are made
4. **Test all breakpoints** - Mobile-first is critical
5. **Check animations** - Timing affects user experience

## Integration with TRAIL

Failed tests are automatically captured by TRAIL system:
```bash
# Search for visual test solutions
.claude/solutions/search.sh "visual test"
.claude/solutions/search.sh "playwright"
```

## Next Steps

1. Review current test results
2. Fix visual discrepancies in priority order
3. Re-run tests after fixes
4. Update documentation
5. Add tests for new components

---

For questions or issues, check the migration plan in `docs/demo-migration-plan.md`