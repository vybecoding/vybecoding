// AGGRESSIVE SHOWCASE FIX - Copy and paste this into Chrome DevTools Console
console.log('🔥 AGGRESSIVE SHOWCASE FIX - Starting...');

// Step 1: Remove ALL existing styles
document.querySelectorAll('style[id*="showcase"], style[id*="fix"]').forEach(el => {
  console.log('Removing existing style:', el.id);
  el.remove();
});

// Step 2: Find ALL cards (try multiple selectors)
const cardSelectors = [
  '.minimal-card',
  '.vybe-card', 
  '[class*="card"]',
  '.guides-card',
  '.guide-card'
];

let allCards = [];
cardSelectors.forEach(selector => {
  const found = document.querySelectorAll(selector);
  console.log(`Found ${found.length} elements with selector: ${selector}`);
  allCards.push(...found);
});

// Remove duplicates
allCards = [...new Set(allCards)];
console.log(`Total unique cards found: ${allCards.length}`);

// Step 3: Create SUPER aggressive CSS
const aggressiveStyle = document.createElement('style');
aggressiveStyle.id = 'aggressive-showcase-fix';
aggressiveStyle.innerHTML = `
  /* SUPER AGGRESSIVE SHOWCASE FIX */
  .minimal-card,
  .vybe-card,
  [class*="card"] {
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
  
  .minimal-card:hover,
  .vybe-card:hover,
  [class*="card"]:hover {
    background: rgba(42, 42, 42, 0.8) !important;
    border-color: rgba(64, 64, 64, 0.5) !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2) !important;
  }
  
  /* Grid fix */
  .grid {
    display: grid !important;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)) !important;
    gap: 1.5rem !important;
    align-items: stretch !important;
  }
`;
document.head.appendChild(aggressiveStyle);

// Step 4: Force apply styles to EVERY card found
allCards.forEach((card, index) => {
  console.log(`Styling card ${index + 1}:`, card);
  
  // Clear all existing styles
  card.removeAttribute('style');
  card.className = card.className; // Force class recompute
  
  // Force reflow
  card.offsetHeight;
  
  // Apply aggressive inline styles
  const aggressiveStyles = {
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
    transition: 'all 0.3s ease-in-out',
    // Override any framework styles
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(51, 51, 51, 0.4)'
  };
  
  Object.assign(card.style, aggressiveStyles);
  
  // Set important property for each style
  Object.keys(aggressiveStyles).forEach(prop => {
    const kebabProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
    card.style.setProperty(kebabProp, aggressiveStyles[prop], 'important');
  });
  
  console.log(`✅ Card ${index + 1} styled with background:`, card.style.background);
});

// Step 5: Fix grid containers
const gridContainers = document.querySelectorAll('.grid, [class*="grid"]');
gridContainers.forEach((grid, index) => {
  console.log(`Fixing grid ${index + 1}:`, grid);
  
  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '1.5rem',
    alignItems: 'stretch'
  };
  
  Object.assign(grid.style, gridStyles);
  
  // Set important
  Object.keys(gridStyles).forEach(prop => {
    const kebabProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
    grid.style.setProperty(kebabProp, gridStyles[prop], 'important');
  });
});

// Step 6: Add mutation observer to maintain styles
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
      const target = mutation.target;
      if (allCards.includes(target)) {
        console.log('Re-applying styles to modified card');
        // Re-apply styles if they get overridden
        target.style.background = 'rgba(26, 26, 26, 0.8)';
        target.style.setProperty('background', 'rgba(26, 26, 26, 0.8)', 'important');
      }
    }
  });
});

allCards.forEach(card => {
  observer.observe(card, { attributes: true, attributeFilter: ['style'] });
});

console.log('🎉 AGGRESSIVE SHOWCASE FIX COMPLETE!');
console.log(`✅ Styled ${allCards.length} cards`);
console.log('🔒 Mutation observer active to maintain styles');

// Return summary
({
  success: true,
  cardsStyled: allCards.length,
  gridsFixed: gridContainers.length,
  firstCardBackground: allCards[0]?.style.background
});