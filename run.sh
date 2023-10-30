#!/bin/bash

if [[ "$OSTYPE" == "linux"* ]]; then
    # Linux system
    cleanup() {
        echo "Terminating background processes..."
        killall node
        exit
    }
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
    # Windows system
    cleanup() {
        echo "Terminating all processes"
        cmd "/C TASKKILL /IM node.exe /F"
        exit
    }
else
    echo "Unsupported operating system"
    exit 1
fi

trap cleanup SIGINT

# Replace Mongodb uri with your own
if [ ! -f "frontend/.env" ]; then
    echo "VITE_URL=http://localhost:3000" > frontend/.env
    echo "MONGODB_URI=<Your mongodb uri" >> frontend/.env
    echo "VITE_PORT=3000" >> frontend/.env
fi

if [ ! -f "backend/.env" ]; then
    echo "VITE_URL=http://localhost:5173/" > backend/.env
    echo "MONGODB_URI=<Your Mongodb uri>" >> backend/.env
    echo "VITE_PORT=3000" >> backend/.env
    echo "TOKEN_KEY=<Anything string>" >> backend/.env
fi

(cd frontend && npm i && npm run dev) &
(cd backend && npm i && npm run dev) &

echo "Press 'q' to terminate background process..."

while :; do
    read -n 1 key
    if [[ $key == "q" ]]; then
        cleanup
    fi
done
