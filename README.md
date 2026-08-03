# Daily Forge 🔥

> A beautiful, private, offline-first daily journaling application designed to help users reflect on their day, track habits, and build consistency.

[![License](https://img.shields.io/badge/license-MIT-emerald.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178c6.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646cff.svg)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8.svg)](https://tailwindcss.com/)
[![Database](https://img.shields.io/badge/Database-IndexedDB_(Dexie.js)-10b981.svg)](https://dexie.org/)

---

## 🌟 Key Features

- 🔒 **100% Private & Offline-First**: All reflections, tasks, and habits stay strictly local on your device via **IndexedDB (Dexie.js)**. No accounts, backend servers, or data collection.
- 🔥 **Streak & Consistency Metrics**: Calculates consecutive reflection days, historical best streak, total reflections, and habit/task completion rates in real-time.
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
  - Dark Mode 🌙 & Light Mode ☀️ toggle.
  - 6 curated accent color themes (`emerald`, `indigo`, `violet`, `amber`, `rose`, `cyan`).
  - Font size scaling (`Small`, `Medium`, `Large`).
  - **Mobile Device Frame Preview**: Emulates a compact mobile phone bezel container on desktop screens.
- 📋 **Interactive Scratchpad & Build Tracker Widget**: Embedded widget tracking project roadmap phases and local scratchpad notes.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| --- | --- |
| **Framework & Build** | React 19, Vite 8, TypeScript |
| **Styling & UI** | Tailwind CSS v4, CSS Variables, Lucide React Icons |
| **State Management** | Zustand |
| **Local Storage / Database** | IndexedDB via Dexie.js (`dexie-react-hooks`) |
| **Analytics Charts** | Recharts |
| **Export Exporters** | jsPDF, docx, html2canvas |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn

### Installation

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

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📂 Project Architecture

```
MARK1/
├── docs/                      # Architectural & Requirements Documentation
│   ├── 01_PRD.md             # Product Requirements Document
│   ├── 02_TRD.md             # Technical Requirements Document
│   ├── 03_AppFlow.md         # Application Flow & Navigation Rules
│   ├── 04_DesignSystem.md    # Color Palette, Typography & Tokens
│   ├── 05_Schema.md          # Database Entities & Schemas
│   ├── 06_ImplementationPlan.md # Development Roadmap
│   ├── 07_Tracker.md         # Progress Tracker
│   ├── 08_Rules.md           # Coding Conventions & Project Guidelines
│   ├── 09_ComponentLibrary.md# Reusable UI Component Definitions
│   └── 10_Decisions.md       # Architectural Decision Log (ADR)
│
├── src/
│   ├── components/
│   │   ├── export/           # ExportScreen & Data Backup
│   │   ├── history/          # HistoryScreen, Calendar Grid & Timeline Feed
│   │   ├── home/             # HomeScreen Dashboard & Daily Quotes
│   │   ├── journal/          # JournalScreen & Close My Day Reflection Form
│   │   ├── layout/           # Header, Navbar & SplashScreen
│   │   ├── settings/         # SettingsScreen, Theme Picker & Mobile Frame Toggle
│   │   ├── stats/            # StatsScreen & Recharts Analytics
│   │   └── ui/               # Reusable UI Components (Button, Card, Input, Modal, ScratchpadWidget, Toast, etc.)
│   ├── db/                   # Dexie IndexedDB Initialization & Queries
│   ├── hooks/                # Theme & Attribute Sync Hooks
│   ├── store/                # Zustand App State Store
│   ├── types/                # TypeScript Interfaces & Models
│   ├── utils/                # Date Utilities, Export Exporters & Streak Calculators
│   ├── App.tsx               # App Root Component
│   ├── index.css             # Tailwind v4 & Theme CSS System
│   └── main.tsx              # React Entrypoint
│
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 📄 Documentation

Detailed specification files can be inspected in the [`docs/`](docs/) directory:
- [01_PRD.md](docs/01_PRD.md)
- [02_TRD.md](docs/02_TRD.md)
- [03_AppFlow.md](docs/03_AppFlow.md)
- [04_DesignSystem.md](docs/04_DesignSystem.md)
- [05_Schema.md](docs/05_Schema.md)
- [06_ImplementationPlan.md](docs/06_ImplementationPlan.md)
- [07_Tracker.md](docs/07_Tracker.md)
- [08_Rules.md](docs/08_Rules.md)
- [09_ComponentLibrary.md](docs/09_ComponentLibrary.md)
- [10_Decisions.md](docs/10_Decisions.md)

---

## 🛡️ License

This project is licensed under the [MIT License](LICENSE).
