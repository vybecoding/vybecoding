#!/bin/bash

# BMAD + TMUX Integration Setup Script
# Sets up enhanced BMAD orchestrator with TMUX capabilities

set -e

echo "🚀 Setting up BMAD + TMUX Integration..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d ".claude" ]; then
    print_error "This script must be run from the project root directory"
    print_error "Make sure you're in the vybecoding directory with .claude/ folder"
    exit 1
fi

print_status "Checking prerequisites..."

# Check if TMUX is installed
if ! command -v tmux &> /dev/null; then
    print_error "TMUX is not installed. Please install it first:"
    echo "  macOS: brew install tmux"
    echo "  Ubuntu/Debian: sudo apt-get install tmux"
    echo "  CentOS/RHEL: sudo yum install tmux"
    exit 1
fi

print_success "TMUX is installed: $(tmux -V)"

# Check if Claude Code is available
if ! command -v claude &> /dev/null; then
    print_warning "Claude Code command not found in PATH"
    print_warning "Make sure Claude Code is properly installed and accessible"
fi

# Check if BMAD agents exist
if [ ! -f ".claude/agents/bmad-dev.md" ]; then
    print_error "BMAD agents not found. Please ensure BMAD system is set up first."
    exit 1
fi

print_success "BMAD agents found"

# Verify enhanced orchestrator exists
if [ ! -f ".claude/agents/bmad-tmux-orchestrator.md" ]; then
    print_error "Enhanced BMAD orchestrator not found at .claude/agents/bmad-tmux-orchestrator.md"
    print_error "Please ensure the integration files are properly created"
    exit 1
fi

print_success "Enhanced BMAD orchestrator found"

# Check if TMUX config exists
if [ ! -f ".tmux-bmad.conf" ]; then
    print_error "BMAD TMUX configuration not found at .tmux-bmad.conf"
    print_error "Please ensure the configuration file is created"
    exit 1
fi

print_success "BMAD TMUX configuration found"

print_status "Setting up TMUX configuration..."

# Create TMUX logs directory
mkdir -p "$HOME/.tmux-bmad-logs"
print_success "Created TMUX logs directory: $HOME/.tmux-bmad-logs"

# Copy TMUX config to home directory (optional)
if [ ! -f "$HOME/.tmux-bmad.conf" ]; then
    cp .tmux-bmad.conf "$HOME/.tmux-bmad.conf"
    print_success "Copied TMUX config to home directory"
else
    print_warning "TMUX config already exists in home directory"
fi

print_status "Testing TMUX session creation..."

# Test TMUX session creation
SESSION_NAME="bmad-test-$$"
if tmux new-session -d -s "$SESSION_NAME" -c "$(pwd)" 2>/dev/null; then
    tmux kill-session -t "$SESSION_NAME" 2>/dev/null
    print_success "TMUX session creation test passed"
else
    print_error "Failed to create TMUX session"
    exit 1
fi

print_status "Verifying agent accessibility..."

# Check if agents can be loaded (basic syntax check)
for agent in bmad-dev bmad-qa bmad-sm bmad-tmux-orchestrator; do
    if [ -f ".claude/agents/${agent}.md" ]; then
        # Basic YAML frontmatter check
        if head -n 10 ".claude/agents/${agent}.md" | grep -q "^name: ${agent}"; then
            print_success "Agent ${agent} configuration valid"
        else
            print_warning "Agent ${agent} may have configuration issues"
        fi
    else
        print_warning "Agent ${agent} not found"
    fi
done

print_status "Creating quick start aliases..."

# Create a quick start script
cat > bmad-tmux-start.sh << 'EOF'
#!/bin/bash

# BMAD + TMUX Quick Start Script

SESSION_NAME="${1:-bmad-project}"
PROJECT_DIR="$(pwd)"

echo "🚀 Starting BMAD + TMUX session: $SESSION_NAME"

# Source BMAD TMUX configuration
tmux source-file .tmux-bmad.conf 2>/dev/null || echo "Warning: Could not load .tmux-bmad.conf"

# Create new session with orchestrator
tmux new-session -d -s "$SESSION_NAME" -c "$PROJECT_DIR"
tmux rename-window -t "$SESSION_NAME:1" "Orchestrator"
tmux send-keys -t "$SESSION_NAME:Orchestrator" "claude --agent bmad-tmux-orchestrator" Enter

