# Typography Component Library

A comprehensive typography system built with TypeScript and Tailwind CSS that provides consistent text styling across the Vybecoding platform.

## Components

### Heading

Semantic heading component with responsive sizing and multiple style variants.

```tsx
import { Heading } from '@/components/ui/typography';

// Basic usage
<Heading as="h1">Welcome to Vybecoding</Heading>

// With variants
<Heading 
  as="h2" 
  color="gradient"
  align="center"
  weight="bold"
>
  Build Amazing Apps
</Heading>
```

#### Props
- `as`: h1 | h2 | h3 | h4 | h5 | h6 (default: h1)
- `color`: default | muted | primary | secondary | gradient
- `align`: left | center | right
- `weight`: normal | medium | semibold | bold

### Text

Flexible text component for paragraphs, spans, and labels.

```tsx
import { Text } from '@/components/ui/typography';

// Paragraph
<Text>Regular body text with good readability</Text>

// Muted description
<Text color="muted" size="sm">
  Supporting text with reduced emphasis
</Text>

// Error message
<Text color="error" weight="medium">
  Please fix the validation errors
</Text>

// Truncated text
<Text truncate className="max-w-xs">
  This is a very long text that will be truncated with ellipsis
</Text>
```

#### Props
- `as`: p | span | div | small | label (default: p)
- `size`: xs | sm | base | lg | xl
- `color`: default | muted | bright | primary | secondary | error | success | warning
- `weight`: light | normal | medium | semibold | bold
- `align`: left | center | right | justify
- `truncate`: boolean

### Code

Inline and block code formatting with syntax highlighting support.

```tsx
import { Code } from '@/components/ui/typography';

// Inline code
<Text>
  Use <Code>npm install</Code> to install dependencies
</Text>

// Code block
<Code variant="block">
  {`function greet(name: string) {
  return \`Hello, \${name}!\`;
}`}
</Code>
```

#### Props
- `variant`: inline | block
- `size`: xs | sm | base | lg
- `as`: code | pre

### List

Ordered and unordered lists with optional icons.

```tsx
import { List, ListItem } from '@/components/ui/typography';
import { Check } from 'lucide-react';

// Basic list
<List>
  <ListItem>First item</ListItem>
  <ListItem>Second item</ListItem>
  <ListItem>Third item</ListItem>
</List>

// Ordered list
<List variant="ordered">
  <ListItem>Step one</ListItem>
  <ListItem>Step two</ListItem>
  <ListItem>Step three</ListItem>
</List>

// Checklist with icons
<List variant="none">
  <ListItem variant="check" icon={<Check size={16} />}>
    TypeScript support
  </ListItem>
  <ListItem variant="check" icon={<Check size={16} />}>
    Dark mode compatible
  </ListItem>
  <ListItem variant="check" icon={<Check size={16} />}>
    Fully accessible
  </ListItem>
</List>
```

#### List Props
- `variant`: unordered | ordered | none
- `size`: sm | base | lg
- `color`: default | muted | bright
- `as`: ul | ol

#### ListItem Props
- `variant`: default | check
- `icon`: ReactNode (for check variant)

## Design Principles

1. **Semantic HTML**: Components render appropriate HTML elements
2. **Responsive**: Text sizes scale appropriately across breakpoints
3. **Accessible**: Proper heading hierarchy and ARIA attributes
4. **Consistent**: Uses design system tokens for spacing and colors
5. **Flexible**: Extensive variant system with sensible defaults

## Typography Scale

The typography system uses a modular scale:
- `xs`: 12px
- `sm`: 14px
- `base`: 16px
- `lg`: 18px
- `xl`: 20px
- `2xl`: 24px
- `3xl`: 30px
- `4xl`: 36px
- `5xl`: 48px
- `6xl`: 60px

## Color System

Text colors are designed for optimal contrast:
- `default`: Primary text color (gray-300)
- `muted`: Secondary text (gray-500)
- `bright`: High emphasis (gray-100)
- `primary`: Accent cyan
- `secondary`: Accent purple
- `error`: Red for errors
- `success`: Green for success
- `warning`: Yellow for warnings

## Migration from Demo

Replace HTML text elements with typography components:

```html
<!-- Old -->
<h1 class="hero-text">Welcome</h1>
<p class="description">Build amazing apps</p>
<span class="code">npm install</span>

<!-- New -->
<Heading as="h1">Welcome</Heading>
<Text>Build amazing apps</Text>
<Code>npm install</Code>
```

## Best Practices

1. **Use semantic headings**: Follow proper heading hierarchy (h1 → h2 → h3)
2. **Choose appropriate colors**: Use muted for secondary text, bright for emphasis
3. **Size consistently**: Use the size scale rather than custom classes
4. **Compose components**: Combine typography with layout components
5. **Maintain readability**: Use appropriate line heights and spacing