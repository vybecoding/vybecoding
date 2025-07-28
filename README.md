# vybecoding

AI-powered development platform built with Next.js, featuring automated workflows, security-first architecture, and intelligent code generation.

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
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui + Lucide Icons
- **Database**: Convex (real-time, serverless)
- **Authentication**: Clerk
- **Payments**: Stripe
- **Email**: Resend
- **Monitoring**: Sentry
- **Testing**: Playwright + TRAIL System

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

## 🏗️ Project Structure

```
vybecoding/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   ├── pricing/           # Pricing page
│   └── services/          # Services page
├── components/            # React components
│   ├── cal/              # Cal.com integration components
│   └── ui/               # Shadcn/ui components
├── convex/               # Convex backend
│   ├── _generated/       # Auto-generated types
│   └── users.ts          # User data model
├── lib/                  # Utility functions
│   ├── booking/          # Booking utilities
│   ├── cal/              # Cal.com service
│   ├── email/            # Email templates and service
│   ├── stripe.ts         # Stripe configuration
│   └── utils.ts          # Utility functions (cn())
├── docs/                 # Documentation
│   ├── audits/           # Security and setup audits
│   ├── bmad/             # BMAD method documentation
│   ├── hooks/            # Claude Code hooks docs
│   ├── mcp/              # Model Context Protocol docs
│   └── vybehacks/        # VybeHacks patterns
├── prototype/            # Demo prototype (Vite-based)
└── .claude/              # Claude Code configuration
    ├── config/           # Settings and MCP configuration
    ├── hooks/            # Hook scripts
    ├── commands/         # Slash commands
    ├── solutions/        # TRAIL system & scripts
    └── sub-agents/       # BMAD sub-agents
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

## 🤖 AI Development Features

### TRAIL System
Automatic testing, error resolution, and intelligent learning:
- Level 1: Local solutions database with continuous learning
- Level 2: Web search for similar errors
- Level 3: Playwright visual debugging with trace recording
- Pattern recognition and automatic optimization

### BMAD Agents
Structured development with specialized agents:
- `/dev` - Full stack development
- `/sm` - Story management
- `/qa` - Quality assurance
- `/po` - Product owner perspective
- `/pm` - Project management

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
- **Human Workflow**: [docs/human-workflow.md](docs/human-workflow.md)
- **Claude Instructions**: [CLAUDE.md](CLAUDE.md)
- **Security Audits**: [docs/audits/](docs/audits/)

## 🧪 Testing

```bash
# Run all tests
npm test

# Test with Playwright (visual)
npx playwright test

# Security scanning
snyk test
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