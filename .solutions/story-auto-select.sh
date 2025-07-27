#!/bin/bash

# Story Auto-Selection Script
# Intelligently selects the next best story based on priority and parallelization

# Find all ready stories
READY_STORIES=$(find .bmad-core/stories -name "*.md" -type f -exec grep -l "Status: Ready for Development" {} \; 2>/dev/null)

if [ -z "$READY_STORIES" ]; then
    echo "No stories ready for development"
    exit 1
fi

# Score each story
declare -A STORY_SCORES
declare -A STORY_DETAILS

echo "Analyzing stories for auto-selection..."

for story in $READY_STORIES; do
    STORY_NAME=$(basename "$story" .md)
    SCORE=0
    DETAILS=""
    
    # Check priority (if mentioned in story)
    if grep -q "Priority: HIGH\|Priority: Critical" "$story" 2>/dev/null; then
        SCORE=$((SCORE + 50))
        DETAILS="HIGH-PRIORITY"
    elif grep -q "Priority: MEDIUM" "$story" 2>/dev/null; then
        SCORE=$((SCORE + 30))
        DETAILS="MED-PRIORITY"
    else
        SCORE=$((SCORE + 10))
        DETAILS="LOW-PRIORITY"
    fi
    
    # Check for dependencies
    if grep -q "Depends on:\|Blocked by:" "$story" 2>/dev/null; then
        SCORE=$((SCORE - 20))
        DETAILS="$DETAILS,BLOCKED"
    fi
    
    # Check parallelization opportunity
    if [ -f ".bmad-core/utils/bmad-orchestration-bridge.js" ]; then
        ANALYSIS=$(node .bmad-core/utils/bmad-orchestration-bridge.js analyze "$story" 2>/dev/null)
        if [ $? -eq 0 ]; then
            PARALLEL_SCORE=$(echo "$ANALYSIS" | jq -r '.parallelizationOpportunity // 0' 2>/dev/null || echo "0")
            TASKS=$(echo "$ANALYSIS" | jq -r '.totalTasks // 0' 2>/dev/null || echo "0")
            
            # Bonus for high parallelization
            if [ "$PARALLEL_SCORE" -gt 70 ]; then
                SCORE=$((SCORE + 30))
                DETAILS="$DETAILS,PARALLEL-${PARALLEL_SCORE}%"
            fi
            
            # Bonus for optimal task count (3-8 tasks)
            if [ "$TASKS" -ge 3 ] && [ "$TASKS" -le 8 ]; then
                SCORE=$((SCORE + 20))
                DETAILS="$DETAILS,TASKS-$TASKS"
            fi
        fi
    fi
    
    # Check if patterns exist for this type of story
    if [ -f ".solutions/patterns.json" ]; then
        # Look for frontend/backend keywords
        if grep -q "frontend\|UI\|component" "$story" 2>/dev/null; then
            FRONTEND_PATTERNS=$(jq '[.[] | select(.applicableTo[]? | contains("frontend"))] | length' .solutions/patterns.json 2>/dev/null || echo "0")
            if [ "$FRONTEND_PATTERNS" -gt 0 ]; then
                SCORE=$((SCORE + 10))
                DETAILS="$DETAILS,PATTERNS-$FRONTEND_PATTERNS"
            fi
        fi
    fi
    
    STORY_SCORES["$story"]=$SCORE
    STORY_DETAILS["$story"]=$DETAILS
done

# Find highest scoring story
BEST_STORY=""
BEST_SCORE=0

for story in $READY_STORIES; do
    if [ "${STORY_SCORES[$story]}" -gt "$BEST_SCORE" ]; then
        BEST_SCORE="${STORY_SCORES[$story]}"
        BEST_STORY="$story"
    fi
done

if [ -n "$BEST_STORY" ]; then
    STORY_NAME=$(basename "$BEST_STORY" .md)
    echo ""
    echo "🎯 Selected Story: $STORY_NAME"
    echo "Score: $BEST_SCORE"
    echo "Factors: ${STORY_DETAILS[$BEST_STORY]}"
    echo "Path: $BEST_STORY"
    
    # Output for use by other scripts
    echo "$BEST_STORY" > /tmp/selected-story.txt
    
    # Check if auto-delegation recommended
    if [[ "${STORY_DETAILS[$BEST_STORY]}" == *"PARALLEL-"* ]]; then
        echo ""
        echo "⚡ High parallelization opportunity - auto-delegation recommended"
    fi
else
    echo "Unable to select a story"
    exit 1
fi