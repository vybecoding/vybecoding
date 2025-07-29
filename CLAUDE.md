# CLAUDE.md - Project Instructions and Context

**Last Updated:** 2025-01-29  
**Version:** 2.3  
**Review Schedule:** Weekly or after major changes

## TRAIL - Test, Resolve, And Intelligently Learn

This project has an intelligent 3-level debugging system that automatically tests code changes, learns from solutions, and escalates to visual debugging when needed.

## Installation Rule

**Always use @latest or pull latest when installing/updating any tools or dependencies.** This ensures you get the most recent versions with latest features and security fixes.

## How It Works

1. **Automatic Testing**: After every code edit, the system automatically:
   - Runs your test suite
   - Captures any errors
   - Searches for known solutions
   - Escalates if needed

2. **3-Level Intelligence**:
   - **Level 1**: Check local solutions database (instant)
   - **Level 2**: Web search for similar errors (5-10 seconds)
   - **Level 3**: Playwright visual debugging (comprehensive)

3. **Zero Manual Work**: Everything happens automatically - no prompting needed

## Using Previous Solutions

### Search for past fixes:
```bash
.claude/solutions/search.sh "tailwind"
.claude/solutions/search.sh "syntax error"
.claude/solutions/search.sh "config"
```

### MCP Memory Access:
When Claude Code starts with MCP enabled, it can access:
- `@solutions-memory:all` - View all solutions
- `@solutions-memory:recent` - View recent solutions
- Use tool `search_solutions` to find specific fixes

## Architecture

```
.claude/
├── settings.json          # Hooks configuration
├── config/
│   └── mcp-settings.json  # MCP server config

.claude/solutions/
├── verify-and-learn.sh    # Main testing & learning script
├── playwright-debug.js    # Visual debugging with Playwright
├── search.sh              # Search utility
├── memory-server.js       # MCP server
├── solutions.log          # Solution database
└── debug/                 # Visual debugging artifacts
    ├── session_*/         # Debug sessions with traces
    ├── screenshots/       # Error screenshots
    └── logs/             # Console & network logs
```

## How the System Works

### On Every Code Edit:
1. **Automatic Test Run**: Detects and runs appropriate test command (npm test, pytest, etc.)
2. **Error Detection**: Captures test failures and extracts error messages
3. **Smart Escalation**:
   - First checks local solutions database
   - If not found, triggers web search
   - If still unresolved, launches Playwright visual debugging

### Visual Debugging Mode:
When triggered, Playwright:
- Opens browser with DevTools
- Records everything (video, screenshots, traces)
- Captures synchronized console logs and network activity
- Creates comprehensive debug session with all artifacts
- View trace with: `npx playwright show-trace .claude/solutions/debug/session_*/trace.zip`

### Automatic Learning:
- When tests pass after failing, the fix is automatically logged
- Solutions include full context: error, fix, and test results
- No manual documentation needed

## Benefits

- Never solve the same problem twice
- Build institutional knowledge
- Works offline
- Private and local
- No manual documentation needed

## Example Workflow

1. You edit a component that breaks tests
2. System automatically runs tests and detects failure
3. Searches local solutions - if found, shows you the fix
4. If not found, searches web for similar errors
5. If still unresolved, launches Playwright:
   - Opens browser showing the error
   - Records console errors, network failures
   - Creates full trace for debugging
6. When you fix it, the solution is automatically saved
7. Next time this error occurs, it's fixed instantly

## Setup Requirements

- Node.js project with test command in package.json
- For visual debugging: `npm install -D playwright`
- Hooks must be enabled in Claude Code session

## Testing Best Practices

### Test File Organization
**Always create test files in a `__tests__` directory, never in the root folder.**
- Unit tests: `__tests__/unit/`
- Integration tests: `__tests__/integration/`
- Temporary tests: `__tests__/temp/`

### Temporary Test Cleanup
**For one-off tests or debugging:**
1. Create in `__tests__/temp/test-*.js`
2. After running successfully, delete immediately
3. If the test reveals a bug, move to appropriate test directory

### Example Structure
```
project/
├── __tests__/
│   ├── unit/
│   │   └── components.test.js
│   ├── integration/
│   │   └── api.test.js
│   └── temp/
│       └── test-debug-issue.js  ← Delete after use
├── src/
└── package.json
```

### Cleanup Command
Add to package.json:
```json
"scripts": {
  "test:cleanup": "rm -rf __tests__/temp/*"
}
```

This system turns every debugging session into permanent, searchable knowledge with visual proof of what went wrong and how it was fixed.

## Verification-First Development

**NEVER claim something exists without checking first.**

