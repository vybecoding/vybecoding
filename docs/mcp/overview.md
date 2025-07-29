# MCP Intelligence Layer Overview

## What is MCP?

Model Context Protocol (MCP) is a standardized way for AI models like Claude to interact with external tools and services. MCP servers provide specialized capabilities that Claude can use to enhance its functionality, from code analysis to web searching.

## How MCP Works

1. **Server-Based Architecture**: Each MCP server runs as a separate process
2. **Tool Registration**: Servers register their available tools with Claude
3. **Automatic Discovery**: Claude automatically discovers and uses available MCP tools
4. **Secure Communication**: All interactions follow security protocols

## MCP Categories in vybecoding

### 100% Automated (Claude uses without prompting)
These MCP servers are configured to be used automatically by Claude whenever relevant:
- Document search and retrieval
- Git operations
- Security scanning
- Code navigation
- Memory recall

### Human Required (Need explicit request)
These servers require explicit user instructions:
- Browser automation
- Web searches
- Manual security scans

## Security Measures

### Addressing Top MCP Vulnerabilities

1. **Tool Poisoning Prevention**
   - All MCP servers from verified sources only
   - Whitelist of approved servers
   - Regular security audits

2. **Token Protection**
   - OAuth tokens stored securely
   - Never hardcoded or in plaintext
   - Environment variable isolation

3. **Command Injection Defense**
   - Input validation on all interactions
   - Parameterized commands only
   - No shell command execution

4. **Admin Bypass Protection**
   - Strict identity verification
   - Role-based access control
   - Audit logging of all operations

5. **Comprehensive Logging**
   - All MCP server actions logged
   - Anomaly detection patterns
   - Regular log reviews

6. **Least Privilege**
   - Servers limited to minimum permissions
   - Sandboxed execution environments
   - No cross-server communication

7. **Tool Shadowing Defense**
   - Unique tool namespaces
   - Version verification
   - Signature validation

## MCP Configuration

MCP servers are configured in `.claude/config/mcp-settings.json`:

```json
{
  "servers": {
    "ref-mcp": {
      "command": "node",
      "args": ["/path/to/ref-tools-mcp/dist/index.js"],
      "env": {
        "REF_CONFIG": "/path/to/config"
      }
    },
    "github": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

## Benefits

- **Extended Capabilities**: Access to specialized tools and services
- **Automatic Integration**: Claude uses tools seamlessly
- **Security by Design**: Built-in security measures
- **Modular Architecture**: Add/remove servers as needed
- **Performance Optimization**: Specialized servers for specific tasks

## Quick Start

1. MCP servers are configured in `.claude/config/mcp-settings.json`
2. Most servers work automatically once configured
3. Check server status: `ps aux | grep mcp`
4. View logs: `tail -f ~/.claude/config/logs/mcp-*.log`

## Best Practices

1. **Verify Sources**: Only install MCP servers from trusted repositories
2. **Regular Updates**: Keep servers updated for security patches
3. **Monitor Usage**: Review logs for unusual activity
4. **Token Security**: Use environment variables for sensitive data
5. **Minimal Permissions**: Grant only necessary access rights

## Available MCP Servers

### Development & Database
- [Convex MCP](./convex.md) - Database introspection and query execution
- [GitHub MCP](./github.md) - Repository management and code operations
- [Shadcn UI MCP](./shadcn-ui.md) - Component generation and styling

### Security & Analysis
- [Security Audit MCP](./security-audit.md) - Vulnerability scanning
- [Semgrep MCP](./semgrep.md) - Static code analysis
- [Nuclei MCP](./nuclei.md) - Security testing

### Productivity & Search
- [Solutions Memory MCP](./solutions-memory.md) - Pattern recognition and learning
- [Exa Search MCP](./exa-search.md) - Advanced web searching
- [Sequential Thinking MCP](./sequential-thinking.md) - Complex problem solving

### Testing & Automation
- [Playwright MCP](./playwright.md) - Browser automation and testing
- [Ref Tools MCP](./ref-tools.md) - Documentation and reference management
- [Serena MCP](./serena.md) - Project management assistance

## Related Documentation

- [Automated MCP Servers](./automated-servers.md) - Servers that work automatically
- [Manual MCP Servers](./manual-servers.md) - Servers requiring user activation
- [MCP Setup Guide](./setup-guide.md) - Complete installation instructions
- [MCP Security](./security.md) - Security hardening and best practices