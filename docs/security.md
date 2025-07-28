# Security Tools and Packages

## Overview

This document covers all security tools and packages used in the vybecoding project, their status, and usage guidelines.

## NPM Security Packages

### DOMPurify ✅
**Status**: INSTALLED - dompurify@3.2.6

A powerful XSS sanitizer for HTML, MathML and SVG.

**Installation**:
```bash
npm install dompurify jsdom
```

**Usage**:
```javascript
const DOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const purify = DOMPurify(window);
const clean = purify.sanitize(dirty);
```

**Best Practices**:
- Always sanitize user-generated HTML before rendering
- Use before setting innerHTML
- Configure allowed tags/attributes as needed

### Validator.js ✅
**Status**: INSTALLED - validator@13.15.15

String validation and sanitization library.

**Usage**:
```javascript
const validator = require('validator');

// Email validation
validator.isEmail('test@example.com'); // true

// Other validations
validator.isURL(url);
validator.isAlphanumeric(str);
validator.escape(str); // Escape HTML
```

**Common Validations**:
- Email, URL, IP addresses
- Credit cards, phone numbers
- Alphanumeric, numeric, hexadecimal
- Dates, JSON, UUIDs

### Safe-Compare ✅
**Status**: INSTALLED - safe-compare@1.1.4

Constant-time string comparison to prevent timing attacks.

**Usage**:
```javascript
const safeCompare = require('safe-compare');

// Use for authentication tokens
if (safeCompare(userToken, expectedToken)) {
  // Tokens match
}
```

**When to Use**:
- Authentication token comparison
- API key validation
- Session ID verification
- Any security-sensitive string comparison

## Security Scanners

### Snyk ✅
**Status**: INSTALLED - v1.1298.1

Vulnerability scanner for dependencies and code.

**Setup**:
```bash
snyk auth
snyk test
snyk monitor
```

**Features**:
- Dependency vulnerability scanning
- License compliance
- Container scanning
- Infrastructure as Code scanning

**Free Tier**: 200 tests/month

### Nuclei ✅
**Status**: INSTALLED - v3.3.7

Fast vulnerability scanner based on templates.

**Usage**:
```bash
# Update templates
nuclei -update-templates

# Scan URL
nuclei -u https://example.com

# Scan with specific templates
nuclei -u https://example.com -t cves/
```

**Features**:
- Template-based scanning
- CVE detection
- Misconfigurations
- Exposed panels

## Infrastructure Security

### HashiCorp Vault ✅
**Status**: INSTALLED - v1.15.4 (not running)

Secrets management and data protection.

**Start Vault**:
```bash
# Development mode
vault server -dev

# Access UI
open http://127.0.0.1:8200
```

**Use Cases**:
- API key storage
- Database credentials
- Encryption as a service
- Dynamic secrets

## Recently Installed

### GitGuardian ✅
**Status**: INSTALLED - ggshield v1.41.0

Automatic secret scanning in git commits and code.

**Setup**:
```bash
# Authenticate
ggshield auth login

# Scan current directory
ggshield secret scan path .

# Install pre-commit hook
ggshield install -m local
```

**Features**:
- Pre-commit secret scanning
- Historical commit scanning
- CI/CD integration
- Real-time monitoring

### MCP-Scan ✅
**Status**: INSTALLED - mcp-scan v0.3.2

MCP security scanning for Claude Code sessions.

**Usage**:
```bash
# Scan MCP server
mcp-scan scan <server-name>

# List available commands
mcp-scan --help
```

**Features**:
- MCP server security analysis
- Permission auditing
- Data flow tracking
- Vulnerability detection

## Security Best Practices

### Input Validation
1. Always validate user input with validator.js
2. Sanitize HTML with DOMPurify
3. Use parameterized queries for databases
4. Validate file uploads

### Authentication
1. Use safe-compare for token comparison
2. Store secrets in Vault, not in code
3. Implement rate limiting
4. Use secure session management

### Dependency Security
1. Run `snyk test` regularly
2. Monitor with `snyk monitor`
3. Keep dependencies updated
4. Review security advisories

### Infrastructure
1. Use Vault for secrets management
2. Scan with Nuclei periodically
3. Enable GitGuardian when available
4. Regular security audits

## Integration with Hooks

These security tools work with Claude Code hooks:
- Post-Edit Sanitize hook uses similar XSS detection
- Environment sanitization prevents injection
- Post-Response scan detects malicious patterns

## Testing Security

Test file demonstrating security packages:
```javascript
// Test all three npm packages
const DOMPurify = require('dompurify');
const validator = require('validator');
const safeCompare = require('safe-compare');

// XSS Prevention
const clean = purify.sanitize(userInput);

// Input Validation  
if (!validator.isEmail(email)) {
  throw new Error('Invalid email');
}

// Timing Attack Prevention
if (!safeCompare(token, expectedToken)) {
  throw new Error('Invalid token');
}
```

## Last Updated

January 28, 2025 - All tools tested and documented