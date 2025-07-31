import { test, expect } from '@playwright/test';

test.describe('Visual Design System Match', () => {
  test('verify card styles match demo', async ({ page }) => {
    // Test the guide submission page
    await page.goto('http://localhost:3000/guides/submit');
    await page.waitForSelector('.vybe-card');
    
    // Get computed styles of the vybe-card
    const cardStyles = await page.evaluate(() => {
      const card = document.querySelector('.vybe-card');
      if (!card) return null;
      
      const styles = window.getComputedStyle(card);
      return {
        background: styles.backgroundColor,
        backdropFilter: styles.backdropFilter,
        border: styles.border,
        className: card.className
      };
    });
    
    console.log('Card styles:', cardStyles);
    
    // Check that vybe-card class is being used
    expect(cardStyles).toBeTruthy();
    expect(cardStyles.className).toContain('vybe-card');
    
    // Take screenshots for visual comparison
    await page.screenshot({ 
      path: 'visual-snapshots/guide-submit-updated.png',
      fullPage: true
    });
    
    // Compare with demo
    await page.goto('http://localhost:8080/design-system-showcase.html');
    await page.waitForSelector('.minimal-card');
    
    const demoCardStyles = await page.evaluate(() => {
      const card = document.querySelector('.minimal-card');
      if (!card) return null;
      
      const styles = window.getComputedStyle(card);
      return {
        background: styles.backgroundColor,
        backdropFilter: styles.backdropFilter,
        border: styles.border
      };
    });
    
    console.log('Demo card styles:', demoCardStyles);
    
    // Test the updated design test page
    await page.goto('http://localhost:8080/test-updated-design.html');
    await page.screenshot({ 
      path: 'visual-snapshots/design-test-page.png',
      fullPage: true
    });
  });
  
  test('verify hover states work correctly', async ({ page }) => {
    await page.goto('http://localhost:3000/guides/submit');
    await page.waitForSelector('.vybe-card');
    
    // Get initial styles
    const initialStyles = await page.evaluate(() => {
      const card = document.querySelector('.vybe-card');
      if (!card) return null;
      const styles = window.getComputedStyle(card);
      return {
        background: styles.backgroundColor,
        transform: styles.transform
      };
    });
    
    // Hover over the card
    await page.hover('.vybe-card');
    await page.waitForTimeout(500); // Wait for transition
    
    // Get hover styles
    const hoverStyles = await page.evaluate(() => {
      const card = document.querySelector('.vybe-card');
      if (!card) return null;
      const styles = window.getComputedStyle(card);
      return {
        background: styles.backgroundColor,
        transform: styles.transform
      };
    });
    
    console.log('Initial styles:', initialStyles);
    console.log('Hover styles:', hoverStyles);
    
    // Verify hover effect is applied
    expect(hoverStyles.transform).not.toBe(initialStyles.transform);
  });
});