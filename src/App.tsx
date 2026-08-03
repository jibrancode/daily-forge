import { lazy, Suspense, useState } from 'react';
import { useThemeSync } from './hooks/useThemeSync';
import { useAppStore } from './store/useAppStore';
import { Header } from './components/layout/Header';
import { Navbar } from './components/layout/Navbar';
import { SplashScreen } from './components/layout/SplashScreen';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from './db/database';
import { calculateStatistics } from './utils/streakCalculator';

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

  const entries = useLiveQuery(() => db.journalEntries.toArray(), []) || [];
  const stats = calculateStatistics(entries);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-main)] text-[var(--text-primary)]">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-10 w-10 rounded-full border-4 border-[var(--accent-primary)] border-t-transparent animate-spin"></div>
          <p className="type-caption font-medium text-[var(--text-secondary)]">Forging your workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] transition-colors duration-[250ms]">
      <div className="relative mx-auto flex min-h-screen w-full max-w-3xl flex-col transition-all duration-[250ms]">
        <Header streakCount={stats.currentStreak} />

        <main className="w-full flex-1 px-4 py-4 sm:px-6 sm:py-6 pb-20 sm:pb-24">
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
    </div>
  );
}
