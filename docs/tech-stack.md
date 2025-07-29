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

#### TRAIL System with Continuous Learning ✅
**Problem:** Solving the same errors repeatedly wastes time  
**Solution:** Automatic test-and-learn system with pattern recognition and continuous improvement  
**Implementation:** 
- **Core TRAIL:** `.claude/solutions/` directory with hooks that detect, log, and recall solutions
- **Continuous Learning:** Pattern recognition across errors, performance, and task distribution
- **Auto-Application:** Learned patterns automatically applied to new tasks
- **Cross-Agent Sharing:** Solutions shared across all BMAD agents

#### Three-Level Debugging Escalation
**Problem:** Wasting time on complex debugging when simple solutions exist  
**Solution:** Progressive escalation: local search → web search → visual debugging  
**Implementation:** `verify-and-learn.sh` with Playwright integration

### Hook-Based Automation
Intelligent hooks that work behind the scenes.

#### Smart Hook Architecture
**Problem:** Manual documentation of problems and solutions  
**Solution:** Post-tool hooks that automatically capture context  
**Implementation:** `.claude/settings.json` with intelligent detection

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

### 5. Additional Custom VybeHacks

#### Task Complete Audio Notification
**Problem:** No feedback when long-running tasks complete in background  
**Solution:** Plays guitar sound notification when tasks finish  
**Implementation:** `.claude/hooks/task-complete.sh` triggered on Stop event

#### Documentation Update Reminder
**Problem:** Code changes accumulate without documentation updates  
**Solution:** Tracks edits and reminds after 5 non-doc file changes  
**Implementation:** `.claude/hooks/doc-update-reminder.sh` monitors file modifications

#### Story Orchestration Trigger
**Problem:** Missing parallelization opportunities in BMAD stories  
**Solution:** Analyzes stories for parallel execution potential when edited  
**Implementation:** `.claude/hooks/story-orchestration-trigger.sh` with BMAD integration

### 🚨 Creating All VybeHacks From Scratch 🚨

**Complete recreation guide available:** See `docs/vybehacks/vybehacks-creation.md` for step-by-step instructions to recreate every VybeHack if your project is deleted.

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

## 🤖 AI Agent Integration 🤖

### BMAD Method Integration ✅
**Problem:** Unstructured development workflows and story management  
**Solution:** Specialized agents available as both slash commands and Claude Code sub-agents  
**Implementation:** 
- **Slash Commands:** `/dev`, `/sm`, `/qa`, `/po`, `/pm` for direct agent access
- **Sub-Agents:** `bmad-dev`, `bmad-sm`, `bmad-qa`, etc. in `.claude/agents/`
- **Auto-Delegation:** Claude Code automatically selects appropriate agent based on task
- **Context Isolation:** Each sub-agent has its own clean context window
- **Integration:** Works with TRAIL system for error learning and solution sharing

#### BMAD Setup (One-Time)
```bash
# Install BMAD Method globally
npm install -g bmad-method@latest

# Initialize in your project
cd /path/to/project
bmad install --ide claude-code

# Agents are configured in:
# .bmad-core/agents/
```

### Autonomous Operation Setup ✅
**Problem:** Too many human prompts needed for routine decisions  
**Solution:** Intelligent automation with confidence-based auto-approvals  
**Implementation:**
- **Pre-session Hook:** Shows ready stories and opportunities at startup
- **Story Auto-Selection:** Picks best story based on priority, dependencies, patterns
- **Auto-Approval Engine:** Makes decisions when confidence >90%
- **Session Tracking:** Auto-generates reviews every 4 hours

#### Automation Files Created
```bash
# Pre-session analysis (shows ready stories)
.claude/hooks/pre-session-hook.sh

# Story selection intelligence
.claude/solutions/story-auto-select.sh

# Auto-approval decision engine
.claude/hooks/auto-approval-engine.js

# Session tracking for reviews
.claude/solutions/session-tracker.sh
```

### PRPs Commands
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
- **BMAD Method** - Structured story management via `/dev`, `/sm`, `/qa`, `/po`, `/pm`
- **Continuous Learning** - Pattern recognition and automatic optimization
- **Live Server Extension** - Auto-refreshes on file save

#### 👤 Human Required
- **VS Code** - Requires manual file navigation and editing
- **Claude Code** - Needs human to initiate conversations and approve actions

### 🤖 MCP Intelligence Layer 🤖

Model Context Protocol (MCP) servers extend Claude's capabilities with specialized tools for code analysis, security scanning, and external integrations.

### 📚 MCP Documentation

- **[MCP Overview](./mcp/overview.md)** - Introduction to the MCP intelligence layer
- **[Automated Servers](./mcp/automated-servers.md)** - Servers that work without prompting
- **[Manual Servers](./mcp/manual-servers.md)** - Servers requiring explicit activation
- **[Setup Guide](./mcp/setup-guide.md)** - Complete installation instructions
- **[Security Hardening](./mcp/security.md)** - Security measures and best practices

