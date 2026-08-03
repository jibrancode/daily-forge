# Daily Forge — Technical Requirements Document (TRD)

## 1. Technology Stack
- **Framework**: React 19.0 with TypeScript (strict mode enabled).
- **Build Tool & Bundler**: Vite 8 with Rolldown code splitting.
- **State Management**: Zustand 5.0 (centralized app state for tabs, date, settings).
- **Persistence Layer**: IndexedDB via Dexie 4.4 (`dexie-react-hooks` for reactive live queries).
- **Styling**: Tailwind CSS v4 with CSS Custom Variables design token layer in `index.css`.
- **Icons**: Lucide React 1.16.
- **Export Engines**: `jspdf` (PDF generation), `docx` (Word document generation).
- **Data Visualization**: `recharts` 3.x for responsive charts.

---

## 2. Architecture & Data Flow
1. **Zustand App Store (`src/store/useAppStore.ts`)**:
   - Manages UI navigation tab (`activeTab`), active date (`selectedDate`), and user preferences (`settings`).
   - Persists user settings changes to IndexedDB automatically.

2. **Dexie IndexedDB Database (`src/db/database.ts`)**:
   - `journalEntries`: Stores daily reflections keyed by auto-incrementing `id` with index on `date`.
   - `settings`: Stores application theme, accent color, and font scaling settings.

3. **Reactivity**:
   - Screen components subscribe to IndexedDB via `useLiveQuery()`, triggering zero-lag UI rerenders whenever database transactions occur.

---

## 3. Performance Criteria
- **Lighthouse Score Goal**: 95+ across Performance, Accessibility, Best Practices, PWA.
- **Component Memoization**: All presentation components wrapped with `React.memo()`.
- **Lazy Loading**: Route-level code splitting via `React.lazy()` and `Suspense`.
- **Bundle Optimization**: Tree-shaken icon imports and externalized heavy PDF/DOCX export utilities.