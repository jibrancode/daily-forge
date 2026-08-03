# Daily Forge — Application Flow & User Journeys

## 1. Primary User Journey: Daily Reflection ("Close My Day")
1. User opens Daily Forge PWA (or web app).
2. SplashScreen displays branding animation (runs once per session).
3. HomeScreen loads displaying streak count, today's greeting, and daily quote.
4. User clicks **"Forge Today's Entry"** CTA button.
5. App navigates to **JournalScreen** with `selectedDate` set to local date `YYYY-MM-DD`.
6. User rates mood (1-5), checks off completed habits, checks/adds tasks, fills reflection prompts (win, lesson, improvement, tomorrow's focus), and adds optional notes.
7. User clicks **"Close My Day & Save"**.
8. Entry is written to IndexedDB, toast notification fires, and success modal prompts return to HomeScreen.

---

## 2. Secondary Journeys

### 2.1 History & Archive Review
- Navigating to **History tab** defaults to Calendar Grid mode.
- Days with logged reflections display mood emoji icons. Clicking a filled day opens `ReflectionModal`. Clicking an empty day navigates to JournalScreen for that date.
- Switching to **Timeline Feed** enables real-time text searching and mood pill filtering.

### 2.2 Analytics Inspection
- Navigating to **Stats tab** renders KPI cards (Streaks, Completion Rates).
- Time range selector toggles charts between 7 Days, 30 Days, and All Time.

### 2.3 Data Migration & Export
- Navigating to **Export tab** allows one-click downloading of PDF, Word (DOCX), TXT, or JSON backup files.
- Users can upload JSON backups to restore historical entries onto new devices.