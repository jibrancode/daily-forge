# Daily Forge — Design System Specifications

## 1. Color System & CSS Custom Properties

### Dark Mode (Default)
- `--bg-main`: `hsl(222 47% 6%)` (Deep slate background)
- `--bg-card`: `hsl(222 47% 10%)` (Surface card elevation)
- `--bg-subtle`: `hsl(222 47% 13%)` (Subtle input & badge background)
- `--text-primary`: `hsl(210 40% 98%)` (High-contrast primary text)
- `--text-secondary`: `hsl(215 20% 70%)` (Secondary supporting text)
- `--text-muted`: `hsl(215 16% 50%)` (Muted labels & captions)
- `--border-color`: `hsl(222 30% 18%)` (Subtle border dividers)

### Accent Palettes (6 Theme Colors)
1. **Emerald** (Default): `--accent-primary: #10b981`
2. **Indigo**: `--accent-primary: #6366f1`
3. **Violet**: `--accent-primary: #a855f7`
4. **Amber**: `--accent-primary: #f59e0b`
5. **Rose**: `--accent-primary: #f43f5e`
6. **Cyan**: `--accent-primary: #06b6d4`

---

## 2. Typography Hierarchy
- `type-h1`: 32px / 2rem, Font Weight 800, Tracking tight.
- `type-h2`: 24px / 1.5rem, Font Weight 700, Tracking tight.
- `type-h3`: 18px / 1.125rem, Font Weight 700.
- `type-body`: 14px-16px, Font Weight 400-500.
- `type-caption`: 12px, Font Weight 500, Muted text.

---

## 3. Border Radii & Elevation Tokens
- `--radius-sm`: `0.5rem` (8px)
- `--radius-md`: `0.75rem` (12px)
- `--radius-lg`: `1rem` (16px)
- `--radius-xl`: `1.5rem` (24px)
- `--shadow-sm`: `0 1px 2px 0 rgb(0 0 0 / 0.05)`
- `--shadow-md`: `0 4px 6px -1px rgb(0 0 0 / 0.1)`
- `--shadow-lg`: `0 10px 15px -3px rgb(0 0 0 / 0.1)`