// src/components/TaskCard.js — Server Component (no interactivity yet)
export default function TaskCard({ title, done }) {
    return (
    <div className="flex items-center gap-2 p-3 border-b">
        <span
        className={done ? 'line-through text-gray-400' : 'text-gray-900'}
        >
        {title}                       {/* {} escapes into JS */}
        </span>
        {done && <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">Done</span>}
    </div>
    );
}