// src/app/page.js — Server Component (default, no directive needed)
import TaskBoard from '@/components/TaskBoard';

export default function HomePage() {
  return (
    <main className="p-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">Task Manager</h1>
      <TaskBoard />
    </main>
  );
}

