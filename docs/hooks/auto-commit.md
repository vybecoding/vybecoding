# Auto-Commit Hook Documentation

## Overview

The auto-commit hook automatically commits every successful code change to the current branch, providing a complete history of all Claude Code changes with detailed commit messages that include complexity tracking.

## Hook Configuration

**File**: `.claude/config/hooks/auto-commit-claude.sh`  
**Trigger**: After successful Edit/MultiEdit/Write operations  
**Configuration**: In `.claude/config/settings.json`:

```json
{
  "hooks": {
    "PostToolUse": {
      "Bash": "... && /home/happy/Projects/vybecoding/.claude/config/hooks/auto-commit-claude.sh && ..."
    }
  }
}
```

## Features

### 1. Automatic Commit Management
- Commits directly to the current branch
- Only commits successful changes (no errors)
- Skips commits if no changes are present

### 2. Formatted Commit Messages
- Format: `claude-01-[01/27 02:30PM]: update docs in hooks [SIMPLE:1 files]`
- Incremental numbering (claude-01, claude-02, etc.)
- Timestamp for each commit
- Concise description based on file type and location
- Complexity indicator (SIMPLE/MEDIUM/COMPLEX)

### 3. Error-Free Commits Only
- Only commits after successful Edit/MultiEdit/Write operations
- Skips commits if tool output contains error indicators
- Prevents broken code from being committed

### 4. Complexity Tracking
- `[SIMPLE:1 file]` - Single file, <50 lines
- `[MEDIUM:3 files]` - Multiple files, <200 lines
- `[COMPLEX:8 files]` - Many files or system-wide changes

## Installation

```bash
# Create the hook script
cat > .claude/config/hooks/auto-commit-claude.sh << 'EOF'
#!/bin/bash
# Auto-commit Claude changes to current branch

# Only process successful edits (no errors in output)
if [ "$TOOL_NAME" != "Edit" ] && [ "$TOOL_NAME" != "MultiEdit" ] && [ "$TOOL_NAME" != "Write" ]; then
    exit 0
fi

# Check if the tool output contains error indicators
if [ -n "${TOOL_OUTPUT:-}" ] && echo "$TOOL_OUTPUT" | grep -qE "(error|failed|Error|Failed|FAILED|ERROR)" 2>/dev/null; then
    exit 0
fi

# Check if there are any changes to commit
if [ -z "$(git status --porcelain 2>/dev/null)" ]; then
    exit 0
fi

# Get commit count
count_file=".claude-commit-count"
if [ -f "$count_file" ]; then
    count=$(cat "$count_file")
    count=$((count + 1))
else
    count=1
fi

# Format timestamp
timestamp=$(date +"%m/%d %I:%M%p" | sed 's/^0//' | sed 's/\/0/\//')

# Generate concise description from file path
file_path="${FILE_PATH:-unknown}"
basename=$(basename "$file_path" 2>/dev/null || echo "file")
dirname=$(dirname "$file_path" 2>/dev/null | xargs basename 2>/dev/null || echo "dir")

if [[ "$file_path" == *".md" ]]; then
    description="update docs in $dirname"
elif [[ "$file_path" == *"test"* ]]; then
    description="modify test $basename"
else
    description="edit $dirname/$basename"
fi

# Stage all changes
git add -A

# Analyze complexity
files_changed=$(git diff --cached --name-only 2>/dev/null | wc -l)
lines_changed=$(git diff --cached --numstat 2>/dev/null | awk '{added+=$1; deleted+=$2} END {print added+deleted}')

if [ "${files_changed:-0}" -le 2 ] && [ "${lines_changed:-0}" -le 50 ]; then
    complexity="SIMPLE"
elif [ "${files_changed:-0}" -le 5 ] && [ "${lines_changed:-0}" -le 200 ]; then
    complexity="MEDIUM"
else
    complexity="COMPLEX"
fi

# Create commit message
commit_msg="claude-$(printf "%02d" $count)-[$timestamp]: $description [$complexity:$files_changed files]"

# Create commit
git commit -m "$commit_msg" --no-verify

# Update commit counter
echo "$count" > "$count_file"

exit 0
EOF

chmod +x .claude/config/hooks/auto-commit-claude.sh

# Initialize commit counter
echo "0" > .claude-commit-count
```

## Usage

### View Claude Commits
```bash
# View all Claude commits in current branch
git log --oneline --grep="^claude-"

# View detailed Claude commits
git log --grep="^claude-" --format="%h %s" --date=short

# Count total Claude commits
git log --grep="^claude-" --oneline | wc -l
```

### Reset Counter
```bash
echo "0" > .claude-commit-count
```

### Filter Commits by Complexity
```bash
# View only SIMPLE commits
git log --grep="\\[SIMPLE:" --oneline

# View only COMPLEX commits
git log --grep="\\[COMPLEX:" --oneline
```

## Manual Control

### Disable Auto-Commit
Remove the hook from `.claude/config/settings.json`:
```json
{
  "hooks": {
    "PostToolUse": {
      "Bash": "... other hooks without auto-commit ..."
    }
  }
}
```

### Enable/Disable Temporarily
```bash
# Disable
mv .claude/config/hooks/auto-commit-claude.sh .claude/config/hooks/auto-commit-claude.sh.disabled

# Enable
mv .claude/config/hooks/auto-commit-claude.sh.disabled .claude/config/hooks/auto-commit-claude.sh
```

## Integration with Session Reviews

The auto-commit system integrates with session review generation:

```bash
# Generate comprehensive session review
.claude/solutions/generate-review.sh
```

Reviews include:
- All changes made (with complexity metrics)
- Files modified by type
- Solutions learned
- Recommendations for improvement

## Benefits

1. **Complete History**: Never lose any Claude-generated code
2. **Automatic Documentation**: Each commit describes what was changed
3. **Easy Rollback**: Revert any change easily with clear commit messages
4. **Progress Tracking**: See exactly what was done when
5. **Complexity Awareness**: Track when changes are getting too complex

## Best Practices

1. **Review Regularly**: Check Claude commits with `git log --grep="^claude-"`
2. **Monitor Complexity**: Watch for frequent COMPLEX commits as refactoring signals
3. **Reset Periodically**: Reset counter after major milestones
4. **Use with TRAIL**: Let auto-commit capture learning moments
5. **Filter by Type**: Use grep to find specific types of changes

## Troubleshooting

### Commits Not Appearing
1. Check hook is in settings.json
2. Verify git is initialized: `git status`
3. Ensure script has execute permissions
4. Test manually: `.claude/config/hooks/auto-commit-claude.sh`

### Too Many Commits
1. Auto-commit creates many small commits
2. Consider squashing related commits
3. Or use interactive rebase to clean history

### Counter Issues
1. Reset counter: `echo "0" > .claude-commit-count`
2. Check file permissions
3. Ensure .gitignore doesn't exclude it