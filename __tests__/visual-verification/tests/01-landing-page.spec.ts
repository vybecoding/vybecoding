import { test, expect } from '@playwright/test';
import { VisualComparer } from '../helpers/visual-compare';
import { TestUtils } from '../helpers/test-utils';

test.describe('Landing Page Visual Verification', () => {
  let comparer: VisualComparer;

  test.beforeAll(() => {
    comparer = new VisualComparer();
  });

  test.afterAll(async () => {
    await comparer.generateReport();
  });

  test('Hero section matches demo', async ({ page }) => {
    const result = await comparer.compareElement(
      page,
      '/pages/home.html',
      '/',
      '.hero-section',
      'landing-hero',
      { 
        fullPage: false,
        waitTime: 1000,
        threshold: 0.1 
      }
    );
    
    expect(result.passed).toBeTruthy();
  });

  test('Gradient text effects match', async ({ page }) => {
    const result = await comparer.compareElement(
      page,
      '/pages/home.html',
      '/',
      '.gradient-text',
      'landing-gradient-text',
      { threshold: 0.05 }
    );
    
    expect(result.passed).toBeTruthy();
  });

  test('CTA buttons match styling and hover states', async ({ page }) => {
    // Compare button styles
    const styleResult = await comparer.compareStyles(
      page,
      '/pages/home.html',
      '/',
      '.cta-button',
      [
        'background-color',
        'border-radius',
        'padding',
        'font-size',
        'font-weight',
        'box-shadow',
        'transition-duration'
      ]
    );
    
    expect(styleResult.matches).toBeTruthy();
    
    // Test hover interactions
    const interactionResult = await TestUtils.verifyInteractions(
      page,
      'http://localhost:8080/pages/home.html',
      'http://localhost:3000/',
      [{
        selector: '.cta-button',
        action: 'hover',
        expectedChanges: [
          { property: 'transform', value: 'scale(1.05)' },
          { property: 'box-shadow', value: '0 10px 20px rgba(0,0,0,0.2)' }
        ]
      }]
    );
    
    expect(interactionResult[0].matches).toBeTruthy();
  });

  test('Feature cards grid layout matches', async ({ page }) => {
    const result = await comparer.compareElement(
      page,
      '/pages/home.html',
      '/',
      '.features-grid',
      'landing-features-grid',
      { fullPage: false }
    );
    
    expect(result.passed).toBeTruthy();
  });

  test('Animation timings match demo', async ({ page }) => {
    const animations = await TestUtils.verifyAnimation(
      page,
      'http://localhost:8080/pages/home.html',
      'http://localhost:3000/',
      [
        {
          selector: '.fade-in',
          property: 'opacity',
          duration: '0.8s',
          timing: 'ease-out'
        },
        {
          selector: '.slide-up',
          property: 'transform',
          duration: '0.6s',
          timing: 'ease-out'
        },
        {
          selector: '.logo-float',
          property: 'transform',
          duration: '6s',
          timing: 'ease-in-out'
        }
      ]
    );
    
    animations.forEach(animation => {
      expect(animation.matches).toBeTruthy();
    });
  });

  test('Responsive layouts match at all breakpoints', async ({ page }) => {
    const breakpoints = [
      { name: 'mobile', width: 375, height: 812 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1440, height: 900 }
    ];
    
    const results = await comparer.compareResponsive(
      page,
      '/pages/home.html',
      '/',
      'landing',
      breakpoints
    );
    
    results.forEach(result => {
      expect(result.passed).toBeTruthy();
    });
  });

  test('Glassmorphism effects render correctly', async ({ page }) => {
    // Check glassmorphism styles
    const glassStyles = await comparer.compareStyles(
      page,
      '/pages/home.html',
      '/',
      '.glass-card',
      [
        'backdrop-filter',
        'background-color',
        'border',
        'box-shadow'
      ]
    );
    
    expect(glassStyles.matches).toBeTruthy();
    
    // Visual comparison of glass effect
    const visualResult = await comparer.compareElement(
      page,
      '/pages/home.html',
      '/',
      '.glass-card',
      'landing-glass-effect',
      { threshold: 0.15 }
    );
    
    expect(visualResult.passed).toBeTruthy();
  });

  test('Background nebula effect matches', async ({ page }) => {
    const result = await comparer.compareElement(
      page,
      '/pages/home.html',
      '/',
      '.nebula-bg',
      'landing-nebula-bg',
      { 
        fullPage: false,
        threshold: 0.25 // Higher threshold for animated backgrounds
      }
    );
    
    expect(result.passed).toBeTruthy();
  });

  test('Full page screenshot comparison', async ({ page }) => {
    const result = await comparer.comparePage(
      page,
      '/pages/home.html',
      '/',
      'landing-full-page',
      { 
        fullPage: true,
        waitTime: 2000,
        threshold: 0.2 
      }
    );
    
    expect(result.passed).toBeTruthy();
  });

  test('Performance metrics are acceptable', async ({ page }) => {
    const demoMetrics = await TestUtils.measurePerformance(
      page, 
      'http://localhost:8080/pages/home.html'
    );
    
    const nextMetrics = await TestUtils.measurePerformance(
      page, 
      'http://localhost:3000/'
    );
    
    // Next.js should not be significantly slower
    expect(nextMetrics.firstContentfulPaint).toBeLessThan(demoMetrics.firstContentfulPaint * 1.5);
    expect(nextMetrics.cumulativeLayoutShift).toBeLessThan(0.1);
  });

  test('Accessibility compliance', async ({ page }) => {
    const demoA11y = await TestUtils.verifyAccessibility(
      page,
      'http://localhost:8080/pages/home.html'
    );
    
    const nextA11y = await TestUtils.verifyAccessibility(
      page,
      'http://localhost:3000/'
    );
    
    // All images should have alt text
    expect(nextA11y.altTexts.every(img => img.hasAlt)).toBeTruthy();
    
    // Heading structure should be logical
    expect(nextA11y.headingStructure.length).toBeGreaterThan(0);
    
    // Interactive elements should have proper labels
    expect(nextA11y.ariaLabels.length).toBeGreaterThanOrEqual(demoA11y.ariaLabels.length);
  });
});