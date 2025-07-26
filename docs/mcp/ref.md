# REF MCP - Lightning-Fast Documentation Search

## Overview
REF MCP is a Model Context Protocol server that enables Claude to search technical documentation efficiently with 85% token reduction. It runs autonomously - you configure it once, and Claude uses it automatically when needed.

## Status
✅ **Installed**: ref-tools-mcp@3.0.0
✅ **Configured**: In `~/.config/claude/claude_desktop_config.json` with API key
✅ **Running**: Available to Claude automatically (no visible process)

## How REF MCP Actually Works

### Autonomous Operation
- **You don't control it** - Claude decides when to use it
- **No manual triggers** - Works based on Claude's judgment
- **Invisible process** - Runs on-demand, not persistently
- **No logs to check** - Operations happen inside Claude

### Token-Efficient Documentation Search
When Claude needs documentation:
1. Claude recognizes a documentation need
2. Internally calls REF MCP tools
3. REF extracts only relevant content (5k tokens vs 20k+)
4. Claude uses the results in its response

## When Claude Uses REF MCP

### Triggers
Claude typically uses REF when you ask about:
- Specific API methods or syntax
- Framework features and capabilities
- Error messages from documentation
- Code examples from official docs

### Example Patterns That Trigger REF

**API Questions**:
- "What's the Convex query syntax?"
- "How do I use Next.js middleware?"
- "What are the Clerk webhook methods?"

**Feature Inquiries**:
- "Does React 18 support X?"
- "What's new in Tailwind v4?"
- "Can Stripe handle Y?"

**Error Research**:
- "What causes hydration mismatch in Next.js?"
- "Why does TypeScript show error TS2339?"

## How to Get Better Results

### Phrase Questions for Documentation
❌ **Vague**: "How do I handle state?"
✅ **Specific**: "What's the React useState hook syntax?"

❌ **Generic**: "Database stuff in Convex"
✅ **Targeted**: "Convex query and mutation methods"

❌ **Broad**: "Authentication"
✅ **Framework-specific**: "Clerk authentication in Next.js app router"

### Include Context
- Mention the framework/library name
- Include version numbers when relevant
- Be specific about what you're trying to find

## What You'll Notice

### Signs REF is Working
- Claude provides exact API signatures
- Code examples match official documentation
- Specific version features are mentioned
- Less "typically" or "usually" language

### What You Won't See
- "Using REF MCP..." messages
- Process in `ps aux`
- Logs or debug output
- Any direct control

## REF vs Other Tools

| Tool | When Claude Uses It | You Control? |
|------|-------------------|--------------|
| **REF MCP** | Documentation queries | No |
| **WebFetch** | When you provide URLs | Yes (via URL) |
| **WebSearch** | General searches | No |
| **Read/Grep** | Local file access | Yes (via paths) |

## Common Misconceptions

### ❌ "I can test REF MCP"
You can't directly test it - only observe better documentation accuracy

### ❌ "I can force Claude to use REF"
Claude decides autonomously based on the query

### ❌ "REF searches everything"
It focuses on technical documentation, not general web

### ❌ "I need to configure searches"
REF works automatically once configured in Claude Desktop

## Reality Check

### What REF MCP Is
- An enhancement to Claude's knowledge
- Automatic documentation lookup
- Token-efficient information retrieval

### What REF MCP Isn't
- A tool you can invoke
- A search engine you control
- A visible running service

## Configuration Reference

Located in `~/.config/claude/claude_desktop_config.json`:
```json
"ref": {
  "command": "npx",
  "args": ["-y", "ref-tools-mcp@latest"],
  "env": {
    "REF_API_KEY": "ref-xxxxxxxxxx"
  }
}
```

## Summary

REF MCP enhances Claude's ability to provide accurate documentation:
- ✅ Works automatically in the background
- ✅ No action needed from you
- ✅ Improves documentation accuracy
- ✅ Reduces token usage by 85%

**Bottom line**: If it's configured, it's working. Ask documentation questions naturally, and Claude will use REF when appropriate.