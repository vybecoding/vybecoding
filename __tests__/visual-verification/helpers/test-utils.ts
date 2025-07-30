import { Page, expect } from '@playwright/test';

export interface AnimationCheck {
  selector: string;
  property: string;
  duration: string;
  timing?: string;
}

export interface InteractionCheck {
  selector: string;
  action: 'hover' | 'click' | 'focus';
  expectedChanges: {
    property: string;
    value: string;
  }[];
}

export class TestUtils {
  /**
   * Check if animations match between demo and Next.js
   */
  static async verifyAnimation(
    page: Page,
    demoUrl: string,
    nextUrl: string,
    checks: AnimationCheck[]
  ) {
    const results = [];

    for (const check of checks) {
      // Check demo animation
      await page.goto(demoUrl, { waitUntil: 'networkidle' });
      const demoAnimation = await page.locator(check.selector).evaluate((el, prop) => {
        const style = window.getComputedStyle(el);
        return {
          duration: style.transitionDuration || style.animationDuration,
          timing: style.transitionTimingFunction || style.animationTimingFunction,
          property: style.transitionProperty
        };
      }, check.property);

      // Check Next.js animation
      await page.goto(nextUrl, { waitUntil: 'networkidle' });
      const nextAnimation = await page.locator(check.selector).evaluate((el, prop) => {
        const style = window.getComputedStyle(el);
        return {
          duration: style.transitionDuration || style.animationDuration,
          timing: style.transitionTimingFunction || style.animationTimingFunction,
          property: style.transitionProperty
        };
      }, check.property);

      const matches = 
        demoAnimation.duration === nextAnimation.duration &&
        (!check.timing || demoAnimation.timing === nextAnimation.timing);

      results.push({
        selector: check.selector,
        property: check.property,
        matches,
        demo: demoAnimation,
        next: nextAnimation
      });
    }

    return results;
  }

  /**
   * Verify hover states and interactions
   */
  static async verifyInteractions(
    page: Page,
    demoUrl: string,
    nextUrl: string,
    interactions: InteractionCheck[]
  ) {
    const results = [];

    for (const interaction of interactions) {
      // Test demo interaction
      await page.goto(demoUrl, { waitUntil: 'networkidle' });
      const demoElement = page.locator(interaction.selector);
      
      const demoBeforeStyles = await demoElement.evaluate((el) => {
        return window.getComputedStyle(el);
      });

      // Perform action
      if (interaction.action === 'hover') {
        await demoElement.hover();
      } else if (interaction.action === 'click') {
        await demoElement.click();
      } else if (interaction.action === 'focus') {
        await demoElement.focus();
      }

      await page.waitForTimeout(300); // Wait for transitions

      const demoAfterStyles = await demoElement.evaluate((el) => {
        return window.getComputedStyle(el);
      });

      // Test Next.js interaction
      await page.goto(nextUrl, { waitUntil: 'networkidle' });
      const nextElement = page.locator(interaction.selector);
      
      const nextBeforeStyles = await nextElement.evaluate((el) => {
        return window.getComputedStyle(el);
      });

      // Perform action
      if (interaction.action === 'hover') {
        await nextElement.hover();
      } else if (interaction.action === 'click') {
        await nextElement.click();
      } else if (interaction.action === 'focus') {
        await nextElement.focus();
      }

      await page.waitForTimeout(300); // Wait for transitions

      const nextAfterStyles = await nextElement.evaluate((el) => {
        return window.getComputedStyle(el);
      });

      // Compare changes
      const matches = interaction.expectedChanges.every(change => {
        const demoChanged = demoBeforeStyles[change.property] !== demoAfterStyles[change.property];
        const nextChanged = nextBeforeStyles[change.property] !== nextAfterStyles[change.property];
        return demoChanged === nextChanged;
      });

      results.push({
        selector: interaction.selector,
        action: interaction.action,
        matches,
        demo: {
          before: demoBeforeStyles,
          after: demoAfterStyles
        },
        next: {
          before: nextBeforeStyles,
          after: nextAfterStyles
        }
      });
    }

    return results;
  }

