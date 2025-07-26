# BMAD Method Enhancements

This document describes the `.bmad/` enhancement structure for extending BMAD's capabilities without introducing framework conflicts.

## Directory Structure

```
.bmad/
├── personas/          # Specialized agent personas
├── templates/         # Reusable agent templates
├── workflows/         # Multi-agent workflow recipes
└── context/          # Shared context management
```

## 1. Personas Directory

### Purpose
Store specialized agent personas that extend BMAD's core agents for specific domains.

### Examples
- `security-auditor.md` - Security-focused analysis agent
- `performance-optimizer.md` - Performance tuning specialist
- `api-designer.md` - API design and documentation expert
- `accessibility-reviewer.md` - A11y compliance checker

### Usage
```markdown
# In your BMAD workflow
"Use the security-auditor persona for the Analyst agent"
```

## 2. Templates Directory

### Purpose
Reusable templates for common agent patterns that can be adapted for different projects.

### Examples
- `research-agent.md` - Deep codebase analysis template
- `review-agent.md` - Code review workflow template
- `migration-agent.md` - Refactoring and migration template
- `testing-agent.md` - Test creation and validation template

### Structure
Each template includes:
- Agent role definition
- Input requirements
- Output specifications
- Workflow steps
- Success criteria

## 3. Workflows Directory

### Purpose
Pre-defined multi-agent sequences for common development tasks.

### Examples
```yaml
# security-audit.workflow
name: Security Audit Workflow
agents:
  - analyst: security-auditor
  - architect: security-architect
  - dev: security-remediator
steps:
  1: Analyst performs vulnerability assessment
  2: Architect designs security improvements
  3: Dev implements security fixes
  4: QA validates security measures
```

### Benefits
- Consistent approach to complex tasks
- Reusable across projects
- Clear handoff points between agents
- Built-in quality gates

## 4. Context Directory

### Purpose
Manage persistent context that needs to be shared across agent interactions.

### Files
- `team-context.md` - Overall project context
- `technical-decisions.md` - Architecture choices
- `api-contracts.md` - API specifications
- `domain-glossary.md` - Business terminology

### Context Loading Pattern
```markdown
@links: [
  ".bmad/context/team-context.md",
  ".bmad/context/technical-decisions.md"
]
```

## Integration Guidelines

### 1. Start Simple
- Begin with BMAD's core agents
- Add enhancements only when needed
- One enhancement at a time

### 2. Avoid Conflicts
- Never duplicate BMAD's core functionality
- Enhancements should complement, not replace
- Keep clear separation of concerns

### 3. Document Usage
- Each enhancement needs clear documentation
- Include examples of when to use
- Specify prerequisites and dependencies

### 4. Test Integration
- Verify enhancement works with BMAD
- Check for agent handoff issues
- Validate output quality

## Cherry-Picked Enhancements

### From PRPs
- `/create-base-prp` command for structured planning
- `/execute-base-prp` command for systematic execution
- Context-first development approach
- Progressive validation patterns

### From SuperClaude (Ideas Only)
- Specialized persona concept
- Domain-specific agent variations
- Smart routing between personas

### From Ultra Wide Turbo (Ideas Only)
- Multi-agent workflow patterns
- Context cascade between teams
- Structured handoff protocols

## Future Enhancements

### Potential Additions
1. **Metrics Tracking** - Agent performance analytics
2. **Decision Logs** - Automatic decision documentation
3. **Error Patterns** - Common error solutions
4. **Code Standards** - Project-specific guidelines

### Integration with Other Tools
- Serena MCP for semantic code understanding
- TRAIL system for error learning
- REF MCP for documentation search

## Best Practices

### DO
- Keep enhancements modular
- Document all customizations
- Test before deploying
- Share successful patterns

### DON'T
- Create competing orchestration
- Overcomplicate workflows
- Mix multiple frameworks
- Ignore BMAD's core design

## Maintenance

### Regular Reviews
- Monthly assessment of enhancement usage
- Remove unused enhancements
- Update based on team feedback
- Share improvements upstream

### Version Control
- Track all enhancements in git
- Tag stable enhancement sets
- Document breaking changes
- Maintain compatibility

This structure ensures BMAD remains the central orchestrator while allowing flexible, project-specific enhancements that improve productivity without adding confusion.