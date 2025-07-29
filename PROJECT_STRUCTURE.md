# vybecoding Project Structure

## Directory Overview

```
vybecoding/
├── .claude/                    # Claude Code configuration and automation
│   ├── settings.json          # Hooks configuration
│   ├── config/                # MCP configurations
│   │   └── mcp-settings.json  # MCP server settings
│   ├── hooks/                 # Hook scripts for automation
│   │   ├── auto-commit.sh     # Git auto-commit functionality
│   │   ├── post-edit-sanitize.js  # XSS prevention
│   │   ├── post-response-scan.js  # AI security scanning
│   │   └── ...                # Other hook scripts
│   ├── agents/                # Claude Code sub-agents
│   │   ├── bmad-dev.md       # Development agent (James)
│   │   ├── bmad-sm.md        # Story management (Stella)
│   │   ├── bmad-qa.md        # Quality assurance (Quinn)
│   │   ├── bmad-po.md        # Product owner (Olivia)
│   │   ├── bmad-architect.md # Architecture (Alex)
│   │   └── bmad-doc-writer.md # Documentation (Dana)
│   ├── commands/              # Slash commands
│   │   ├── BMad/             # BMAD method commands
│   │   └── update-docs.md    # Documentation updater
│   └── solutions/            # TRAIL system
│       ├── continuous-learning.js  # Pattern recognition
│       ├── memory-server.js   # MCP memory server
│       ├── playwright-debug.js # Visual debugging
│       └── ...               # Other TRAIL components
│
├── app/                      # Next.js App Router
│   ├── api/                 # API routes
│   │   ├── cal/            # Cal.com webhooks
│   │   ├── email/          # Email endpoints
│   │   ├── sentry/         # Error tracking
│   │   └── stripe/         # Payment processing
│   ├── dashboard/          # Dashboard page
│   ├── pricing/            # Pricing page
│   ├── services/           # Services page
│   ├── book/              # Booking page
│   ├── sign-in/           # Auth pages
│   ├── sign-up/
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── ConvexClientProvider.tsx
│
├── components/              # React components
│   ├── cal/               # Cal.com components
│   │   ├── CalButton.tsx
│   │   ├── CalEmbed.tsx
│   │   └── CalFloatingButton.tsx
│   ├── ui/                # Shadcn/ui components
│   │   └── button.tsx     # Button component
│   └── test-libraries.tsx # Library test component
│
├── convex/                 # Convex backend
│   ├── _generated/        # Auto-generated types
│   ├── schema.ts          # Database schema
│   ├── users.ts           # User functions
│   └── hello.ts           # Example function
│
├── lib/                    # Utility functions
│   ├── booking/           # Booking utilities
│   ├── cal/              # Cal.com service
│   ├── email/            # Email templates
│   ├── stripe.ts         # Stripe config
│   └── utils.ts          # Utility helpers
│
├── docs/                   # Documentation
│   ├── audits/           # Security and setup audits
│   │   ├── checklist-07-28-25.md
│   │   ├── security-07-27-25.md
│   │   └── setup-07-28-25.md
│   ├── bmad/             # BMAD documentation
│   ├── hooks/            # Hook documentation
│   ├── mcp/              # MCP documentation
│   ├── vybehacks/        # VybeHacks patterns
│   ├── commands.md       # Slash commands
│   ├── human-workflow.md # Developer guide
│   ├── libraries.md      # UI libraries
│   ├── security.md       # Security tools
│   ├── setup.md          # Setup guide
│   └── tech-stack.md     # Technology overview
│
├── prototype/             # Vite-based demo prototype
│   ├── dist/             # Build output
│   ├── images/           # Demo images
│   ├── pages/            # Structured HTML pages
│   │   ├── apps/         # Apps showcase
│   │   │   ├── browse.html
│   │   │   └── submit.html
│   │   ├── dashboard/    # Dashboard sections
│   │   │   ├── overview.html
│   │   │   ├── profile.html
│   │   │   ├── mentorship.html
│   │   │   └── settings/
│   │   ├── guides/       # Guides showcase
│   │   │   ├── browse.html
│   │   │   └── submit.html
│   │   └── profile/      # Public profiles
│   │       ├── info.html
│   │       └── booking.html
│   ├── js/              # JavaScript modules
│   └── css/             # Stylesheets
│
├── styles/               # Global styles
│   └── globals.css       # Tailwind imports
│
├── __tests__/            # Test files
│   ├── unit/            # Unit tests
│   ├── integration/     # Integration tests
│   └── temp/            # Temporary tests
│
├── public/              # Static assets
│   └── (favicon, images, etc.)
│
├── BMAD Method Directories
│   ├── .bmad-core/         # BMAD Method v4.33.0 core
│   │   ├── bmad-core/     # Core implementation
│   │   │   ├── agents/    # Agent definitions
│   │   │   ├── tasks/     # Task templates
│   │   │   ├── checklists/ # Quality checklists
│   │   │   ├── templates/ # Story/PRD templates
│   │   │   └── workflows/ # Development workflows
│   │   ├── expansion-packs/ # Additional capabilities
│   │   │   └── bmad-infrastructure-devops/
│   │   └── tools/         # CLI and utilities
│   └── .bmad-infrastructure-devops/  # DevOps expansion (installed)
│
├── Configuration Files
│   ├── next.config.js      # Next.js config
│   ├── tailwind.config.js  # Tailwind config
│   ├── components.json     # Shadcn/ui config
│   ├── tsconfig.json       # TypeScript config
│   ├── package.json        # Dependencies
│   ├── middleware.ts       # Next.js middleware
│   ├── CLAUDE.md          # Claude instructions
│   ├── README.md          # Project overview
│   └── .env.local         # Environment variables
│
└── Generated/Hidden
    ├── .next/            # Next.js build
    ├── node_modules/     # Dependencies
    ├── .convex/          # Convex generated
    └── .claude-commit-count # Auto-commit counter
```

