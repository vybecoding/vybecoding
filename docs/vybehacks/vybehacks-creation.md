# Creating All VybeHacks From Scratch

This guide shows how to recreate every VybeHack if your project is deleted or you're starting fresh.

## 1. CLAUDE.md Rules & Protocols

### Always-Latest Installation Rule

Create `CLAUDE.md` in your project root:

```bash
cat > CLAUDE.md << 'EOF'
# Installation Rule

**Always use @latest or pull latest when installing/updating any tools or dependencies.** This ensures you get the most recent versions with latest features and security fixes.
EOF
```

### Test Hygiene Protocol

Add to `CLAUDE.md`:

```bash
cat >> CLAUDE.md << 'EOF'

## Testing Best Practices

### Test File Organization
**Always create test files in a `__tests__` directory, never in the root folder.**
- Unit tests: `__tests__/unit/`
- Integration tests: `__tests__/integration/`
- Temporary tests: `__tests__/temp/`

### Temporary Test Cleanup
**For one-off tests or debugging:**
1. Create in `__tests__/temp/test-*.js`
2. After running successfully, delete immediately
3. If the test reveals a bug, move to appropriate test directory

### Example Structure
```
project/
├── __tests__/
│   ├── unit/
│   │   └── components.test.js
│   ├── integration/
│   │   └── api.test.js
│   └── temp/
│       └── test-debug-issue.js  ← Delete after use
├── src/
└── package.json
```

### Cleanup Command
Add to package.json:
```json
"scripts": {
  "test:cleanup": "rm -rf __tests__/temp/*"
}
```
EOF
```

### Important Instruction Reminders

Add to `CLAUDE.md`:

```bash
cat >> CLAUDE.md << 'EOF'

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.
EOF
```

## 2. TRAIL System (Test, Resolve, And Intelligently Learn)

### Step 1: Create Directory Structure
```bash
mkdir -p .claude/solutions/debug
touch .claude/solutions/solutions.log
```

### Step 2: Create Core Scripts

#### verify-and-learn.sh (Main Orchestrator)
```bash
cat > .claude/solutions/verify-and-learn.sh << 'EOF'
#!/bin/bash

# Test-and-Learn System with 3-Level Escalation
# Level 1: Check local solutions
# Level 2: Web search for errors  
# Level 3: Playwright visual debugging

SOLUTIONS_DIR="$(dirname "$0")"
SOLUTIONS_LOG="$SOLUTIONS_DIR/solutions.log"
DEBUG_DIR="$SOLUTIONS_DIR/debug"
PENDING_ERROR_FILE="$SOLUTIONS_DIR/.pending-error"
LAST_TEST_LOG="$SOLUTIONS_DIR/.last-test.log"

# Ensure debug directory exists
mkdir -p "$DEBUG_DIR"

# Function to detect test command
detect_test_command() {
    if [ -f "package.json" ] && grep -q '"test"' package.json; then
        echo "npm test"
    elif [ -f "Makefile" ] && grep -q '^test:' Makefile; then
        echo "make test"
    elif [ -f "pytest.ini" ] || [ -f "setup.py" ]; then
        echo "pytest"
    elif [ -f "go.mod" ]; then
        echo "go test ./..."
    else
        echo ""
    fi
}

# Function to extract error from test output
extract_error() {
    grep -E "(Error|ERROR|Failed|FAILED|✗|✕|FAIL)" "$LAST_TEST_LOG" | head -3 | tr '\n' ' '
}

# Function to search local solutions
search_local_solutions() {
    local error="$1"
    if [ -f "$SOLUTIONS_LOG" ]; then
        grep -A 10 -B 5 -i "$error" "$SOLUTIONS_LOG" 2>/dev/null
    fi
}

# Main logic - only run after Edit or MultiEdit
if [[ "$TOOL_NAME" == "Edit" || "$TOOL_NAME" == "MultiEdit" ]]; then
    TEST_CMD=$(detect_test_command)
    
    if [ -n "$TEST_CMD" ]; then
        echo "Running tests after edit..."
        
        # Run tests and capture output
        $TEST_CMD > "$LAST_TEST_LOG" 2>&1
        TEST_RESULT=$?
        
        if [ $TEST_RESULT -ne 0 ]; then
            # Tests failed - extract error
            ERROR=$(extract_error)
            echo "Test failed with error: $ERROR"
            
            # Level 1: Check local solutions
            echo "Level 1: Checking local solutions..."
            SOLUTION=$(search_local_solutions "$ERROR")
            
            if [ -n "$SOLUTION" ]; then
                echo "Found solution in database:"
                echo "$SOLUTION"
            else
                echo "No local solution found."
                echo "$ERROR" > "$PENDING_ERROR_FILE"
            fi
        else
            # Tests passed - check if we just fixed a pending error
            if [ -f "$PENDING_ERROR_FILE" ]; then
                FIXED_ERROR=$(cat "$PENDING_ERROR_FILE")
                echo "Solution found for: $FIXED_ERROR"
                
                # Log the solution
                cat >> "$SOLUTIONS_LOG" << SOLUTION
================================================================================
Timestamp: $(date -u +%Y-%m-%dT%H:%M:%SZ)
Error: $FIXED_ERROR
File: ${FILE_PATH:-unknown}
Solution Applied:
$TOOL_OUTPUT
Test Status: PASSED
================================================================================

SOLUTION
                rm "$PENDING_ERROR_FILE"
                echo "Solution logged successfully!"
            fi
        fi
    fi
fi

# Clean up old debug sessions (keep last 10)
if [ -d "$DEBUG_DIR" ]; then
    ls -t "$DEBUG_DIR" | grep "session_" | tail -n +11 | xargs -I {} rm -rf "$DEBUG_DIR/{}" 2>/dev/null
fi
EOF
chmod +x .claude/solutions/verify-and-learn.sh
```

