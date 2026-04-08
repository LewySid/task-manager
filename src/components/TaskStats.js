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
        <div className="text-sm text-gray-600">
            <span className="font-semibold">{active}</span> active,{' '}
            <span className="font-semibold">{completed}</span> of{' '}
            <span className="font-semibold">{total}</span> complete
        </div>
        {completed > 0 && (
            <button
            onClick={onClearCompleted}
            className="text-sm text-red-600 hover:underline"
            >
            Clear completed
            </button>
        )}
        </div>
    </div>
    );
}
