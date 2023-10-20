#!/bin/bash

# Start backend service
cd ./backend
npx nodemon start

# Start frontend service
cd ../frontend
npm start
