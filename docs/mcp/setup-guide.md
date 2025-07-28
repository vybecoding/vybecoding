# MCP Setup Guide

## Overview

This guide provides complete instructions for setting up all MCP servers in the vybecoding project. Follow these steps to enable Claude's extended capabilities through the Model Context Protocol.

## Prerequisites

- Node.js 18+ installed
- Git installed
- Claude Code with MCP support
- GitHub account (for GitHub MCP)
- API keys for external services

## Quick Setup Script

Save and run this script for complete MCP setup:

```bash
#!/bin/bash
# Complete MCP setup for vybecoding

echo "🚀 Starting MCP setup..."

# Create MCP configuration directory
mkdir -p .claude-code

# Install global MCP servers
echo "📦 Installing MCP servers..."
npm install -g @modelcontextprotocol/server-sequential-thinking
npm install -g @modelcontextprotocol/server-playwright
npm install -g @modelcontextprotocol/server-github

# Clone required repositories
echo "📂 Setting up MCP repositories..."
mkdir -p ~/.claude/mcp && cd ~/.claude/mcp

# REF MCP
if [ ! -d "ref-tools-mcp" ]; then
    git clone https://github.com/ref-tools/ref-tools-mcp.git
    cd ref-tools-mcp && npm install && npm run build && cd ..
fi

# Serena
if [ ! -d "serena" ]; then
    git clone https://github.com/oraios/serena.git
    cd serena && npm install && npm run build && cd ..
fi

# Return to project directory
cd -

# Create MCP settings
echo "⚙️ Configuring MCP servers..."
cat > .claude/config/mcp-settings.json << 'EOF'
{
  "servers": {
    "ref-mcp": {
      "command": "node",
      "args": ["${HOME}/vybecoding-mcp/ref-tools-mcp/dist/index.js"],
      "env": {
        "REF_DOCS_PATH": "./docs"
      }
    },
    "github": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "playwright": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-playwright"]
    },
    "solutions-memory": {
      "command": "node",
      "args": [".claude/solutions/memory-server.js"],
      "env": {
        "SOLUTIONS_PATH": ".claude/solutions/solutions.log"
      }
    },
    "serena": {
      "command": "node",
      "args": ["${HOME}/vybecoding-mcp/serena/dist/index.js"],
      "env": {
        "PROJECT_ROOT": "."
      }
    }
  }
}
EOF

# Create solutions memory server
echo "🧠 Creating solutions memory server..."
mkdir -p .solutions
cat > .claude/solutions/memory-server.js << 'EOF'
#!/usr/bin/env node
// MCP server for TRAIL solutions memory
const { Server } = require('@modelcontextprotocol/server');
const fs = require('fs');
const path = require('path');

const server = new Server({
  name: 'solutions-memory',
  version: '1.0.0',
  capabilities: {
    tools: true
  }
});

server.addTool({
  name: 'search_solutions',
  description: 'Search for previous solutions',
  parameters: {
    query: { type: 'string', required: true }
  },
  handler: async ({ query }) => {
    const solutionsPath = process.env.SOLUTIONS_PATH || '.claude/solutions/solutions.log';
    const content = fs.readFileSync(solutionsPath, 'utf8');
    const matches = content.split('\n').filter(line => 
      line.toLowerCase().includes(query.toLowerCase())
    );
    return { matches: matches.slice(0, 10) };
  }
});

server.start();
EOF
chmod +x .claude/solutions/memory-server.js

# Set up environment variables
echo "🔐 Setting up environment..."
cat >> ~/.bashrc << 'EOF'

# MCP Environment Variables
export GITHUB_TOKEN="your-github-token-here"
export SEMGREP_APP_TOKEN="your-semgrep-token-here"
export EXA_API_KEY="your-exa-api-key-here"
EOF

echo "✅ MCP setup complete!"
echo
echo "🔑 Next steps:"
echo "1. Add your API tokens to ~/.bashrc:"
echo "   - GITHUB_TOKEN"
echo "   - SEMGREP_APP_TOKEN (optional)"
echo "   - EXA_API_KEY (optional)"
echo "2. Run: source ~/.bashrc"
echo "3. Restart Claude Code"
echo "4. Test with: 'Ask Claude to check GitHub status'"
```

## Manual Setup Instructions

### Step 1: Install Global MCP Servers

```bash
# Core MCP servers
npm install -g @modelcontextprotocol/server-github
npm install -g @modelcontextprotocol/server-playwright
npm install -g @modelcontextprotocol/server-sequential-thinking
```

### Step 2: Clone and Build Local Servers

```bash
# Create MCP directory
mkdir -p ~/.claude/mcp && cd ~/.claude/mcp

# REF MCP
git clone https://github.com/ref-tools/ref-tools-mcp.git
cd ref-tools-mcp
npm install
npm run build
cd ..

# Serena
git clone https://github.com/oraios/serena.git
cd serena
npm install
npm run build
cd ..

# MCP Security Audit
git clone https://github.com/qianniuspace/mcp-security-audit.git
cd mcp-security-audit
npm install
npm run build
cd ..
```

### Step 3: Configure MCP Settings

Create `.claude/config/mcp-settings.json` in your project:

