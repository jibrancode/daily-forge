import React, { memo } from 'react';
import type { AppStatistics } from '../../types/journal';
import { Card } from '../ui/Card';
import { Flame, Trophy, Target, CheckCircle2 } from 'lucide-react';

interface StatisticsCardsProps {
  stats: AppStatistics;
}

export const StatisticsCards: React.FC<StatisticsCardsProps> = memo(({ stats }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {/* Current Streak */}
      <Card hoverable className="border accent-border">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Current Streak</span>
            <Flame className="w-4 h-4 accent-text fill-current" aria-hidden="true" />
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
            <Trophy className="w-4 h-4 text-amber-500" aria-hidden="true" />
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
            <Target className="w-4 h-4 text-emerald-500" aria-hidden="true" />
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
            <CheckCircle2 className="w-4 h-4 text-indigo-400" aria-hidden="true" />
          </div>
          <h3 className="text-2xl font-extrabold text-indigo-400">
            {stats.taskCompletionRate}%
          </h3>
        </div>
      </Card>
    </div>
  );
});

StatisticsCards.displayName = 'StatisticsCards';
