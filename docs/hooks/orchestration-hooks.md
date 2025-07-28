# Orchestration Hooks Documentation

## Overview

Orchestration hooks enable intelligent automation for BMAD Method integration, story selection, task delegation, and session management. These hooks work together to create an autonomous development workflow.

## Orchestration Hook Types

### 1. Pre-Session Hook

**File**: `.claude/config/hooks/pre-session-hook.sh`  
**Purpose**: Shows ready stories and opportunities at session start  
**Trigger**: When Claude Code session begins

```bash
#!/bin/bash
# Pre-session analysis and recommendations

echo "=== Claude Code Session Starting ==="
echo

# Check for ready stories
if [ -d ".bmad/stories" ]; then
    ready_count=$(find .bmad/stories -name "*.md" -exec grep -l "Ready for Development" {} \; | wc -l)
    if [ "$ready_count" -gt 0 ]; then
        echo "📋 Ready Stories: $ready_count"
        find .bmad/stories -name "*.md" -exec grep -l "Ready for Development" {} \; | while read story; do
            echo "  - $(basename "$story")"
        done
        echo
    fi
fi

# Check for recent errors
if [ -f ".claude/solutions/solutions.log" ]; then
    recent_errors=$(tail -20 .claude/solutions/solutions.log | grep "ERROR:" | wc -l)
    if [ "$recent_errors" -gt 0 ]; then
        echo "⚠️  Recent errors detected: $recent_errors"
        echo "  Run: .claude/solutions/search.sh 'error' to review"
        echo
    fi
fi

# Suggest optimizations
if [ -f ".claude/solutions/continuous-learning.js" ]; then
    echo "💡 Optimization Opportunities:"
    node .claude/solutions/continuous-learning.js suggest 2>/dev/null || echo "  No suggestions available"
    echo
fi

# Load previous session context
if [ -f ".claude/solutions/session-context.json" ]; then
    echo "📂 Restoring previous session context..."
    cat .claude/solutions/session-context.json
fi

echo "=== Session Ready ==="
```

### 2. Story Orchestration Trigger

**File**: `.claude/config/hooks/story-orchestration-trigger.sh`  
**Purpose**: Activates BMAD orchestration for story files  
**Trigger**: When story files are edited or mentioned

```bash
#!/bin/bash
# Detect and trigger story orchestration

FILE_PATH="$1"

# Check if this is a story file
if [[ "$FILE_PATH" == *"stories"* ]] || [[ "$FILE_PATH" == *"story"* ]]; then
    echo "📋 Story file detected: $FILE_PATH"
    
    # Extract story ID
    STORY_ID=$(basename "$FILE_PATH" .md)
    
    # Check if story is ready for development
    if grep -q "Ready for Development" "$FILE_PATH" 2>/dev/null; then
        echo "✅ Story is ready for development"
        echo "🤖 Activating dev-enhanced agent..."
        
        # Trigger analysis
        echo "ORCHESTRATE:$STORY_ID" > .claude/solutions/orchestration-queue
    fi
fi

exit 0
```

### 3. Auto-Approval Engine

**File**: `.claude/config/hooks/auto-approval-engine.js`  
**Purpose**: Makes intelligent auto-approval decisions  
**Trigger**: Called by other hooks for decisions

```javascript
#!/usr/bin/env node
const fs = require('fs');

// Configuration for auto-approval thresholds
const config = {
    parallelizationThreshold: 0.7,
    securityFixConfidence: 0.9,
    patternConfidence: 0.95,
    testExecutionAlways: true
};

function evaluateDelegationPlan(plan) {
    // Check if all tasks have clear descriptions
    const hasGoodDescriptions = plan.tasks.every(t => 
        t.description && t.description.length > 10
    );
    
    // Check for external dependencies
    const hasExternalDeps = plan.tasks.some(t => 
        t.description.includes('external') || 
        t.description.includes('API key')
    );
    
    // Calculate confidence score
    let confidence = 0.5;
    if (hasGoodDescriptions) confidence += 0.3;
    if (!hasExternalDeps) confidence += 0.2;
    if (plan.parallelizationScore > 0.7) confidence += 0.2;
    
    return {
        approve: confidence >= config.parallelizationThreshold,
        confidence,
        reason: confidence >= config.parallelizationThreshold ? 
            'High confidence parallel execution plan' : 
            'Manual review recommended'
    };
}

function evaluateSecurityFix(fix) {
    // Check against known patterns
    const knownPatterns = JSON.parse(
        fs.readFileSync('.claude/solutions/security-patterns.json', 'utf8')
    );
    
    const pattern = knownPatterns.find(p => 
        p.type === fix.type && p.successRate > 0.9
    );
    
    return {
        approve: pattern && pattern.applications > 3,
        confidence: pattern ? pattern.successRate : 0,
        reason: pattern ? 
            `Known pattern with ${pattern.applications} successful applications` :
            'Unknown security pattern'
    };
}

// Main evaluation
const request = JSON.parse(process.argv[2] || '{}');
let result;

switch (request.type) {
    case 'delegation':
        result = evaluateDelegationPlan(request.data);
        break;
    case 'security':
        result = evaluateSecurityFix(request.data);
        break;
    case 'test':
        result = { approve: true, confidence: 1, reason: 'Tests always approved' };
        break;
    default:
        result = { approve: false, confidence: 0, reason: 'Unknown request type' };
}

console.log(JSON.stringify(result, null, 2));
process.exit(result.approve ? 0 : 1);
```

### 4. Story Auto-Selection Hook

**File**: `.claude/solutions/story-auto-select.sh`  
**Purpose**: Intelligently selects next best story  
**Trigger**: When current story completes or on request

