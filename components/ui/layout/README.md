# Responsive Layout Components

A comprehensive set of layout components that provide consistent spacing, alignment, and responsive behavior across the Vybecoding platform.

## Components

### Container

Centers content horizontally with responsive max-widths and padding.

```tsx
import { Container } from '@/components/ui/layout';

// Standard container
<Container>
  <h1>Page Content</h1>
</Container>

// Different sizes
<Container size="sm">  {/* max-w-3xl */}
<Container size="md">  {/* max-w-5xl */}
<Container size="lg">  {/* max-w-7xl (default) */}
<Container size="xl">  {/* max-w-[90rem] */}
<Container size="full"> {/* full width */}

// Custom padding
<Container padding="lg">
  Larger internal padding
</Container>
```

### Section

Semantic sections with consistent vertical spacing and optional backgrounds.

```tsx
import { Section } from '@/components/ui/layout';

// Basic section
<Section>
  <Container>
    <h2>Section Title</h2>
    <p>Section content...</p>
  </Container>
</Section>

// With background and spacing
<Section 
  spacing="xl" 
  background="gradient"
  border="bottom"
>
  <Container>
    <h2>Featured Section</h2>
  </Container>
</Section>

// Backgrounds available:
// - subtle: bg-gray-950/50
// - dark: bg-gray-900
// - darker: bg-gray-950
// - gradient: gradient from gray-900 to gray-950
// - pattern: radial gradient pattern
```

### Grid

Responsive grid layout with automatic breakpoints.

```tsx
import { Grid } from '@/components/ui/layout';

// Auto-responsive grid
<Grid cols="auto" gap="md">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</Grid>

// Fixed columns with responsive behavior
<Grid cols={3} gap="lg">
  {/* 1 col mobile, 2 cols tablet, 3 cols desktop */}
</Grid>

// 12-column grid system
<Grid cols={12} gap="sm">
  <div className="col-span-8">Main content</div>
  <div className="col-span-4">Sidebar</div>
</Grid>

// Alignment options
<Grid cols={3} align="center" justify="between">
  {children}
</Grid>
```

### Stack

Flexible flexbox container for vertical or horizontal layouts.

```tsx
import { Stack } from '@/components/ui/layout';

// Vertical stack (default)
<Stack gap="md">
  <Button>First</Button>
  <Button>Second</Button>
  <Button>Third</Button>
</Stack>

// Horizontal stack
<Stack direction="row" gap="sm" align="center">
  <Icon />
  <Text>Label</Text>
</Stack>

// Wrapping items
<Stack 
  direction="row" 
  wrap={true} 
  gap="md"
  justify="between"
>
  {tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
</Stack>

// Complex layouts
<Stack direction="row" justify="between" align="center">
  <Stack gap="xs">
    <Heading>Title</Heading>
    <Text color="muted">Subtitle</Text>
  </Stack>
  <Button>Action</Button>
</Stack>
```

### Box

Generic container with padding, margin, and styling options.

```tsx
import { Box } from '@/components/ui/layout';

// Basic box with padding
<Box padding="md">
  Content with medium padding
</Box>

// Card-like box
<Box 
  padding="lg" 
  rounded="lg" 
  border="thin"
  shadow="md"
>
  <h3>Card Title</h3>
  <p>Card content...</p>
</Box>

// Scrollable container
<Box 
  padding="sm"
  overflow="auto" 
  className="max-h-96"
>
  {longContent}
</Box>
```

### Spacer

Creates consistent spacing between elements.

```tsx
import { Spacer } from '@/components/ui/layout';

// Fixed spacing
<Stack direction="row">
  <Button>Save</Button>
  <Spacer size="md" direction="horizontal" />
  <Button>Cancel</Button>
</Stack>

// Flexible spacing
<Stack direction="row">
  <Logo />
  <Spacer grow />
  <Navigation />
</Stack>

// Vertical spacing
<div>
  <Header />
  <Spacer size="xl" direction="vertical" />
  <Content />
</div>
```

### Center

Centers content both horizontally and vertically.

```tsx
import { Center } from '@/components/ui/layout';

// Full page centering
<Center className="min-h-screen">
  <Card>Centered content</Card>
</Center>

// Inline centering
<Center inline>
  <Icon />
  <Text>Centered inline</Text>
</Center>

// With max width
<Center maxWidth={400}>
  <Form />
</Center>
```

### Divider

Visual separator with multiple styles.

```tsx
import { Divider } from '@/components/ui/layout';

// Simple divider
<Divider />

// With spacing and style
<Divider size="medium" spacing="lg" />

// Gradient divider
<Divider color="gradient" />

// With label
<Divider label="OR" />

// Vertical divider
<Stack direction="row" align="center" gap="md">
  <Button>Option 1</Button>
  <Divider orientation="vertical" />
  <Button>Option 2</Button>
</Stack>
```

## Responsive Design Patterns

### Mobile-First Approach
All components follow a mobile-first design pattern:
```tsx
// Grid automatically adjusts columns
<Grid cols={4}> 
  {/* 1 col on mobile → 2 on tablet → 4 on desktop */}
</Grid>

// Container padding scales with viewport
<Container>
  {/* px-4 on mobile → px-6 on tablet → px-8 on desktop */}
</Container>
```

### Composition Examples

#### Page Layout
```tsx
<Section spacing="lg">
  <Container>
    <Stack gap="xl">
      <Center>
        <Heading as="h1">Page Title</Heading>
      </Center>
      <Divider />
      <Grid cols={3} gap="lg">
        {items.map(item => (
          <Card key={item.id}>{item.content}</Card>
        ))}
      </Grid>
    </Stack>
  </Container>
</Section>
```

#### Dashboard Layout
```tsx
<Container size="xl" padding="none">
  <Grid cols={12} gap="md">
    <Box className="col-span-3">
      <Sidebar />
    </Box>
    <Box className="col-span-9" padding="md">
      <Stack gap="lg">
        <Header />
        <Divider />
        <MainContent />
      </Stack>
    </Box>
  </Grid>
</Container>
```

#### Card Grid
```tsx
<Section background="subtle" spacing="xl">
  <Container>
    <Stack gap="lg">
      <Stack gap="sm" align="center">
        <Heading as="h2">Featured Apps</Heading>
        <Text color="muted">Discover amazing applications</Text>
      </Stack>
      <Grid cols="auto" gap="md">
        {apps.map(app => (
          <AppCard key={app.id} {...app} />
        ))}
      </Grid>
    </Stack>
  </Container>
</Section>
```

## Migration from Demo

Replace demo HTML structures with layout components:

```html
<!-- Old -->
<div class="container">
  <div class="grid grid-3">
    <div class="card">...</div>
  </div>
</div>

<!-- New -->
<Container>
  <Grid cols={3}>
    <Card>...</Card>
  </Grid>
</Container>
```

## Best Practices

1. **Use semantic components**: Choose Section for page sections, Container for content width
2. **Compose layouts**: Combine multiple layout components for complex designs
3. **Responsive by default**: Components handle responsive behavior automatically
4. **Consistent spacing**: Use the gap prop instead of custom margins
5. **Accessibility**: Layout components maintain proper document structure