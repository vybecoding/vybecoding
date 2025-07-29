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

### BMAD Method Commands
**Core Agent Commands:**
- `/dev` - Development agent (also available as sub-agent `bmad-dev`)
- `/sm` - Story management (also available as sub-agent `bmad-sm`)
- `/qa` - Quality assurance (also available as sub-agent `bmad-qa`)
- `/po` - Product owner (also available as sub-agent `bmad-po`)
- `/pm` - Project manager (also available as sub-agent `bmad-pm`)

**Task Commands:**
- `/create-next-story` - Generate new user stories
- `/review-story` - Review and validate stories
- `/validate-next-story` - Check story readiness
- `/execute-checklist` - Run through task checklists
- `/document-project` - Generate project documentation

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