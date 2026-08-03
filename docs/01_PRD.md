# Daily Forge — Product Requirements Document (PRD)

## 1. Executive Summary
**Daily Forge** is a premium, offline-first daily journaling and reflection application built for mobile and desktop web browsers. It empowers professionals, students, developers, and self-improvement enthusiasts to cultivate self-awareness, track habits, and forge daily consistency through private, distraction-free reflections.

---

## 2. Product Vision & Core Values
- **Privacy First**: Zero telemetry, zero cloud tracking, zero account sign-ups. Your reflections remain 100% on your device.
- **Calmness & Focus**: A clutter-free, intentional visual aesthetic inspired by Day One, Bear, and Things 3.
- **Speed & Ownership**: Instant load times, offline capability via Progressive Web App (PWA) technologies, and full data export capabilities (PDF, DOCX, TXT, JSON).

---

## 3. Key Feature Modules

### 3.1 Home Dashboard
- Morning/afternoon/evening personalized greeting with today's date.
- Motivational daily quote rotated by day-of-year.
- Streak counters (Current Streak & Best Streak).
- Today's Journal status card with one-tap entry creation or editing.
- Quick habit toggle tracker for today's active habits.
- Recent 3 reflection entries preview.

### 3.2 Journal Screen ("Close My Day")
- Date selector (defaults to current date).
- 5-point Mood Rating selector with rich visual feedback.
- Habits Checklist with customizable habit additions.
- Task / Action Item checklist with add & delete capabilities.
- 4 Structured Reflection Prompts:
  1. Win of the Day
  2. Key Lesson Learned
  3. Area for Improvement
  4. Tomorrow's Top Priority
- Freeform Journal Notes textarea.
- Sticky action footer bar with Save and Delete actions.

### 3.3 History & Archives
- Dual view modes: **Calendar Grid** and **Timeline Feed**.
- Interactive month-by-month calendar navigation with mood badges on day cells.
- Real-time search query filtering across wins, lessons, and notes.
- Mood filter pills (All, Great, Good, Okay, Low, Terrible).
- Detail modal popup for reviewing, editing, or deleting past entries.

### 3.4 Statistics & Analytics
- Key metrics: Current Streak, Best Streak, Habit Completion Rate %, Task Completion Rate %.
- Interactive Mood Trend Timeline (recharts AreaChart).
- Mood Score Percentage Distribution (recharts PieChart).
- Habit Success Rate comparison bar chart (recharts BarChart).
- Flexible time range filter (7 Days, 30 Days, All Time).

### 3.5 Offline Export & Backup
- Document export: PDF (formatted text), Word (.docx), Plain Text (.txt).
- Portable JSON snapshot backup creation.
- Strict schema-validated JSON backup restore into IndexedDB.

### 3.6 Settings & Personalization
- Dark Mode / Light Mode toggle.
- 6 Curated Accent Color Themes (Emerald, Indigo, Violet, Amber, Rose, Cyan).
- Typography scaling (Small, Medium, Large font sizes).
- Local storage data management & emergency reset.
- About section detailing software version and privacy guarantee.

---

## 4. Non-Goals
- No cloud account login or social sharing features.
- No third-party analytics or advertisement integration.
- No public web hosting of personal entries.