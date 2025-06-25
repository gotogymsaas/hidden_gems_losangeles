#!/bin/bash
set -e

# 1. Create the frontend directory and enter it
mkdir -p frontend
cd frontend

# 2. Initialize a Vite + React project
npm create vite@latest . -- --template react

# 3. Install TailwindCSS, PostCSS, Autoprefixer and PixiJS
npm install tailwindcss postcss autoprefixer pixi.js

# 4. Generate Tailwind and PostCSS configuration files
npx tailwindcss init -p

# 5. Create the public/icons directory for PWA icons
mkdir -p public/icons

# 6. Leave the frontend directory
cd ..
