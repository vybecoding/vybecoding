# TRAIL System Hook Documentation

## Overview

TRAIL (Test, Resolve, And Intelligently Learn) is an automated testing and learning system that runs after every code change. It automatically detects test failures, searches for solutions, and learns from successful fixes.

## Hook Configuration

**File**: `.claude/solutions/verify-and-learn.sh`  
**Trigger**: After every Bash command via PostToolUse hook  
**Configuration**: In `.claude/config/settings.json`:

```json
{
  "hooks": {
    "PostToolUse": {
      "Bash": "... && /home/happy/Projects/vybecoding/.claude/solutions/verify-and-learn.sh && ..."
    }
  }
}
```

## Features

### 1. Automatic Test Detection
- Detects test commands from package.json, Makefile, or file extensions
- Supports npm test, pytest, make test, and more
- Zero configuration required

### 2. Three-Level Intelligence
- **Level 1**: Check local solutions database (instant)
- **Level 2**: Web search for similar errors (5-10 seconds)
- **Level 3**: Playwright visual debugging (comprehensive)

### 3. Automatic Learning
- When tests pass after failing, the fix is automatically logged
- Solutions include full context: error, fix, and test results
- No manual documentation needed

### 4. Visual Debugging Mode
When triggered, Playwright:
- Opens browser with DevTools
- Records everything (video, screenshots, traces)
- Captures synchronized console logs and network activity
- Creates comprehensive debug session with all artifacts

## Installation

### Option 1: Copy from Existing Project
```bash
cp -r /path/to/existing/project/.solutions ./
chmod +x .claude/solutions/*.sh .claude/solutions/*.js
```

### Option 2: Create from Scratch
```bash
mkdir -p .claude/solutions/debug

# Create verify-and-learn.sh
cat > .claude/solutions/verify-and-learn.sh << 'EOF'
#!/bin/bash
# TRAIL system implementation
# [Full script content from VYBEHACKS-FROM-SCRATCH.md]
EOF

chmod +x .claude/solutions/verify-and-learn.sh
```

## Usage

### Search for Previous Solutions
```bash
# Search by error message
.claude/solutions/search.sh "TypeError"

# Search by keyword
.claude/solutions/search.sh "tailwind"

# Search by file
.claude/solutions/search.sh "config"
```

### View Debug Sessions
```bash
# List all debug sessions
ls -la .claude/solutions/debug/session_*/

# View trace
npx playwright show-trace .claude/solutions/debug/session_*/trace.zip

# View screenshots
open .claude/solutions/debug/screenshots/
```

### MCP Memory Access
When Claude Code starts with MCP enabled:
- `@solutions-memory:all` - View all solutions
- `@solutions-memory:recent` - View recent solutions
- Use tool `search_solutions` to find specific fixes

## Architecture

```
.claude/solutions/
├── verify-and-learn.sh    # Main testing & learning script
├── playwright-debug.js    # Visual debugging with Playwright
├── search.sh              # Search utility
├── memory-server.js       # MCP server
├── solutions.log          # Solution database
└── debug/                 # Visual debugging artifacts
    ├── session_*/         # Debug sessions with traces
    ├── screenshots/       # Error screenshots
    └── logs/             # Console & network logs
```

## How It Works

1. **Hook Triggers**: PostToolUse hook calls verify-and-learn.sh
2. **Test Detection**: Script identifies and runs appropriate test command
3. **Error Capture**: Extracts error messages from failed tests
4. **Solution Search**: 
   - First checks solutions.log for known fixes
   - If not found, searches web for similar errors
   - If still unresolved, launches Playwright debugging
5. **Learning**: When tests pass, logs the solution automatically

## Example Workflow

1. You edit a component that breaks tests
2. System automatically runs tests and detects failure
3. Searches local solutions - if found, shows you the fix
4. If not found, searches web for similar errors
5. If still unresolved, launches Playwright for visual debugging
6. When you fix it, the solution is automatically saved
7. Next time this error occurs, it's fixed instantly

## Integration with Continuous Learning

TRAIL integrates with the continuous learning system:
- Errors and solutions feed into pattern recognition
- Success rates tracked for different solution types
- Optimization suggestions generated automatically

## Troubleshooting

### Hook Not Triggering
1. Check `.claude/config/settings.json` includes the hook
2. Verify script permissions: `chmod +x .claude/solutions/*.sh`
3. Test manually: `.claude/solutions/verify-and-learn.sh`

### Tests Not Detected
1. Ensure test command is in package.json scripts
2. For Python, ensure pytest is installed
3. Check file extensions match expected patterns

### Solutions Not Found
1. Build up solution database over time
2. Use more specific search terms
3. Check solutions.log format is correct

## Best Practices

1. **Let It Run**: Don't interrupt the learning process
2. **Be Specific**: When searching, use exact error messages
3. **Review Sessions**: Periodically check debug artifacts
4. **Share Knowledge**: Export solutions.log for team sharing
5. **Clean Up**: Remove old debug sessions periodically