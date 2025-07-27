#!/bin/bash

# Start backup server on port 8081
echo "Starting backup VybeCoding server on port 8081..."
echo "Access at: http://localhost:8081"

# Use Python's built-in HTTP server
cd "$(dirname "$0")"
python3 -m http.server 8081 --bind 0.0.0.0