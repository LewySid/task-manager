// COMPONENT: TaskCard
// PURPOSE:  renders one task row with its title, done state, and action buttons.
//           sends user events back to TaskBoard so the data can update.
// TYPE:     Client Component ('use client') — needs click handlers
// PROPS:    id — unique task identifier (string)
//           title — the task text entered by the user (string)
//           done — whether the task is complete (boolean)
//           onToggle — callback to flip the done state (function)
//           onDelete — callback to remove the task (function)
'use client';

export default function TaskCard({ id, title, done, onToggle, onDelete }) {
    return (
        // Flex layout: title on the left, buttons on the right, with a bottom border.
        // Tailwind gap and padding provide the spacing so things don't feel cramped.
        <div className="flex items-center justify-between p-3 border-b border-gray-600">
        {/* Conditional styling: strikethrough and muted color for completed tasks.
            This provides immediate visual feedback on task status. */}
        <span className={done ? 'line-through text-gray-500' : 'text-gray-100'}>
        {title}
        </span>
        {/* Optional badge: shows "Done" label only for completed tasks.
            Helps users quickly identify completed items in the list. */}
        {done && <span className="bg-green-800 text-green-200 text-xs font-bold px-2 py-1 rounded">Done</span>}
        <div className="flex gap-2">
        {/* Toggle button: calls onToggle with task id.
            TaskBoard receives this and updates the task's done property. */}
        <button
            className="text-sm text-blue-400 hover:text-blue-300 underline transition-colors"
            onClick={() => onToggle(id)}
        >
            Toggle
        </button>
        {/* Delete button: calls onDelete with task id.
            TaskBoard filters out this task from the state array. */}
        <button
            className="text-sm text-red-400 hover:text-red-300 underline transition-colors"
            onClick={() => onDelete(id)}
        >
            Delete
        </button>
        </div>
    </div>
    );
}

