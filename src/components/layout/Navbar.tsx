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
  const { activeTab, setActiveTab } = useAppStore();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[var(--bg-card)]/90 backdrop-blur-md border-t border-[var(--border-color)] py-2 px-3 sm:px-8 shadow-lg">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex flex-col items-center py-1.5 px-3 rounded-2xl transition-all duration-200 ${
                isActive
                  ? 'accent-text font-bold scale-105'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'accent-text' : ''}`} />
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full accent-bg-soft bg-[var(--accent-primary)]" />
                )}
              </div>
              <span className="text-[11px] font-medium tracking-tight mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
