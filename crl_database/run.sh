#!/bin/bash


# Start frontend service on a new terminal
gnome-terminal -- bash -c "cd ./frontend && npm start"

# Start backend service
cd ./backend
npx nodemon start

