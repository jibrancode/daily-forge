import React from 'react';
import type { HabitItem } from '../../types/journal';
import { Check } from 'lucide-react';

interface HabitCheckboxProps {
  habit: HabitItem;
  onToggle: (id: string) => void;
  readOnly?: boolean;
}


export const HabitCheckbox: React.FC<HabitCheckboxProps> = ({
  habit,
  onToggle,
  readOnly = false,
}) => {
  return (
    <button
      type="button"
      disabled={readOnly}
      onClick={() => !readOnly && onToggle(habit.id)}
      className={`focus-ring flex w-full items-center justify-between rounded-[var(--radius-md)] border p-3.5 text-left transition-all duration-[150ms] ${
        habit.completed
          ? 'accent-bg-soft accent-border border text-[var(--text-primary)]'
          : 'bg-[var(--bg-subtle)] border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--accent-border)]'
      } ${readOnly ? 'cursor-default' : 'cursor-pointer select-none active:scale-[0.99]'}`}
      role="checkbox"
      aria-checked={habit.completed}
      aria-label={habit.name}
    >
      <span className={`text-sm font-medium ${habit.completed ? 'line-through text-[var(--text-muted)]' : ''}`}>
        {habit.name}
      </span>

      <span
        className={`flex h-6 w-6 items-center justify-center rounded-[var(--radius-sm)] border transition-colors duration-[150ms] ${
          habit.completed
            ? 'btn-accent border-transparent text-white'
            : 'border-[var(--border-color)] bg-[var(--bg-card)]'
        }`}
        aria-hidden="true"
      >
        {habit.completed && <Check className="w-4 h-4 stroke-[3]" />}
      </span>
    </button>
  );
};
