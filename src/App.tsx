import { useState } from 'react';
import { useThemeSync } from './hooks/useThemeSync';
import { useAppStore } from './store/useAppStore';
import { Header } from './components/layout/Header';
import { Navbar } from './components/layout/Navbar';
import { SplashScreen } from './components/layout/SplashScreen';
import { HomeScreen } from './components/home/HomeScreen';
import { JournalScreen } from './components/journal/JournalScreen';
import { HistoryScreen } from './components/history/HistoryScreen';
import { StatsScreen } from './components/stats/StatsScreen';
import { ExportScreen } from './components/export/ExportScreen';
import { SettingsScreen } from './components/settings/SettingsScreen';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from './db/database';
import { calculateStatistics } from './utils/streakCalculator';
import { Smartphone, Monitor } from 'lucide-react';

export default function App() {
  useThemeSync();

  const [showSplash, setShowSplash] = useState(true);
  const { activeTab, isInitialized, isMobileView, setIsMobileView } = useAppStore();

  const entries = useLiveQuery(() => db.journalEntries.toArray(), []) || [];
  const stats = calculateStatistics(entries);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-200">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium tracking-wide text-slate-400">Forging your workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col bg-[var(--bg-main)] text-[var(--text-primary)] transition-colors duration-200 ${
      isMobileView ? 'py-6 px-4 bg-slate-950 flex items-center justify-center' : ''
    }`}>
      {/* Mobile Device Bezel Frame Container (when enabled) */}
      <div className={`w-full transition-all duration-300 ${
        isMobileView 
          ? 'max-w-[410px] min-h-[840px] rounded-[40px] border-[10px] border-slate-800 bg-[var(--bg-main)] shadow-2xl overflow-hidden relative border-t-[20px]' 
          : 'max-w-5xl mx-auto flex-1 flex flex-col'
      }`}>

        {/* Mobile Bezel Speaker Notch */}
        {isMobileView && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-slate-800 rounded-b-xl z-50 flex items-center justify-center">
            <div className="w-12 h-1 rounded-full bg-slate-600" />
          </div>
        )}

        <Header streakCount={stats.currentStreak} />

        {/* Main Content Container with Generous Spacing */}
        <main className={`flex-1 w-full mx-auto px-4 py-6 sm:px-8 mb-24 ${
          isMobileView ? 'max-h-[720px] overflow-y-auto px-4 py-4 mb-20' : ''
        }`}>
          {activeTab === 'home' && <HomeScreen />}
          {activeTab === 'journal' && <JournalScreen />}
          {activeTab === 'history' && <HistoryScreen />}
          {activeTab === 'stats' && <StatsScreen />}
          {activeTab === 'export' && <ExportScreen />}
          {activeTab === 'settings' && <SettingsScreen />}
        </main>

        <Navbar />
      </div>

      {/* Floating Device Mode Switcher Button on Desktop */}
      {!isMobileView && (
        <button
          onClick={() => setIsMobileView(true)}
          className="fixed top-20 right-4 z-40 p-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)]/90 backdrop-blur-md shadow-xl text-[var(--text-secondary)] hover:accent-text transition-all hidden md:flex items-center space-x-2 text-xs font-bold"
          title="Preview Mobile Device View"
        >
          <Smartphone className="w-4 h-4 accent-text" />
          <span>Mobile View</span>
        </button>
      )}

      {isMobileView && (
        <button
          onClick={() => setIsMobileView(false)}
          className="fixed top-4 right-4 z-50 p-2.5 rounded-xl border border-slate-700 bg-slate-900 text-slate-200 hover:text-white shadow-2xl flex items-center space-x-2 text-xs font-bold"
          title="Exit Mobile View"
        >
          <Monitor className="w-4 h-4 text-emerald-400" />
          <span>Exit Mobile View</span>
        </button>
      )}
    </div>
  );
}
