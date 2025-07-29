# Automated MCP Servers

## Overview

These MCP servers are configured to be used automatically by Claude without requiring explicit user instructions. When Claude needs their functionality, it will automatically invoke the appropriate tools.

## REF MCP - Document Search & Retrieval

**Purpose**: Dramatically reduces token usage by searching and retrieving only relevant documentation  
**Repository**: https://github.com/ref-tools/ref-tools-mcp  
**Key Benefit**: 85% token reduction for documentation tasks

### Features
- Intelligent document search
- Context-aware retrieval
- Automatic summarization
- Multi-format support

### Configuration
```json
{
  "ref-mcp": {
    "command": "node",
    "args": ["/path/to/ref-tools-mcp/dist/index.js"],
    "env": {
      "REF_DOCS_PATH": "/path/to/docs"
    }
  }
}
```

### Automatic Usage
Claude automatically uses REF when:
- Searching for documentation
- Looking up API references
- Finding configuration examples
- Retrieving best practices

## Convex MCP - Database Operations

**Purpose**: Direct database introspection and query execution  
**Package**: convex@latest (via npx)  
**Key Benefit**: Test and debug database operations without writing code

### Features
- Table schema introspection
- Direct data querying with pagination
- Function execution with arguments
- Sandboxed JavaScript queries
- Environment variable management

### Configuration
```json
{
  "convex": {
    "command": "npx",
    "args": ["-y", "convex@latest", "mcp", "start"],
    "env": {
      "CONVEX_URL": "${CONVEX_URL}",
      "CONVEX_DEPLOY_KEY": "${CONVEX_DEPLOY_KEY}"
    }
  }
}
```

### Automatic Usage
Claude automatically uses Convex MCP when:
- Verifying database schema changes
- Testing Convex functions
- Debugging data issues
- Analyzing query performance
- Checking data integrity

## GitHub MCP - Git Operations

**Purpose**: Seamless Git and GitHub operations  
**Package**: @modelcontextprotocol/server-github  
**Key Benefit**: Direct repository interaction without shell commands

### Features
- Repository management
- Pull request operations
- Issue tracking
- Branch operations
- Commit history

### Configuration
```json
{
  "github": {
    "command": "npx",
    "args": ["@modelcontextprotocol/server-github"],
    "env": {
      "GITHUB_TOKEN": "${GITHUB_TOKEN}"
    }
  }
}
```

### Automatic Usage
Claude automatically uses GitHub MCP for:
- Creating pull requests
- Managing issues
- Checking repository status
- Reviewing commit history

## Semgrep MCP - Security Scanning

**Purpose**: Automatic code security analysis  
**Repository**: Integrated with Semgrep  
**Key Benefit**: Real-time vulnerability detection

### Features
- Pattern-based security scanning
- OWASP compliance checks
- Custom rule support
- Auto-fix suggestions

### Configuration
```json
{
  "semgrep": {
    "command": "semgrep-mcp",
    "args": ["--config", "auto"],
    "env": {
      "SEMGREP_APP_TOKEN": "${SEMGREP_APP_TOKEN}"
    }
  }
}
```

### Automatic Usage
Claude automatically uses Semgrep when:
- Reviewing code for security issues
- Before committing sensitive changes
- Analyzing dependencies
- Checking for common vulnerabilities

## Solutions Memory MCP - TRAIL Integration

**Purpose**: Recall previous solutions from TRAIL system  
**Repository**: Local implementation  
**Key Benefit**: Instant access to learned solutions

### Features
- Solution database search
- Pattern matching
- Context retrieval
- Success rate tracking

### Configuration
```json
{
  "solutions-memory": {
    "command": "node",
    "args": [".claude/solutions/memory-server.js"],
    "env": {
      "SOLUTIONS_PATH": ".claude/solutions/solutions.log"
    }
  }
}
```

### Automatic Usage
Claude automatically uses Solutions Memory for:
- Recurring error patterns
- Previously solved problems
- Best practice retrieval
- Implementation patterns

## MCP Security Audit - Dependency Scanning

**Purpose**: Automated security auditing of npm dependencies  
**Repository**: https://github.com/qianniuspace/mcp-security-audit  
**Key Benefit**: Continuous dependency vulnerability monitoring

### Features
- npm audit integration
- CVE database checking
- Severity classification
- Update recommendations

### Configuration
```json
{
  "security-audit": {
    "command": "npx",
    "args": ["mcp-security-audit"],
    "env": {
      "AUDIT_LEVEL": "moderate"
    }
  }
}
```

### Automatic Usage
Claude automatically uses Security Audit when:
- Installing new packages
- Reviewing package.json
- Checking for vulnerabilities
- Planning updates

## Serena - Symbol-Level Code Navigation

**Purpose**: IDE-like code understanding and navigation  
**Repository**: https://github.com/oraios/serena  
**Key Benefit**: Precise code analysis and editing

### Features
- Symbol resolution
- Type inference
- Reference finding
- Refactoring support
- Cross-file navigation

### Configuration
```json
{
  "serena": {
    "command": "serena-server",
    "args": ["--project", "."],
    "env": {
      "SERENA_INDEX_PATH": ".serena-index"
    }
  }
}
```

### Automatic Usage
Claude automatically uses Serena for:
- Finding function definitions
- Tracking variable usage
- Understanding type relationships
- Navigating complex codebases
- Refactoring operations

## Best Practices

### 1. Token Configuration
Always use environment variables for sensitive tokens:
```bash
export GITHUB_TOKEN="your-token"
export SEMGREP_APP_TOKEN="your-token"
```

### 2. Performance Optimization
- REF MCP: Index large documentation sets
- Serena: Pre-build symbol indexes
- GitHub: Use caching for frequent operations

### 3. Error Handling
Automated servers should fail gracefully:
- Continue operation if server unavailable
- Log errors for debugging
- Provide fallback options

### 4. Monitoring Usage
```bash
# Check server status
ps aux | grep mcp

# View server logs
tail -f ~/.claude/config/logs/mcp-*.log

# Monitor performance
htop -p $(pgrep -f mcp)
```

## Troubleshooting

### Server Not Starting
1. Check configuration syntax
2. Verify command paths
3. Ensure tokens are set
4. Review error logs

### Tools Not Available
1. Restart Claude Code session
2. Check server is running
3. Verify tool registration
4. Test manual invocation

### Performance Issues
1. Check server resource usage
2. Review index sizes
3. Optimize configurations
4. Consider server limits

## Integration with Hooks

Automated MCP servers work seamlessly with hooks:
- Security scans trigger TRAIL learning
- Git operations trigger auto-commits
- Solutions found are logged
- Patterns feed continuous learning