# Changelog

All notable changes to the Daily Forge project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-08-03

### Added
- **Production Release**: Transformed codebase into a mobile-first Progressive Web Application (PWA).
- **Component Decomposition**: Decomposed all screen components into 20 modular sub-components across `journal`, `history`, `stats`, `export`, and `settings`.
- **Accessibility Hardening**: Replaced all clickable `<div>` elements with accessible `<button>` tags, added full ARIA attributes (`aria-label`, `aria-checked`, `aria-pressed`, `role="checkbox"`, `role="radio"`), and improved modal focus trapping.
- **Performance Optimizations**: Memoized sub-components using `React.memo()`, optimized list derivations using `useMemo()`, and implemented Zustand atomic store selectors.
- **Export & Import Hardening**: Added strict schema validation, duplicate entry detection, and version checking for JSON backup restore.
- **About & Documentation Section**: Added About section in Settings with software version details, and created complete project documentation (`USER_GUIDE.md`, `ARCHITECTURE.md`, `CONTRIBUTING.md`, `CHANGELOG.md`, `docs/`).

### Changed
- Removed unused `html2canvas` dependency and `src/App.css`.
- Removed dev-only `isMobileView` fake phone frame preview mode in favor of standard responsive layout.
- Simplified `ScratchpadWidget` into a quick note-taking widget for end users.

### Fixed
- Fixed timezone shift bugs in date formatting utilities.
- Fixed keyboard navigation and focus rings across all interactive cards and habit items.
