#!/bin/bash

# Define a function to handle termination
cleanup() {
    echo "Terminating background processes..."
    killall node
    exit
}

# Register the cleanup function to run when the script receives a SIGINT (Ctrl+C)
trap cleanup SIGINT

# Start the frontend development server
(cd frontend && npm run dev) &

# Save the PID of the frontend process
frontend_pid=$!

# Start the backend development server
(cd backend && npm run dev) &

# Save the PID of the backend process
backend_pid=$!

# Wait for user to press 'q'
echo "Press 'q' to terminate background process..."

while :; do
    read -n 1 key
    if [[ $key == "q" ]]; then
        cleanup $frontend_pid $backend_pid
    fi
done
