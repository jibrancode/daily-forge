# Daily Forge — Architecture Overview

## 1. System Topology

```
+-------------------------------------------------------------------+
|                        Daily Forge Web PWA                        |
+-------------------------------------------------------------------+
|                                                                   |
|  +--------------------+   +-------------------+   +-------------+ |
|  |   Header / Navbar   |   |   Zustand Store   |   | UI Controls | |
|  +---------+----------+   +---------+---------+   +------+------+ |
|            |                        |                    |        |
|  +---------v------------------------v--------------------v------+ |
|  |                     App Screen Routes                        | |
|  | (HomeScreen, JournalScreen, HistoryScreen, Stats, Export, etc.)| |
|  +----------------------------------+---------------------------+ |
|                                     |                             |
|  +----------------------------------v---------------------------+ |
|  |                 Feature Sub-Components (x20)                 | |
|  |     (React.memo wrapped, standardized ARIA & styling)        | |
|  +----------------------------------+---------------------------+ |
|                                     |                             |
|  +----------------------------------v---------------------------+ |
|  |           Persistence Layer: Dexie.js (IndexedDB)            | |
|  |        - journalEntries (date index, mood, prompts)          | |
|  |        - settings (theme, accent, font size)                 | |
|  +--------------------------------------------------------------+ |
+-------------------------------------------------------------------+
```

---

## 2. Directory Layout & Module Structure

```
src/
├── components/
├── export/          # ExportCard, ImportCard, BackupCard, ExportScreen
├── history/         # CalendarView, TimelineView, FilterBar, ReflectionModal, HistoryScreen
├── home/            # HomeScreen
├── journal/         # JournalHeader, MoodSection, HabitSection, TaskSection, ReflectionSection, NotesSection, JournalFooter, JournalScreen
├── layout/          # Header, Navbar, SplashScreen
├── settings/        # ThemeSection, AppearanceSection, BackupSection, AboutSection, SettingsScreen
├── stats/           # StatisticsCards, MoodChart, TrendChart, HabitChart, StatsScreen
└── ui/              # Button, Card, Input, Modal, Toast, MoodSelector, HabitCheckbox, TaskCard, Screen, ScratchpadWidget
├── db/
│   └── database.ts  # Dexie IndexedDB instance & helper functions
├── store/
│   └── useAppStore.ts # Zustand global UI state
├── types/
│   └── journal.ts   # TypeScript domain interfaces
├── utils/
│   ├── dateUtils.ts        # Timezone-safe local date formatting
│   ├── exportUtils.ts      # PDF, DOCX, TXT, JSON export & hardened JSON import
│   └── streakCalculator.ts # Streak algorithms & quote provider
├── App.tsx          # Main entry & route suspense lazy loading
├── index.css        # Design tokens & custom CSS variables
└── main.tsx         # React DOM root entry
```

---

## 3. Core Architectural Guarantees
1. **Data Isolation**: Application data is stored strictly inside client-side IndexedDB databases.
2. **Zero Runtime Jitter**: All UI sub-components use `React.memo` and atomic Zustand selectors to minimize re-render cascades.
3. **PWA Offline Readiness**: Application assets are fully bundleable and cached for execution without internet connectivity.