echo "✅ BMAD + TMUX session '$SESSION_NAME' created"
echo ""
echo "To attach: tmux attach-session -t $SESSION_NAME"
echo "To detach: Ctrl-b d"
echo "To kill: tmux kill-session -t $SESSION_NAME"
echo ""
echo "Quick commands in orchestrator:"
echo "  *tmux-init [project-name]  - Initialize TMUX project"
echo "  *tmux-teams [workflow]     - Spawn team terminals"
echo "  *epic01-parallel [count]   - Epic-01 parallel execution"
echo "  *tmux-status              - Show all terminal status"
EOF

chmod +x bmad-tmux-start.sh
print_success "Created quick start script: bmad-tmux-start.sh"

print_status "Creating Epic-01 integration script..."

# Create Epic-01 specific script
cat > epic01-tmux-parallel.sh << 'EOF'
#!/bin/bash

# Epic-01 TMUX Parallel Execution Script

BATCH_SIZE="${1:-3}"
SESSION_NAME="epic01-parallel"

echo "🎯 Starting Epic-01 parallel execution with $BATCH_SIZE teams"

# Kill existing session if it exists
tmux kill-session -t "$SESSION_NAME" 2>/dev/null || true

# Source BMAD TMUX configuration
tmux source-file .tmux-bmad.conf 2>/dev/null

# Create Epic-01 parallel session
tmux new-session -d -s "$SESSION_NAME" -c "$(pwd)"
tmux rename-window -t "$SESSION_NAME:1" "Epic01-Orchestrator"
tmux send-keys -t "$SESSION_NAME:Epic01-Orchestrator" "claude --agent bmad-tmux-orchestrator" Enter

# Wait a moment for agent to load
sleep 2

# Send Epic-01 parallel command
tmux send-keys -t "$SESSION_NAME:Epic01-Orchestrator" "*epic01-parallel $BATCH_SIZE" Enter

echo "✅ Epic-01 parallel session created with $BATCH_SIZE teams"
echo ""
echo "To monitor: tmux attach-session -t $SESSION_NAME"
echo "To check status: tmux send-keys -t $SESSION_NAME:Epic01-Orchestrator '*tmux-status' Enter"
echo ""
echo "The orchestrator will:"
echo "  1. Create $BATCH_SIZE team terminals"
echo "  2. Assign DEMO stories to each team"
echo "  3. Start autonomous 15-minute check-ins"
echo "  4. Monitor progress across all teams"
EOF

chmod +x epic01-tmux-parallel.sh
print_success "Created Epic-01 script: epic01-tmux-parallel.sh"

print_status "Final verification..."

# Check if everything is ready
READY=true

if [ ! -f ".claude/agents/bmad-tmux-orchestrator.md" ]; then
    print_error "Missing: Enhanced BMAD orchestrator"
    READY=false
fi

if [ ! -f ".tmux-bmad.conf" ]; then
    print_error "Missing: TMUX configuration"
    READY=false
fi

if [ ! -x "bmad-tmux-start.sh" ]; then
    print_error "Missing: Quick start script"
    READY=false
fi

if [ ! -x "epic01-tmux-parallel.sh" ]; then
    print_error "Missing: Epic-01 script"
    READY=false
fi

if [ "$READY" = true ]; then
    print_success "🎉 BMAD + TMUX integration setup complete!"
    echo ""
    echo "📋 Quick Start Guide:"
    echo "  1. Start BMAD + TMUX session:"
    echo "     ./bmad-tmux-start.sh [session-name]"
    echo ""
    echo "  2. For Epic-01 parallel execution:"
    echo "     ./epic01-tmux-parallel.sh [team-count]"
    echo ""
    echo "  3. Manual session creation:"
    echo "     tmux new-session -s my-project"
    echo "     tmux source-file .tmux-bmad.conf"
    echo "     claude --agent bmad-tmux-orchestrator"
    echo ""
    echo "📖 Documentation:"
    echo "  - Integration plan: docs/bmad/tmux-integration-plan.md"
    echo "  - TMUX guide: docs/TMUX.md"
    echo "  - BMAD agents: docs/bmad/sub-agents-integration.md"
    echo ""
    echo "🔧 Configuration files:"
    echo "  - Enhanced orchestrator: .claude/agents/bmad-tmux-orchestrator.md"
    echo "  - TMUX config: .tmux-bmad.conf"
    echo "  - Logs directory: $HOME/.tmux-bmad-logs"
else
    print_error "Setup incomplete. Please check the errors above."
    exit 1
fi
