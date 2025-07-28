# GitHub MCP

## Status: ✅ CONFIGURED

GITHUB_TOKEN environment variable is set and the server is configured.

## Overview

The GitHub MCP server provides Claude with access to GitHub repositories, issues, pull requests, and other GitHub resources through the Model Context Protocol.

## Configuration

Located in `.claude/config/mcp-settings.json`:
```json
"github": {
  "command": "npx",
  "args": ["@modelcontextprotocol/server-github"],
  "env": {
    "GITHUB_TOKEN": "${GITHUB_TOKEN}"
  }
}
```

## Features

- Read repository contents
- Browse issues and pull requests
- Access commit history
- Search repositories
- View user and organization data

## Environment Setup

The GITHUB_TOKEN must be set in your environment:
```bash
export GITHUB_TOKEN="your-github-personal-access-token"
```

## Token Permissions

Required GitHub token scopes:
- `repo` - Full repository access
- `read:user` - Read user profile data
- `read:org` - Read organization data (if needed)

## Usage

Claude can automatically use GitHub MCP when you ask about:
- Repository contents
- Issue tracking
- Pull request status
- Code search across repos
- Commit history

## Security

- Token is stored as environment variable
- Never commit tokens to repositories
- Use fine-grained personal access tokens when possible
- Rotate tokens regularly

## Last Tested

January 28, 2025 - GITHUB_TOKEN verified as set