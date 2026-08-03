import React, { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../db/database';
import { calculateStatistics } from '../../utils/streakCalculator';
import { formatDisplayDate } from '../../utils/dateUtils';
import type { MoodRating } from '../../types/journal';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { 
  BarChart3, 
  Flame, 
  Trophy, 
  Target, 
  CheckCircle2, 
  TrendingUp, 
  Smile 
} from 'lucide-react';

const MOOD_COLORS: Record<MoodRating, string> = {
  1: '#f43f5e', // Terrible (Rose)
  2: '#f59e0b', // Low (Amber)
  3: '#94a3b8', // Okay (Slate)
  4: '#10b981', // Good (Emerald)
  5: '#8b5cf6', // Great (Violet)
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

  // Live query from Dexie IndexedDB
  const entries = useLiveQuery(() => db.journalEntries.toArray(), []) || [];
  const stats = calculateStatistics(entries);

  // Sort entries ascending by date for charts
  const sortedEntries = [...entries].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Filter entries based on selected time range
  const filteredForCharts = sortedEntries.filter((entry) => {
    if (timeRange === 'all') return true;
    const days = parseInt(timeRange, 10);
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    return new Date(entry.date + 'T00:00:00') >= cutoff;
  });

  // Prepare Mood Trend Data for AreaChart
  const moodTrendData = filteredForCharts.map((e) => ({
    date: formatDisplayDate(e.date, { month: 'short', day: 'numeric' }),
    mood: e.mood,
    fullDate: e.date,
  }));

  // Prepare Mood Distribution Data for PieChart
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

  // Prepare Habit Aggregation Data for BarChart
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
    <div className="space-y-6 animate-in fade-in duration-300 max-w-4xl mx-auto">
      {/* Header & Time Range Filter */}
      <Card className="accent-bg-soft accent-border border">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-md bg-[var(--bg-card)] border border-[var(--border-color)] text-xs font-bold accent-text">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Consistency & Trends</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
              Statistics Dashboard
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              Analyze your mood patterns, habit completion rates, and streak performance over time.
            </p>
          </div>

          {/* Range Selector */}
          <div className="flex items-center p-1 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-color)]">
            <button
              onClick={() => setTimeRange('7')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                timeRange === '7'
                  ? 'btn-accent text-white shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setTimeRange('30')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                timeRange === '30'
                  ? 'btn-accent text-white shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              30 Days
            </button>
            <button
              onClick={() => setTimeRange('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                timeRange === 'all'
                  ? 'btn-accent text-white shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              All Time
            </button>
          </div>
        </div>
      </Card>

      {/* Summary KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Current Streak */}
        <Card hoverable className="border accent-border">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Current Streak</span>
              <Flame className="w-4 h-4 accent-text fill-current" />
            </div>
            <h3 className="text-2xl font-extrabold accent-text">
              {stats.currentStreak} <span className="text-xs font-semibold text-[var(--text-secondary)]">Days</span>
            </h3>
          </div>
        </Card>

        {/* Longest Streak */}
        <Card hoverable>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Best Streak</span>
              <Trophy className="w-4 h-4 text-amber-500" />
            </div>
            <h3 className="text-2xl font-extrabold text-[var(--text-primary)]">
              {stats.longestStreak} <span className="text-xs font-semibold text-[var(--text-secondary)]">Days</span>
            </h3>
          </div>
        </Card>

        {/* Habit Completion % */}
        <Card hoverable>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Habit Rate</span>
              <Target className="w-4 h-4 text-emerald-500" />
            </div>
            <h3 className="text-2xl font-extrabold text-emerald-500">
              {stats.habitCompletionRate}%
            </h3>
          </div>
        </Card>

        {/* Task Completion % */}
        <Card hoverable>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Task Rate</span>
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
            </div>
            <h3 className="text-2xl font-extrabold text-indigo-400">
              {stats.taskCompletionRate}%
            </h3>
          </div>
        </Card>
      </div>

      {/* Mood Trend Over Time Chart */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 accent-text" />
              <span>Mood Trend Timeline</span>
            </CardTitle>
            <CardDescription>Daily mood score ratings over time (1 = Terrible, 5 = Great)</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {moodTrendData.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <Smile className="w-10 h-10 text-[var(--text-muted)] mx-auto opacity-40" />
              <p className="text-sm font-semibold text-[var(--text-secondary)]">No data for selected time range</p>
              <p className="text-xs text-[var(--text-muted)]">Log your daily reflections to see mood trends visualised.</p>
            </div>
          ) : (
            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={moodTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="var(--text-muted)" fontSize={11} tickLine={false} />
                  <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} stroke="var(--text-muted)" fontSize={11} tickLine={false} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        const level = data.mood as MoodRating;
                        return (
                          <div className="glass-panel p-2.5 rounded-xl border border-[var(--border-color)] shadow-xl text-xs space-y-1">
                            <p className="font-bold text-[var(--text-primary)]">{data.fullDate}</p>
                            <p className="accent-text font-bold flex items-center gap-1">
                              <span>Mood:</span>
                              <span>{MOOD_LABELS[level]}</span>
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="mood"
                    stroke="var(--accent-primary)"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#moodGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Mood Distribution & Habit Completion Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mood Distribution Donut Chart */}
        <Card>
          <CardHeader>
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Smile className="w-5 h-5 text-amber-500" />
                <span>Mood Breakdown</span>
              </CardTitle>
              <CardDescription>Percentage distribution of recorded mood levels</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {moodPieData.length === 0 ? (
              <p className="text-xs text-[var(--text-muted)] italic text-center py-8">No mood entries logged yet.</p>
            ) : (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="h-48 w-48 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={moodPieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={75}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {moodPieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-2 flex-1 w-full">
                  {moodPieData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="font-semibold text-[var(--text-primary)]">{item.name}</span>
                      </div>
                      <span className="font-bold text-[var(--text-secondary)]">
                        {item.value} {item.value === 1 ? 'day' : 'days'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Habit Completion Rates Bar Chart */}
        <Card>
          <CardHeader>
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-emerald-500" />
                <span>Habit Success Rates</span>
              </CardTitle>
              <CardDescription>Completion percentage per habit</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {habitBarData.length === 0 ? (
              <p className="text-xs text-[var(--text-muted)] italic text-center py-8">No habit data available.</p>
            ) : (
              <div className="h-48 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={habitBarData} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
                    <XAxis type="number" domain={[0, 100]} unit="%" stroke="var(--text-muted)" fontSize={10} />
                    <YAxis dataKey="name" type="category" stroke="var(--text-muted)" fontSize={10} width={100} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="glass-panel p-2 rounded-xl border border-[var(--border-color)] text-xs space-y-1">
                              <p className="font-bold text-[var(--text-primary)]">{data.fullName}</p>
                              <p className="text-emerald-500 font-bold">
                                {data.rate}% ({data.completed}/{data.total} completed)
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="rate" fill="var(--accent-primary)" radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
