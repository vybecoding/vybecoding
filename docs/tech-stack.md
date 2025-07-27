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

### Semantic Code Understanding ✅
**Problem:** AI struggles with navigating large codebases  
**Solution:** Serena MCP for symbol-level code understanding  
**Implementation:** MCP server providing IDE-like code navigation (Installed and configured)

## 🛠️ Development Environment 🛠️

### IDE & AI Tools

#### 🤖 100% Automated
- **Claude Code Auto-Approval** - Auto-approves safe commands without prompting
- **BMAD Method** - Multi-agent orchestration works automatically via slash commands
- **Live Server Extension** - Auto-refreshes on file save

#### 👤 Human Required
- **VS Code** - Requires manual file navigation and editing
- **Claude Code** - Needs human to initiate conversations and approve actions

### 🤖 MCP Intelligence Layer 🤖

#### 🤖 100% Automated (Claude uses without prompting)
- **REF MCP** - Auto-searches docs when Claude needs info
- **GitHub MCP** - Auto-handles git operations 
- **Semgrep MCP** - Auto-scans code for security issues
- **Solutions Memory MCP** - Auto-recalls previous fixes from TRAIL
- **MCP Security Audit** - Auto-audits dependencies when asked
- **Serena** - Symbol-level code navigation and editing

#### 👤 Human Required (Need explicit request)
- **Playwright MCP** - Ask Claude to "test with Playwright"
- **EXA Search MCP** - Ask Claude to "search the web"
- **MCP-Scan** - Run manually: `uvx mcp-scan@latest`

#### 🔒 MCP Security Measures
**Addressing Top MCP Vulnerabilities:**
1. **Tool Poisoning Prevention**: All MCP servers from verified sources only
2. **Token Protection**: OAuth tokens stored securely, never in plaintext
3. **Command Injection Defense**: Input validation on all MCP server interactions
4. **Admin Bypass Protection**: Strict identity verification for all MCP operations
5. **Audit Logging**: Comprehensive logs of all MCP server actions
6. **Least Privilege**: MCP servers limited to minimum required permissions
7. **Tool Shadowing Defense**: Whitelist of approved MCP servers only

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

#### 🤖 100% Automated
- **Convex** - Real-time data sync, automatic subscriptions (✅ Installed)
- **Clerk** - Auto-handles auth on protected routes (✅ Installed)
- **Sentry** - Auto-captures all errors and performance issues (✅ Installed)
- **Resend** - Emails send automatically via API (✅ Installed)

#### 👤 Human Required
- **Stripe** - Manual product creation, webhook testing (✅ Installed)
- **Cal.com** - Manual calendar and availability setup (⏳ Phase 5)

### Phase 4: Testing & Quality

#### 🤖 100% Automated
- **TRAIL System** - Auto-tests, learns, and applies fixes (✅ Configured)
- **Semgrep MCP** - Auto-scans code for vulnerabilities (✅ Configured)

#### 👤 Human Required
- **Playwright** - Write test scripts, run manually (✅ Installed)
- **Nuclei** - Run security scans: `nuclei -u target.com` (✅ Installed)

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
| MCP-Scan | https://github.com/invariantlabs-ai/mcp-scan | Run with: uvx mcp-scan@latest |
| MCP Security Audit | https://github.com/qianniuspace/mcp-security-audit | npm dependency auditing |
| Serena | https://github.com/oraios/serena | Symbol-level code navigation |

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

## 🔐 Security Considerations 🔐

### MCP Security Hardening
- **Composability Chaining Risk**: Monitor MCP servers for unexpected remote calls
- **Cross-tenant Isolation**: Ensure Convex/Clerk properly isolate user data
- **Living off AI Defense**: Validate all AI-generated commands before execution
- **Consent Fatigue Mitigation**: Batch MCP permissions requests appropriately
- **Toxic Agent Flow Prevention**: Sanitize all external inputs (GitHub issues, etc.)

### Recommended Security Tools

#### 🤖 100% Automated Tools
- **validator.js**: Input validation via CLAUDE.md rules (✅ Installed)
- **DOMPurify**: XSS sanitization via post-edit hooks (✅ Installed)  
- **safe-compare**: Timing attack prevention via CLAUDE.md rules (✅ Installed)
- **Living off AI Monitor**: Detects malicious AI instructions via post-response hooks (✅ Installed)
- **GitGuardian**: Automatic secret scanning on all commits (✅ Installed)
- **Snyk**: Vulnerability scanning with monitoring alerts (✅ Installed) 
- **MCP-Scan**: Continuous MCP security monitoring

#### 👤 Human-Required Tools  
- **HashiCorp Vault**: Enterprise secrets management (✅ Installed - Web UI at http://127.0.0.1:8200)
- **Cross-tenant Isolation Tester**: Manual testing before releases

### Secure Vibe Coding Practices
- **Security-First Prompting**: Always include security constraints in AI prompts
- **Multi-Step Review**: Generate code → AI security review → human review
- **Automated Scanning**: GitGuardian (installed), Snyk (installed), MCP-Scan
- **Secure Defaults**: Input validation, constant-time comparisons, no hardcoded secrets
- **Human-in-the-Loop**: AI augments but doesn't replace security review

## 🎯 Current Status 🎯

### ✅ Installed & Configured
- **Core Infrastructure**: Convex, Clerk, Stripe, Sentry, Resend
- **Development Tools**: BMAD Method, TRAIL System, Nuclei
- **MCP Servers**: REF, GitHub, Playwright, Semgrep, EXA Search, MCP-Scan, MCP Security Audit, Serena
- **Security Libraries**: validator.js, DOMPurify, safe-compare (auto-applied via CLAUDE.md + hooks)
- **Security Tools**: GitGuardian (unlimited), Snyk (200/month), HashiCorp Vault, Living off AI Monitor
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