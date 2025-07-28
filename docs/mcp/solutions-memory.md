# Solutions Memory MCP

## Status: ✅ CONFIGURED

Uses the TRAIL system for intelligent solution storage and retrieval.

## Overview

Solutions Memory MCP is the MCP interface to the TRAIL (Test, Resolve, And Intelligently Learn) system, providing Claude with instant access to previously solved problems and their solutions.

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

## TRAIL System Integration

### Components
- **Memory Server**: `.claude/solutions/memory-server.js`
- **Solutions Database**: `.claude/solutions/solutions.log`
- **Search Utility**: `.claude/solutions/search.sh`
- **Learning Engine**: `.claude/solutions/continuous-learning.js`

### Automatic Workflow
1. Test fails → Error captured
2. Search local solutions
3. Apply if found, escalate if not
4. When fixed → Solution logged
5. Available instantly next time

## MCP Resources

### Available to Claude
- `@solutions-memory:all` - View all solutions
- `@solutions-memory:recent` - Recent solutions (last 20)
- `@solutions-memory:stats` - Learning statistics
- `@solutions-memory:search:[query]` - Search specific patterns

### Tools
- `search_solutions(query)` - Find matching solutions
- `get_solution_stats()` - View statistics
- `get_recent_solutions(limit)` - Get recent fixes

## Solution Format

```json
{
  "timestamp": "2025-07-28T20:00:00Z",
  "error": "TypeError: Cannot read property 'map' of undefined",
  "solution": "Added null check: items?.map() instead of items.map()",
  "context": {
    "file": "components/List.tsx",
    "line": 45,
    "testCommand": "npm test",
    "framework": "React"
  },
  "metadata": {
    "category": "null-safety",
    "language": "typescript",
    "fixTime": "30s",
    "automated": true
  }
}
```

## Features

### Intelligent Matching
- Fuzzy error matching
- Pattern recognition
- Context awareness
- Similarity scoring

### Categorization
- Error types
- Solution patterns
- Fix complexity
- Success rates

### Learning Metrics
- Solutions applied
- Success rate
- Time saved
- Pattern frequency

## Usage Examples

### When Claude Uses It
- "I've seen this error before..."
- "A similar issue was solved by..."
- "The TRAIL system suggests..."
- "Previous fix for this was..."

### Manual Search
```bash
# Search from command line
.claude/solutions/search.sh "TypeError"
.claude/solutions/search.sh "undefined"
.claude/solutions/search.sh "test failure"
```

## Benefits

### Development Speed
- Instant solution recall
- No repeated debugging
- Accumulated knowledge
- Pattern recognition

### Team Knowledge
- Shared solutions
- Consistent fixes
- Best practices
- Learning from mistakes

### Automation
- Automatic capture
- No manual documentation
- Context preserved
- Searchable history

## Integration Points

### With Hooks
- Post-test failures
- Pre-commit checks
- Continuous learning
- Error monitoring

### With Other MCPs
- **Playwright**: Visual debugging
- **GitHub**: Code context
- **REF Tools**: Documentation
- **Sequential Thinking**: Problem solving

## Statistics Example

```
Total Solutions: 147
Categories: 12
Success Rate: 94%
Avg Time Saved: 15 minutes/solution
Most Common: null-safety (23%)
Top Framework: React (45%)
```

## Best Practices

1. Let TRAIL capture automatically
2. Don't manually edit solutions.log
3. Search before debugging
4. Review patterns monthly
5. Share across projects

## Last Tested

January 28, 2025 - Configured and integrated with TRAIL system