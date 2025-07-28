# Sequential Thinking MCP

## Status: ✅ CONFIGURED

Configured to run via npx.

## Overview

Sequential Thinking MCP enhances Claude's problem-solving capabilities by enforcing step-by-step reasoning, breaking down complex problems into manageable sequential steps.

## Configuration

Located in `.claude/config/mcp-settings.json`:
```json
"sequential-thinking": {
  "command": "npx",
  "args": ["@modelcontextprotocol/server-sequential-thinking"]
}
```

## Features

### Structured Problem Solving
- Forces step-by-step breakdown
- Prevents jumping to conclusions
- Ensures thorough analysis
- Maintains logical flow

### Reasoning Chain
- Each step builds on previous
- Clear dependencies tracked
- Assumptions made explicit
- Logic gaps identified

### Complex Task Management
- Breaks down large problems
- Identifies sub-problems
- Orders tasks logically
- Tracks completion state

## Use Cases

### Algorithm Development
1. Problem definition
2. Input/output analysis
3. Edge case identification
4. Solution approach
5. Implementation steps
6. Optimization opportunities

### Debugging Workflows
1. Symptom identification
2. Hypothesis formation
3. Test design
4. Result analysis
5. Root cause isolation
6. Solution verification

### Architecture Design
1. Requirements analysis
2. Component identification
3. Interface definition
4. Data flow mapping
5. Integration planning
6. Testing strategy

## Benefits

### Improved Accuracy
- Reduces overlooked details
- Catches edge cases
- Validates assumptions
- Ensures completeness

### Better Communication
- Clear reasoning path
- Documented decisions
- Traceable logic
- Reviewable process

### Enhanced Learning
- Explicit knowledge gaps
- Clear dependencies
- Reusable patterns
- Transferable methods

## Integration

Works well with:
- **BMAD Method**: For story breakdown
- **Memory Server**: For pattern storage
- **REF Tools**: For documentation
- **GitHub MCP**: For code analysis

## When Claude Uses It

Automatically activated for:
- Complex algorithm design
- Multi-step debugging
- Architecture planning
- System analysis
- Problem decomposition

## Example Output

```
Step 1: Identify the core problem
- User authentication is failing intermittently
- Occurs only in production environment
- Started after recent deployment

Step 2: Gather relevant information
- Check error logs
- Review recent changes
- Identify affected users

Step 3: Form hypotheses
- Token expiration issue
- Database connection timeout
- Cache invalidation problem

[continues...]
```

## Best Practices

1. Let the process complete
2. Don't skip steps
3. Document assumptions
4. Verify each conclusion
5. Review the full chain

## Last Tested

January 28, 2025 - Configured via npx