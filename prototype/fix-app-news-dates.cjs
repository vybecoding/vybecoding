const fs = require('fs');
const path = require('path');

// Lucide calendar icon SVG
const lucideCalendarIcon = `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                    <line x1="16" y1="2" x2="16" y2="6"/>
                                    <line x1="8" y1="2" x2="8" y2="6"/>
                                    <line x1="3" y1="10" x2="21" y2="10"/>
                                </svg>`;

// Current clock icon pattern
const clockIconPattern = /<svg class="w-3\.5 h-3\.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">\s*<circle cx="12" cy="12" r="10"\/>\s*<polyline points="12,6 12,12 16,14"\/>\s*<\/svg>/g;

// Pattern to remove "Posted " prefix
const postedPattern = /Posted\s+(\d{2}\/\d{2}\/\d{2})/g;

// Files to update - apps and featured pages (which contain news cards)
const filesToUpdate = [
  'pages/apps.html',
  'pages/featured.html',
  'pages/guides/guides-main.html',
  'design-system-showcase.html'
];

filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, file);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Replace clock icons with calendar icons
    content = content.replace(clockIconPattern, lucideCalendarIcon.trim());
    
    // Remove "Posted " prefix from dates
    content = content.replace(postedPattern, '$1');
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Updated ${file}:`);
      
      // Count changes
      const clockIconsReplaced = (originalContent.match(clockIconPattern) || []).length;
      const postedRemoved = (originalContent.match(postedPattern) || []).length;
      
      if (clockIconsReplaced > 0) console.log(`   - Replaced ${clockIconsReplaced} clock icons with calendar icons`);
      if (postedRemoved > 0) console.log(`   - Removed "Posted" from ${postedRemoved} dates`);
    } else {
      console.log(`ℹ️ No changes needed in ${file}`);
    }
  } else {
    console.log(`⚠️ File not found: ${file}`);
  }
});

console.log('\\n📅 App and news card updates complete!');