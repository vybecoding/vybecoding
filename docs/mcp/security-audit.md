# MCP Security Audit

## Status: ✅ INSTALLED

Server installed at `~/.claude/mcp/mcp-security-audit/`

## Overview

MCP Security Audit provides automated security analysis capabilities to Claude, enabling real-time security assessments of code, configurations, and dependencies.

## Location

- **Installation**: `~/.claude/mcp/mcp-security-audit/`
- **Entry Point**: `~/.claude/mcp/mcp-security-audit/build/index.js`

## Configuration

Located in `.claude/config/mcp-settings.json`:
```json
"mcp-security-audit": {
  "command": "node",
  "args": ["/home/happy/.claude/mcp/mcp-security-audit/build/index.js"]
}
```

## Features

### Code Analysis
- Static security analysis
- Vulnerability pattern detection
- Insecure coding practice identification
- Dependency vulnerability scanning

### Configuration Auditing
- Security misconfigurations
- Permission issues
- Exposed credentials
- Weak cryptography

### Compliance Checking
- OWASP compliance
- Security best practices
- Industry standards
- Custom security policies

## Security Checks

1. **Injection Vulnerabilities**
   - SQL injection
   - Command injection
   - XSS vulnerabilities

2. **Authentication Issues**
   - Weak authentication
   - Missing authorization
   - Session management

3. **Data Exposure**
   - Sensitive data leaks
   - Improper error handling
   - Information disclosure

4. **Configuration Security**
   - Insecure defaults
   - Missing security headers
   - Weak encryption

## Integration

Works alongside:
- Post-Edit Sanitize hook for XSS prevention
- Post-Response Scan for AI security
- Semgrep MCP for pattern matching
- Environment sanitization hooks

## Usage

Claude automatically uses this tool when:
- Reviewing code for security
- Analyzing configurations
- Checking dependencies
- Performing security audits

## Best Practices

1. Run regular security audits
2. Address high-severity findings first
3. Keep the tool updated
4. Configure custom rules as needed
5. Integrate with CI/CD pipeline

## Last Tested

January 28, 2025 - Installation verified at expected location