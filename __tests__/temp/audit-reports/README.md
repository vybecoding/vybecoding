# Visual Audit System

This comprehensive visual audit system compares your Next.js implementation with the demo site across multiple breakpoints to measure visual fidelity.

## Features

- **Multi-breakpoint testing**: Mobile (375px), Tablet (768px), Desktop (1440px)
- **Automated page discovery**: Tests all accessible pages on both sites
- **Detailed style analysis**: Compares computed styles for key elements
- **Visual criteria scoring**: Weighted scoring for gradients, colors, shadows, spacing, typography, and animations
- **Comprehensive reporting**: Generates both human-readable and machine-readable reports
- **Screenshot capture**: Saves full-page screenshots for manual comparison

## Prerequisites

1. **Both servers must be running**:
   ```bash
   # Terminal 1 - Next.js
   npm run dev

   # Terminal 2 - Demo
   npm run demo
   ```

2. **Playwright must be installed** (already in your package.json):
   ```bash
   npm install -D @playwright/test playwright
   ```

## Quick Start

Run the complete visual audit:

```bash
./run-visual-audit.sh
```

This will:
1. Check that both servers are running
2. Discover accessible pages on both sites
3. Capture screenshots at all breakpoints
4. Analyze computed styles
5. Generate a comprehensive report

## Output Files

After running, you'll find these files in `visual-audit-results/`:

- **`visual-fidelity-report.md`** - Main human-readable report with:
  - Overall fidelity percentage
  - Page-by-page scores
  - Category breakdown (gradients, colors, etc.)
  - Critical issues (pages scoring < 70%)
  - Specific recommendations

- **`visual-fidelity-report.json`** - Detailed machine-readable data

- **`screenshots/`** - All captured screenshots named as:
  - `nextjs-[page]-[breakpoint].png`
  - `demo-[page]-[breakpoint].png`

- **`accessible-pages.json`** - Which pages were found on each site

- **`style-comparison.json`** - Raw style comparison data

## Additional Analysis

For deeper analysis of specific visual differences:

```bash
node analyze-visual-diff.js
```

This provides detailed breakdowns of:
- Gradient implementations
- Shadow values
- Color differences
- Animation/transition timing
- Typography variations

## Visual Criteria Weights

The scoring system uses these weights:
- **Gradients**: 20% (backgrounds, linear/radial gradients)
- **Colors**: 20% (text, backgrounds, borders)
- **Shadows**: 15% (box shadows, text shadows)
- **Spacing**: 15% (padding, margin, gaps)
- **Typography**: 15% (fonts, sizes, weights, line heights)
- **Animations**: 15% (transitions, transforms)

## Interpreting Results

### Overall Fidelity Score
- **90-100%**: Excellent - Minor tweaks only
- **70-89%**: Good - Some visual differences to address
- **50-69%**: Needs Work - Significant differences
- **Below 50%**: Major Rework - Substantial implementation gaps

### Critical Issues
Pages scoring below 70% are flagged as critical with:
- Specific breakpoint where issues occur
- Categories with most differences
- Example properties that differ

### Recommendations
The report prioritizes fixes based on:
1. Category performance (worst-performing first)
2. Number of affected pages
3. Visual impact on user experience

## Manual Screenshot Comparison

For pixel-perfect comparison, use an image diff tool:

```bash
# Example with ImageMagick
compare demo-home-desktop.png nextjs-home-desktop.png diff-home-desktop.png

# Or use a GUI tool like:
# - Kaleidoscope (macOS)
# - Beyond Compare
# - Meld
```

## Troubleshooting

### "Server not running" error
Ensure both servers are running on the correct ports:
- Next.js: http://localhost:3000
- Demo: http://localhost:8080

### Pages not found
Check that the routes exist on both sites. The audit only compares pages that exist on both.

### Style extraction issues
Some dynamically loaded styles may not be captured. Wait times can be adjusted in the test file.

## Customization

### Add more pages to test
Edit `PAGES_TO_TEST` in `visual-audit.spec.js`

### Adjust breakpoints
Modify `BREAKPOINTS` in `visual-audit.spec.js`

### Change scoring weights
Update `VISUAL_CRITERIA` weights in `visual-audit.spec.js`

### Add more style properties
Extend the `extractStyles` function in the style analysis test