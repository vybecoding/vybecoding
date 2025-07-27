const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function checkNestedContainers() {
  console.log('🔍 Checking guides page for nested container issues...');
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const reportDir = `nested-container-check-${timestamp}`;
  
  // Create report directory
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir);
  }
  
  const browser = await chromium.launch({
    headless: false,
    args: ['--window-size=1920,1080']
  });
  
  try {
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 }
    });
    
    const page = await context.newPage();
    
    // Navigate to guides page
    console.log('📄 Navigating to guides page...');
    await page.goto('http://localhost:8080/#guides', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    
    // Take initial screenshot
    await page.screenshot({ 
      path: path.join(reportDir, '01-guides-page.png'),
      fullPage: true 
    });
    
    // Analyze container nesting
    console.log('📐 Analyzing container nesting...');
    
    const containerAnalysis = await page.evaluate(() => {
      const results = {
        nestedContainers: [],
        containerHierarchy: [],
        potentialIssues: [],
        overflowElements: [],
        layoutMetrics: {}
      };
      
      // Find all elements with container-like classes
      const containerPatterns = [
        'container',
        'wrapper',
        'section',
        'content',
        'main',
        'guides',
        'grid'
      ];
      
      const containerSelectors = containerPatterns.map(pattern => 
        `[class*="${pattern}"], [id*="${pattern}"]`
      ).join(', ');
      
      const containers = document.querySelectorAll(containerSelectors);
      
      // Check for nested containers
      containers.forEach(container => {
        const parent = container.parentElement;
        if (parent) {
          const parentClasses = parent.className || '';
          const parentId = parent.id || '';
          const containerClasses = container.className || '';
          const containerId = container.id || '';
          
          // Check if parent is also a container
          const isParentContainer = containerPatterns.some(pattern => 
            parentClasses.includes(pattern) || parentId.includes(pattern)
          );
          
          if (isParentContainer) {
            results.nestedContainers.push({
              child: {
                tag: container.tagName,
                id: containerId,
                classes: containerClasses,
                width: container.offsetWidth,
                height: container.offsetHeight
              },
              parent: {
                tag: parent.tagName,
                id: parentId,
                classes: parentClasses,
                width: parent.offsetWidth,
                height: parent.offsetHeight
              },
              depth: getDepth(container)
            });
          }
        }
      });
      
      // Build container hierarchy for main content area
      function buildHierarchy(element, depth = 0) {
        const info = {
          tag: element.tagName,
          id: element.id || '',
          classes: element.className || '',
          width: element.offsetWidth,
          height: element.offsetHeight,
          depth: depth,
          children: []
        };
        
        // Only include relevant containers
        const relevantChildren = Array.from(element.children).filter(child => {
          const classes = child.className || '';
          const id = child.id || '';
          return containerPatterns.some(pattern => 
            classes.includes(pattern) || id.includes(pattern)
          );
        });
        
        relevantChildren.forEach(child => {
          if (depth < 5) { // Limit depth to prevent too much recursion
            info.children.push(buildHierarchy(child, depth + 1));
          }
        });
        
        return info;
      }
      
      // Get depth of element
      function getDepth(element) {
        let depth = 0;
        let current = element;
        while (current.parentElement && depth < 10) {
          current = current.parentElement;
          depth++;
        }
        return depth;
      }
      
      // Start from main content
      const mainContent = document.querySelector('#main-content, main, [role="main"]');
      if (mainContent) {
        results.containerHierarchy = buildHierarchy(mainContent);
      }
      
      // Check for specific issues
      
      // 1. Check for excessive nesting (more than 3 levels of containers)
      results.nestedContainers.forEach(nested => {
        if (nested.depth > 15) {
          results.potentialIssues.push({
            type: 'excessive-nesting',
            element: nested.child,
            depth: nested.depth,
            message: `Container nested ${nested.depth} levels deep`
          });
        }
      });
      
      // 2. Check for overflow issues
      const allElements = document.querySelectorAll('*');
      allElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const styles = window.getComputedStyle(el);
        
        // Check horizontal overflow
        if (rect.width > window.innerWidth || rect.right > window.innerWidth) {
          results.overflowElements.push({
            tag: el.tagName,
            id: el.id || '',
            classes: el.className || '',
            width: rect.width,
            right: rect.right,
            viewportWidth: window.innerWidth,
            overflow: styles.overflow,
            overflowX: styles.overflowX
          });
        }
        
        // Check for containers with conflicting overflow settings
        if (el.className && el.className.includes && 
            (el.className.includes('container') || el.className.includes('wrapper'))) {
          const parent = el.parentElement;
          if (parent) {
            const parentStyles = window.getComputedStyle(parent);
            if (styles.overflow === 'hidden' && parentStyles.overflow === 'visible') {
              results.potentialIssues.push({
                type: 'conflicting-overflow',
                element: {
                  tag: el.tagName,
                  classes: el.className,
                  overflow: styles.overflow
                },
                parent: {
                  tag: parent.tagName,
                  classes: parent.className,
                  overflow: parentStyles.overflow
                }
              });
            }
          }
        }
      });
      
      // 3. Check guides grid specifically
      const guidesGrid = document.querySelector('#guides-results-grid');
      if (guidesGrid) {
        const gridStyles = window.getComputedStyle(guidesGrid);
        results.layoutMetrics.guidesGrid = {
          display: gridStyles.display,
          gridTemplateColumns: gridStyles.gridTemplateColumns,
          width: guidesGrid.offsetWidth,
          overflow: gridStyles.overflow,
          position: gridStyles.position,
          childCount: guidesGrid.children.length
        };
        
        // Check if grid is properly constrained
        if (guidesGrid.offsetWidth > window.innerWidth) {
          results.potentialIssues.push({
            type: 'grid-overflow',
            width: guidesGrid.offsetWidth,
            viewportWidth: window.innerWidth
          });
        }
      }
      
      // 4. Check for redundant wrappers
      containers.forEach(container => {
        if (container.children.length === 1) {
          const child = container.children[0];
          const containerStyles = window.getComputedStyle(container);
          const childStyles = window.getComputedStyle(child);
          
          // Check if child is also a container with similar dimensions
          if (Math.abs(container.offsetWidth - child.offsetWidth) < 5 &&
              Math.abs(container.offsetHeight - child.offsetHeight) < 5) {
            const childClasses = child.className || '';
            const childId = child.id || '';
            const isChildContainer = containerPatterns.some(pattern => 
              childClasses.includes(pattern) || childId.includes(pattern)
            );
            
            if (isChildContainer) {
              results.potentialIssues.push({
                type: 'redundant-wrapper',
                parent: {
                  tag: container.tagName,
                  classes: container.className || '',
                  width: container.offsetWidth
                },
                child: {
                  tag: child.tagName,
                  classes: childClasses,
                  width: child.offsetWidth
                }
              });
            }
          }
        }
      });
      
      // Get viewport info
      results.layoutMetrics.viewport = {
        width: window.innerWidth,
        height: window.innerHeight,
        documentWidth: document.documentElement.scrollWidth,
        documentHeight: document.documentElement.scrollHeight,
        hasHorizontalScroll: document.documentElement.scrollWidth > window.innerWidth
      };
      
      return results;
    });
    
    // Log results
    console.log('\n📊 Container Analysis Results:');
    console.log(`- Nested containers found: ${containerAnalysis.nestedContainers.length}`);
    console.log(`- Overflow elements: ${containerAnalysis.overflowElements.length}`);
    console.log(`- Potential issues: ${containerAnalysis.potentialIssues.length}`);
    
    if (containerAnalysis.layoutMetrics.guidesGrid) {
      console.log('\n📐 Guides Grid Metrics:');
      console.log(`- Display: ${containerAnalysis.layoutMetrics.guidesGrid.display}`);
      console.log(`- Width: ${containerAnalysis.layoutMetrics.guidesGrid.width}px`);
      console.log(`- Child count: ${containerAnalysis.layoutMetrics.guidesGrid.childCount}`);
    }
    
    console.log('\n📱 Viewport:');
    console.log(`- Size: ${containerAnalysis.layoutMetrics.viewport.width}x${containerAnalysis.layoutMetrics.viewport.height}`);
    console.log(`- Horizontal scroll: ${containerAnalysis.layoutMetrics.viewport.hasHorizontalScroll ? '❌ YES' : '✅ NO'}`);
    
    // Highlight nested containers visually
    if (containerAnalysis.nestedContainers.length > 0) {
      await page.evaluate((nestedContainers) => {
        nestedContainers.forEach((nested, index) => {
          let selector = nested.child.tag;
          if (nested.child.id) {
            selector = `${nested.child.tag}#${nested.child.id}`;
          } else if (nested.child.classes) {
            const firstClass = nested.child.classes.split(' ')[0];
            if (firstClass) {
              selector = `${nested.child.tag}.${firstClass}`;
            }
          }
          
          try {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
              el.style.outline = '2px solid red';
              el.style.outlineOffset = '-2px';
            });
          } catch (e) {
            console.error('Invalid selector:', selector);
          }
        });
      }, containerAnalysis.nestedContainers);
      
      await page.waitForTimeout(1000);
      await page.screenshot({ 
        path: path.join(reportDir, '02-nested-containers-highlighted.png'),
        fullPage: true 
      });
    }
    
    // Generate detailed report
    const report = `# Nested Container Analysis Report

**Date:** ${new Date().toISOString()}
**Page:** Guides Page
**Viewport:** 1920x1080

## Summary

- **Nested Containers Found:** ${containerAnalysis.nestedContainers.length}
- **Overflow Elements:** ${containerAnalysis.overflowElements.length}
- **Potential Issues:** ${containerAnalysis.potentialIssues.length}
- **Horizontal Scroll:** ${containerAnalysis.layoutMetrics.viewport.hasHorizontalScroll ? '❌ Present' : '✅ None'}

## Guides Grid Analysis

${containerAnalysis.layoutMetrics.guidesGrid ? `
- **Display Type:** ${containerAnalysis.layoutMetrics.guidesGrid.display}
- **Grid Columns:** ${containerAnalysis.layoutMetrics.guidesGrid.gridTemplateColumns || 'N/A'}
- **Width:** ${containerAnalysis.layoutMetrics.guidesGrid.width}px
- **Overflow Setting:** ${containerAnalysis.layoutMetrics.guidesGrid.overflow}
- **Number of Cards:** ${containerAnalysis.layoutMetrics.guidesGrid.childCount}
` : 'Guides grid not found'}

## Nested Containers

${containerAnalysis.nestedContainers.length > 0 ? 
  containerAnalysis.nestedContainers.map((nested, idx) => `
