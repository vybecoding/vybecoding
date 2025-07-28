# Security Hooks Documentation

## Overview

Security hooks provide automated protection against various attack vectors including XSS, injection attacks, timing attacks, and "Living off AI" attempts. These hooks run automatically to ensure security best practices are followed.

## Security Hook Types

### 1. Environment Sanitization Hook

**File**: `.claude/config/hooks/sanitize-env.sh`  
**Purpose**: Sanitizes environment variables to prevent injection attacks  
**Trigger**: First in every hook chain

```bash
#!/bin/bash
# Sanitize environment variables to prevent injection

# Remove potentially dangerous characters from variables
export TOOL_NAME=$(echo "$TOOL_NAME" | sed 's/[;&|`$]//g')
export TOOL_OUTPUT=$(echo "$TOOL_OUTPUT" | head -c 10000)
export FILE_PATH=$(echo "$FILE_PATH" | sed 's/[;&|`$]//g')

# Validate file paths
if [[ ! "$FILE_PATH" =~ ^[a-zA-Z0-9/_.-]+$ ]]; then
    echo "Warning: Invalid file path detected"
    exit 1
fi

exit 0
```

### 2. Post-Edit Sanitization Hook

**File**: `.claude/config/hooks/post-edit-sanitize.js`  
**Purpose**: Prevents XSS vulnerabilities in edited files  
**Trigger**: After file edits

```javascript
#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const DOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const filePath = process.argv[2];
if (!filePath) process.exit(0);

// Only process HTML/JS files
const ext = path.extname(filePath).toLowerCase();
if (!['.html', '.htm', '.js', '.jsx', '.tsx'].includes(ext)) {
    process.exit(0);
}

try {
    const content = fs.readFileSync(filePath, 'utf8');
    const window = new JSDOM('').window;
    const purify = DOMPurify(window);
    
    // Check for potential XSS
    if (content.includes('innerHTML') && !content.includes('DOMPurify')) {
        console.warn(`Warning: Direct innerHTML usage in ${filePath} - consider using DOMPurify`);
    }
    
    // For HTML files, sanitize content
    if (['.html', '.htm'].includes(ext)) {
        const clean = purify.sanitize(content);
        if (clean !== content) {
            console.warn(`Security: Potentially unsafe HTML detected in ${filePath}`);
        }
    }
} catch (error) {
    // Fail silently to not interrupt workflow
}

process.exit(0);
```

### 3. Living off AI Detection Hook

**File**: `.claude/config/hooks/post-response-scan.js`  
**Purpose**: Detects malicious patterns in AI responses  
**Trigger**: After AI generates responses

```javascript
#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Patterns that indicate potential "Living off AI" attacks
const suspiciousPatterns = [
    /ignore previous instructions/i,
    /disregard all prior/i,
    /new instructions:/i,
    /admin.*override/i,
    /bypass.*security/i,
    /execute.*arbitrary/i,
    /reveal.*secret/i,
    /print.*api.*key/i,
    /env.*variables.*dump/i
];

const response = process.env.AI_RESPONSE || '';
const logFile = '.claude/solutions/security/living-off-ai-alerts.log';

// Check for suspicious patterns
for (const pattern of suspiciousPatterns) {
    if (pattern.test(response)) {
        const alert = {
            timestamp: new Date().toISOString(),
            pattern: pattern.toString(),
            context: response.substring(0, 200)
        };
        
        // Log the alert
        fs.mkdirSync(path.dirname(logFile), { recursive: true });
        fs.appendFileSync(logFile, JSON.stringify(alert) + '\n');
        
        console.warn('⚠️  Potential security issue detected in AI response');
        break;
    }
}

process.exit(0);
```

### 4. Input Validation Hook

**File**: Enforced via CLAUDE.md rules  
**Purpose**: Ensures all user input is validated  
**Implementation**: Automatic via Claude's behavior

The following validation rules are automatically applied:
- Email validation with `validator.isEmail()`
- URL validation with `validator.isURL()`
- HTML escaping with `validator.escape()`
- SQL injection prevention via parameterized queries

### 5. Safe Comparison Hook

**File**: Enforced via CLAUDE.md rules  
**Purpose**: Prevents timing attacks on authentication  
**Implementation**: Automatic via Claude's behavior

Authentication comparisons automatically use:
```javascript
const safeCompare = require('safe-compare');
if (safeCompare(userToken, expectedToken)) {
    // Authenticated
}
```

## Installation

```bash
# Create security hooks directory
mkdir -p .claude/config/hooks
mkdir -p .claude/solutions/security

# Install required packages
npm install -D dompurify jsdom validator safe-compare

# Create all security hooks
# [Create each script from examples above]

# Make executable
chmod +x .claude/config/hooks/*.sh
```

## Configuration

Add to `.claude/config/settings.json`:
```json
{
  "hooks": {
    "PostToolUse": {
      "Bash": "export TOOL_NAME='{{toolName}}' && /path/to/sanitize-env.sh && ...",
      "Edit": "export FILE_PATH='{{filePath}}' && /path/to/post-edit-sanitize.js '{{filePath}}'"
    },
    "PostResponse": "/path/to/post-response-scan.js"
  }
}
```

## Security Measures Addressed

### 1. Tool Poisoning Prevention
- All MCP servers from verified sources only
- Input validation on all tool interactions

### 2. Command Injection Defense
- Environment variable sanitization
- Path validation
- Command parameter escaping

### 3. XSS Prevention
- Automatic DOMPurify usage alerts
- HTML content sanitization
- Safe rendering practices

### 4. Timing Attack Prevention
- Constant-time comparisons for auth
- No direct string comparison for secrets

### 5. Living off AI Defense
- Pattern detection in AI responses
- Suspicious instruction logging
- Alert generation for review

## Monitoring Security

### View Security Alerts
```bash
# Living off AI attempts
tail -f .claude/solutions/security/living-off-ai-alerts.log

# All security warnings
grep -r "Warning:" .claude/config/hooks/

# Check sanitization logs
cat .claude/solutions/security/sanitization.log
```

### Security Report
```bash
# Generate security summary
cat > .claude/solutions/security-report.sh << 'EOF'
#!/bin/bash
echo "=== Security Report ==="
echo "Living off AI alerts: $(wc -l < .claude/solutions/security/living-off-ai-alerts.log)"
echo "XSS warnings: $(grep -r "innerHTML" --include="*.js" . | wc -l)"
echo "Validation usage: $(grep -r "validator\." --include="*.js" . | wc -l)"
echo "Safe comparisons: $(grep -r "safeCompare" --include="*.js" . | wc -l)"
EOF
chmod +x .claude/solutions/security-report.sh
```

## Best Practices

1. **Chain Order**: Always run sanitization first in hook chains
2. **Fail Safely**: Security hooks should not break workflow
3. **Log Everything**: Keep comprehensive security logs
4. **Regular Reviews**: Check security alerts weekly
5. **Update Patterns**: Add new threat patterns as discovered

## Integration with Other Systems

### TRAIL Integration
- Security issues automatically logged as solutions
- Patterns learned for future prevention

### Continuous Learning
- Security fixes tracked and optimized
- Successful mitigations shared across agents

### Auto-Commit
- Security fixes tagged with [SECURITY] in commits
- Easy to audit security-related changes