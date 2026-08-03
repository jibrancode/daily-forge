import React, { memo } from 'react';
import type { MoodRating } from '../../types/journal';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Smile } from 'lucide-react';

interface MoodPieItem {
  name: string;
  level: MoodRating;
  value: number;
  color: string;
}

interface TrendChartProps {
  data: MoodPieItem[];
}

export const TrendChart: React.FC<TrendChartProps> = memo(({ data }) => {
  return (
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
        {data.length === 0 ? (
          <p className="text-xs text-[var(--text-muted)] italic text-center py-8">No mood entries logged yet.</p>
        ) : (
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="relative h-40 w-40 sm:h-48 sm:w-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="w-full flex-1 space-y-2">
              {data.map((item) => (
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
  );
});

TrendChart.displayName = 'TrendChart';
