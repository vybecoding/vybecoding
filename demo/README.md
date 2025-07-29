# vybecoding.ai Demo

Modern AI-powered development platform demo built with Vite and modern web technologies.

## ✨ Features

- **🚀 Modern Build Pipeline**: Vite-powered development and production builds
- **📱 Responsive Design**: Mobile-first responsive layout with Tailwind CSS
- **♿ Accessibility**: WCAG-compliant with ARIA enhancements and semantic HTML
- **🎨 Advanced Animations**: CSS-based logo animations and smooth transitions
- **🔄 State Management**: Modular JavaScript architecture with ES6 modules
- **⚡ Performance**: Optimized loading states, error handling, and code splitting
- **🎯 Type Safety**: JSDoc annotations for better development experience

## 🎨 UI Components & Best Practices

### Use Official Components
**Important:** Always use official, production-ready UI components instead of CSS hacks:
- ✅ Use Shadcn UI components: `npx shadcn-ui@latest add [component]`
- ✅ Use Lucide React icons: `npm install lucide-react`
- ✅ Use Tailwind UI patterns for consistent styling
- ❌ Avoid CSS text-indent hacks to hide content
- ❌ Don't use absolute positioning tricks for layout
- ❌ Never rely on overflow:hidden to fix visual issues

### Why This Matters
- **Production Stability**: CSS hacks often break across browsers or screen sizes
- **Maintainability**: Official components are well-documented and tested
- **Accessibility**: Proper components ensure screen reader compatibility
- **Performance**: Framework components are optimized for production

## 🛠️ Development

### Prerequisites

- Node.js >= 16.0.0
- npm >= 8.0.0

### Quick Start

```bash
# Install dependencies
npm install

# Start development server on port 8080 (to avoid conflict with main app)
npm run demo

# Or use Vite dev server on port 3000
npm run dev
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite development server with HMR |
| `npm run build` | Production build with optimizations |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint with auto-fix |
| `npm run format` | Format code with Prettier |
| `npm run type-check` | Validate JSDoc types |
| `npm run validate` | Run all quality checks + build |
| `npm run analyze` | Analyze bundle size |
| `npm run clean` | Clean build directory |

### Legacy Build System

The project maintains backward compatibility with the original build system:

```bash
# Legacy builds (still available)
npm run build:legacy    # Original Node.js build
npm run build:css       # CSS minification only
npm run build:tailwind  # Tailwind compilation
```

## 🏗️ Architecture

### Project Structure

```
demo/
├── css/                    # Stylesheets
│   ├── design-tokens.css   # CSS custom properties
│   ├── layers.css         # CSS cascade layers
│   └── styles.css         # Main styles
├── js/                    # JavaScript modules
│   ├── modules/           # Feature modules
│   │   ├── navigation.js  # Navigation management
│   │   ├── tabs.js       # Tab functionality
│   │   ├── loading.js    # Loading states
│   │   ├── error-handler.js # Error handling
│   │   └── utils.js      # Utility functions
│   ├── types.js          # JSDoc type definitions
│   └── main.js           # Application entry point
├── build/                # Legacy build scripts
├── dist/                 # Production build output
└── index.html           # Main HTML file
```

### Module System

- **ES6 Modules**: Modern import/export syntax
- **Event-Driven**: Modules communicate via EventEmitter pattern
- **Type-Safe**: JSDoc annotations for IDE support
- **Modular**: Each feature in separate, focused modules

### CSS Architecture

- **CSS Layers**: Organized cascade with `@layer` for maintainability
- **Design Tokens**: CSS custom properties for consistent theming
- **Component-Based**: Reusable component classes
- **Responsive**: Mobile-first breakpoint system

### Build Pipeline

- **Vite**: Lightning-fast development and optimized production builds
- **Code Splitting**: Automatic chunking for optimal loading
- **PostCSS**: Modern CSS processing with autoprefixer and optimization
- **ESLint + Prettier**: Code quality and consistent formatting

## 🎨 Styling System

### Design Tokens

The project uses CSS custom properties for consistent theming:

```css
/* Brand Colors */
--color-brand-primary: #8a2be2;
--color-brand-secondary: #d946a0;
--color-brand-accent: #e96b3a;

/* Spacing System */
--space-xs: 0.25rem;
--space-sm: 0.5rem;
--space-md: 0.75rem;
/* ... */
```

### CSS Layers

Organized cascade for predictable styling:

1. `tokens` - Design system variables
2. `reset` - CSS reset and normalization  
3. `base` - Base element styles
4. `components` - Reusable component styles
5. `utilities` - Utility classes
6. `overrides` - Important overrides

## 🔧 Configuration

### Vite Configuration

- **Development**: HMR, source maps, dev server
- **Production**: Minification, code splitting, asset optimization
- **Legacy Support**: Polyfills for older browsers

### Code Quality

- **ESLint**: JavaScript linting with modern rules
- **Prettier**: Consistent code formatting
- **JSDoc**: Type checking and documentation

## 📱 Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

### Production Build

```bash
npm run build
```

Generates optimized build in `dist/` directory:

- Minified HTML, CSS, JavaScript
- Code splitting for optimal loading
- Asset optimization and fingerprinting
- Source maps for debugging

### Performance Features

- **Lazy Loading**: Dynamic imports for non-critical code
- **Code Splitting**: Vendor and feature-based chunks
- **Asset Optimization**: Automatic image and font optimization
- **Caching**: Long-term caching with content hashing

## 🎯 Development Guidelines

### Code Style

- Use ES6+ features (const/let, arrow functions, destructuring)
- Prefer functional programming patterns
- Use JSDoc for type annotations
- Follow single responsibility principle

### Module Guidelines

- Each module should have a single, focused responsibility
- Use EventEmitter for inter-module communication
- Implement proper error handling and loading states
- Include comprehensive JSDoc documentation

### Performance Best Practices

- Use debouncing for expensive operations
- Implement loading states for async operations
- Use efficient DOM queries and caching
- Minimize layout thrashing and reflows

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Follow the existing code style and patterns
2. Add JSDoc documentation for new functions
3. Test in multiple browsers
4. Run `npm run validate` before committing
5. Use conventional commit messages

---

Built with ❤️ by vybecoding.ai