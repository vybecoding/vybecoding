import React from 'react';
import { render, screen } from '@testing-library/react';
import { CardGrid, Card } from '@/components/ui/card';

describe('CardGrid Component', () => {
  it('renders children correctly', () => {
    render(
      <CardGrid>
        <Card>Card 1</Card>
        <Card>Card 2</Card>
        <Card>Card 3</Card>
      </CardGrid>
    );
    
    expect(screen.getByText('Card 1')).toBeInTheDocument();
    expect(screen.getByText('Card 2')).toBeInTheDocument();
    expect(screen.getByText('Card 3')).toBeInTheDocument();
  });

  it('applies correct column classes', () => {
    const { container, rerender } = render(
      <CardGrid columns={3}>
        <Card>Test</Card>
      </CardGrid>
    );
    
    expect(container.firstChild).toHaveClass('grid--columns-3');
    
    rerender(
      <CardGrid columns="auto">
        <Card>Test</Card>
      </CardGrid>
    );
    
    expect(container.firstChild).toHaveClass('grid--columns-auto');
  });

  it('applies correct gap classes', () => {
    const { container, rerender } = render(
      <CardGrid gap="sm">
        <Card>Test</Card>
      </CardGrid>
    );
    
    expect(container.firstChild).toHaveClass('grid--gap-sm');
    
    rerender(
      <CardGrid gap="lg">
        <Card>Test</Card>
      </CardGrid>
    );
    
    expect(container.firstChild).toHaveClass('grid--gap-lg');
  });

  it('applies correct maxWidth classes', () => {
    const { container, rerender } = render(
      <CardGrid maxWidth="md">
        <Card>Test</Card>
      </CardGrid>
    );
    
    expect(container.firstChild).toHaveClass('grid--max-md');
    
    rerender(
      <CardGrid maxWidth="full">
        <Card>Test</Card>
      </CardGrid>
    );
    
    expect(container.firstChild).toHaveClass('grid--max-full');
  });

  it('applies custom className', () => {
    const { container } = render(
      <CardGrid className="custom-class">
        <Card>Test</Card>
      </CardGrid>
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders with default props', () => {
    const { container } = render(
      <CardGrid>
        <Card>Test</Card>
      </CardGrid>
    );
    
    expect(container.firstChild).toHaveClass('grid');
    expect(container.firstChild).toHaveClass('grid--columns-auto');
    expect(container.firstChild).toHaveClass('grid--gap-md');
    expect(container.firstChild).toHaveClass('grid--max-xl');
  });
});