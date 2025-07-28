# MCP Security Documentation

## Overview

This document covers security hardening for MCP (Model Context Protocol) servers, addressing known vulnerabilities and implementing best practices to ensure safe operation of Claude Code with extended capabilities.

## Top MCP Security Vulnerabilities

### 1. Tool Poisoning
**Risk**: Malicious actors could create fake MCP servers that mimic legitimate ones  
**Impact**: Execution of malicious code, data exfiltration, system compromise

**Mitigations**:
- Only install MCP servers from verified sources
- Maintain a whitelist of approved servers
- Verify server signatures and checksums
- Regular security audits of installed servers

### 2. Token Exposure
**Risk**: API tokens and credentials exposed in logs or configuration  
**Impact**: Unauthorized access to external services, data breaches

**Mitigations**:
- Use environment variables for all tokens
- Never commit tokens to version control
- Implement token rotation policies
- Use minimal permission scopes

### 3. Command Injection
**Risk**: Unsanitized inputs passed to MCP servers could execute arbitrary commands  
**Impact**: System compromise, privilege escalation

**Mitigations**:
- Input validation on all MCP interactions
- Use parameterized commands only
- Avoid shell command execution
- Sanitize all user inputs

### 4. Admin Bypass
**Risk**: MCP servers could bypass authentication or authorization checks  
**Impact**: Unauthorized access to protected resources

**Mitigations**:
- Strict identity verification for all operations
- Role-based access control (RBAC)
- Audit logging of all operations
- Regular permission reviews

### 5. Cross-Server Communication
**Risk**: MCP servers communicating with each other could create attack chains  
**Impact**: Privilege escalation, data leakage between contexts

**Mitigations**:
- Isolate MCP servers from each other
- No direct server-to-server communication
- Use message queues with validation
- Monitor inter-process communication

### 6. Resource Exhaustion
**Risk**: Malicious or buggy MCP servers consuming excessive resources  
**Impact**: Denial of service, system instability

**Mitigations**:
- Resource limits for each server
- Monitor CPU and memory usage
- Automatic server restart policies
- Rate limiting on operations

### 7. Tool Shadowing
**Risk**: Malicious servers registering tools with same names as legitimate ones  
**Impact**: Hijacking of tool calls, unexpected behavior

**Mitigations**:
- Unique tool namespaces per server
- Tool registration validation
- Version verification
- Signature checking

## Security Configuration

### Secure MCP Settings Template

```json
{
  "servers": {
    "example-server": {
      "command": "node",
      "args": ["--no-warnings", "--max-old-space-size=512", "server.js"],
      "env": {
        "NODE_ENV": "production",
        "API_TOKEN": "${API_TOKEN}",
        "LOG_LEVEL": "error"
      },
      "security": {
        "maxMemory": "512MB",
        "maxCpu": "50%",
        "timeout": "30s",
        "allowedHosts": ["api.example.com"],
        "sandbox": true
      }
    }
  },
  "global": {
    "security": {
      "validateSignatures": true,
      "allowedSources": [
        "https://github.com/modelcontextprotocol/*",
        "https://github.com/ref-tools/*"
      ],
      "auditLog": ".claude/config/audit.log",
      "tokenRotation": "30d"
    }
  }
}
```

### Environment Variable Security

```bash
# .env.example (commit this)
GITHUB_TOKEN=your-github-token-here
SEMGREP_APP_TOKEN=your-semgrep-token-here
EXA_API_KEY=your-exa-api-key-here

# .env (never commit this)
GITHUB_TOKEN=ghp_actualTokenHere
SEMGREP_APP_TOKEN=actualSemgrepToken
EXA_API_KEY=actualExaApiKey
```

### Token Management Script

```bash
#!/bin/bash
# token-manager.sh - Secure token management

# Check for exposed tokens
check_exposed_tokens() {
    echo "Checking for exposed tokens..."
    
    # Check git history
    git log -p | grep -E "(ghp_|ghs_|github_pat_)" && echo "WARNING: GitHub token found in git history!"
    
    # Check current files
    grep -r "ghp_\|ghs_\|github_pat_" --exclude-dir=.git . && echo "WARNING: Token found in files!"
    
    # Check environment
    env | grep -E "(TOKEN|KEY|SECRET)" | grep -v "=" && echo "Tokens properly hidden"
}

# Rotate tokens
rotate_tokens() {
    echo "Token rotation reminder:"
    echo "1. Generate new tokens from service providers"
    echo "2. Update ~/.bashrc or ~/.zshrc"
    echo "3. Restart Claude Code"
    echo "4. Verify old tokens are revoked"
}

# Validate token permissions
validate_permissions() {
    # Check GitHub token scopes
    curl -sS -H "Authorization: token $GITHUB_TOKEN" \
        https://api.github.com/rate_limit | \
        jq '.resources.core.limit' || echo "Invalid GitHub token"
}

check_exposed_tokens
validate_permissions
```

## Security Monitoring

### Audit Logging Configuration

