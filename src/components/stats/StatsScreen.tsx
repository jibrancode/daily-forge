import React, { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../db/database';
import { calculateStatistics } from '../../utils/streakCalculator';
import { formatDisplayDate } from '../../utils/dateUtils';
import type { MoodRating } from '../../types/journal';
import { Card } from '../ui/Card';
import { BarChart3 } from 'lucide-react';

import { StatisticsCards } from './StatisticsCards';
import { MoodChart } from './MoodChart';
import { TrendChart } from './TrendChart';
import { HabitChart } from './HabitChart';

const MOOD_COLORS: Record<MoodRating, string> = {
  1: '#f43f5e',
  2: '#f59e0b',
  3: '#94a3b8',
  4: '#10b981',
  5: '#8b5cf6',
};

const MOOD_LABELS: Record<MoodRating, string> = {
  1: 'Terrible 😖',
  2: 'Low 🙁',
  3: 'Okay 😐',
  4: 'Good 🙂',
  5: 'Great 🤩',
};

export const StatsScreen: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7' | '30' | 'all'>('30');

  const entries = useLiveQuery(() => db.journalEntries.toArray(), []) || [];
  const stats = calculateStatistics(entries);

  const sortedEntries = [...entries].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const filteredForCharts = sortedEntries.filter((entry) => {
    if (timeRange === 'all') return true;
    const days = parseInt(timeRange, 10);
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    return new Date(entry.date + 'T00:00:00') >= cutoff;
  });

  const moodTrendData = filteredForCharts.map((e) => ({
    date: formatDisplayDate(e.date, { month: 'short', day: 'numeric' }),
    mood: e.mood,
    fullDate: e.date,
  }));

  const moodDistributionCounts: Record<MoodRating, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (const entry of filteredForCharts) {
    if (entry.mood >= 1 && entry.mood <= 5) {
      moodDistributionCounts[entry.mood]++;
    }
  }

  const moodPieData = ([1, 2, 3, 4, 5] as MoodRating[])
    .map((level) => ({
      name: MOOD_LABELS[level],
      level,
      value: moodDistributionCounts[level],
      color: MOOD_COLORS[level],
    }))
    .filter((d) => d.value > 0);

  const habitStatsMap: Record<string, { name: string; total: number; completed: number }> = {};

  for (const entry of filteredForCharts) {
    if (entry.habits) {
      for (const h of entry.habits) {
        if (!habitStatsMap[h.name]) {
          habitStatsMap[h.name] = { name: h.name, total: 0, completed: 0 };
        }
        habitStatsMap[h.name].total++;
        if (h.completed) {
          habitStatsMap[h.name].completed++;
        }
      }
    }
  }

  const habitBarData = Object.values(habitStatsMap).map((h) => ({
    name: h.name.length > 18 ? `${h.name.slice(0, 18)}...` : h.name,
    fullName: h.name,
    rate: h.total > 0 ? Math.round((h.completed / h.total) * 100) : 0,
    completed: h.completed,
    total: h.total,
  }));

  return (
    <div className="screen-enter mx-auto max-w-4xl space-y-6">
      <Card className="accent-bg-soft accent-border border">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-md bg-[var(--bg-card)] border border-[var(--border-color)] text-xs font-bold accent-text">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Consistency & Trends</span>
            </div>
            <h2 className="type-h2 text-[var(--text-primary)]">
              Statistics Dashboard
            </h2>
            <p className="type-caption text-[var(--text-secondary)]">
              Analyze your mood patterns, habit completion rates, and streak performance over time.
            </p>
          </div>

          <div className="flex items-center p-1 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-color)]">
            <button
              type="button"
              onClick={() => setTimeRange('7')}
              className={`focus-ring px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                timeRange === '7'
                  ? 'btn-accent text-white shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
              aria-pressed={timeRange === '7'}
            >
              7 Days
            </button>
            <button
              type="button"
              onClick={() => setTimeRange('30')}
              className={`focus-ring px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                timeRange === '30'
                  ? 'btn-accent text-white shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
              aria-pressed={timeRange === '30'}
            >
              30 Days
            </button>
            <button
              type="button"
              onClick={() => setTimeRange('all')}
              className={`focus-ring px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                timeRange === 'all'
                  ? 'btn-accent text-white shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
              aria-pressed={timeRange === 'all'}
            >
              All Time
            </button>
          </div>
        </div>
      </Card>

      <StatisticsCards stats={stats} />

      <MoodChart data={moodTrendData} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TrendChart data={moodPieData} />
        <HabitChart data={habitBarData} />
      </div>
    </div>
  );
};
