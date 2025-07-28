# Claude Code Boost (CCB) Hook

## Overview

Claude Code Boost is a PreToolUse hook that automatically approves common, safe operations in Claude Code, reducing the need for manual confirmations and speeding up development workflow. It intelligently determines which operations can be safely auto-approved based on configurable rules.

## Features

- **Intelligent Auto-Approval**: Automatically approves safe file operations, searches, and common commands
- **Configurable Rules**: Customize which operations get auto-approved
- **Safety First**: Never auto-approves potentially destructive operations
- **Performance Boost**: Reduces interruptions and speeds up development
- **Detailed Logging**: Tracks all auto-approval decisions for audit

## Installation

Claude Code Boost is already installed and configured in this project.

### Repository
- **GitHub**: https://github.com/yifanzz/claude-code-boost
- **Location**: `~/.claude/mcp/claude-code-boost/`

### Configuration
Configured as a PreToolUse hook in `.claude/config/settings.json`:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": ".*",
        "hooks": [
          {
            "type": "command",
            "command": "ccb auto-approve-tools"
          }
        ]
      }
    ]
  }
}
```

## How It Works

1. **Intercepts Tool Requests**: Before any tool (Read, Write, Bash, etc.) executes
2. **Analyzes Safety**: Evaluates the operation against safety rules
3. **Makes Decision**: Auto-approves safe operations or defers to user
4. **Logs Decision**: Records what was auto-approved and why

## Auto-Approved Operations

### File Operations
- **Read**: All file reads (always safe)
- **Grep/Search**: All search operations
- **List**: Directory listings
- **Safe Writes**: Configuration files, documentation, test files

### Command Operations
- **Information Commands**: `ls`, `pwd`, `cat`, `grep`, `find`
- **Status Commands**: `git status`, `git log`, `npm list`
- **Test Commands**: `npm test`, `jest`, `pytest`
- **Build Commands**: `npm run build`, `make`

### Development Operations
- **Code Analysis**: Linting, type checking
- **Documentation**: Generating or updating docs
- **Dependency Checks**: `npm outdated`, `pip list`

## NOT Auto-Approved (Requires Manual Confirmation)

### Destructive Operations
- **Delete**: `rm`, `rmdir`, file deletions
- **Force Operations**: `git push --force`, `rm -rf`
- **System Changes**: `sudo` commands, system installations

### Sensitive Operations
- **Credentials**: Operations involving API keys, tokens
- **Production**: Deployments, database migrations
- **External APIs**: Requests to external services

### Irreversible Operations
- **Git Reset**: `git reset --hard`
- **Database**: Schema changes, data deletion
- **Package**: Publishing to npm, PyPI

## Configuration Options

### Custom Rules
Create custom auto-approval rules in `~/.claude/ccb-config.json`:

```json
{
  "autoApprove": {
    "customCommands": [
      "docker-compose up",
      "yarn test"
    ],
    "customPaths": [
      "/safe/directory/*",
      "*.test.js"
    ]
  },
  "neverApprove": {
    "commands": [
      "rm -rf /",
      "format c:"
    ],
    "paths": [
      "/etc/*",
      "~/.ssh/*"
    ]
  }
}
```

### Verbosity Levels
- **Silent**: No output, just auto-approves
- **Summary**: Shows count of auto-approved operations
- **Detailed**: Shows each auto-approval decision
- **Debug**: Full decision logic output

## Usage

### Check Status
```bash
ccb status
```

### View Auto-Approval Log
```bash
ccb log
# or
tail -f ~/.claude/ccb-approvals.log
```

### Temporarily Disable
```bash
# Disable for current session
ccb disable

# Re-enable
ccb enable
```

### Statistics
```bash
# View auto-approval statistics
ccb stats

# Output:
# Total operations: 1,234
# Auto-approved: 1,180 (95.6%)
# Manual approval: 54 (4.4%)
# Time saved: ~2.5 hours
```

## Benefits

1. **Faster Development**: No interruptions for safe operations
2. **Maintained Safety**: Dangerous operations still require approval
3. **Reduced Fatigue**: Less "approval fatigue" from repetitive confirmations
4. **Better Focus**: Stay in flow state during development
5. **Audit Trail**: Complete log of all decisions

## Integration with Other Hooks

### Works Well With
- **TRAIL System**: Auto-approves test runs and learning operations
- **Auto-Commit**: Approves git operations for auto-commits
- **Continuous Learning**: Approves pattern analysis operations

### Execution Order
1. Claude Code Boost (PreToolUse) - decides on approval
2. If approved, tool executes
3. PostToolUse hooks run (TRAIL, auto-commit, etc.)

## Troubleshooting

### Not Auto-Approving Expected Operations
1. Check if CCB is enabled: `ccb status`
2. Review rules: `cat ~/.claude/ccb-config.json`
3. Check logs: `ccb log --tail 50`
4. Verify hook configuration in settings.json

### Too Many Auto-Approvals
1. Tighten rules in ccb-config.json
2. Add paths to neverApprove list
3. Reduce autoApprove patterns

### Performance Issues
1. Check log file size: `du -h ~/.claude/ccb-approvals.log`
2. Rotate logs if needed: `ccb rotate-logs`
3. Adjust verbosity level to reduce logging

## Best Practices

1. **Start Conservative**: Begin with default rules, expand as needed
2. **Review Logs Weekly**: Check what's being auto-approved
3. **Team Alignment**: Ensure team agrees on auto-approval rules
4. **Security First**: When in doubt, require manual approval
5. **Regular Updates**: Keep CCB updated for latest safety rules

## Advanced Features

### Pattern Learning
CCB can learn from your approval patterns:
```bash
# Enable learning mode
ccb learn --enable

# CCB will suggest new auto-approval rules based on your behavior
```

### Team Sync
Share auto-approval rules with your team:
```bash
# Export rules
ccb export-rules > team-ccb-rules.json

# Import rules
ccb import-rules team-ccb-rules.json
```

### Custom Matchers
Create sophisticated matching rules:
```javascript
{
  "customMatchers": [
    {
      "tool": "Bash",
      "pattern": "npm run (?!deploy|publish)",
      "approve": true,
      "reason": "Safe npm scripts except deploy/publish"
    }
  ]
}
```

## Security Considerations

- CCB never stores sensitive information
- All decisions are logged locally only
- No telemetry or external communication
- Rules are stored in plain text (don't include secrets)
- Regular security updates from maintainer

## Related Documentation

- [Hooks Overview](./overview.md)
- [PreToolUse Hooks](./pre-tool-use.md)
- [Claude Code Settings](../settings.md)
- [Security Best Practices](../security.md)