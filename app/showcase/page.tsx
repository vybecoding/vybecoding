'use client';

import React from 'react';
import { Container, Section, Stack } from '@/components/ui/layout';
import { Heading, Text } from '@/components/ui/typography';

// Lazy load examples to avoid build issues
const CardExamples = React.lazy(() => import('@/components/ui/card/examples').then(m => ({ default: m.CardExamples })));
const TypographyExamples = React.lazy(() => import('@/components/ui/typography/examples').then(m => ({ default: m.TypographyExamples })));
const LayoutExamples = React.lazy(() => import('@/components/ui/layout/examples').then(m => ({ default: m.LayoutExamples })));
const ButtonExamples = React.lazy(() => import('@/components/ui/button/examples').then(m => ({ default: m.ButtonExamples })));
const FormExamples = React.lazy(() => import('@/components/ui/form/examples').then(m => ({ default: m.FormExamples })));

export default function ShowcasePage() {
  const [activeSection, setActiveSection] = React.useState('cards');

  const sections = [
    { id: 'cards', label: 'Cards', component: CardExamples },
    { id: 'typography', label: 'Typography', component: TypographyExamples },
    { id: 'layout', label: 'Layout', component: LayoutExamples },
    { id: 'buttons', label: 'Buttons', component: ButtonExamples },
    { id: 'forms', label: 'Forms', component: FormExamples },
  ];

  const ActiveComponent = sections.find(s => s.id === activeSection)?.component || CardExamples;

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <Section spacing="sm" background="dark" border="bottom">
        <Container>
          <Stack direction="row" align="center" justify="between">
            <Heading as="h1" size="lg">Component Showcase</Heading>
            <Text color="muted" size="sm">Visual verification for all components</Text>
          </Stack>
        </Container>
      </Section>

      {/* Navigation */}
      <Section spacing="sm" background="darker">
        <Container>
          <nav className="flex gap-2 overflow-x-auto pb-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  activeSection === section.id
                    ? 'bg-accent-cyan text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                data-testid={`nav-${section.id}`}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </Container>
      </Section>

      {/* Component Display */}
      <Section spacing="none">
        <div data-testid={`showcase-${activeSection}`}>
          <React.Suspense fallback={<div className="p-8 text-center">Loading components...</div>}>
            <ActiveComponent />
          </React.Suspense>
        </div>
      </Section>

      {/* Quick Links for Testing */}
      <div className="hidden">
        {sections.map((section) => (
          <a key={section.id} href={`#${section.id}`} data-testid={`anchor-${section.id}`}>
            {section.label}
          </a>
        ))}
      </div>
    </div>
  );
}