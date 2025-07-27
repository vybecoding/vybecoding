// Simple JavaScript to inject into Chrome console
console.log('🎨 Applying showcase styling to guides page...');

// Remove any existing showcase styles
const existingStyles = document.querySelectorAll('#showcase-fix, #showcase-fix-styles, #showcase-fix-direct');
existingStyles.forEach(el => el.remove());

// Add showcase CSS
const style = document.createElement('style');
style.id = 'showcase-fix';
style.innerHTML = `
  /* SHOWCASE DESIGN FIX - Console Injection */
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
document.head.appendChild(style);

// Force apply styles to each card
const cards = document.querySelectorAll('.minimal-card');
console.log(`Found ${cards.length} cards to style`);

cards.forEach((card, index) => {
  // Force recompute styles
  const originalCssText = card.style.cssText;
  card.style.cssText = '';
  card.offsetHeight; // Trigger reflow
  
  // Apply inline styles as backup
  Object.assign(card.style, {
    background: 'rgba(26, 26, 26, 0.8)',
    backdropFilter: 'blur(10px)',
    webkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(51, 51, 51, 0.4)',
    borderRadius: '8px',
    padding: '1.25rem',
    position: 'relative',
    zIndex: '10',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: '320px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    transition: 'all 0.3s ease-in-out'
  });
  
  console.log(`✅ Styled card ${index + 1}:`, card.style.background);
});

// Fix grid layout
const grid = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3.gap-6');
if (grid) {
  Object.assign(grid.style, {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '1.5rem',
    alignItems: 'stretch'
  });
  console.log('✅ Fixed grid layout');
}

console.log('🎉 Showcase styling applied! Cards should now match the design system showcase.');
console.log('Cards found:', cards.length);
console.log('First card background:', cards[0]?.style.background);

// Return result
({ success: true, cardCount: cards.length, firstCardBg: cards[0]?.style.background });