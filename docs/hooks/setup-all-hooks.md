# Complete Hook Setup Guide

## Overview

This guide provides step-by-step instructions for setting up all Claude Code hooks in the vybecoding project. Following this guide will enable all automation, security, and learning features.

## Prerequisites

- Node.js installed
- Git repository initialized
- Claude Code with hooks support
- Write permissions to project directory

## Complete Setup Script

Save and run this script to set up all hooks at once:

```bash
#!/bin/bash
# Complete hook setup for vybecoding

echo "🚀 Starting complete hook setup..."

# Create directory structure
mkdir -p .claude/config/hooks
mkdir -p .claude/solutions/debug
mkdir -p .claude/solutions/security

# Install required npm packages
echo "📦 Installing required packages..."
npm install -D dompurify jsdom validator safe-compare playwright

# Create main settings.json
echo "⚙️ Configuring Claude Code hooks..."
cat > .claude/settings.json << 'EOF'
{
  "hooks": {
    "PostToolUse": {
      "Bash": "export TOOL_NAME='{{toolName}}' TOOL_OUTPUT='{{toolOutput}}' TIMESTAMP='{{timestamp}}' FILE_PATH='{{filePath}}' && /home/happy/Projects/vybecoding/.claude/config/hooks/sanitize-env.sh && /home/happy/Projects/vybecoding/.claude/solutions/verify-and-learn.sh && /home/happy/Projects/vybecoding/.claude/config/hooks/auto-commit-claude.sh && /home/happy/Projects/vybecoding/.claude/config/hooks/continuous-learning-trigger.sh",
      "Edit": "export FILE_PATH='{{filePath}}' && /home/happy/Projects/vybecoding/.claude/config/hooks/sanitize-env.sh && /home/happy/Projects/vybecoding/.claude/config/hooks/post-edit-sanitize.js '{{filePath}}' && /home/happy/Projects/vybecoding/.claude/config/hooks/story-orchestration-trigger.sh '{{filePath}}'"
    }
  }
}
EOF

# Create environment sanitization hook
echo "🔒 Creating security hooks..."
cat > .claude/config/hooks/sanitize-env.sh << 'EOF'
#!/bin/bash
# Sanitize environment variables to prevent injection

# Remove potentially dangerous characters from variables
export TOOL_NAME=$(echo "$TOOL_NAME" | sed 's/[;&|`$]//g')
export TOOL_OUTPUT=$(echo "$TOOL_OUTPUT" | head -c 10000)
export FILE_PATH=$(echo "$FILE_PATH" | sed 's/[;&|`$]//g')

# Validate file paths
if [[ ! "$FILE_PATH" =~ ^[a-zA-Z0-9/_.-]+$ ]]; then
    echo "Warning: Invalid file path detected"
    exit 1
fi

exit 0
EOF

# Create auto-commit hook
echo "📝 Creating auto-commit hook..."
cat > .claude/config/hooks/auto-commit-claude.sh << 'EOF'
#!/bin/bash
# Auto-commit Claude changes to separate branch

# Get current branch
original_branch=$(git rev-parse --abbrev-ref HEAD)

# Create/checkout claude branch
git checkout -B claude 2>/dev/null || git checkout claude

# Get commit count
count_file=".claude-commit-count"
if [ -f "$count_file" ]; then
    count=$(cat "$count_file")
    count=$((count + 1))
else
    count=1
fi
echo "$count" > "$count_file"

# Format timestamp
timestamp=$(date +"%m/%d %I:%M%p")

# Create commit message
commit_msg="claude-$(printf "%02d" $count)-[$timestamp]: ${TOOL_NAME} ${FILE_PATH}"

# Add and commit changes
git add -A
git commit -m "$commit_msg" 2>/dev/null

# Return to original branch
git checkout "$original_branch" 2>/dev/null

exit 0
EOF

# Create continuous learning trigger
echo "🧠 Creating continuous learning hook..."
cat > .claude/config/hooks/continuous-learning-trigger.sh << 'EOF'
#!/bin/bash
# Trigger continuous learning analysis

# Only run periodically to avoid overhead
LAST_RUN_FILE=".claude/solutions/.last-learning-run"
CURRENT_TIME=$(date +%s)

