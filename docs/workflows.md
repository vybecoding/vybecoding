# Development Workflows

## BMAD Method Workflow

The BMAD (Business Model Agile Development) Method v4.33.0 is installed and provides structured story management through specialized agents.

### Installation Details
- **Version**: 4.33.0
- **Location**: `.bmad-core/` (core system) and `.bmad-infrastructure-devops/` (DevOps pack)
- **Commands**: Available in `.claude/commands/BMad/` and `.claude/commands/bmadInfraDevOps/`

### Available BMAD Agents

#### Core Development Agents
- `/dev` - Full stack development implementation
- `/sm` - Story Management: Creates and manages user stories
- `/qa` - Quality Assurance: Testing and validation
- `/po` - Product Owner: Requirements and prioritization
- `/pm` - Project Manager: Sprint planning and tracking

#### Specialized Agents
- `/analyst` - Business and technical analysis
- `/architect` - System architecture and design
- `/ux-expert` - User experience and interface design
- `/bmad-master` - Master orchestration for complex workflows
- `/bmad-orchestrator` - Workflow coordination
- `/infra-devops-platform` - Infrastructure and deployment (from DevOps pack)

### Task Commands

BMAD includes numerous task commands for specific operations:
- `/create-next-story` - Generate new user stories
- `/review-story` - Review and validate stories
- `/validate-next-story` - Check story readiness
- `/execute-checklist` - Run through task checklists
- `/document-project` - Generate project documentation
- `/create-doc` - Create specific documentation
- `/shard-doc` - Split large documents into manageable pieces
- `/index-docs` - Create documentation indices
- `/brownfield-create-story` - Stories for existing codebases
- `/advanced-elicitation` - Detailed requirement gathering

### Basic BMAD Workflow

1. **Start with Product Definition**
   ```
   /po
   Create a PRD for [your feature]
   ```

2. **Create Stories**
   ```
   /sm
   *create stories from the PRD
   ```

3. **Develop Implementation**
   ```
   /dev
   *load story [STORY-ID]
   *analyze
   [implement the story]
   ```

4. **Quality Assurance**
   ```
   /qa
   *test story [STORY-ID]
   ```

5. **Review and Deploy**
   ```
   /architect
   *review implementation
   ```

### Integration with VybeHacks

BMAD agents automatically integrate with:
- **TRAIL System**: All agents use `.claude/solutions/search.sh` before tasks
- **Auto-commit**: Changes are tracked with descriptive commit messages
- **Continuous Learning**: Patterns are shared across all agents
- **Security Hooks**: All operations go through security validation

### Best Practices

1. **Start with Stories**: Always begin with well-defined user stories
2. **Use Appropriate Agents**: Each agent has specific expertise
3. **Follow the Flow**: PO → SM → Dev → QA → Deploy
4. **Document Everything**: Use `/document-project` regularly
5. **Review Before Deploy**: Always have architect review major changes

### Slash Commands

All BMAD commands are available as slash commands in Claude Code:
- Type `/` to see available commands
- Commands are organized by category (agents, tasks)
- Each command loads the appropriate agent persona and context

### Configuration

BMAD configuration files are located in:
- `.bmad-core/` - Core framework and agents
- `.bmad-infrastructure-devops/` - DevOps specific tools
- `.claude/commands/BMad/` - Claude Code command definitions
- `.vscode/settings.json` - VS Code integration settings

The system is configured for:
- PRD sharding (multiple files for large requirements)
- Architecture sharding (modular documentation)
- GitHub Copilot integration
- Gemini CLI support

## TRAIL System Workflow

The TRAIL (Test, Resolve, And Intelligently Learn) system provides automatic testing and learning capabilities.

### Location
`.claude/solutions/` - Complete TRAIL implementation

### Features
- Automatic test execution after code changes
- Error pattern recognition and resolution
- Solution database with search capabilities
- Visual debugging with Playwright
- MCP memory server for solution access

### Usage
```bash
# Search for solutions
.claude/solutions/search.sh "error message"

# Manual verification and learning
.claude/solutions/verify-and-learn.sh

# Access via MCP
@solutions-memory:all
@solutions-memory:recent
```

## Continuous Integration

All workflows integrate with:
- Git auto-commit system
- Security validation hooks
- Continuous learning patterns
- Session tracking and reviews

Last Updated: January 28, 2025