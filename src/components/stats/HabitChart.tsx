import React, { memo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { Target } from 'lucide-react';

interface HabitBarItem {
  name: string;
  fullName: string;
  rate: number;
  completed: number;
  total: number;
}

interface HabitChartProps {
  data: HabitBarItem[];
}

export const HabitChart: React.FC<HabitChartProps> = memo(({ data }) => {
  return (
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
        {data.length === 0 ? (
          <p className="text-xs text-[var(--text-muted)] italic text-center py-8">No habit data available.</p>
        ) : (
          <div className="h-56 w-full pt-2 sm:h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} layout="vertical" margin={{ top: 0, right: 8, left: -10, bottom: 0 }}>
                <XAxis type="number" domain={[0, 100]} unit="%" stroke="var(--text-muted)" fontSize={10} />
                <YAxis dataKey="name" type="category" stroke="var(--text-muted)" fontSize={10} width={82} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const itemData = payload[0].payload as HabitBarItem;
                      return (
                        <div className="glass-panel p-2 rounded-[var(--radius-md)] border border-[var(--border-color)] text-xs space-y-1">
                          <p className="font-bold text-[var(--text-primary)]">{itemData.fullName}</p>
                          <p className="text-emerald-500 font-bold">
                            {itemData.rate}% ({itemData.completed}/{itemData.total} completed)
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
  );
});

HabitChart.displayName = 'HabitChart';
