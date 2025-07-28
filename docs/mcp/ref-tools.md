# REF Tools MCP

## Status: ✅ INSTALLED

Server installed at `~/.claude/mcp/ref-tools-mcp/`

## Overview

REF Tools MCP provides Claude with advanced documentation search and reference capabilities, optimized for finding specific technical information in project documentation.

## Location

- **Installation**: `~/.claude/mcp/ref-tools-mcp/`
- **Entry Point**: `~/.claude/mcp/ref-tools-mcp/dist/index.cjs`

## Configuration

Located in `.claude/config/mcp-settings.json`:
```json
"ref-mcp": {
  "command": "node",
  "args": ["${HOME}/.claude/mcp/ref-tools-mcp/dist/index.cjs"],
  "env": {
    "REF_DOCS_PATH": "./docs",
    "REF_MAX_RESULTS": "10"
  }
}
```

## Features

### Documentation Search
- Full-text search across docs
- Fuzzy matching for typos
- Context-aware ranking
- Code snippet extraction

### Reference Navigation
- API documentation lookup
- Configuration references
- Method signatures
- Parameter descriptions

### Smart Indexing
- Automatic documentation discovery
- Markdown parsing
- Code block identification
- Cross-reference linking

## Search Capabilities

1. **API References**
   - Function signatures
   - Parameter types
   - Return values
   - Usage examples

2. **Configuration Docs**
   - Setting descriptions
   - Default values
   - Environment variables
   - Schema definitions

3. **Guide Navigation**
   - Tutorial sections
   - How-to guides
   - Best practices
   - Troubleshooting

## Environment Settings

- `REF_DOCS_PATH`: Documentation directory (default: `./docs`)
- `REF_MAX_RESULTS`: Maximum search results (default: `10`)

## Usage Patterns

Claude uses REF Tools when you ask about:
- Specific API methods
- Configuration options
- Documentation sections
- Technical specifications
- Implementation details

## Integration Benefits

### Complements Other Tools
- **EXA Search**: For web content
- **GitHub MCP**: For code exploration
- **Memory Server**: For solutions
- **REF Tools**: For documentation

### Project Documentation
Automatically indexes:
- README files
- API documentation
- Configuration guides
- Architecture docs
- Setup instructions

## Best Practices

1. Keep documentation well-structured
2. Use clear headings and sections
3. Include code examples
4. Maintain up-to-date docs
5. Use standard markdown formatting

## Search Examples

- "How to configure authentication"
- "API endpoint for user creation"
- "Database connection settings"
- "Error handling best practices"
- "Deployment configuration"

## Last Tested

January 28, 2025 - Installation verified at expected location