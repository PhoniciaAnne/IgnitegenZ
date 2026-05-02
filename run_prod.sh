#!/bin/bash
set -e
echo "Building React frontend..."
cd client && npm install --silent && npm run build
cd ..
echo "Starting IgnitegenZ backend on port 5000..."
PORT=5000 REPLIT_DEPLOYMENT=1 python run_server.py