  /**
   * Verify form functionality
   */
  static async verifyForm(
    page: Page,
    demoUrl: string,
    nextUrl: string,
    formSelector: string,
    formData: Record<string, string>
  ) {
    const results = {
      fields: [] as any[],
      validation: [] as any[],
      submission: null as any
    };

    // Test demo form
    await page.goto(demoUrl, { waitUntil: 'networkidle' });
    const demoForm = page.locator(formSelector);
    
    // Fill form fields
    for (const [field, value] of Object.entries(formData)) {
      const demoInput = demoForm.locator(`[name="${field}"]`);
      const demoInputType = await demoInput.getAttribute('type');
      const demoPlaceholder = await demoInput.getAttribute('placeholder');
      
      await demoInput.fill(value);
      
      results.fields.push({
        field,
        demoType: demoInputType,
        demoPlaceholder
      });
    }

    // Test Next.js form
    await page.goto(nextUrl, { waitUntil: 'networkidle' });
    const nextForm = page.locator(formSelector);
    
    // Compare form fields
    for (let i = 0; i < results.fields.length; i++) {
      const field = results.fields[i];
      const nextInput = nextForm.locator(`[name="${field.field}"]`);
      const nextInputType = await nextInput.getAttribute('type');
      const nextPlaceholder = await nextInput.getAttribute('placeholder');
      
      field.nextType = nextInputType;
      field.nextPlaceholder = nextPlaceholder;
      field.matches = field.demoType === field.nextType && 
                     field.demoPlaceholder === field.nextPlaceholder;
    }

    return results;
  }

  /**
   * Check accessibility
   */
  static async verifyAccessibility(page: Page, url: string) {
    await page.goto(url, { waitUntil: 'networkidle' });
    
    const results = {
      ariaLabels: [] as any[],
      tabIndex: [] as any[],
      altTexts: [] as any[],
      headingStructure: [] as any[]
    };

    // Check ARIA labels
    const ariaElements = await page.$$('[aria-label]');
    for (const element of ariaElements) {
      const label = await element.getAttribute('aria-label');
      const tagName = await element.evaluate(el => el.tagName);
      results.ariaLabels.push({ tagName, label });
    }

    // Check tab index
    const tabbableElements = await page.$$('[tabindex]');
    for (const element of tabbableElements) {
      const tabindex = await element.getAttribute('tabindex');
      const tagName = await element.evaluate(el => el.tagName);
      results.tabIndex.push({ tagName, tabindex });
    }

    // Check alt texts
    const images = await page.$$('img');
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      const src = await img.getAttribute('src');
      results.altTexts.push({ src, alt, hasAlt: !!alt });
    }

    // Check heading structure
    const headings = await page.$$('h1, h2, h3, h4, h5, h6');
    for (const heading of headings) {
      const level = await heading.evaluate(el => el.tagName);
      const text = await heading.textContent();
      results.headingStructure.push({ level, text });
    }

    return results;
  }

  /**
   * Measure performance metrics
   */
  static async measurePerformance(page: Page, url: string) {
    await page.goto(url, { waitUntil: 'networkidle' });
    
    const metrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      return {
        // Load times
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        
        // Core Web Vitals approximations
        firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
        firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,
        
        // Resource counts
        resourceCount: performance.getEntriesByType('resource').length,
        
        // Memory (if available)
        memory: (performance as any).memory ? {
          usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
          totalJSHeapSize: (performance as any).memory.totalJSHeapSize
        } : null
      };
    });

    // Layout shift
    const layoutShifts = await page.evaluate(() => {
      let cls = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            cls += (entry as any).value;
          }
        }
      });
      observer.observe({ type: 'layout-shift', buffered: true });
      observer.disconnect();
      return cls;
    });

    return {
      ...metrics,
      cumulativeLayoutShift: layoutShifts
    };
  }

  /**
   * Compare navigation flow
   */
  static async verifyNavigation(
    page: Page,
    baseUrl: string,
    navigationLinks: { selector: string; expectedUrl: string }[]
  ) {
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    const results = [];

    for (const link of navigationLinks) {
      try {
        const element = page.locator(link.selector);
        await element.waitFor({ state: 'visible', timeout: 5000 });
        
        const href = await element.getAttribute('href');
        await element.click();
        await page.waitForLoadState('networkidle');
        
        const currentUrl = page.url();
        const matches = currentUrl.includes(link.expectedUrl);
        
        results.push({
          selector: link.selector,
          expectedUrl: link.expectedUrl,
          actualUrl: currentUrl,
          href,
          matches
        });
        
        // Go back for next test
        await page.goBack({ waitUntil: 'networkidle' });
      } catch (error: any) {
        results.push({
          selector: link.selector,
          expectedUrl: link.expectedUrl,
          error: error.message,
          matches: false
        });
      }
    }

    return results;
  }
}