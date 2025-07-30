# BMAD + TMUX Integration Plan

**Strategy:** Hybrid approach combining BMAD's mature sub-agent architecture with TMUX's terminal multiplexing and autonomous scheduling capabilities.

## Integration Architecture

```
TMUX Session (Persistent)
├── Main Orchestrator Terminal
│   └── Enhanced BMAD Orchestrator (with TMUX awareness)
├── Team Alpha Terminal
│   ├── bmad-dev (Frontend specialist)
│   ├── bmad-qa (Testing & verification)
│   └── Server Monitor (npm run dev)
├── Team Beta Terminal
│   ├── bmad-dev (Backend specialist) 
│   ├── bmad-qa (API testing)
│   └── Server Monitor (npm run convex)
└── Team Gamma Terminal
    ├── bmad-sm (Story management)
    ├── bmad-doc-writer (Documentation)
    └── Git Monitor (auto-commits)
```

## Key Benefits of Hybrid Approach

### 1. **Preserve BMAD Strengths**
- Keep existing specialized agents (bmad-dev, bmad-qa, bmad-sm, etc.)
- Maintain TRAIL learning system integration
- Preserve context isolation and tool specialization
- Keep workflow orchestration capabilities

### 2. **Add TMUX Capabilities**
- Terminal persistence across sessions
- Visual monitoring of parallel work
- Autonomous scheduling with time constraints
- Physical separation of concerns

### 3. **Enhanced Parallel Execution**
- Current Epic-01 parallel workflow gets terminal multiplexing
- Each parallel batch gets dedicated terminal space
- Real-time monitoring of all parallel agents
- Automatic scheduling and check-ins

## Implementation Steps

### Phase 1: TMUX-Aware BMAD Orchestrator

#### 1.1 Create Enhanced Orchestrator
```bash
# New agent: .claude/agents/bmad-tmux-orchestrator.md
```

**Key Features:**
- TMUX session management commands
- Terminal spawning and monitoring
- Scheduling integration with existing workflows
- Team assignment and coordination

#### 1.2 TMUX Integration Commands
```yaml
# Add to bmad-orchestrator.md
tmux_commands:
  *tmux-start: Initialize TMUX session for project
  *tmux-teams: Spawn team terminals with specialized agents
  *tmux-schedule: Set up autonomous check-ins
  *tmux-monitor: Show real-time team status
  *tmux-resume: Resume previous session state
```

### Phase 2: Team Terminal Specialization

#### 2.1 Frontend Team Terminal
```bash
# Terminal layout for frontend work
├── bmad-dev (Frontend specialist)
├── bmad-qa (Visual verification)
└── npm run dev (Auto-restart on changes)
```

#### 2.2 Backend Team Terminal  
```bash
# Terminal layout for backend work
├── bmad-dev (Backend specialist)
├── bmad-qa (API testing)
└── npm run convex (Auto-restart on changes)
```

#### 2.3 Management Team Terminal
```bash
# Terminal layout for project coordination
├── bmad-sm (Story creation/management)
├── bmad-doc-writer (Documentation updates)
└── Git auto-commit (15-minute intervals)
```

### Phase 3: Autonomous Scheduling Integration

#### 3.1 Enhanced Workflow Files
Extend existing BMAD workflows with TMUX scheduling:

```yaml
# Example: Enhanced brownfield-fullstack.yaml
workflow:
  id: brownfield-fullstack-tmux
  tmux_enabled: true
  schedule:
    check_interval: 15 # minutes
    auto_commit: true
    parallel_teams: 3
  
  sequence:
    - stage: foundation
      agent: bmad-architect
      terminal: main
      duration: 30 # minutes
      
    - stage: parallel_development
      teams:
        - terminal: alpha
          agents: [bmad-dev, bmad-qa]
          focus: frontend_pages
        - terminal: beta  
          agents: [bmad-dev, bmad-qa]
          focus: backend_apis
        - terminal: gamma
          agents: [bmad-sm, bmad-doc-writer]
          focus: documentation
```

