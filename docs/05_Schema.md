# Daily Forge — IndexedDB Schema Documentation

## 1. Database Definition (`DailyForgeDatabase`)
Extended from Dexie (`Dexie`). Version: `1`.

```ts
db.version(1).stores({
  journalEntries: '++id, &date, mood, createdAt',
  settings: '++id',
});
```

---

## 2. Table: `journalEntries`

| Field | Type | Indexed | Description |
|-------|------|---------|-------------|
| `id` | `number` | Primary Key (`++id`) | Auto-incrementing local ID |
| `date` | `string` | Unique Index (`&date`) | Local date in `YYYY-MM-DD` format |
| `mood` | `number` | Indexed (`mood`) | Rating from 1 (Terrible) to 5 (Great) |
| `habits` | `HabitItem[]` | No | Array of `{ id, name, completed }` objects |
| `tasks` | `TaskItem[]` | No | Array of `{ id, text, completed }` objects |
| `win` | `string` | No | Reflection prompt: Win of the Day |
| `lesson` | `string` | No | Reflection prompt: Key Lesson Learned |
| `improve` | `string` | No | Reflection prompt: Area for Improvement |
| `tomorrow` | `string` | No | Reflection prompt: Tomorrow's Focus |
| `notes` | `string` | No | Freeform journal notes |
| `createdAt` | `string` | Indexed (`createdAt`) | ISO 8601 creation timestamp |
| `updatedAt` | `string` | No | ISO 8601 last modified timestamp |

---

## 3. Table: `settings`

| Field | Type | Description |
|-------|------|-------------|
| `id` | `number` | Primary Key (`++id`) |
| `theme` | `'dark' \| 'light'` | Color mode theme setting |
| `accentColor` | `AccentColor` | Selected accent palette (`emerald`, `indigo`, `violet`, `amber`, `rose`, `cyan`) |
| `fontSize` | `'sm' \| 'md' \| 'lg'` | Global typography scale setting |
| `updatedAt` | `string` | ISO 8601 update timestamp |