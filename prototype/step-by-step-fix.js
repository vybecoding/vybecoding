// STEP-BY-STEP SHOWCASE FIX
// Execute each line one at a time in Chrome DevTools Console

// Step 1: Check what cards exist
console.log('Step 1: Finding cards...');
const cards = document.querySelectorAll('.minimal-card');
console.log('Found cards:', cards.length);
console.log('Cards:', cards);

// Step 2: Check current styling
console.log('Step 2: Current card styling...');
cards.forEach((card, i) => {
  console.log(`Card ${i+1} current background:`, window.getComputedStyle(card).background);
  console.log(`Card ${i+1} current classes:`, card.className);
});

// Step 3: Force apply new background to first card as test
console.log('Step 3: Testing style application...');
if (cards[0]) {
  cards[0].style.background = 'rgba(26, 26, 26, 0.8)';
  cards[0].style.setProperty('background', 'rgba(26, 26, 26, 0.8)', 'important');
  console.log('First card new background:', cards[0].style.background);
}

// Step 4: Apply to all cards
console.log('Step 4: Applying to all cards...');
cards.forEach((card, i) => {
  card.style.cssText = `
    background: rgba(26, 26, 26, 0.8) !important;
    backdrop-filter: blur(10px) !important;
    border: 1px solid rgba(51, 51, 51, 0.4) !important;
    border-radius: 8px !important;
    padding: 1.25rem !important;
    display: flex !important;
    flex-direction: column !important;
    height: 100% !important;
    min-height: 320px !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
    transition: all 0.3s ease-in-out !important;
  `;
  console.log(`Card ${i+1} styled`);
});

console.log('✅ All cards should now have showcase styling!');