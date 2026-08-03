import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';

export function useThemeSync() {
  const settings = useAppStore((state) => state.settings);
  const loadSettings = useAppStore((state) => state.loadSettings);
  const isInitialized = useAppStore((state) => state.isInitialized);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  useEffect(() => {
    if (!isInitialized) return;

    const root = document.documentElement;
    
    // Theme Mode
    if (settings.theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }

    // Accent Color
    root.setAttribute('data-accent', settings.accentColor || 'emerald');

    // Font Size
    root.setAttribute('data-font-size', settings.fontSize || 'md');
  }, [settings, isInitialized]);
}
