// DEVTOOLS CONSOLE FIX - Perfect for your current session
// Copy and paste this ENTIRE block into your Chrome DevTools Console

console.log('🔧 DEVTOOLS FIX: Starting showcase styling...');

// Step 1: Clear any existing showcase styles
document.querySelectorAll('style[id*="showcase"], style[id*="fix"]').forEach(el => {
  console.log('Removing old style:', el.id);
  el.remove();
});

// Step 2: Find the exact cards from your DOM structure
const cards = document.querySelectorAll('.minimal-card');
const grid = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3.gap-6');

console.log(`Found ${cards.length} cards and grid:`, !!grid);

// Step 3: Create aggressive CSS override
const showcaseCSS = document.createElement('style');
showcaseCSS.id = 'devtools-showcase-fix';
showcaseCSS.innerHTML = `
/* DEVTOOLS SHOWCASE FIX */
.minimal-card {
  background: rgba(26, 26, 26, 0.8) !important;
  backdrop-filter: blur(10px) !important;
  -webkit-backdrop-filter: blur(10px) !important;
  border: 1px solid rgba(51, 51, 51, 0.4) !important;
  border-radius: 8px !important;
  padding: 1.25rem !important;
  transition: all 0.3s ease-in-out !important;
  position: relative !important;
  z-index: 10 !important;
  cursor: pointer !important;
  display: flex !important;
  flex-direction: column !important;
  height: 100% !important;
  overflow: visible !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
  min-height: 320px !important;
}

.minimal-card:hover {
  background: rgba(42, 42, 42, 0.8) !important;
  border-color: rgba(64, 64, 64, 0.5) !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2) !important;
}

.minimal-card.card-verified {
  border: 1px solid rgba(34, 197, 94, 0.3) !important;
}

.minimal-card.card-verified:hover {
  border-color: rgba(34, 197, 94, 0.4) !important;
}

.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3.gap-6 {
  display: grid !important;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)) !important;
  gap: 1.5rem !important;
  align-items: stretch !important;
}

.grid > .minimal-card {
  min-height: 320px !important;
  display: flex !important;
  flex-direction: column !important;
}
`;

document.head.appendChild(showcaseCSS);
console.log('✅ CSS injected');

// Step 4: Force apply inline styles to each card (nuclear option)
cards.forEach((card, index) => {
  console.log(`Styling card ${index + 1}...`);
  
  // Clear existing inline styles
  card.style.cssText = '';
  
  // Force reflow
  card.offsetHeight;
  
  // Apply showcase styles with maximum priority
  const showcaseStyles = {
    background: 'rgba(26, 26, 26, 0.8)',
    backdropFilter: 'blur(10px)',
    webkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(51, 51, 51, 0.4)',
    borderRadius: '8px',
    padding: '1.25rem',
    position: 'relative',
    zIndex: '999',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: '320px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    transition: 'all 0.3s ease-in-out'
  };
  
  // Apply each style with !important
  Object.entries(showcaseStyles).forEach(([prop, value]) => {
    card.style.setProperty(
      prop.replace(/([A-Z])/g, '-$1').toLowerCase(), 
      value, 
      'important'
    );
  });
  
  console.log(`✅ Card ${index + 1} styled - bg: ${card.style.background}`);
});

// Step 5: Fix grid if found
if (grid) {
  grid.style.setProperty('display', 'grid', 'important');
  grid.style.setProperty('grid-template-columns', 'repeat(auto-fit, minmax(320px, 1fr))', 'important');
  grid.style.setProperty('gap', '1.5rem', 'important');
  grid.style.setProperty('align-items', 'stretch', 'important');
  console.log('✅ Grid layout fixed');
}

// Step 6: Add hover effects programmatically
cards.forEach((card, index) => {
  card.addEventListener('mouseenter', function() {
    this.style.setProperty('background', 'rgba(42, 42, 42, 0.8)', 'important');
    this.style.setProperty('border-color', 'rgba(64, 64, 64, 0.5)', 'important');
    this.style.setProperty('transform', 'translateY(-2px)', 'important');
    this.style.setProperty('box-shadow', '0 8px 24px rgba(0, 0, 0, 0.2)', 'important');
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.setProperty('background', 'rgba(26, 26, 26, 0.8)', 'important');
    this.style.setProperty('border-color', 'rgba(51, 51, 51, 0.4)', 'important');
    this.style.setProperty('transform', 'translateY(0)', 'important');
    this.style.setProperty('box-shadow', '0 4px 12px rgba(0, 0, 0, 0.15)', 'important');
  });
});

console.log('🎉 DEVTOOLS FIX COMPLETE!');
console.log('Cards should now match the showcase design!');
console.log(`Summary: ${cards.length} cards styled, grid fixed: ${!!grid}`);

// Return result for verification
({
  success: true,
  cardsFound: cards.length,
  gridFound: !!grid,
  firstCardBg: cards[0]?.style.background,
  message: 'Showcase styling applied via DevTools!'
});