import React from 'react';
import type { MoodRating } from '../../types/journal';
import { Frown, Meh, Smile, Sparkles, AlertCircle } from 'lucide-react';

interface MoodSelectorProps {
  value: MoodRating;
  onChange: (mood: MoodRating) => void;
  readOnly?: boolean;
}

const moodOptions: { level: MoodRating; label: string; icon: typeof Smile; colorClass: string; emoji: string }[] = [
  { level: 1, label: 'Terrible', icon: AlertCircle, colorClass: 'text-rose-500 bg-rose-500/10 border-rose-500/30', emoji: '😖' },
  { level: 2, label: 'Low', icon: Frown, colorClass: 'text-amber-500 bg-amber-500/10 border-amber-500/30', emoji: '🙁' },
  { level: 3, label: 'Okay', icon: Meh, colorClass: 'text-slate-400 bg-slate-500/10 border-slate-500/30', emoji: '😐' },
  { level: 4, label: 'Good', icon: Smile, colorClass: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30', emoji: '🙂' },
  { level: 5, label: 'Great', icon: Sparkles, colorClass: 'text-purple-500 bg-purple-500/10 border-purple-500/30', emoji: '🤩' },
];

export const MoodSelector: React.FC<MoodSelectorProps> = ({
  value,
  onChange,
  readOnly = false,
}) => {
  return (
    <div className="grid w-full grid-cols-5 gap-1.5 sm:gap-2" role="radiogroup" aria-label="Mood rating">
      {moodOptions.map((option) => {
        const isSelected = value === option.level;
        const Icon = option.icon;

        return (
          <button
            key={option.level}
            type="button"
            disabled={readOnly}
            onClick={() => !readOnly && onChange(option.level)}
            className={`focus-ring flex min-h-16 flex-col items-center justify-center rounded-[var(--radius-md)] border px-1.5 py-2 transition-all duration-[150ms] sm:min-h-20 sm:p-3 ${
              isSelected
                ? `${option.colorClass} border-2 shadow-[var(--shadow-sm)] font-semibold`
                : 'bg-[var(--bg-subtle)] border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--accent-border)]'
            } ${readOnly ? 'cursor-default' : 'cursor-pointer active:scale-95'}`}
            role="radio"
            aria-checked={isSelected}
          >
            <span className="mb-0.5 text-xl sm:mb-1 sm:text-3xl">{option.emoji}</span>
            <div className="flex min-w-0 items-center gap-1">
              <Icon className={`hidden h-3.5 w-3.5 sm:block ${isSelected ? '' : 'opacity-60'}`} />
              <span className="max-w-full truncate text-[10px] sm:text-xs">{option.label}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
};
