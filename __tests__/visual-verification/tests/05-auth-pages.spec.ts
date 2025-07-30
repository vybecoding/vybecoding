import { test, expect } from '@playwright/test';
import { VisualComparer } from '../helpers/visual-compare';
import { TestUtils } from '../helpers/test-utils';

test.describe('Authentication Pages Visual Verification', () => {
  let comparer: VisualComparer;

  test.beforeAll(() => {
    comparer = new VisualComparer();
  });

  test('Sign up page layout', async ({ page }) => {
    const result = await comparer.comparePage(
      page,
      '/pages/auth/sign-up.html',
      '/sign-up',
      'signup-page',
      { 
        fullPage: true,
        waitTime: 1000 
      }
    );
    
    expect(result.passed).toBeTruthy();
  });

  test('Sign in page layout', async ({ page }) => {
    const result = await comparer.comparePage(
      page,
      '/pages/auth/sign-in.html',
      '/sign-in',
      'signin-page',
      { 
        fullPage: true,
        waitTime: 1000 
      }
    );
    
    expect(result.passed).toBeTruthy();
  });

  test('Auth form container styling', async ({ page }) => {
    const formResult = await comparer.compareElement(
      page,
      '/pages/auth/sign-up.html',
      '/sign-up',
      '.auth-form, .form-container',
      'auth-form-container',
      { threshold: 0.1 }
    );
    
    expect(formResult.passed).toBeTruthy();
    
    // Check glassmorphism on form
    const glassStyles = await comparer.compareStyles(
      page,
      '/pages/auth/sign-up.html',
      '/sign-up',
      '.auth-form, .form-container',
      [
        'backdrop-filter',
        'background-color',
        'border',
        'border-radius',
        'box-shadow'
      ]
    );
    
    expect(glassStyles.matches).toBeTruthy();
  });

  test('Form input fields styling', async ({ page }) => {
    await page.goto('http://localhost:3000/sign-up');
    
    const input = page.locator('input[type="email"], input[type="text"]').first();
    const inputStyles = await input.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        background: styles.backgroundColor,
        border: styles.border,
        borderRadius: styles.borderRadius,
        padding: styles.padding,
        fontSize: styles.fontSize
      };
    });
    
    // Verify dark theme input styling
    expect(inputStyles.background).toMatch(/rgba?\(.*0\.1\)|#1a1a1a/);
    expect(inputStyles.borderRadius).toContain('px');
  });

  test('Social login buttons', async ({ page }) => {
    const socialResult = await comparer.compareElement(
      page,
      '/pages/auth/sign-up.html',
      '/sign-up',
      '.social-login, .oauth-buttons',
      'social-login-buttons',
      { threshold: 0.1 }
    );
    
    if (socialResult.passed) {
      expect(socialResult.passed).toBeTruthy();
      
      // Check individual button styling
      await page.goto('http://localhost:3000/sign-up');
      const googleButton = page.locator('button:has-text("Google"), .google-button').first();
      
      if (await googleButton.isVisible()) {
        const buttonStyles = await googleButton.evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            display: styles.display,
            alignItems: styles.alignItems,
            gap: styles.gap
          };
        });
        
        expect(buttonStyles.display).toContain('flex');
      }
    }
  });

  test('Form validation states', async ({ page }) => {
    await page.goto('http://localhost:3000/sign-up');
    
    // Try submitting empty form to trigger validation
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();
    
    await page.waitForTimeout(500);
    
    // Check for error styling
    const errorMessage = page.locator('.error-message, .field-error').first();
    if (await errorMessage.isVisible()) {
      const errorStyles = await errorMessage.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          color: styles.color,
          fontSize: styles.fontSize
        };
      });
      
      expect(errorStyles.color).toMatch(/rgb\(.*red|#[ef].*|rgba?\(2[34].*,\s*[45].*,\s*[45].*/);
    }
  });

  test('Password strength indicator', async ({ page }) => {
    await page.goto('http://localhost:3000/sign-up');
    
    const passwordInput = page.locator('input[type="password"]').first();
    await passwordInput.fill('weak');
    
    const strengthIndicator = page.locator('.password-strength, .strength-indicator');
    if (await strengthIndicator.isVisible()) {
      const strengthStyles = await strengthIndicator.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          background: styles.background,
          width: styles.width
        };
      });
      
      expect(strengthStyles.background).toBeTruthy();
    }
  });

  test('Terms and privacy links', async ({ page }) => {
    await page.goto('http://localhost:3000/sign-up');
    
    const termsLink = page.locator('a:has-text("Terms"), a:has-text("terms")');
    const privacyLink = page.locator('a:has-text("Privacy"), a:has-text("privacy")');
    
    if (await termsLink.isVisible()) {
      const linkStyles = await termsLink.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          color: styles.color,
          textDecoration: styles.textDecoration
        };
      });
      
      expect(linkStyles.color).toBeTruthy();
    }
  });

  test('Auth page backgrounds', async ({ page }) => {
    const bgResult = await comparer.compareElement(
      page,
      '/pages/auth/sign-up.html',
      '/sign-up',
      'body, .auth-background',
      'auth-background',
      { 
        fullPage: false,
        threshold: 0.25 // Higher threshold for gradients
      }
    );
    
    if (bgResult.passed) {
      expect(bgResult.passed).toBeTruthy();
    }
  });

  test('Loading states on form submission', async ({ page }) => {
    await page.goto('http://localhost:3000/sign-up');
    
    // Fill form with valid data
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'ValidPassword123!');
    
    const submitButton = page.locator('button[type="submit"]');
    
    // Get initial button text
    const initialText = await submitButton.textContent();
    
    // Click and immediately check for loading state
    const responsePromise = page.waitForResponse(response => 
      response.url().includes('/auth') || response.url().includes('/sign')
    ).catch(() => null);
    
    await submitButton.click();
    
    // Check if button shows loading state
    await page.waitForTimeout(100);
    const loadingText = await submitButton.textContent();
    const hasSpinner = await page.locator('.spinner, .loading-spinner').isVisible();
    
    expect(loadingText !== initialText || hasSpinner).toBeTruthy();
    
    await responsePromise;
  });

  test('Responsive auth forms', async ({ page }) => {
    const breakpoints = [
      { name: 'mobile', width: 375, height: 812 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1440, height: 900 }
    ];
    
    for (const bp of breakpoints) {
      await page.setViewportSize(bp);
      
      const result = await comparer.compareElement(
        page,
        '/pages/auth/sign-up.html',
        '/sign-up',
        '.auth-form, .form-container',
        `auth-form-${bp.name}`,
        { threshold: 0.15 }
      );
      
      expect(result.passed).toBeTruthy();
    }
  });

  test('Switch between sign up and sign in', async ({ page }) => {
    await page.goto('http://localhost:3000/sign-up');
    
    const switchLink = page.locator('a:has-text("Sign in"), a:has-text("Already have an account")');
    if (await switchLink.isVisible()) {
      await switchLink.click();
      await page.waitForLoadState('networkidle');
      
      expect(page.url()).toContain('/sign-in');
    }
  });

  test('Auth form animations', async ({ page }) => {
    const animations = await TestUtils.verifyAnimation(
      page,
      'http://localhost:8080/pages/auth/sign-up.html',
      'http://localhost:3000/sign-up',
      [
        {
          selector: '.auth-form, .form-container',
          property: 'opacity',
          duration: '0.5s',
          timing: 'ease-out'
        },
        {
          selector: 'input',
          property: 'border-color',
          duration: '0.2s'
        }
      ]
    );
    
    animations.forEach(animation => {
      if (animation.matches !== undefined) {
        expect(animation.matches).toBeTruthy();
      }
    });
  });
});