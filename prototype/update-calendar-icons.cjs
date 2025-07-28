const fs = require('fs');
const path = require('path');

// Lucide calendar icon SVG
const lucideCalendarIcon = `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                    <line x1="16" y1="2" x2="16" y2="6"/>
                                    <line x1="8" y1="2" x2="8" y2="6"/>
                                    <line x1="3" y1="10" x2="21" y2="10"/>
                                </svg>`;

// Current calendar icon pattern
const currentCalendarPattern = /<svg class="w-3\.5 h-3\.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">\s*<rect x="5" y="7" width="14" height="14" rx="2" ry="2"\/>\s*<line x1="14" y1="5" x2="14" y2="9"\/>\s*<line x1="10" y1="5" x2="10" y2="9"\/>\s*<line x1="5" y1="12" x2="19" y2="12"\/>\s*<\/svg>/g;

// Files to update
const filesToUpdate = [
  'design-system-showcase.html',
  'pages/guides.html',
  'pages/apps.html',
  'pages/members.html',
  'pages/featured.html'
];

filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, file);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Replace calendar icons
    content = content.replace(currentCalendarPattern, lucideCalendarIcon.trim());
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Updated calendar icons in ${file}`);
    } else {
      console.log(`ℹ️ No calendar icons found in ${file}`);
    }
  } else {
    console.log(`⚠️ File not found: ${file}`);
  }
});

console.log('\\n📅 Calendar icon update complete!');