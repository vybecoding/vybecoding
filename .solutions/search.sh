#!/bin/bash

# Solution Search Tool
# Search through logged solutions

SOLUTIONS_DIR="$(dirname "$0")"
LOG_FILE="$SOLUTIONS_DIR/solutions.log"

if [ $# -eq 0 ]; then
    echo "Usage: $0 <search-term>"
    echo "Example: $0 tailwind"
    exit 1
fi

echo "Searching for: $1"
echo "=================================================================================="

grep -i -A 10 -B 5 "$1" "$LOG_FILE" 2>/dev/null || echo "No solutions found for '$1'"