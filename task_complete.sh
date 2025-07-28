#!/bin/bash

echo "Task complete"
echo "[DEBUG] Task complete hook triggered at $(date)" >> /tmp/task-complete-debug.log

# Play Guitar sound - prefer paplay for PipeWire/PulseAudio
if command -v paplay &> /dev/null; then
    echo "[DEBUG] Using paplay" >> /tmp/task-complete-debug.log
    paplay /usr/share/sounds/sound-icons/guitar-12.wav 2>> /tmp/task-complete-debug.log
elif command -v aplay &> /dev/null; then
    echo "[DEBUG] Using aplay" >> /tmp/task-complete-debug.log
    aplay -q /usr/share/sounds/sound-icons/guitar-12.wav 2>> /tmp/task-complete-debug.log
else
    echo "[DEBUG] No audio player found" >> /tmp/task-complete-debug.log
fi