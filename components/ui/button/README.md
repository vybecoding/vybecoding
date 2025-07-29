# Button Component System

A comprehensive button system with multiple variants, sizes, and states. Built with accessibility and flexibility in mind.

## Components

### Button

The main button component with extensive customization options.

```tsx
import { Button } from '@/components/ui/button';

// Basic usage
<Button>Click me</Button>

// Variants
<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Delete</Button>
<Button variant="success">Confirm</Button>
<Button variant="link">Learn more</Button>

// Sizes
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium (default)</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>

// With icons
<Button leftIcon={<Download />}>Download</Button>
<Button rightIcon={<ArrowRight />}>Continue</Button>

// States
<Button disabled>Disabled</Button>
<Button loading>Loading...</Button>

// Full width
<Button fullWidth>Full Width Button</Button>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `default \| primary \| secondary \| outline \| ghost \| danger \| success \| link` | `default` | Visual style variant |
| size | `xs \| sm \| md \| lg \| xl \| icon \| icon-sm \| icon-lg` | `md` | Button size |
| fullWidth | `boolean` | `false` | Makes button full width |
| loading | `boolean` | `false` | Shows loading spinner and disables button |
| disabled | `boolean` | `false` | Disables the button |
| leftIcon | `ReactNode` | - | Icon to show on the left |
| rightIcon | `ReactNode` | - | Icon to show on the right |
| asChild | `boolean` | `false` | Renders as a child component |

### IconButton

Specialized component for icon-only buttons with required accessibility.

```tsx
import { IconButton } from '@/components/ui/button';
import { Settings } from 'lucide-react';

// Basic usage (aria-label is required)
<IconButton aria-label="Settings">
  <Settings />
</IconButton>

// Different sizes
<IconButton size="sm" aria-label="Edit">
  <Edit size={16} />
</IconButton>

// With variants
<IconButton variant="danger" aria-label="Delete">
  <Trash />
</IconButton>
```

### ButtonGroup

Groups multiple buttons together with optional attachment.

```tsx
import { ButtonGroup, Button } from '@/components/ui/button';

// Separate buttons with spacing
<ButtonGroup>
  <Button>Save</Button>
  <Button>Cancel</Button>
</ButtonGroup>

// Attached buttons (no spacing, shared borders)
<ButtonGroup attached>
  <Button variant="outline">Previous</Button>
  <Button variant="outline">Next</Button>
</ButtonGroup>

// Vertical orientation
<ButtonGroup orientation="vertical">
  <Button>Option 1</Button>
  <Button>Option 2</Button>
  <Button>Option 3</Button>
</ButtonGroup>

// Different spacing sizes
<ButtonGroup size="lg">
  <Button>Large Gap</Button>
  <Button>Between Buttons</Button>
</ButtonGroup>
```

## Design Principles

### 1. Accessibility First
- All buttons have proper focus states with visible rings
- Icon buttons require `aria-label`
- Loading state announces to screen readers
- Disabled state properly communicated

### 2. Visual Hierarchy
- `primary`: Gradient style for main CTAs
- `default`: Solid cyan for primary actions
- `secondary`: Muted for secondary actions
- `outline`: For tertiary actions
- `ghost`: For minimal UI impact
- `danger`/`success`: For semantic actions

### 3. Consistent Spacing
- Padding scales with size
- Icon spacing is proportional
- Full width respects container

### 4. State Management
- Loading state with spinner animation
- Disabled state with reduced opacity
- Hover and focus states for all variants

## Common Patterns

### Form Actions
```tsx
<div className="flex justify-end gap-3">
  <Button variant="ghost">Cancel</Button>
  <Button variant="outline">Save Draft</Button>
  <Button variant="primary">Publish</Button>
</div>
```

### Confirmation Dialogs
```tsx
<div className="flex gap-3">
  <Button variant="outline" fullWidth>
    Cancel
  </Button>
  <Button variant="danger" fullWidth>
    Delete Permanently
  </Button>
</div>
```

### Toggle Groups
```tsx
<ButtonGroup attached>
  <Button variant="outline">Grid</Button>
  <Button variant="primary">List</Button>
  <Button variant="outline">Table</Button>
</ButtonGroup>
```

### Async Actions
```tsx
const [loading, setLoading] = useState(false);

const handleSubmit = async () => {
  setLoading(true);
  await submitForm();
  setLoading(false);
};

<Button loading={loading} onClick={handleSubmit}>
  {loading ? 'Submitting...' : 'Submit Form'}
</Button>
```

### Copy Button
```tsx
const [copied, setCopied] = useState(false);

const handleCopy = () => {
  navigator.clipboard.writeText(text);
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
};

<Button 
  variant="outline"
  leftIcon={copied ? <Check /> : <Copy />}
  onClick={handleCopy}
>
  {copied ? 'Copied!' : 'Copy'}
</Button>
```

## Migration from Demo

Replace demo button classes with the Button component:

```html
<!-- Old -->
<button class="btn btn-primary-purple">Submit</button>
<button class="btn-primary">Continue</button>

<!-- New -->
<Button variant="primary">Submit</Button>
<Button>Continue</Button>
```

## Best Practices

1. **Use semantic variants**: Choose `danger` for destructive actions, `success` for confirmations
2. **Provide feedback**: Use loading states for async operations
3. **Group related actions**: Use ButtonGroup for related buttons
4. **Maintain hierarchy**: Use primary variant sparingly (1-2 per view)
5. **Consider mobile**: Test touch targets on mobile devices
6. **Always label icons**: IconButton requires aria-label for accessibility