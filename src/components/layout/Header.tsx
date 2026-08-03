import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Flame, Sun, Moon, Calendar, Download } from 'lucide-react';

interface HeaderProps {
  streakCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ streakCount = 0 }) => {
  const settings = useAppStore((state) => state.settings);
  const updateSettings = useAppStore((state) => state.updateSettings);
  const activeTab = useAppStore((state) => state.activeTab);
  const setActiveTab = useAppStore((state) => state.setActiveTab);

  const toggleTheme = () => {
    updateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' });
  };

  const todayDateString = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <header className="sticky top-0 z-[var(--z-header)] border-b border-[var(--border-color)] bg-[var(--bg-card)]/90 backdrop-blur-md px-4 py-2.5 sm:px-6 transition-colors duration-[250ms]">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3">
        {/* Brand */}
        <button
          type="button"
          onClick={() => setActiveTab('home')}
          className="focus-ring group flex items-center gap-2.5 rounded-[var(--radius-md)] text-left"
          aria-label="Go to home"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] border border-[var(--accent-border)] bg-[var(--accent-light)] shadow-[var(--shadow-sm)] transition-transform duration-[150ms] group-hover:scale-[1.02]">
            <Flame className="h-4.5 w-4.5 text-[var(--accent-primary)]" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-base font-semibold leading-tight tracking-normal text-[var(--text-primary)]">
              Daily Forge
            </h1>
            <p className="hidden text-[11px] font-medium text-[var(--text-muted)] sm:block">
              Private • Offline Daily Reflection
            </p>
          </div>
        </button>

        {/* Status badges, Export & Theme toggle */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Today's Date */}
          <div className="hidden items-center gap-1.5 rounded-[var(--radius-md)] border border-[var(--border-color)] bg-[var(--bg-subtle)] px-2.5 py-1 text-xs font-medium text-[var(--text-secondary)] sm:flex">
            <Calendar className="h-3.5 w-3.5 text-[var(--text-muted)]" aria-hidden="true" />
            <span>{todayDateString}</span>
          </div>

          {/* Streak Counter Badge */}
          <div className="flex items-center gap-1.5 rounded-[var(--radius-md)] border border-[var(--accent-border)] bg-[var(--accent-light)] px-2.5 py-1 text-xs font-semibold text-[var(--accent-primary)] shadow-[var(--shadow-sm)]">
            <Flame className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
            <span>{streakCount} {streakCount === 1 ? 'Day' : 'Days'}</span>
          </div>

          {/* Export Quick Access Button */}
          <button
            type="button"
            onClick={() => setActiveTab('export')}
            className={`focus-ring rounded-[var(--radius-md)] border p-2 transition-all duration-[150ms] active:scale-[0.99] ${
              activeTab === 'export'
                ? 'btn-accent border-transparent shadow-[var(--shadow-sm)]'
                : 'border-[var(--border-color)] bg-[var(--bg-subtle)] hover:bg-[var(--bg-card-hover)] text-[var(--text-secondary)]'
            }`}
            aria-label="Open export and backup"
            aria-current={activeTab === 'export' ? 'page' : undefined}
          >
            <Download className="h-4 w-4" aria-hidden="true" />
          </button>

          {/* Theme Switcher Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="focus-ring rounded-[var(--radius-md)] border border-[var(--border-color)] bg-[var(--bg-subtle)] p-2 text-[var(--text-secondary)] transition-all duration-[150ms] hover:bg-[var(--bg-card-hover)] active:scale-[0.99]"
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
