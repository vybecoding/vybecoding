# vybecoding.ai Technology Stack

## 🧠 VybeHacks - Ingenious Development Patterns 🧠

### CLAUDE.md Rules & Protocols
Strategic instructions that shape Claude's behavior without complex configuration.

#### Always-Latest Installation Rule
**Problem:** Outdated dependencies causing compatibility issues  
**Solution:** Simple CLAUDE.md rule to always use @latest or pull latest  
**Implementation:** One-line rule that Claude always follows

#### Test Hygiene Protocol
**Problem:** Test files littering the root directory  
**Solution:** Enforced `__tests__/` structure with temporary test auto-deletion  
**Implementation:** CLAUDE.md rules + `test:cleanup` script

### Automated Learning Systems
Self-improving systems that get smarter with use.

#### TRAIL System
**Problem:** Solving the same errors repeatedly wastes time  
**Solution:** Automatic test-and-learn system that captures every fix and applies it instantly next time  
**Implementation:** `.solutions/` directory with hooks that detect, log, and recall solutions

#### Three-Level Debugging Escalation
**Problem:** Wasting time on complex debugging when simple solutions exist  
**Solution:** Progressive escalation: local search → web search → visual debugging  
**Implementation:** `verify-and-learn.sh` with Playwright integration

### Hook-Based Automation
Intelligent hooks that work behind the scenes.

#### Smart Hook Architecture
**Problem:** Manual documentation of problems and solutions  
**Solution:** Post-tool hooks that automatically capture context  
**Implementation:** `.claude-code/settings.json` with intelligent detection

#### Zero-Config Test Detection
**Problem:** Different projects use different test commands  
**Solution:** Auto-detect test command from package.json, Makefile, or file extensions  
**Implementation:** Smart detection logic in TRAIL system

### Reality-Check Systems
Preventing hallucination and toxic positivity in AI interactions.

#### VERIFY-FIRST Protocol
**Problem:** AI hallucinating URLs, features, and capabilities  
**Solution:** Mandatory verification before any factual claims  
**Implementation:** VERIFY-FIRST.md rules that require tool-based verification

#### Honest Assessment Framework  
**Problem:** Toxic positivity hiding real issues and complexity  
**Solution:** Realistic timelines, acknowledged limitations, documented failures  
**Implementation:** Anti-toxic-positivity rules in CLAUDE.md and VERIFY-FIRST.md

### 🚨 Creating All VybeHacks From Scratch 🚨

**Complete recreation guide available:** See `docs/vybehacks/VYBEHACKS-FROM-SCRATCH.md` for step-by-step instructions to recreate every VybeHack if your project is deleted.

Quick setup:
```bash
# Create all VybeHacks with one command
./docs/vybehacks/setup-vybehacks.sh
```

Includes:
- CLAUDE.md rules (always-latest, test hygiene, verification)
- TRAIL system (all scripts and hooks)
- VERIFY-FIRST protocol
- Complete hook configuration
- Backup strategies

## 🤖 AI Agent Orchestration 🤖

### BMAD Method Integration
**Problem:** Unstructured AI interactions leading to inconsistent results  
**Solution:** Multi-agent orchestration with specialized roles (Analyst, PM, Architect, Dev, QA)  
**Implementation:** BMAD framework with cherry-picked enhancements from other systems

### Enhanced with PRPs Commands
**Problem:** Lack of structured planning and execution workflows  
**Solution:** Selected slash commands for systematic development  
**Implementation:** `/create-base-prp` for planning, `/execute-base-prp` for execution

### Semantic Code Understanding (Planned)
**Problem:** AI struggles with navigating large codebases  
**Solution:** Serena MCP for symbol-level code understanding  
**Implementation:** MCP server providing IDE-like code navigation

## 🛠️ Development Environment 🛠️

### IDE & AI Tools
- **VS Code** - Primary IDE with Claude Code integration
- **Claude Code** - AI pair programming assistant
- **BMAD Method** - AI agent orchestration framework with multi-agent collaboration
- **Claude Code Auto-Approval** - Intelligent auto-approval system (90% fewer manual confirmations)
- **Live Server Extension** - Instant HTML preview

