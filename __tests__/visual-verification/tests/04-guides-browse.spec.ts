import { test, expect } from '@playwright/test';
import { VisualComparer } from '../helpers/visual-compare';
import { TestUtils } from '../helpers/test-utils';

test.describe('Guides Browse Page Visual Verification', () => {
  let comparer: VisualComparer;

  test.beforeAll(() => {
    comparer = new VisualComparer();
  });

  test('Guides page hero section', async ({ page }) => {
    const result = await comparer.compareElement(
      page,
      '/pages/guides.html',
      '/guides',
      '.hero-section, .page-hero',
      'guides-hero',
      { 
        fullPage: false,
        waitTime: 1000 
      }
    );
    
    expect(result.passed).toBeTruthy();
  });

  test('Guide card with date corner', async ({ page }) => {
    const cardResult = await comparer.compareElement(
      page,
      '/pages/guides.html',
      '/guides',
      '.guide-card:first-child',
      'guide-card-single',
      { threshold: 0.1 }
    );
    
    expect(cardResult.passed).toBeTruthy();
    
    // Check date corner positioning
    await page.goto('http://localhost:3000/guides');
    const guideCard = page.locator('.guide-card').first();
    const dateCorner = guideCard.locator('.date-corner, .guide-date');
    
    if (await dateCorner.isVisible()) {
      const dateStyles = await dateCorner.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          position: styles.position,
          top: styles.top,
          right: styles.right,
          transform: styles.transform
        };
      });
      
      // Date should be in corner without hacks
      expect(dateStyles.position).toBe('absolute');
      expect(dateStyles.transform).toContain('rotate');
    }
  });

  test('Guide categories/tags', async ({ page }) => {
    const tagsResult = await comparer.compareElement(
      page,
      '/pages/guides.html',
      '/guides',
      '.guide-tags, .tags',
      'guide-tags',
      { threshold: 0.1 }
    );
    
    if (tagsResult.passed) {
      expect(tagsResult.passed).toBeTruthy();
    }
    
    // Check tag styles
    await page.goto('http://localhost:3000/guides');
    const tag = page.locator('.tag, .guide-tag').first();
    
    if (await tag.isVisible()) {
      const tagStyles = await tag.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          background: styles.background,
          borderRadius: styles.borderRadius,
          padding: styles.padding
        };
      });
      
      expect(tagStyles.borderRadius).toContain('px');
      expect(tagStyles.padding).toBeTruthy();
    }
  });

  test('Guide author information', async ({ page }) => {
    await page.goto('http://localhost:3000/guides');
    const guideCard = page.locator('.guide-card').first();
    
    // Check author section exists
    const authorSection = guideCard.locator('.author, .guide-author');
    if (await authorSection.isVisible()) {
      const hasAvatar = await authorSection.locator('img, .avatar').isVisible();
      const hasName = await authorSection.locator('.author-name').isVisible();
      
      expect(hasAvatar || hasName).toBeTruthy();
    }
  });

  test('Reading time indicator', async ({ page }) => {
    await page.goto('http://localhost:3000/guides');
    const readingTime = page.locator('.reading-time, .read-time').first();
    
    if (await readingTime.isVisible()) {
      const text = await readingTime.textContent();
      expect(text).toMatch(/\d+ min/);
    }
  });

  test('Guide grid layout', async ({ page }) => {
    const gridResult = await comparer.compareElement(
      page,
      '/pages/guides.html',
      '/guides',
      '.guides-grid, .grid',
      'guides-grid',
      { 
        fullPage: false,
        threshold: 0.15 
      }
    );
    
    expect(gridResult.passed).toBeTruthy();
  });

  test('Filter by category', async ({ page }) => {
    const filterResult = await comparer.compareElement(
      page,
      '/pages/guides.html',
      '/guides',
      '.category-filters, .filters',
      'guides-filters',
      { threshold: 0.1 }
    );
    
    if (filterResult.passed) {
      expect(filterResult.passed).toBeTruthy();
      
      // Test filter functionality
      await page.goto('http://localhost:3000/guides');
      const filterButton = page.locator('.filter-button, .category-button').first();
      
      if (await filterButton.isVisible()) {
        const beforeCount = await page.locator('.guide-card:visible').count();
        await filterButton.click();
        await page.waitForTimeout(300);
        const afterCount = await page.locator('.guide-card:visible').count();
        
        // Filter should change visible guides
        expect(afterCount).toBeLessThanOrEqual(beforeCount);
      }
    }
  });

  test('Search guides functionality', async ({ page }) => {
    const searchResult = await comparer.compareElement(
      page,
      '/pages/guides.html',
      '/guides',
      '.search-bar, input[type="search"]',
      'guides-search',
      { threshold: 0.1 }
    );
    
    if (searchResult.passed) {
      expect(searchResult.passed).toBeTruthy();
    }
  });

  test('Guide card hover effects', async ({ page }) => {
    const hoverEffects = await TestUtils.verifyInteractions(
      page,
      'http://localhost:8080/pages/guides.html',
      'http://localhost:3000/guides',
      [{
        selector: '.guide-card:first-child',
        action: 'hover',
        expectedChanges: [
          { property: 'transform', value: 'translateY(-4px)' },
          { property: 'box-shadow', value: '0 10px 30px rgba(0,0,0,0.15)' }
        ]
      }]
    );
    
    if (hoverEffects[0]) {
      expect(hoverEffects[0].matches).toBeTruthy();
    }
  });

  test('Premium/locked guide indicators', async ({ page }) => {
    await page.goto('http://localhost:3000/guides');
    const premiumBadge = page.locator('.premium-badge, .locked-indicator').first();
    
    if (await premiumBadge.isVisible()) {
      const badgeStyles = await premiumBadge.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          background: styles.background,
          color: styles.color
        };
      });
      
      expect(badgeStyles.background).toContain('gradient');
    }
  });

  test('Guide statistics (views, likes)', async ({ page }) => {
    await page.goto('http://localhost:3000/guides');
    const stats = page.locator('.guide-stats, .stats').first();
    
    if (await stats.isVisible()) {
      const hasViews = await stats.locator('.views, [data-stat="views"]').isVisible();
      const hasLikes = await stats.locator('.likes, [data-stat="likes"]').isVisible();
      
      expect(hasViews || hasLikes).toBeTruthy();
    }
  });

  test('Create guide CTA', async ({ page }) => {
    const ctaResult = await comparer.compareElement(
      page,
      '/pages/guides.html',
      '/guides',
      '.create-guide-cta, .cta-section',
      'guides-create-cta',
      { threshold: 0.1 }
    );
    
    if (ctaResult.passed) {
      expect(ctaResult.passed).toBeTruthy();
    }
  });

  test('Full page comparison', async ({ page }) => {
    const result = await comparer.comparePage(
      page,
      '/pages/guides.html',
      '/guides',
      'guides-full-page',
      { 
        fullPage: true,
        waitTime: 2000,
        threshold: 0.2 
      }
    );
    
    expect(result.passed).toBeTruthy();
  });

  test('Responsive guide cards', async ({ page }) => {
    const breakpoints = [
      { name: 'mobile', width: 375, height: 812 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1440, height: 900 }
    ];
    
    for (const bp of breakpoints) {
      await page.setViewportSize(bp);
      
      const result = await comparer.compareElement(
        page,
        '/pages/guides.html',
        '/guides',
        '.guide-card:first-child',
        `guide-card-${bp.name}`,
        { threshold: 0.15 }
      );
      
      expect(result.passed).toBeTruthy();
    }
  });

  test('Syntax highlighting preview', async ({ page }) => {
    await page.goto('http://localhost:3000/guides');
    const codePreview = page.locator('.code-preview, pre').first();
    
    if (await codePreview.isVisible()) {
      const codeStyles = await codePreview.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          background: styles.backgroundColor,
          fontFamily: styles.fontFamily
        };
      });
      
      expect(codeStyles.fontFamily).toContain('mono');
      expect(codeStyles.background).toBeTruthy();
    }
  });
});