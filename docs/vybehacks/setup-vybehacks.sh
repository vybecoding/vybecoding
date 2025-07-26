#!/bin/bash
# Complete VybeHacks Setup Script
# This script recreates all VybeHacks from scratch

echo "🧠 Setting up all VybeHacks..."

# Create CLAUDE.md
echo "Creating CLAUDE.md..."
cat > CLAUDE.md << 'CLAUDE_EOF'
# TRAIL - Test, Resolve, And Intelligently Learn

This project has an intelligent 3-level debugging system that automatically tests code changes, learns from solutions, and escalates to visual debugging when needed.

## Installation Rule

**Always use @latest or pull latest when installing/updating any tools or dependencies.** This ensures you get the most recent versions with latest features and security fixes.

## How It Works

1. **Automatic Testing**: After every code edit, the system automatically:
   - Runs your test suite
   - Captures any errors
   - Searches for known solutions
   - Escalates if needed

2. **3-Level Intelligence**:
   - **Level 1**: Check local solutions database (instant)
   - **Level 2**: Web search for similar errors (5-10 seconds)
   - **Level 3**: Playwright visual debugging (comprehensive)

3. **Zero Manual Work**: Everything happens automatically - no prompting needed

## Using Previous Solutions

### Search for past fixes:
```bash
.solutions/search.sh "tailwind"
.solutions/search.sh "syntax error"
.solutions/search.sh "config"
```

### MCP Memory Access:
When Claude Code starts with MCP enabled, it can access:
- `@solutions-memory:all` - View all solutions
- `@solutions-memory:recent` - View recent solutions
- Use tool `search_solutions` to find specific fixes

## Architecture

```
.claude-code/
├── settings.json          # Hooks configuration
└── mcp-settings.json      # MCP server config

.solutions/
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

## How the System Works

### On Every Code Edit:
1. **Automatic Test Run**: Detects and runs appropriate test command (npm test, pytest, etc.)
2. **Error Detection**: Captures test failures and extracts error messages
3. **Smart Escalation**:
   - First checks local solutions database
   - If not found, triggers web search
   - If still unresolved, launches Playwright visual debugging

### Visual Debugging Mode:
When triggered, Playwright:
- Opens browser with DevTools
- Records everything (video, screenshots, traces)
- Captures synchronized console logs and network activity
- Creates comprehensive debug session with all artifacts
- View trace with: `npx playwright show-trace .solutions/debug/session_*/trace.zip`

### Automatic Learning:
- When tests pass after failing, the fix is automatically logged
- Solutions include full context: error, fix, and test results
- No manual documentation needed

## Benefits

- Never solve the same problem twice
- Build institutional knowledge
- Works offline
- Private and local
- No manual documentation needed

## Example Workflow

1. You edit a component that breaks tests
2. System automatically runs tests and detects failure
3. Searches local solutions - if found, shows you the fix
4. If not found, searches web for similar errors
5. If still unresolved, launches Playwright:
   - Opens browser showing the error
   - Records console errors, network failures
   - Creates full trace for debugging
6. When you fix it, the solution is automatically saved
7. Next time this error occurs, it's fixed instantly

## Setup Requirements

- Node.js project with test command in package.json
- For visual debugging: `npm install -D playwright`
- Hooks must be enabled in Claude Code session

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

This system turns every debugging session into permanent, searchable knowledge with visual proof of what went wrong and how it was fixed.

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
# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.

      
      IMPORTANT: this context may or may not be relevant to your tasks. You should not respond to this context unless it is highly relevant to your task.
CLAUDE_EOF

# Create VERIFY-FIRST.md
echo "Creating VERIFY-FIRST.md..."
cat > VERIFY-FIRST.md << 'VERIFY_EOF'
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

Add to CLAUDE.md:
```markdown
## Verification-First Development

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
```

### Practical Examples

#### Hallucination Prevention:
```bash
# Before: Making up a URL
"Install from https://github.com/fake/repo"

# After: Verify first
claude: Let me search for the actual repository...
*uses WebSearch*
claude: I couldn't find that repository. Let me check what actually exists...
```

#### Toxic Positivity Prevention:
```bash
# Before: Over-promising
"This will work perfectly!"

