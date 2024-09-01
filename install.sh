#!/bin/bash

# Install backend service
cd ./backend
npm install

# Install frontend app
cd ../frontend
npm install --force
