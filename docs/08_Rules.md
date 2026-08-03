# Daily Forge — Architectural & Visual Guidelines

## 1. Visual Aesthetics Rules
- **No AI-generated dashboard tropes**: Avoid floating glassmorphism overlays on every element, neon glow borders, blue/purple gradient overload, or futuristic sci-fi UI elements.
- **Calm & Personal**: Design must resemble personal paper journals (Day One, Bear, Things 3).
- **Hero Content**: The user's reflections, wins, and habits must remain the focal point.
- **Color System**: Rely exclusively on CSS variable design tokens defined in `index.css`.

---

## 2. Codebase Conventions
- **No Clickable Divs**: Always use `<button type="button">` or `<a href>` for interactive elements.
- **Store Selectors**: Never destructure the store root `useAppStore()`. Use atomic selectors `useAppStore((state) => state.field)`.
- **Component Decomposition**: Screens must act as thin orchestrator components that compose sub-components from their dedicated directories.
- **Performance**: Every sub-component must be wrapped with `React.memo()`. Heavy computations must be wrapped in `useMemo()`.