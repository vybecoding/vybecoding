# Auto-Commit Hook

## Status: ✅ ACTIVE

The auto-commit hook is configured and running in PostToolUse hooks for Bash, Edit, and Write operations.

## Overview

This hook automatically creates git commits after Claude Code makes changes to files, providing a complete audit trail of AI-assisted development.

## Location

`.claude/hooks/auto-commit-claude.sh`

## Configuration

Configured in `.claude/settings.json` in PostToolUse hooks:
- Runs after Bash commands
- Runs after Edit/MultiEdit operations  
- Runs after Write operations

## Features

- Creates incremental commits with numbered prefixes (claude-01, claude-02, etc.)
- Includes timestamp in commit message
- Tracks complexity indicators: [SIMPLE], [MEDIUM], or [COMPLEX]
- Commits to main branch (no longer uses separate branch)
- Counter tracked in `.claude-commit-count`

## How It Works

1. After each file operation, the hook runs automatically
2. Checks if on main branch (skips if not)
3. Increments counter in `.claude-commit-count`
4. Creates commit with format: `claude-XX-[MM/DD HH:MMAM/PM]: operation details [COMPLEXITY:N files]`
5. Only commits when changes are error-free

## View Commits

```bash
# View all Claude commits
git log --oneline | grep "claude-"

# View with helper script
.claude/hooks/view-claude-commits.sh
```

## Manual Control

- **Disable**: Remove from hooks in `.claude/settings.json`
- **Reset counter**: `echo "0" > .claude-commit-count`
- **View current count**: `cat .claude-commit-count`

## Last Tested

January 28, 2025 - Configured in settings.json and active