### Quick Overview

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

### Current Configuration

MCP servers are configured in `.claude/config/mcp-settings.json`. Check status:
```bash
# View configuration
cat .claude/config/mcp-settings.json | jq .

# Check running servers
ps aux | grep mcp
```

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
- **TRAIL System** - Auto-tests, learns, and applies fixes with continuous learning (✅)
- **Semgrep MCP** - Auto-scans code for vulnerabilities (✅ Configured)
- **Continuous Learning** - Pattern-based optimization of test strategies (✅ Configured)

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
chmod +x .claude/solutions/*.sh .claude/solutions/*.js

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
| BMAD Method | https://github.com/bmadcode/BMAD-METHOD.git | `npm install -g bmad-method@latest` |
| Claude Code Auto-Approval | https://github.com/yifanzz/claude-code-boost.git | See setup script |
| Nuclei | https://github.com/projectdiscovery/nuclei.git | `go install nuclei@latest` |
| TRAIL System | Local Hook System (not a repo) | Copy from existing project or create fresh |

### MCP Servers

See the comprehensive MCP documentation:
- **[MCP Setup Guide](./mcp/setup-guide.md)** - Complete installation instructions for all servers
- **[Automated Servers](./mcp/automated-servers.md)** - REF, GitHub, Semgrep, Serena, etc.
- **[Manual Servers](./mcp/manual-servers.md)** - Playwright, EXA Search, MCP-Scan, etc.

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

## 🪝 Claude Code Hooks System 🪝

Claude Code hooks enable automated workflows that trigger on specific events. Our comprehensive hook system provides security, automation, and development efficiency.

### 📚 Hook Documentation

- **[Hook System Overview](./hooks/overview.md)** - Introduction to Claude Code hooks
- **[TRAIL System Hook](./hooks/trail-system.md)** - Automatic testing and learning system
- **[Auto-Commit Hook](./hooks/auto-commit.md)** - Git automation for Claude changes
- **[Continuous Learning](./hooks/continuous-learning.md)** - Pattern recognition and optimization
- **[Security Hooks](./hooks/security-hooks.md)** - Automated security measures
- **[Complete Setup Guide](./hooks/setup-all-hooks.md)** - Step-by-step installation instructions

### Quick Overview

Our hook system includes:
- **TRAIL System**: Automatically tests code, captures errors, and learns solutions
- **Auto-Commit**: Commits all Claude changes to a separate branch
- **Security**: Environment sanitization, XSS prevention, and threat detection
- **Learning**: Continuous improvement through pattern recognition

### Current Configuration

Hooks are configured in `.claude/settings.json`. View current hooks:
```bash
cat .claude/settings.json | jq .
```

### Quick Commands

```bash
# View auto-commits
.claude/hooks/view-claude-commits.sh

# Search TRAIL solutions
.claude/solutions/search.sh "error message"

# Check security alerts
tail -f .claude/solutions/security/living-off-ai-alerts.log

# Generate learning report
node .claude/solutions/continuous-learning.js report
```

## 🎯 Current Status 🎯

### ✅ Installed & Configured
- **Core Infrastructure**: Convex, Clerk, Stripe, Sentry, Resend
- **Development Tools**: BMAD Method v4.33.0, TRAIL System + Continuous Learning, Nuclei
- **BMAD Agents**: 10+ specialized agents (Dev, SM, QA, PO, PM, Architect, Analyst, UX, DevOps, Doc Writer)
- **Claude Code Integration**: 6 BMAD sub-agents in `.claude/agents/`, 20+ slash commands in `.claude/commands/`
- **MCP Servers**: REF, GitHub, Playwright, Semgrep, EXA Search, MCP-Scan, MCP Security Audit, Serena
- **Security Libraries**: validator.js, DOMPurify, safe-compare (auto-applied via CLAUDE.md + hooks)
- **Security Tools**: GitGuardian (unlimited), Snyk (200/month), HashiCorp Vault, Living off AI Monitor
- **Testing**: Playwright, TRAIL with continuous learning, Parallel test execution
- **Prototype**: Structured HTML pages with new app showcase, dashboard, and guides sections

### ⏳ Post-MVP (Not Yet Installed)
- **Deployment**: Vercel
- **Analytics**: Umami

### 🔄 Optional (Install When Needed)
- **Email Migration**: Postal (after outgrowing Resend's 100k/month)
- **Booking**: Cal.com implementation paths:
  - **For Marketplaces**: Use Cal.com Atoms (free, unlimited members)
  - **For Teams**: Cal.com SaaS ($12/user/month)
  - **For Scale**: Self-host Cal.com (free but requires maintenance)

## 🎯 Total Stack: 40+ Tools Organized by Workflow 🎯

### 🚀 Learning Capabilities
- **Continuous Learning**: Self-improving system that gets smarter over time
- **Pattern Recognition**: Automatic optimization based on historical data
- **Knowledge Sharing**: Solution propagation across agents