#### 3.2 Scheduling Commands
```bash
# TMUX scheduling integration
*schedule-start: Begin autonomous workflow execution
*schedule-status: Show progress across all terminals
*schedule-pause: Pause all scheduled activities
*schedule-resume: Resume from last checkpoint
```

## Epic-01 Integration Example

### Current Epic-01 Parallel Workflow Enhancement

**Before (BMAD only):**
```bash
"Execute parallel batch: DEMO-003, DEMO-004, DEMO-005"
# Claude spawns 3 bmad-dev agents in same context
```

**After (BMAD + TMUX):**
```bash
"Execute TMUX parallel batch: DEMO-003, DEMO-004, DEMO-005"
# Claude spawns 3 terminals, each with dedicated bmad-dev + monitoring
```

### Enhanced Terminal Layout for Epic-01
```
┌─ Main Orchestrator
│  └── bmad-tmux-orchestrator (coordination)
├─ Alpha Terminal (DEMO-003)
│  ├── bmad-dev (page implementation)
│  ├── bmad-qa (visual verification)
│  └── localhost:3000/demo-003 (live preview)
├─ Beta Terminal (DEMO-004)
│  ├── bmad-dev (page implementation)  
│  ├── bmad-qa (visual verification)
│  └── localhost:3000/demo-004 (live preview)
└─ Gamma Terminal (DEMO-005)
   ├── bmad-dev (page implementation)
   ├── bmad-qa (visual verification)
   └── localhost:3000/demo-005 (live preview)
```

## Configuration Files

### 1. Enhanced BMAD Orchestrator
Create `.claude/agents/bmad-tmux-orchestrator.md` with TMUX capabilities while preserving existing BMAD functionality.

### 2. TMUX Configuration Template
```bash
# .tmux-bmad.conf
# BMAD-optimized TMUX configuration

# Session settings
set -g default-terminal "screen-256color"
set -g history-limit 10000

# Window naming for BMAD teams
set -g automatic-rename on
set -g automatic-rename-format "#{?#{==:#{pane_current_command},claude},BMAD-#{window_index},#{pane_current_command}}"

# Status bar for team monitoring
set -g status-interval 15
set -g status-left "[BMAD] "
set -g status-right "#{?window_bigger,[#{window_offset_x}#,#{window_offset_y}] ,}%H:%M %d-%b-%y"

# Pane borders for team identification
set -g pane-border-style fg=colour238
set -g pane-active-border-style fg=colour154
```

## Migration Path

### Week 1: Foundation Setup
1. Create `bmad-tmux-orchestrator.md`
2. Add TMUX commands to existing orchestrator
3. Test basic terminal spawning with current agents

### Week 2: Epic-01 Integration
1. Enhance Epic-01 parallel workflow with TMUX
2. Test 3-terminal parallel execution
3. Validate visual monitoring capabilities

### Week 3: Autonomous Scheduling
1. Implement 15-minute check-in system
2. Add progress tracking across terminals
3. Test session persistence and resume

### Week 4: Full Production
1. Deploy enhanced system for Epic-01 completion
2. Monitor performance vs current parallel approach
3. Document lessons learned and optimizations

## Success Metrics

### Performance Improvements
- **Session Persistence**: Resume work instantly vs context rebuilding
- **Visual Monitoring**: Real-time status vs manual checking
- **Autonomous Operation**: Scheduled check-ins vs manual coordination

### Quality Maintenance
- **TRAIL Integration**: Maintain shared learning across terminals
- **Context Isolation**: Preserve agent specialization benefits
- **Error Handling**: Enhanced debugging with terminal separation

### Timeline Impact
- **Epic-01 Acceleration**: Target 3-week completion vs current 4-week parallel
- **Future Projects**: Template for complex multi-team workflows
- **Developer Experience**: Reduced monitoring overhead

## Conclusion

This hybrid approach leverages the mature BMAD agent architecture while adding TMUX's powerful terminal multiplexing and autonomous scheduling capabilities. The result is a more robust, persistent, and visually monitorable parallel workflow system that maintains all existing benefits while adding significant new capabilities.

The integration preserves the investment in current BMAD agents and workflows while providing a clear upgrade path for complex projects requiring sustained parallel execution and autonomous operation.
