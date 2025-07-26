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