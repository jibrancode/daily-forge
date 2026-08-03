import { lazy, Suspense, useState } from 'react';
import { useThemeSync } from './hooks/useThemeSync';
import { useAppStore } from './store/useAppStore';
import { Header } from './components/layout/Header';
import { Navbar } from './components/layout/Navbar';
import { SplashScreen } from './components/layout/SplashScreen';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from './db/database';
import { calculateStatistics } from './utils/streakCalculator';
import { Smartphone, Monitor } from 'lucide-react';

const HomeScreen = lazy(() => import('./components/home/HomeScreen').then((module) => ({ default: module.HomeScreen })));
const JournalScreen = lazy(() => import('./components/journal/JournalScreen').then((module) => ({ default: module.JournalScreen })));
const HistoryScreen = lazy(() => import('./components/history/HistoryScreen').then((module) => ({ default: module.HistoryScreen })));
const StatsScreen = lazy(() => import('./components/stats/StatsScreen').then((module) => ({ default: module.StatsScreen })));
const ExportScreen = lazy(() => import('./components/export/ExportScreen').then((module) => ({ default: module.ExportScreen })));
const SettingsScreen = lazy(() => import('./components/settings/SettingsScreen').then((module) => ({ default: module.SettingsScreen })));

function ScreenFallback() {
  return (
    <div className="flex min-h-72 items-center justify-center text-[var(--text-secondary)]">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 rounded-full border-2 border-[var(--accent-primary)] border-t-transparent animate-spin" />
        <p className="type-caption font-medium">Loading Daily Forge...</p>
      </div>
    </div>
  );
}

export default function App() {
  useThemeSync();

  const [showSplash, setShowSplash] = useState(true);
  const activeTab = useAppStore((state) => state.activeTab);
  const isInitialized = useAppStore((state) => state.isInitialized);
  const isMobileView = useAppStore((state) => state.isMobileView);
  const setIsMobileView = useAppStore((state) => state.setIsMobileView);

  const entries = useLiveQuery(() => db.journalEntries.toArray(), []) || [];
  const stats = calculateStatistics(entries);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-200">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-10 w-10 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"></div>
          <p className="type-caption font-medium text-slate-400">Forging your workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] transition-colors duration-[250ms] ${
      isMobileView ? 'px-3 py-4 sm:px-6' : ''
    }`}>
      <div className={`mx-auto flex min-h-screen w-full flex-col transition-all duration-[250ms] ${
        isMobileView
          ? 'max-w-md rounded-[var(--radius-xl)] bg-[var(--bg-main)] shadow-[var(--shadow-lg)] ring-1 ring-[var(--border-color)]'
          : 'max-w-5xl'
      }`}>
        <Header streakCount={stats.currentStreak} />

        <main className="mx-auto mb-24 w-full flex-1 px-4 py-5 sm:px-6 sm:py-8">
          <Suspense fallback={<ScreenFallback />}>
            {activeTab === 'home' && <HomeScreen />}
            {activeTab === 'journal' && <JournalScreen />}
            {activeTab === 'history' && <HistoryScreen />}
            {activeTab === 'stats' && <StatsScreen />}
            {activeTab === 'export' && <ExportScreen />}
            {activeTab === 'settings' && <SettingsScreen />}
          </Suspense>
        </main>

        <Navbar />
      </div>

      {!isMobileView && (
        <button
          onClick={() => setIsMobileView(true)}
          className="focus-ring fixed right-4 top-20 z-[var(--z-header)] hidden items-center gap-2 rounded-[var(--radius-md)] border border-[var(--border-color)] bg-[var(--bg-card)]/95 px-3 py-2 text-xs font-semibold text-[var(--text-secondary)] shadow-[var(--shadow-md)] transition-colors duration-[150ms] hover:text-[var(--accent-primary)] md:flex"
          aria-label="Preview compact mobile layout"
        >
          <Smartphone className="h-4 w-4 text-[var(--accent-primary)]" aria-hidden="true" />
          <span>Compact Preview</span>
        </button>
      )}

      {isMobileView && (
        <button
          onClick={() => setIsMobileView(false)}
          className="focus-ring fixed right-4 top-4 z-[var(--z-toast)] flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--border-color)] bg-[var(--bg-card)] px-3 py-2 text-xs font-semibold text-[var(--text-secondary)] shadow-[var(--shadow-md)] transition-colors duration-[150ms] hover:text-[var(--text-primary)]"
          aria-label="Exit compact preview"
        >
          <Monitor className="h-4 w-4 text-[var(--accent-primary)]" aria-hidden="true" />
          <span>Full Width</span>
        </button>
      )}
    </div>
  );
}
