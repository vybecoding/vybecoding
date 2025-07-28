# Libraries

## UI Libraries

### Lucide Icons ✅
**Status**: INSTALLED - lucide-react@0.532.0

A beautiful & consistent icon library for React applications.

**Installation**:
```bash
npm install lucide-react
```

**Usage**:
```tsx
import { Heart, Star, Moon } from 'lucide-react'

<Heart className="w-6 h-6 text-red-500" />
<Star className="w-6 h-6 text-yellow-500" />
<Moon className="w-6 h-6 text-blue-500" />
```

**Features**:
- 1000+ icons
- Tree-shakeable
- Customizable size and color
- TypeScript support
- Accessible

**Last Tested**: January 28, 2025

### Shadcn/ui Components ✅
**Status**: INSTALLED - Configured with components.json

A modern component library built on Radix UI and Tailwind CSS.

**Installation**:
```bash
npx shadcn@latest init
npx shadcn@latest add [component-name]
```

**Configuration** (`components.json`):
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "styles/globals.css",
    "baseColor": "zinc",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui"
  }
}
```

**Installed Components**:
- Button (`components/ui/button.tsx`)

**Dependencies Installed**:
- clsx - Class name utility
- tailwind-merge - Merge Tailwind classes
- @radix-ui/react-slot - Slot component
- class-variance-authority - Component variants

**Usage Example**:
```tsx
import { Button } from '@/components/ui/button'

<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
```

**Adding More Components**:
```bash
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add form
```

**Last Tested**: January 28, 2025

## Testing Components

A test component demonstrating both libraries is available at:
`components/test-libraries.tsx`

## Best Practices

1. **Icon Usage**:
   - Use semantic icon names
   - Maintain consistent sizing
   - Apply proper ARIA labels for accessibility

2. **Component Library**:
   - Customize components via variants
   - Use the cn() utility for conditional classes
   - Keep components in `components/ui/`
   - Extend with custom variants as needed

## Resources

- [Lucide Icons Documentation](https://lucide.dev)
- [Shadcn/ui Documentation](https://ui.shadcn.com)
- [Radix UI Primitives](https://www.radix-ui.com)