### Nesting ${idx + 1}
- **Child:** ${nested.child.tag}${nested.child.id ? '#' + nested.child.id : ''}${nested.child.classes ? '.' + nested.child.classes.split(' ')[0] : ''} (${nested.child.width}x${nested.child.height}px)
- **Parent:** ${nested.parent.tag}${nested.parent.id ? '#' + nested.parent.id : ''}${nested.parent.classes ? '.' + nested.parent.classes.split(' ')[0] : ''} (${nested.parent.width}x${nested.parent.height}px)
- **Nesting Depth:** ${nested.depth} levels
`).join('\n') : 
  '✅ No problematic nested containers detected'}

## Potential Issues

${containerAnalysis.potentialIssues.length > 0 ?
  containerAnalysis.potentialIssues.map((issue, idx) => {
    switch(issue.type) {
      case 'excessive-nesting':
        return `### ${idx + 1}. Excessive Nesting
- **Element:** ${issue.element.tag}${issue.element.id ? '#' + issue.element.id : ''}
- **Depth:** ${issue.depth} levels
- **Message:** ${issue.message}`;
      
      case 'conflicting-overflow':
        return `### ${idx + 1}. Conflicting Overflow Settings
- **Element:** ${issue.element.tag}.${issue.element.classes} (overflow: ${issue.element.overflow})
- **Parent:** ${issue.parent.tag}.${issue.parent.classes} (overflow: ${issue.parent.overflow})`;
      
      case 'redundant-wrapper':
        return `### ${idx + 1}. Redundant Wrapper
