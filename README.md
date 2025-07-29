# vybecoding

AI-powered development platform built with Next.js, featuring automated workflows, security-first architecture, and intelligent code generation with BMAD Method v4.33.0 integration.

## 🚀 Features

- **AI-Enhanced Development**: Integrated BMAD Method for structured story management
- **Security-First Architecture**: Multiple layers of security including input validation, XSS prevention, and timing attack mitigation
- **Automated Workflows**: TRAIL system for automatic error learning and resolution
- **Real-time Collaboration**: Powered by Convex for instant data synchronization
- **Complete Auth System**: Clerk integration with SSO and multi-factor authentication
- **Payment Processing**: Stripe integration for subscriptions and one-time payments
- **Calendar Scheduling**: Cal.com embedded for appointment booking
- **Error Monitoring**: Sentry integration for automatic error tracking
- **Email System**: Resend API for transactional emails

## 🛠️ Tech Stack

- **Framework**: Next.js 15.4 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Modules hybrid approach
- **UI Components**: Shadcn UI components with custom wrapper layers
- **Icons**: Lucide React (1000+ tree-shakeable icons)
- **Database**: Convex (real-time, serverless)
- **Authentication**: Clerk
- **Payments**: Stripe
- **Email**: Resend
- **Monitoring**: Sentry
- **Testing**: Playwright + TRAIL System
- **Theme**: Dark/Light mode with system preference support
- **Tables**: TanStack Table for advanced data management

## 🏃 Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Start development servers
npm run dev      # Next.js dev server
npm run convex   # Convex backend (in separate terminal)

# Open http://localhost:3000
```

## 📋 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Next.js development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run test` | Run test suite |
| `npm run convex` | Start Convex development backend |
| `npm run demo` | Serve demo prototype at :8080 |

## 🏗️ Project Structure

```
vybecoding/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   ├── pricing/           # Pricing page
│   ├── services/          # Services page
│   ├── theme-demo/        # Theme system demo
│   └── test-error/        # Error boundary testing
├── components/            # React components
│   ├── cal/              # Cal.com integration components
│   ├── ui/               # Shadcn UI + custom components
│   │   ├── button/       # Button wrapper system
│   │   │   ├── Button.tsx     # Shadcn wrapper
│   │   │   ├── ButtonGroup.tsx
│   │   │   └── IconButton.tsx
│   │   ├── card/         # Card wrapper system
│   │   │   ├── Card.tsx       # Shadcn wrapper
│   │   │   ├── AppCard.tsx
│   │   │   ├── GuideCard.tsx
│   │   │   └── MemberCard.tsx
│   │   ├── form/         # Form wrapper components
│   │   │   ├── Form.tsx       # Shadcn form wrapper
│   │   │   ├── FormField.tsx
│   │   │   └── validation.ts
│   │   ├── data-table/   # Advanced data tables
│   │   │   └── DataTable.tsx  # TanStack Table
│   │   ├── modal/        # Modal/Dialog wrappers
│   │   │   ├── Modal.tsx      # Shadcn dialog wrapper
│   │   │   └── Dialog.tsx
│   │   ├── toast/        # Toast notification wrapper
│   │   │   └── Toast.tsx      # Sonner wrapper
│   │   ├── badge/        # Badge component wrapper
│   │   │   ├── Badge.tsx      # Shadcn wrapper
│   │   │   └── Tag.tsx
│   │   ├── layout/       # Layout components
│   │   │   ├── Container.tsx
│   │   │   ├── Section.tsx
│   │   │   ├── Stack.tsx
│   │   │   └── Grid.tsx
│   │   ├── navigation/   # Navigation components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Logo.tsx
│   │   │   └── MobileMenu.tsx
│   │   ├── typography/   # Typography components
│   │   │   ├── Typography.tsx
│   │   │   └── Typography.module.css
│   │   └── [30+ Shadcn components].tsx
│   ├── ThemeToggle.tsx   # Theme switcher
│   └── test-libraries.tsx
├── convex/               # Convex backend
│   ├── _generated/       # Auto-generated types
│   └── users.ts          # User data model
├── contexts/             # React contexts
│   └── ThemeContext.tsx  # Theme management
├── lib/                  # Utility functions
│   ├── booking/          # Booking utilities
│   ├── cal/              # Cal.com service
│   ├── email/            # Email templates and service
│   ├── stripe.ts         # Stripe configuration
│   └── utils.ts          # Utility functions (cn())
├── demo/                 # Vite-based prototype
│   ├── pages/            # Demo HTML pages
│   ├── images/           # Demo assets
│   └── styles/           # Demo CSS
├── docs/                 # Documentation
│   ├── architecture/     # System architecture docs
│   ├── audits/           # Security and setup audits
│   ├── bmad/             # BMAD method documentation
│   ├── hooks/            # Claude Code hooks docs
│   ├── mcp/              # Model Context Protocol docs
│   ├── update/           # Documentation update logs
│   └── vybehacks/        # VybeHacks patterns
├── __tests__/            # Test files
│   └── unit/            # Unit tests
│       └── components/  # Component tests
├── .claude/              # Claude Code configuration
│   ├── settings.json     # Hook configurations
│   ├── config/          # MCP configuration
│   │   └── mcp-settings.json
│   ├── hooks/           # Hook scripts
│   ├── agents/          # BMAD sub-agents
│   ├── commands/        # Slash commands
│   └── solutions/       # TRAIL system & scripts
└── .bmad-core/          # BMAD Method v4.33.0
    ├── bmad-core/       # Core agents and tasks
    ├── expansion-packs/ # Infrastructure & DevOps
    └── tools/           # BMAD CLI and utilities
```

