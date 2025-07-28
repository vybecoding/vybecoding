# Story Orchestration Hook

## Status: ✅ ACTIVE

The orchestration hook is configured and running in PostToolUse hooks for Edit and Write operations.

## Overview

This hook automatically detects when BMAD story files are edited and analyzes them for parallel execution opportunities, enabling faster development through intelligent task distribution.

## Location

`.claude/hooks/story-orchestration-trigger.sh`

## Configuration

Configured in `.claude/settings.json`:
- Runs after Edit/MultiEdit operations
- Runs after Write operations
- Triggers on files containing "story" in path

## How It Works

1. **Story Detection**
   - Monitors file edits for story patterns
   - Checks if file path contains "stories" or "story"
   - Validates story status

2. **Status Verification**
   - Only processes stories marked "Ready for Development"
   - Skips draft or completed stories
   - Prevents premature orchestration

3. **Parallelization Analysis**
   - Runs orchestration bridge analysis
   - Calculates parallelization score (0-100%)
   - Identifies independent tasks

4. **Recommendations**
   - Suggests using `*delegate` command for high scores (>50%)
   - Logs opportunities to TRAIL system
   - Provides time-saving estimates

## Output Example

```
🚀 Story ready for development - Analyzing for parallel execution...
⚡ High parallelization opportunity detected: 75%
💡 Suggestion: Use '*delegate' command in dev-enhanced agent for faster execution
```

## Integration Points

### BMAD Orchestration Bridge
- Location: `.bmad-core/utils/bmad-orchestration-bridge.js`
- Analyzes story structure
- Returns parallelization metrics

### TRAIL System
- Logs orchestration opportunities
- Learns from delegation patterns
- Improves future recommendations

### Dev-Enhanced Agent
- Uses analysis for task distribution
- Delegates to specialized sub-agents
- Coordinates parallel execution

## Parallelization Metrics

- **0-30%**: Sequential execution recommended
- **31-50%**: Some parallel opportunities
- **51-70%**: Good parallelization candidate
- **71-100%**: Excellent for parallel execution

## Best Practices

1. Ensure stories have clear task breakdowns
2. Mark dependencies explicitly
3. Use "Ready for Development" status
4. Review orchestration suggestions
5. Monitor delegation success

## Last Tested

January 28, 2025 - Successfully detected story files and provided orchestration recommendations