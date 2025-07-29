# Member Card Update Plan

## Current State
Member cards currently have a different structure focused on showing:
- Avatar/profile image
- Name and username
- Expertise/skills tags
- Stats (contributions, reputation, etc.)

## Proposed Updates

### 1. Structure Alignment
- Apply same base card styles (background, border, padding)
- Add "MEMBER" label in top-left corner with gradient background
- Move join date to top-right corner with calendar icon
- Maintain flex layout with content flowing naturally

### 2. Layout Modifications
```
┌─────────────────────────────────┐
│ MEMBER                    📅 Jan 25│
│                                   │
│    [Avatar]                       │
│    @username PRO                  │
│    Full Name                      │
│                                   │
│    [Expertise Tags]               │
│    Python • AI • Claude           │
│                                   │
│ ─────────────────────────────────│
│ ⭐ 4.9 rating        👥 127 helped│
└─────────────────────────────────┘
```

### 3. Key Differences from Other Cards
- Avatar remains prominent (larger than author avatars)
- Username and full name displayed
- Expertise tags instead of content tags
- Bottom stats show rating and people helped instead of likes

### 4. Implementation Steps
1. Update HTML structure to match flex layout
2. Apply universal-card-standard.css base styles
3. Add member-specific overrides:
   - Larger avatar (3rem instead of 1.5rem)
   - Gradient label background
   - Different bottom stats
4. Ensure responsive behavior matches other cards
5. Test hover states and interactions

### 5. Color Scheme
- Label: Gradient (purple to pink) at 56.25% opacity
- Stats: Use star icon for rating, people icon for helped count
- Maintain consistent spacing with other card types

### 6. Benefits
- Consistent visual language across all card types
- Easier to maintain with shared base styles
- Better user recognition of content types
- Flexible height based on expertise tags

### 7. Future Considerations
- Add verified badge for verified members
- Consider adding online/offline status indicator
- Potentially show recent activity or specialization