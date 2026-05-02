#!/bin/bash
# Start FastAPI backend in background
cd /home/runner/workspace
python run_server.py &
BACKEND_PID=$!

# Wait for backend to be ready
sleep 3

# Start Vite frontend in foreground
cd /home/runner/workspace/client
npm run dev

# Cleanup on exit
kill $BACKEND_PID 2>/dev/null
