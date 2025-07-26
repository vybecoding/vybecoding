# TRAIL System Installation Guide

## Overview
The TRAIL (Test, Resolve, And Intelligently Learn) system consists of 5 core scripts that work together to create an automatic test-and-learn system.

## Files in the TRAIL System

1. **verify-and-learn.sh** - Main orchestrator that:
   - Detects and runs test commands automatically
   - Implements 3-level debugging escalation
   - Logs solutions when tests pass

2. **playwright-debug.js** - Visual debugging script for Level 3 escalation
   - Opens browser with DevTools
   - Records traces, screenshots, console logs
   - Creates debug sessions

3. **memory-server.js** - MCP server for solution memory
   - Provides Claude access to past solutions
   - Enables searching through MCP tools

4. **search.sh** - Command-line solution search utility
   - Quick grep through solutions.log
   - Used for manual searches

5. **log-solution.sh** - Manual solution logging utility
   - For documenting solutions outside of automatic capture

## Installation Steps

### 1. Create the .solutions directory structure
```bash
mkdir -p .solutions
mkdir -p .solutions/debug
```

### 2. Create the scripts

Since these files were created locally and not from a GitHub repo, you need to recreate them. Here's how to back them up and restore them:

#### Backup existing TRAIL system:
```bash
# Create backup archive
tar -czf trail-system-backup.tar.gz .solutions/

# Or copy individual files
cp .solutions/verify-and-learn.sh ~/trail-backup/
cp .solutions/playwright-debug.js ~/trail-backup/
cp .solutions/memory-server.js ~/trail-backup/
cp .solutions/search.sh ~/trail-backup/
cp .solutions/log-solution.sh ~/trail-backup/
```

#### Restore TRAIL system to new project:
```bash
# From backup archive
tar -xzf trail-system-backup.tar.gz

# Or copy individual files
mkdir -p .solutions
cp ~/trail-backup/*.sh .solutions/
cp ~/trail-backup/*.js .solutions/
chmod +x .solutions/*.sh .solutions/*.js
```

### 3. Configure Claude Code hooks

Create or update `.claude-code/settings.json`:
```json
{
  "hooks": {
    "postToolUse": "export TOOL_NAME='{{toolName}}' TOOL_OUTPUT='{{toolOutput}}' TIMESTAMP='{{timestamp}}' FILE_PATH='{{filePath}}' && $(pwd)/.solutions/verify-and-learn.sh"
  }
}
```

### 4. Install dependencies (if using Playwright debugging)
```bash
npm install -D playwright
npx playwright install chromium
```

### 5. Initialize the system
```bash
# Create initial empty solutions log
touch .solutions/solutions.log

# Make all scripts executable
chmod +x .solutions/*.sh .solutions/*.js
```

## Creating TRAIL from scratch

If you need to recreate the TRAIL system in a new environment without access to the original files, you would need to:

1. Copy the content of each script from this project
2. Create new files with the same names
3. Make them executable
4. Configure the hooks

The key insight is that TRAIL is a local system - it's not downloaded from a repository but created and evolved within each project that uses it.

## Best Practice: Version Control

Add your TRAIL system to version control:
```bash
git add .solutions/
git commit -m "Add TRAIL test-and-learn system"
```

This ensures the TRAIL system travels with your project and can be restored if needed.