## 🔐 Security Features

- **Input Validation**: All user inputs validated with validator.js
- **XSS Prevention**: HTML sanitization with DOMPurify
- **Timing Attack Prevention**: Secure token comparison with safe-compare
- **Living off AI Defense**: Automated scanning of AI responses for malicious patterns
- **Secret Scanning**: GitGuardian integration for commit monitoring
- **Dependency Auditing**: Snyk continuous monitoring + MCP Security Audit
- **Vulnerability Scanning**: Nuclei template-based scanning
- **MCP Security**: MCP-Scan for MCP server security analysis
- **Secrets Management**: HashiCorp Vault for secure storage

## 🎨 UI Component System

### Shadcn UI Integration
The project uses Shadcn UI components with custom wrapper layers that maintain backward compatibility while providing enhanced functionality:

- **Wrapper Pattern**: Each Shadcn component has a wrapper that maintains our custom API
- **Zero Breaking Changes**: Existing code continues to work with the new components
- **Enhanced Features**: Additional props and functionality on top of Shadcn defaults
- **Theme Integration**: Seamless dark/light mode support with CSS variables
- **Type Safety**: Full TypeScript support with enhanced prop types

### Component Architecture
```typescript
// Example: Button wrapper maintains custom API while using Shadcn
import { Button as ShadcnButton } from "@/components/ui/button"

export function Button({ variant, gradientFrom, gradientTo, ...props }) {
  // Map custom variants to Shadcn variants
  // Add gradient support on top of Shadcn
}
```

### Data Table System
Advanced data tables powered by TanStack Table v8:
- Sorting, filtering, and pagination
- Row selection and actions
- Column visibility controls
- Responsive design
- Server-side data support

## 🤖 AI Development Features

### TRAIL System
Automatic testing, error resolution, and intelligent learning:
- Level 1: Local solutions database with continuous learning
- Level 2: Web search for similar errors
- Level 3: Playwright visual debugging with trace recording
- Pattern recognition and automatic optimization

### BMAD Method v4.33.0 Integration
Structured development with specialized agents available as both slash commands and Claude Code sub-agents:

**Core Agents** (slash commands and sub-agents):
- `/dev` or `bmad-dev` - Full stack development (James)
- `/sm` or `bmad-sm` - Story management (Stella)
- `/qa` or `bmad-qa` - Quality assurance (Quinn)
- `/po` or `bmad-po` - Product owner perspective (Olivia)
- `/pm` or `bmad-pm` - Project management (Parker)

**Additional Sub-agents**:
- `bmad-architect` - System architecture (Alex)
- `bmad-doc-writer` - Documentation specialist (Dana)
- `bmad-analyst` - Business analysis
- `bmad-ux` - User experience design
- `bmad-devops` - Infrastructure and deployment

### Slash Commands
- `/update-docs` - Automatically update documentation

## 🚀 Deployment

The application is designed for deployment on Vercel:

```bash
npm run build
# Deploy to Vercel (post-MVP)
```

## 📚 Documentation

- **Setup Guide**: [docs/setup.md](docs/setup.md)
- **Tech Stack Details**: [docs/tech-stack.md](docs/tech-stack.md)
- **Prototype Migration Plan**: [docs/prototype-migration-plan.md](docs/prototype-migration-plan.md)
- **Claude Instructions**: [CLAUDE.md](CLAUDE.md)
- **Security Audits**: [docs/audits/](docs/audits/)
- **Hook System**: [docs/hooks/overview.md](docs/hooks/overview.md)
- **MCP Servers**: [docs/mcp/overview.md](docs/mcp/overview.md)
- **BMAD Integration**: [docs/bmad/sub-agents-integration.md](docs/bmad/sub-agents-integration.md)

## 🧪 Testing

```bash
# Run all tests
npm test

# Test with Playwright (visual)
npx playwright test

# Quick security check
.claude/scripts/security-check.sh

# Full security audit (all tools)
.claude/scripts/full-security-audit.sh

# Manual security scanning
snyk test                    # Dependency vulnerabilities
ggshield secret scan path .  # Secret detection
nuclei -u $DEPLOY_URL        # Web vulnerability scan
```

## 🤝 Contributing

1. Follow the coding standards in CLAUDE.md
2. Use the TRAIL system for debugging
3. Run tests before committing
4. Document changes with `/update-docs`

## 📄 License

MIT License - see LICENSE file for details

---

Built with ❤️ by vybecoding.ai • Powered by Claude Code