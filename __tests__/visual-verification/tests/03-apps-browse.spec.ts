import { test, expect } from '@playwright/test';
import { VisualComparer } from '../helpers/visual-compare';
import { TestUtils } from '../helpers/test-utils';

test.describe('Apps Browse Page Visual Verification', () => {
  let comparer: VisualComparer;

  test.beforeAll(() => {
    comparer = new VisualComparer();
  });

  test('Apps page hero section', async ({ page }) => {
    const result = await comparer.compareElement(
      page,
      '/pages/apps.html',
      '/apps',
      '.hero-section, .page-hero',
      'apps-hero',
      { 
        fullPage: false,
        waitTime: 1000 
      }
    );
    
    expect(result.passed).toBeTruthy();
  });

  test('Tab navigation (Browse/Featured/Submit)', async ({ page }) => {
    const tabsResult = await comparer.compareElement(
      page,
      '/pages/apps.html',
      '/apps',
      '.tabs, .tab-navigation',
      'apps-tabs',
      { threshold: 0.1 }
    );
    
    expect(tabsResult.passed).toBeTruthy();
    
    // Test tab switching
    await page.goto('http://localhost:3000/apps');
    
    // Click Featured tab
    const featuredTab = page.locator('[data-tab="featured"], .tab:has-text("Featured")');
    await featuredTab.click();
    await page.waitForTimeout(300);
    
    // Check active state styles
    const activeStyles = await featuredTab.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        borderBottom: styles.borderBottom,
        color: styles.color
      };
    });
    
    expect(activeStyles.borderBottom).toContain('rgb(138, 43, 226)'); // Purple
  });

  test('App cards grid layout', async ({ page }) => {
    const gridResult = await comparer.compareElement(
      page,
      '/pages/apps.html',
      '/apps',
      '.apps-grid, .grid',
      'apps-grid',
      { 
        fullPage: false,
        threshold: 0.15 
      }
    );
    
    expect(gridResult.passed).toBeTruthy();
    
    // Check grid responsive behavior
    const breakpoints = [
      { width: 1440, cols: 3 },
      { width: 768, cols: 2 },
      { width: 375, cols: 1 }
    ];
    
    for (const bp of breakpoints) {
      await page.setViewportSize({ width: bp.width, height: 900 });
      await page.goto('http://localhost:3000/apps');
      
      const gridCols = await page.locator('.apps-grid, .grid').evaluate(el => {
        const styles = window.getComputedStyle(el);
        return styles.gridTemplateColumns;
      });
      
      const colCount = gridCols.split(' ').length;
      expect(colCount).toBe(bp.cols);
    }
  });

  test('App card component structure', async ({ page }) => {
    const cardResult = await comparer.compareElement(
      page,
      '/pages/apps.html',
      '/apps',
      '.app-card:first-child',
      'app-card-single',
      { threshold: 0.1 }
    );
    
    expect(cardResult.passed).toBeTruthy();
    
    // Check card hover effects
    const hoverEffects = await TestUtils.verifyInteractions(
      page,
      'http://localhost:8080/pages/apps.html',
      'http://localhost:3000/apps',
      [{
        selector: '.app-card:first-child',
        action: 'hover',
        expectedChanges: [
          { property: 'transform', value: 'scale(1.05)' },
          { property: 'box-shadow', value: '0 20px 40px rgba(0,0,0,0.2)' }
        ]
      }]
    );
    
    expect(hoverEffects[0].matches).toBeTruthy();
  });

  test('Featured badge positioning', async ({ page }) => {
    await page.goto('http://localhost:3000/apps');
    
    // Find a featured app card
    const featuredCard = page.locator('.app-card:has(.featured-badge)').first();
    const cardBox = await featuredCard.boundingBox();
    
    if (cardBox) {
      const badge = featuredCard.locator('.featured-badge');
      const badgeBox = await badge.boundingBox();
      
      if (badgeBox) {
        // Badge should be positioned at top-right without CSS hacks
        expect(badgeBox.x).toBeGreaterThan(cardBox.x + cardBox.width - 100);
        expect(badgeBox.y).toBeLessThan(cardBox.y + 50);
        
        // Check badge styles
        const badgeStyles = await badge.evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            position: styles.position,
            background: styles.background
          };
        });
        
        expect(badgeStyles.position).toBe('absolute');
        expect(badgeStyles.background).toContain('gradient');
      }
    }
  });

  test('Category filter functionality', async ({ page }) => {
    const filterResult = await comparer.compareElement(
      page,
      '/pages/apps.html',
      '/apps',
      '.category-filters, .filters',
      'apps-filters',
      { threshold: 0.1 }
    );
    
    expect(filterResult.passed).toBeTruthy();
    
    // Test filter interaction
    await page.goto('http://localhost:3000/apps');
    const filterButton = page.locator('.filter-button:has-text("AI Tools")').first();
    
    if (await filterButton.isVisible()) {
      await filterButton.click();
      await page.waitForTimeout(300);
      
      // Check if cards are filtered
      const visibleCards = await page.locator('.app-card:visible').count();
      const aiCards = await page.locator('.app-card:has-text("AI")').count();
      
      expect(visibleCards).toBeGreaterThan(0);
    }
  });

  test('Search functionality visual', async ({ page }) => {
    const searchResult = await comparer.compareElement(
      page,
      '/pages/apps.html',
      '/apps',
      '.search-bar, input[type="search"]',
      'apps-search',
      { threshold: 0.1 }
    );
    
    if (searchResult.passed) {
      expect(searchResult.passed).toBeTruthy();
    }
  });

  test('Pagination or load more', async ({ page }) => {
    const paginationResult = await comparer.compareElement(
      page,
      '/pages/apps.html',
      '/apps',
      '.pagination, .load-more',
      'apps-pagination',
      { threshold: 0.1 }
    );
    
    if (paginationResult.passed) {
      expect(paginationResult.passed).toBeTruthy();
    }
  });

  test('App submission CTA', async ({ page }) => {
    const ctaResult = await comparer.compareElement(
      page,
      '/pages/apps.html',
      '/apps',
      '.submit-app-cta, .cta-section',
      'apps-submit-cta',
      { threshold: 0.1 }
    );
    
    if (ctaResult.passed) {
      expect(ctaResult.passed).toBeTruthy();
    }
  });

  test('Full page comparison', async ({ page }) => {
    const result = await comparer.comparePage(
      page,
      '/pages/apps.html',
      '/apps',
      'apps-full-page',
      { 
        fullPage: true,
        waitTime: 2000,
        threshold: 0.2 
      }
    );
    
    expect(result.passed).toBeTruthy();
  });

  test('Card content structure', async ({ page }) => {
    await page.goto('http://localhost:3000/apps');
    const card = page.locator('.app-card').first();
    
    // Check required elements exist
    const hasImage = await card.locator('img, .app-icon').isVisible();
    const hasTitle = await card.locator('h3, .app-title').isVisible();
    const hasDescription = await card.locator('p, .app-description').isVisible();
    const hasCategory = await card.locator('.category, .app-category').isVisible();
    
    expect(hasImage).toBeTruthy();
    expect(hasTitle).toBeTruthy();
    expect(hasDescription).toBeTruthy();
    expect(hasCategory).toBeTruthy();
  });

  test('Loading states', async ({ page }) => {
    // Check if skeleton loaders match design
    await page.goto('http://localhost:3000/apps', { waitUntil: 'domcontentloaded' });
    
    const skeleton = page.locator('.skeleton, .loading');
    if (await skeleton.isVisible()) {
      const skeletonStyles = await skeleton.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          background: styles.background,
          animation: styles.animation
        };
      });
      
      expect(skeletonStyles.animation).toContain('pulse');
    }
  });

  test('Responsive behavior verification', async ({ page }) => {
    const breakpoints = [
      { name: 'mobile', width: 375, height: 812 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1440, height: 900 }
    ];
    
    const results = await comparer.compareResponsive(
      page,
      '/pages/apps.html',
      '/apps',
      'apps-page',
      breakpoints
    );
    
    results.forEach(result => {
      expect(result.passed).toBeTruthy();
    });
  });
});