Before documenting ANY external resource:
1. Use Grep to search for existing references
2. Use WebFetch to verify URLs return 200
3. Use Bash to test installation commands
4. Only document what you've verified exists

Before making ANY claims about functionality:
1. Read the actual source code
2. Test the feature if possible
3. Check documentation with WebFetch
4. Admit uncertainty when unsure

## Anti-Toxic-Positivity Rules

1. **Be Realistic**: Don't say "This is easy!" - explain actual complexity
2. **Acknowledge Failures**: When something fails, say so clearly
3. **Show Limitations**: Be upfront about what might not work
4. **Test Before Claiming**: Never say "This will work" without testing

## Development Principles

### Minimal Code Impact Rule
**"Every change should affect the smallest amount of code necessary to achieve the goal."**

### Core Principles

1. **NO TEMPORARY FIXES** - Find and fix root causes, never apply band-aids
2. **Surgical Precision** - Change only what's directly needed
3. **Single Purpose** - Each change solves exactly one problem
4. **Simplicity First** - Choose the simplest solution that works

### Guidelines for Minimal Impact

#### ✅ GOOD Examples:
```javascript
// Task: Fix validation error
// Change: Add missing validation check (1 line)
if (!email) return showError('Email required');

// Task: Update config value  
// Change: Modify only the specific setting
config.timeout = 5000; // was 3000
```

#### ❌ BAD Examples:
```javascript
// Task: Fix validation error
// Change: Refactored entire form system, updated 8 files

// Task: Update config value
// Change: Reorganized config structure, added new features
```

### When Making Changes:

1. **Ask First**: "What's the minimum change to fix THIS issue?"
2. **Resist Temptation**: Don't fix unrelated problems you notice
3. **Stay Focused**: Complete current task before identifying new ones
4. **Document Scope**: If you see other issues, add them to todos

### Exceptions (When Larger Changes Are OK):

- Security vulnerabilities (must be thorough)
- Breaking API changes (cascading updates required)  
- Global renaming (inherently affects many files)
- Explicitly requested refactoring

### Anti-Patterns to Avoid:

- **"While I'm Here"**: Fixing unrelated issues in same commit
- **Feature Creep**: Adding unrequested functionality
- **Style Crusades**: Reformatting code while fixing bugs
- **Premature Optimization**: Performance tweaks not requested

### Complexity Indicators:

- **SIMPLE**: 1-2 files, <50 lines, single module
- **MEDIUM**: 3-5 files, <200 lines, crosses 2 modules  
- **COMPLEX**: >5 files, >200 lines, system-wide impact

Remember: Smaller changes = fewer bugs, easier reviews, cleaner history!

## Security Rules (Auto-Applied)

### Input Validation (validator.js) ✅
- **ALWAYS validate user inputs** using validator.js before processing
- Use `validator.isEmail()`, `validator.isURL()`, `validator.escape()` etc.
- Never trust user input - validate everything
- **Status**: Installed (validator@13.15.15)

### XSS Prevention (DOMPurify) ✅
- **ALWAYS sanitize HTML** before rendering with DOMPurify
- Use `DOMPurify.sanitize(htmlString)` for any user-generated content
- Never use `innerHTML` with unsanitized data
- **Status**: Installed (dompurify@3.2.6 + jsdom@26.1.0)

### Timing Attack Prevention (safe-compare) ✅
- **ALWAYS use safe-compare** for authentication token comparisons
- Use `safeCompare(userToken, expectedToken)` instead of `===`
- Never use direct string comparison for sensitive data
- **Status**: Installed (safe-compare@1.1.4)

### Living off AI Defense (Automated) ✅
- **Hook automatically scans all AI responses** for malicious patterns
- Detects hidden instructions, prompt injections, role confusion attacks
- Logs suspicious activity to `.claude/solutions/security/living-off-ai-alerts.log`
- Always verify AI suggestions independently before execution
- **Status**: Active via UserPromptSubmit hook

### Additional Security Tools ✅
- **GitGuardian**: Automatic secret scanning (ggshield v1.41.0)
- **Snyk**: Continuous dependency monitoring (v1.1298.1)
- **Nuclei**: Vulnerability scanning (v3.3.7)
- **MCP-Scan**: MCP server security analysis (v0.3.2)
- **HashiCorp Vault**: Secrets management (v1.15.4)

## Parallel Task Execution

### When to Execute Tasks in Parallel
**ALWAYS batch multiple independent operations** to maximize efficiency:
- Multiple file reads/searches
- Multiple bash commands that don't depend on each other
- Multiple web searches or API calls
- Multiple file edits to different files

