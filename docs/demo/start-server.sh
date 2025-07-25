#!/bin/bash
echo "Starting web server for VybeCoding demo..."
echo "Server will run at: http://localhost:8080"
echo "Press Ctrl+C to stop the server"
echo ""
cd "$(dirname "$0")"
python3 -m http.server 8080