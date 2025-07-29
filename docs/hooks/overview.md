# Claude Code Hooks System Overview

## What are Claude Code Hooks?

Claude Code hooks enable automated workflows that trigger on specific events during your Claude Code sessions. These hooks run automatically in response to tool usage, file edits, and other events, enabling powerful automation and security features.

## How Hooks Work

1. **Event-Driven**: Hooks trigger on specific Claude Code events like `PostToolUse`, `PreSession`, etc.
2. **Chained Execution**: Multiple hooks can be chained together using `&&` operators
3. **Environment Variables**: Hooks receive context via environment variables like `{{toolName}}`, `{{filePath}}`, `{{timestamp}}`
4. **Background Execution**: Hooks run in the background without interrupting your workflow

## Hook Configuration

All hooks are configured in `.claude/settings.json`:

```json
{
  "hooks": {
    "PostToolUse": {
      "Bash": "hook1.sh && hook2.sh && hook3.sh",
      "Edit": "edit-hook.js '{{filePath}}'"
    }
  }
}
```

## Available Hook Events

- **PreSession**: Triggers when Claude Code session starts
  - Example: Pre-session hook shows ready stories and setup status
- **PreToolUse**: Triggers before any tool is used (for auto-approval, validation, etc.)
  - Example: Claude Code Boost auto-approves common operations
- **PostToolUse**: Triggers after any tool is used (Bash, Edit, Write, etc.)
  - Can be configured per tool: `PostToolUse.Bash`, `PostToolUse.Edit`, etc.
- **PostResponse**: Triggers after Claude generates a response
  - Example: Post-response scan for malicious AI patterns
- **Stop**: Triggers when Claude Code session ends
  - Example: Task complete hook for session cleanup

## Hook Types in vybecoding

### 1. Security Hooks
- Environment sanitization
- XSS prevention
- Living off AI detection
- Path validation

### 2. Automation Hooks
- Claude Code Boost (auto-approval of common operations)
- TRAIL system (test and learn)
- Auto-commit to git
- Continuous learning
- Story orchestration

### 3. Development Hooks
- Pre-session analysis
- Auto-approval decisions
- Task completion tracking
- Pattern recognition

## Benefits

- **Zero Manual Work**: Automation happens in the background
- **Security by Default**: Security checks run automatically
- **Knowledge Building**: Systems learn from every interaction
- **Workflow Optimization**: Intelligent automation speeds development

## Current Hook Configuration Status ✅

All hooks are now active in `.claude/settings.json`:

| Hook Event | Hook Name | Status | Function |
|------------|-----------|--------|----------|
| PreSession | Pre-Session Hook | ✅ Active | Shows ready stories and setup status |
| PreToolUse | Claude Code Boost | ✅ Active | Auto-approves Bash, Edit, MultiEdit, Write |
| PostToolUse.* | Environment Sanitization | ✅ Active | Cleans sensitive data from outputs |
| PostToolUse.* | Auto-Commit | ✅ Active | Commits changes to main branch |
| PostToolUse.Edit/Write | Post-Edit Sanitize | ✅ Active | XSS prevention |
| PostToolUse.Bash | Continuous Learning | ✅ Active | Pattern recognition |
| PostResponse | Post-Response Scan | ✅ Active | Detects malicious AI patterns |
| Stop | Task Complete | ✅ Active | Session cleanup and review |

## Quick Start

1. Hooks are already configured in `.claude/settings.json`
2. View hook activity: `.claude/config/hooks/view-claude-commits.sh`
3. Check security alerts: `tail -f .claude/solutions/security/living-off-ai-alerts.log`
4. Search learned solutions: `.claude/solutions/search.sh "error"`

## Best Practices

1. **Chain Order Matters**: Place security checks first in hook chains
2. **Error Handling**: Hooks should exit gracefully on errors
3. **Performance**: Keep hooks fast to avoid slowing down Claude
4. **Logging**: Use consistent logging for debugging
5. **Testing**: Test hooks manually before adding to chains

## Related Documentation

- [Claude Code Boost](https://github.com/yifanzz/claude-code-boost) - Auto-approval system (PreToolUse hook)
- [TRAIL System Hook](./trail-system.md) - Automatic testing and learning
- [Security Hooks](./security-hooks.md) - Security automation
- [Auto-Commit Hook](./auto-commit.md) - Git automation
- [Continuous Learning](./continuous-learning.md) - Pattern recognition and learning
- [Complete Setup Guide](./setup-all-hooks.md) - Full installation instructions