### 🤖 MCP Intelligence Layer 🤖
- **REF MCP** - Lightning-fast docs search with 85% token reduction
- **GitHub MCP** - Repository integration, PR automation, security alerts
- **Playwright MCP** - Automated testing with console monitoring
- **Semgrep MCP** - Static analysis with 5000+ security rules
- **EXA Search MCP** - Technical web search API
- **Solutions Memory MCP** - TRAIL system integration for learned solutions

## 🎯 Development Workflow 🎯

### Phase 1: Prototyping
- **HTML Demo** - Vision validation before production build
- **Tailwind CDN** - Full styling without compilation
- **Inline JavaScript** - Interactive prototypes
- **Live Server Extension** - Instant feedback loop

### Phase 2: Frontend Development
- **Next.js** - React framework with Pages Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Shadcn/ui** - Component library
- **Lucide** - Icon library

### Phase 3: Backend Services
- **Convex** - Reactive backend database with real-time subscriptions, file storage, logging (✅ Installed)
- **Clerk** - Authentication & user management (✅ Installed)
- **Stripe** - Payment processing (✅ Installed)
- **Resend** - Email API service (✅ Installed - 100k emails/month free tier)
- **Sentry** - Error tracking and performance monitoring (✅ Installed - 5k events/month free tier)
- **Cal.com** - Booking infrastructure (⏳ Implement in Phase 5 - Week 6)
  - Option A: Cal.com Atoms (Free - Recommended for marketplaces)
  - Option B: Cal.com Teams ($12/user/month - Not suitable for marketplaces)
  - Option C: Self-hosted Cal.com (Free but complex)

### Phase 4: Testing & Quality
- **Playwright** - Modern E2E testing framework with TypeScript support (✅ Installed)
- **TRAIL System** - Automatic test-and-learn system with 3-level debugging escalation (✅ Configured)
- **Nuclei** - Comprehensive vulnerability scanning (✅ Installed at ~/.local/bin/nuclei)
- **Semgrep MCP** - Static analysis with 5000+ security rules (✅ Configured)

### Phase 5: Deployment & Infrastructure
- **Vercel** - Hosting, deployment, web analytics, performance monitoring (Post-MVP)
- **GitHub** - Version control (✅ Configured with GitHub MCP)
- **Umami** - Privacy-first analytics platform (Post-MVP)
- **Routing Architecture**:
  - **Native Apps**: Subdomain-based (`{app}.vybecoding.ai`)
    - Full isolation, professional URLs
    - Unlimited subdomains on Vercel Pro
    - Automatic SSL certificates
  - **Member Showcases**: Path-based (`vybecoding.ai/{member}/{site}`)
    - Clean URLs without subdomain complexity
    - Multiple sites per member
    - Easy preview page management
  - **Reserved Routes**: Protected platform routes
    - Prevents naming conflicts
    - Maintains platform functionality

## 📊 Operations & Monitoring 📊
- **Sentry** - Error tracking and monitoring (✅ Using free tier)
- **Resend** - Email infrastructure (✅ Using free tier - 100k emails/month)
- **Umami** - Privacy-first analytics platform (Post-MVP)
- **Postal** - Self-hosted email infrastructure (Use after outgrowing Resend)

## ⚡ Quick Start ⚡

### Complete Setup Script
```bash
#!/bin/bash
# vybecoding Complete Setup for VS Code + Claude Code

# Install global Node.js tools
npm install -g bmad-method
npm install -g @modelcontextprotocol/server-sequential-thinking
npm install -g @modelcontextprotocol/server-playwright
npm install -g @modelcontextprotocol/server-github

# Clone and setup repositories
mkdir -p ~/vybecoding-tools && cd ~/vybecoding-tools

# Claude Code Auto-Approval
[ -d "claude-code-boost" ] && (cd claude-code-boost && git pull) || git clone https://github.com/yifanzz/claude-code-boost.git
cd claude-code-boost && npm install && npm run build && npm link && cd ..

# REF MCP
[ -d "ref-tools-mcp" ] && (cd ref-tools-mcp && git pull) || git clone https://github.com/ref-tools/ref-tools-mcp.git

# Install security tools
go install -v github.com/projectdiscovery/nuclei/v3/cmd/nuclei@latest

# Install TRAIL System
# Option 1: Copy from existing project
cp -r /path/to/existing/project/.solutions ./
chmod +x .solutions/*.sh .solutions/*.js

# Option 2: Create from scratch (see detailed instructions below)

echo "✅ vybecoding tools installed for VS Code + Claude Code workflow!"
```

