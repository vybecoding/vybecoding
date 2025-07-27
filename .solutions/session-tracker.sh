#!/bin/bash

# Session Tracker for Automated Reviews
# Tracks session time and triggers reviews after 4 hours

SESSION_FILE=".solutions/session-start"
LAST_REVIEW_FILE=".solutions/last-session-review"
FOUR_HOURS=$((4 * 60 * 60))  # 4 hours in seconds

# Initialize session if not exists
if [ ! -f "$SESSION_FILE" ]; then
    date +%s > "$SESSION_FILE"
    echo "Session started at $(date)"
fi

# Check if review needed
if [ -f "$LAST_REVIEW_FILE" ]; then
    LAST_REVIEW=$(cat "$LAST_REVIEW_FILE")
    CURRENT_TIME=$(date +%s)
    ELAPSED=$((CURRENT_TIME - LAST_REVIEW))
    
    if [ "$ELAPSED" -gt "$FOUR_HOURS" ]; then
        echo "⏰ 4+ hours since last review - generating automatic session review..."
        
        # Generate review
        /home/happy/Projects/vybecoding/.solutions/generate-review.sh
        
        # Update last review time
        date +%s > "$LAST_REVIEW_FILE"
        
        echo "📊 Session review generated. Next review in 4 hours."
    fi
else
    # First review
    date +%s > "$LAST_REVIEW_FILE"
fi