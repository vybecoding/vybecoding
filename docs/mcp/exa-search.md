# EXA Search MCP - Technical Web Search API

## Overview
EXA Search MCP provides Claude with AI-optimized web search capabilities across multiple domains. Like all MCP tools, it operates autonomously - Claude decides when and how to use it based on your questions.

## Status
✅ **Installed**: exa-mcp-server@0.3.10
✅ **Configured**: In `.claude/config/mcp-settings.json` with API key
✅ **Environment**: EXA_API_KEY is set
✅ **Running**: Available to Claude automatically (no visible process)
✅ **Last Tested**: January 28, 2025

## How EXA Search Actually Works

### Autonomous Operation
- **Claude-controlled** - You can't trigger it directly
- **Intelligent selection** - Claude chooses which EXA tool to use
- **Invisible process** - Runs on-demand within Claude
- **No direct access** - You work through natural conversation

### Available Search Tools (Claude Chooses)
1. **web_search_exa** - General technical searches
2. **research_paper_search** - Academic content
3. **company_research** - Business information
4. **github_search** - Repository discovery
5. **linkedin_search** - Professional data
6. **wikipedia_search_exa** - Encyclopedic content
7. **deep_researcher** - Multi-source analysis
8. **crawling** - Specific URL extraction

## When Claude Uses EXA Search

### Common Triggers
Claude typically uses EXA when you ask about:
- Current tutorials or guides
- Latest framework features
- Community solutions
- GitHub examples
- Technical comparisons
- Industry trends

### Example Patterns That Trigger EXA

**Technical Searches**:
- "Find Next.js 14 tutorials with app router"
- "Search for React Server Components examples"
- "Latest Tailwind CSS v4 features"

**Problem Solving**:
- "Find solutions for [specific error]"
- "How are others handling [technical challenge]"
- "Best practices for [technology] in 2024"

**Discovery**:
- "Find GitHub repos using Next.js + Convex"
- "Alternative libraries to [library name]"
- "Companies using [technology stack]"

## How to Get Better Results

### Phrase Questions for Web Search
❌ **Too Broad**: "JavaScript stuff"
✅ **Specific**: "Modern JavaScript async patterns 2024"

❌ **No Context**: "Database errors"
✅ **Detailed**: "PostgreSQL connection timeout Next.js Vercel"

❌ **Outdated**: "React tutorials"
✅ **Current**: "React 18 tutorials with TypeScript"

### Include Temporal Context
- Add year: "2024" or "latest"
- Mention versions: "Next.js 14", "React 18"
- Specify recency: "recent", "new", "updated"

## What You'll Notice

### Signs EXA is Working
- Current information beyond training cutoff
- References to recent blog posts
- Links to actual GitHub repos
- Up-to-date community solutions

### What You Won't See
- "Searching with EXA..." messages
- Search progress indicators
- Direct search results listing
- Any control over search parameters

## EXA vs Other Claude Tools

| Tool | Best For | Claude Uses When |
|------|----------|------------------|
| **EXA Search** | Current tutorials, examples | You need recent information |
| **REF MCP** | Official documentation | You need API references |
| **WebSearch** | General queries | Basic web information |
| **WebFetch** | Specific URLs | You provide a link |

## Reality Check: EXA's Actual Value

### What EXA Adds
- Slightly better technical search results
- Multiple specialized search types
- Structured data extraction
- AI-optimized result ranking

### What It Doesn't Change
- You still can't control searches
- No transparency into what was searched
- Results integrated into Claude's response
- No direct access to raw results

### Cost Consideration
- EXA requires API credits
- Built-in WebSearch is free
- Evaluate if marginal improvement justifies cost

## Common Misconceptions

### ❌ "I can search with EXA directly"
Only Claude can invoke EXA tools

### ❌ "I can see what EXA searched"
Search operations are internal to Claude

### ❌ "EXA replaces web browsing"
It's a search tool, not a browser

### ❌ "More tools = better results"
Claude picks one tool - having 8 doesn't mean using all 8

## When EXA Actually Helps

### Good Use Cases
- Finding very recent tutorials
- Discovering GitHub examples
- Researching current best practices
- Technical trend analysis

### When It's Redundant
- Basic documentation (REF MCP handles this)
- General knowledge (Claude already knows)
- Specific URLs (use WebFetch)
- Historical information (built-in knowledge)

## Configuration Reference

Located in `~/.config/claude/claude_desktop_config.json`:
```json
"exa": {
  "command": "npx",
  "args": ["-y", "exa-mcp-server"],
  "env": {
    "EXA_API_KEY": "xxxxxxxxxx"
  }
}
```

## Summary

EXA Search MCP provides enhanced web search capabilities to Claude:
- ✅ Works automatically based on your questions
- ✅ No manual control or testing possible
- ✅ Provides current information
- ⚠️ Costs API credits
- ⚠️ Marginal improvement over free alternatives

**Bottom line**: Nice to have for current technical information, but not essential. If configured, Claude will use it when it judges web search would help answer your question.