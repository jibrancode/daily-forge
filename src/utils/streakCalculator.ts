import type { JournalEntry, AppStatistics } from '../types/journal';
import { formatLocalDate } from './dateUtils';

/**
 * Calculates current streak, longest streak, total entries, habit completion, and task completion.
 */
export function calculateStatistics(entries: JournalEntry[]): AppStatistics {
  if (!entries || entries.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      totalEntries: 0,
      habitCompletionRate: 0,
      taskCompletionRate: 0,
    };
  }

  // Extract unique dates sorted descending (YYYY-MM-DD)
  const uniqueDates = Array.from(new Set(entries.map((e) => e.date))).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  const todayStr = formatLocalDate();
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterdayStr = formatLocalDate(yesterdayDate);

  let currentStreak = 0;
  let checkDate = new Date(todayStr + 'T00:00:00');

  // If today is not entered, check if yesterday was entered to maintain current streak
  if (!uniqueDates.includes(todayStr) && uniqueDates.includes(yesterdayStr)) {
    checkDate = new Date(yesterdayStr + 'T00:00:00');
  }

  // Count current streak
  while (true) {
    const dateStr = formatLocalDate(checkDate);
    if (uniqueDates.includes(dateStr)) {
      currentStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  // Calculate longest streak
  let longestStreak = 0;
  let tempStreak = 0;
  let prevTimestamp: number | null = null;

  // Sort ascending for longest streak computation
  const datesAsc = [...uniqueDates].sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  for (const dateStr of datesAsc) {
    const currentTimestamp = new Date(dateStr + 'T00:00:00').getTime();
    if (prevTimestamp === null) {
      tempStreak = 1;
    } else {
      const diffDays = Math.round(
        (currentTimestamp - prevTimestamp) / (1000 * 60 * 60 * 24)
      );
      if (diffDays === 1) {
        tempStreak++;
      } else {
        tempStreak = 1;
      }
    }
    if (tempStreak > longestStreak) {
      longestStreak = tempStreak;
    }
    prevTimestamp = currentTimestamp;
  }

  // Habit completion rate
  let totalHabits = 0;
  let completedHabits = 0;
  let totalTasks = 0;
  let completedTasks = 0;

  for (const entry of entries) {
    if (entry.habits) {
      for (const h of entry.habits) {
        totalHabits++;
        if (h.completed) completedHabits++;
      }
    }
    if (entry.tasks) {
      for (const t of entry.tasks) {
        totalTasks++;
        if (t.completed) completedTasks++;
      }
    }
  }

  const habitCompletionRate =
    totalHabits > 0 ? Math.round((completedHabits / totalHabits) * 100) : 0;
  const taskCompletionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return {
    currentStreak,
    longestStreak,
    totalEntries: entries.length,
    habitCompletionRate,
    taskCompletionRate,
  };
}

/**
 * Returns a motivational daily reflection quote based on day of year.
 */
export function getDailyQuote(): { quote: string; author: string } {
  const quotes = [
    { quote: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Will Durant" },
    { quote: "Journaling is paying attention to the small details of your life.", author: "Alexandra Johnson" },
    { quote: "Small daily improvements over time lead to stunning results.", author: "Robin Sharma" },
    { quote: "Your life is controlled by what you focus on.", author: "Tony Robbins" },
    { quote: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
    { quote: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { quote: "Reflection is one of the most underused yet powerful tools for success.", author: "Richard Branson" },
  ];
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24
  );
  return quotes[dayOfYear % quotes.length];
}
