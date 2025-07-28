# Memory Server MCP

## Status: ✅ EXISTS

Server file exists at `.claude/solutions/memory-server.js`

## Overview

The Memory Server MCP provides Claude with access to the TRAIL (Test, Resolve, And Intelligently Learn) system's solution database, enabling instant recall of previously solved problems.

## Location

- **Server**: `.claude/solutions/memory-server.js`
- **Solutions Database**: `.claude/solutions/solutions.log`

## Configuration

Located in `.claude/config/mcp-settings.json`:
```json
"solutions-memory": {
  "command": "node",
  "args": ["/home/happy/Projects/vybecoding/.claude/solutions/memory-server.js"],
  "env": {
    "SOLUTIONS_DIR": "/home/happy/Projects/vybecoding/.claude/solutions"
  }
}
```

## Features

### Solution Storage
- Stores error-solution pairs
- Tracks fix patterns
- Records test results
- Maintains context

### Intelligent Retrieval
- Fuzzy matching for similar errors
- Pattern recognition
- Context-aware suggestions
- Ranked by relevance

### Learning Integration
- Automatic solution capture
- Success tracking
- Pattern extraction
- Knowledge building

## MCP Resources

The server provides these resources to Claude:
- `@solutions-memory:all` - View all solutions
- `@solutions-memory:recent` - View recent solutions
- `@solutions-memory:search:[query]` - Search specific errors

## Tools Available

- `search_solutions` - Find solutions by error pattern
- `add_solution` - Record new solution (automatic)
- `get_stats` - View learning statistics

## Integration with TRAIL

1. **Error Detection**
   - Test runner captures failures
   - Extracts error messages
   - Searches memory first

2. **Solution Application**
   - Finds matching patterns
   - Suggests known fixes
   - Tracks success rate

3. **Continuous Learning**
   - Records new solutions
   - Updates patterns
   - Improves accuracy

## Usage Examples

Claude can access solutions when you:
- Encounter familiar errors
- Need debugging help
- Want to see past fixes
- Review solution patterns

## Database Format

Solutions are stored in JSON format:
```json
{
  "timestamp": "2025-07-28T12:00:00Z",
  "error": "TypeError: Cannot read property 'x' of undefined",
  "solution": "Added null check before accessing property",
  "file": "src/component.js",
  "testCommand": "npm test",
  "success": true
}
```

## Best Practices

1. Let TRAIL capture solutions automatically
2. Search before solving repeated errors
3. Review patterns periodically
4. Clean old/outdated solutions
5. Share solutions across projects

## Last Tested

January 28, 2025 - Server file verified to exist