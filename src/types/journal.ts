export type MoodRating = 1 | 2 | 3 | 4 | 5; // 1: Terrible, 2: Bad, 3: Okay, 4: Good, 5: Great

export interface HabitItem {
  id: string;
  name: string;
  completed: boolean;
}

export interface TaskItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface JournalEntry {
  id?: number;
  date: string; // ISO date string format YYYY-MM-DD
  mood: MoodRating;
  tasks: TaskItem[];
  habits: HabitItem[];
  win: string;
  lesson: string;
  improve: string;
  tomorrow: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export type ThemeMode = 'dark' | 'light';

export type AccentColor = 'emerald' | 'indigo' | 'violet' | 'amber' | 'rose' | 'cyan';

export type FontSize = 'sm' | 'md' | 'lg';

export interface UserSettings {
  id?: number;
  theme: ThemeMode;
  accentColor: AccentColor;
  fontSize: FontSize;
  updatedAt: string;
}

export interface AppStatistics {
  currentStreak: number;
  longestStreak: number;
  totalEntries: number;
  habitCompletionRate: number; // percentage 0-100
  taskCompletionRate: number; // percentage 0-100
}
