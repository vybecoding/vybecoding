# BMAD Orchestration Guide

## Quick Start

The BMAD orchestration system enables 3-5x faster development through parallel task execution using sub-agents.

## How It Works

1. **Automatic Detection**: When you mark a story as "Ready for Development", the system analyzes it for parallelization opportunities
2. **Sub-Agent Delegation**: Tasks are distributed to specialized sub-agents that work simultaneously
3. **Real-time Monitoring**: Track progress of all parallel executions
4. **Automatic Integration**: Results are aggregated and conflicts resolved automatically

## Using Enhanced Agents

### Dev Agent (Enhanced)

```bash
/dev-enhanced

# Available commands:
*help      - Show all commands including sub-agent options
*delegate  - Analyze story and create parallel execution plan
*status    - Show sub-agent task progress
*integrate - Aggregate results from sub-agents
```

### SM Agent (Enhanced)

```bash
/sm-enhanced

# Available commands:
*analyze-epics    - Find parallel story creation opportunities
*draft-parallel   - Create stories for multiple epics simultaneously
*status          - Show parallel story creation progress
*integrate-stories - Combine stories from sub-SMs
```

## Monitoring Execution

### Real-time Monitor

```bash
# Start the orchestration monitor
node .bmad-core/utils/orchestration-monitor.js

# Keyboard shortcuts:
D - Dashboard view (default)
T - Timeline view
M - Metrics view
Q - Quit

# Take a snapshot
node .bmad-core/utils/orchestration-monitor.js snapshot
```

### Example Dashboard

```
📊 Overall Progress
████████████████████████████░░░░░░░░░░░░ 70%
Tasks: 21/30

🤖 Sub-Agent Status
─────────────────────────────────────────────
/sub-frontend-impl        ████████████░░░░░░░░ 60%
                         ✓ 6 ⚡ 2 ○ 2

/sub-backend-impl         ████████████████░░░░ 80%
                         ✓ 8 ⚡ 1 ○ 1

/sub-test-impl           ████████░░░░░░░░░░░░ 40%
                         ✓ 4 ⚡ 3 ○ 3

⚡ Active Tasks
─────────────────────────────────────────────
• Create UserProfile component           [2m 15s]
• Implement profile API validation       [1m 30s]
• Write integration tests                [45s]
```

## Parallel Execution Workflow

### 1. Story Analysis

When you have a story ready:

```bash
# Analyze for parallelization
node .bmad-core/utils/bmad-orchestration-bridge.js analyze path/to/story.md
```

Output shows:
- Total tasks and their types
- Execution phases
- Estimated time savings
- Parallelization score

### 2. Execute with Orchestration

```bash
# Execute story with parallel sub-agents
node .bmad-core/utils/bmad-orchestration-bridge.js execute path/to/story.md
```

Or use enhanced Dev agent:

```bash
/dev-enhanced
*delegate
```

### 3. Monitor Progress

The system automatically:
- Distributes tasks to specialized sub-agents
- Tracks progress in TodoWrite format
- Monitors for bottlenecks
- Integrates results

## Sub-Agent Types

### Implementation Sub-Agents
- `/sub-frontend-impl` - UI components, styling, frontend logic
- `/sub-backend-impl` - APIs, business logic, database operations
- `/sub-test-impl` - Unit tests, integration tests, test data
- `/sub-integration` - System integration, API connections

### Continuous Sub-Agents
- `/sub-doc-sync` - Keeps documentation updated
- `/sub-test-runner` - Runs tests continuously
- `/sub-security-scan` - Scans for vulnerabilities
- `/sub-trail-monitor` - Monitors and logs solutions

### Orchestration Sub-Agents
- `/sub-dispatcher` - Analyzes and distributes tasks
- `/sub-coordinator` - Aggregates results and resolves conflicts

## Best Practices

### 1. Story Structure for Parallelization

Good story structure:
```markdown
## Tasks
- [ ] Create user profile component (Frontend)
- [ ] Implement profile API endpoint (Backend)
- [ ] Add profile validation (Backend)
- [ ] Write component tests (Testing)
- [ ] Write API tests (Testing)
```

### 2. Dependency Management

Mark dependencies clearly:
```markdown
- [ ] Create database schema (Backend) [BLOCKING]
- [ ] Create API endpoint (Backend) [DEPENDS: schema]
- [ ] Create UI component (Frontend) [DEPENDS: API contract]
```

### 3. Conflict Prevention

- Use clear naming conventions
- Define API contracts upfront
- Coordinate shared resources
- Let sub-coordinator handle conflicts

## TRAIL Integration

All sub-agents automatically:
- Search for existing solutions before implementing
- Log errors for future learning
- Share solutions with other sub-agents

Example:
```
[sub-frontend-impl]: Error: Cannot read property 'user' of undefined
[TRAIL]: Found solution: Add optional chaining - user?.profile
[sub-frontend-impl]: Applied fix, continuing...
[TRAIL]: Solution shared with all active sub-agents
```

## Metrics and Reporting

After execution, view the report:
```
## Orchestration Results

- Execution Mode: Parallel
- Total Duration: 45 minutes
- Parallelization Efficiency: 78%
- Tasks Completed: 30
- Files Modified: 42
- Tests Added: 18

### Sub-Agent Contributions
- /sub-frontend-impl: 10 tasks, 15 files
- /sub-backend-impl: 12 tasks, 20 files
- /sub-test-impl: 8 tasks, 7 files
```

## Troubleshooting

### Common Issues

1. **Tasks not parallelizing**
   - Check for hidden dependencies
   - Verify task descriptions are clear
   - Use *analyze-epics to identify opportunities

2. **Conflicts during integration**
   - Sub-coordinator automatically resolves most conflicts
   - Check naming conventions
   - Review API contracts

3. **Sub-agent idle**
   - Check task distribution balance
   - Look for blocking dependencies
   - Use monitor to identify bottlenecks

## Advanced Usage

### Custom Sub-Agent Creation

Create specialized sub-agents:
```bash
# Create new sub-agent
cp .claude/sub-agents/bmad/template.md .claude/sub-agents/bmad/custom/sub-my-specialist.md
# Edit to define specialization
```

### Orchestration Hooks

Add custom hooks:
```javascript
// Pre-distribution hook
orchestrator.on('pre-distribute', (tasks) => {
    // Custom task analysis
});

// Post-integration hook
orchestrator.on('post-integrate', (results) => {
    // Custom validation
});
```

## Performance Tips

1. **Optimal Task Size**: 30min - 2hr per task
2. **Phase Planning**: Group by dependencies, not just type
3. **Resource Management**: Monitor CPU/memory during execution
4. **Continuous Integration**: Run tests in parallel with development

This orchestration system transforms BMAD from sequential to parallel execution, dramatically reducing development time while maintaining quality through intelligent coordination and continuous learning.