```bash
#!/bin/bash
# Intelligent story selection based on multiple factors

# Find all ready stories
ready_stories=$(find .bmad/stories -name "*.md" -exec grep -l "Ready for Development" {} \;)

# Score each story
best_score=0
best_story=""

for story in $ready_stories; do
    score=0
    
    # Priority scoring
    if grep -q "Priority: High" "$story"; then
        score=$((score + 30))
    elif grep -q "Priority: Medium" "$story"; then
        score=$((score + 20))
    fi
    
    # Dependencies scoring
    deps=$(grep -c "Depends on:" "$story")
    score=$((score - deps * 10))
    
    # Pattern matching scoring
    if [ -f ".claude/solutions/story-patterns.json" ]; then
        pattern_score=$(node -e "
            const patterns = require('./.claude/solutions/story-patterns.json');
            const story = '$story';
            const match = patterns.find(p => story.includes(p.type));
            console.log(match ? match.successRate * 20 : 0);
        " 2>/dev/null || echo "0")
        score=$((score + ${pattern_score%.*}))
    fi
    
    if [ "$score" -gt "$best_score" ]; then
        best_score=$score
        best_story=$story
    fi
done

if [ -n "$best_story" ]; then
    echo "Selected: $best_story (score: $best_score)"
    echo "$best_story" > .claude/solutions/current-story
else
    echo "No stories ready for development"
fi
```

### 5. Session Tracker Hook

**File**: `.claude/solutions/session-tracker.sh`  
**Purpose**: Tracks session progress for reviews  
**Trigger**: Periodically during session

```bash
#!/bin/bash
# Track session activities for comprehensive reviews

SESSION_FILE=".claude/solutions/session-$(date +%Y%m%d-%H%M%S).json"

# Collect session data
cat > "$SESSION_FILE" << EOF
{
  "start": "$(date -Iseconds)",
  "stories_completed": $(find .bmad/stories -name "*.md" -mmin -240 -exec grep -l "Completed" {} \; | wc -l),
  "commits": $(git log --oneline --since="4 hours ago" | wc -l),
  "errors_resolved": $(grep "SOLUTION:" .claude/solutions/solutions.log | tail -50 | wc -l),
  "files_modified": $(git diff --name-only HEAD~10 2>/dev/null | wc -l),
  "patterns_learned": $(grep "LEARNED:" .claude/solutions/continuous-learning.log 2>/dev/null | wc -l)
}
EOF

# Generate review if 4+ hours
if [ -f ".claude/solutions/session-start" ]; then
    start_time=$(cat .claude/solutions/session-start)
    current_time=$(date +%s)
    elapsed=$((current_time - start_time))
    
    if [ "$elapsed" -gt 14400 ]; then
        echo "Generating session review..."
        .claude/solutions/generate-review.sh
        date +%s > .claude/solutions/session-start
    fi
else
    date +%s > .claude/solutions/session-start
fi
```

## Installation

```bash
# Create orchestration hooks
mkdir -p .claude/config/hooks
mkdir -p .solutions

# Create each hook script from examples above
# Make all hooks executable
chmod +x .claude/config/hooks/*.sh
chmod +x .claude/solutions/*.sh

# Initialize required files
echo "[]" > .claude/solutions/story-patterns.json
echo "[]" > .claude/solutions/security-patterns.json
echo "{}" > .claude/solutions/session-context.json
```

## Configuration

Add orchestration hooks to `.claude/config/settings.json`:
```json
{
  "hooks": {
    "PreSession": "/path/to/pre-session-hook.sh",
    "PostToolUse": {
      "Edit": "... && /path/to/story-orchestration-trigger.sh '{{filePath}}'"
    }
  }
}
```

## Integration with BMAD

### Enhanced Agents
- `/dev-enhanced` - Orchestrates parallel implementation
- `/sm-enhanced` - Creates stories for multiple epics simultaneously

### Sub-Agents
- `/sub-frontend-impl` - Frontend UI implementation
- `/sub-backend-impl` - Backend API development
- `/sub-test-impl` - Test creation and automation
- `/sub-integration` - Component integration

### Workflow
1. Pre-session hook shows ready stories
2. Story selection (manual or auto)
3. Dev-enhanced analyzes for parallelization
4. Auto-approval engine evaluates plan
5. Sub-agents execute in parallel
6. Session tracker monitors progress
7. Auto-review after 4 hours

## Monitoring

### View Orchestration Status
```bash
# Current orchestration queue
cat .claude/solutions/orchestration-queue

# Active story
cat .claude/solutions/current-story

# Session metrics
cat .claude/solutions/session-*.json | jq .

# Auto-approval history
grep "AUTO-APPROVED" .claude/solutions/orchestration.log
```

### Generate Reports
```bash
# Orchestration efficiency report
node .claude/solutions/orchestration-report.js

# Session review
.claude/solutions/generate-review.sh

# Story completion metrics
.claude/solutions/story-metrics.sh
```

## Best Practices

1. **Trust the Automation**: High-confidence decisions are well-tested
2. **Review Sessions**: Check 4-hour reviews for insights
3. **Update Patterns**: Add successful patterns to improve selection
4. **Monitor Queues**: Ensure orchestration queue processes smoothly
5. **Clean Old Data**: Archive old session files monthly

## Troubleshooting

### Stories Not Auto-Selecting
1. Check story has "Ready for Development" status
2. Verify `.bmad/stories` directory exists
3. Review scoring in story-auto-select.sh
4. Check pattern file formats

### Auto-Approval Not Working
1. Verify confidence thresholds
2. Check pattern files exist and are valid JSON
3. Review auto-approval-engine.js logs
4. Test with manual evaluation

### Session Not Tracking
1. Ensure session-start file exists
2. Check git is initialized
3. Verify write permissions
4. Review cron/timer setup if using