import { test, expect } from '@playwright/test';

test.describe('Visual Verification - Component Showcase', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/showcase');
    await page.waitForLoadState('networkidle');
  });

  test('showcase page loads correctly', async ({ page }) => {
    await expect(page).toHaveTitle(/Component Showcase/);
    await expect(page.locator('h1')).toContainText('Component Showcase');
  });

  test('navigation works correctly', async ({ page }) => {
    // Test all navigation buttons exist
    const navButtons = ['cards', 'typography', 'layout', 'buttons', 'forms'];
    for (const button of navButtons) {
      await expect(page.locator(`[data-testid="nav-${button}"]`)).toBeVisible();
    }

    // Test navigation switching
    await page.click('[data-testid="nav-typography"]');
    await expect(page.locator('[data-testid="showcase-typography"]')).toBeVisible();
    
    await page.click('[data-testid="nav-buttons"]');
    await expect(page.locator('[data-testid="showcase-buttons"]')).toBeVisible();
  });

  test.describe('Card Components', () => {
    test('all card variants render correctly', async ({ page }) => {
      await page.click('[data-testid="nav-cards"]');
      await page.waitForSelector('[data-testid="showcase-cards"]');
      
      // Take full page screenshot
      await page.screenshot({ 
        path: 'visual-snapshots/cards-full.png', 
        fullPage: true 
      });

      // Verify key card types are visible
      await expect(page.locator('text=Guide Cards')).toBeVisible();
      await expect(page.locator('text=App Cards')).toBeVisible();
      await expect(page.locator('text=Member Cards')).toBeVisible();
      await expect(page.locator('text=News Cards')).toBeVisible();
    });

    test('card interactions work', async ({ page }) => {
      await page.click('[data-testid="nav-cards"]');
      
      // Test hover states
      const firstCard = page.locator('.card').first();
      await firstCard.hover();
      await page.screenshot({ 
        path: 'visual-snapshots/card-hover.png',
        clip: await firstCard.boundingBox() || undefined
      });
    });
  });

  test.describe('Typography Components', () => {
    test('all typography variants render correctly', async ({ page }) => {
      await page.click('[data-testid="nav-typography"]');
      await page.waitForSelector('[data-testid="showcase-typography"]');
      
      await page.screenshot({ 
        path: 'visual-snapshots/typography-full.png', 
        fullPage: true 
      });

      // Verify heading levels
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('h2')).toBeVisible();
      await expect(page.locator('h3')).toBeVisible();
    });
  });

  test.describe('Layout Components', () => {
    test('responsive layouts work correctly', async ({ page, viewport }) => {
      await page.click('[data-testid="nav-layout"]');
      await page.waitForSelector('[data-testid="showcase-layout"]');
      
      // Desktop view
      await page.screenshot({ 
        path: 'visual-snapshots/layout-desktop.png', 
        fullPage: true 
      });

      // Mobile view
      await page.setViewportSize({ width: 375, height: 667 });
      await page.screenshot({ 
        path: 'visual-snapshots/layout-mobile.png', 
        fullPage: true 
      });

      // Tablet view
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.screenshot({ 
        path: 'visual-snapshots/layout-tablet.png', 
        fullPage: true 
      });
    });
  });

  test.describe('Button Components', () => {
    test('all button states render correctly', async ({ page }) => {
      await page.click('[data-testid="nav-buttons"]');
      await page.waitForSelector('[data-testid="showcase-buttons"]');
      
      await page.screenshot({ 
        path: 'visual-snapshots/buttons-full.png', 
        fullPage: true 
      });

      // Test button interactions
      const primaryButton = page.locator('button:has-text("Primary Gradient")').first();
      
      // Normal state
      await page.screenshot({ 
        path: 'visual-snapshots/button-normal.png',
        clip: await primaryButton.boundingBox() || undefined
      });

      // Hover state
      await primaryButton.hover();
      await page.screenshot({ 
        path: 'visual-snapshots/button-hover.png',
        clip: await primaryButton.boundingBox() || undefined
      });

      // Focus state
      await primaryButton.focus();
      await page.screenshot({ 
        path: 'visual-snapshots/button-focus.png',
        clip: await primaryButton.boundingBox() || undefined
      });
    });

    test('loading states work correctly', async ({ page }) => {
      await page.click('[data-testid="nav-buttons"]');
      
      // Find and click the loading demo button
      const loadingButton = page.locator('button:has-text("Click to Load")');
      await loadingButton.click();
      
      // Verify loading state
      await expect(loadingButton).toContainText('Processing...');
      await expect(loadingButton).toBeDisabled();
    });
  });

  test.describe('Form Components', () => {
    test('all form elements render correctly', async ({ page }) => {
      await page.click('[data-testid="nav-forms"]');
      await page.waitForSelector('[data-testid="showcase-forms"]');
      
      await page.screenshot({ 
        path: 'visual-snapshots/forms-full.png', 
        fullPage: true 
      });
    });

    test('form validation works', async ({ page }) => {
      await page.click('[data-testid="nav-forms"]');
      
      // Find the complete form example
      const form = page.locator('form').filter({ hasText: 'Create Account' });
      
      // Try to submit empty form
      await form.locator('button[type="submit"]').click();
      
      // Check for error states
      await expect(page.locator('text=Email is required')).toBeVisible();
      await expect(page.locator('text=Password is required')).toBeVisible();
      
      // Screenshot of error states
      await page.screenshot({ 
        path: 'visual-snapshots/form-errors.png',
        clip: await form.boundingBox() || undefined
      });
    });

    test('password toggle works', async ({ page }) => {
      await page.click('[data-testid="nav-forms"]');
      
      // Find password input with toggle
      const passwordSection = page.locator('text=Password').first().locator('..');
      const passwordInput = passwordSection.locator('input[type="password"], input[type="text"]').first();
      const toggleButton = passwordSection.locator('svg').last();
      
      // Initial state - password hidden
      await expect(passwordInput).toHaveAttribute('type', 'password');
      
      // Click toggle - password visible
      await toggleButton.click();
      await expect(passwordInput).toHaveAttribute('type', 'text');
      
      // Click again - password hidden
      await toggleButton.click();
      await expect(passwordInput).toHaveAttribute('type', 'password');
    });
  });

  test.describe('Dark Theme Support', () => {
    test('all components work in dark theme', async ({ page }) => {
      // Components should already be in dark theme by default
      await page.screenshot({ 
        path: 'visual-snapshots/showcase-dark-theme.png', 
        fullPage: true 
      });
      
      // Verify dark theme classes are applied
      const html = page.locator('html');
      await expect(html).toHaveClass(/dark/);
    });
  });

  test.describe('Accessibility', () => {
    test('keyboard navigation works', async ({ page }) => {
      await page.goto('/showcase');
      
      // Tab through navigation
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      
      // Use arrow keys to navigate
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('Enter');
      
      // Verify focus is visible
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    });
  });
});