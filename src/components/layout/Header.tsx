import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Flame, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  streakCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ streakCount = 0 }) => {
  const settings = useAppStore((state) => state.settings);
  const updateSettings = useAppStore((state) => state.updateSettings);
  const setActiveTab = useAppStore((state) => state.setActiveTab);

  const toggleTheme = () => {
    updateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' });
  };

  return (
    <header className="sticky top-0 z-[var(--z-header)] border-b border-[var(--border-color)] bg-[var(--bg-card)] px-4 py-2 transition-colors duration-[250ms] sm:px-6">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-2 sm:gap-3">
        {/* Brand */}
        <button
          type="button"
          onClick={() => setActiveTab('home')}
          className="focus-ring group flex min-w-0 items-center gap-2 rounded-[var(--radius-md)] text-left"
          aria-label="Go to home"
        >
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[var(--radius-md)] border border-[var(--accent-border)] bg-[var(--accent-light)] shadow-[var(--shadow-sm)] transition-transform duration-[150ms] group-hover:scale-[1.02] sm:h-9 sm:w-9">
            <Flame className="h-4 w-4 text-[var(--accent-primary)] sm:h-4.5 sm:w-4.5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-sm font-semibold leading-tight tracking-normal text-[var(--text-primary)] sm:text-base">
              Daily Forge
            </h1>
            <p className="hidden text-[10px] font-medium text-[var(--text-muted)] sm:block">
              Private • Offline Reflection
            </p>
          </div>
        </button>

        {/* Status badges & Theme toggle */}
        <div className="ml-auto flex shrink-0 items-center justify-end gap-1.5 sm:gap-2.5">
          {/* Streak Counter Badge */}
          <div className="flex items-center gap-1.5 rounded-[var(--radius-md)] border border-[var(--accent-border)] bg-[var(--accent-light)] px-2 py-1 text-[11px] font-semibold text-[var(--accent-primary)] shadow-[var(--shadow-sm)] sm:px-2.5 sm:text-xs">
            <Flame className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
            <span>{streakCount}<span className="hidden sm:inline"> {streakCount === 1 ? 'Day' : 'Days'}</span></span>
          </div>

          {/* Theme Switcher Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="focus-ring rounded-[var(--radius-md)] border border-[var(--border-color)] bg-[var(--bg-subtle)] p-1.5 text-[var(--text-secondary)] transition-all duration-[150ms] hover:bg-[var(--bg-card-hover)] active:scale-[0.99] sm:p-2"
            aria-label={`Switch to ${settings.theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {settings.theme === 'dark' ? (
              <Sun className="h-4 w-4 text-amber-400" aria-hidden="true" />
            ) : (
              <Moon className="h-4 w-4 text-indigo-500" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