#### search.sh (Search Utility)
```bash
cat > .claude/solutions/search.sh << 'EOF'
#!/bin/bash
# Search utility for solutions database

if [ -z "$1" ]; then
    echo "Usage: $0 <search-term>"
    exit 1
fi

SOLUTIONS_DIR="$(dirname "$0")"
SOLUTIONS_LOG="$SOLUTIONS_DIR/solutions.log"

if [ -f "$SOLUTIONS_LOG" ]; then
    echo "Searching for: $1"
    echo "=================="
    grep -i -A 10 -B 5 "$1" "$SOLUTIONS_LOG"
else
    echo "No solutions found yet. The system will build knowledge as you fix errors."
fi
EOF
chmod +x .claude/solutions/search.sh
```

#### log-solution.sh (Manual Solution Logger)
```bash
cat > .claude/solutions/log-solution.sh << 'EOF'
#!/bin/bash
# Manually log a solution

if [ $# -lt 2 ]; then
    echo "Usage: $0 <error-description> <solution-description>"
    exit 1
fi

SOLUTIONS_DIR="$(dirname "$0")"
SOLUTIONS_LOG="$SOLUTIONS_DIR/solutions.log"

ERROR="$1"
SOLUTION="$2"

cat >> "$SOLUTIONS_LOG" << EOF
================================================================================
Timestamp: $(date -u +%Y-%m-%dT%H:%M:%SZ)
Error: $ERROR
Solution: $SOLUTION
Logged: Manually
================================================================================

EOF

echo "Solution logged successfully!"
EOF
chmod +x .claude/solutions/log-solution.sh
```

### Step 3: Configure Claude Code Hooks
```bash
mkdir -p .claude-code
cat > .claude/settings.json << 'EOF'
{
  "hooks": {
    "postToolUse": "export TOOL_NAME='{{toolName}}' TOOL_OUTPUT='{{toolOutput}}' TIMESTAMP='{{timestamp}}' FILE_PATH='{{filePath}}' && $(pwd)/.claude/solutions/verify-and-learn.sh"
  }
}
EOF
```

