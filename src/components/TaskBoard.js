// COMPONENT: TaskBoard
// PURPOSE:  owns all task state and coordinates the app behavior.
//           sends data down to children and handles events coming back up.
//           this keeps the logic in one place and follows React's data flow.
// TYPE:     Client Component ('use client') — requires useState and useEffect
'use client';

import { useState, useEffect } from 'react';
import TaskStats from './TaskStats';
import AddTaskForm from './AddTaskForm';
import TaskList from './TaskList';

export default function TaskBoard() {
    // STATE
    // Lazy initializer: loads tasks from localStorage on first render.
    // The typeof window guard prevents SSR errors since Next.js renders
    // on the server where window is undefined, avoiding hydration mismatches.
    const [tasks, setTasks] = useState(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
    });

    // Filter is separate from the task list because the user can change it
    // without editing the tasks themselves.
    const [filter, setFilter] = useState('all');

    // EFFECT: Persist to localStorage 
    // Keep the task list saved in the browser so it still exists after refresh.
    useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    // EFFECT: Update browser tab title 
    // Keep the page title in sync with how many tasks are left to do.
    useEffect(() => {
    const active = tasks.filter((t) => !t.done).length;
    document.title = `${active} tasks remaining`;
    return () => {
        document.title = 'Task Manager';
    };
    }, [tasks]);

    // HANDLERS (callbacks passed DOWN to children)
    function handleAdd(title) {
    const newTask = {
        id: crypto.randomUUID(),
        title,
        done: false,
    };
    setTasks([...tasks, newTask]);
    }

    function handleToggle(id) {
        setTasks(tasks.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
    ));
    }

    function handleDelete(id) {
    setTasks(tasks.filter((t) => t.id !== id));
    }

    function handleClearDone() {
    setTasks(tasks.filter((t) => !t.done));
    }

    // DERIVED VALUES (computed on every render)
    const completedCount = tasks.filter((t) => t.done).length;
    const activeCount = tasks.length - completedCount;

    const visible =
    filter === 'all'
        ? tasks
        : filter === 'done'
        ? tasks.filter((t) => t.done)
        : tasks.filter((t) => !t.done);

    // RENDER
    return (
    <div className="max-w-lg mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
        <TaskStats
        total={tasks.length}
        completed={completedCount}
        active={activeCount}
        onClearCompleted={handleClearDone}
        />
        <AddTaskForm onAdd={handleAdd} />

        {/* Filter buttons: conditional styling based on active filter.
            onClick sets filter state, which recomputes visible tasks. */}
        <div className="flex gap-2 mb-4">
        <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded text-sm transition-colors ${
            filter === 'all'
            ? 'bg-purple-600 text-white'
            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
        }`}
        >
            All
        </button>
        <button
            onClick={() => setFilter('active')}
            className={`px-3 py-1 rounded text-sm transition-colors ${
            filter === 'active'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
        >
            Active
        </button>
        <button
            onClick={() => setFilter('done')}
            className={`px-3 py-1 rounded text-sm transition-colors ${
            filter === 'done'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
        >
            Done
        </button>
        </div>

        <TaskList tasks={visible} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
    );
}
