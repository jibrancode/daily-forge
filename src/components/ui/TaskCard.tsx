import React from 'react';
import type { TaskItem } from '../../types/journal';
import { Check, Trash2 } from 'lucide-react';

interface TaskCardProps {
  task: TaskItem;
  onToggle: (id: string) => void;
  onDelete?: (id: string) => void;
  readOnly?: boolean;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onToggle,
  onDelete,
  readOnly = false,
}) => {
  return (
    <div
      className={`group flex items-center justify-between rounded-[var(--radius-md)] border p-3 transition-all duration-[150ms] ${
        task.completed
          ? 'bg-[var(--bg-subtle)]/60 border-[var(--border-color)] text-[var(--text-muted)]'
          : 'bg-[var(--bg-card)] border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent-border)]'
      }`}
    >
      <button
        type="button"
        disabled={readOnly}
        onClick={() => !readOnly && onToggle(task.id)}
        className={`focus-ring flex flex-1 items-center space-x-3 text-left rounded-[var(--radius-sm)] p-1 ${
          readOnly ? 'cursor-default' : 'cursor-pointer select-none'
        }`}
        role="checkbox"
        aria-checked={task.completed}
        aria-label={task.text}
      >
        <span
          className={`flex h-5 w-5 items-center justify-center rounded-[var(--radius-sm)] border transition-all duration-[150ms] ${
            task.completed
              ? 'btn-accent border-transparent text-white'
              : 'border-[var(--border-color)] bg-[var(--bg-subtle)]'
          }`}
          aria-hidden="true"
        >
          {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </span>
        <span className={`text-sm font-medium ${task.completed ? 'line-through' : ''}`}>
          {task.text}
        </span>
      </button>

      {!readOnly && onDelete && (
        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="focus-ring p-1.5 rounded-lg text-rose-400 hover:text-rose-600 hover:bg-rose-500/10 transition-all opacity-80 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
          aria-label={`Delete task: ${task.text}`}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