## 3. Zero-Config Test Detection

This is built into the TRAIL system above. The `detect_test_command()` function automatically detects:
- npm test (from package.json)
- make test (from Makefile)
- pytest (Python projects)
- go test (Go projects)

No additional setup needed!

## 4. VERIFY-FIRST Protocol (Anti-Hallucination)

Create `vybehacks-creation.md`:

```bash
cat > vybehacks-creation.md << 'EOF'
# VERIFY-FIRST Protocol

## Core Rule: Verify Before Claiming

**NEVER claim something exists without checking first.**

### Anti-Hallucination Rules

1. **URLs & Links**
   - ❌ NEVER invent GitHub URLs or documentation links
   - ✅ ALWAYS verify with Grep/Read/WebFetch first
   - ✅ If unsure, say "I'll need to verify if this exists"

2. **File Paths & Commands**
   - ❌ NEVER assume installation paths or commands
   - ✅ ALWAYS check actual file locations with LS/Read
   - ✅ Test commands with Bash before documenting

3. **Features & Capabilities**
   - ❌ NEVER claim a tool has features without proof
   - ✅ ALWAYS check documentation or test first
   - ✅ Say "Let me verify that" instead of guessing

### Anti-Toxic-Positivity Rules

1. **Honest Limitations**
   - ❌ "This will definitely work!" (when untested)
   - ✅ "This should work, but let's test to confirm"
   - ✅ "I made an error - here's what actually exists"

2. **Realistic Timelines**
   - ❌ "This is super easy and quick!"
   - ✅ "This involves X steps and may take time"
   - ✅ "There might be complications with Y"

3. **Error Acknowledgment**
   - ❌ "Everything is perfect!"
   - ✅ "I found 3 issues we need to address"
   - ✅ "This failed - let me try a different approach"

### Implementation: Verification Hooks

Before documenting ANY external resource:
1. Use Grep to search for existing references
2. Use WebFetch to verify URLs return 200
3. Use Bash to test installation commands
4. Only document what you've verified exists

Before making ANY claims about functionality:
1. Read the actual source code
2. Test the feature if possible
3. Check documentation with WebFetch
4. Admit uncertainty when unsure

### Verification Checklist

Before stating facts:
- [ ] Did I verify this with a tool?
- [ ] Am I guessing or know for certain?
- [ ] Have I tested this claim?
- [ ] Am I being realistically cautious?
EOF
```

### Add VERIFY-FIRST rules to CLAUDE.md:

```bash
cat >> CLAUDE.md << 'EOF'

## Verification-First Development

**NEVER claim something exists without checking first.**

Before documenting ANY external resource:
1. Use Grep to search for existing references
2. Use WebFetch to verify URLs return 200
3. Use Bash to test installation commands
4. Only document what you've verified exists

Before making ANY claims about functionality:
1. Read the actual source code
2. Test the feature if possible
3. Check documentation with WebFetch
4. Admit uncertainty when unsure

## Anti-Toxic-Positivity Rules

1. **Be Realistic**: Don't say "This is easy!" - explain actual complexity
2. **Acknowledge Failures**: When something fails, say so clearly
3. **Show Limitations**: Be upfront about what might not work
4. **Test Before Claiming**: Never say "This will work" without testing
EOF
```

## 5. Additional Custom Hook VybeHacks

### Task Complete Audio Notification
```bash
cat > .claude/hooks/task-complete.sh << 'EOF'
#!/bin/bash
# Task completion audio notification
echo "[$(date)] task-complete.sh triggered from $PWD (PID: $$)" >> /tmp/claude-hooks.log
sleep 0.1
echo "Task complete"
sleep 0.1
aplay -q /usr/share/sounds/sound-icons/guitar-12.wav 2>/dev/null
sleep 1.925
aplay -q /usr/share/sounds/sound-icons/guitar-12.wav 2>/dev/null
EOF
chmod +x .claude/hooks/task-complete.sh
```

