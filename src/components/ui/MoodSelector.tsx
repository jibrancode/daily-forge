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
    <div className="flex items-center justify-between gap-2 sm:gap-3 w-full">
      {moodOptions.map((option) => {
        const isSelected = value === option.level;
        const Icon = option.icon;

        return (
          <button
            key={option.level}
            type="button"
            disabled={readOnly}
            onClick={() => !readOnly && onChange(option.level)}
            className={`flex-1 flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-200 ${
              isSelected
                ? `${option.colorClass} border-2 scale-105 shadow-md font-bold`
                : 'bg-[var(--bg-subtle)] border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--accent-border)]'
            } ${readOnly ? 'cursor-default' : 'cursor-pointer active:scale-95'}`}
          >
            <span className="text-2xl sm:text-3xl mb-1">{option.emoji}</span>
            <div className="flex items-center space-x-1">
              <Icon className={`w-3.5 h-3.5 ${isSelected ? '' : 'opacity-60'}`} />
              <span className="text-[11px] sm:text-xs tracking-tight">{option.label}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
};