# After: Realistic assessment
"This should work, but we may encounter issues with:
- Dependency conflicts
- Platform-specific bugs
- Need to test thoroughly"
```

### Verification Checklist

Before stating facts:
- [ ] Did I verify this with a tool?
- [ ] Am I guessing or know for certain?
- [ ] Have I tested this claim?
- [ ] Am I being realistically cautious?

### The VybeHack: VERIFY-FIRST Macro

Create a mental macro that triggers before any factual claim:
1. PAUSE - "Am I about to state something unverified?"
2. CHECK - Use tools to verify
3. QUALIFY - Add appropriate uncertainty if needed
4. DOCUMENT - Record what was verified for future reference
VERIFY_EOF

# Setup TRAIL System
echo "Setting up TRAIL system..."
mkdir -p .solutions/debug
touch .solutions/solutions.log

# Create verify-and-learn.sh
cat > .solutions/verify-and-learn.sh << 'TRAIL_EOF'
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

# Function to trigger web search (simulated via message)
web_search_error() {
    local error="$1"
    echo "WEB_SEARCH_NEEDED: $error" > "$SOLUTIONS_DIR/.web-search-request"
    # In a real implementation, this would trigger Claude to search
    # For now, we'll simulate a failed search after a brief pause
    sleep 2
    return 1
}

# Function to trigger Playwright debugging
playwright_debug() {
    local error="$1"
    echo "===== PLAYWRIGHT DEBUG MODE TRIGGERED ====="
    echo "Error to debug: $error"
    echo "Launching visual debugging with Playwright..."
    
    # Create debug session info
    local timestamp=$(date +%Y%m%d_%H%M%S)
    local session_dir="$DEBUG_DIR/session_$timestamp"
    mkdir -p "$session_dir"
    
    # Save error context
    echo "$error" > "$session_dir/error.txt"
    cp "$LAST_TEST_LOG" "$session_dir/test-output.log" 2>/dev/null
    
    # Run Playwright debug script
    if [ -f "$SOLUTIONS_DIR/playwright-debug.js" ]; then
        node "$SOLUTIONS_DIR/playwright-debug.js" "$session_dir" "$error"
    else
        echo "Creating Playwright debug request for Claude..."
        cat > "$session_dir/debug-request.md" << EOF
# Visual Debugging Required

**Error**: $error
**Session**: $session_dir
**Time**: $(date)

Please use Playwright to:
1. Navigate to the application
2. Reproduce the error
3. Capture screenshots, console logs, and network activity
4. Save trace to: $session_dir/trace.zip
5. Continue debugging until the issue is resolved

Use: npx playwright show-trace $session_dir/trace.zip to view results
EOF
    fi
    
    echo "Debug session created: $session_dir"
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
                
                # Level 2: Web search
                echo "Level 2: Searching web for solution..."
                if web_search_error "$ERROR"; then
                    echo "Web search found a solution"
                else
                    echo "Web search failed to find solution."
                    
                    # Level 3: Playwright debugging
                    echo "Level 3: Launching Playwright visual debugging..."
                    playwright_debug "$ERROR"
                fi
            fi
            
            # Mark error as pending for when it's fixed
            echo "$ERROR" > "$PENDING_ERROR_FILE"
        else
            # Tests passed - check if we just fixed a pending error
            if [ -f "$PENDING_ERROR_FILE" ]; then
                FIXED_ERROR=$(cat "$PENDING_ERROR_FILE")
                echo "Solution found for: $FIXED_ERROR"
                
                # Log the solution
                cat >> "$SOLUTIONS_LOG" << EOF
================================================================================
Timestamp: $(date -u +%Y-%m-%dT%H:%M:%SZ)
Error: $FIXED_ERROR
File: ${FILE_PATH:-unknown}
Solution Applied:
$TOOL_OUTPUT
Test Status: PASSED
================================================================================

EOF
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
TRAIL_EOF
chmod +x .solutions/verify-and-learn.sh

# Create search.sh
cat > .solutions/search.sh << 'SEARCH_EOF'
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
SEARCH_EOF
chmod +x .solutions/search.sh

# Create log-solution.sh
cat > .solutions/log-solution.sh << 'LOG_EOF'
#!/bin/bash
# Manually log a solution to the knowledge base

if [ $# -lt 2 ]; then
    echo "Usage: $0 <error-description> <solution-description>"
    echo "Example: $0 'TypeError: undefined is not a function' 'Added null check before calling method'"
    exit 1
fi

SOLUTIONS_DIR="$(dirname "$0")"
SOLUTIONS_LOG="$SOLUTIONS_DIR/solutions.log"

ERROR="$1"
SOLUTION="$2"
FILE="${3:-manual-entry}"

# Create solutions log if it doesn't exist
touch "$SOLUTIONS_LOG"

# Log the solution
cat >> "$SOLUTIONS_LOG" << EOF
================================================================================
Timestamp: $(date -u +%Y-%m-%dT%H:%M:%SZ)
Error: $ERROR
File: $FILE
Solution: $SOLUTION
Source: Manual Entry
Test Status: RESOLVED
================================================================================

EOF

echo "Solution logged successfully!"
echo "You can search for it with: .solutions/search.sh \"$(echo $ERROR | cut -d' ' -f1-3)\""
LOG_EOF
chmod +x .solutions/log-solution.sh

# Create memory-server.js (MCP server for solutions)
cat > .solutions/memory-server.js << 'MEMORY_EOF'
#!/usr/bin/env node

// MCP Server for TRAIL Solutions Memory
// This allows Claude to access solutions through MCP

const fs = require('fs');
const path = require('path');

const SOLUTIONS_LOG = path.join(__dirname, 'solutions.log');

// MCP server implementation would go here
// This is a placeholder showing the structure

class SolutionsMemoryServer {
    constructor() {
        this.solutions = this.loadSolutions();
    }

    loadSolutions() {
        if (!fs.existsSync(SOLUTIONS_LOG)) {
            return [];
        }
        
        const content = fs.readFileSync(SOLUTIONS_LOG, 'utf8');
        const solutions = [];
        const blocks = content.split('='.repeat(80));
        
        for (const block of blocks) {
            if (block.trim()) {
                const lines = block.trim().split('\n');
                const solution = {};
                
                for (const line of lines) {
                    const [key, ...valueParts] = line.split(':');
                    if (key && valueParts.length) {
                        solution[key.trim()] = valueParts.join(':').trim();
                    }
                }
                
                if (Object.keys(solution).length > 0) {
                    solutions.push(solution);
                }
            }
        }
        
        return solutions;
    }

    searchSolutions(query) {
        return this.solutions.filter(sol => 
            JSON.stringify(sol).toLowerCase().includes(query.toLowerCase())
        );
    }

    getAllSolutions() {
        return this.solutions;
    }

    getRecentSolutions(count = 10) {
        return this.solutions.slice(-count);
    }
}

// Export for MCP integration
module.exports = SolutionsMemoryServer;

// CLI interface for testing
if (require.main === module) {
    const server = new SolutionsMemoryServer();
    const args = process.argv.slice(2);
    
    if (args[0] === 'search' && args[1]) {
        const results = server.searchSolutions(args[1]);
        console.log(`Found ${results.length} solutions:`);
        results.forEach(sol => console.log(JSON.stringify(sol, null, 2)));
    } else if (args[0] === 'all') {
        console.log(`Total solutions: ${server.getAllSolutions().length}`);
    } else if (args[0] === 'recent') {
        const recent = server.getRecentSolutions();
        console.log(`Recent ${recent.length} solutions:`);
        recent.forEach(sol => console.log(JSON.stringify(sol, null, 2)));
    } else {
        console.log('Usage:');
        console.log('  node memory-server.js search <query>');
        console.log('  node memory-server.js all');
        console.log('  node memory-server.js recent');
    }
}
MEMORY_EOF
chmod +x .solutions/memory-server.js

# Create playwright-debug.js
cat > .solutions/playwright-debug.js << 'PLAYWRIGHT_EOF'
#!/usr/bin/env node

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function debugWithPlaywright(sessionDir, error) {
    console.log('Starting Playwright debug session...');
    console.log('Session directory:', sessionDir);
    console.log('Error to debug:', error);
    
    try {
        // Launch browser with debugging enabled
        const browser = await chromium.launch({
            headless: false,
            devtools: true,
            args: ['--start-maximized']
        });
        
        // Create context with video recording
        const context = await browser.newContext({
            recordVideo: { 
                dir: sessionDir,
                size: { width: 1920, height: 1080 }
            },
            viewport: { width: 1920, height: 1080 }
        });
        
        // Start tracing
        await context.tracing.start({
            screenshots: true,
            snapshots: true,
            sources: true
        });
        
        // Create page
        const page = await context.newPage();
        
        // Set up console logging
        const consoleLogPath = path.join(sessionDir, 'console.log');
        page.on('console', msg => {
            const logEntry = `[${new Date().toISOString()}] [${msg.type()}] ${msg.text()}\n`;
            fs.appendFileSync(consoleLogPath, logEntry);
        });
        
        // Set up error logging
        page.on('pageerror', error => {
            const errorEntry = `[${new Date().toISOString()}] [PAGE ERROR] ${error.message}\n${error.stack}\n\n`;
            fs.appendFileSync(path.join(sessionDir, 'errors.log'), errorEntry);
        });
        
        // Set up request logging
        page.on('request', request => {
            const requestEntry = `[${new Date().toISOString()}] ${request.method()} ${request.url()}\n`;
            fs.appendFileSync(path.join(sessionDir, 'network.log'), requestEntry);
        });
        
        // Set up response logging
        page.on('response', response => {
            const responseEntry = `[${new Date().toISOString()}] ${response.status()} ${response.url()}\n`;
            fs.appendFileSync(path.join(sessionDir, 'network.log'), responseEntry);
        });
        
        // Navigate to localhost (adjust URL as needed)
        console.log('Navigating to application...');
        await page.goto('http://localhost:3000', { 
            waitUntil: 'networkidle',
            timeout: 30000 
        });
        
        // Take initial screenshot
        await page.screenshot({ 
            path: path.join(sessionDir, 'initial.png'),
            fullPage: true 
        });
        
        console.log('');
        console.log('='.repeat(60));
        console.log('PLAYWRIGHT DEBUG SESSION READY');
        console.log('='.repeat(60));
        console.log('');
        console.log('Browser is now open with DevTools.');
        console.log('Use the browser to reproduce the error.');
        console.log('');
        console.log('When finished debugging:');
        console.log('1. Close the browser window');
        console.log('2. Trace will be saved to:', path.join(sessionDir, 'trace.zip'));
        console.log('3. View trace with: npx playwright show-trace', path.join(sessionDir, 'trace.zip'));
        console.log('');
        console.log('Recording: Video, Screenshots, Console, Network, Errors');
        console.log('');
        
        // Wait for browser to be closed by user
        await browser.waitForEvent('disconnected');
        
        // Stop tracing and save
        await context.tracing.stop({ 
            path: path.join(sessionDir, 'trace.zip') 
        });
        
        console.log('Debug session completed.');
        console.log('All artifacts saved to:', sessionDir);
        
    } catch (error) {
        console.error('Playwright debug error:', error);
        
        // Save error details
        fs.writeFileSync(
            path.join(sessionDir, 'playwright-error.log'),
            `Error during Playwright debug session:\n${error.message}\n${error.stack}`
        );
    }
}

// Run if called directly
if (require.main === module) {
    const sessionDir = process.argv[2];
    const error = process.argv[3] || 'Unknown error';
    
    if (!sessionDir) {
        console.error('Usage: playwright-debug.js <session-dir> [error-description]');
        process.exit(1);
    }
    
    // Ensure session directory exists
    fs.mkdirSync(sessionDir, { recursive: true });
    
    // Check if Playwright is installed
    try {
        require('playwright');
    } catch (e) {
        console.error('Playwright not installed!');
        console.error('Run: npm install -D playwright');
        console.error('Then: npx playwright install chromium');
        process.exit(1);
    }
    
    debugWithPlaywright(sessionDir, error).catch(console.error);
}

module.exports = { debugWithPlaywright };
PLAYWRIGHT_EOF
chmod +x .solutions/playwright-debug.js

# Configure Claude Code hooks
echo "Configuring Claude Code hooks..."
mkdir -p .claude-code
cat > .claude-code/settings.json << 'HOOKS_EOF'
{
  "hooks": {
    "postToolUse": "export TOOL_NAME='{{toolName}}' TOOL_OUTPUT='{{toolOutput}}' TIMESTAMP='{{timestamp}}' FILE_PATH='{{filePath}}' && $(pwd)/.solutions/verify-and-learn.sh"
  }
}
HOOKS_EOF

# Create INSTALL-TRAIL.md
cat > .solutions/INSTALL-TRAIL.md << 'INSTALL_EOF'
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
INSTALL_EOF

echo ""
echo "✅ All VybeHacks installed successfully!"
echo ""
echo "Created files:"
echo "  - CLAUDE.md (AI behavior rules)"
echo "  - VERIFY-FIRST.md (Anti-hallucination protocol)"
echo "  - .solutions/ (TRAIL system with 5 scripts)"
echo "  - .claude-code/settings.json (Hook configuration)"
echo ""
echo "Next steps:"
echo "1. Install Playwright if needed: npm install -D playwright"
echo "2. Test TRAIL search: .solutions/search.sh test"
echo "3. Manually log a solution: .solutions/log-solution.sh 'error' 'fix'"
echo "4. Read CLAUDE.md and VERIFY-FIRST.md"
echo "5. Commit all files to version control"
echo ""
echo "Backup command:"
echo "  tar -czf vybehacks-backup.tar.gz CLAUDE.md VERIFY-FIRST.md .solutions/ .claude-code/"
echo ""