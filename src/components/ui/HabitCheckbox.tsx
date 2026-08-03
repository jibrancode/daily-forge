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
    <div
      onClick={() => !readOnly && onToggle(habit.id)}
      className={`flex items-center justify-between p-3.5 rounded-xl border transition-all duration-200 ${
        habit.completed
          ? 'accent-bg-soft accent-border border text-[var(--text-primary)]'
          : 'bg-[var(--bg-subtle)] border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--accent-border)]'
      } ${readOnly ? 'cursor-default' : 'cursor-pointer select-none active:scale-[0.99]'}`}
    >
      <span className={`text-sm font-medium ${habit.completed ? 'line-through text-[var(--text-muted)]' : ''}`}>
        {habit.name}
      </span>

      <div
        className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-colors ${
          habit.completed
            ? 'btn-accent border-transparent text-white'
            : 'border-[var(--border-color)] bg-[var(--bg-card)]'
        }`}
      >
        {habit.completed && <Check className="w-4 h-4 stroke-[3]" />}
      </div>
    </div>
  );
};
