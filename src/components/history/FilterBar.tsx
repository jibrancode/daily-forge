import React, { memo } from 'react';
import type { MoodRating } from '../../types/journal';
import { Card, CardContent } from '../ui/Card';
import { Input } from '../ui/Input';
import { Search } from 'lucide-react';

const MOOD_EMOJIS: Record<MoodRating, string> = {
  1: '😖',
  2: '🙁',
  3: '😐',
  4: '🙂',
  5: '🤩',
};

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedMoodFilter: MoodRating | 0;
  onMoodFilterChange: (mood: MoodRating | 0) => void;
}

export const FilterBar: React.FC<FilterBarProps> = memo(({
  searchQuery,
  onSearchChange,
  selectedMoodFilter,
  onMoodFilterChange,
}) => {
  return (
    <Card>
      <CardContent className="flex flex-col sm:flex-row gap-3 py-4">
        <div className="flex-1">
          <Input
            placeholder="Search reflection wins, lessons, notes..."
            icon={<Search className="w-4 h-4" />}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search entries"
          />
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0" role="group" aria-label="Filter by mood">
          <button
            type="button"
            onClick={() => onMoodFilterChange(0)}
            className={`focus-ring px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              selectedMoodFilter === 0
                ? 'btn-accent text-white border-transparent'
                : 'bg-[var(--bg-subtle)] border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
            aria-pressed={selectedMoodFilter === 0}
          >
            All
          </button>
          {([5, 4, 3, 2, 1] as MoodRating[]).map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => onMoodFilterChange(level)}
              className={`focus-ring px-2.5 py-1 rounded-xl text-xs font-semibold border flex items-center space-x-1 transition-all ${
                selectedMoodFilter === level
                  ? 'btn-accent text-white border-transparent'
                  : 'bg-[var(--bg-subtle)] border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
              aria-label={`Filter by mood level ${level}`}
              aria-pressed={selectedMoodFilter === level}
            >
              <span>{MOOD_EMOJIS[level]}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
});

FilterBar.displayName = 'FilterBar';
