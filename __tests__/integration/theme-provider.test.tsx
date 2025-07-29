import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { ThemeToggle, ThemeSwitch } from '@/components/ThemeToggle';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock as any;

// Mock matchMedia
global.matchMedia = jest.fn().mockImplementation(query => ({
  matches: query === '(prefers-color-scheme: dark)',
  media: query,
  onchange: null,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
}));

// Test component that uses the theme
const TestComponent = () => {
  const { theme, toggleTheme, setTheme } = useTheme();
  
  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <button onClick={toggleTheme} data-testid="toggle-button">
        Toggle Theme
      </button>
      <button onClick={() => setTheme('light')} data-testid="set-light">
        Set Light
      </button>
      <button onClick={() => setTheme('dark')} data-testid="set-dark">
        Set Dark
      </button>
    </div>
  );
};

describe('ThemeProvider', () => {
  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();
    document.documentElement.classList.remove('light', 'dark');
  });

  it('should default to dark theme', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });
  });

  it('should toggle between themes', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const toggleButton = screen.getByTestId('toggle-button');
    
    // Initially dark
    await waitFor(() => {
      expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
    });

    // Toggle to light
    fireEvent.click(toggleButton);
    await waitFor(() => {
      expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
      expect(document.documentElement.classList.contains('light')).toBe(true);
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    // Toggle back to dark
    fireEvent.click(toggleButton);
    await waitFor(() => {
      expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
      expect(document.documentElement.classList.contains('dark')).toBe(true);
      expect(document.documentElement.classList.contains('light')).toBe(false);
    });
  });

  it('should persist theme to localStorage', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const setLightButton = screen.getByTestId('set-light');
    
    fireEvent.click(setLightButton);
    
    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalledWith('vybe-theme', 'light');
    });
  });

  it('should load theme from localStorage', async () => {
    localStorageMock.getItem.mockReturnValue('light');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
      expect(document.documentElement.classList.contains('light')).toBe(true);
    });
  });

  it('should respect system preference when no stored theme', async () => {
    localStorageMock.getItem.mockReturnValue(null);

    render(
      <ThemeProvider enableSystem>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      // System preference is mocked to prefer dark
      expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
    });
  });
});

describe('ThemeToggle Component', () => {
  it('should render with correct icon based on theme', async () => {
    const { container } = render(
      <ThemeProvider defaultTheme="dark">
        <ThemeToggle />
      </ThemeProvider>
    );

    await waitFor(() => {
      // Moon icon should be visible in dark mode
      const moonIcon = container.querySelector('svg path[d*="M21 12.79A9"]');
      expect(moonIcon?.parentElement).toHaveClass('opacity-100');
      
      // Sun icon should be hidden
      const sunIcon = container.querySelector('svg circle[r="5"]');
      expect(sunIcon?.parentElement).toHaveClass('opacity-0');
    });
  });

  it('should toggle theme on click', async () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
        <TestComponent />
      </ThemeProvider>
    );

    const toggleButton = screen.getByRole('button', { name: /switch to light theme/i });
    
    fireEvent.click(toggleButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
    });
  });
});

describe('ThemeSwitch Component', () => {
  it('should render as a switch with correct state', async () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <ThemeSwitch />
      </ThemeProvider>
    );

    const switchButton = screen.getByRole('switch');
    
    await waitFor(() => {
      expect(switchButton).toHaveAttribute('aria-checked', 'true');
    });
  });

  it('should show label when showLabel is true', () => {
    render(
      <ThemeProvider>
        <ThemeSwitch showLabel />
      </ThemeProvider>
    );

    expect(screen.getByText(/Dark Mode/i)).toBeInTheDocument();
  });
});