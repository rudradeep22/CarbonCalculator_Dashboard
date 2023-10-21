#!/bin/bash

# Use below for linux systems
# cleanup() {
#     echo "Terminating background processes..."
#     killall node
#     exit
# }

# Use below for windows systems
cleanup(){
    echo "Terminating all processes"
    cmd "/C TASKKILL /IM node.exe /F"
    exit
}

# Register the cleanup function to run when the script receives a SIGINT (Ctrl+C)
trap cleanup SIGINT

(cd frontend && npm run dev) &
frontend_pid=$!

(cd backend && npm run dev) &
backend_pid=$!

echo "Press 'q' to terminate background process..."

while :; do
    read -n 1 key
    if [[ $key == "q" ]]; then
        cleanup $frontend_pid $backend_pid
    fi
done
