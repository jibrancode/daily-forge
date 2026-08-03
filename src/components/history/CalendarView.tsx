import React, { memo, useMemo } from 'react';
import type { JournalEntry, MoodRating } from '../../types/journal';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { formatDisplayDate, formatLocalDate } from '../../utils/dateUtils';

const moodEmojiMap: Record<MoodRating, string> = {
  1: 'ðŸ˜–',
  2: 'ðŸ™',
  3: 'ðŸ˜',
  4: 'ðŸ™‚',
  5: 'ðŸ¤©',
};

interface CalendarViewProps {
  currentMonthDate: Date;
  entries: JournalEntry[];
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onResetMonth: () => void;
  onSelectDate: (dateStr: string) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = memo(({
  currentMonthDate,
  entries,
  onPrevMonth,
  onNextMonth,
  onResetMonth,
  onSelectDate,
}) => {
  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();

  const calendarDays = useMemo(() => {
    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDayOfWeek = firstDayOfMonth.getDay();

    const days: (string | null)[] = [];
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const monthStr = String(month + 1).padStart(2, '0');
      const dayStr = String(day).padStart(2, '0');
      days.push(`${year}-${monthStr}-${dayStr}`);
    }
    return days;
  }, [year, month]);

  const monthYearLabel = useMemo(() => {
    return currentMonthDate.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  }, [currentMonthDate]);

  return (
    <Card>
      <CardHeader>
        <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-2 sm:flex sm:w-auto sm:space-x-3">
            <Button variant="secondary" size="sm" onClick={onPrevMonth} icon={<ChevronLeft className="w-4 h-4" />} aria-label="Previous month">
              <span className="hidden sm:inline">Prev</span>
            </Button>
            <h3 className="text-center text-base font-semibold tracking-normal text-[var(--text-primary)] sm:text-left sm:text-lg">
              {monthYearLabel}
            </h3>
            <Button variant="secondary" size="sm" onClick={onNextMonth} icon={<ChevronRight className="w-4 h-4" />} aria-label="Next month">
              <span className="hidden sm:inline">Next</span>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={onResetMonth}
          >
            Today
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[10px] font-semibold uppercase tracking-normal text-[var(--text-muted)] sm:gap-2 sm:text-xs">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>

        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {calendarDays.map((dateStr, idx) => {
            if (!dateStr) {
              return <div key={`empty-${idx}`} className="h-12 rounded-[var(--radius-md)] bg-transparent sm:h-20" />;
            }

            const entry = entries.find((e) => e.date === dateStr);
            const dayNum = parseInt(dateStr.split('-')[2], 10);
            const isToday = dateStr === formatLocalDate();

            return (
              <button
                key={dateStr}
                type="button"
                onClick={() => onSelectDate(dateStr)}
                className={`focus-ring group flex h-12 cursor-pointer flex-col justify-between rounded-[var(--radius-md)] border p-1.5 text-left transition-all sm:h-20 sm:p-2 ${
                  isToday
                    ? 'border-[var(--accent-primary)] ring-2 ring-[var(--accent-border)] bg-[var(--bg-card)]'
                    : entry
                    ? 'bg-[var(--bg-card)] border-[var(--border-color)] hover:border-[var(--accent-border)] hover:bg-[var(--bg-card-hover)]'
                    : 'bg-[var(--bg-subtle)]/40 border-transparent hover:border-[var(--border-color)] opacity-60'
                }`}
                aria-label={`Select ${formatDisplayDate(dateStr)}${entry ? `, entry logged with mood level ${entry.mood}` : ', no entry'}`}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`text-xs font-bold ${
                      isToday
                        ? 'accent-text font-black'
                        : 'text-[var(--text-primary)]'
                    }`}
                  >
                    {dayNum}
                  </span>
                  {entry && (
                    <span className="text-xs sm:text-sm">{moodEmojiMap[entry.mood] || 'ðŸ™‚'}</span>
                  )}
                </div>

                {entry ? (
                  <div className="space-y-0.5">
                    <span className="hidden text-[10px] font-semibold accent-text line-clamp-1 sm:block">
                      {entry.win ? `ðŸ† ${entry.win}` : 'Reflected'}
                    </span>
                  </div>
                ) : (
                  <span className="hidden text-[9px] text-[var(--text-muted)] opacity-0 transition-opacity group-hover:text-[var(--accent-primary)] group-hover:opacity-100 sm:block">
                    + Add
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
});

CalendarView.displayName = 'CalendarView';