- **Parent:** ${issue.parent.tag}.${issue.parent.classes} (${issue.parent.width}px)
- **Child:** ${issue.child.tag}.${issue.child.classes} (${issue.child.width}px)`;
      
      case 'grid-overflow':
        return `### ${idx + 1}. Grid Overflow
- **Grid Width:** ${issue.width}px
- **Viewport Width:** ${issue.viewportWidth}px
- **Overflow:** ${issue.width - issue.viewportWidth}px`;
      
      default:
        return `### ${idx + 1}. ${issue.type}
${JSON.stringify(issue, null, 2)}`;
    }
  }).join('\n\n') :
  '✅ No potential issues detected'}

## Overflow Elements

${containerAnalysis.overflowElements.length > 0 ?
  containerAnalysis.overflowElements.map((el, idx) => 
    `### ${idx + 1}. ${el.tag}${el.id ? '#' + el.id : ''}${el.classes ? '.' + el.classes.split(' ')[0] : ''}
- **Width:** ${el.width}px (extends to ${el.right}px)
- **Viewport:** ${el.viewportWidth}px
- **Overflow Settings:** ${el.overflow} (X: ${el.overflowX})`
  ).join('\n\n') :
  '✅ No overflow elements detected'}

## Container Hierarchy

\`\`\`
${JSON.stringify(containerAnalysis.containerHierarchy, null, 2)}
\`\`\`

## Recommendations

${containerAnalysis.nestedContainers.length > 0 || containerAnalysis.potentialIssues.length > 0 ? `
1. Review nested containers to eliminate unnecessary wrappers
2. Ensure consistent overflow settings between parent and child containers
3. Use CSS Grid or Flexbox to avoid excessive nesting
4. Consider flattening the container hierarchy where possible
` : '✅ The container structure appears to be well-organized with no significant nesting issues.'}

## Screenshots

- \`01-guides-page.png\` - Initial page view
${containerAnalysis.nestedContainers.length > 0 ? '- `02-nested-containers-highlighted.png` - Nested containers highlighted in red' : ''}
`;
    
    fs.writeFileSync(
      path.join(reportDir, 'NESTED-CONTAINER-REPORT.md'),
      report
    );
    
    // Save raw data
    fs.writeFileSync(
      path.join(reportDir, 'container-analysis.json'),
      JSON.stringify(containerAnalysis, null, 2)
    );
    
    console.log(`\n✅ Analysis complete!`);
    console.log(`📁 Report saved to: ${reportDir}/`);
    console.log(`📄 View report: ${reportDir}/NESTED-CONTAINER-REPORT.md`);
    
    // Close browser after a short delay
    console.log('\n🔒 Closing browser in 5 seconds...');
    await page.waitForTimeout(5000);
    
  } finally {
    await browser.close();
  }
}

// Run the check
checkNestedContainers().catch(console.error);