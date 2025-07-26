# Claude Code Auto-Approval (Boost) Guide

## What It Does

Claude Code Auto-Approval dramatically reduces manual confirmations by automatically approving safe operations while still blocking dangerous ones. It reduces approval prompts by ~90%.

## Installation Status

✅ **Already Installed!** Claude Code Boost is now active in your project.

## How It Works

1. **Intercepts Commands**: When Claude tries to run any command, CCB intercepts it
2. **Analyzes Safety**: Checks if the command is safe to auto-approve
3. **Auto-Approves or Prompts**: 
   - Safe commands → Run immediately
   - Dangerous commands → You still get prompted

## What Gets Auto-Approved

### ✅ Safe Operations (Auto-Approved)
- File reading (`cat`, `head`, `tail`, `less`)
- Directory listing (`ls`, `find`)
- Build commands (`npm run build`, `make`)
- Test commands (`npm test`, `pytest`)
- Linting (`eslint`, `prettier`)
- Package installation (`npm install`, `pip install`)
- Git status checks (`git status`, `git diff`)
- Environment checks (`node --version`, `which`)

### ⚠️ Still Requires Approval
- File deletion (`rm`, `rmdir`)
- File modification (`sed -i`, `>`, `>>`)
- System changes (`sudo`, `apt-get`)
- Network operations (`curl POST`, `wget`)
- Git pushes (`git push`)
- Database operations
- Any command with `sudo`

## Configuration

The tool is configured in `.claude/settings.json`:
```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "*",
      "hooks": [{
        "type": "command",
        "command": "ccb auto-approve-tools"
      }]
    }]
  }
}
```

## Usage

Just use Claude Code normally! You'll notice:

1. **Before CCB**: 
   ```
   Claude: "I'll check the package.json file"
   System: "Allow cat package.json? [y/n]"
   You: y
   [Command runs]
   ```

2. **With CCB**:
   ```
   Claude: "I'll check the package.json file"
   [Command runs immediately - no prompt!]
   ```

## Monitoring

CCB logs its decisions. Check logs with:
```bash
# View recent auto-approval decisions
tail -f ~/.claude/logs/ccb-decisions.log 2>/dev/null || echo "Logs will appear after first use"
```

## Customization

### Add More Auto-Approved Commands

Edit `~/.ccb/config.json` (create if doesn't exist):
```json
{
  "autoApprove": {
    "additionalCommands": [
      "docker ps",
      "docker-compose logs",
      "yarn test"
    ]
  }
}
```

### Disable for Specific Commands

```json
{
  "neverApprove": [
    "rm -rf",
    "git push --force"
  ]
}
```

## Troubleshooting

### If Auto-Approval Stops Working

1. Check if CCB is still installed:
   ```bash
   ccb debug
   ```

2. Reinstall if needed:
   ```bash
   ccb install --project --non-interactive
   ```

3. Check hooks are configured:
   ```bash
   cat .claude/settings.json
   ```

### View Debug Information

```bash
# Check CCB version
ccb --version

# Debug mode
ccb debug

# View all hooks
cat .claude/settings.json
```

## Uninstalling

If you want to remove auto-approval:

```bash
# Remove just from this project
rm .claude/settings.json

# Or manually edit .claude/settings.json and remove the PreToolUse section
```

## Tips

1. **Trust but Verify**: CCB makes development faster but still pay attention to what commands are running
2. **Check Logs**: Occasionally review what's being auto-approved
3. **Customize Carefully**: Only add commands you truly trust to auto-approve
4. **Project-Specific**: This installation only affects the current project

## Summary

Claude Code Boost is now active and will:
- ✅ Auto-approve safe read operations
- ✅ Auto-approve builds and tests  
- ✅ Auto-approve package installations
- ⚠️ Still prompt for destructive operations
- ⚠️ Still prompt for system changes

Enjoy 90% fewer confirmation prompts! 🚀