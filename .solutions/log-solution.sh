#!/bin/bash

# Solution Logger for Claude Code
# Automatically captures and stores problem/solution pairs

SOLUTIONS_DIR="$(dirname "$0")"
LOG_FILE="$SOLUTIONS_DIR/solutions.log"
INDEX_FILE="$SOLUTIONS_DIR/index.json"

# Extract relevant information from environment variables
TOOL_NAME="${TOOL_NAME:-unknown}"
TOOL_OUTPUT="${TOOL_OUTPUT:-}"
TIMESTAMP="${TIMESTAMP:-$(date -u +%Y-%m-%dT%H:%M:%SZ)}"
WORKING_DIR="${PWD}"

# Function to detect if this was a problem-solving action
is_problem_solving() {
    # Check if the output contains error keywords that were resolved
    if echo "$TOOL_OUTPUT" | grep -qE "(error|Error|ERROR|failed|Failed|FAILED|issue|Issue|ISSUE|problem|Problem|PROBLEM|bug|Bug|BUG|fix|Fix|FIX|solved|Solved|SOLVED|resolved|Resolved|RESOLVED)"; then
        return 0
    fi
    
    # Check if this was an Edit or MultiEdit tool (common for fixes)
    if [[ "$TOOL_NAME" == "Edit" || "$TOOL_NAME" == "MultiEdit" ]]; then
        return 0
    fi
    
    return 1
}

# Function to extract problem description from output
extract_problem() {
    # Try to find error messages or problem descriptions
    local problem=$(echo "$TOOL_OUTPUT" | grep -E "(error|Error|ERROR|failed|Failed|FAILED)" | head -1)
    if [ -z "$problem" ]; then
        problem="Code modification in $WORKING_DIR"
    fi
    echo "$problem"
}

# Function to generate a unique ID
generate_id() {
    echo "sol_$(date +%s)_$$"
}

# Main logging logic
if is_problem_solving; then
    SOLUTION_ID=$(generate_id)
    PROBLEM=$(extract_problem)
    
    # Create a structured log entry
    cat >> "$LOG_FILE" << EOF
================================================================================
ID: $SOLUTION_ID
Timestamp: $TIMESTAMP
Directory: $WORKING_DIR
Tool: $TOOL_NAME
Problem: $PROBLEM
Solution:
$TOOL_OUTPUT
================================================================================

EOF

    # Update JSON index for easy searching
    if [ ! -f "$INDEX_FILE" ]; then
        echo "[]" > "$INDEX_FILE"
    fi
    
    # Add to index using jq if available, otherwise append manually
    if command -v jq &> /dev/null; then
        jq ". += [{\"id\": \"$SOLUTION_ID\", \"timestamp\": \"$TIMESTAMP\", \"problem\": \"$PROBLEM\", \"tool\": \"$TOOL_NAME\", \"directory\": \"$WORKING_DIR\"}]" "$INDEX_FILE" > "$INDEX_FILE.tmp" && mv "$INDEX_FILE.tmp" "$INDEX_FILE"
    fi
    
    echo "Logged solution: $SOLUTION_ID"
fi