if [ -f "$LAST_RUN_FILE" ]; then
    LAST_RUN=$(cat "$LAST_RUN_FILE")
    TIME_DIFF=$((CURRENT_TIME - LAST_RUN))
    
    # Run every 10 tool uses or 30 minutes
    if [ "$TIME_DIFF" -lt 1800 ]; then
        exit 0
    fi
fi

echo "$CURRENT_TIME" > "$LAST_RUN_FILE"

# Run analysis in background
node .claude/solutions/continuous-learning.js analyze > /dev/null 2>&1 &

exit 0
EOF

# Create post-edit sanitization
echo "🛡️ Creating XSS prevention hook..."
cat > .claude/config/hooks/post-edit-sanitize.js << 'EOF'
#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const DOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const filePath = process.argv[2];
if (!filePath) process.exit(0);

// Only process HTML/JS files
const ext = path.extname(filePath).toLowerCase();
if (!['.html', '.htm', '.js', '.jsx', '.tsx'].includes(ext)) {
    process.exit(0);
}

try {
    const content = fs.readFileSync(filePath, 'utf8');
    const window = new JSDOM('').window;
    const purify = DOMPurify(window);
    
    // Check for potential XSS
    if (content.includes('innerHTML') && !content.includes('DOMPurify')) {
        console.warn(`Warning: Direct innerHTML usage in ${filePath} - consider using DOMPurify`);
    }
    
    // For HTML files, sanitize content
    if (['.html', '.htm'].includes(ext)) {
        const clean = purify.sanitize(content);
        if (clean !== content) {
            console.warn(`Security: Potentially unsafe HTML detected in ${filePath}`);
        }
    }
} catch (error) {
    // Fail silently to not interrupt workflow
}

process.exit(0);
EOF

# Create story orchestration trigger
echo "📋 Creating orchestration hooks..."
cat > .claude/config/hooks/story-orchestration-trigger.sh << 'EOF'
#!/bin/bash
# Detect and trigger story orchestration

FILE_PATH="$1"

# Check if this is a story file
if [[ "$FILE_PATH" == *"stories"* ]] || [[ "$FILE_PATH" == *"story"* ]]; then
    echo "📋 Story file detected: $FILE_PATH"
    
    # Extract story ID
    STORY_ID=$(basename "$FILE_PATH" .md)
    
    # Check if story is ready for development
    if grep -q "Ready for Development" "$FILE_PATH" 2>/dev/null; then
        echo "✅ Story is ready for development"
        echo "🤖 Activating dev-enhanced agent..."
        
        # Trigger analysis
        echo "ORCHESTRATE:$STORY_ID" > .claude/solutions/orchestration-queue
    fi
fi

exit 0
EOF

# Create view commits helper
echo "📊 Creating helper scripts..."
cat > .claude/config/hooks/view-claude-commits.sh << 'EOF'
#!/bin/bash
# View all Claude auto-commits

echo "=== Claude Auto-Commits ==="
echo

if git show-ref --verify --quiet refs/heads/claude; then
    git log claude --oneline --graph --decorate
else
    echo "No claude branch found. Auto-commits will start with your next change."
fi

echo
echo "Total commits: $(git rev-list --count claude 2>/dev/null || echo 0)"
echo "Latest commit: $(git log -1 --format=%cd claude 2>/dev/null || echo 'None')"
EOF

