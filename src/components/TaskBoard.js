'use client';

import { useState, useEffect } from 'react';
import TaskStats from './TaskStats';
import AddTaskForm from './AddTaskForm';
import TaskList from './TaskList';

export default function TaskBoard() {
    const [tasks, setTasks] = useState(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
    });

    const [filter, setFilter] = useState('all');
    const [mounted, setMounted] = useState(false);

  // Mark component as hydrated on client
    useEffect(() => {
    setMounted(true);
    }, []);

  // Write to localStorage whenever tasks changes
    useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

  // Update browser tab title with active task count
    useEffect(() => {
    const active = tasks.filter((t) => !t.done).length;
    document.title = `${active} tasks remaining`;
    return () => {
        document.title = 'Task Manager';
    };
    }, [tasks]);

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

    const completedCount = tasks.filter((t) => t.done).length;
    const activeCount = tasks.length - completedCount;

    const visible =
    filter === 'all'
        ? tasks
        : filter === 'done'
        ? tasks.filter((t) => t.done)
        : tasks.filter((t) => !t.done);

    return (
    <div className="max-w-lg mx-auto p-6">
        {mounted && (
        <TaskStats
        total={tasks.length}
        completed={completedCount}
        active={activeCount}
        onClearCompleted={handleClearDone}
        />
        )}
        <AddTaskForm onAdd={handleAdd} />

        <div className="flex gap-2 mb-4">
        <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded text-sm ${
            filter === 'all'
            ? 'bg-blue-700 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        >
            All
        </button>
        <button
            onClick={() => setFilter('active')}
            className={`px-3 py-1 rounded text-sm ${
            filter === 'active'
                ? 'bg-blue-700 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
        >
            Active
        </button>
        <button
            onClick={() => setFilter('done')}
            className={`px-3 py-1 rounded text-sm ${
            filter === 'done'
                ? 'bg-blue-700 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
        >
            Done
        </button>
        </div>

        <TaskList tasks={visible} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
    );
}
