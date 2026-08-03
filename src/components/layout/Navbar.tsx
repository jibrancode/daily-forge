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
    <nav className="fixed inset-x-0 bottom-0 z-[var(--z-navbar)] border-t border-[var(--border-color)] bg-[var(--bg-card)]/90 backdrop-blur-md px-3 py-1.5 shadow-[var(--shadow-md)]" aria-label="Primary navigation">
      <div className="mx-auto grid max-w-sm grid-cols-5 gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`focus-ring relative flex h-11 flex-col items-center justify-center rounded-[var(--radius-md)] px-1.5 py-1 transition-all duration-[150ms] ${
                isActive
                  ? 'font-semibold text-[var(--accent-primary)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
              }`}
              aria-current={isActive ? 'page' : undefined}
              aria-label={item.label}
            >
              <div className="relative flex items-center justify-center">
                <Icon className={`h-4.5 w-4.5 ${isActive ? 'text-[var(--accent-primary)]' : ''}`} aria-hidden="true" />
              </div>
              <span className="mt-0.5 text-[10px] font-medium tracking-normal leading-tight">{item.label}</span>
              {isActive && (
                <div className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[var(--accent-primary)]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
