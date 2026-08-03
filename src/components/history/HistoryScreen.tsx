import React, { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../db/database';
import { useAppStore } from '../../store/useAppStore';
import type { JournalEntry, MoodRating } from '../../types/journal';
import { Card } from '../ui/Card';
import { Calendar as CalendarIcon } from 'lucide-react';

import { CalendarView } from './CalendarView';
import { TimelineView } from './TimelineView';
import { FilterBar } from './FilterBar';
import { ReflectionModal } from './ReflectionModal';

export const HistoryScreen: React.FC = () => {
  const setSelectedDate = useAppStore((state) => state.setSelectedDate);
  const setActiveTab = useAppStore((state) => state.setActiveTab);

  const [viewMode, setViewMode] = useState<'calendar' | 'timeline'>('calendar');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMoodFilter, setSelectedMoodFilter] = useState<MoodRating | 0>(0);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [currentMonthDate, setCurrentMonthDate] = useState<Date>(new Date());

  const entries = useLiveQuery(() => db.journalEntries.toArray(), []) || [];

  const filteredEntries = entries
    .filter((entry) => {
      const matchesMood = selectedMoodFilter === 0 || entry.mood === selectedMoodFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        (entry.win && entry.win.toLowerCase().includes(q)) ||
        (entry.lesson && entry.lesson.toLowerCase().includes(q)) ||
        (entry.improve && entry.improve.toLowerCase().includes(q)) ||
        (entry.tomorrow && entry.tomorrow.toLowerCase().includes(q)) ||
        (entry.notes && entry.notes.toLowerCase().includes(q)) ||
        entry.date.includes(q);

      return matchesMood && matchesSearch;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handlePrevMonth = () => {
    setCurrentMonthDate(new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthDate(new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + 1, 1));
  };

  const handleSelectCalendarDate = (dateStr: string) => {
    const existing = entries.find((e) => e.date === dateStr);
    if (existing) {
      setSelectedEntry(existing);
    } else {
      setSelectedDate(dateStr);
      setActiveTab('journal');
    }
  };

  const handleDeleteEntry = async (id?: number) => {
    if (!id) return;
    if (window.confirm('Delete this journal entry permanently?')) {
      await db.journalEntries.delete(id);
      setSelectedEntry(null);
    }
  };

  const handleEditEntry = (dateStr: string) => {
    setSelectedDate(dateStr);
    setSelectedEntry(null);
    setActiveTab('journal');
  };

  return (
    <div className="screen-enter w-full space-y-5">
      <Card className="accent-bg-soft accent-border border">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-md bg-[var(--bg-card)] border border-[var(--border-color)] text-xs font-bold accent-text">
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>Reflection History</span>
            </div>
            <h2 className="type-h2 text-[var(--text-primary)]">
              Journal Archives
            </h2>
            <p className="type-caption text-[var(--text-secondary)]">
              Browse through your past daily reflections, habits, and streak milestone entries.
            </p>
          </div>

          <div className="flex items-center p-1 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-color)]">
            <button
              type="button"
              onClick={() => setViewMode('calendar')}
              className={`focus-ring px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'calendar'
                  ? 'btn-accent text-white shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
              aria-pressed={viewMode === 'calendar'}
            >
              Calendar
            </button>
            <button
              type="button"
              onClick={() => setViewMode('timeline')}
              className={`focus-ring px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'timeline'
                  ? 'btn-accent text-white shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
              aria-pressed={viewMode === 'timeline'}
            >
              Timeline Feed
            </button>
          </div>
        </div>
      </Card>

      {viewMode === 'calendar' ? (
        <CalendarView
          currentMonthDate={currentMonthDate}
          entries={entries}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onResetMonth={() => setCurrentMonthDate(new Date())}
          onSelectDate={handleSelectCalendarDate}
        />
      ) : (
        <div className="space-y-4">
          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedMoodFilter={selectedMoodFilter}
            onMoodFilterChange={setSelectedMoodFilter}
          />
          <TimelineView
            filteredEntries={filteredEntries}
            onSelectEntry={setSelectedEntry}
          />
        </div>
      )}

      <ReflectionModal
        entry={selectedEntry}
        onClose={() => setSelectedEntry(null)}
        onDelete={handleDeleteEntry}
        onEdit={handleEditEntry}
      />
    </div>
  );
};
