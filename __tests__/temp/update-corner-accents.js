import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function updateCornerAccents() {
  const filePath = path.join(__dirname, '../../demo/design-system-showcase.html');
  let content = await readFile(filePath, 'utf-8');
  
  // Define the replacements for each card type
  const replacements = [
    {
      // Default Secondary Card
      old: `<!-- Top-left corner accent -->
                        <div class="absolute" style="top: -1px; left: -1px; width: 40px; height: 40px; background: linear-gradient(135deg, #8a2be2 0%, transparent 60%); opacity: 0.6;"></div>
                        <!-- Bottom-right corner accent -->
                        <div class="absolute" style="bottom: -1px; right: -1px; width: 40px; height: 40px; background: linear-gradient(-45deg, #8a2be2 0%, transparent 60%); opacity: 0.3;"></div>`,
      new: `<!-- Top-left corner accent -->
                        <div class="absolute" style="top: 0; left: 0; width: 80px; height: 80px; background: linear-gradient(135deg, rgba(138, 43, 226, 1) 0%, rgba(138, 43, 226, 0.6) 30%, rgba(138, 43, 226, 0.3) 60%, transparent 100%); pointer-events: none;"></div>
                        <!-- Bottom-right corner accent -->
                        <div class="absolute" style="bottom: 0; right: 0; width: 80px; height: 80px; background: linear-gradient(-45deg, rgba(138, 43, 226, 0.8) 0%, rgba(138, 43, 226, 0.5) 30%, rgba(138, 43, 226, 0.2) 60%, transparent 100%); pointer-events: none;"></div>`
    },
    {
      // Pink Secondary Card
      old: `<!-- Top-left corner accent -->
                        <div class="absolute" style="top: -1px; left: -1px; width: 40px; height: 40px; background: linear-gradient(135deg, #d946a0 0%, transparent 60%); opacity: 0.6;"></div>
                        <!-- Bottom-right corner accent -->
                        <div class="absolute" style="bottom: -1px; right: -1px; width: 40px; height: 40px; background: linear-gradient(-45deg, #d946a0 0%, transparent 60%); opacity: 0.3;"></div>`,
      new: `<!-- Top-left corner accent -->
                        <div class="absolute" style="top: 0; left: 0; width: 80px; height: 80px; background: linear-gradient(135deg, rgba(217, 70, 160, 1) 0%, rgba(217, 70, 160, 0.6) 30%, rgba(217, 70, 160, 0.3) 60%, transparent 100%); pointer-events: none;"></div>
                        <!-- Bottom-right corner accent -->
                        <div class="absolute" style="bottom: 0; right: 0; width: 80px; height: 80px; background: linear-gradient(-45deg, rgba(217, 70, 160, 0.8) 0%, rgba(217, 70, 160, 0.5) 30%, rgba(217, 70, 160, 0.2) 60%, transparent 100%); pointer-events: none;"></div>`
    },
    {
      // Orange Secondary Card
      old: `<!-- Top-left corner accent -->
                        <div class="absolute" style="top: -1px; left: -1px; width: 40px; height: 40px; background: linear-gradient(135deg, #e96b3a 0%, transparent 60%); opacity: 0.6;"></div>
                        <!-- Bottom-right corner accent -->
                        <div class="absolute" style="bottom: -1px; right: -1px; width: 40px; height: 40px; background: linear-gradient(-45deg, #e96b3a 0%, transparent 60%); opacity: 0.3;"></div>`,
      new: `<!-- Top-left corner accent -->
                        <div class="absolute" style="top: 0; left: 0; width: 80px; height: 80px; background: linear-gradient(135deg, rgba(233, 107, 58, 1) 0%, rgba(233, 107, 58, 0.6) 30%, rgba(233, 107, 58, 0.3) 60%, transparent 100%); pointer-events: none;"></div>
                        <!-- Bottom-right corner accent -->
                        <div class="absolute" style="bottom: 0; right: 0; width: 80px; height: 80px; background: linear-gradient(-45deg, rgba(233, 107, 58, 0.8) 0%, rgba(233, 107, 58, 0.5) 30%, rgba(233, 107, 58, 0.2) 60%, transparent 100%); pointer-events: none;"></div>`
    }
  ];
  
  // Apply all replacements
  for (const { old, new: newText } of replacements) {
    if (content.includes(old)) {
      content = content.replace(old, newText);
      console.log('✅ Updated corner accents');
    } else {
      console.log('⚠️ Pattern not found:', old.substring(0, 50) + '...');
    }
  }
  
  // Write back
  await writeFile(filePath, content, 'utf-8');
  console.log('\n✅ All secondary cards updated with enhanced corner accents!');
}

updateCornerAccents().catch(console.error);