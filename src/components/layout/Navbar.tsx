import React from 'react';
import { useAppStore, type AppTab } from '../../store/useAppStore';
import { Home, BookOpen, Calendar, BarChart3, Settings } from 'lucide-react';

const navItems: { id: AppTab; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'journal', label: 'Journal', icon: BookOpen },
  { id: 'history', label: 'History', icon: Calendar },
  { id: 'stats', label: 'Stats', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Navbar: React.FC = () => {
  const activeTab = useAppStore((state) => state.activeTab);
  const setActiveTab = useAppStore((state) => state.setActiveTab);

  return (
    <nav className="fixed inset-x-0 bottom-0 z-[var(--z-navbar)] border-t border-[var(--border-color)] bg-[var(--bg-card)]/95 px-3 py-2 shadow-[var(--shadow-md)] sm:px-8" aria-label="Primary navigation">
      <div className="mx-auto grid max-w-md grid-cols-5 gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`focus-ring relative flex min-h-12 flex-col items-center justify-center rounded-[var(--radius-md)] px-2 py-1.5 transition-all duration-[150ms] ${
                isActive
                  ? 'font-semibold text-[var(--accent-primary)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
              }`}
              aria-current={isActive ? 'page' : undefined}
              aria-label={item.label}
            >
              <div className="relative">
                <Icon className={`mb-0.5 h-5 w-5 ${isActive ? 'text-[var(--accent-primary)]' : ''}`} aria-hidden="true" />
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[var(--accent-primary)]" />
                )}
              </div>
              <span className="mt-0.5 text-[11px] font-medium tracking-normal">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
