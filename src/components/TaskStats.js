// COMPONENT:TaskStats
// PURPOSE:  shows task totals and the clear-completed action.
// TYPE:     Client Component ('use client') — includes a button click handler
// PROPS:    total — total number of tasks
//           completed — number of finished tasks
//           active — number of unfinished tasks
//           onClearCompleted — callback to clear completed tasks
'use client';

export default function TaskStats({
    total,
    completed,
    active,
    onClearCompleted,
    }) {
    return (
    <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
        {/* Show the active, completed, and total counts.
            The numbers are highlighted so they stand out. */}
        <div className="text-sm text-gray-300">
            <span className="font-semibold text-purple-400">{active}</span> active,{' '}
            <span className="font-semibold text-green-400">{completed}</span> of{' '}
            <span className="font-semibold text-blue-400">{total}</span> complete
        </div>
        {/* Conditional render: only show clear button if there are completed tasks.
            Prevents showing irrelevant UI when no tasks are done. */}
        {completed > 0 && (
            <button
            onClick={onClearCompleted}
            className="text-sm text-red-400 hover:text-red-300 underline transition-colors"
            >
            Clear completed
            </button>
        )}
        </div>
    </div>
    );
}