```javascript
// audit-logger.js
const fs = require('fs');
const path = require('path');

class AuditLogger {
    constructor(logPath = '.claude/config/audit.log') {
        this.logPath = logPath;
        fs.mkdirSync(path.dirname(logPath), { recursive: true });
    }
    
    log(event) {
        const entry = {
            timestamp: new Date().toISOString(),
            server: event.server,
            tool: event.tool,
            user: process.env.USER,
            action: event.action,
            result: event.result,
            ip: event.ip || 'local'
        };
        
        fs.appendFileSync(this.logPath, JSON.stringify(entry) + '\n');
    }
    
    detectAnomalies() {
        const logs = fs.readFileSync(this.logPath, 'utf8')
            .split('\n')
            .filter(Boolean)
            .map(JSON.parse);
        
        // Detect rapid repeated calls
        const recentLogs = logs.filter(l => 
            new Date() - new Date(l.timestamp) < 60000
        );
        
        const toolCounts = {};
        recentLogs.forEach(l => {
            toolCounts[l.tool] = (toolCounts[l.tool] || 0) + 1;
        });
        
        Object.entries(toolCounts).forEach(([tool, count]) => {
            if (count > 100) {
                console.warn(`ANOMALY: ${tool} called ${count} times in 1 minute`);
            }
        });
    }
}
```

### Real-time Monitoring Script

```bash
#!/bin/bash
# mcp-monitor.sh - Real-time MCP security monitoring

# Monitor MCP processes
monitor_processes() {
    echo "=== MCP Process Monitor ==="
    while true; do
        clear
        echo "MCP Server Resource Usage:"
        ps aux | grep -E "(mcp|modelcontext)" | grep -v grep | \
            awk '{printf "%-20s CPU: %5s MEM: %5s\n", $11, $3, $4}'
        
        echo -e "\nActive Connections:"
        netstat -an | grep ESTABLISHED | grep -E "(3000|3001|3002)"
        
        sleep 5
    done
}

# Check for suspicious patterns
check_suspicious() {
    echo "=== Checking Suspicious Patterns ==="
    
    # Check for command injection attempts
    grep -r "exec\|system\|eval" ~/.claude/config/logs/ | \
        grep -v "executor" && echo "WARNING: Potential command injection"
    
    # Check for token exposure
    grep -r "ghp_\|ghs_\|github_pat_" ~/.claude/config/logs/ && \
        echo "WARNING: Token exposed in logs"
    
    # Check for excessive API calls
    tail -1000 ~/.claude/config/audit.log | \
        awk -F'"tool":"' '{print $2}' | \
        awk -F'"' '{print $1}' | \
        sort | uniq -c | sort -nr | head -10
}

monitor_processes
```

## Security Hardening Checklist

### Initial Setup
- [ ] Install MCP servers from verified sources only
- [ ] Configure environment variables securely
- [ ] Set up audit logging
- [ ] Enable signature validation
- [ ] Configure resource limits

### Ongoing Security
- [ ] Weekly token rotation check
- [ ] Monthly permission audit
- [ ] Review audit logs for anomalies
- [ ] Update MCP servers regularly
- [ ] Monitor resource usage

### Incident Response
- [ ] Disable suspicious servers immediately
- [ ] Rotate all tokens if compromise suspected
- [ ] Review audit logs for attack timeline
- [ ] Report security issues to server maintainers
- [ ] Document and learn from incidents

## MCP-Specific Security Tools

### MCP-Scan Integration

```bash
# Regular security scanning
uvx mcp-scan@latest --config strict

# Automated daily scan
crontab -e
# Add: 0 2 * * * cd /path/to/project && uvx mcp-scan@latest --output .claude/config/scan-report.json
```

### Security Test Suite

```javascript
// mcp-security-test.js
const { execSync } = require('child_process');

function runSecurityTests() {
    const tests = [
        {
            name: "Token Exposure",
            command: "grep -r 'ghp_' . --exclude-dir=node_modules"
        },
        {
            name: "Insecure Permissions",
            command: "find . -type f -perm 0777"
        },
        {
            name: "Outdated Dependencies",
            command: "npm audit"
        },
        {
            name: "MCP Configuration",
            command: "jq '.servers[].security' .claude/config/mcp-settings.json"
        }
    ];
    
    tests.forEach(test => {
        try {
            execSync(test.command);
            console.log(`✅ ${test.name}: PASSED`);
        } catch (error) {
            console.log(`❌ ${test.name}: FAILED`);
        }
    });
}

runSecurityTests();
```

## Best Practices Summary

1. **Principle of Least Privilege**
   - Grant minimal permissions to each MCP server
   - Use read-only access where possible
   - Limit network access to required hosts

2. **Defense in Depth**
   - Multiple layers of security
   - Assume any layer can fail
   - Monitor all layers continuously

3. **Zero Trust Architecture**
   - Verify every operation
   - Authenticate all requests
   - Never trust, always verify

4. **Continuous Monitoring**
   - Real-time resource monitoring
   - Audit log analysis
   - Anomaly detection

5. **Incident Preparedness**
   - Have a response plan
   - Regular security drills
   - Learn from incidents

## Security Resources

- [MCP Security Guidelines](https://modelcontextprotocol.org/security)
- [OWASP Secure Coding Practices](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [GitHub Token Security](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure)