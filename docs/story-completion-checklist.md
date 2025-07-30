# Story & Epic Completion Checklists

## Overview

This document provides detailed checklists for completing stories and epics in the vybecoding project. Following these workflows ensures quality, security, and documentation remain consistent throughout development.

## Story Completion Checklist

### Demo Migration Stories (DEMO-001 through DEMO-046)

**Enhanced checklist for Epic-01 pixel-perfect migration stories:**

#### Visual Verification Requirements
- [ ] Demo server running on port 8080 (`cd demo && npm start`)
- [ ] Next.js server running on port 3000 (`npm run dev`)
- [ ] Side-by-side visual comparison completed
- [ ] Pixel-perfect match at 375px (mobile)
- [ ] Pixel-perfect match at 768px (tablet)  
- [ ] Pixel-perfect match at 1440px (desktop)
- [ ] Visual diff score <2% at all breakpoints
- [ ] All interactive elements function identically
- [ ] Animation timing matches demo exactly

#### Component Integration
- [ ] Uses design system foundation patterns
- [ ] Follows `/demo/design-system-showcase.html` standards
- [ ] Prioritizes showcase patterns over demo inconsistencies
- [ ] Reusable components extracted where appropriate

### Standard User Stories (USER-xxx)

**Use this checklist after completing each user story (e.g., USER-001)**

### ✅ Pre-Completion Verification

- [ ] All story tasks from TodoWrite are marked complete
- [ ] Code changes are committed to git
- [ ] No console.log statements in production code
- [ ] No hardcoded secrets or API keys

### 🎯 Run Story Verification Script

```bash
.claude/scripts/story-complete.sh
```

This automated script checks:

#### 1. Build Verification
- [ ] TypeScript compiles without errors
- [ ] No type errors in the codebase

#### 2. Visual Verification (Playwright)
- [ ] Component showcase page loads
- [ ] All visual tests pass
- [ ] Screenshots captured in `visual-snapshots/`
- [ ] No visual regressions from previous story

#### 3. Security Checks
- [ ] Snyk dependency scan passes
- [ ] GitGuardian finds no secrets
- [ ] MCP security scan completes
- [ ] Security packages installed (DOMPurify, validator.js, safe-compare)

#### 4. Code Quality
- [ ] No console.log statements found
- [ ] TODO comments documented (if any)
- [ ] Component documentation exists

### 📝 Update Documentation

**Only proceed after all checks pass!**

```bash
/update-docs
```

This command:
- [ ] Updates README.md with new features
- [ ] Updates CLAUDE.md if workflows changed
- [ ] Updates technical documentation
- [ ] Creates timestamped update summary

### ✅ Final Verification

- [ ] All checks passed
- [ ] Documentation is current
- [ ] Ready to move to next story

---

## Epic Completion Checklist

**Use this checklist after completing all stories in an epic (e.g., after USER-001, USER-002, USER-003)**

### ✅ Pre-Epic-Completion Verification

- [ ] All stories in the epic are complete
- [ ] Each story passed its individual completion checklist
- [ ] Documentation updated after each story

### 🔐 Run Comprehensive Security Audit

```bash
.claude/scripts/full-security-audit.sh
```

This comprehensive audit includes:

#### 1. Dependency Security
- [ ] Snyk test passes (no high/critical vulnerabilities)
- [ ] Snyk monitor enabled for continuous tracking
- [ ] npm audit shows no vulnerabilities

#### 2. Secret Scanning
- [ ] GitGuardian deep scan finds no secrets
- [ ] No hardcoded secrets in code
- [ ] Environment variables properly managed

#### 3. MCP Security
- [ ] All MCP servers scanned
- [ ] No insecure MCP configurations
- [ ] MCP permissions properly set

#### 4. Web Vulnerability Scan (if deployed)
```bash
export VYBE_DEPLOY_URL=https://your-deployment.vercel.app
nuclei -u $VYBE_DEPLOY_URL
```
- [ ] No critical vulnerabilities
- [ ] No high-severity issues
- [ ] Security headers properly configured

#### 5. Additional Security Checks
- [ ] All external URLs use HTTPS
- [ ] No sensitive data in logs
- [ ] Cross-tenant isolation verified (if applicable)

### 🔧 Manual Security Tools

Run these tools from `docs/setup.md` that require manual intervention:

#### Stripe (if payment features added)
- [ ] Test webhook endpoints
- [ ] Verify product configurations
- [ ] Check subscription flows

#### Cal.com (if booking features added)
- [ ] Test booking flow
- [ ] Verify availability settings
- [ ] Check calendar integrations

#### HashiCorp Vault (if new secrets added)
```bash
vault server -dev
# Access UI at http://127.0.0.1:8200
```
- [ ] Audit secret paths
- [ ] Review access policies
- [ ] Verify secret rotation

### 📝 Epic Summary Documentation

```bash
/update-docs
```

Create epic completion summary including:
- [ ] List of all completed stories
- [ ] Major features added
- [ ] Architectural decisions made
- [ ] Security considerations addressed
- [ ] Performance optimizations implemented

### 🏷️ Epic Finalization

- [ ] Create git tag for epic completion
```bash
git tag -a "epic-01-user-management-complete" -m "Completed User Management Epic"
git push origin --tags
```
- [ ] Update project board/tracking system
- [ ] Notify team of epic completion

---

## Quick Reference

### Story Workflow (5-10 minutes)
```bash
# 1. Verify story implementation
.claude/scripts/story-complete.sh

# 2. Fix any issues found

# 3. Update documentation
/update-docs

# 4. Move to next story
```

### Epic Workflow (15-30 minutes)
```bash
# 1. Run comprehensive security audit
.claude/scripts/full-security-audit.sh

# 2. Run manual security tools as needed

# 3. Create epic summary
/update-docs

# 4. Tag the epic completion
git tag -a "epic-XX-name-complete" -m "Completed Epic Name"
```

## Important Notes

1. **Never skip steps** - Each check catches different issues
2. **Fix immediately** - Don't let issues accumulate
3. **Document everything** - Future you will thank present you
4. **Learn from errors** - TRAIL system captures all solutions
5. **Stay secure** - Security checks prevent future headaches

## Epic Structure Example

```
stories/
└── epic-01-user-management/
    ├── USER-001-profile-system.md      ✅ Complete
    ├── USER-002-apps-submission.md     ✅ Complete
    └── USER-003-guides-publishing.md   🔄 In Progress

After USER-001: story-complete.sh → /update-docs
After USER-002: story-complete.sh → /update-docs
After USER-003: story-complete.sh → /update-docs
After all three: full-security-audit.sh → epic summary → tag
```

## Troubleshooting

### Story verification fails
1. Check build log: `cat /tmp/build.log`
2. View test report: `npx playwright show-report`
3. Debug specific tool that failed

### Security audit finds issues
1. Fix critical/high vulnerabilities immediately
2. Document decisions for medium/low issues
3. Re-run audit after fixes

### Documentation update fails
1. Check for merge conflicts
2. Ensure all files are saved
3. Run command with verbose flag if available

---

**Remember**: Quality over speed. A well-verified story prevents future bugs!