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
    <div className="screen-enter space-y-6">
      {/* Welcome Banner & Daily Quote */}
      <div className="flex flex-col md:flex-row gap-6 items-stretch">
        <div className="flex-1 space-y-1">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--bg-subtle)] border border-[var(--border-color)] text-xs font-semibold text-[var(--text-secondary)]">
            <Clock className="w-3.5 h-3.5 accent-text" />
            <span>{formatDisplayDate(todayStr, { weekday: 'long', month: 'long', day: 'numeric' })}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
            {greeting}, Forger!
          </h2>
          <p className="text-sm text-[var(--text-secondary)]">
            Take a moment to reflect on your progress, wins, and daily habits.
          </p>
        </div>

        {/* Daily Motivation Card */}
        <div className="md:w-80 glass-panel rounded-2xl p-4 border border-[var(--border-color)] accent-bg-soft accent-border relative overflow-hidden flex flex-col justify-between">
          <Quote className="absolute right-3 bottom-2 w-16 h-16 opacity-10 accent-text -z-0" />
          <div className="relative z-10 space-y-1">
            <span className="text-[11px] font-bold tracking-wider uppercase accent-text">Daily Reflection</span>
            <p className="text-xs italic text-[var(--text-primary)] font-medium leading-relaxed">
              "{dailyQuote.quote}"
            </p>
          </div>
          <p className="text-[11px] font-semibold text-[var(--text-muted)] mt-2 text-right relative z-10">
            — {dailyQuote.author}
          </p>
        </div>
      </div>

      {/* Streak & Consistency Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Current Streak */}
        <Card hoverable className="relative overflow-hidden border accent-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Current Streak</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold accent-text mt-1">
                {stats.currentStreak} <span className="text-sm font-semibold text-[var(--text-secondary)]">Days</span>
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl accent-bg-soft flex items-center justify-center border accent-border shadow-md">
              <Flame className="w-6 h-6 accent-text fill-current animate-pulse" />
            </div>
          </div>
        </Card>

        {/* Longest Streak */}
        <Card hoverable>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Longest Streak</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] mt-1">
                {stats.longestStreak} <span className="text-sm font-semibold text-[var(--text-secondary)]">Days</span>
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20">
              <Trophy className="w-6 h-6" />
            </div>
          </div>
        </Card>

        {/* Total Reflected */}
        <Card hoverable>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Total Reflections</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] mt-1">
                {stats.totalEntries} <span className="text-sm font-semibold text-[var(--text-secondary)]">Forged</span>
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center border border-indigo-500/20">
              <BookOpen className="w-6 h-6" />
            </div>
          </div>
        </Card>
      </div>

      {/* Today's Entry Status CTA Card */}
      <Card className="accent-bg-soft accent-border border-2 shadow-lg">
        {todayEntry ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Today's Journal Complete</span>
              </div>
              <h3 className="text-xl font-bold tracking-tight text-[var(--text-primary)] flex items-center gap-2">
                <span>Mood Today:</span>
                <span className="text-2xl">{moodEmojiMap[todayEntry.mood]?.emoji}</span>
                <span className="text-sm font-semibold text-[var(--text-secondary)]">
                  ({moodEmojiMap[todayEntry.mood]?.label})
                </span>
              </h3>
              {todayEntry.win && (
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] line-clamp-1 italic">
                  "Win: {todayEntry.win}"
                </p>
              )}
            </div>

            <Button
              variant="accent"
              icon={<BookOpen className="w-4 h-4" />}
              onClick={() => {
                setSelectedDate(todayStr);
                setActiveTab('journal');
              }}
            >
              Edit Today's Entry
            </Button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-md bg-[var(--bg-card)] border border-[var(--border-color)] text-xs font-bold accent-text">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Daily Ritual</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[var(--text-primary)]">
                Close My Day — {formatDisplayDate(todayStr, { month: 'short', day: 'numeric' })}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md">
                Reflect on today's wins, lessons, tasks, and habits to build your daily streak.
              </p>
            </div>

            <Button
              variant="accent"
              size="lg"
              icon={<Flame className="w-5 h-5" />}
              onClick={() => {
                setSelectedDate(todayStr);
                setActiveTab('journal');
              }}
            >
              Forge Today's Entry
            </Button>
          </div>
        )}
      </Card>

      {/* Quick Habits for Today (if entry exists) */}
      {todayEntry && todayEntry.habits && todayEntry.habits.length > 0 && (
        <Card>
          <CardHeader>
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
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
      <Card>
        <CardHeader>
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
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 rounded-2xl accent-bg-soft flex items-center justify-center mx-auto border accent-border">
                <BookOpen className="w-6 h-6 accent-text" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-[var(--text-primary)]">No reflections forged yet</p>
                <p className="text-xs text-[var(--text-muted)]">Your daily journal entries will appear here once created.</p>
              </div>
              <Button
                variant="accent"
                size="sm"
                icon={<Plus className="w-4 h-4" />}
                onClick={() => {
                  setSelectedDate(todayStr);
                  setActiveTab('journal');
                }}
              >
                Create First Entry
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {recentEntries.map((entry) => (
                <div
                  key={entry.id || entry.date}
                  onClick={() => {
                    setSelectedDate(entry.date);
                    setActiveTab('journal');
                  }}
                  className="flex items-center justify-between p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-subtle)] hover:border-[var(--accent-border)] hover:bg-[var(--bg-card-hover)] transition-all cursor-pointer group"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{moodEmojiMap[entry.mood]?.emoji || '🙂'}</span>
                    <div>
                      <h4 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                        {formatDisplayDate(entry.date)}
                      </h4>
                      <p className="text-xs text-[var(--text-muted)] line-clamp-1 italic">
                        {entry.win ? `Win: ${entry.win}` : entry.notes || 'Reflection recorded.'}
                      </p>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
