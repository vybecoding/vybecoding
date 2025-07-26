# Semgrep MCP - Static Security Analysis

## Overview
Semgrep MCP provides Claude with static code analysis capabilities to detect security vulnerabilities, code quality issues, and anti-patterns. It's configured to run autonomously when Claude analyzes code.

## Status
✅ **Configured**: In `~/.config/claude/claude_desktop_config.json`
✅ **UV Installed**: Required runtime installed at `~/snap/code-insiders/2046/.local/bin`
✅ **Working**: Detected 4 security issues in test file

## How Semgrep MCP Works

### Autonomous Security Scanning
- **Claude-initiated** - Runs when Claude analyzes code for security
- **5000+ rules** - OWASP Top 10, CWEs, language-specific patterns
- **Multi-language** - JavaScript, TypeScript, Python, Go, Java, etc.
- **No manual control** - Claude decides when to scan

### What It Detects

**JavaScript/TypeScript Security Issues**:
- SQL injection vulnerabilities
- Cross-site scripting (XSS)
- Command injection
- Path traversal
- Hardcoded secrets
- Weak cryptography
- Dangerous eval() usage
- Insecure randomness

**Code Quality Issues**:
- Anti-patterns
- Performance problems
- Best practice violations
- Framework-specific issues

## When Claude Uses Semgrep

### Common Triggers
- Code review requests
- Security audit questions
- "Check this code for vulnerabilities"
- "Is this code secure?"
- New code submissions

### What Semgrep Found in Testing

```javascript
// Issues detected:
1. XSS vulnerability: innerHTML = userInput
2. Code injection: eval(code)
3. Weak crypto: MD5 for passwords
4. Command injection: exec(`ls ${userInput}`)
```

## How to Get Security Benefits

### Write Code That Triggers Analysis
❌ **Vague**: "Here's my code"
✅ **Specific**: "Check this authentication code for security issues"

❌ **No context**: Just paste code
✅ **Security-focused**: "Review this input handling for vulnerabilities"

### Security-First Questions
- "Are there any security vulnerabilities in this function?"
- "Check this API endpoint for injection risks"
- "Review authentication flow for security issues"
- "Audit this file upload handler"

## What You'll Notice

### Signs Semgrep is Working
- Specific vulnerability names (CWE-79, OWASP A07)
- Line-by-line security findings
- Remediation suggestions
- Links to security documentation

### What You Won't See
- "Running Semgrep..." messages
- Raw Semgrep output
- Configuration options
- Rule customization

## Practical Examples for vybecoding.ai

### Authentication Code Review
```javascript
// Claude can detect issues like:
- Hardcoded API keys
- Weak password hashing
- Missing CSRF protection
- Insecure session handling
```

### Input Validation
```javascript
// Semgrep helps find:
- SQL injection risks
- XSS vulnerabilities
- Command injection
- Path traversal
```

### API Security
```javascript
// Detects problems with:
- Missing authentication
- Improper authorization
- Data exposure
- Rate limiting issues
```

## Integration with Your Stack

### With TRAIL System
- **Semgrep**: Prevents security issues before deployment
- **TRAIL**: Captures fixes when issues are found
- Together: Proactive security + learned solutions

### With Nuclei
- **Semgrep**: Static analysis (code not running)
- **Nuclei**: Dynamic scanning (running application)
- Together: Complete security coverage

## Common Security Patterns Detected

### React/Next.js Specific
- `dangerouslySetInnerHTML` usage
- Unvalidated redirects
- Client-side secrets
- Improper data sanitization

### Node.js/Express
- SQL injection in queries
- Command execution vulnerabilities
- Path traversal in file operations
- Weak crypto implementations

### General JavaScript
- `eval()` and `Function()` usage
- Prototype pollution
- Regular expression DoS
- Timing attacks

## Reality Check

### What Semgrep MCP Provides
- Automatic security scanning during code review
- 5000+ security rules
- Framework-specific checks
- Best practice enforcement

### What It Doesn't Do
- Fix vulnerabilities automatically
- Scan without Claude's decision
- Replace manual security review
- Catch all security issues

### Cost Consideration
- Free to use (no API key needed)
- Runs via UV package manager
- No rate limits

## Manual Testing (Optional)

If you want to test Semgrep directly:
```bash
# Add UV to PATH
source $HOME/snap/code-insiders/2046/.local/share/../bin/env

# Scan a file
uvx semgrep --config=auto path/to/file.js

# Scan entire project
uvx semgrep --config=auto .
```

## Summary

Semgrep MCP provides Claude with powerful security analysis:
- ✅ Automatic security scanning
- ✅ 5000+ vulnerability patterns
- ✅ Multi-language support
- ✅ Zero cost
- ✅ No manual intervention needed

**Bottom line**: When you ask Claude to review code or check for security issues, Semgrep runs automatically in the background, helping identify vulnerabilities before they reach production.