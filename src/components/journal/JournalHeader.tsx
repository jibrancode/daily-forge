import React, { memo } from 'react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Calendar as CalendarIcon } from 'lucide-react';
import { formatLocalDate } from '../../utils/dateUtils';

interface JournalHeaderProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export const JournalHeader: React.FC<JournalHeaderProps> = memo(({
  selectedDate,
  onDateChange,
}) => {
  const isToday = selectedDate === formatLocalDate();

  return (
    <Card className="accent-bg-soft accent-border border">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-md bg-[var(--bg-card)] border border-[var(--border-color)] text-xs font-bold accent-text">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>{isToday ? "Today's Reflection" : 'Past Reflection'}</span>
          </div>
          <h2 className="type-h2 text-[var(--text-primary)]">
            Close My Day
          </h2>
          <p className="type-caption text-[var(--text-secondary)]">
            Reflect on your mood, habits, wins, and key lessons for {selectedDate}.
          </p>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            className="font-medium text-xs sm:text-sm"
            aria-label="Select journal date"
          />
        </div>
      </div>
    </Card>
  );
});

JournalHeader.displayName = 'JournalHeader';
