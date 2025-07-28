# Continuous Learning Hook Documentation

## Overview

The continuous learning hook analyzes patterns from errors, performance metrics, and task distributions to create a self-improving development system that gets smarter with every execution.

## Hook Configuration

**File**: `.claude/hooks/continuous-learning-trigger.sh`  
**Script**: `.claude/solutions/continuous-learning.js`  
**Trigger**: On task completions, every 10 tool uses  
**Data**: `.claude/solutions/patterns.json`, `metrics-history.json`

```json
{
  "hooks": {
    "PostToolUse": {
      "Bash": "... && /home/happy/Projects/vybecoding/.claude/hooks/continuous-learning-trigger.sh"
    }
  }
}
```

## Features

### 1. Pattern Recognition
- Analyzes errors and their resolutions
- Identifies performance optimization opportunities
- Learns optimal task distribution strategies
- Recognizes integration conflict patterns

### 2. Automatic Learning Types
- **Error Resolution**: Common errors and their fixes
- **Performance Optimization**: Execution improvements
- **Integration Conflicts**: Resolution patterns
- **Security Fixes**: Automated security corrections

### 3. Pattern Application
- Applies learned patterns to new tasks automatically
- Confidence-based auto-application (>95% confidence)
- Cross-agent knowledge sharing
- Real-time optimization

### 4. Metrics Tracked
- Task completion times by type
- Error rates and resolutions
- Learning application success rate

## Installation

The continuous learning system is created as part of the TRAIL setup:

```bash
# The trigger script
cat > .claude/config/hooks/continuous-learning-trigger.sh << 'EOF'
#!/bin/bash
# Trigger continuous learning analysis

# Only run periodically to avoid overhead
LAST_RUN_FILE=".claude/solutions/.last-learning-run"
CURRENT_TIME=$(date +%s)

if [ -f "$LAST_RUN_FILE" ]; then
    LAST_RUN=$(cat "$LAST_RUN_FILE")
    TIME_DIFF=$((CURRENT_TIME - LAST_RUN))
    
    # Run every 10 tool uses or 30 minutes
    if [ "$TIME_DIFF" -lt 1800 ]; then
        exit 0
    fi
fi

echo "$CURRENT_TIME" > "$LAST_RUN_FILE"

# Run analysis in background
node .claude/solutions/continuous-learning.js analyze > /dev/null 2>&1 &

exit 0
EOF

chmod +x .claude/config/hooks/continuous-learning-trigger.sh
```

## Usage

### Manual Commands
```bash
# Analyze and extract patterns
node .claude/solutions/continuous-learning.js analyze

# Start continuous monitoring
node .claude/solutions/continuous-learning.js monitor

# Generate learning report
node .claude/solutions/continuous-learning.js report

# Apply learning to current context
node .claude/solutions/continuous-learning.js apply '{"taskType":"frontend"}'
```

### Automatic Triggers
The system automatically runs:
- After every 10 tool uses
- Every 30 minutes during active sessions
- When significant patterns are detected
- After task completions

## Integration with BMAD

### BMAD Agent Benefits
- BMAD agents receive learned patterns
- Workflows improve based on success metrics
- Error patterns shared instantly across all agents
- Performance optimizations applied automatically

### Pattern Distribution
```javascript
// Example: Frontend task pattern
{
  "pattern": "React component optimization",
  "confidence": 0.97,
  "applications": 23,
  "avgTimeSaved": "3.2 minutes",
  "autoApply": true
}
```

## Learning Categories

### 1. Error Patterns
```javascript
{
  "error": "TypeError: Cannot read property",
  "context": "React hooks",
  "solution": "Add null check or optional chaining",
  "successRate": 0.95,
  "occurrences": 15
}
```

### 2. Task Distribution
```javascript
{
  "taskType": "Full stack feature",
  "optimalDistribution": {
    "frontend": "sub-frontend-impl",
    "backend": "sub-backend-impl",
    "tests": "sub-test-impl"
  },
}
```

### 3. Performance Patterns
```javascript
{
  "operation": "Multi-file search",
  "optimization": "Use Grep with glob patterns",
  "improvement": "75% faster",
  "confidence": 0.92
}
```

## Reports and Analytics

### Generate Reports
```bash
# Full learning report
node .claude/solutions/continuous-learning.js report

# Specific category
node .claude/solutions/continuous-learning.js report errors
node .claude/solutions/continuous-learning.js report performance
node .claude/solutions/continuous-learning.js report distribution
```

### Report Contents
- Pattern summary with confidence scores
- Application success rates
- Time saved estimates
- Recommendation priorities
- Trend analysis

## Auto-Application Rules

Patterns are automatically applied when:
- Pattern confidence > 95%
- Similar context detected 5+ times
- Task distribution succeeded 10+ times
- Security fix verified 3+ times
- Performance gain proven with metrics

## Best Practices

1. **Let It Learn**: Don't interrupt the analysis process
2. **Review Reports**: Check weekly learning reports
3. **Trust High Confidence**: Auto-applied patterns are well-tested
4. **Share Patterns**: Export successful patterns for team use
5. **Clean Old Data**: Archive old patterns periodically

## Troubleshooting

### Learning Not Triggering
1. Check trigger conditions (time/count thresholds)
2. Verify `.claude/solutions/continuous-learning.js` exists
3. Check Node.js is available: `node --version`
4. Review logs: `tail -f .claude/solutions/learning.log`

### Patterns Not Applying
1. Check confidence thresholds
2. Verify context matching
3. Review application logs
4. Test manual application

### Performance Issues
1. Adjust trigger frequency in script
2. Run analysis in off-hours
3. Archive old pattern data
4. Optimize pattern matching rules