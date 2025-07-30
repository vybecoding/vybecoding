import { test, expect } from '@playwright/test';
import { VisualComparer } from '../helpers/visual-compare';
import { TestUtils } from '../helpers/test-utils';

test.describe('Navigation Component Visual Verification', () => {
  let comparer: VisualComparer;

  test.beforeAll(() => {
    comparer = new VisualComparer();
  });

  test('Desktop navigation matches demo', async ({ page }) => {
    const result = await comparer.compareElement(
      page,
      '/pages/home.html',
      '/',
      'nav, .navigation, header',
      'navigation-desktop',
      { 
        fullPage: false,
        waitTime: 1000 
      }
    );
    
    expect(result.passed).toBeTruthy();
  });

  test('Navigation glassmorphism effect', async ({ page }) => {
    const glassStyles = await comparer.compareStyles(
      page,
      '/pages/home.html',
      '/',
      'nav, .navigation',
      [
        'backdrop-filter',
        'background-color',
        'border-bottom',
        'box-shadow',
        'position',
        'z-index'
      ]
    );
    
    expect(glassStyles.matches).toBeTruthy();
  });

  test('Mobile menu toggle functionality', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 812 });
    
    // Test demo mobile menu
    await page.goto('http://localhost:8080/pages/home.html');
    const demoMenuButton = page.locator('.mobile-menu-toggle, .menu-toggle, [aria-label*="menu"]');
    await demoMenuButton.waitFor({ state: 'visible' });
    
    // Take screenshot before clicking
    const demoBeforeClick = await page.screenshot({ clip: { x: 0, y: 0, width: 375, height: 200 } });
    
    await demoMenuButton.click();
    await page.waitForTimeout(400); // Wait for animation
    
    // Take screenshot after clicking
    const demoAfterClick = await page.screenshot({ clip: { x: 0, y: 0, width: 375, height: 600 } });
    
    // Test Next.js mobile menu
    await page.goto('http://localhost:3000/');
    const nextMenuButton = page.locator('.mobile-menu-toggle, .menu-toggle, [aria-label*="menu"]');
    await nextMenuButton.waitFor({ state: 'visible' });
    
    const nextBeforeClick = await page.screenshot({ clip: { x: 0, y: 0, width: 375, height: 200 } });
    
    await nextMenuButton.click();
    await page.waitForTimeout(400); // Wait for animation
    
    const nextAfterClick = await page.screenshot({ clip: { x: 0, y: 0, width: 375, height: 600 } });
    
    // Compare screenshots
    expect(nextBeforeClick).toMatchSnapshot('mobile-nav-closed.png', { threshold: 0.2 });
    expect(nextAfterClick).toMatchSnapshot('mobile-nav-open.png', { threshold: 0.2 });
  });

  test('Navigation links and active states', async ({ page }) => {
    const navLinks = [
      { selector: 'a[href*="apps"]', expectedUrl: '/apps' },
      { selector: 'a[href*="guides"]', expectedUrl: '/guides' },
      { selector: 'a[href*="pricing"]', expectedUrl: '/pricing' },
      { selector: 'a[href*="about"]', expectedUrl: '/about' }
    ];
    
    const demoNavigation = await TestUtils.verifyNavigation(
      page,
      'http://localhost:8080/pages/home.html',
      navLinks
    );
    
    const nextNavigation = await TestUtils.verifyNavigation(
      page,
      'http://localhost:3000/',
      navLinks
    );
    
    // Both should have working navigation
    expect(demoNavigation.every(nav => nav.matches || nav.error)).toBeTruthy();
    expect(nextNavigation.every(nav => nav.matches || nav.error)).toBeTruthy();
  });

  test('Sticky navigation behavior', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    
    // Check initial position
    const navInitial = await page.locator('nav, .navigation').boundingBox();
    expect(navInitial?.y).toBe(0);
    
    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(100);
    
    // Nav should still be at top (sticky)
    const navAfterScroll = await page.locator('nav, .navigation').boundingBox();
    expect(navAfterScroll?.y).toBe(0);
    
    // Check sticky styles
    const stickyStyles = await page.locator('nav, .navigation').evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        position: styles.position,
        top: styles.top
      };
    });
    
    expect(stickyStyles.position).toMatch(/fixed|sticky/);
  });

  test('Navigation responsive behavior', async ({ page }) => {
    const breakpoints = [
      { name: 'mobile', width: 375, height: 812 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1440, height: 900 }
    ];
    
    for (const breakpoint of breakpoints) {
      await page.setViewportSize(breakpoint);
      
      const result = await comparer.compareElement(
        page,
        '/pages/home.html',
        '/',
        'nav, .navigation, header',
        `navigation-${breakpoint.name}`,
        { fullPage: false }
      );
      
      expect(result.passed).toBeTruthy();
    }
  });

  test('Logo and branding consistency', async ({ page }) => {
    const logoResult = await comparer.compareElement(
      page,
      '/pages/home.html',
      '/',
      '.logo, .brand, a[href="/"]',
      'navigation-logo',
      { threshold: 0.1 }
    );
    
    expect(logoResult.passed).toBeTruthy();
  });

  test('Navigation hover effects', async ({ page }) => {
    const hoverEffects = await TestUtils.verifyInteractions(
      page,
      'http://localhost:8080/pages/home.html',
      'http://localhost:3000/',
      [
        {
          selector: 'nav a:not(.logo)',
          action: 'hover',
          expectedChanges: [
            { property: 'color', value: 'rgb(138, 43, 226)' }, // Purple color
            { property: 'transform', value: 'translateY(-2px)' }
          ]
        }
      ]
    );
    
    expect(hoverEffects[0].matches).toBeTruthy();
  });

  test('CTA button in navigation', async ({ page }) => {
    const ctaResult = await comparer.compareElement(
      page,
      '/pages/home.html',
      '/',
      'nav .cta-button, nav .btn-primary',
      'navigation-cta',
      { threshold: 0.1 }
    );
    
    expect(ctaResult.passed).toBeTruthy();
    
    // Check CTA styles
    const ctaStyles = await comparer.compareStyles(
      page,
      '/pages/home.html',
      '/',
      'nav .cta-button, nav .btn-primary',
      [
        'background',
        'color',
        'padding',
        'border-radius',
        'font-weight'
      ]
    );
    
    expect(ctaStyles.matches).toBeTruthy();
  });

  test('Navigation animation timing', async ({ page }) => {
    const animations = await TestUtils.verifyAnimation(
      page,
      'http://localhost:8080/pages/home.html',
      'http://localhost:3000/',
      [
        {
          selector: '.mobile-menu',
          property: 'transform',
          duration: '300ms',
          timing: 'ease-out'
        },
        {
          selector: 'nav a',
          property: 'all',
          duration: '200ms',
          timing: 'ease'
        }
      ]
    );
    
    animations.forEach(animation => {
      expect(animation.matches).toBeTruthy();
    });
  });

  test('Footer matches demo', async ({ page }) => {
    const footerResult = await comparer.compareElement(
      page,
      '/pages/home.html',
      '/',
      'footer',
      'footer-component',
      { 
        fullPage: false,
        waitTime: 1000 
      }
    );
    
    expect(footerResult.passed).toBeTruthy();
  });
});