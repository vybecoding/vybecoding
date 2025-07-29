# BMAD Method + Claude Code Sub-Agents Integration

This document explains how BMAD Method agents are integrated as Claude Code sub-agents for realistic, powerful development workflows.

## Architecture Overview

```
User → Claude Code (Primary Agent) → BMAD Sub-Agent → Claude Code → User
```

Claude Code acts as the primary agent and orchestrator, delegating specific tasks to specialized BMAD sub-agents based on your requests.

## Available BMAD Sub-Agents

### Core Development Agents

| Sub-Agent | Name | Purpose | Key Tools |
|-----------|------|---------|-----------|
| `bmad-dev` | James | Code implementation, debugging, refactoring | Read, Write, Edit, Bash |
| `bmad-sm` | Stella | Story creation and management | Read, Write, Edit, TodoWrite |
| `bmad-qa` | Quinn | Testing and quality assurance | Read, Write, Bash, Grep |
| `bmad-po` | Olivia | Product requirements and PRDs | Read, Write, TodoWrite |
| `bmad-architect` | Alex | System design and architecture | Read, Write, WebSearch |

### Specialized Agents

| Sub-Agent | Name | Purpose | Key Tools |
|-----------|------|---------|-----------|
| `bmad-doc-writer` | Dana | Documentation creation and updates | Read, Write, Edit, WebFetch |
| `bmad-pm` | Parker | Project management and planning | Read, Write, TodoWrite |
| `bmad-analyst` | Amy | Business and technical analysis | Read, Grep, WebSearch |
| `bmad-ux` | Uma | User experience design | Read, Write, WebFetch |
| `bmad-devops` | Devon | Infrastructure and deployment | Bash, Read, Write |

## How Sub-Agents Work

### 1. Automatic Delegation
Claude Code automatically selects the appropriate sub-agent based on your request:

```
You: "Create a user authentication story"
Claude Code → bmad-sm (recognizes story creation task)
```

### 2. Explicit Invocation
You can also explicitly request a specific agent:

```
You: "Have bmad-architect review the system design"
Claude Code → bmad-architect (explicit request)
```

### 3. Workflow Sequences
Claude Code orchestrates multiple agents for complex tasks:

```
You: "Implement the USER-001 story"
Claude Code → bmad-sm (load story)
         → bmad-dev (implement)
         → bmad-qa (test)
```

## Key Features

### Context Isolation
Each sub-agent has its own context window, preventing confusion and maintaining focus on specific tasks.

### Tool Specialization
Each agent only has access to tools relevant to their role, improving security and efficiency.

### TRAIL Integration
All BMAD sub-agents integrate with the TRAIL system:
```bash
.claude/solutions/search.sh "relevant pattern"
```

### Consistent Reporting
Sub-agents report back in structured formats that Claude Code can interpret and present clearly.

## Common Workflows

### 1. Story Creation Workflow
```
You: "Create stories from the authentication PRD"
Flow: Claude Code → bmad-po (load PRD) → bmad-sm (create stories)
```

### 2. Implementation Workflow
```
You: "Implement story USER-001"
Flow: Claude Code → bmad-sm (load) → bmad-dev (code) → bmad-qa (test)
```

### 3. Architecture Review
```
You: "Review the API architecture"
Flow: Claude Code → bmad-architect (review) → bmad-doc-writer (update docs)
```

### 4. Full Feature Workflow
```
You: "Build user authentication feature"
Flow: Claude Code → bmad-po (PRD) → bmad-architect (design) → bmad-sm (stories) → bmad-dev (implement) → bmad-qa (test)
```

## Best Practices

### 1. Let Claude Code Orchestrate
Don't try to manage agent sequences manually. Claude Code understands the workflows and will coordinate appropriately.

### 2. Provide Context
When starting a task, give Claude Code enough context:
```
Good: "Implement the USER-001 authentication story"
Better: "Implement the USER-001 authentication story from the auth epic"
```

### 3. Use Natural Language
The system understands natural requests:
- "Create a story for user login"
- "Test the authentication module"
- "Document the API endpoints"

### 4. Trust the Delegation
Claude Code knows which agent to use based on the task. You don't need to specify agents unless you have a specific preference.

## File Locations

- **Sub-Agent Definitions**: `.claude/agents/bmad-*.md`
- **BMAD Core Files**: `.bmad-core/`
- **Story Files**: As defined in your project structure
- **Documentation**: Various locations based on type

## Advantages Over Manual BMAD

1. **Automatic Orchestration**: No need to manually switch between agents
2. **Context Preservation**: Each agent maintains its own clean context
3. **Parallel Potential**: Claude Code can coordinate multiple agents
4. **Consistent Interface**: All interactions go through Claude Code
5. **Error Handling**: Claude Code manages agent failures gracefully

## Troubleshooting

### Agent Not Responding
- Check if the agent file exists in `.claude/agents/`
- Verify the agent name in the YAML frontmatter
- Ensure proper tools are specified

### Wrong Agent Selected
- Be more specific in your request
- Use explicit agent names when needed
- Check agent descriptions for trigger phrases

### Integration Issues
- Verify BMAD Method is installed (`.bmad-core/` exists)
- Check that sub-agent files have correct YAML format
- Ensure Claude Code has access to the agents directory

## Integration with VybeHacks

All BMAD sub-agents work seamlessly with:
- **TRAIL System**: Automatic solution learning
- **Auto-commit**: Git tracking of changes
- **Security Hooks**: Validation and sanitization
- **Continuous Learning**: Pattern recognition

## Summary

The BMAD + Claude Code sub-agent integration provides a powerful, realistic implementation of the BMAD Method that leverages Claude Code's native sub-agent capabilities. This approach maintains the benefits of specialized agents while adding automatic orchestration and context management.

Last Updated: January 28, 2025