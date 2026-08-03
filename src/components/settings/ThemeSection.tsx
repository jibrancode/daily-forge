import React, { memo } from 'react';
import type { ThemeMode } from '../../types/journal';
import { Sun, Moon } from 'lucide-react';

interface ThemeSectionProps {
  currentTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
}

export const ThemeSection: React.FC<ThemeSectionProps> = memo(({
  currentTheme,
  onThemeChange,
}) => {
  return (
    <div className="space-y-2">
      <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
        Theme Mode
      </span>
      <div className="grid grid-cols-2 gap-4" role="radiogroup" aria-label="Theme mode selection">
        <button
          type="button"
          onClick={() => onThemeChange('dark')}
          className={`focus-ring flex items-center justify-center space-x-3 p-4 rounded-2xl border transition-all ${
            currentTheme === 'dark'
              ? 'accent-bg-soft accent-border border-2 font-bold shadow-md'
              : 'bg-[var(--bg-subtle)] border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
          }`}
          role="radio"
          aria-checked={currentTheme === 'dark'}
        >
          <Moon className="w-5 h-5 text-indigo-400" aria-hidden="true" />
          <span>Dark Mode</span>
        </button>

        <button
          type="button"
          onClick={() => onThemeChange('light')}
          className={`focus-ring flex items-center justify-center space-x-3 p-4 rounded-2xl border transition-all ${
            currentTheme === 'light'
              ? 'accent-bg-soft accent-border border-2 font-bold shadow-md'
              : 'bg-[var(--bg-subtle)] border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
          }`}
          role="radio"
          aria-checked={currentTheme === 'light'}
        >
          <Sun className="w-5 h-5 text-amber-400" aria-hidden="true" />
          <span>Light Mode</span>
        </button>
      </div>
    </div>
  );
});

ThemeSection.displayName = 'ThemeSection';
