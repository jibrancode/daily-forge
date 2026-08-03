# Daily Forge — Component Library Index

## 1. UI Primitives (`src/components/ui/`)
- `Button.tsx`: Customizable button supporting 5 variants (`accent`, `secondary`, `outline`, `ghost`, `danger`) and 3 sizes (`sm`, `md`, `lg`).
- `Card.tsx`: Flexible card wrapper with `CardHeader`, `CardTitle`, `CardDescription`, and `CardContent`. Renders accessible `<button>` when `onClick` is supplied.
- `Input.tsx`: Form text inputs and resizable textareas (`TextArea`).
- `Modal.tsx`: Accessible dialog container with backdrop, focus trapping, `Escape` key close listener, and body scroll lock.
- `Toast.tsx`: Notification banner supporting `success`, `warning`, `error`, and `info` status types.
- `MoodSelector.tsx`: Accessible 5-point mood radio group selector.
- `HabitCheckbox.tsx`: Accessible habit toggle button card.
- `TaskCard.tsx`: Task item card with completion toggle and deletion action.
- `Screen.tsx`: Section layout wrapper with `ScreenHeader` and `ScreenContent`.
- `ScratchpadWidget.tsx`: Quick local note scratchpad widget.

---

## 2. Feature Sub-Components

### Journal (`src/components/journal/`)
- `JournalHeader`: Date picker and header banner.
- `MoodSection`: Mood rating selector card.
- `HabitSection`: Daily habit checklist & custom habit input.
- `TaskSection`: Task checklist & task creation input.
- `ReflectionSection`: 4 structured reflection prompt textareas.
- `NotesSection`: Freeform journal notes textarea.
- `JournalFooter`: Sticky save and delete action bar.

### History (`src/components/history/`)
- `CalendarView`: Month navigation & calendar grid.
- `TimelineView`: Vertical list of past entries.
- `FilterBar`: Text search input and mood filter pills.
- `ReflectionModal`: Entry view, edit, and delete popup.

### Statistics (`src/components/stats/`)
- `StatisticsCards`: Summary metric cards (Streaks, Completion rates).
- `MoodChart`: Recharts AreaChart for mood score timeline.
- `TrendChart`: Recharts PieChart for mood distribution.
- `HabitChart`: Recharts BarChart for habit success rates.

### Export (`src/components/export/`)
- `ExportCard`: PDF, Word (DOCX), and Plain Text document export action cards.
- `BackupCard`: JSON backup download card.
- `ImportCard`: JSON backup restore upload card.

### Settings (`src/components/settings/`)
- `ThemeSection`: Dark vs Light mode toggle.
- `AppearanceSection`: Accent color palette & typography scale selector.
- `AboutSection`: Software version & privacy information.
- `BackupSection`: Data management & clear data action.