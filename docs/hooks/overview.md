# Claude Code Hooks System Overview

## What are Claude Code Hooks?

Claude Code hooks enable automated workflows that trigger on specific events during your Claude Code sessions. These hooks run automatically in response to tool usage, file edits, and other events, enabling powerful automation and security features.

## How Hooks Work

1. **Event-Driven**: Hooks trigger on specific Claude Code events like `PostToolUse`, `PreSession`, etc.
2. **Chained Execution**: Multiple hooks can be chained together using `&&` operators
3. **Environment Variables**: Hooks receive context via environment variables like `{{toolName}}`, `{{filePath}}`, `{{timestamp}}`
4. **Background Execution**: Hooks run in the background without interrupting your workflow

## Hook Configuration

All hooks are configured in `.claude/config/settings.json`:

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

- **PostToolUse**: Triggers after any tool is used (Bash, Edit, Write, etc.)
  - Can be configured per tool: `PostToolUse.Bash`, `PostToolUse.Edit`, etc.
- **PreSession**: Triggers when Claude Code session starts
- **PostResponse**: Triggers after Claude generates a response

## Hook Types in vybecoding

### 1. Security Hooks
- Environment sanitization
- XSS prevention
- Living off AI detection
- Path validation

### 2. Automation Hooks
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

## Quick Start

1. Hooks are already configured in `.claude/config/settings.json`
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

- [TRAIL System Hook](./trail-system.md) - Automatic testing and learning
- [Security Hooks](./security-hooks.md) - Security automation
- [Auto-Commit Hook](./auto-commit.md) - Git automation
- [Complete Setup Guide](./setup-all-hooks.md) - Full installation instructions