import React from 'react';
import { render, screen } from '@testing-library/react';
import { Heading } from '@/components/ui/typography';

describe('Heading Component', () => {
  it('renders with default props', () => {
    render(<Heading>Test Heading</Heading>);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Test Heading');
  });

  it('renders different heading levels', () => {
    const { rerender } = render(<Heading as="h1">H1</Heading>);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();

    rerender(<Heading as="h2">H2</Heading>);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();

    rerender(<Heading as="h3">H3</Heading>);
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();

    rerender(<Heading as="h4">H4</Heading>);
    expect(screen.getByRole('heading', { level: 4 })).toBeInTheDocument();

    rerender(<Heading as="h5">H5</Heading>);
    expect(screen.getByRole('heading', { level: 5 })).toBeInTheDocument();

    rerender(<Heading as="h6">H6</Heading>);
    expect(screen.getByRole('heading', { level: 6 })).toBeInTheDocument();
  });

  it('applies color variants', () => {
    const { container, rerender } = render(<Heading color="default">Default</Heading>);
    expect(container.firstChild).toHaveClass('text-gray-100');

    rerender(<Heading color="muted">Muted</Heading>);
    expect(container.firstChild).toHaveClass('text-gray-400');

    rerender(<Heading color="primary">Primary</Heading>);
    expect(container.firstChild).toHaveClass('text-accent-cyan');

    rerender(<Heading color="secondary">Secondary</Heading>);
    expect(container.firstChild).toHaveClass('text-accent-purple');

    rerender(<Heading color="gradient">Gradient</Heading>);
    expect(container.firstChild).toHaveClass('bg-gradient-to-r', 'from-accent-cyan', 'to-accent-purple');
  });

  it('applies alignment classes', () => {
    const { container, rerender } = render(<Heading align="left">Left</Heading>);
    expect(container.firstChild).toHaveClass('text-left');

    rerender(<Heading align="center">Center</Heading>);
    expect(container.firstChild).toHaveClass('text-center');

    rerender(<Heading align="right">Right</Heading>);
    expect(container.firstChild).toHaveClass('text-right');
  });

  it('applies weight variants', () => {
    const { container, rerender } = render(<Heading weight="normal">Normal</Heading>);
    expect(container.firstChild).toHaveClass('font-normal');

    rerender(<Heading weight="medium">Medium</Heading>);
    expect(container.firstChild).toHaveClass('font-medium');

    rerender(<Heading weight="semibold">Semibold</Heading>);
    expect(container.firstChild).toHaveClass('font-semibold');

    rerender(<Heading weight="bold">Bold</Heading>);
    expect(container.firstChild).toHaveClass('font-bold');
  });

  it('applies responsive size classes', () => {
    const { container } = render(<Heading as="h1">Responsive</Heading>);
    expect(container.firstChild).toHaveClass('text-4xl', 'md:text-5xl', 'lg:text-6xl');
  });

  it('merges custom className', () => {
    const { container } = render(<Heading className="custom-class">Custom</Heading>);
    expect(container.firstChild).toHaveClass('custom-class');
    expect(container.firstChild).toHaveClass('font-semibold'); // Default classes still applied
  });

  it('forwards ref properly', () => {
    const ref = React.createRef<HTMLHeadingElement>();
    render(<Heading ref={ref}>Ref Test</Heading>);
    expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
    expect(ref.current?.textContent).toBe('Ref Test');
  });

  it('passes through additional props', () => {
    render(<Heading data-testid="custom-heading" id="main-heading">Props Test</Heading>);
    const heading = screen.getByTestId('custom-heading');
    expect(heading).toHaveAttribute('id', 'main-heading');
  });
});