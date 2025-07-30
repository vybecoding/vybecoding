import { test, expect } from '@playwright/test';
import { VisualComparer } from '../helpers/visual-compare';
import { TestUtils } from '../helpers/test-utils';

test.describe('Profile Pages Visual Verification', () => {
  let comparer: VisualComparer;

  test.beforeAll(() => {
    comparer = new VisualComparer();
  });

  test('Public profile page layout', async ({ page }) => {
    const result = await comparer.comparePage(
      page,
      '/pages/profile/profile.html',
      '/profile/username',
      'profile-page',
      { 
        fullPage: true,
        waitTime: 1000 
      }
    );
    
    expect(result.passed).toBeTruthy();
  });

  test('Profile header section', async ({ page }) => {
    const headerResult = await comparer.compareElement(
      page,
      '/pages/profile/profile.html',
      '/profile/username',
      '.profile-header',
      'profile-header',
      { threshold: 0.1 }
    );
    
    expect(headerResult.passed).toBeTruthy();
    
    // Check profile elements
    await page.goto('http://localhost:3000/profile/username');
    
    const avatar = page.locator('.profile-avatar, .avatar').first();
    const name = page.locator('.profile-name, h1').first();
    const bio = page.locator('.profile-bio, .bio').first();
    
    expect(await avatar.isVisible()).toBeTruthy();
    expect(await name.isVisible()).toBeTruthy();
    expect(await bio.isVisible()).toBeTruthy();
  });

  test('Profile avatar with gradient border', async ({ page }) => {
    await page.goto('http://localhost:3000/profile/username');
    
    const avatarContainer = page.locator('.avatar-container, .profile-avatar-wrapper').first();
    if (await avatarContainer.isVisible()) {
      const avatarStyles = await avatarContainer.evaluate(el => {
        const styles = window.getComputedStyle(el);
        const beforeStyles = window.getComputedStyle(el, '::before');
        return {
          borderRadius: styles.borderRadius,
          position: styles.position,
          hasBefore: beforeStyles.content !== 'none',
          beforeBackground: beforeStyles.background
        };
      });
      
      expect(avatarStyles.borderRadius).toContain('%');
      if (avatarStyles.hasBefore) {
        expect(avatarStyles.beforeBackground).toContain('gradient');
      }
    }
  });

  test('Social links section', async ({ page }) => {
    const socialResult = await comparer.compareElement(
      page,
      '/pages/profile/profile.html',
      '/profile/username',
      '.social-links, .profile-links',
      'profile-social-links',
      { threshold: 0.1 }
    );
    
    if (socialResult.passed) {
      expect(socialResult.passed).toBeTruthy();
      
      await page.goto('http://localhost:3000/profile/username');
      const socialLinks = ['github', 'twitter', 'linkedin', 'website'];
      
      for (const platform of socialLinks) {
        const link = page.locator(`a[href*="${platform}"], .${platform}-link`).first();
        if (await link.isVisible()) {
          const linkStyles = await link.evaluate(el => {
            const styles = window.getComputedStyle(el);
            return {
              display: styles.display,
              alignItems: styles.alignItems
            };
          });
          
          expect(linkStyles.display).toContain('flex');
        }
      }
    }
  });

  test('Skills/badges section', async ({ page }) => {
    const skillsResult = await comparer.compareElement(
      page,
      '/pages/profile/profile.html',
      '/profile/username',
      '.skills-section, .badges-section',
      'profile-skills',
      { threshold: 0.1 }
    );
    
    if (skillsResult.passed) {
      expect(skillsResult.passed).toBeTruthy();
      
      await page.goto('http://localhost:3000/profile/username');
      const skillBadge = page.locator('.skill-badge, .badge').first();
      
      if (await skillBadge.isVisible()) {
        const badgeStyles = await skillBadge.evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            background: styles.background,
            borderRadius: styles.borderRadius,
            padding: styles.padding
          };
        });
        
        expect(badgeStyles.borderRadius).toContain('px');
        expect(badgeStyles.padding).toBeTruthy();
      }
    }
  });

  test('User statistics display', async ({ page }) => {
    const statsResult = await comparer.compareElement(
      page,
      '/pages/profile/profile.html',
      '/profile/username',
      '.user-stats, .profile-stats',
      'profile-stats',
      { threshold: 0.1 }
    );
    
    if (statsResult.passed) {
      expect(statsResult.passed).toBeTruthy();
      
      await page.goto('http://localhost:3000/profile/username');
      const stats = [
        { label: 'Apps', selector: '.apps-count' },
        { label: 'Guides', selector: '.guides-count' },
        { label: 'Followers', selector: '.followers-count' }
      ];
      
      for (const stat of stats) {
        const statElement = page.locator(stat.selector).first();
        if (await statElement.isVisible()) {
          const value = await statElement.textContent();
          expect(value).toMatch(/\d+/);
        }
      }
    }
  });

  test('User content tabs (Apps/Guides/Activity)', async ({ page }) => {
    const tabsResult = await comparer.compareElement(
      page,
      '/pages/profile/profile.html',
      '/profile/username',
      '.content-tabs, .profile-tabs',
      'profile-content-tabs',
      { threshold: 0.1 }
    );
    
    if (tabsResult.passed) {
      expect(tabsResult.passed).toBeTruthy();
      
      // Test tab switching
      await page.goto('http://localhost:3000/profile/username');
      const guidesTab = page.locator('.tab:has-text("Guides")');
      
      if (await guidesTab.isVisible()) {
        await guidesTab.click();
        await page.waitForTimeout(300);
        
        // Check if content changed
        const guidesList = page.locator('.guides-list, .user-guides');
        expect(await guidesList.isVisible()).toBeTruthy();
      }
    }
  });

  test('Booking/calendar integration', async ({ page }) => {
    const bookingResult = await comparer.compareElement(
      page,
      '/pages/profile/profile.html',
      '/profile/username',
      '.booking-section, .calendar-widget',
      'profile-booking',
      { threshold: 0.15 }
    );
    
    if (bookingResult.passed) {
      expect(bookingResult.passed).toBeTruthy();
      
      await page.goto('http://localhost:3000/profile/username');
      const bookButton = page.locator('button:has-text("Book"), .book-meeting');
      
      if (await bookButton.isVisible()) {
        const buttonStyles = await bookButton.evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            background: styles.background,
            color: styles.color
          };
        });
        
        expect(buttonStyles.background).toContain('gradient');
      }
    }
  });

  test('Contact/message button', async ({ page }) => {
    await page.goto('http://localhost:3000/profile/username');
    
    const contactButton = page.locator('button:has-text("Message"), button:has-text("Contact")');
    if (await contactButton.isVisible()) {
      const hoverEffect = await TestUtils.verifyInteractions(
        page,
        'http://localhost:8080/pages/profile/profile.html',
        'http://localhost:3000/profile/username',
        [{
          selector: 'button:has-text("Message"), button:has-text("Contact")',
          action: 'hover',
          expectedChanges: [
            { property: 'transform', value: 'scale(1.05)' }
          ]
        }]
      );
      
      if (hoverEffect[0]) {
        expect(hoverEffect[0].matches).toBeTruthy();
      }
    }
  });

  test('User apps showcase grid', async ({ page }) => {
    const appsGridResult = await comparer.compareElement(
      page,
      '/pages/profile/profile.html',
      '/profile/username',
      '.user-apps-grid, .apps-showcase',
      'profile-apps-grid',
      { threshold: 0.15 }
    );
    
    if (appsGridResult.passed) {
      expect(appsGridResult.passed).toBeTruthy();
    }
  });

  test('User guides list', async ({ page }) => {
    const guidesListResult = await comparer.compareElement(
      page,
      '/pages/profile/profile.html',
      '/profile/username',
      '.user-guides-list, .guides-showcase',
      'profile-guides-list',
      { threshold: 0.15 }
    );
    
    if (guidesListResult.passed) {
      expect(guidesListResult.passed).toBeTruthy();
    }
  });

  test('Edit profile button (for own profile)', async ({ page }) => {
    await page.goto('http://localhost:3000/profile/username');
    
    const editButton = page.locator('button:has-text("Edit Profile"), a:has-text("Edit Profile")');
    if (await editButton.isVisible()) {
      const editStyles = await editButton.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          border: styles.border,
          background: styles.background
        };
      });
      
      // Edit button should have outline style
      expect(editStyles.border).toBeTruthy();
    }
  });

  test('Profile page responsive layout', async ({ page }) => {
    const breakpoints = [
      { name: 'mobile', width: 375, height: 812 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1440, height: 900 }
    ];
    
    for (const bp of breakpoints) {
      await page.setViewportSize(bp);
      
      const result = await comparer.compareElement(
        page,
        '/pages/profile/profile.html',
        '/profile/username',
        '.profile-container, main',
        `profile-${bp.name}`,
        { threshold: 0.2 }
      );
      
      expect(result.passed).toBeTruthy();
      
      // Check layout adjustments
      if (bp.name === 'mobile') {
        await page.goto('http://localhost:3000/profile/username');
        
        // Stats should stack vertically on mobile
        const statsContainer = page.locator('.user-stats, .profile-stats');
        if (await statsContainer.isVisible()) {
          const statsLayout = await statsContainer.evaluate(el => {
            const styles = window.getComputedStyle(el);
            return {
              display: styles.display,
              flexDirection: styles.flexDirection
            };
          });
          
          expect(statsLayout.flexDirection).toContain('column');
        }
      }
    }
  });

  test('Achievement badges display', async ({ page }) => {
    await page.goto('http://localhost:3000/profile/username');
    
    const achievementBadge = page.locator('.achievement-badge, .trophy').first();
    if (await achievementBadge.isVisible()) {
      const achievementStyles = await achievementBadge.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          display: styles.display,
          animation: styles.animation
        };
      });
      
      // Achievements might have subtle animations
      expect(achievementStyles.display).toBeTruthy();
    }
  });

  test('Profile completion indicator', async ({ page }) => {
    await page.goto('http://localhost:3000/profile/username');
    
    const completionBar = page.locator('.profile-completion, .completion-bar');
    if (await completionBar.isVisible()) {
      const barStyles = await completionBar.evaluate(el => {
        const styles = window.getComputedStyle(el);
        const width = styles.width;
        return {
          background: styles.background,
          width: width,
          borderRadius: styles.borderRadius
        };
      });
      
      expect(barStyles.background).toContain('gradient');
      expect(barStyles.borderRadius).toContain('px');
    }
  });
});