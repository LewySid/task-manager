// COMPONENT:TaskList
// PURPOSE:  shows the current task list and keeps the rendered markup tidy.
//           if the filtered list is empty, it renders a friendly placeholder.
// TYPE:     Client Component ('use client') — renders TaskCard items
// PROPS:    tasks — array of task objects to display
//           onToggle — callback to toggle a task's done state
//           onDelete — callback to remove a task
'use client';

import TaskCard from './TaskCard';

export default function TaskList({ tasks, onToggle, onDelete }) {
    // If there aren't any tasks to show, render a small friendly message.
    if (tasks.length === 0) {
    return <p className="text-gray-400 p-4 text-center">No tasks yet!</p>;
    }
    return (
    // Unordered list with Tailwind divide-y for visual separation between items.
    // Each task gets its own list item with a unique key for React reconciliation.
    <ul className="divide-y">
        {tasks.map((task) => (
        <li key={task.id}>
            <TaskCard
            id={task.id}
            title={task.title}
            done={task.done}
            onToggle={onToggle}
            onDelete={onDelete}
            />
            </li>
        ))}
    </ul>
    );
}
