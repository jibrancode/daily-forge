import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../db/database';
import { useAppStore } from '../../store/useAppStore';
import { calculateStatistics, getDailyQuote } from '../../utils/streakCalculator';
import { formatLocalDate, formatDisplayDate } from '../../utils/dateUtils';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { HabitCheckbox } from '../ui/HabitCheckbox';
import type { MoodRating } from '../../types/journal';
import { 
  Flame, 
  BookOpen, 
  Calendar, 
  CheckCircle2, 
  Quote, 
  ArrowRight, 
  Sparkles, 
  Trophy, 
  Plus,
  Clock
} from 'lucide-react';

const moodEmojiMap: Record<MoodRating, { emoji: string; label: string; colorClass: string }> = {
  1: { emoji: '😖', label: 'Terrible', colorClass: 'text-rose-500 bg-rose-500/10' },
  2: { emoji: '🙁', label: 'Low', colorClass: 'text-amber-500 bg-amber-500/10' },
  3: { emoji: '😐', label: 'Okay', colorClass: 'text-slate-400 bg-slate-500/10' },
  4: { emoji: '🙂', label: 'Good', colorClass: 'text-emerald-500 bg-emerald-500/10' },
  5: { emoji: '🤩', label: 'Great', colorClass: 'text-purple-500 bg-purple-500/10' },
};

