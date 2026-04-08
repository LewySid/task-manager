# Task Manager

A fully functional task manager built with Next.js 16, React 19, and Tailwind CSS v4. Features a dark theme design with purple accents, live task statistics, filtering, and localStorage persistence.

## Features

- ✅ Add tasks with input validation
- ✅ Toggle task completion status
- ✅ Delete individual tasks
- ✅ Filter tasks (All / Active / Done)
- ✅ Live stats display (active/completed/total counts)
- ✅ Clear all completed tasks
- ✅ Persist tasks in localStorage (survives browser refresh)

## Design Decisions

- **Dark Mode Theme**: Dark background (gray-900) with light text for reduced eye strain
- **Purple Accent Color**: Used for active buttons and stats highlights instead of blue
- **Rounded Card Layout**: TaskBoard has a rounded gray-800 background with shadow
- **Color-Coded Stats**: Active (purple), completed (green), total (blue)
- **Transition Effects**: Smooth color transitions on hover for better UX

## Setup Instructions

1. Ensure Node.js is installed (version 18+ recommended)
2. Clone the repository
3. Install dependencies: `npm install`
4. Start development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## AI Usage Log

- Used GitHub Copilot to generate initial component structures and Tailwind classes
- Asked Copilot for dark mode color palette suggestions (grays, purples, accent colors)
- Consulted Copilot for React best practices on state management and immutability
- Used Copilot to debug localStorage SSR issues with typeof window checks