### Documentation Update Reminder
```bash
cat > .claude/hooks/doc-update-reminder.sh << 'EOF'
#!/bin/bash
# Documentation Update Reminder Hook
# Tracks code changes and reminds about documentation updates

# Only process file edits
if [ "$TOOL_NAME" != "Edit" ] && [ "$TOOL_NAME" != "MultiEdit" ] && [ "$TOOL_NAME" != "Write" ]; then
    exit 0
fi

# Skip if editing documentation files
if [[ "$FILE_PATH" == *.md ]]; then
    exit 0
fi

# Track changes in a temporary file
CHANGE_LOG="/tmp/vybecoding-changes.log"
echo "$(date): $FILE_PATH modified" >> "$CHANGE_LOG"

# Count non-doc file changes
CHANGE_COUNT=$(grep -v "\.md" "$CHANGE_LOG" 2>/dev/null | wc -l)

# Remind about documentation updates every 5 code changes
if [ "$CHANGE_COUNT" -ge 5 ]; then
    echo ""
    echo "📚 Documentation Reminder: You've made $CHANGE_COUNT code changes."
    echo "💡 Consider running /update-docs to update documentation!"
    echo ""
    
    # Reset counter
    > "$CHANGE_LOG"
fi
EOF
chmod +x .claude/hooks/doc-update-reminder.sh
```

### Story Orchestration Trigger
```bash
cat > .claude/hooks/story-orchestration-trigger.sh << 'EOF'
#!/bin/bash
# BMAD Story Orchestration Trigger Hook
# Automatically analyzes stories for parallel execution opportunities

# Check if this is a story file being edited
if [[ "${1:-}" == *".bmad-core/stories/"* ]] || [[ "${1:-}" == *"story"* ]]; then
    STORY_FILE="${1:-}"
    
    # Check if story is ready for development (not in draft)
    if [ -f "$STORY_FILE" ] && grep -q "Status: Ready for Development" "$STORY_FILE" 2>/dev/null; then
        echo "🚀 Story ready for development - Analyzing for parallel execution..."
        
        # Run orchestration analysis with timeout
        ANALYSIS=$(timeout 30s node .bmad-core/utils/bmad-orchestration-bridge.js analyze "$STORY_FILE" 2>&1)
        
        if [ $? -eq 0 ]; then
            # Extract parallelization score
            SCORE=$(echo "$ANALYSIS" | jq -r '.parallelizationOpportunity // 0' 2>/dev/null || echo 0)
            
            if [ "${SCORE:-0}" -gt 50 ]; then
                echo "⚡ High parallelization opportunity detected: ${SCORE}%"
                echo "💡 Suggestion: Use '*delegate' command in dev-enhanced agent for faster execution"
                
                # Log to TRAIL for pattern recognition (if log script exists)
                if [ -x ".claude/solutions/log-solution.sh" ]; then
                    echo "{\"type\":\"ORCHESTRATION_OPPORTUNITY\",\"story\":\"$STORY_FILE\",\"score\":$SCORE}" | .claude/solutions/log-solution.sh
                fi
            fi
        fi
    fi
fi

# Continue with normal execution
exit 0
EOF
chmod +x .claude/hooks/story-orchestration-trigger.sh
```

## 6. Complete VybeHacks Setup Script

Create a single script to set up all VybeHacks:

