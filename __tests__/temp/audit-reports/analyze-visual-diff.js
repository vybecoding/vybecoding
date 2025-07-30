import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, 'visual-audit-results');

async function analyzeSpecificDifferences() {
  try {
    const styleData = await fs.readFile(
      path.join(OUTPUT_DIR, 'style-comparison.json'),
      'utf-8'
    );
    const styles = JSON.parse(styleData);

    console.log('\n🔍 Detailed Visual Difference Analysis');
    console.log('=====================================\n');

    // Analyze gradient differences
    console.log('🎨 Gradient Analysis:');
    for (const [page, data] of Object.entries(styles)) {
      for (const [breakpoint, bpData] of Object.entries(data.breakpoints)) {
        const gradientDiffs = bpData.differences?.filter(d => 
          d.property.includes('background') && 
          (d.nextjs?.includes('gradient') || d.demo?.includes('gradient'))
        ) || [];
        
        if (gradientDiffs.length > 0) {
          console.log(`\n${page} @ ${breakpoint}:`);
          gradientDiffs.forEach(diff => {
            console.log(`  ${diff.element}:`);
            console.log(`    Demo: ${diff.demo}`);
            console.log(`    Next: ${diff.nextjs}`);
          });
        }
      }
    }

    // Analyze shadow differences
    console.log('\n\n🌑 Shadow Analysis:');
    for (const [page, data] of Object.entries(styles)) {
      for (const [breakpoint, bpData] of Object.entries(data.breakpoints)) {
        const shadowDiffs = bpData.differences?.filter(d => 
          d.property.includes('shadow')
        ) || [];
        
        if (shadowDiffs.length > 0) {
          console.log(`\n${page} @ ${breakpoint}:`);
          shadowDiffs.forEach(diff => {
            console.log(`  ${diff.element}:`);
            console.log(`    Demo: ${diff.demo}`);
            console.log(`    Next: ${diff.nextjs}`);
          });
        }
      }
    }

    // Analyze color differences
    console.log('\n\n🎨 Color Analysis:');
    for (const [page, data] of Object.entries(styles)) {
      for (const [breakpoint, bpData] of Object.entries(data.breakpoints)) {
        const colorDiffs = bpData.differences?.filter(d => 
          d.property.includes('color') || d.property.includes('Color')
        ) || [];
        
        if (colorDiffs.length > 0) {
          console.log(`\n${page} @ ${breakpoint}:`);
          const uniqueColors = new Set();
          colorDiffs.forEach(diff => {
            const key = `${diff.element}-${diff.property}`;
            if (!uniqueColors.has(key)) {
              uniqueColors.add(key);
              console.log(`  ${diff.element} (${diff.property}):`);
              console.log(`    Demo: ${diff.demo}`);
              console.log(`    Next: ${diff.nextjs}`);
            }
          });
        }
      }
    }

    // Animation/Transition differences
    console.log('\n\n🎭 Animation/Transition Analysis:');
    for (const [page, data] of Object.entries(styles)) {
      for (const [breakpoint, bpData] of Object.entries(data.breakpoints)) {
        const animDiffs = bpData.differences?.filter(d => 
          d.property.includes('transition') || 
          d.property.includes('animation') ||
          d.property.includes('transform')
        ) || [];
        
        if (animDiffs.length > 0) {
          console.log(`\n${page} @ ${breakpoint}:`);
          animDiffs.forEach(diff => {
            console.log(`  ${diff.element} (${diff.property}):`);
            console.log(`    Demo: ${diff.demo}`);
            console.log(`    Next: ${diff.nextjs}`);
          });
        }
      }
    }

    // Typography differences
    console.log('\n\n📝 Typography Analysis:');
    for (const [page, data] of Object.entries(styles)) {
      for (const [breakpoint, bpData] of Object.entries(data.breakpoints)) {
        const typoDiffs = bpData.differences?.filter(d => 
          d.property.includes('font') || 
          d.property.includes('line') ||
          d.property.includes('letter')
        ) || [];
        
        if (typoDiffs.length > 0) {
          console.log(`\n${page} @ ${breakpoint}:`);
          const uniqueElements = new Set();
          typoDiffs.forEach(diff => {
            if (!uniqueElements.has(diff.element)) {
              uniqueElements.add(diff.element);
              console.log(`  ${diff.element}:`);
              const elementDiffs = typoDiffs.filter(d => d.element === diff.element);
              elementDiffs.forEach(d => {
                console.log(`    ${d.property}: ${d.demo} → ${d.nextjs}`);
              });
            }
          });
        }
      }
    }

  } catch (error) {
    console.error('Error analyzing differences:', error);
  }
}

// Run the analysis
analyzeSpecificDifferences();