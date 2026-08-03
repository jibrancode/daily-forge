# Daily Forge — Architectural Decision Records (ADRs)

## ADR 001: Dexie.js for Local Data Persistence
- **Context**: The app must operate 100% offline without network requests or external databases.
- **Decision**: Adopt IndexedDB wrapped by Dexie.js (`dexie-react-hooks`).
- **Rationale**: IndexedDB offers high storage capacity (hundreds of MBs), asynchronous execution, and rich query indexes compared to 5MB localStorage constraints.

---

## ADR 002: Tailwind CSS v4 with Custom CSS Tokens
- **Context**: Need a responsive design system supporting dark/light modes and 6 accent color themes.
- **Decision**: Define CSS variables in `index.css` (`--bg-main`, `--accent-primary`) and compose with Tailwind CSS v4 utility classes.
- **Rationale**: Keeps styling light, avoid giant third-party UI framework bloat, and allows theme changes instantly by mutating root CSS variables.

---

## ADR 003: Zustand for Centralized UI State
- **Context**: Need lightweight state management for active tab navigation, selected date, and user settings.
- **Decision**: Use Zustand with atomic state selectors.
- **Rationale**: Provides zero boilerplate, no Context provider wrappers, and clean selector subscriptions.

---

## ADR 004: Pure Offline PDF & Word Generation
- **Context**: Export feature must work entirely offline without backend conversion APIs.
- **Decision**: Use `jspdf` for client-side PDF rendering and `docx` with `Packer.toBlob` for Microsoft Word documents.
- **Rationale**: Guarantees data privacy and allows offline document generation directly in the browser.