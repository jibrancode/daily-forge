import Dexie, { type Table } from 'dexie';
import type { JournalEntry, UserSettings } from '../types/journal';

export class DailyForgeDatabase extends Dexie {
  journalEntries!: Table<JournalEntry, number>;
  settings!: Table<UserSettings, number>;

  constructor() {
    super('DailyForgeDB');
    this.version(1).stores({
      journalEntries: '++id, &date, mood, createdAt',
      settings: '++id',
    });
  }
}

export const db = new DailyForgeDatabase();

export const DEFAULT_SETTINGS: UserSettings = {
  theme: 'dark',
  accentColor: 'emerald',
  fontSize: 'md',
  updatedAt: new Date().toISOString(),
};

export async function getOrInitSettings(): Promise<UserSettings> {
  const existing = await db.settings.toCollection().first();
  if (existing) {
    return existing;
  }
  const id = await db.settings.add(DEFAULT_SETTINGS);
  return { ...DEFAULT_SETTINGS, id: Number(id) };
}
