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
    <nav
      className="fixed inset-x-0 bottom-0 z-[var(--z-navbar)] border-t border-[var(--border-color)] bg-[var(--bg-card)] px-2 pt-1"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      aria-label="Primary navigation"
    >
      <div className="mx-auto grid max-w-[28rem] grid-cols-5 gap-1 pb-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`focus-ring relative flex min-h-[3.5rem] flex-col items-center justify-center rounded-[var(--radius-md)] px-1 py-1 transition-colors duration-[150ms] active:scale-[0.98] ${
                isActive
                  ? 'font-medium text-[var(--accent-primary)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
              }`}
              aria-current={isActive ? 'page' : undefined}
              aria-label={item.label}
            >
              <div className="relative flex items-center justify-center">
                <Icon className={`h-5 w-5 ${isActive ? 'text-[var(--accent-primary)]' : ''}`} aria-hidden="true" />
              </div>
              <span className="mt-1 max-w-full truncate text-[10px] leading-tight tracking-normal">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