### How to Execute in Parallel
```
# Good - Parallel execution (single message, multiple tool calls)
<function_calls>
<invoke name="Read">file1.js</invoke>
<invoke name="Grep">search pattern</invoke>
<invoke name="Bash">git status</invoke>
</function_calls>

# Bad - Sequential execution (wastes time)
<function_calls><invoke name="Read">file1.js</invoke></function_calls>
<function_calls><invoke name="Grep">search pattern</invoke></function_calls>
<function_calls><invoke name="Bash">git status</invoke></function_calls>
```

### Parallel Todo Management
When working on multiple independent tasks:
1. Mark multiple todos as `in_progress` simultaneously
2. Work on them in parallel using batched tool calls
3. Complete them as they finish, not all at once

### Examples of Parallel Operations
- **Research Phase**: Read multiple files + search patterns + check docs simultaneously
- **Security Checks**: Run Snyk + check GitGuardian + scan with MCP-Scan in parallel
- **Git Operations**: git status + git diff + git log in one batch
- **Multi-file Edits**: Edit config files + update docs + modify code simultaneously

### Sound Notifications
A sound will play after each response to notify completion:
- Short beep: Quick responses
- Completion sound: Long responses
- Error sound: When operations fail

## Production Error Monitoring

When working on bug fixes, check Sentry for recent errors:
```bash
.claude/solutions/sentry-monitor.sh fetch
```

This helps identify patterns and recurring issues that TRAIL can learn from.

## VybeHacks Documentation

Additional VybeHack documentation and setup scripts are located in `docs/vybehacks/`:
- VERIFY-FIRST.md - Full anti-hallucination protocol
- VYBEHACKS-FROM-SCRATCH.md - Complete recreation guide
- setup-vybehacks.sh - One-command setup script

## Slash Commands

