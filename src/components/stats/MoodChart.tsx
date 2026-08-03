import React, { memo } from 'react';
import type { MoodRating } from '../../types/journal';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { TrendingUp, Smile } from 'lucide-react';

const MOOD_LABELS: Record<MoodRating, string> = {
  1: 'Terrible 😖',
  2: 'Low 🙁',
  3: 'Okay 😐',
  4: 'Good 🙂',
  5: 'Great 🤩',
};

interface MoodTrendItem {
  date: string;
  mood: MoodRating;
  fullDate: string;
}

interface MoodChartProps {
  data: MoodTrendItem[];
}

export const MoodChart: React.FC<MoodChartProps> = memo(({ data }) => {
  return (
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
        {data.length === 0 ? (
          <div className="text-center py-12 space-y-2">
            <Smile className="w-10 h-10 text-[var(--text-muted)] mx-auto opacity-40" />
            <p className="text-sm font-semibold text-[var(--text-secondary)]">No data for selected time range</p>
            <p className="text-xs text-[var(--text-muted)]">Log your daily reflections to see mood trends visualised.</p>
          </div>
        ) : (
          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                      const itemData = payload[0].payload as MoodTrendItem;
                      const level = itemData.mood;
                      return (
                        <div className="glass-panel p-2.5 rounded-xl border border-[var(--border-color)] shadow-xl text-xs space-y-1">
                          <p className="font-bold text-[var(--text-primary)]">{itemData.fullDate}</p>
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
  );
});

MoodChart.displayName = 'MoodChart';
