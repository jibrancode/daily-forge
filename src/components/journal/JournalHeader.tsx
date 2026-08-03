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
          <h2 className="type-h2 text-[var(--text-primary)] flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 accent-text" />
            {isToday ? "Today's Reflection" : 'Past Reflection'}
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
