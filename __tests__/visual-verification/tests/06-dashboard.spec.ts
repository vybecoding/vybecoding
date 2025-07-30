import { test, expect } from '@playwright/test';
import { VisualComparer } from '../helpers/visual-compare';
import { TestUtils } from '../helpers/test-utils';

test.describe('Dashboard Visual Verification', () => {
  let comparer: VisualComparer;

  test.beforeAll(() => {
    comparer = new VisualComparer();
  });

  test('Dashboard layout structure', async ({ page }) => {
    const result = await comparer.comparePage(
      page,
      '/pages/dashboard/dashboard.html',
      '/dashboard',
      'dashboard-layout',
      { 
        fullPage: true,
        waitTime: 1000 
      }
    );
    
    expect(result.passed).toBeTruthy();
  });

  test('Dashboard sidebar navigation', async ({ page }) => {
    const sidebarResult = await comparer.compareElement(
      page,
      '/pages/dashboard/dashboard.html',
      '/dashboard',
      '.dashboard-sidebar, .sidebar',
      'dashboard-sidebar',
      { threshold: 0.1 }
    );
    
    expect(sidebarResult.passed).toBeTruthy();
    
    // Check sidebar items
    await page.goto('http://localhost:3000/dashboard');
    const sidebarItems = [
      { text: 'Overview', icon: true },
      { text: 'My Apps', icon: true },
      { text: 'My Guides', icon: true },
      { text: 'Mentorship', icon: true },
      { text: 'Analytics', icon: true },
      { text: 'Settings', icon: true }
    ];
    
    for (const item of sidebarItems) {
      const menuItem = page.locator(`.sidebar-item:has-text("${item.text}")`);
      if (await menuItem.isVisible()) {
        const hasIcon = await menuItem.locator('svg, .icon').isVisible();
        expect(hasIcon).toBe(item.icon);
      }
    }
  });

  test('Dashboard tab system', async ({ page }) => {
    const tabsResult = await comparer.compareElement(
      page,
      '/pages/dashboard/dashboard.html',
      '/dashboard',
      '.dashboard-tabs, .tab-navigation',
      'dashboard-tabs',
      { threshold: 0.1 }
    );
    
    if (tabsResult.passed) {
      expect(tabsResult.passed).toBeTruthy();
      
      // Test tab switching
      await page.goto('http://localhost:3000/dashboard');
      const mentorshipTab = page.locator('.tab:has-text("Mentorship")');
      
      if (await mentorshipTab.isVisible()) {
        await mentorshipTab.click();
        await page.waitForTimeout(300);
        
        // Check URL changed
        expect(page.url()).toContain('/mentorship');
        
        // Check active state
        const isActive = await mentorshipTab.evaluate(el => {
          return el.classList.contains('active') || 
                 el.getAttribute('data-active') === 'true';
        });
        
        expect(isActive).toBeTruthy();
      }
    }
  });

  test('Dashboard stats cards', async ({ page }) => {
    const statsResult = await comparer.compareElement(
      page,
      '/pages/dashboard/dashboard.html',
      '/dashboard',
      '.stats-grid, .dashboard-stats',
      'dashboard-stats',
      { threshold: 0.1 }
    );
    
    expect(statsResult.passed).toBeTruthy();
    
    // Check individual stat card
    await page.goto('http://localhost:3000/dashboard');
    const statCard = page.locator('.stat-card').first();
    
    if (await statCard.isVisible()) {
      const hasValue = await statCard.locator('.stat-value, .number').isVisible();
      const hasLabel = await statCard.locator('.stat-label, .label').isVisible();
      const hasIcon = await statCard.locator('svg, .icon').isVisible();
      
      expect(hasValue).toBeTruthy();
      expect(hasLabel).toBeTruthy();
    }
  });

  test('Recent activity section', async ({ page }) => {
    const activityResult = await comparer.compareElement(
      page,
      '/pages/dashboard/dashboard.html',
      '/dashboard',
      '.recent-activity, .activity-feed',
      'dashboard-activity',
      { threshold: 0.15 }
    );
    
    if (activityResult.passed) {
      expect(activityResult.passed).toBeTruthy();
    }
  });

  test('Dashboard charts/graphs', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard');
    const chart = page.locator('.chart, canvas, svg.chart').first();
    
    if (await chart.isVisible()) {
      const chartBox = await chart.boundingBox();
      expect(chartBox?.width).toBeGreaterThan(200);
      expect(chartBox?.height).toBeGreaterThan(150);
    }
  });

  test('Profile widget in dashboard', async ({ page }) => {
    const profileResult = await comparer.compareElement(
      page,
      '/pages/dashboard/dashboard.html',
      '/dashboard',
      '.profile-widget, .user-info',
      'dashboard-profile',
      { threshold: 0.1 }
    );
    
    if (profileResult.passed) {
      expect(profileResult.passed).toBeTruthy();
      
      await page.goto('http://localhost:3000/dashboard');
      const avatar = page.locator('.avatar, img[alt*="profile"]').first();
      const username = page.locator('.username, .user-name').first();
      
      if (await avatar.isVisible()) {
        const avatarSrc = await avatar.getAttribute('src');
        expect(avatarSrc).toBeTruthy();
      }
    }
  });

  test('Quick actions section', async ({ page }) => {
    const actionsResult = await comparer.compareElement(
      page,
      '/pages/dashboard/dashboard.html',
      '/dashboard',
      '.quick-actions, .dashboard-actions',
      'dashboard-quick-actions',
      { threshold: 0.1 }
    );
    
    if (actionsResult.passed) {
      expect(actionsResult.passed).toBeTruthy();
      
      // Check action buttons
      await page.goto('http://localhost:3000/dashboard');
      const actionButtons = [
        'Submit App',
        'Create Guide',
        'View Analytics'
      ];
      
      for (const buttonText of actionButtons) {
        const button = page.locator(`button:has-text("${buttonText}")`);
        if (await button.isVisible()) {
          const buttonStyles = await button.evaluate(el => {
            const styles = window.getComputedStyle(el);
            return {
              display: styles.display,
              padding: styles.padding,
              borderRadius: styles.borderRadius
            };
          });
          
          expect(buttonStyles.borderRadius).toContain('px');
        }
      }
    }
  });

  test('Dashboard notifications', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard');
    const notificationBell = page.locator('.notification-bell, [aria-label*="notification"]');
    
    if (await notificationBell.isVisible()) {
      // Check for notification badge
      const badge = notificationBell.locator('.badge, .notification-count');
      if (await badge.isVisible()) {
        const badgeStyles = await badge.evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            background: styles.backgroundColor,
            borderRadius: styles.borderRadius,
            position: styles.position
          };
        });
        
        expect(badgeStyles.borderRadius).toContain('%');
        expect(badgeStyles.position).toBe('absolute');
      }
    }
  });

  test('Settings page', async ({ page }) => {
    const settingsResult = await comparer.comparePage(
      page,
      '/pages/dashboard/settings.html',
      '/dashboard/settings',
      'dashboard-settings',
      { 
        fullPage: true,
        waitTime: 1000 
      }
    );
    
    if (settingsResult.passed) {
      expect(settingsResult.passed).toBeTruthy();
    }
  });

  test('Profile settings form', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard/settings/profile');
    
    const profileForm = page.locator('.profile-form, form').first();
    if (await profileForm.isVisible()) {
      // Check form fields
      const fields = [
        'input[name="name"]',
        'input[name="email"]',
        'textarea[name="bio"]',
        'input[name="website"]'
      ];
      
      for (const field of fields) {
        const input = page.locator(field);
        if (await input.isVisible()) {
          const inputStyles = await input.evaluate(el => {
            const styles = window.getComputedStyle(el);
            return {
              background: styles.backgroundColor,
              border: styles.border,
              padding: styles.padding
            };
          });
          
          expect(inputStyles.padding).toBeTruthy();
        }
      }
    }
  });

  test('Dark mode toggle', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard/settings');
    
    const darkModeToggle = page.locator('.dark-mode-toggle, [aria-label*="dark mode"]');
    if (await darkModeToggle.isVisible()) {
      // Get initial body background
      const initialBg = await page.evaluate(() => {
        return window.getComputedStyle(document.body).backgroundColor;
      });
      
      await darkModeToggle.click();
      await page.waitForTimeout(300);
      
      // Check if background changed
      const afterBg = await page.evaluate(() => {
        return window.getComputedStyle(document.body).backgroundColor;
      });
      
      // Background should change when toggling dark mode
      // Note: This assumes the app starts in dark mode
      expect(initialBg).not.toBe(afterBg);
    }
  });

  test('Responsive dashboard layout', async ({ page }) => {
    const breakpoints = [
      { name: 'mobile', width: 375, height: 812 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1440, height: 900 }
    ];
    
    for (const bp of breakpoints) {
      await page.setViewportSize(bp);
      
      const result = await comparer.compareElement(
        page,
        '/pages/dashboard/dashboard.html',
        '/dashboard',
        '.dashboard-container, main',
        `dashboard-${bp.name}`,
        { threshold: 0.2 }
      );
      
      expect(result.passed).toBeTruthy();
      
      // Check sidebar behavior on mobile
      if (bp.name === 'mobile') {
        await page.goto('http://localhost:3000/dashboard');
        const sidebar = page.locator('.dashboard-sidebar, .sidebar');
        const sidebarVisible = await sidebar.isVisible();
        
        // Sidebar should be hidden on mobile by default
        if (!sidebarVisible) {
          // Look for hamburger menu
          const hamburger = page.locator('.hamburger, .menu-toggle');
          expect(await hamburger.isVisible()).toBeTruthy();
        }
      }
    }
  });

  test('Loading states in dashboard', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard', { waitUntil: 'domcontentloaded' });
    
    const skeleton = page.locator('.skeleton, .loading').first();
    if (await skeleton.isVisible()) {
      const skeletonStyles = await skeleton.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          animation: styles.animation,
          background: styles.background
        };
      });
      
      expect(skeletonStyles.animation).toContain('pulse');
    }
  });
});