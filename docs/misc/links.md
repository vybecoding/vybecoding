# vybecoding Tools & Resources

## 🤖 AI & Workflow Automation

| Tool | Type | Status | Usage | Link |
|------|------|--------|--------|------|
| **BMAD Method** | 🤖 Built-in | ✅ | `npm install -g bmad-method`, slash commands | [repo](https://github.com/bmadcode/BMAD-METHOD.git) |
| **PRPs Engineering** | 🤖 CLAUDE.md | ✅ | `/create-base-prp`, `/execute-base-prp` | [repo](https://github.com/Wirasm/PRPs-agentic-eng.git) |
| **SuperClaude Framework** | 🤖 CLAUDE.md | ✅ | Personas auto-activate by context | [repo](https://github.com/SuperClaude-Org/SuperClaude_Framework.git) |
| **Ultra Wide Turbo** | 👤 Manual | ✅ | Manually select workflow patterns | [repo](https://github.com/its-brianwithai/ultra-wide-turbo-workspace.git) |

## 🔌 Model Context Protocols (MCPs)

| Tool | Type | Status | Usage | Link |
|------|------|--------|--------|------|
| **Claude Auto-Approval** | 🤖 Auto | ✅ | 90% fewer confirmations | [repo](https://github.com/yifanzz/claude-code-boost.git) |
| **REF MCP** | 🤖 Auto | ✅ | 85% token reduction docs search | [repo](https://github.com/ref-tools/ref-tools-mcp) |
| **Semgrep MCP** | 🤖 Auto | ✅ | 5000+ security rules | [repo](https://github.com/semgrep/mcp) |
| **GitHub MCP** | 🤖 Auto | ✅ | Git operations & PR automation | @modelcontextprotocol/server-github |
| **MCP Security Audit** | 🤖 Auto | ✅ | npm dependency auditing | [repo](https://github.com/qianniuspace/mcp-security-audit) |
| **Serena** | 🤖 Auto | ✅ | Symbol navigation • [dashboard](http://localhost:24282/dashboard/) | [repo](https://github.com/oraios/serena) |
| **EXA Search** | 👤 Request | ✅ | Ask Claude to "search the web" | [repo](https://github.com/exa-labs/exa-mcp-server) |
| **Playwright MCP** | 👤 Request | ✅ | Ask Claude to "test with Playwright" | @modelcontextprotocol/server-playwright |
| **MCP-Scan** | 👤 Manual | ✅ | `uvx mcp-scan@latest` | [repo](https://github.com/invariantlabs-ai/mcp-scan) |

## 🏗️ Core Infrastructure

| Service | Type | Status | Usage | Link |
|---------|------|--------|--------|------|
| **Convex** | 🤖 Auto | ✅ | Real-time data sync, subscriptions | [convex.dev](https://www.convex.dev/) |
| **Clerk** | 🤖 Auto | ✅ | Auth middleware runs automatically | [clerk.com](https://clerk.com/) |
| **Sentry** | 🤖 Auto | ✅ | Auto-captures all errors | [sentry.io](https://sentry.io/) |
| **Resend** | 🤖 Auto | ✅ | Emails send automatically via API | [resend.com](https://resend.com/) |
| **Stripe** | 👤 Manual | ✅ | Product creation, webhook testing | [stripe.com](https://stripe.com/) |
| **Nuclei** | 👤 Manual | ✅ | `nuclei -u https://target.com` | [repo](https://github.com/projectdiscovery/nuclei.git) |
| **Cal.com** | 👤 Manual | ✅ | Calendar setup, availability config | [cal.com](https://cal.com/) |

## 🔐 Security Stack

| Tool | Type | Status | Tier | Usage | Link |
|------|------|--------|------|--------|------|
| **validator.js** | 🤖 CLAUDE.md | ✅ | ⭐⭐⭐⭐⭐ | Auto-validates inputs via rules | [npm](https://www.npmjs.com/package/validator) |
| **DOMPurify** | 🤖 Hooks | ✅ | ⭐⭐⭐⭐ | Hook auto-checks HTML edits | [repo](https://github.com/cure53/DOMPurify) |
| **safe-compare** | 🤖 CLAUDE.md | ✅ | ⭐⭐⭐ | Auto-applied timing attack prevention | [npm](https://www.npmjs.com/package/safe-compare) |
| **Living off AI Monitor** | 🤖 Hooks | ✅ | ⭐⭐⭐⭐ | Auto-scans AI responses • logs to `.solutions/security/` | [CUSTOM] |
| **HashiCorp Vault** | 👤 Manual | ✅ | ⭐⭐⭐⭐⭐ | `.solutions/start-vault.sh` • [UI](http://127.0.0.1:8200) | [repo](https://github.com/hashicorp/vault) |
| **GitGuardian** | 🤖 Auto | ✅ | ⭐⭐⭐⭐⭐ | GitHub app auto-scans commits • FREE unlimited | [gitguardian.com](https://www.gitguardian.com/) |
| **Snyk** | 👤 Manual | ✅ | ⭐⭐⭐⭐ | `snyk test`, `snyk monitor` • FREE 200/month | [snyk.io](https://snyk.io/) |
| **Cross-tenant Tester** | 👤 Future | ⏳ | ⭐⭐⭐ | `npm run test:isolation` • when multi-tenant | [CUSTOM] |

## 🚀 Deployment & Post-MVP

| Service | Type | Status | Usage | Link |
|---------|------|--------|--------|------|
| **Vercel** | 👤 Manual | ⏳ | Wait for MVP completion | [vercel.com](https://vercel.com/) |
| **Umami** | 👤 Manual | ⏳ | Needs deployed site with traffic | [umami.is](https://umami.is/) |
| **Postal** | 👤 Manual | ⏳ | Server setup, DNS config • after Resend | [postalserver.io](https://postalserver.io/) |

## 📚 Security Resources & Documentation

| Resource | Type | Usage | Link |
|----------|------|--------|------|
| **MCP Security Checklist** | 📝 Reference | Security guidelines | [repo](https://github.com/slowmist/MCP-Security-Checklist) |
| **Awesome Prompt Injection** | 📝 Reference | Attack/defense resources | [repo](https://github.com/FonduAI/awesome-prompt-injection) |
| **Prompt Injection Defenses** | 📝 Reference | Defense strategies | [repo](https://github.com/tldrsec/prompt-injection-defenses) |
| **PIPE** | 📝 Reference | Prompt Injection Primer | [repo](https://github.com/jthack/PIPE) |
| **Cyber Security Prompts** | 📝 Reference | Security prompts collection | [repo](https://github.com/DummyKitty/Cyber-Security-chatGPT-prompt) |
| **MCP Vulnerabilities** | 📝 Reference | Top 10 MCP vulnerabilities | [cso](https://www.csoonline.com/article/4023795/top-10-mcp-vulnerabilities.html) |

## 📖 Documentation

| Doc | Type | Usage | Link |
|-----|------|--------|------|
| **vybecoding Docs** | 📖 Local | Reference anytime via filesystem | `/home/happy/Projects/vybecoding/docs` |
| **VybeHacks** | 📖 Local | TRAIL, VERIFY-FIRST patterns | `/home/happy/Projects/vybecoding/docs/vybehacks` |
| **BMAD Guide** | 🌐 Online | Multi-agent workflows | [wiki](https://github.com/bmadcode/BMAD-METHOD/wiki) |
| **Convex Docs** | 🌐 Online | Database patterns | [docs.convex.dev](https://docs.convex.dev/) |
| **Clerk Docs** | 🌐 Online | Auth implementation | [clerk.com/docs](https://clerk.com/docs) |

---

**Legend:**
- 🤖 = Fully automated • 👤 = Human required • ✅ = Installed • ⏳ = Post-MVP
- ⭐ = Priority rating • 📝 = Reference only • 📖 = Documentation