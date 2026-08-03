# Daily Forge 🔥

> A calm, elegant, mobile-first daily journaling application inspired by Apple Journal, Day One, Bear, Reflectly, and Things 3. Designed to help users reflect on their day, track habits, and build consistency with total privacy.

[![License](https://img.shields.io/badge/license-MIT-emerald.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178c6.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646cff.svg)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8.svg)](https://tailwindcss.com/)
[![Capacitor](https://img.shields.io/badge/Capacitor-v7.0-119eff.svg)](https://capacitorjs.com/)
[![Database](https://img.shields.io/badge/Database-IndexedDB_(Dexie.js)-10b981.svg)](https://dexie.org/)

---

## 🌟 Key Features

- 📱 **Mobile-First & Android Ready**: Native-feel mobile design with safe-area spacing, bottom tab bar navigation, touch-optimized targets (320px–414px+), and Capacitor 7 Android integration.
- 🔒 **100% Private & Offline-First**: All reflections, tasks, and habits stay strictly local on your device via **IndexedDB (Dexie.js)**. No accounts, backend servers, or cloud tracking.
- 🔥 **Streak & Consistency Metrics**: Real-time streak tracking (current streak, longest streak, total reflections, habit & task completion rates).
- 📝 **"Close My Day" Structured Journaling**:
  - 5-level interactive mood rating (`Terrible 😖`, `Low 🙁`, `Okay 😐`, `Good 🙂`, `Great 🤩`).
  - Daily habits checklist with custom habit creation.
  - Interactive daily task list manager.
  - Prompts for *Win of the Day 🏆*, *Key Lesson Learned 💡*, *Area for Improvement 🎯*, *Tomorrow's Top Priority 🚀*, and *Freeform Notes 📝*.
- 📅 **History & Calendar Archives**:
  - Monthly calendar grid view highlighting past reflections with mood badges.
  - Chronological timeline feed with search & mood level filtering.
  - Interactive reflection viewer modal with inline editing & deletion.
- 📊 **Statistics & Analytics Dashboard**:
  - **Recharts** interactive data visualizations.
  - **Mood Trend Timeline**: Area chart tracking mood score over 7 days, 30 days, or all time.
  - **Mood Breakdown**: Donut chart displaying percentage distribution of mood levels.
  - **Habit Success Rates**: Horizontal bar chart evaluating habit routine consistency.
- 📄 **Offline Export Engine & Data Ownership**:
  - **PDF Export**: Formatted multi-page PDF generation via `jsPDF`.
  - **Word Document (.docx) Export**: Structured Microsoft Word files via `docx`.
  - **Plain Text (.txt) Export**: Lightweight text compilation for any note editor.
  - **JSON Backup & Restore**: Full raw data snapshot export/import for complete data portability.
- 🎨 **Dynamic Design System & Aesthetics**:
  - Dark Mode 🌙 & Light Mode ☀️ toggle with warm paper aesthetics.
  - 6 curated accent color themes (`emerald`, `indigo`, `violet`, `amber`, `rose`, `cyan`).
  - Font size scaling (`Small`, `Medium`, `Large`).

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| --- | --- |
| **Framework & Build** | React 19, Vite 8, TypeScript |
| **Mobile Runtime** | Capacitor 7 (Android SDK 34) |
| **Styling & UI** | Tailwind CSS v4, CSS Variables, SF Pro Typography, Lucide React Icons |
| **State Management** | Zustand |
| **Local Database** | IndexedDB via Dexie.js (`dexie-react-hooks`) |
| **Analytics Charts** | Recharts |
| **Export Exporters** | jsPDF, docx, html2canvas |

---

## 🚀 Getting Started

### Web Application Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/jibrancode/daily-forge.git
   cd daily-forge
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

4. **Build for production & verify linting**:
   ```bash
   npm run lint
   npm run build
   ```

---

## 📱 Android Application Build

Daily Forge is converted into a native Android app via **Capacitor**.

### Prerequisites for Android Build
- JDK 17+ or JDK 21 (set in `JAVA_HOME`)
- Android SDK Platform 34 & Build-Tools 34.0.0

### Build Steps

1. **Build the web application assets**:
   ```bash
   npm run build
   ```

2. **Sync web assets to Capacitor Android project**:
   ```bash
   npx cap sync android
   ```

3. **Build the Android APK (Debug & Release)**:
   ```bash
   cd android
   .\gradlew.bat assembleDebug assembleRelease
   ```

### Output APK Locations
- **Debug APK**: `android/app/build/outputs/apk/debug/app-debug.apk`
- **Release APK**: `android/app/build/outputs/apk/release/app-release-unsigned.apk`

---

## 📂 Project Architecture

```
daily-forge/
├── android/                   # Native Capacitor Android Project
│   ├── app/                   # Android Application module & source
│   ├── build.gradle           # Root Gradle build script
│   ├── local.properties       # Android SDK directory config
│   └── gradlew.bat            # Gradle wrapper executable
│
├── docs/                      # PRD, TRD & Architecture Docs
│   ├── 01_PRD.md
│   ├── 02_TRD.md
│   └── ...
│
├── src/
│   ├── components/
│   │   ├── export/           # ExportScreen & Backup Cards
│   │   ├── history/          # HistoryScreen, Calendar Grid & Timeline Feed
│   │   ├── home/             # HomeScreen Dashboard & Daily Reflections
│   │   ├── journal/          # JournalScreen & Close My Day Reflection Form
│   │   ├── layout/           # Header, Navbar & SplashScreen
│   │   ├── settings/         # SettingsScreen & Appearance Picker
│   │   ├── stats/            # StatsScreen & Recharts Analytics
│   │   └── ui/               # Reusable UI Components (Button, Card, Input, Modal, Toast, etc.)
│   ├── db/                   # Dexie IndexedDB Database & Queries
│   ├── hooks/                # Theme & Accent Sync Hooks
│   ├── store/                # Zustand App State Store
│   ├── types/                # TypeScript Interfaces & Models
│   ├── utils/                # Date Utilities, Export Exporters & Streak Calculators
│   ├── App.tsx               # App Root Component
│   ├── index.css             # Tailwind v4 & Theme CSS System
│   └── main.tsx              # React Entrypoint
│
├── capacitor.config.ts        # Capacitor App & Native Config
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🗺️ Product Roadmap

- [x] **Phase 1**: Core journaling, mood tracking, habits, and streak calculation.
- [x] **Phase 2**: Multi-format exports (PDF, DOCX, TXT, JSON backup/restore).
- [x] **Phase 3**: Responsive mobile UI polish, Apple Journal & Day One design system.
- [x] **Phase 4**: Capacitor Android native bundle & APK generation.
- [ ] **Phase 5**: Biometric app lock (Fingerprint / Face ID via Capacitor Biometrics).
- [ ] **Phase 6**: Audio daily voice note attachments.

---

## 🛡️ License

This project is licensed under the [MIT License](LICENSE).
