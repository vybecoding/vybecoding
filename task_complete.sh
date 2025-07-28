#!/bin/bash

echo "Task complete"

# Play Front Left, wait 1 second, then Guitar
aplay -q /usr/share/sounds/alsa/Front_Left.wav 2>/dev/null
sleep 1
aplay -q /usr/share/sounds/sound-icons/guitar-12.wav 2>/dev/null