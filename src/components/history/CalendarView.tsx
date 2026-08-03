import React, { memo, useMemo } from 'react';
import type { JournalEntry, MoodRating } from '../../types/journal';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { formatDisplayDate, formatLocalDate } from '../../utils/dateUtils';

const moodEmojiMap: Record<MoodRating, string> = {
  1: '😖',
  2: '🙁',
  3: '😐',
  4: '🙂',
  5: '🤩',
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
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-3">
            <Button variant="secondary" size="sm" onClick={onPrevMonth} icon={<ChevronLeft className="w-4 h-4" />} aria-label="Previous month">
              Prev
            </Button>
            <h3 className="text-base sm:text-lg font-bold tracking-tight text-[var(--text-primary)]">
              {monthYearLabel}
            </h3>
            <Button variant="secondary" size="sm" onClick={onNextMonth} icon={<ChevronRight className="w-4 h-4" />} aria-label="Next month">
              Next
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
        <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 text-center text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
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
              return <div key={`empty-${idx}`} className="h-16 sm:h-20 rounded-xl bg-transparent" />;
            }

            const entry = entries.find((e) => e.date === dateStr);
            const dayNum = parseInt(dateStr.split('-')[2], 10);
            const isToday = dateStr === formatLocalDate();

            return (
              <button
                key={dateStr}
                type="button"
                onClick={() => onSelectDate(dateStr)}
                className={`focus-ring text-left h-16 sm:h-20 p-1.5 sm:p-2 rounded-xl border flex flex-col justify-between transition-all cursor-pointer group ${
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
                    <span className="text-sm">{moodEmojiMap[entry.mood] || '🙂'}</span>
                  )}
                </div>

                {entry ? (
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-semibold accent-text line-clamp-1">
                      {entry.win ? `🏆 ${entry.win}` : 'Reflected'}
                    </span>
                  </div>
                ) : (
                  <span className="text-[9px] text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] opacity-0 group-hover:opacity-100 transition-opacity">
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
