'use client';

import { ThemeToggle, ThemeSwitch } from '@/components/ThemeToggle';
import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeDemoPage() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-vybe bg-clip-text text-transparent">
            Theme System Demo
          </h1>
          <p className="text-foreground-secondary">
            Current theme: <span className="text-brand-primary font-semibold">{theme}</span>
          </p>
        </div>

        {/* Theme Toggle Components */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">Theme Controls</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <ThemeToggle size="sm" />
              <span className="text-foreground-tertiary">Small toggle</span>
            </div>
            
            <div className="flex items-center gap-4">
              <ThemeToggle size="md" />
              <span className="text-foreground-tertiary">Medium toggle (default)</span>
            </div>
            
            <div className="flex items-center gap-4">
              <ThemeToggle size="lg" />
              <span className="text-foreground-tertiary">Large toggle</span>
            </div>
            
            <div className="flex items-center gap-4">
              <ThemeToggle size="md" showLabel />
              <span className="text-foreground-tertiary">Toggle with label</span>
            </div>
            
            <div className="flex items-center gap-4">
              <ThemeSwitch />
              <span className="text-foreground-tertiary">Switch style</span>
            </div>
            
            <div className="flex items-center gap-4">
              <ThemeSwitch showLabel />
              <span className="text-foreground-tertiary">Switch with label</span>
            </div>
          </div>
        </div>

        {/* Color Showcase */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">Color System</h2>
          
          {/* Background Colors */}
          <div>
            <h3 className="text-lg font-medium text-foreground-secondary mb-3">Backgrounds</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-background border border-border rounded p-3 text-center">
                <span className="text-xs text-foreground-muted">background</span>
              </div>
              <div className="bg-background-secondary border border-border rounded p-3 text-center">
                <span className="text-xs text-foreground-muted">secondary</span>
              </div>
              <div className="bg-background-tertiary border border-border rounded p-3 text-center">
                <span className="text-xs text-foreground-muted">tertiary</span>
              </div>
              <div className="bg-background-elevated border border-border rounded p-3 text-center">
                <span className="text-xs text-foreground-muted">elevated</span>
              </div>
            </div>
          </div>

          {/* Text Colors */}
          <div>
            <h3 className="text-lg font-medium text-foreground-secondary mb-3">Text Colors</h3>
            <div className="space-y-2">
              <p className="text-foreground">Primary text (foreground)</p>
              <p className="text-foreground-secondary">Secondary text</p>
              <p className="text-foreground-tertiary">Tertiary text</p>
              <p className="text-foreground-muted">Muted text</p>
            </div>
          </div>

          {/* Brand Colors */}
          <div>
            <h3 className="text-lg font-medium text-foreground-secondary mb-3">Brand Colors</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-brand-primary rounded p-3 text-center text-white">
                <span className="text-sm font-medium">Primary</span>
              </div>
              <div className="bg-brand-secondary rounded p-3 text-center text-white">
                <span className="text-sm font-medium">Secondary</span>
              </div>
              <div className="bg-brand-accent rounded p-3 text-center text-white">
                <span className="text-sm font-medium">Accent</span>
              </div>
            </div>
          </div>

          {/* Semantic Colors */}
          <div>
            <h3 className="text-lg font-medium text-foreground-secondary mb-3">Semantic Colors</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-success/20 border border-success rounded p-3 text-center">
                <span className="text-sm text-success">Success</span>
              </div>
              <div className="bg-warning/20 border border-warning rounded p-3 text-center">
                <span className="text-sm text-warning">Warning</span>
              </div>
              <div className="bg-error/20 border border-error rounded p-3 text-center">
                <span className="text-sm text-error">Error</span>
              </div>
              <div className="bg-info/20 border border-info rounded p-3 text-center">
                <span className="text-sm text-info">Info</span>
              </div>
            </div>
          </div>
        </div>

        {/* Gradients */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">Gradients</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-24 bg-gradient-vybe rounded-lg"></div>
            <div className="h-24 bg-gradient-purple rounded-lg"></div>
            <div className="h-24 bg-gradient-pink rounded-lg"></div>
            <div className="h-24 bg-gradient-orange rounded-lg"></div>
          </div>
        </div>

        {/* Glow Effects */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">Glow Effects</h2>
          <div className="flex flex-wrap gap-4">
            <button className="px-4 py-2 bg-purple-DEFAULT text-white rounded shadow-glow-purple">
              Purple Glow
            </button>
            <button className="px-4 py-2 bg-pink-DEFAULT text-white rounded shadow-glow-pink">
              Pink Glow
            </button>
            <button className="px-4 py-2 bg-orange-DEFAULT text-white rounded shadow-glow-orange">
              Orange Glow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}