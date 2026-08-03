import React, { useState, useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { db } from '../../db/database';
import type { JournalEntry, MoodRating, HabitItem, TaskItem } from '../../types/journal';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input, TextArea } from '../ui/Input';
import { MoodSelector } from '../ui/MoodSelector';
import { HabitCheckbox } from '../ui/HabitCheckbox';
import { TaskCard } from '../ui/TaskCard';
import { Modal } from '../ui/Modal';
import { Toast } from '../ui/Toast';
import { 
  Calendar as CalendarIcon, 
  Save, 
  Plus, 
  Sparkles, 
  Trophy, 
  Lightbulb, 
  Target, 
  Flame, 
  Trash2,
  FileText
} from 'lucide-react';

import { formatLocalDate } from '../../utils/dateUtils';

const DEFAULT_HABITS: HabitItem[] = [
  { id: 'h-1', name: '30 Mins Deep Focus / Study', completed: false },
  { id: 'h-2', name: 'Workout / 30 Min Walk', completed: false },
  { id: 'h-3', name: 'Read 10 Pages of a Book', completed: false },
  { id: 'h-4', name: 'Hydration (2L Water)', completed: false },
  { id: 'h-5', name: 'No Junk Food / Healthy Eating', completed: false },
];

export const JournalScreen: React.FC = () => {
  const { selectedDate, setSelectedDate, setActiveTab } = useAppStore();

  const [entryId, setEntryId] = useState<number | undefined>(undefined);
  const [mood, setMood] = useState<MoodRating>(4);
  const [habits, setHabits] = useState<HabitItem[]>(DEFAULT_HABITS);
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [win, setWin] = useState('');
  const [lesson, setLesson] = useState('');
  const [improve, setImprove] = useState('');
  const [tomorrow, setTomorrow] = useState('');
  const [notes, setNotes] = useState('');

  const [newHabitName, setNewHabitName] = useState('');
  const [newTaskText, setNewTaskText] = useState('');

  const [toastMessage, setToastMessage] = useState('');
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load existing entry for selected date from Dexie
  useEffect(() => {
    let isMounted = true;

    async function loadEntry() {
      try {
        const existing = await db.journalEntries.where('date').equals(selectedDate).first();
        if (!isMounted) return;

        if (existing) {
          setEntryId(existing.id);
          setMood(existing.mood || 4);
          setHabits(existing.habits && existing.habits.length > 0 ? existing.habits : DEFAULT_HABITS);
          setTasks(existing.tasks || []);
          setWin(existing.win || '');
          setLesson(existing.lesson || '');
          setImprove(existing.improve || '');
          setTomorrow(existing.tomorrow || '');
          setNotes(existing.notes || '');
        } else {
          setEntryId(undefined);
          setMood(4);
          setHabits(DEFAULT_HABITS.map((h) => ({ ...h, completed: false })));
          setTasks([]);
          setWin('');
          setLesson('');
          setImprove('');
          setTomorrow('');
          setNotes('');
        }
      } catch (err) {
        console.error('Error loading entry:', err);
      }
    }

    loadEntry();
    return () => {
      isMounted = false;
    };
  }, [selectedDate]);

  // Handle Save Reflection
  const handleSaveEntry = async () => {
    setIsSaving(true);
    const now = new Date().toISOString();

    const entryData: JournalEntry = {
      date: selectedDate,
      mood,
      habits,
      tasks,
      win,
      lesson,
      improve,
      tomorrow,
      notes,
      createdAt: now,
      updatedAt: now,
    };

    try {
      if (entryId) {
        await db.journalEntries.update(entryId, { ...entryData, updatedAt: now });
      } else {
        const newId = await db.journalEntries.add(entryData);
        setEntryId(Number(newId));
      }

      setToastMessage('Reflection saved to local database! ✨');
      setIsToastOpen(true);
      setIsSuccessModalOpen(true);
    } catch (err) {
      console.error('Failed to save entry:', err);
      setToastMessage('Error saving entry to IndexedDB.');
      setIsToastOpen(true);
    } finally {
      setIsSaving(false);
    }
  };

  // Delete current entry
  const handleDeleteEntry = async () => {
    if (!entryId) return;
    if (window.confirm('Are you sure you want to delete this journal entry?')) {
      await db.journalEntries.delete(entryId);
      setEntryId(undefined);
      setWin('');
      setLesson('');
      setImprove('');
      setTomorrow('');
      setNotes('');
      setHabits(DEFAULT_HABITS.map((h) => ({ ...h, completed: false })));
      setTasks([]);
      setToastMessage('Journal entry deleted.');
      setIsToastOpen(true);
    }
  };

  // Toggle habit completion
  const handleToggleHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, completed: !h.completed } : h))
    );
  };

  // Add custom habit
  const handleAddCustomHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;
    const newHabit: HabitItem = {
      id: `h-custom-${Date.now()}`,
      name: newHabitName.trim(),
      completed: false,
    };
    setHabits((prev) => [...prev, newHabit]);
    setNewHabitName('');
  };

  // Toggle task completion
  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // Delete task
  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // Add task
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    const newTask: TaskItem = {
      id: `task-${Date.now()}`,
      text: newTaskText.trim(),
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
    setNewTaskText('');
  };

  const isToday = selectedDate === formatLocalDate();

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-4xl mx-auto">
      <Toast
        isOpen={isToastOpen}
        onClose={() => setIsToastOpen(false)}
        message={toastMessage}
        type="success"
      />

      {/* Date Header & Date Picker */}
      <Card className="accent-bg-soft accent-border border">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-md bg-[var(--bg-card)] border border-[var(--border-color)] text-xs font-bold accent-text">
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>{isToday ? "Today's Reflection" : 'Past Reflection'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
              Close My Day
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              Reflect on your mood, habits, wins, and key lessons for {selectedDate}.
            </p>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="font-medium text-xs sm:text-sm"
            />
          </div>
        </div>
      </Card>

      {/* Mood Selector Card */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle>1. How was your day?</CardTitle>
            <CardDescription>Select your overall mood for today</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <MoodSelector value={mood} onChange={setMood} />
        </CardContent>
      </Card>

      {/* Daily Habits Checklist */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle>2. Daily Habits Checklist</CardTitle>
            <CardDescription>Track daily consistency routines</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {habits.map((habit) => (
              <HabitCheckbox
                key={habit.id}
                habit={habit}
                onToggle={handleToggleHabit}
              />
            ))}
          </div>

          {/* Add Custom Habit Form */}
          <form onSubmit={handleAddCustomHabit} className="flex gap-2 pt-2">
            <Input
              placeholder="Add a custom habit..."
              value={newHabitName}
              onChange={(e) => setNewHabitName(e.target.value)}
              className="text-xs"
            />
            <Button variant="secondary" size="sm" type="submit" icon={<Plus className="w-4 h-4" />}>
              Add
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Daily Tasks */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle>3. Daily Tasks & Action Items</CardTitle>
            <CardDescription>Key tasks accomplished or set for today</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleAddTask} className="flex gap-2">
            <Input
              placeholder="Add a new task (Press Enter)..."
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
            />
            <Button variant="accent" type="submit" icon={<Plus className="w-4 h-4" />}>
              Add Task
            </Button>
          </form>

          {tasks.length === 0 ? (
            <p className="text-xs text-[var(--text-muted)] italic text-center py-2">
              No tasks added yet for this date.
            </p>
          ) : (
            <div className="space-y-2">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={handleToggleTask}
                  onDelete={handleDeleteTask}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reflection Prompts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Win of the Day */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <CardTitle>Win of the Day</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <TextArea
              placeholder="What went well today? What accomplishment are you proud of?"
              value={win}
              onChange={(e) => setWin(e.target.value)}
              rows={3}
            />
          </CardContent>
        </Card>

        {/* Lesson Learned */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Lightbulb className="w-5 h-5 text-indigo-400" />
              <CardTitle>Key Lesson Learned</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <TextArea
              placeholder="What insight, idea, or lesson did today teach you?"
              value={lesson}
              onChange={(e) => setLesson(e.target.value)}
              rows={3}
            />
          </CardContent>
        </Card>

        {/* Area for Improvement */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-emerald-500" />
              <CardTitle>Area for Improvement</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <TextArea
              placeholder="What could have gone better? How can you improve tomorrow?"
              value={improve}
              onChange={(e) => setImprove(e.target.value)}
              rows={3}
            />
          </CardContent>
        </Card>

        {/* Top Priority for Tomorrow */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <CardTitle>Tomorrow's Top Priority</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <TextArea
              placeholder="What is your #1 goal or focus for tomorrow?"
              value={tomorrow}
              onChange={(e) => setTomorrow(e.target.value)}
              rows={3}
            />
          </CardContent>
        </Card>
      </div>

      {/* Freeform Notes */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 accent-text" />
            <CardTitle>Freeform Journal Notes</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <TextArea
            placeholder="Write down any extra thoughts, ideas, or reflection for today..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={5}
          />
        </CardContent>
      </Card>

      {/* Bottom Save & Delete Actions Bar */}
      <div className="sticky bottom-16 z-30 glass-panel p-4 rounded-2xl border border-[var(--border-color)] flex items-center justify-between shadow-2xl">
        {entryId ? (
          <Button
            variant="danger"
            size="sm"
            icon={<Trash2 className="w-4 h-4" />}
            onClick={handleDeleteEntry}
          >
            Delete Entry
          </Button>
        ) : (
          <span className="text-xs text-[var(--text-muted)] italic">Drafting new entry</span>
        )}

        <Button
          variant="accent"
          size="lg"
          icon={<Save className="w-5 h-5" />}
          disabled={isSaving}
          onClick={handleSaveEntry}
        >
          {isSaving ? 'Saving...' : 'Close My Day & Save'}
        </Button>
      </div>

      {/* Completion Modal */}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Reflection Forged! 🔥"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsSuccessModalOpen(false)}>
              Keep Editing
            </Button>
            <Button
              variant="accent"
              onClick={() => {
                setIsSuccessModalOpen(false);
                setActiveTab('home');
              }}
            >
              Return Home
            </Button>
          </>
        }
      >
        <div className="text-center py-4 space-y-3">
          <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto animate-bounce">
            <Flame className="w-8 h-8 fill-current" />
          </div>
          <h4 className="text-lg font-bold text-[var(--text-primary)]">Day Successfully Closed</h4>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
            Your reflection for <strong>{selectedDate}</strong> has been saved safely into local device storage. Keep up the daily streak!
          </p>
        </div>
      </Modal>
    </div>
  );
};