# Create TRAIL system components
echo "🔍 Setting up TRAIL system..."
# Copy from existing project or use the full script from VYBEHACKS-FROM-SCRATCH.md
if [ -f "/path/to/existing/project/.claude/solutions/verify-and-learn.sh" ]; then
    cp -r /path/to/existing/project/.claude/solutions/* .claude/solutions/
else
    echo "⚠️  TRAIL system scripts need to be created manually"
    echo "See docs/vybehacks/VYBEHACKS-FROM-SCRATCH.md for complete scripts"
fi

# Make all scripts executable
echo "🔧 Setting permissions..."
chmod +x .claude/config/hooks/*.sh
chmod +x .claude/config/hooks/*.js
chmod +x .claude/solutions/*.sh
chmod +x .claude/solutions/*.js

# Initialize required files
echo "📁 Initializing data files..."
echo "0" > .claude-commit-count
echo "[]" > .claude/solutions/story-patterns.json
echo "[]" > .claude/solutions/security-patterns.json
echo "{}" > .claude/solutions/session-context.json
touch .claude/solutions/solutions.log
touch .claude/solutions/orchestration-queue
mkdir -p .claude/solutions/security
touch .claude/solutions/security/living-off-ai-alerts.log

# Git configuration
echo "🔀 Configuring git..."
git config --local branch.claude.description "Auto-commits from Claude Code"

# Create .gitignore entries
echo "📝 Updating .gitignore..."
cat >> .gitignore << 'EOF'

# Claude Code
.claude-commit-count
.claude/solutions/debug/
.claude/solutions/.last-learning-run
.claude/solutions/session-*.json
.claude/solutions/orchestration-queue
EOF

echo "✅ Hook setup complete!"
echo
echo "🎯 Next steps:"
echo "1. Restart Claude Code to activate hooks"
echo "2. Test with a simple file edit"
echo "3. Check auto-commits with: .claude/config/hooks/view-claude-commits.sh"
echo "4. Search solutions with: .claude/solutions/search.sh 'keyword'"
echo
echo "📚 Documentation:"
echo "- Overview: docs/hooks/overview.md"
echo "- TRAIL System: docs/hooks/trail-system.md"
echo "- Security: docs/hooks/security-hooks.md"
```

## Manual Setup Steps

If you prefer to set up hooks manually:

### 1. Create Directory Structure
```bash
mkdir -p .claude/config/hooks
mkdir -p .claude/solutions/debug
mkdir -p .claude/solutions/security
```

### 2. Install Dependencies
```bash
npm install -D dompurify jsdom validator safe-compare playwright
```

### 3. Create Each Hook
Create each hook file from the examples in the individual documentation:
- [Environment Sanitization](./security-hooks.md)
- [TRAIL System](./trail-system.md)
- [Auto-Commit](./auto-commit.md)
- [Continuous Learning](./continuous-learning.md)
- [Orchestration](./orchestration-hooks.md)

### 4. Configure settings.json
Update `.claude/settings.json` with your hook configuration.

### 5. Set Permissions
```bash
chmod +x .claude/config/hooks/*.sh
chmod +x .claude/solutions/*.sh
```

### 6. Initialize Files
```bash
echo "0" > .claude-commit-count
echo "[]" > .claude/solutions/story-patterns.json
touch .claude/solutions/solutions.log
```

## Verification

After setup, verify everything is working:

### 1. Test Basic Hook
```bash
# Make a simple edit to trigger hooks
echo "// test" >> test.js
rm test.js
```

### 2. Check Auto-Commits
```bash
.claude/config/hooks/view-claude-commits.sh
```

### 3. Verify TRAIL System
```bash
# Run a test that fails
npm test

# Check if solution was captured
tail .claude/solutions/solutions.log
```

### 4. Check Security Alerts
```bash
tail -f .claude/solutions/security/living-off-ai-alerts.log
```

## Troubleshooting

### Hooks Not Running
1. Ensure Claude Code has hooks enabled
2. Check settings.json syntax
3. Verify script permissions: `ls -la .claude/config/hooks/`
4. Test hooks manually

### Permission Errors
```bash
# Fix all permissions
find .claude/config/hooks -name "*.sh" -exec chmod +x {} \;
find .solutions -name "*.sh" -exec chmod +x {} \;
```

### Path Issues
1. Use absolute paths in settings.json
2. Update paths if project moves
3. Check working directory: `pwd`

### Missing Dependencies
```bash
# Reinstall all dependencies
npm install -D dompurify jsdom validator safe-compare playwright
```

## Maintenance

### Weekly Tasks
- Review security alerts
- Check learning reports
- Clean old debug sessions

### Monthly Tasks
- Archive old session files
- Update pattern databases
- Review hook performance

### Updates
- Check for new hook features
- Update security patterns
- Optimize hook chains

## Additional Resources

- [Hook Overview](./overview.md)
- [TRAIL System Details](./trail-system.md)
- [Security Best Practices](./security-hooks.md)
- [VYBEHACKS Creation Guide](../vybehacks/vybehacks-creation.md)