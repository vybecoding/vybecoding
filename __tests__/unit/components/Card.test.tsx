import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card, GuideCard, AppCard, MemberCard, NewsCard } from '@/components/ui/card';

describe('Card Component', () => {
  it('renders basic card with children', () => {
    render(
      <Card>
        <p>Test content</p>
      </Card>
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Card variant="guide">Guide Card</Card>);
    expect(screen.getByText('GUIDE')).toBeInTheDocument();

    rerender(<Card variant="app">App Card</Card>);
    expect(screen.getByText('APP')).toBeInTheDocument();

    rerender(<Card variant="news">News Card</Card>);
    expect(screen.getByText('NEWS')).toBeInTheDocument();

    rerender(<Card variant="member">Member Card</Card>);
    expect(screen.getByText('MEMBER')).toBeInTheDocument();
  });

  it('renders date when provided', () => {
    const testDate = new Date('2024-01-15');
    render(<Card date={testDate}>Card with date</Card>);
    expect(screen.getByText('Jan 15, 2024')).toBeInTheDocument();
  });

  it('renders stats section when provided', () => {
    render(
      <Card stats={<div>Test stats</div>}>
        Card with stats
      </Card>
    );
    expect(screen.getByText('Test stats')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    
    render(
      <Card onClick={handleClick}>
        Clickable card
      </Card>
    );
    
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders as a link when href is provided', () => {
    render(
      <Card href="/test-link">
        Link card
      </Card>
    );
    
    const link = screen.getByRole('button');
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '/test-link');
  });
});

describe('GuideCard Component', () => {
  const mockProps = {
    title: 'Test Guide',
    author: { name: 'John Doe', avatar: '/avatar.jpg' },
    description: 'This is a test guide',
    tags: ['React', 'TypeScript'],
    views: 1234,
    likes: 56,
    difficulty: 'intermediate' as const,
    duration: '15 min'
  };

  it('renders all guide card elements', () => {
    render(<GuideCard {...mockProps} />);
    
    expect(screen.getByText('Test Guide')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('This is a test guide')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('1,234')).toBeInTheDocument();
    expect(screen.getByText('56')).toBeInTheDocument();
    expect(screen.getByText('intermediate')).toBeInTheDocument();
    expect(screen.getByText('15 min')).toBeInTheDocument();
  });

  it('renders author avatar', () => {
    render(<GuideCard {...mockProps} />);
    const avatar = screen.getByAltText('John Doe');
    expect(avatar).toHaveAttribute('src', '/avatar.jpg');
  });
});

describe('AppCard Component', () => {
  const mockProps = {
    title: 'Test App',
    developer: 'Test Developer',
    description: 'This is a test app',
    icon: '/app-icon.png',
    category: 'Productivity',
    pricing: 'freemium' as const,
    rating: 4.5,
    downloads: 10000,
    tags: ['Tool', 'Utility']
  };

  it('renders all app card elements', () => {
    render(<AppCard {...mockProps} />);
    
    expect(screen.getByText('Test App')).toBeInTheDocument();
    expect(screen.getByText('Test Developer')).toBeInTheDocument();
    expect(screen.getByText('This is a test app')).toBeInTheDocument();
    expect(screen.getByText('Productivity')).toBeInTheDocument();
    expect(screen.getByText('freemium')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('10,000')).toBeInTheDocument();
    expect(screen.getByText('Tool')).toBeInTheDocument();
    expect(screen.getByText('Utility')).toBeInTheDocument();
  });

  it('renders app icon', () => {
    render(<AppCard {...mockProps} />);
    const icon = screen.getByAltText('Test App icon');
    expect(icon).toHaveAttribute('src', '/app-icon.png');
  });
});

describe('MemberCard Component', () => {
  const mockProps = {
    name: 'Jane Smith',
    avatar: '/member-avatar.jpg',
    role: 'Senior Developer',
    expertise: ['React', 'Node.js', 'TypeScript', 'GraphQL'],
    location: 'San Francisco',
    isAvailable: true,
    rating: 4.8,
    hourlyRate: 150
  };

  it('renders all member card elements', () => {
    render(<MemberCard {...mockProps} />);
    
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Senior Developer')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('+1 more')).toBeInTheDocument(); // Only shows 3 skills
    expect(screen.getByText('San Francisco')).toBeInTheDocument();
    expect(screen.getByText('4.8')).toBeInTheDocument();
    expect(screen.getByText('$150')).toBeInTheDocument();
    expect(screen.getByText('/hour')).toBeInTheDocument();
  });

  it('shows availability indicator when available', () => {
    render(<MemberCard {...mockProps} />);
    // Check for the availability indicator classes
    expect(document.querySelector('.bg-green-500')).toBeInTheDocument();
  });
});

describe('NewsCard Component', () => {
  const mockProps = {
    title: 'Breaking News',
    excerpt: 'This is an important news article excerpt',
    author: { name: 'Reporter Name', avatar: '/reporter.jpg' },
    readTime: '5 min',
    category: 'Technology',
    image: '/news-image.jpg',
    tags: ['AI', 'Innovation'],
    date: new Date('2024-01-20')
  };

  it('renders all news card elements', () => {
    render(<NewsCard {...mockProps} />);
    
    expect(screen.getByText('Breaking News')).toBeInTheDocument();
    expect(screen.getByText('This is an important news article excerpt')).toBeInTheDocument();
    expect(screen.getByText('Reporter Name')).toBeInTheDocument();
    expect(screen.getByText('5 min read')).toBeInTheDocument();
    expect(screen.getByText('Technology')).toBeInTheDocument();
    expect(screen.getByText('AI')).toBeInTheDocument();
    expect(screen.getByText('Innovation')).toBeInTheDocument();
    expect(screen.getByText('Jan 20, 2024')).toBeInTheDocument();
  });

  it('renders featured image', () => {
    render(<NewsCard {...mockProps} />);
    const image = screen.getByAltText('Breaking News');
    expect(image).toHaveAttribute('src', '/news-image.jpg');
  });
});