### Essential Services Setup
```bash
# Frontend project setup
npm install convex @clerk/nextjs stripe @stripe/stripe-js @sentry/nextjs resend
npm install -D playwright

# Initialize services
npx convex dev
npx playwright install chromium

# Configure environment variables in .env.local
# - Convex: CONVEX_DEPLOYMENT, NEXT_PUBLIC_CONVEX_URL
# - Clerk: NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, CLERK_SECRET_KEY
# - Stripe: STRIPE_SECRET_KEY, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
# - Sentry: NEXT_PUBLIC_SENTRY_DSN, SENTRY_AUTH_TOKEN
# - Resend: RESEND_API_KEY
```

## 📦 Installation Details 📦

### Core Tools & Repositories

| Tool | Repository/Package | Installation |
|------|-------------------|--------------|
| BMAD Method | https://github.com/bmadcode/BMAD-METHOD.git | `npm install -g bmad-method` |
| Claude Code Auto-Approval | https://github.com/yifanzz/claude-code-boost.git | See setup script |
| Nuclei | https://github.com/projectdiscovery/nuclei.git | `go install nuclei@latest` |
| TRAIL System | Local Hook System (not a repo) | Copy from existing project or create fresh |

### MCP Servers

| MCP Server | Package | Notes |
|------------|---------|--------|
| REF | https://github.com/ref-tools/ref-tools-mcp | 85% token reduction |
| GitHub | @modelcontextprotocol/server-github | Needs GITHUB_TOKEN |
| Playwright | @modelcontextprotocol/server-playwright | Browser testing |
| BrowserTools | Chrome Extension | Install from store |

### Service Registrations

| Service | URL | Status |
|---------|-----|---------|
| Convex | https://convex.dev | ✅ Installed - Backend database |
| Clerk | https://clerk.com | ✅ Installed - Authentication |
| Stripe | https://stripe.com | ✅ Installed - Payments |
| Sentry | https://sentry.io | ✅ Installed - Error tracking (5k events/month free) |
| Resend | https://resend.com | ✅ Installed - Email API (100k emails/month free) |
| Vercel | https://vercel.com | ⏳ Post-MVP - Hosting |
| Umami | https://umami.is | ⏳ Post-MVP - Analytics |
| Postal | https://postalserver.io | 🔄 Optional - Self-hosted email (after Resend) |
| Cal.com | https://cal.com | 📦 Components Installed - Implement Phase 5 |

## 🔧 Creating TRAIL from Scratch 🔧

For detailed instructions on creating the TRAIL system from scratch, see `docs/vybehacks/VYBEHACKS-FROM-SCRATCH.md`.

The guide includes:
- Complete script contents for all 5 TRAIL components
- Step-by-step installation instructions  
- Hook configuration for Claude Code
- Backup and restoration procedures

## 🎯 Current Status 🎯

### ✅ Installed & Configured
- **Core Infrastructure**: Convex, Clerk, Stripe, Sentry, Resend
- **Development Tools**: BMAD Method, TRAIL System, Nuclei
- **MCP Servers**: REF, GitHub, Playwright, Semgrep, EXA Search
- **Testing**: Playwright, TRAIL automatic learning system

### ⏳ Post-MVP (Not Yet Installed)
- **Deployment**: Vercel
- **Analytics**: Umami

### 🔄 Optional (Install When Needed)
- **Email Migration**: Postal (after outgrowing Resend's 100k/month)
- **Booking**: Cal.com implementation paths:
  - **For Marketplaces**: Use Cal.com Atoms (free, unlimited members)
  - **For Teams**: Cal.com SaaS ($12/user/month)
  - **For Scale**: Self-host Cal.com (free but requires maintenance)

## 🎯 Total Stack: 35+ Tools Organized by Workflow 🎯