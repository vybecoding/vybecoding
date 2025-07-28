# Serena MCP

## Status: ✅ INSTALLED

Server installed at `~/.claude/mcp/serena/`

## Overview

Serena MCP provides advanced code navigation and analysis capabilities, offering intelligent code search, dependency tracking, and project structure understanding.

## Location

- **Installation**: `~/.claude/mcp/serena/`
- **Dashboard**: http://localhost:24282/dashboard/

## Configuration

Located in `.claude/config/mcp-settings.json`:
```json
"serena": {
  "command": "/home/happy/snap/code-insiders/2046/.local/share/../bin/uv",
  "args": ["run", "--directory", "/home/happy/.claude/mcp/serena", "serena-mcp-server", "--project", "vybecoding"]
}
```

## Features

### Code Navigation
- Symbol search across project
- Go to definition
- Find all references
- Call hierarchy analysis
- Import/export tracking

### Project Understanding
- Dependency graphs
- Module relationships
- API surface analysis
- Code structure mapping
- Architecture visualization

### Intelligent Search
- Semantic code search
- Context-aware results
- Type-aware navigation
- Cross-file relationships
- Pattern matching

## Dashboard Features

Available at http://localhost:24282/dashboard/:
- Project overview
- File tree visualization
- Symbol index
- Dependency viewer
- Search interface

## Capabilities

### Language Support
- JavaScript/TypeScript
- Python
- Go
- Rust
- And more...

### Analysis Types
1. **Static Analysis**
   - Type information
   - Variable usage
   - Function calls
   - Class hierarchies

2. **Project Analysis**
   - Module dependencies
   - Package relationships
   - API boundaries
   - Code organization

3. **Search Features**
   - Fuzzy symbol search
   - Regex patterns
   - Semantic search
   - Contextual filtering

## Usage Patterns

Claude uses Serena when:
- Navigating large codebases
- Understanding project structure
- Finding symbol definitions
- Tracing dependencies
- Analyzing code relationships

## Integration Benefits

### Complements Other Tools
- **GitHub MCP**: Repository access
- **REF Tools**: Documentation
- **Serena**: Code intelligence
- **Memory Server**: Solution patterns

### Development Workflow
1. Understand existing code
2. Navigate implementations
3. Find usage examples
4. Trace dependencies
5. Refactor safely

## Project Configuration

Configured for: `vybecoding` project
- Indexes all source files
- Tracks dependencies
- Maps relationships
- Updates automatically

## Best Practices

1. Keep code well-organized
2. Use consistent naming
3. Document complex logic
4. Maintain clean imports
5. Regular reindexing

## Performance

- Initial indexing may take time
- Incremental updates are fast
- Caches results efficiently
- Minimal memory overhead

## Last Tested

January 28, 2025 - Installation verified, configured for vybecoding project