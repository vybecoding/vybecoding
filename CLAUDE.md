# TRAIL - Test, Resolve, And Intelligently Learn

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
.solutions/search.sh "tailwind"
.solutions/search.sh "syntax error"
.solutions/search.sh "config"
```

### MCP Memory Access:
When Claude Code starts with MCP enabled, it can access:
- `@solutions-memory:all` - View all solutions
- `@solutions-memory:recent` - View recent solutions
- Use tool `search_solutions` to find specific fixes

## Architecture

```
.claude-code/
├── settings.json          # Hooks configuration
└── mcp-settings.json      # MCP server config

.solutions/
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
- View trace with: `npx playwright show-trace .solutions/debug/session_*/trace.zip`

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

## BMAD Method Commands

When working on complex features, use these structured commands:

### Planning Phase
Use `/create-base-prp` to:
- Systematically research the problem space
- Gather comprehensive context
- Create implementation blueprint

### Execution Phase  
Use `/execute-base-prp` to:
- Follow 6-step structured workflow
- Apply ULTRATHINK strategic planning
- Implement with validation loops

These commands complement BMAD's agent orchestration by providing structured workflows within each agent's work.

## Production Error Monitoring

When working on bug fixes, check Sentry for recent errors:
```bash
.solutions/sentry-monitor.sh fetch
```

This helps identify patterns and recurring issues that TRAIL can learn from.

## VybeHacks Documentation

Additional VybeHack documentation and setup scripts are located in `docs/vybehacks/`:
- VERIFY-FIRST.md - Full anti-hallucination protocol
- VYBEHACKS-FROM-SCRATCH.md - Complete recreation guide
- setup-vybehacks.sh - One-command setup script