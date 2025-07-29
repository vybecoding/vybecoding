import React from 'react';
import { Heading, Text, Code, List, ListItem } from './index';
import { Check, ArrowRight, Star } from 'lucide-react';

export const TypographyExamples = () => {
  return (
    <div className="space-y-12 p-8 max-w-4xl mx-auto">
      {/* Headings Section */}
      <section className="space-y-6">
        <Heading as="h1" color="gradient">Typography System</Heading>
        <Text size="lg" color="muted">
          A comprehensive set of text components for consistent styling across the platform.
        </Text>
        
        <div className="space-y-4 border-l-2 border-gray-800 pl-6">
          <Heading as="h1">Heading Level 1</Heading>
          <Heading as="h2">Heading Level 2</Heading>
          <Heading as="h3">Heading Level 3</Heading>
          <Heading as="h4">Heading Level 4</Heading>
          <Heading as="h5">Heading Level 5</Heading>
          <Heading as="h6">Heading Level 6</Heading>
        </div>
      </section>

      {/* Heading Variants */}
      <section className="space-y-6">
        <Heading as="h2">Heading Variants</Heading>
        
        <div className="space-y-4">
          <Heading as="h3" color="default">Default Color</Heading>
          <Heading as="h3" color="muted">Muted Color</Heading>
          <Heading as="h3" color="primary">Primary Accent</Heading>
          <Heading as="h3" color="secondary">Secondary Accent</Heading>
          <Heading as="h3" color="gradient">Gradient Effect</Heading>
        </div>

        <div className="space-y-4">
          <Heading as="h3" align="left">Left Aligned</Heading>
          <Heading as="h3" align="center">Center Aligned</Heading>
          <Heading as="h3" align="right">Right Aligned</Heading>
        </div>
      </section>

      {/* Text Components */}
      <section className="space-y-6">
        <Heading as="h2">Text Components</Heading>
        
        <div className="space-y-4">
          <Text>
            This is default body text with optimal readability. It uses a comfortable line height
            and appropriate font size for extended reading. The color contrast ensures good
            visibility in both light and dark modes.
          </Text>
          
          <Text size="lg" weight="medium">
            Larger text with medium weight for slight emphasis without being too bold.
          </Text>
          
          <Text size="sm" color="muted">
            Smaller, muted text perfect for descriptions, captions, or secondary information
            that shouldn't compete with primary content.
          </Text>
          
          <Text color="bright" weight="semibold">
            Bright text with semibold weight for important callouts or highlights.
          </Text>
        </div>

        {/* Status Messages */}
        <div className="space-y-3 p-4 bg-gray-900 rounded-lg">
          <Text color="success" weight="medium">
            ✓ Operation completed successfully
          </Text>
          <Text color="error" weight="medium">
            ✗ Error: Invalid input provided
          </Text>
          <Text color="warning" weight="medium">
            ⚠ Warning: This action cannot be undone
          </Text>
        </div>

        {/* Truncation Example */}
        <div className="max-w-md">
          <Text truncate>
            This is a very long text that demonstrates the truncation feature. When the text
            exceeds the container width, it will be cut off with an ellipsis to prevent layout
            issues and maintain a clean appearance.
          </Text>
        </div>
      </section>

      {/* Code Examples */}
      <section className="space-y-6">
        <Heading as="h2">Code Formatting</Heading>
        
        <Text>
          Install dependencies with <Code>npm install</Code> or <Code>yarn add</Code>.
          Configuration files should be named <Code>vybe.config.ts</Code>.
        </Text>

        <Code variant="block">
{`// TypeScript function example
export function calculateSum(numbers: number[]): number {
  return numbers.reduce((acc, num) => acc + num, 0);
}

// Usage
const result = calculateSum([1, 2, 3, 4, 5]);
console.log(result); // 15`}
        </Code>

        <div className="flex gap-4">
          <Code size="xs">Extra Small</Code>
          <Code size="sm">Small</Code>
          <Code size="base">Base</Code>
          <Code size="lg">Large</Code>
        </div>
      </section>

      {/* Lists */}
      <section className="space-y-6">
        <Heading as="h2">Lists</Heading>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Heading as="h3" className="mb-4">Unordered List</Heading>
            <List>
              <ListItem>First item in the list</ListItem>
              <ListItem>Second item with more content</ListItem>
              <ListItem>Third item</ListItem>
              <ListItem>Fourth and final item</ListItem>
            </List>
          </div>

          <div>
            <Heading as="h3" className="mb-4">Ordered List</Heading>
            <List variant="ordered">
              <ListItem>Initialize the project</ListItem>
              <ListItem>Install dependencies</ListItem>
              <ListItem>Configure environment</ListItem>
              <ListItem>Start development server</ListItem>
            </List>
          </div>
        </div>

        <div>
          <Heading as="h3" className="mb-4">Feature List with Icons</Heading>
          <List variant="none" size="lg">
            <ListItem variant="check" icon={<Check size={20} />}>
              Built with TypeScript for type safety
            </ListItem>
            <ListItem variant="check" icon={<Check size={20} />}>
              Dark mode support out of the box
            </ListItem>
            <ListItem variant="check" icon={<Check size={20} />}>
              Fully responsive design system
            </ListItem>
            <ListItem variant="check" icon={<Check size={20} />}>
              Accessible components following WCAG guidelines
            </ListItem>
          </List>
        </div>

        <div>
          <Heading as="h3" className="mb-4">Navigation List</Heading>
          <List variant="none" color="bright">
            <ListItem variant="check" icon={<ArrowRight size={16} />}>
              Getting Started Guide
            </ListItem>
            <ListItem variant="check" icon={<ArrowRight size={16} />}>
              API Documentation
            </ListItem>
            <ListItem variant="check" icon={<ArrowRight size={16} />}>
              Component Examples
            </ListItem>
            <ListItem variant="check" icon={<ArrowRight size={16} />}>
              Best Practices
            </ListItem>
          </List>
        </div>
      </section>

      {/* Real-world Example */}
      <section className="space-y-6 p-6 bg-gray-900 rounded-lg">
        <Heading as="h2" color="gradient">Real-world Example</Heading>
        
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <Heading as="h3">Getting Started with React Hooks</Heading>
              <Text color="muted" size="sm">By John Doe • 5 min read</Text>
            </div>
            <div className="flex items-center gap-1">
              <Star size={16} className="text-yellow-400" />
              <Text size="sm" weight="medium">4.8</Text>
            </div>
          </div>

          <Text>
            React Hooks revolutionized how we write React components by allowing us to use
            state and other React features without writing a class. In this guide, we'll
            explore the most commonly used hooks and best practices.
          </Text>

          <div>
            <Text weight="semibold" className="mb-2">What you'll learn:</Text>
            <List size="sm">
              <ListItem>Understanding the useState hook</ListItem>
              <ListItem>Managing side effects with useEffect</ListItem>
              <ListItem>Performance optimization with useMemo</ListItem>
              <ListItem>Creating custom hooks</ListItem>
            </List>
          </div>

          <Code variant="block" size="sm">
{`import { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}`}
          </Code>

          <div className="flex gap-2">
            <Code size="sm">React</Code>
            <Code size="sm">Hooks</Code>
            <Code size="sm">JavaScript</Code>
            <Code size="sm">Tutorial</Code>
          </div>
        </div>
      </section>
    </div>
  );
};