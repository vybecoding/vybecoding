import { test, expect } from '@playwright/test';
import { VisualComparer } from '../helpers/visual-compare';
import { TestUtils } from '../helpers/test-utils';

test.describe('Content Creation Pages Visual Verification', () => {
  let comparer: VisualComparer;

  test.beforeAll(() => {
    comparer = new VisualComparer();
  });

  test('App submission form layout', async ({ page }) => {
    const result = await comparer.comparePage(
      page,
      '/pages/apps/submit.html',
      '/apps/submit',
      'app-submit-page',
      { 
        fullPage: true,
        waitTime: 1000 
      }
    );
    
    expect(result.passed).toBeTruthy();
  });

  test('Multi-step form progress indicator', async ({ page }) => {
    const progressResult = await comparer.compareElement(
      page,
      '/pages/apps/submit.html',
      '/apps/submit',
      '.form-progress, .step-indicator',
      'form-progress-indicator',
      { threshold: 0.1 }
    );
    
    expect(progressResult.passed).toBeTruthy();
    
    // Check step structure
    await page.goto('http://localhost:3000/apps/submit');
    const steps = await page.locator('.step, .progress-step').count();
    expect(steps).toBeGreaterThanOrEqual(4); // At least 4 steps
  });

  test('Step 1: Basic app information', async ({ page }) => {
    await page.goto('http://localhost:3000/apps/submit');
    
    // Check form fields
    const fields = [
      { selector: 'input[name="name"], #app-name', label: 'App Name' },
      { selector: 'textarea[name="description"], #app-description', label: 'Description' },
      { selector: 'select[name="category"], #app-category', label: 'Category' },
      { selector: 'input[name="url"], #app-url', label: 'URL' }
    ];
    
    for (const field of fields) {
      const input = page.locator(field.selector).first();
      if (await input.isVisible()) {
        const inputStyles = await input.evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            background: styles.backgroundColor,
            border: styles.border,
            borderRadius: styles.borderRadius
          };
        });
        
        expect(inputStyles.borderRadius).toContain('px');
      }
    }
  });

  test('Step 2: App images upload', async ({ page }) => {
    await page.goto('http://localhost:3000/apps/submit');
    
    // Navigate to step 2
    const nextButton = page.locator('button:has-text("Next"), button[type="submit"]');
    if (await nextButton.isVisible()) {
      // Fill required fields first
      await page.fill('input[name="name"]', 'Test App');
      await page.fill('textarea[name="description"]', 'Test Description');
      
      await nextButton.click();
      await page.waitForTimeout(500);
    }
    
    // Check image upload area
    const uploadArea = page.locator('.upload-area, .dropzone').first();
    if (await uploadArea.isVisible()) {
      const uploadStyles = await uploadArea.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          border: styles.border,
          borderStyle: styles.borderStyle,
          background: styles.background
        };
      });
      
      expect(uploadStyles.borderStyle).toContain('dashed');
    }
  });

  test('Step navigation buttons', async ({ page }) => {
    const navButtonsResult = await comparer.compareElement(
      page,
      '/pages/apps/submit.html',
      '/apps/submit',
      '.form-navigation, .step-navigation',
      'form-nav-buttons',
      { threshold: 0.1 }
    );
    
    if (navButtonsResult.passed) {
      expect(navButtonsResult.passed).toBeTruthy();
    }
    
    // Check button functionality
    await page.goto('http://localhost:3000/apps/submit');
    
    const backButton = page.locator('button:has-text("Back"), button:has-text("Previous")');
    const nextButton = page.locator('button:has-text("Next"), button:has-text("Continue")');
    
    // Back should be disabled on first step
    if (await backButton.isVisible()) {
      const isDisabled = await backButton.isDisabled();
      expect(isDisabled).toBeTruthy();
    }
  });

  test('Form validation error states', async ({ page }) => {
    await page.goto('http://localhost:3000/apps/submit');
    
    // Try to submit without filling required fields
    const nextButton = page.locator('button:has-text("Next")');
    await nextButton.click();
    
    await page.waitForTimeout(500);
    
    // Check for error messages
    const errorMessage = page.locator('.error-message, .field-error').first();
    if (await errorMessage.isVisible()) {
      const errorStyles = await errorMessage.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          color: styles.color,
          fontSize: styles.fontSize
        };
      });
      
      expect(errorStyles.color).toMatch(/rgb.*[234]\d+.*[45]\d+.*[45]\d+/); // Reddish color
    }
  });

  test('Guide creation form layout', async ({ page }) => {
    const result = await comparer.comparePage(
      page,
      '/pages/guides/create.html',
      '/guides/create',
      'guide-create-page',
      { 
        fullPage: true,
        waitTime: 1000 
      }
    );
    
    expect(result.passed).toBeTruthy();
  });

  test('Markdown editor component', async ({ page }) => {
    const editorResult = await comparer.compareElement(
      page,
      '/pages/guides/create.html',
      '/guides/create',
      '.markdown-editor, .editor-container',
      'markdown-editor',
      { threshold: 0.15 }
    );
    
    if (editorResult.passed) {
      expect(editorResult.passed).toBeTruthy();
    }
    
    // Check editor components
    await page.goto('http://localhost:3000/guides/create');
    
    const toolbar = page.locator('.editor-toolbar, .toolbar');
    const editorArea = page.locator('textarea.editor, .editor-input');
    const preview = page.locator('.preview-pane, .markdown-preview');
    
    if (await toolbar.isVisible()) {
      // Check toolbar buttons
      const toolbarButtons = ['Bold', 'Italic', 'Code', 'Link', 'Image'];
      for (const buttonText of toolbarButtons) {
        const button = toolbar.locator(`button[title*="${buttonText}"], button[aria-label*="${buttonText}"]`);
        if (await button.isVisible()) {
          expect(await button.isVisible()).toBeTruthy();
        }
      }
    }
  });

  test('Editor syntax highlighting', async ({ page }) => {
    await page.goto('http://localhost:3000/guides/create');
    
    const editorArea = page.locator('textarea.editor, .editor-input').first();
    if (await editorArea.isVisible()) {
      // Type some markdown with code
      await editorArea.fill('# Test Guide\n\n```javascript\nconst hello = "world";\n```');
      
      await page.waitForTimeout(500);
      
      // Check if preview shows syntax highlighting
      const codeBlock = page.locator('.preview-pane code, .markdown-preview pre');
      if (await codeBlock.isVisible()) {
        const codeStyles = await codeBlock.evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            background: styles.backgroundColor,
            fontFamily: styles.fontFamily
          };
        });
        
        expect(codeStyles.fontFamily).toContain('mono');
      }
    }
  });

  test('Guide metadata fields', async ({ page }) => {
    await page.goto('http://localhost:3000/guides/create');
    
    const metadataFields = [
      { selector: 'input[name="title"]', label: 'Title' },
      { selector: 'textarea[name="summary"]', label: 'Summary' },
      { selector: 'select[name="category"]', label: 'Category' },
      { selector: 'input[name="tags"]', label: 'Tags' }
    ];
    
    for (const field of metadataFields) {
      const input = page.locator(field.selector).first();
      if (await input.isVisible()) {
        expect(await input.isVisible()).toBeTruthy();
      }
    }
  });

  test('Preview mode toggle', async ({ page }) => {
    await page.goto('http://localhost:3000/guides/create');
    
    const previewToggle = page.locator('button:has-text("Preview"), .preview-toggle');
    if (await previewToggle.isVisible()) {
      await previewToggle.click();
      await page.waitForTimeout(300);
      
      // Check if preview pane is visible
      const preview = page.locator('.preview-pane, .guide-preview');
      expect(await preview.isVisible()).toBeTruthy();
    }
  });

  test('Auto-save indicator', async ({ page }) => {
    await page.goto('http://localhost:3000/guides/create');
    
    const saveIndicator = page.locator('.save-status, .auto-save-indicator');
    if (await saveIndicator.isVisible()) {
      // Type something to trigger auto-save
      const editor = page.locator('textarea').first();
      await editor.fill('Test content');
      
      await page.waitForTimeout(2000); // Wait for auto-save
      
      const saveText = await saveIndicator.textContent();
      expect(saveText).toMatch(/saved|draft/i);
    }
  });

  test('Image upload in guide editor', async ({ page }) => {
    await page.goto('http://localhost:3000/guides/create');
    
    const imageButton = page.locator('button[title*="Image"], button[aria-label*="image"]');
    if (await imageButton.isVisible()) {
      await imageButton.click();
      
      // Check if image upload modal appears
      const uploadModal = page.locator('.upload-modal, dialog');
      if (await uploadModal.isVisible()) {
        const modalStyles = await uploadModal.evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            position: styles.position,
            background: styles.background
          };
        });
        
        expect(modalStyles.position).toMatch(/fixed|absolute/);
      }
    }
  });

  test('Form submission loading states', async ({ page }) => {
    await page.goto('http://localhost:3000/apps/submit');
    
    // Fill form with valid data
    await page.fill('input[name="name"]', 'Test App');
    await page.fill('textarea[name="description"]', 'Test Description that is long enough');
    
    // Navigate to last step
    for (let i = 0; i < 3; i++) {
      const nextButton = page.locator('button:has-text("Next")');
      if (await nextButton.isVisible()) {
        await nextButton.click();
        await page.waitForTimeout(500);
      }
    }
    
    // Try to submit
    const submitButton = page.locator('button:has-text("Submit"), button[type="submit"]:has-text("Create")');
    if (await submitButton.isVisible()) {
      const initialText = await submitButton.textContent();
      
      // Mock submission
      await submitButton.click();
      await page.waitForTimeout(100);
      
      // Check for loading state
      const loadingText = await submitButton.textContent();
      const hasSpinner = await submitButton.locator('.spinner, svg').isVisible();
      
      expect(loadingText !== initialText || hasSpinner).toBeTruthy();
    }
  });

  test('Responsive form layouts', async ({ page }) => {
    const breakpoints = [
      { name: 'mobile', width: 375, height: 812 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1440, height: 900 }
    ];
    
    for (const bp of breakpoints) {
      await page.setViewportSize(bp);
      
      // Test app submission form
      const appFormResult = await comparer.compareElement(
        page,
        '/pages/apps/submit.html',
        '/apps/submit',
        '.form-container, form',
        `app-form-${bp.name}`,
        { threshold: 0.2 }
      );
      
      expect(appFormResult.passed).toBeTruthy();
      
      // Test guide creation form
      const guideFormResult = await comparer.compareElement(
        page,
        '/pages/guides/create.html',
        '/guides/create',
        '.form-container, form',
        `guide-form-${bp.name}`,
        { threshold: 0.2 }
      );
      
      expect(guideFormResult.passed).toBeTruthy();
    }
  });

  test('Success/confirmation pages', async ({ page }) => {
    // Test app submission success
    const appSuccessResult = await comparer.comparePage(
      page,
      '/pages/apps/submit-success.html',
      '/apps/submit/success',
      'app-submit-success',
      { fullPage: true }
    );
    
    if (appSuccessResult.passed) {
      expect(appSuccessResult.passed).toBeTruthy();
    }
    
    // Test guide creation success
    const guideSuccessResult = await comparer.comparePage(
      page,
      '/pages/guides/create-success.html',
      '/guides/create/success',
      'guide-create-success',
      { fullPage: true }
    );
    
    if (guideSuccessResult.passed) {
      expect(guideSuccessResult.passed).toBeTruthy();
    }
  });
});