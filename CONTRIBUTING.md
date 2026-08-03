# Contributing to Daily Forge

Thank you for your interest in contributing to Daily Forge! Daily Forge is a private, offline-first journaling application built with React 19, TypeScript, Zustand, Dexie.js, and Tailwind CSS v4.

---

## 1. Development Setup

### Prerequisites
- Node.js 18+ or 20+
- npm 9+ or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/jibrancode/daily-forge.git
cd daily-forge

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 2. Code Quality Commands

Before submitting pull requests, ensure all checks pass:

```bash
# Run Linter (Oxlint)
npm run lint

# Run TypeScript Compilation Check
npx tsc -b

# Production Build Test
npm run build
```

---

## 3. Architecture & Coding Conventions

- **Offline-First**: All data must remain stored locally in IndexedDB (`src/db/database.ts`). Do not add external network tracking or third-party cloud database calls.
- **Accessibility**: Never add clickable `<div>` elements (`<div onClick=...>`). Always use `<button type="button">` or appropriate semantic HTML. Provide `aria-label` for icon-only buttons.
- **Design Tokens**: Do not write arbitrary hex codes in components. Rely on CSS custom properties defined in `src/index.css` (`var(--bg-main)`, `var(--accent-primary)`, etc.).
- **Component Decomposition**: Keep screens as light orchestrators. Place UI primitives in `src/components/ui/` and feature-specific sub-components in their respective feature folders (`src/components/journal/`, etc.). Wrap sub-components in `React.memo()`.
- **Zustand Selectors**: Subscribe to store state using atomic selectors (e.g. `useAppStore((state) => state.selectedDate)`).
