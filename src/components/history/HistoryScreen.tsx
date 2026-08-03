import React, { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../db/database';
import { useAppStore } from '../../store/useAppStore';
import { formatDisplayDate, formatLocalDate } from '../../utils/dateUtils';
import type { JournalEntry, MoodRating } from '../../types/journal';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Modal } from '../ui/Modal';
import { 
  Calendar as CalendarIcon, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Filter, 
  BookOpen, 
  Trophy, 
  Lightbulb, 
  Target, 
  Sparkles, 
  FileText, 
  Trash2, 
  Edit3,
  CheckCircle2
} from 'lucide-react';

const moodEmojiMap: Record<MoodRating, { emoji: string; label: string; colorClass: string }> = {
  1: { emoji: '😖', label: 'Terrible', colorClass: 'text-rose-500 bg-rose-500/10 border-rose-500/30' },
  2: { emoji: '🙁', label: 'Low', colorClass: 'text-amber-500 bg-amber-500/10 border-amber-500/30' },
  3: { emoji: '😐', label: 'Okay', colorClass: 'text-slate-400 bg-slate-500/10 border-slate-500/30' },
  4: { emoji: '🙂', label: 'Good', colorClass: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30' },
  5: { emoji: '🤩', label: 'Great', colorClass: 'text-purple-500 bg-purple-500/10 border-purple-500/30' },
};

export const HistoryScreen: React.FC = () => {
  const { setSelectedDate, setActiveTab } = useAppStore();

  const [viewMode, setViewMode] = useState<'calendar' | 'timeline'>('calendar');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMoodFilter, setSelectedMoodFilter] = useState<MoodRating | 0>(0);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [currentMonthDate, setCurrentMonthDate] = useState<Date>(new Date());

  // Live query from Dexie IndexedDB
  const entries = useLiveQuery(() => db.journalEntries.toArray(), []) || [];

  // Filtered entries for timeline
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

  // Calendar calculations
  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDayOfWeek = firstDayOfMonth.getDay(); // 0: Sun, 1: Mon...

  const calendarDays: (string | null)[] = [];
  for (let i = 0; i < startDayOfWeek; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const monthStr = String(month + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    calendarDays.push(`${year}-${monthStr}-${dayStr}`);
  }

  const handlePrevMonth = () => {
    setCurrentMonthDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthDate(new Date(year, month + 1, 1));
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

  const monthYearLabel = currentMonthDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="screen-enter mx-auto max-w-4xl space-y-6">
      {/* Header Banner & View Toggle */}
      <Card className="accent-bg-soft accent-border border">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-md bg-[var(--bg-card)] border border-[var(--border-color)] text-xs font-bold accent-text">
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>Reflection History</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
              Journal Archives
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              Browse through your past daily reflections, habits, and streak milestone entries.
            </p>
          </div>

          {/* View Toggle */}
          <div className="flex items-center p-1 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-color)]">
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'calendar'
                  ? 'btn-accent text-white shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              Calendar
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'timeline'
                  ? 'btn-accent text-white shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              Timeline Feed
            </button>
          </div>
        </div>
      </Card>

      {/* Calendar View Mode */}
      {viewMode === 'calendar' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-3">
                <Button variant="secondary" size="sm" onClick={handlePrevMonth} icon={<ChevronLeft className="w-4 h-4" />}>
                  Prev
                </Button>
                <h3 className="text-base sm:text-lg font-bold tracking-tight text-[var(--text-primary)]">
                  {monthYearLabel}
                </h3>
                <Button variant="secondary" size="sm" onClick={handleNextMonth} icon={<ChevronRight className="w-4 h-4" />}>
                  Next
                </Button>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentMonthDate(new Date())}
              >
                Today
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 text-center text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
              {calendarDays.map((dateStr, idx) => {
                if (!dateStr) {
                  return <div key={`empty-${idx}`} className="h-16 sm:h-20 rounded-xl bg-transparent" />;
                }

                const entry = entries.find((e) => e.date === dateStr);
                const dayNum = parseInt(dateStr.split('-')[2], 10);
                const isToday = dateStr === formatLocalDate();

                return (
                  <div
                    key={dateStr}
                    onClick={() => handleSelectCalendarDate(dateStr)}
                    className={`h-16 sm:h-20 p-1.5 sm:p-2 rounded-xl border flex flex-col justify-between transition-all cursor-pointer group ${
                      isToday
                        ? 'border-[var(--accent-primary)] ring-2 ring-[var(--accent-border)] bg-[var(--bg-card)]'
                        : entry
                        ? 'bg-[var(--bg-card)] border-[var(--border-color)] hover:border-[var(--accent-border)] hover:bg-[var(--bg-card-hover)]'
                        : 'bg-[var(--bg-subtle)]/40 border-transparent hover:border-[var(--border-color)] opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-bold ${
                          isToday
                            ? 'accent-text font-black'
                            : 'text-[var(--text-primary)]'
                        }`}
                      >
                        {dayNum}
                      </span>
                      {entry && (
                        <span className="text-sm">{moodEmojiMap[entry.mood]?.emoji || '🙂'}</span>
                      )}
                    </div>

                    {entry ? (
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-semibold accent-text line-clamp-1">
                          {entry.win ? `🏆 ${entry.win}` : 'Reflected'}
                        </span>
                      </div>
                    ) : (
                      <span className="text-[9px] text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] opacity-0 group-hover:opacity-100 transition-opacity">
                        + Add
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Timeline View Mode */}
      {viewMode === 'timeline' && (
        <div className="space-y-4">
          {/* Search & Mood Filter Bar */}
          <Card>
            <CardContent className="flex flex-col sm:flex-row gap-3 py-4">
              <div className="flex-1">
                <Input
                  placeholder="Search reflection wins, lessons, notes..."
                  icon={<Search className="w-4 h-4" />}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Mood Filter Pill selector */}
              <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
                <button
                  onClick={() => setSelectedMoodFilter(0)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    selectedMoodFilter === 0
                      ? 'btn-accent text-white border-transparent'
                      : 'bg-[var(--bg-subtle)] border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  All
                </button>
                {([5, 4, 3, 2, 1] as MoodRating[]).map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedMoodFilter(level)}
                    className={`px-2.5 py-1 rounded-xl text-xs font-semibold border flex items-center space-x-1 transition-all ${
                      selectedMoodFilter === level
                        ? 'btn-accent text-white border-transparent'
                        : 'bg-[var(--bg-subtle)] border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <span>{moodEmojiMap[level].emoji}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Entries Timeline List */}
          {filteredEntries.length === 0 ? (
            <Card className="text-center py-12">
              <div className="w-12 h-12 rounded-2xl accent-bg-soft flex items-center justify-center mx-auto border accent-border mb-3">
                <Filter className="w-6 h-6 accent-text" />
              </div>
              <h4 className="text-base font-bold text-[var(--text-primary)]">No matching journal entries</h4>
              <p className="text-xs text-[var(--text-muted)] mt-1">Try adjusting your search query or mood filter.</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredEntries.map((entry) => {
                const habitsCompleted = (entry.habits || []).filter((h) => h.completed).length;
                const tasksCompleted = (entry.tasks || []).filter((t) => t.completed).length;

                return (
                  <Card
                    key={entry.id || entry.date}
                    hoverable
                    onClick={() => setSelectedEntry(entry)}
                    className="border border-[var(--border-color)] hover:border-[var(--accent-border)] transition-all"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-start space-x-4">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border shadow-sm ${
                            moodEmojiMap[entry.mood]?.colorClass || 'bg-slate-500/10'
                          }`}
                        >
                          {moodEmojiMap[entry.mood]?.emoji || '🙂'}
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="text-base font-extrabold text-[var(--text-primary)]">
                              {formatDisplayDate(entry.date, { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
                            </h4>
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full accent-bg-soft accent-text">
                              {moodEmojiMap[entry.mood]?.label}
                            </span>
                          </div>

                          {entry.win ? (
                            <p className="text-xs sm:text-sm text-[var(--text-secondary)] line-clamp-1 italic">
                              "🏆 {entry.win}"
                            </p>
                          ) : (
                            <p className="text-xs text-[var(--text-muted)] line-clamp-1 italic">
                              {entry.notes || 'No win summary logged.'}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Habits & Tasks badges */}
                      <div className="flex items-center space-x-3 text-xs text-[var(--text-muted)] font-semibold">
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
          )}
        </div>
      )}

      {/* Full Entry View & Edit Modal */}
      {selectedEntry && (
        <Modal
          isOpen={!!selectedEntry}
          onClose={() => setSelectedEntry(null)}
          title={`Reflection — ${formatDisplayDate(selectedEntry.date, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}`}
          footer={
            <>
              <Button
                variant="danger"
                size="sm"
                icon={<Trash2 className="w-4 h-4" />}
                onClick={() => handleDeleteEntry(selectedEntry.id)}
              >
                Delete
              </Button>

              <Button
                variant="accent"
                size="sm"
                icon={<Edit3 className="w-4 h-4" />}
                onClick={() => {
                  setSelectedDate(selectedEntry.date);
                  setSelectedEntry(null);
                  setActiveTab('journal');
                }}
              >
                Edit Entry
              </Button>
            </>
          }
        >
          <div className="space-y-4 text-sm">
            {/* Mood Header */}
            <div className="flex items-center space-x-3 p-3 rounded-xl accent-bg-soft accent-border border">
              <span className="text-3xl">{moodEmojiMap[selectedEntry.mood]?.emoji}</span>
              <div>
                <span className="text-xs uppercase font-bold text-[var(--text-muted)]">Mood Level</span>
                <h4 className="text-base font-bold accent-text">{moodEmojiMap[selectedEntry.mood]?.label}</h4>
              </div>
            </div>

            {/* Win of the Day */}
            {selectedEntry.win && (
              <div className="p-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-color)] space-y-1">
                <div className="flex items-center space-x-1.5 text-amber-500 font-bold text-xs uppercase">
                  <Trophy className="w-4 h-4" />
                  <span>Win of the Day</span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed">{selectedEntry.win}</p>
              </div>
            )}

            {/* Lesson Learned */}
            {selectedEntry.lesson && (
              <div className="p-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-color)] space-y-1">
                <div className="flex items-center space-x-1.5 text-indigo-400 font-bold text-xs uppercase">
                  <Lightbulb className="w-4 h-4" />
                  <span>Key Lesson</span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed">{selectedEntry.lesson}</p>
              </div>
            )}

            {/* Improvement & Tomorrow */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedEntry.improve && (
                <div className="p-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-color)] space-y-1">
                  <div className="flex items-center space-x-1.5 text-emerald-500 font-bold text-xs uppercase">
                    <Target className="w-4 h-4" />
                    <span>Improvement</span>
                  </div>
                  <p className="text-xs text-[var(--text-primary)]">{selectedEntry.improve}</p>
                </div>
              )}

              {selectedEntry.tomorrow && (
                <div className="p-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-color)] space-y-1">
                  <div className="flex items-center space-x-1.5 text-purple-400 font-bold text-xs uppercase">
                    <Sparkles className="w-4 h-4" />
                    <span>Tomorrow's Focus</span>
                  </div>
                  <p className="text-xs text-[var(--text-primary)]">{selectedEntry.tomorrow}</p>
                </div>
              )}
            </div>

            {/* Notes */}
            {selectedEntry.notes && (
              <div className="p-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-color)] space-y-1">
                <div className="flex items-center space-x-1.5 accent-text font-bold text-xs uppercase">
                  <FileText className="w-4 h-4" />
                  <span>Journal Notes</span>
                </div>
                <p className="text-xs text-[var(--text-primary)] whitespace-pre-wrap">{selectedEntry.notes}</p>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
