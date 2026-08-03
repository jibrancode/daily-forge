import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Flame, Sun, Moon, Calendar, Download } from 'lucide-react';

interface HeaderProps {
  streakCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ streakCount = 0 }) => {
  const { settings, updateSettings, activeTab, setActiveTab } = useAppStore();

  const toggleTheme = () => {
    updateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' });
  };

  const todayDateString = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[var(--bg-card)]/85 border-b border-[var(--border-color)] px-4 py-3 sm:px-8 transition-colors">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center space-x-3 cursor-pointer select-none group"
        >
          <div className="w-10 h-10 rounded-2xl accent-bg-soft flex items-center justify-center border accent-border shadow-sm group-hover:scale-105 transition-transform">
            <Flame className="w-5 h-5 accent-text" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold tracking-tight text-[var(--text-primary)] leading-tight">
              Daily Forge
            </h1>
            <p className="text-[11px] text-[var(--text-muted)] font-medium hidden sm:block">
              Private • Offline Daily Reflection
            </p>
          </div>
        </div>

        {/* Status badges, Export & Theme toggle */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Today's Date */}
          <div className="hidden xs:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-color)] text-xs text-[var(--text-secondary)] font-medium">
            <Calendar className="w-3.5 h-3.5 text-[var(--text-muted)]" />
            <span>{todayDateString}</span>
          </div>

          {/* Streak Counter Badge */}
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl accent-bg-soft border accent-border text-xs font-bold accent-text shadow-sm">
            <Flame className="w-4 h-4 accent-text fill-current animate-pulse" />
            <span>{streakCount} {streakCount === 1 ? 'Day' : 'Days'}</span>
          </div>

          {/* Export Quick Access Button */}
          <button
            onClick={() => setActiveTab('export')}
            className={`p-2.5 rounded-xl border transition-all active:scale-95 ${
              activeTab === 'export'
                ? 'btn-accent text-white border-transparent shadow-md'
                : 'border-[var(--border-color)] bg-[var(--bg-subtle)] hover:bg-[var(--bg-card-hover)] text-[var(--text-secondary)]'
            }`}
            title="Export & Data Backup"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-subtle)] hover:bg-[var(--bg-card-hover)] transition-all text-[var(--text-secondary)] active:scale-95"
            title={`Switch to ${settings.theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {settings.theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-500" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