```bash
cat > setup-vybehacks.sh << 'EOF'
#!/bin/bash
# Complete VybeHacks Setup Script

echo "🧠 Setting up all VybeHacks..."

# Create CLAUDE.md
echo "Creating CLAUDE.md..."
cat > CLAUDE.md << 'CLAUDE'
# Installation Rule

**Always use @latest or pull latest when installing/updating any tools or dependencies.** This ensures you get the most recent versions with latest features and security fixes.

## Testing Best Practices

### Test File Organization
**Always create test files in a `__tests__` directory, never in the root folder.**
- Unit tests: `__tests__/unit/`
- Integration tests: `__tests__/integration/`
- Temporary tests: `__tests__/temp/`

### Cleanup Command
Add to package.json:
```json
"scripts": {
  "test:cleanup": "rm -rf __tests__/temp/*"
}
```

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.

## Verification-First Development

**NEVER claim something exists without checking first.**

Before documenting ANY external resource:
1. Use Grep to search for existing references
2. Use WebFetch to verify URLs return 200
3. Use Bash to test installation commands
4. Only document what you've verified exists

## Anti-Toxic-Positivity Rules

1. **Be Realistic**: Don't say "This is easy!" - explain actual complexity
2. **Acknowledge Failures**: When something fails, say so clearly
3. **Show Limitations**: Be upfront about what might not work
4. **Test Before Claiming**: Never say "This will work" without testing
CLAUDE

# Create vybehacks-creation.md
echo "Creating vybehacks-creation.md..."
cat > vybehacks-creation.md << 'VERIFY'
# VERIFY-FIRST Protocol

## Core Rule: Verify Before Claiming

**NEVER claim something exists without checking first.**

### Anti-Hallucination Rules

1. **URLs & Links**
   - ❌ NEVER invent GitHub URLs or documentation links
   - ✅ ALWAYS verify with Grep/Read/WebFetch first
   - ✅ If unsure, say "I'll need to verify if this exists"

2. **File Paths & Commands**
   - ❌ NEVER assume installation paths or commands
   - ✅ ALWAYS check actual file locations with LS/Read
   - ✅ Test commands with Bash before documenting

3. **Features & Capabilities**
   - ❌ NEVER claim a tool has features without proof
   - ✅ ALWAYS check documentation or test first
   - ✅ Say "Let me verify that" instead of guessing
VERIFY

# Setup TRAIL System
echo "Setting up TRAIL system..."
mkdir -p .claude/solutions/debug
touch .claude/solutions/solutions.log

# Create all TRAIL scripts
cat > .claude/solutions/verify-and-learn.sh << 'TRAIL'
#!/bin/bash
# [Full verify-and-learn.sh content from above]
TRAIL
chmod +x .claude/solutions/verify-and-learn.sh

cat > .claude/solutions/search.sh << 'SEARCH'
#!/bin/bash
# [Full search.sh content from above]
SEARCH
chmod +x .claude/solutions/search.sh

cat > .claude/solutions/log-solution.sh << 'LOG'
#!/bin/bash
# [Full log-solution.sh content from above]
LOG
chmod +x .claude/solutions/log-solution.sh

# Create additional custom hooks
echo "Creating additional VybeHack hooks..."
mkdir -p .claude/hooks

cat > .claude/hooks/task-complete.sh << 'TASK'
#!/bin/bash
# Task completion audio notification
echo "[$(date)] task-complete.sh triggered from $PWD (PID: $$)" >> /tmp/claude-hooks.log
sleep 0.1
echo "Task complete"
sleep 0.1
aplay -q /usr/share/sounds/sound-icons/guitar-12.wav 2>/dev/null
sleep 1.925
aplay -q /usr/share/sounds/sound-icons/guitar-12.wav 2>/dev/null
TASK
chmod +x .claude/hooks/task-complete.sh

cat > .claude/hooks/doc-update-reminder.sh << 'DOC'
#!/bin/bash
# Documentation Update Reminder Hook
# Only process file edits
if [ "$TOOL_NAME" != "Edit" ] && [ "$TOOL_NAME" != "MultiEdit" ] && [ "$TOOL_NAME" != "Write" ]; then
    exit 0
fi
# Skip if editing documentation files
if [[ "$FILE_PATH" == *.md ]]; then
    exit 0
fi
# Track changes in a temporary file
CHANGE_LOG="/tmp/vybecoding-changes.log"
echo "$(date): $FILE_PATH modified" >> "$CHANGE_LOG"
# Count non-doc file changes
CHANGE_COUNT=$(grep -v "\.md" "$CHANGE_LOG" 2>/dev/null | wc -l)
# Remind about documentation updates every 5 code changes
if [ "$CHANGE_COUNT" -ge 5 ]; then
    echo ""
    echo "📚 Documentation Reminder: You've made $CHANGE_COUNT code changes."
    echo "💡 Consider running /update-docs to update documentation!"
    echo ""
    > "$CHANGE_LOG"
fi
DOC
chmod +x .claude/hooks/doc-update-reminder.sh

cat > .claude/hooks/story-orchestration-trigger.sh << 'STORY'
#!/bin/bash
# BMAD Story Orchestration Trigger Hook
# Check if this is a story file being edited
if [[ "${1:-}" == *".bmad-core/stories/"* ]] || [[ "${1:-}" == *"story"* ]]; then
    STORY_FILE="${1:-}"
    if [ -f "$STORY_FILE" ] && grep -q "Status: Ready for Development" "$STORY_FILE" 2>/dev/null; then
        echo "🚀 Story ready for development - Analyzing for parallel execution..."
        ANALYSIS=$(timeout 30s node .bmad-core/utils/bmad-orchestration-bridge.js analyze "$STORY_FILE" 2>&1)
        if [ $? -eq 0 ]; then
            SCORE=$(echo "$ANALYSIS" | jq -r '.parallelizationOpportunity // 0' 2>/dev/null || echo 0)
            if [ "${SCORE:-0}" -gt 50 ]; then
                echo "⚡ High parallelization opportunity detected: ${SCORE}%"
                echo "💡 Suggestion: Use '*delegate' command in dev-enhanced agent for faster execution"
            fi
        fi
    fi
fi
exit 0
STORY
chmod +x .claude/hooks/story-orchestration-trigger.sh

# Configure hooks
echo "Configuring Claude Code hooks..."
mkdir -p .claude
cat > .claude/settings.json << 'HOOKS'
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|MultiEdit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "export TOOL_NAME='{{toolName}}' TOOL_OUTPUT='{{toolOutput}}' TIMESTAMP='{{timestamp}}' FILE_PATH='{{filePath}}' && $(pwd)/.claude/solutions/verify-and-learn.sh && $(pwd)/.claude/hooks/doc-update-reminder.sh && $(pwd)/.claude/hooks/story-orchestration-trigger.sh '{{filePath}}'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "$(pwd)/.claude/hooks/task-complete.sh"
          }
        ]
      }
    ]
  }
}
HOOKS

echo "✅ All VybeHacks installed successfully!"
echo ""
echo "Next steps:"
echo "1. Install Playwright if needed: npm install -D playwright"
echo "2. Test TRAIL: .claude/solutions/search.sh test"
echo "3. Read CLAUDE.md and vybehacks-creation.md"
EOF
chmod +x setup-vybehacks.sh
```

## Quick Install

To install all VybeHacks in a new project:

```bash
# Download and run the setup script
curl -o setup-vybehacks.sh https://your-backup-location/setup-vybehacks.sh
chmod +x setup-vybehacks.sh
./setup-vybehacks.sh
```

Or if you have this file, just run:
```bash
./setup-vybehacks.sh
```

## Backup Strategy

1. **Add to Git**: Always commit these files to your repository
2. **Create Archive**: `tar -czf vybehacks-backup.tar.gz CLAUDE.md vybehacks-creation.md .claude/solutions/ .claude/config/`
3. **Cloud Backup**: Store the setup script in a Gist or cloud storage
4. **Documentation**: Keep this guide accessible

## Verification

After installation, verify everything works:

```bash
# Check files exist
ls -la CLAUDE.md vybehacks-creation.md
ls -la .claude/solutions/
cat .claude/settings.json

# Test TRAIL search
.claude/solutions/search.sh "test"

# Manually log a test solution
.claude/solutions/log-solution.sh "Test error" "Test solution"
.claude/solutions/search.sh "Test"
```