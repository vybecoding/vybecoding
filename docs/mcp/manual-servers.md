# Manual MCP Servers

## Overview

These MCP servers require explicit user instructions to activate. They provide powerful capabilities but need human oversight due to their nature or potential impact.

## Playwright MCP - Browser Automation

**Purpose**: Automated browser testing and visual debugging  
**Package**: @modelcontextprotocol/server-playwright  
**Key Benefit**: Visual testing and complex UI automation

### Features
- Browser automation
- Screenshot capture
- Visual testing
- Network monitoring
- Console log capture
- Video recording

### Configuration
```json
{
  "playwright": {
    "command": "npx",
    "args": ["@modelcontextprotocol/server-playwright"],
    "env": {
      "PLAYWRIGHT_BROWSERS_PATH": "/path/to/browsers"
    }
  }
}
```

### Usage Instructions
Ask Claude to:
- "Test the login flow with Playwright"
- "Take a screenshot of the homepage"
- "Debug the checkout process visually"
- "Record a video of the user journey"

### Example Commands
```
User: Test the signup form with Playwright
Claude: I'll use Playwright MCP to test the signup form...

User: Debug why the modal isn't showing
Claude: Let me use Playwright to visually debug this...
```

## EXA Search MCP - Web Search

**Purpose**: Advanced web searching capabilities  
**Repository**: EXA Search integration  
**Key Benefit**: Real-time web information retrieval

### Features
- Web search with filters
- Domain-specific searches
- Date range filtering
- Content type filtering
- Result ranking

### Configuration
```json
{
  "exa-search": {
    "command": "exa-search-mcp",
    "args": ["--mode", "api"],
    "env": {
      "EXA_API_KEY": "${EXA_API_KEY}"
    }
  }
}
```

### Usage Instructions
Ask Claude to:
- "Search the web for React 19 features"
- "Find recent security vulnerabilities in npm"
- "Look up best practices for Next.js 14"
- "Search for solutions to this error online"

### Search Examples
```
User: Search the web for solutions to this TypeScript error
Claude: I'll search the web using EXA Search MCP...

User: Find recent articles about AI security
Claude: Let me search for recent AI security articles...
```

## MCP-Scan - Comprehensive Security Scanner

**Purpose**: Deep security analysis of MCP configurations and code  
**Command**: `uvx mcp-scan@latest`  
**Key Benefit**: Identifies MCP-specific vulnerabilities

### Features
- MCP configuration auditing
- Permission analysis
- Token exposure detection
- Command injection scanning
- Tool shadowing detection

### Manual Usage
Run directly in terminal:
```bash
# Scan current directory
uvx mcp-scan@latest

# Scan specific path
uvx mcp-scan@latest /path/to/project

# Generate detailed report
uvx mcp-scan@latest --report detailed
```

### Usage Instructions
Ask Claude to:
- "Run MCP-Scan to check our security"
- "Scan for MCP vulnerabilities"
- "Audit our MCP configuration"
- "Check for exposed tokens in MCP settings"

### Scan Examples
```
User: Check if our MCP setup is secure
Claude: I'll run MCP-Scan to audit your configuration...
[Claude provides instructions to run: uvx mcp-scan@latest]

User: Are there any MCP vulnerabilities?
Claude: Let me guide you through running MCP-Scan...
```

## BrowserTools - Chrome Extension

**Purpose**: Direct browser interaction and debugging  
**Type**: Chrome Extension (not command-line MCP)  
**Key Benefit**: Real browser environment access

### Features
- DOM inspection
- Console access
- Network monitoring
- Cookie management
- Local storage access

### Installation
1. Install from Chrome Web Store
2. Enable in Chrome DevTools
3. Configure permissions

### Usage Instructions
This requires manual browser interaction:
- Open Chrome DevTools
- Navigate to BrowserTools tab
- Use for debugging web applications

## Best Practices

### 1. Clear Instructions
When requesting manual MCP usage:
- Be specific about what you want
- Provide context for the task
- Mention the tool explicitly if needed

### 2. Security Considerations
- **Playwright**: Be cautious with credentials in tests
- **EXA Search**: Don't search for sensitive information
- **MCP-Scan**: Review reports before sharing
- **BrowserTools**: Clear cookies/storage after debugging

### 3. Performance Impact
Manual tools can be resource-intensive:
- Close Playwright browsers after use
- Limit search result counts
- Run scans during low-activity periods
- Monitor system resources

### 4. Error Handling
If manual tools fail:
- Check prerequisites are installed
- Verify API keys are set
- Review command syntax
- Check system resources

## Integration Examples

### Playwright + TRAIL
```bash
# TRAIL automatically captures Playwright test failures
npm test:e2e
# Failures are logged to solutions.log with screenshots
```

### EXA Search + Solutions
```bash
# Search results can be saved as solutions
.claude/solutions/search.sh "web:typescript error"
# Saves successful fixes from web searches
```

### MCP-Scan + Security Hooks
```bash
# Run scan and trigger security analysis
uvx mcp-scan@latest && node .claude/solutions/security-analyzer.js
```

## Troubleshooting

### Playwright Issues
1. **Browsers not installed**: `npx playwright install`
2. **Timeout errors**: Increase timeout in config
3. **Screenshot failures**: Check file permissions
4. **Memory issues**: Close other applications

### EXA Search Issues
1. **No results**: Broaden search terms
2. **API limits**: Check rate limits
3. **Timeout**: Reduce result count
4. **Auth errors**: Verify API key

### MCP-Scan Issues
1. **Command not found**: Ensure uvx is installed
2. **Permission denied**: Run with appropriate rights
3. **Scan incomplete**: Check disk space
4. **False positives**: Review context

## When to Use Manual vs Automated

### Use Manual MCP When:
- Task requires human judgment
- Dealing with sensitive operations
- Need visual confirmation
- Exploring unknown issues
- Running security audits

### Prefer Automated When:
- Task is routine
- Clear success criteria
- No sensitive data involved
- Part of CI/CD pipeline
- Well-defined patterns

## Advanced Usage

### Combining Manual Tools
```bash
# Use Playwright to test, then scan for security
npm test:e2e && uvx mcp-scan@latest

# Search for solution, then test it
# 1. Ask Claude to search with EXA
# 2. Implement solution
# 3. Test with Playwright
```

### Custom Workflows
Create scripts that combine manual MCP tools:
```bash
#!/bin/bash
# security-check.sh
echo "Running comprehensive security check..."
uvx mcp-scan@latest
echo "Check complete. Review browser security..."
echo "Please run Playwright security tests manually"
```