export const HomeScreen: React.FC = () => {
  const { setActiveTab, setSelectedDate } = useAppStore();
  
  // Live query from Dexie IndexedDB
  const entries = useLiveQuery(() => db.journalEntries.toArray(), []) || [];
  const stats = calculateStatistics(entries);
  const dailyQuote = getDailyQuote();

  const todayStr = formatLocalDate();
  const todayEntry = entries.find((e) => e.date === todayStr);

  // Time of day greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  // Toggle habit directly on home screen if today's entry exists
  const handleToggleHabit = async (habitId: string) => {
    if (!todayEntry || !todayEntry.id) return;
    const updatedHabits = (todayEntry.habits || []).map((h) =>
      h.id === habitId ? { ...h, completed: !h.completed } : h
    );
    await db.journalEntries.update(todayEntry.id, {
      habits: updatedHabits,
      updatedAt: new Date().toISOString(),
    });
  };

  const recentEntries = [...entries]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <div className="screen-enter space-y-5">
      {/* Welcome Banner & Daily Quote */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch justify-between">
        <div className="flex-1 space-y-1.5 py-0.5">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[var(--bg-subtle)] border border-[var(--border-color)] text-[11px] font-semibold text-[var(--text-secondary)]">
            <Clock className="w-3.5 h-3.5 accent-text" />
            <span>{formatDisplayDate(todayStr, { weekday: 'long', month: 'long', day: 'numeric' })}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
            {greeting}, Forger!
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
            Take a moment to reflect on your progress, wins, and daily habits.
          </p>
        </div>

        {/* Daily Motivation Card */}
        <div className="sm:w-72 glass-panel rounded-xl p-3.5 border border-[var(--border-color)] accent-bg-soft accent-border relative overflow-hidden flex flex-col justify-between shrink-0">
          <Quote className="absolute -right-2 -bottom-2 w-14 h-14 opacity-10 accent-text pointer-events-none" />
          <div className="relative z-10 space-y-1">
            <span className="text-[10px] font-bold tracking-wider uppercase accent-text">Daily Reflection</span>
            <p className="text-xs italic text-[var(--text-primary)] font-medium leading-relaxed line-clamp-3">
              "{dailyQuote.quote}"
            </p>
          </div>
          <p className="text-[10px] font-semibold text-[var(--text-muted)] mt-1.5 text-right relative z-10">
            — {dailyQuote.author}
          </p>
        </div>
      </div>

      {/* Streak & Consistency Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Current Streak */}
        <Card hoverable className="relative overflow-hidden border accent-border !p-3.5">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] truncate">Current Streak</p>
              <h3 className="text-xl sm:text-2xl font-bold accent-text mt-0.5">
                {stats.currentStreak} <span className="text-xs font-semibold text-[var(--text-secondary)]">Days</span>
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl accent-bg-soft flex items-center justify-center border accent-border shrink-0">
              <Flame className="w-5 h-5 accent-text fill-current animate-pulse" />
            </div>
          </div>
        </Card>

        {/* Longest Streak */}
        <Card hoverable className="!p-3.5">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] truncate">Longest Streak</p>
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mt-0.5">
                {stats.longestStreak} <span className="text-xs font-semibold text-[var(--text-secondary)]">Days</span>
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20 shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
          </div>
        </Card>

        {/* Total Reflected */}
        <Card hoverable className="!p-3.5">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] truncate">Total Reflections</p>
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mt-0.5">
                {stats.totalEntries} <span className="text-xs font-semibold text-[var(--text-secondary)]">Forged</span>
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center border border-indigo-500/20 shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
        </Card>
      </div>

      {/* Today's Entry Status CTA Card */}
      <Card className="accent-bg-soft accent-border border !p-4 sm:!p-5">
        {todayEntry ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5">
            <div className="space-y-1">
              <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Today's Journal Complete</span>
              </div>
              <h3 className="text-lg font-bold tracking-tight text-[var(--text-primary)] flex items-center gap-2">
                <span>Mood Today:</span>
                <span className="text-xl">{moodEmojiMap[todayEntry.mood]?.emoji}</span>
                <span className="text-xs font-medium text-[var(--text-secondary)]">
                  ({moodEmojiMap[todayEntry.mood]?.label})
                </span>
              </h3>
              {todayEntry.win && (
                <p className="text-xs text-[var(--text-secondary)] line-clamp-1 italic">
                  "Win: {todayEntry.win}"
                </p>
              )}
            </div>

            <Button
              variant="accent"
              size="sm"
              icon={<BookOpen className="w-4 h-4" />}
              onClick={() => {
                setSelectedDate(todayStr);
                setActiveTab('journal');
              }}
            >
              Edit Entry
            </Button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5">
            <div className="space-y-1">
              <div className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-[var(--bg-card)] border border-[var(--border-color)] text-xs font-semibold accent-text">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Daily Ritual</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[var(--text-primary)]">
                Close My Day — {formatDisplayDate(todayStr, { month: 'short', day: 'numeric' })}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] max-w-md">
                Reflect on today's wins, lessons, tasks, and habits to build your daily streak.
              </p>
            </div>

            <Button
              variant="accent"
              size="md"
              icon={<Flame className="w-4 h-4" />}
              onClick={() => {
                setSelectedDate(todayStr);
                setActiveTab('journal');
              }}
            >
              Forge Entry
            </Button>
          </div>
        )}
      </Card>

      {/* Quick Habits for Today (if entry exists) */}
      {todayEntry && todayEntry.habits && todayEntry.habits.length > 0 && (
        <Card className="!p-4 sm:!p-5">
          <CardHeader className="mb-3">
            <div>
              <CardTitle>Today's Habits Quick Tracker</CardTitle>
              <CardDescription>Toggle habits directly for today's reflection</CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              icon={<ArrowRight className="w-3.5 h-3.5" />}
              onClick={() => {
                setSelectedDate(todayStr);
                setActiveTab('journal');
              }}
            >
              Manage
            </Button>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {todayEntry.habits.map((habit) => (
              <HabitCheckbox
                key={habit.id}
                habit={habit}
                onToggle={handleToggleHabit}
              />
            ))}
          </CardContent>
        </Card>
      )}

      {/* Recent Reflections Timeline */}
      <Card className="!p-4 sm:!p-5">
        <CardHeader className="mb-3">
          <div>
            <CardTitle>Recent Reflections</CardTitle>
            <CardDescription>Your latest daily entries</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            icon={<Calendar className="w-3.5 h-3.5" />}
            onClick={() => setActiveTab('history')}
          >
            View All History
          </Button>
        </CardHeader>
        <CardContent>
          {recentEntries.length === 0 ? (
            <div className="text-center py-6 space-y-2.5">
              <div className="w-10 h-10 rounded-xl accent-bg-soft flex items-center justify-center mx-auto border accent-border">
                <BookOpen className="w-5 h-5 accent-text" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-[var(--text-primary)]">No reflections forged yet</p>
                <p className="text-[11px] text-[var(--text-muted)]">Your daily journal entries will appear here once created.</p>
              </div>
              <Button
                variant="accent"
                size="sm"
                icon={<Plus className="w-3.5 h-3.5" />}
                onClick={() => {
                  setSelectedDate(todayStr);
                  setActiveTab('journal');
                }}
              >
                Create First Entry
              </Button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {recentEntries.map((entry) => (
                <button
                  key={entry.id || entry.date}
                  type="button"
                  onClick={() => {
                    setSelectedDate(entry.date);
                    setActiveTab('journal');
                  }}
                  className="focus-ring flex w-full items-center justify-between p-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-subtle)] hover:border-[var(--accent-border)] hover:bg-[var(--bg-card-hover)] text-left transition-all cursor-pointer group"
                  aria-label={`View reflection for ${formatDisplayDate(entry.date)}`}
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <span className="text-xl shrink-0">{moodEmojiMap[entry.mood]?.emoji || '🙂'}</span>
                    <div className="min-w-0">
                      <h4 className="text-xs font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                        {formatDisplayDate(entry.date)}
                      </h4>
                      <p className="text-[11px] text-[var(--text-muted)] line-clamp-1 italic">
                        {entry.win ? `Win: ${entry.win}` : entry.notes || 'Reflection recorded.'}
                      </p>
                    </div>
                  </div>

                  <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                </button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
