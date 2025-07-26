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
mkdir -p .solutions/debug
touch .solutions/solutions.log
```

### Step 2: Create Core Scripts

#### verify-and-learn.sh (Main Orchestrator)
```bash
cat > .solutions/verify-and-learn.sh << 'EOF'
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
chmod +x .solutions/verify-and-learn.sh
```

#### search.sh (Search Utility)
```bash
cat > .solutions/search.sh << 'EOF'
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
chmod +x .solutions/search.sh
```

#### log-solution.sh (Manual Solution Logger)
```bash
cat > .solutions/log-solution.sh << 'EOF'
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
chmod +x .solutions/log-solution.sh
```

### Step 3: Configure Claude Code Hooks
```bash
mkdir -p .claude-code
cat > .claude-code/settings.json << 'EOF'
{
  "hooks": {
    "postToolUse": "export TOOL_NAME='{{toolName}}' TOOL_OUTPUT='{{toolOutput}}' TIMESTAMP='{{timestamp}}' FILE_PATH='{{filePath}}' && $(pwd)/.solutions/verify-and-learn.sh"
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

Create `VERIFY-FIRST.md`:

```bash
cat > VERIFY-FIRST.md << 'EOF'
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

## 5. Complete VybeHacks Setup Script

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

# Create VERIFY-FIRST.md
echo "Creating VERIFY-FIRST.md..."
cat > VERIFY-FIRST.md << 'VERIFY'
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
mkdir -p .solutions/debug
touch .solutions/solutions.log

# Create all TRAIL scripts
cat > .solutions/verify-and-learn.sh << 'TRAIL'
#!/bin/bash
# [Full verify-and-learn.sh content from above]
TRAIL
chmod +x .solutions/verify-and-learn.sh

cat > .solutions/search.sh << 'SEARCH'
#!/bin/bash
# [Full search.sh content from above]
SEARCH
chmod +x .solutions/search.sh

cat > .solutions/log-solution.sh << 'LOG'
#!/bin/bash
# [Full log-solution.sh content from above]
LOG
chmod +x .solutions/log-solution.sh

# Configure hooks
echo "Configuring Claude Code hooks..."
mkdir -p .claude-code
cat > .claude-code/settings.json << 'HOOKS'
{
  "hooks": {
    "postToolUse": "export TOOL_NAME='{{toolName}}' TOOL_OUTPUT='{{toolOutput}}' TIMESTAMP='{{timestamp}}' FILE_PATH='{{filePath}}' && $(pwd)/.solutions/verify-and-learn.sh"
  }
}
HOOKS

echo "✅ All VybeHacks installed successfully!"
echo ""
echo "Next steps:"
echo "1. Install Playwright if needed: npm install -D playwright"
echo "2. Test TRAIL: .solutions/search.sh test"
echo "3. Read CLAUDE.md and VERIFY-FIRST.md"
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
2. **Create Archive**: `tar -czf vybehacks-backup.tar.gz CLAUDE.md VERIFY-FIRST.md .solutions/ .claude-code/`
3. **Cloud Backup**: Store the setup script in a Gist or cloud storage
4. **Documentation**: Keep this guide accessible

## Verification

After installation, verify everything works:

```bash
# Check files exist
ls -la CLAUDE.md VERIFY-FIRST.md
ls -la .solutions/
cat .claude-code/settings.json

# Test TRAIL search
.solutions/search.sh "test"

# Manually log a test solution
.solutions/log-solution.sh "Test error" "Test solution"
.solutions/search.sh "Test"
```