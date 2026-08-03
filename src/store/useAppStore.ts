import { create } from 'zustand';
import type { UserSettings } from '../types/journal';
import { db, getOrInitSettings } from '../db/database';
import { formatLocalDate } from '../utils/dateUtils';

export type AppTab = 'home' | 'journal' | 'history' | 'stats' | 'settings' | 'export';

interface AppState {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  selectedDate: string; // YYYY-MM-DD
  setSelectedDate: (date: string) => void;
  
  // User Settings
  settings: UserSettings;
  loadSettings: () => Promise<void>;
  updateSettings: (newSettings: Partial<UserSettings>) => Promise<void>;

  // App initialization status
  isInitialized: boolean;
}

export const useAppStore = create<AppState>((set, get) => ({
  activeTab: 'home',
  setActiveTab: (tab) => set({ activeTab: tab }),
  selectedDate: formatLocalDate(),
  setSelectedDate: (date) => set({ selectedDate: date }),

  settings: {
    theme: 'dark',
    accentColor: 'emerald',
    fontSize: 'md',
    updatedAt: new Date().toISOString(),
  },

  isInitialized: false,

  loadSettings: async () => {
    try {
      const currentSettings = await getOrInitSettings();
      set({ settings: currentSettings, isInitialized: true });
    } catch (err) {
      console.error('Failed to load settings from IndexedDB:', err);
      set({ isInitialized: true });
    }
  },

  updateSettings: async (newSettings) => {
    const updated = {
      ...get().settings,
      ...newSettings,
      updatedAt: new Date().toISOString(),
    };
    set({ settings: updated });
    
    if (updated.id) {
      await db.settings.update(updated.id, updated);
    } else {
      const id = await db.settings.add(updated);
      set({ settings: { ...updated, id: Number(id) } });
    }
  },
}));
