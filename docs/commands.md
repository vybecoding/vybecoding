# Slash Commands

## /update-docs ✅

**Status**: ACTIVE - Tested January 28, 2025

Automatically updates all documentation files (READMEs, docs/*.md, CLAUDE.md) based on code changes.

### Usage
```
/update-docs
```

### Features
- Analyzes git changes and project structure
- Updates feature lists and installation instructions
- Synchronizes documentation with actual code
- Generates accurate file structures and API references
- Updates configuration documentation
- Maintains consistent documentation style

### What It Updates
- README.md files at all levels
- All files in docs/ directory
- CLAUDE.md project instructions
- Configuration examples
- Installation steps
- Feature lists
- API documentation

### Helper Script
For manual documentation analysis:
```bash
.claude/solutions/update-docs.sh
```

### Best Practices
1. Run after significant code changes
2. Review generated updates before committing
3. Ensure code is working before documenting
4. Keep existing custom documentation sections

### How It Works
1. Scans project structure
2. Analyzes recent git changes
3. Reads existing documentation
4. Identifies outdated sections
5. Generates updated content
6. Preserves custom sections
7. Maintains markdown formatting

### Example Output
```
📝 Updating documentation...
✅ Updated README.md - Added new API endpoints
✅ Updated docs/setup.md - Updated installation steps
✅ Updated CLAUDE.md - Added new hook configuration
📊 3 files updated, 0 errors
```

## Other Available Commands

### BMAD Method v4.33.0 Commands

**Core Agent Commands** (also available as sub-agents):
- `/dev` - Full stack development (James) - `bmad-dev`
- `/sm` - Story management (Stella) - `bmad-sm`
- `/qa` - Quality assurance (Quinn) - `bmad-qa`
- `/po` - Product owner (Olivia) - `bmad-po`
- `/pm` - Project manager (Parker) - `bmad-pm`

**Additional Agent Commands:**
- `/analyst` - Business requirements analysis
- `/architect` - System architecture design (Alex)
- `/ux-expert` - User experience design
- `/bmad-master` - Meta orchestration
- `/bmad-orchestrator` - Workflow coordination
- `/infra-devops-platform` - Infrastructure management

**Task Commands:**
- `/create-next-story` - Generate new user stories
- `/create-doc` - Create documentation
- `/correct-course` - Course correction guidance
- `/execute-checklist` - Run through task checklists
- `/facilitate-brainstorming-session` - Lead brainstorming
- `/shard-doc` - Split large documents
- `/validate-next-story` - Check story readiness

**BMAD Utilities:**
- Various task-specific commands in `.claude/commands/BMad/tasks/`
- Infrastructure tasks in `.claude/commands/bmadInfraDevOps/tasks/`

### Utility Commands
- `/memory` - Edit CLAUDE.md instructions
- `/compact` - Compact response mode
- `/save` - Persist session state

## Creating Custom Commands

Custom slash commands are markdown files in `.claude/commands/` directory.

### Example Structure
```markdown
# Command Name

Description of what the command does.

## Instructions
Detailed instructions for Claude to follow...
```

### Naming Convention
- File: `.claude/commands/my-command.md`
- Usage: `/my-command [arguments]`

### Best Practices
1. Keep commands focused on single tasks
2. Include clear success criteria
3. Specify output format
4. Handle error cases
5. Document required arguments