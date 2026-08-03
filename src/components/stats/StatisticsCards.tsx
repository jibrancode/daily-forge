import React, { memo } from 'react';
import type { AppStatistics } from '../../types/journal';
import { Card } from '../ui/Card';
import { Flame, Trophy, Target, CheckCircle2 } from 'lucide-react';

interface StatisticsCardsProps {
  stats: AppStatistics;
}

export const StatisticsCards: React.FC<StatisticsCardsProps> = memo(({ stats }) => {
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
      {/* Current Streak */}
      <Card hoverable className="border accent-border">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-normal text-[var(--text-muted)] sm:text-[11px]">Current</span>
            <Flame className="w-4 h-4 accent-text fill-current" aria-hidden="true" />
          </div>
          <h3 className="text-xl font-semibold accent-text sm:text-2xl">
            {stats.currentStreak} <span className="text-xs font-semibold text-[var(--text-secondary)]">Days</span>
          </h3>
        </div>
      </Card>

      {/* Longest Streak */}
      <Card hoverable>
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-normal text-[var(--text-muted)] sm:text-[11px]">Best</span>
            <Trophy className="w-4 h-4 text-amber-500" aria-hidden="true" />
          </div>
          <h3 className="text-xl font-semibold text-[var(--text-primary)] sm:text-2xl">
            {stats.longestStreak} <span className="text-xs font-semibold text-[var(--text-secondary)]">Days</span>
          </h3>
        </div>
      </Card>

      {/* Habit Completion % */}
      <Card hoverable>
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-normal text-[var(--text-muted)] sm:text-[11px]">Habits</span>
            <Target className="w-4 h-4 text-emerald-500" aria-hidden="true" />
          </div>
          <h3 className="text-xl font-semibold text-emerald-500 sm:text-2xl">
            {stats.habitCompletionRate}%
          </h3>
        </div>
      </Card>

      {/* Task Completion % */}
      <Card hoverable>
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-normal text-[var(--text-muted)] sm:text-[11px]">Tasks</span>
            <CheckCircle2 className="w-4 h-4 text-indigo-400" aria-hidden="true" />
          </div>
          <h3 className="text-xl font-semibold text-indigo-400 sm:text-2xl">
            {stats.taskCompletionRate}%
          </h3>
        </div>
      </Card>
    </div>
  );
});

StatisticsCards.displayName = 'StatisticsCards';
