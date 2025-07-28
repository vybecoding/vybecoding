/home/happy/Projects/vybecoding/.claude/settings.json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "if [[ \"$CLAUDE_TOOL_OUTPUT\" == *\"task-complete.sh\"* ]]; then echo 'Task completion detected!'; fi"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "/home/happy/Projects/vybecoding/.claude/hooks/task-complete.sh"
          }
        ]
      }
    ]
  }
}

/home/happy/Projects/vybecoding/.claude/hooks/task-complete.sh

#!/bin/bash

# Log when hook is triggered
echo "[$(date)] task-complete.sh triggered from $PWD (PID: $$)" >> /tmp/claude-hooks.log

echo "Task complete"

# Play guitar sound
aplay -q /usr/share/sounds/sound-icons/guitar-12.wav 2>/dev/null