```json
{
  "servers": {
    "ref-mcp": {
      "command": "node",
      "args": ["${HOME}/vybecoding-mcp/ref-tools-mcp/dist/index.js"],
      "env": {
        "REF_DOCS_PATH": "./docs",
        "REF_MAX_RESULTS": "10"
      }
    },
    "github": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}",
        "GITHUB_OWNER": "your-username",
        "GITHUB_REPO": "your-repo"
      }
    },
    "playwright": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-playwright"],
      "env": {
        "PLAYWRIGHT_BROWSERS_PATH": "${HOME}/.cache/ms-playwright"
      }
    },
    "semgrep": {
      "command": "semgrep-mcp",
      "args": ["--config", "auto"],
      "env": {
        "SEMGREP_APP_TOKEN": "${SEMGREP_APP_TOKEN}"
      }
    },
    "solutions-memory": {
      "command": "node",
      "args": [".claude/solutions/memory-server.js"],
      "env": {
        "SOLUTIONS_PATH": ".claude/solutions/solutions.log"
      }
    },
    "security-audit": {
      "command": "node",
      "args": ["${HOME}/vybecoding-mcp/mcp-security-audit/dist/index.js"]
    },
    "serena": {
      "command": "node",
      "args": ["${HOME}/vybecoding-mcp/serena/dist/index.js"],
      "env": {
        "PROJECT_ROOT": ".",
        "INDEX_PATH": ".serena-index"
      }
    }
  }
}
```

### Step 4: Set Environment Variables

Add to your `~/.bashrc` or `~/.zshrc`:

```bash
# MCP Environment Variables
export GITHUB_TOKEN="ghp_your_token_here"
export SEMGREP_APP_TOKEN="your_semgrep_token"
export EXA_API_KEY="your_exa_api_key"

# Optional: Project-specific settings
export MCP_PROJECT_ROOT="/path/to/vybecoding"
```

### Step 5: Install Additional Tools

```bash
# Install Playwright browsers
npx playwright install chromium

# Install security tools
pip install semgrep
npm install -g snyk

# Install MCP-Scan
pip install uvx
```

## Verification

### Test Each Server

```bash
# Test GitHub MCP
echo "Check if GitHub MCP is working by asking Claude about repo status"

# Test REF MCP
echo "Ask Claude to search documentation"

# Test Playwright
echo "Ask Claude to 'test the homepage with Playwright'"

# Test solutions memory
echo "Ask Claude about @solutions-memory:recent"
```

### Check Server Status

```bash
# List running MCP processes
ps aux | grep mcp

# Check Claude Code logs
tail -f ~/.claude/config/logs/mcp-*.log

# Verify configuration
cat .claude/config/mcp-settings.json | jq .
```

## Troubleshooting

### Common Issues

#### Servers Not Starting
```bash
# Check syntax
jq . .claude/config/mcp-settings.json

# Verify paths
ls -la ~/.claude/mcp/

# Test manual start
node ~/.claude/mcp/ref-tools-mcp/dist/index.js
```

#### Authentication Errors
```bash
# Verify tokens are set
echo $GITHUB_TOKEN
echo $SEMGREP_APP_TOKEN

# Test GitHub token
curl -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user
```

#### Permission Issues
```bash
# Fix script permissions
chmod +x .claude/solutions/memory-server.js

# Fix directory permissions
chmod -R 755 ~/.claude/mcp/
```

### Debug Mode

Enable debug logging:
```json
{
  "servers": {
    "example": {
      "command": "node",
      "args": ["server.js"],
      "env": {
        "DEBUG": "mcp:*"
      }
    }
  }
}
```

## Security Best Practices

1. **Token Management**
   - Never commit tokens to git
   - Use environment variables
   - Rotate tokens regularly
   - Use minimal permissions

2. **Server Isolation**
   - Run servers with minimal privileges
   - Use separate user if possible
   - Monitor resource usage
   - Review server logs

3. **Configuration Security**
   - Validate all server sources
   - Review server permissions
   - Audit configuration regularly
   - Use latest versions

## Maintenance

### Weekly Tasks
- Check for server updates
- Review error logs
- Update API tokens if needed
- Clean up old indexes

### Monthly Tasks
- Update all MCP servers
- Review security settings
- Optimize configurations
- Archive old logs

### Update Commands
```bash
# Update global packages
npm update -g @modelcontextprotocol/server-github
npm update -g @modelcontextprotocol/server-playwright

# Update local servers
cd ~/.claude/mcp/ref-tools-mcp && git pull && npm install && npm run build
cd ~/.claude/mcp/serena && git pull && npm install && npm run build
```

## Advanced Configuration

### Custom Server Development
See the MCP SDK documentation for creating custom servers.

### Performance Tuning
```json
{
  "servers": {
    "high-performance": {
      "command": "node",
      "args": ["--max-old-space-size=4096", "server.js"],
      "env": {
        "CACHE_SIZE": "1000",
        "WORKER_THREADS": "4"
      }
    }
  }
}
```

### Multi-Project Setup
Use different MCP configurations per project by placing `mcp-settings.json` in each project's `.claude-code` directory.