## Key File Purposes

### Configuration
- **CLAUDE.md**: Instructions and rules for Claude Code
- **components.json**: Shadcn/ui component configuration
- **.claude/settings.json**: Hook configurations
- **.claude/config/mcp-settings.json**: MCP server settings

### Core Application
- **app/**: Next.js 15.4 App Router pages and API routes
- **components/**: Reusable React components
- **convex/**: Real-time backend functions
- **lib/**: Shared utilities and services

### Automation & AI
- **.claude/solutions/**: TRAIL system for error learning
- **.claude/hooks/**: Automated workflows
- **.claude/**: Claude Code configuration and tools
- **.claude/commands/**: Slash commands for Claude

### Documentation
- **docs/audits/**: Security and setup checklists
- **docs/hooks/**: Hook system documentation
- **docs/mcp/**: MCP server documentation
- **docs/vybehacks/**: Development patterns

### Testing
- **__tests__/**: Test organization structure
- **test-runner.js**: Custom test runner
- **test-security.js**: Security package tests

## Environment Variables

Required in `.env.local`:
```
# Convex
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=

# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Stripe Payments
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Sentry Monitoring
NEXT_PUBLIC_SENTRY_DSN=
SENTRY_AUTH_TOKEN=

# Resend Email
RESEND_API_KEY=

# MCP Servers
GITHUB_TOKEN=
EXA_API_KEY=
SEMGREP_APP_TOKEN=
```

## Active Integrations

### Hooks (All Active)
- Pre-Session: Setup analysis
- Pre-Tool: Claude Code Boost
- Post-Tool: Auto-commit, sanitization, learning
- Post-Response: Security scanning
- Stop: Session cleanup

### MCP Servers (11 Configured)
- Automated: REF, GitHub, Semgrep, Serena, Memory
- Manual: Playwright, EXA Search, MCP-Scan
- All configured in `.claude/config/mcp-settings.json`

### Security Tools (8 Installed)
- NPM: validator.js, DOMPurify, safe-compare
- CLI: GitGuardian, Snyk, Nuclei, MCP-Scan
- Infrastructure: HashiCorp Vault

### UI Libraries
- Tailwind CSS v3.4.0
- Shadcn/ui (configured)
- Lucide Icons v0.532.0

## Development Workflow

1. **Start Services**:
   ```bash
   npm run dev      # Next.js
   npm run convex   # Backend (separate terminal)
   ```

2. **Test Changes**:
   - TRAIL automatically tests on file edits
   - Learns from errors and applies fixes

3. **View Changes**:
   ```bash
   git log --oneline | grep "claude-"
   ```

4. **Update Docs**:
   ```
   /update-docs
   ```