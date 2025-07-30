# TMUX Orchestrator Guide

A concise guide to setting up autonomous AI agent teams using TMUX and Claude Code.

> **🔗 Integration Note**: This project includes a mature BMAD sub-agent system. See `docs/bmad/tmux-integration-plan.md` for the recommended hybrid approach that combines TMUX multiplexing with existing BMAD agents for enhanced parallel workflows.

## Key Concepts

### TMUX (Terminal Multiplexer)
- Creates multiple terminal sessions within one window
- Allows one Claude Code instance to spawn and control multiple terminals
- Sessions persist in memory - resume exactly where you left off
- Enables parallel agent execution

### Terminal Scheduling
- Assign tasks to agents with specific timing parameters
- Agents perform actions at designated times automatically
- No constant monitoring required
- Self-running system following predefined schedules

## Quick Setup

### 1. Clone Repository
```bash
# Navigate to desired directory
git clone [TMUX-ORCHESTRATOR-REPO-URL]
cd tmux-orchestrator
```

### 2. Run Setup
```bash
# Execute setup scripts (makes files executable)
./setup.sh
```

### 3. Start TMUX Session
```bash
# Create new TMUX session
tmux new-session -s agent-team
```

## Required Fixes

### Fix 1: Path Configuration
1. Initialize Claude Code in TMUX session:
   ```bash
   claude
   ```
2. Run verification prompt (Claude will auto-detect and fix hard-coded paths)
3. Claude will update configuration files to work with your system

### Fix 2: Permissions Flag
Ask Claude Code to:
- Edit all command files
- Replace `claude` command with `claude --dangerously-skip-permissions`
- This enables autonomous execution without approval prompts

## Project Structure

```
project-root/
├── tmux-orchestrator/     # Cloned repository
└── app/
    ├── spec/              # Project specifications
    │   ├── main-spec.md
    │   ├── integration-spec.md
    │   ├── frontend-spec.md
    │   └── backend-spec.md
    └── task-manager/       # Built application
```

## Specification Files

### Critical Components
- **main-spec.md**: Overall project blueprint with timing for each phase
- **integration-spec.md**: How components work together
- **frontend-spec.md**: UI/UX requirements and implementation
- **backend-spec.md**: API, database, and server requirements

### Template Structure
```markdown
# Project: [Name]
## Timeline: [Duration]
## Teams: Frontend, Backend, [Additional]
## Phases:
1. Phase 1 (15 min): Setup & Foundation
2. Phase 2 (15 min): Core Development
3. Phase 3 (15 min): Integration & Testing
```

## Starting the Orchestrator

### Initialization Prompt Template
```
Create autonomous development teams for: [PROJECT_NAME]

Spec Path: /home/[USERNAME]/[FULL_PATH_TO_SPEC_FOLDER]

Teams to create:
- Frontend team (project manager + developer)
- Backend team (project manager + developer)
- [Additional teams as needed]

Schedule 15-minute check-ins for progress monitoring.
Enable automatic git commits for version control.
```

### Team Structure
Each team gets 3 terminals:
- **Project Manager**: Coordinates tasks and timeline
- **Developer**: Writes and implements code
- **Server**: Runs tests and error checking

## Workflow Features

### Autonomous Operation
- Teams work simultaneously on different components
- 15-minute automated check-ins
- Progress tracking and phase management
- Automatic git commits for restore points
- No manual intervention required

### Monitoring
- Real-time status updates
- Phase completion notifications
- Error detection and reporting
- Schedule adherence tracking

## Terminal Layout
```
┌─ Main Agent (Orchestrator)
├─ Frontend Team
│  ├─ Project Manager
│  ├─ Developer
│  └─ Test Server
└─ Backend Team
   ├─ Project Manager
   ├─ Developer
   └─ Test Server
```

## Best Practices

### Specification Writing
- Be specific about requirements
- Include timing constraints
- Define clear deliverables
- Specify technology stack
- Include UI/UX references if applicable

### Project Management
- Review at each 15-minute checkpoint
- Configure auto-progression or manual approval
- Monitor terminal outputs for errors
- Use git history for rollbacks if needed

### Troubleshooting
- Ensure `--dangerously-skip-permissions` flag is set
- Verify all paths are absolute (not relative)
- Check TMUX session is properly initialized
- Confirm specification files are accessible

## Advanced Usage

### Adding Teams
```
Create [TEAM_NAME] team (project manager + developer)
```

### Custom Scheduling
- Modify timing in main-spec.md
- Adjust check-in intervals
- Set phase-specific deadlines

### Integration with UI References
- Include design images in spec folder
- Add implementation plans (e.g., ShadCN components)
- Reference external UI frameworks

## Repository Analysis
Use GitIngest for easy setup:
1. Replace `github.com` with `gitingest.com` in repository URL
2. Copy AI-readable summary
3. Paste into Claude/ChatGPT for step-by-step guidance

## BMAD Integration

This project includes a mature BMAD sub-agent system that can be enhanced with TMUX capabilities:

### Hybrid Approach Benefits
- **Preserve BMAD Strengths**: Keep specialized agents (bmad-dev, bmad-qa, bmad-sm)
- **Add TMUX Capabilities**: Terminal persistence, visual monitoring, autonomous scheduling
- **Enhanced Parallel Execution**: Current Epic-01 workflow gets terminal multiplexing
- **Seamless Integration**: No disruption to existing workflows

### Quick Start with BMAD
```bash
# Use enhanced BMAD orchestrator with TMUX
claude --agent bmad-tmux-orchestrator

# Initialize TMUX session for project
*tmux-init vybecoding-migration

# Execute Epic-01 parallel batch with TMUX
*epic01-parallel 3
```

### Configuration Files
- **Enhanced Agent**: `.claude/agents/bmad-tmux-orchestrator.md`
- **TMUX Config**: `.tmux-bmad.conf` (optimized for BMAD workflows)
- **Integration Plan**: `docs/bmad/tmux-integration-plan.md`

## Notes
- System requires Claude Code with appropriate permissions
- TMUX sessions maintain context between uses
- All agents work independently but coordinately
- Built-in version control prevents data loss
- Scalable to multiple teams and complex projects
- **Recommended**: Use BMAD integration for existing projects
