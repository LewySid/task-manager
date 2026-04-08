// COMPONENT: AddTaskForm
// PURPOSE:  lets the user type a new task and submit it.
//           keeps the current input local and tells TaskBoard when a task is ready.
// TYPE:     Client Component ('use client') — uses useState for the controlled input
// PROPS:    onAdd — callback that receives the new task title (string)
'use client';

import { useState } from 'react';

export default function AddTaskForm({ onAdd }) {
    // Local state: stores the current value of the input field.
    // This only matters while the user is typing.
    const [title, setTitle] = useState('');

    // Form submit handler: stops the browser from reloading the page,
    // rejects empty input, sends the value up, and clears the field.
    function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return; // Reject blank or whitespace-only submissions
    onAdd(title.trim()); // Pass cleaned title to TaskBoard for state update
    setTitle(''); // Reset input field for next task entry
    }

    return (
    // onSubmit handles both Enter and button clicks, which is better for keyboard users.
    // It also keeps the form behaving like a real HTML form.
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        {/* Controlled input: value always mirrors component state.
            onChange syncs user typing with state on every keystroke. */}
        <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task..."
        className="flex-1 border border-gray-600 rounded px-3 py-2 text-sm bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
        type="submit"
        className="bg-purple-600 text-white px-4 py-2 rounded text-sm hover:bg-purple-700 transition-colors"
        >
        Add
        </button>
    </form>
    );
}
