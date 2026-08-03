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
      className={`group flex items-center justify-between p-3 rounded-xl border transition-all duration-200 ${
        task.completed
          ? 'bg-[var(--bg-subtle)]/60 border-[var(--border-color)] text-[var(--text-muted)]'
          : 'bg-[var(--bg-card)] border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent-border)]'
      }`}
    >
      <div
        onClick={() => !readOnly && onToggle(task.id)}
        className={`flex items-center space-x-3 flex-1 ${readOnly ? 'cursor-default' : 'cursor-pointer select-none'}`}
      >
        <div
          className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
            task.completed
              ? 'btn-accent border-transparent text-white'
              : 'border-[var(--border-color)] bg-[var(--bg-subtle)]'
          }`}
        >
          {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </div>
        <span className={`text-sm font-medium ${task.completed ? 'line-through' : ''}`}>
          {task.text}
        </span>
      </div>

      {!readOnly && onDelete && (
        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-rose-400 hover:text-rose-600 hover:bg-rose-500/10 transition-all"
          title="Delete task"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
