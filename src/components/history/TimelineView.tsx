import React, { memo } from 'react';
import type { JournalEntry, MoodRating } from '../../types/journal';
import { Card } from '../ui/Card';
import { Filter, CheckCircle2, BookOpen } from 'lucide-react';
import { formatDisplayDate } from '../../utils/dateUtils';

const moodEmojiMap: Record<MoodRating, { emoji: string; label: string; colorClass: string }> = {
  1: { emoji: 'ðŸ˜–', label: 'Terrible', colorClass: 'text-rose-500 bg-rose-500/10 border-rose-500/30' },
  2: { emoji: 'ðŸ™', label: 'Low', colorClass: 'text-amber-500 bg-amber-500/10 border-amber-500/30' },
  3: { emoji: 'ðŸ˜', label: 'Okay', colorClass: 'text-slate-400 bg-slate-500/10 border-slate-500/30' },
  4: { emoji: 'ðŸ™‚', label: 'Good', colorClass: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30' },
  5: { emoji: 'ðŸ¤©', label: 'Great', colorClass: 'text-purple-500 bg-purple-500/10 border-purple-500/30' },
};

interface TimelineViewProps {
  filteredEntries: JournalEntry[];
  onSelectEntry: (entry: JournalEntry) => void;
}

export const TimelineView: React.FC<TimelineViewProps> = memo(({
  filteredEntries,
  onSelectEntry,
}) => {
  if (filteredEntries.length === 0) {
    return (
      <Card className="text-center py-12">
        <div className="w-12 h-12 rounded-[var(--radius-xl)] accent-bg-soft flex items-center justify-center mx-auto border accent-border mb-3">
          <Filter className="w-6 h-6 accent-text" />
        </div>
        <h4 className="text-base font-bold text-[var(--text-primary)]">No matching journal entries</h4>
        <p className="text-xs text-[var(--text-muted)] mt-1">Try adjusting your search query or mood filter.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {filteredEntries.map((entry) => {
        const habitsCompleted = (entry.habits || []).filter((h) => h.completed).length;
        const tasksCompleted = (entry.tasks || []).filter((t) => t.completed).length;

        return (
          <Card
            key={entry.id || entry.date}
            hoverable
            onClick={() => onSelectEntry(entry)}
            className="border border-[var(--border-color)] hover:border-[var(--accent-border)] transition-all"
          >
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-4">
              <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                <div
                  className={`w-12 h-12 rounded-[var(--radius-xl)] flex items-center justify-center text-2xl border shadow-sm ${
                    moodEmojiMap[entry.mood]?.colorClass || 'bg-slate-500/10'
                  }`}
                >
                  {moodEmojiMap[entry.mood]?.emoji || 'ðŸ™‚'}
                </div>

                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-sm font-semibold text-[var(--text-primary)] sm:text-base">
                      {formatDisplayDate(entry.date, { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
                    </h4>
                    <span className="rounded-[var(--radius-md)] px-2 py-0.5 text-xs font-semibold accent-bg-soft accent-text">
                      {moodEmojiMap[entry.mood]?.label}
                    </span>
                  </div>

                  {entry.win ? (
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] line-clamp-1 italic">
                      "ðŸ† {entry.win}"
                    </p>
                  ) : (
                    <p className="text-xs text-[var(--text-muted)] line-clamp-1 italic">
                      {entry.notes || 'No win summary logged.'}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[var(--text-muted)]">
                <span className="px-2.5 py-1 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-color)] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  {habitsCompleted}/{entry.habits?.length || 0} Habits
                </span>

                <span className="px-2.5 py-1 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-color)] flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                  {tasksCompleted}/{entry.tasks?.length || 0} Tasks
                </span>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
});

TimelineView.displayName = 'TimelineView';
