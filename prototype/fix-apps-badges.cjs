const fs = require('fs');
const path = require('path');

// Read apps.html
const filePath = path.join(__dirname, 'pages', 'apps.html');
let content = fs.readFileSync(filePath, 'utf8');

// Change all app badges from orange to pink
// Find all badge spans with orange background
const orangeBadgePattern = /bg-vybe-orange\/10 border border-vybe-orange\/20 text-vybe-orange/g;
content = content.replace(orangeBadgePattern, 'bg-vybe-pink/10 border border-vybe-pink/20 text-vybe-pink');

// Write back the file
fs.writeFileSync(filePath, content);

console.log('✅ Fixed app badges:');
console.log('  - Changed badge colors from orange to pink');
console.log('  - Badge spacing is controlled by CSS (12px)');