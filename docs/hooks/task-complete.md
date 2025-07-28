# Task Complete Hook Setup Guide

This guide shows how to set up a task completion hook in Claude Code that plays a sound when tasks are completed.

## Prerequisites

- Linux system with ALSA utilities (`aplay` command)
- Working audio system (PulseAudio/PipeWire)
- Claude Code installed

## Setup Steps

### 1. Create the Task Complete Script

Create a script called `task_complete.sh` in your project directory:

```bash
#!/bin/bash

echo "Task complete"

# Play Front Left, wait 1 second, then Guitar
aplay -q /usr/share/sounds/alsa/Front_Left.wav 2>/dev/null
sleep 1
aplay -q /usr/share/sounds/sound-icons/guitar-12.wav 2>/dev/null
```

### 2. Make the Script Executable

```bash
chmod +x task_complete.sh
```

### 3. Configure Claude Code Hooks (Optional)

If you want Claude to automatically trigger sounds after certain commands, create `.claude/settings.json`:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "if [[ \"$CLAUDE_TOOL_OUTPUT\" == *\"task_complete.sh\"* ]]; then echo 'Task completion detected!'; fi"
          }
        ]
      }
    ]
  }
}
```

## Usage

### Manual Usage
Ask Claude to run the script when completing tasks:
```
Claude: "Run the task complete script"
```

### Automatic Usage
With the hook configured, the sound will play automatically when Claude runs any bash command that includes "task_complete.sh".

## Customization

### Change the Sounds
Edit the script to use different sound files:
- Browse available sounds: `find /usr/share/sounds -name "*.wav"`
- Test sounds: `aplay /path/to/sound.wav`
- Common locations:
  - `/usr/share/sounds/alsa/` - ALSA test sounds
  - `/usr/share/sounds/sound-icons/` - Musical instruments
  - `/usr/share/sounds/freedesktop/stereo/` - Desktop notification sounds

### Adjust Timing
- Change the delay between sounds by modifying the `sleep 1` line
- Remove the second sound for a single notification

### Different Sound Players
If `aplay` doesn't work, you can try:
- `paplay` for PulseAudio
- `pw-play` for PipeWire
- `speaker-test` for basic tones

## Troubleshooting

1. **No sound heard**
   - Check volume: `alsamixer` or `pavucontrol`
   - Test audio: `speaker-test -t sine -f 800 -c 2 -l 1`
   - Verify files exist: `ls -la /usr/share/sounds/alsa/`

2. **Permission denied**
   - Make sure script is executable: `chmod +x task_complete.sh`

3. **Command not found**
   - Install ALSA utilities: `sudo apt install alsa-utils`

## Example Integration

Claude can run this script after completing any task:

```bash
# Do some work
echo "Building project..."
make build

# Signal completion
./task_complete.sh
```

This provides audio feedback that helps you know when Claude has finished a task, especially useful when working in another window.