### /update-docs - Automatic Documentation Updater
Automatically updates all documentation files (READMEs, docs/*.md, CLAUDE.md) based on code changes:
```bash
# Run after making code changes
/update-docs
```

Features:
- Analyzes git changes and project structure
- Updates feature lists, installation instructions, and usage examples
- Synchronizes documentation with actual code
- Generates accurate file structures and API references
- Updates configuration documentation
- Maintains consistent documentation style

Helper script for manual analysis:
```bash
.claude/solutions/update-docs.sh
```

## Auto-Commit System ✅

### Automatic Main Branch Commits
Every successful code change is automatically committed to the main branch:

**Features:**
- Automatic commits to main branch after successful edits
- Formatted commit messages: `claude-01-[01/27 02:30PM]: edit module/file.js`
- Incremental numbering tracked in `.claude-commit-count`
- Only commits when on main branch (skips other branches)
- Only commits error-free changes
- Complexity indicators: [SIMPLE], [MEDIUM], or [COMPLEX]

**Configuration Status**: Active in `.claude/settings.json` PostToolUse hooks

**View Claude Commits:**
```bash
git log --oneline | grep "claude-"
```

**Manual Control:**
- Disable: Remove auto-commit from hooks in `.claude/settings.json`
- Reset counter: `echo "0" > .claude-commit-count`
- View log: `cat /tmp/claude-auto-commit.log`

This provides a complete history of all Claude Code changes directly in your main branch!

## Active Claude Code Hooks ✅

All hooks are now properly configured in `.claude/settings.json`:

### SessionStart Hook
- **Pre-Session Hook**: Shows ready stories and setup status on startup

### PreToolUse Hooks
- **Claude Code Boost (CCB)**: Auto-approves safe tools
  - Auto-approves: Bash, Edit, MultiEdit, Write operations
  - Configured via `ccb auto-approve-tools` command

### PostToolUse Hooks
- **Auto-Commit**: Commits all changes to main branch with complexity indicators
- **Environment Sanitization**: Cleans sensitive data from all tool outputs
- **Post-Edit Sanitize**: XSS prevention on Edit/Write operations
- **Continuous Learning**: Pattern recognition on Bash commands
- **Orchestration**: BMAD story automation

### UserPromptSubmit Hook
- **Post-Response Scan**: Detects malicious AI patterns in responses

### Stop Hook
- Currently empty - task completion sounds handled by CCB

### Valid Hook Types
- PreToolUse
- PostToolUse
- Notification
- UserPromptSubmit
- SessionStart
- Stop
- SubagentStop
- PreCompact

Note: PostResponse is not a valid hook type in the current Claude CLI version.

## Task Management with TodoWrite

### Best Practices for Planning

When using plan mode with TodoWrite:

1. **Break Down Complex Tasks**
   ```
   ❌ BAD: "Implement authentication system"
   ✅ GOOD: 
      - "Create user model and database schema"
      - "Implement login endpoint"
      - "Add JWT token generation"
      - "Create middleware for protected routes"
      - "Write tests for auth flow"
   ```

2. **Prioritize Effectively**
   - **high**: Blocking issues, security fixes, core functionality
   - **medium**: Features, non-critical bugs, improvements
   - **low**: Nice-to-have, documentation, cleanup

3. **Use Plan Mode + TodoWrite Together**
   ```
   You: Let's use plan mode to add search functionality
   Claude: [Researches codebase, creates detailed todos]
   You: [Approves plan]
   Claude: [Executes todos one by one, tracking progress]
   ```

4. **Track Progress Accurately**
   - Mark as `in_progress` BEFORE starting work
   - Only one task `in_progress` at a time (unless parallel)
   - Mark `completed` immediately when done
   - Don't batch status updates

5. **Document Blockers**
   - If stuck, keep task as `in_progress`
   - Add new todo for the blocker
   - Example: "Fix TypeScript error in auth module [blocked by: Update types package]"

### Session Reviews

Generate comprehensive session reviews:
```bash
.claude/solutions/generate-review.sh
```

Reviews include:
- All changes made (with complexity metrics)
- Files modified by type
- Solutions learned
- Recommendations for improvement

### Integration with Auto-Commits

Every change is tracked with complexity indicators:
- `[SIMPLE:1 file]` - Single file, <50 lines
- `[MEDIUM:3 files]` - Multiple files, <200 lines
- `[COMPLEX:8 files]` - Many files or system-wide changes

This helps identify when to break down tasks further.

## BMAD Method v4.33.0 Integration

The BMAD Method v4.33.0 provides structured story management through specialized agents, now available as Claude Code sub-agents for automatic delegation.

### Available BMAD Agents
**Core Agents (Slash Commands and Sub-Agents):**
- **Dev** (`/dev` or `bmad-dev`) - Full stack development (James)
- **SM** (`/sm` or `bmad-sm`) - Story management (Stella)
- **QA** (`/qa` or `bmad-qa`) - Quality assurance (Quinn)
- **PO** (`/po` or `bmad-po`) - Product owner (Olivia)
- **PM** (`/pm` or `bmad-pm`) - Project management (Parker)

**Additional Agents (Slash Commands):**
- **Analyst** (`/analyst`) - Business requirements analysis
- **Architect** (`/architect`) - System architecture design (Alex)
- **UX Expert** (`/ux-expert`) - User experience design
- **BMAD Master** (`/bmad-master`) - Meta orchestration
- **BMAD Orchestrator** (`/bmad-orchestrator`) - Workflow coordination

**Additional Sub-Agents (Claude Code Delegation):**
- `bmad-architect` - System architecture (Alex)
- `bmad-doc-writer` - Documentation (Dana)
- `bmad-analyst` - Business analysis
- `bmad-ux` - User experience design
- `bmad-devops` - Infrastructure and deployment

**Infrastructure Agents:**
- **Infra DevOps Platform** (`/infra-devops-platform`) - Infrastructure management

### Claude Code Sub-Agent Integration

BMAD agents are now available as Claude Code sub-agents in `.claude/agents/`:
- **Automatic Delegation**: Claude Code selects the appropriate agent based on your request
- **Context Isolation**: Each sub-agent has its own clean context window
- **Tool Specialization**: Each agent only has access to relevant tools
- **Structured Reporting**: Sub-agents report back in a format Claude Code can present clearly

Example: When you say "create a story for user login", Claude Code automatically delegates to `bmad-sm`.

### VybeHacks + BMAD Integration

#### TRAIL Integration
- All BMAD agents use `.claude/solutions/search.sh` before tasks
- Errors trigger learning and solution storage
- Solutions available across all agents

#### Hook Integration  
- Changes tracked in auto-commits
- Session reviews capture all modifications
- Documentation auto-updates after changes

#### Security Enforcement
- All agents apply CLAUDE.md security rules
- Automatic validation/sanitization
- No temporary fixes allowed

### Best Practices
1. **Use appropriate agent for task type** - Dev for coding, SM for stories
2. **Follow BMAD workflows** - Each agent has specific commands
3. **Monitor with TodoWrite** - Track all work systematically
4. **Trust TRAIL** - Apply learned solutions immediately
5. **Review session changes** - Use generate-review.sh

## Continuous Learning System

The project now includes an intelligent continuous learning system that improves execution over time.

### How It Works

1. **Pattern Recognition**: Analyzes errors, performance metrics, and task distributions
2. **Automatic Learning**: Learns from every success and failure
3. **Pattern Application**: Applies learned patterns to new tasks automatically
4. **Continuous Improvement**: Gets smarter with every execution

### Learning Types

- **Error Resolution**: Common errors and their fixes
- **Performance Optimization**: Execution improvements
- **Integration Conflicts**: Resolution patterns
- **Security Fixes**: Automated security corrections

### Commands

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

### Integration with BMAD

- BMAD agents benefit from learned patterns
- Error patterns shared across all agents
- Performance optimizations applied automatically

### Metrics Tracked

- Task completion times by type
- Error rates and resolutions
- Learning application success rate

This creates a self-improving development system that gets faster and more reliable over time!

## Autonomous Operation Rules

### Story Selection Automation
- **Auto-detect story context**: When user opens a story file or mentions a story ID, automatically activate dev agent
- **Auto-progress tracking**: Use TodoWrite to track all story tasks without prompting

### Smart Approval Rules
**Auto-approve these without asking:**
- Security fixes that:
  - Match known patterns in continuous learning
  - Are marked as automated in CLAUDE.md rules
  - Have been successfully applied 3+ times before
- Test execution after changes complete
- Documentation updates via /update-docs
- Session reviews and learning reports

### Proactive Behaviors
**Automatically perform these actions:**
- On session start: Check for "Ready for Development" stories and display summary
- Every 4 hours: Generate comprehensive session review
- After 10 tool uses: Run continuous learning analysis
- On story completion: Auto-select next highest priority story
- On error detection: Search TRAIL before displaying error
- On test failure: Analyze with continuous learning for known fixes

### Context-Aware Activation
**Recognize these patterns and act:**
- "work on [story/feature]" → Activate dev agent, load story
- "create stories" → Activate sm agent
- "fix [error]" → Search TRAIL, apply known solutions
- "what's next" → Show priority stories, suggest highest
- File paths containing "story" → Load for development

### Batching Operations
**Group these for single approval:**
- Multiple ready stories → Show summary table, get batch approval
- Multiple security fixes → Group by type, single decision per type
- Multiple pattern applications → Apply all high-confidence as batch
- End-of-session items → Single comprehensive review

### Continuous Learning Auto-Application
**Apply without confirmation when:**
- Pattern confidence > 95%
- Similar error solved 5+ times with same fix
- Security fix automated and tested 3+ times
- Performance optimization with proven metrics

### Exception Handling
**Still require human input for:**
- PRD creation and initial epic definition
- Ambiguous requirements after analysis
- External API keys and credentials
- Architecture decisions and trade-offs
- Production deployment approval
- Breaking changes to public APIs

## Core Development Rules (Priority Order)

### Priority 1: Security and Quality
1. **Security First**: All user input must be validated with validator.js
2. **XSS Prevention**: All HTML must be sanitized with DOMPurify
3. **Safe Comparisons**: Use safe-compare for authentication tokens
4. **Verification**: Always verify claims before documenting them

### Priority 2: Code Efficiency
1. **Minimal Impact**: Change only what's necessary to fix the issue
2. **No Temporary Fixes**: Always address root causes
3. **Parallel Execution**: Batch independent operations
4. **Existing Files**: Edit existing files rather than creating new ones

### Priority 3: Documentation
1. **Create docs only when**: Explicitly requested by user
2. **Auto-update docs**: Use /update-docs after significant changes
3. **Verify first**: Test all examples and commands before documenting

### Priority 4: Automation
1. **Be Proactive**: Execute high-confidence actions automatically
2. **Batch Approvals**: Group similar items for single decision
3. **Learn Continuously**: Apply patterns with >95% confidence
4. **Track Progress**: Always use TodoWrite for task management

## Prototype Development

The prototype in `/prototype` serves as a rapid development environment for UI/UX experimentation. It now includes structured pages:

### New Page Structure
- **Apps Pages**: `/pages/apps/` - Browse and submit apps
- **Dashboard Pages**: `/pages/dashboard/` - Overview, profile, settings, mentorship
- **Guides Pages**: `/pages/guides/` - Browse and submit guides
- **Profile Pages**: `/pages/profile/` - Public profiles with booking

### Prototype Guidelines
1. **Use for rapid prototyping** before implementing in Next.js
2. **Test UI patterns** with live reload via Live Server
3. **Maintain consistency** with main app design system
4. **Document patterns** that will migrate to production

See [docs/prototype-migration-plan.md](docs/prototype-migration-plan.md) for migration strategy.

## Review Reminder

⚠️ **This file should be reviewed and updated:**
- After major feature additions
- When workflow patterns change
- If automation rules need adjustment
- At least once per week during active development

Use `/memory` to edit this file or update directly with improvements learned during development.