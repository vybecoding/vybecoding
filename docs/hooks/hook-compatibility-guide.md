# Hook Compatibility Guide

## Best Practices for Multiple Hooks

### 1. Use Specific Matchers
Instead of `.*` (matches all), use specific tool names:
- `(Bash|Edit|MultiEdit|Write)` - Only for file operations
- `Bash` - Only for bash commands
- `(Read|Grep|Glob)` - Only for read operations

### 2. Add Timeouts
Prevent hooks from blocking Claude:
```json
{
  "type": "command",
  "command": "your-command",
  "timeout": 500  // milliseconds
}
```

### 3. Handle Failures Gracefully
Always add error handling:
```bash
command 2>/dev/null || true
```

### 4. Avoid Hook Loops
- Don't trigger actions that would re-trigger the same hook
- Use `$CLAUDE_STOP_HOOK_ACTIVE` to detect if in a stop hook

### 5. Keep Hooks Fast
- Hooks run synchronously and can slow down Claude
- Use background processes for long operations:
  ```bash
  (long-running-command &) 2>/dev/null
  ```

### 6. Test Incrementally
1. Test each hook individually first
2. Add hooks one by one
3. Monitor logs: `/tmp/claude-hooks.log`

### 7. Hook Execution Order
- PreToolUse → Tool Execution → PostToolUse
- Stop hooks run after each response
- Multiple hooks for same event run in parallel

## Example: Compatible Multi-Hook Configuration

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "(Bash|Edit|MultiEdit|Write)",
        "hooks": [
          {
            "type": "command",
            "command": "ccb auto-approve-tools 2>/dev/null || true",
            "timeout": 500
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "echo \"[$(date)] Bash command executed\" >> /tmp/bash-audit.log"
          }
        ]
      },
      {
        "matcher": "(Edit|MultiEdit|Write)",
        "hooks": [
          {
            "type": "command",
            "command": "/home/happy/.claude/hooks/post-edit-sanitize.sh"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "/home/happy/.claude/hooks/task-complete.sh",
            "timeout": 1000
          }
        ]
      }
    ]
  }
}
```

## Debugging Hook Issues

1. Check logs:
   ```bash
   tail -f /tmp/claude-hooks.log
   ```

2. Test hooks manually:
   ```bash
   CLAUDE_TOOL_NAME=Bash CLAUDE_TOOL_OUTPUT="test" /path/to/hook.sh
   ```

3. Use debug logging in hooks:
   ```bash
   echo "[DEBUG] Hook triggered: $CLAUDE_TOOL_NAME" >> /tmp/hook-debug.log
   ```