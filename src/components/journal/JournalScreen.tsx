import React, { useState, useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { db } from '../../db/database';
import type { JournalEntry, MoodRating, HabitItem, TaskItem } from '../../types/journal';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { Toast } from '../ui/Toast';
import { Flame } from 'lucide-react';

import { JournalHeader } from './JournalHeader';
import { MoodSection } from './MoodSection';
import { HabitSection } from './HabitSection';
import { TaskSection } from './TaskSection';
import { ReflectionSection } from './ReflectionSection';
import { NotesSection } from './NotesSection';
import { JournalFooter } from './JournalFooter';

const DEFAULT_HABITS: HabitItem[] = [
  { id: 'h-1', name: '30 Mins Deep Focus / Study', completed: false },
  { id: 'h-2', name: 'Workout / 30 Min Walk', completed: false },
  { id: 'h-3', name: 'Read 10 Pages of a Book', completed: false },
  { id: 'h-4', name: 'Hydration (2L Water)', completed: false },
  { id: 'h-5', name: 'No Junk Food / Healthy Eating', completed: false },
];

export const JournalScreen: React.FC = () => {
  const selectedDate = useAppStore((state) => state.selectedDate);
  const setSelectedDate = useAppStore((state) => state.setSelectedDate);
  const setActiveTab = useAppStore((state) => state.setActiveTab);

  const [entryId, setEntryId] = useState<number | undefined>(undefined);
  const [mood, setMood] = useState<MoodRating>(4);
  const [habits, setHabits] = useState<HabitItem[]>(DEFAULT_HABITS);
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [win, setWin] = useState('');
  const [lesson, setLesson] = useState('');
  const [improve, setImprove] = useState('');
  const [tomorrow, setTomorrow] = useState('');
  const [notes, setNotes] = useState('');

  const [toastMessage, setToastMessage] = useState('');
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

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

  const handleToggleHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, completed: !h.completed } : h))
    );
  };

  const handleAddCustomHabit = (name: string) => {
    const newHabit: HabitItem = {
      id: `h-custom-${Date.now()}`,
      name,
      completed: false,
    };
    setHabits((prev) => [...prev, newHabit]);
  };

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAddTask = (text: string) => {
    const newTask: TaskItem = {
      id: `task-${Date.now()}`,
      text,
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  return (
    <div className="screen-enter w-full space-y-5">
      <Toast
        isOpen={isToastOpen}
        onClose={() => setIsToastOpen(false)}
        message={toastMessage}
        type="success"
      />

      <JournalHeader
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />

      <MoodSection
        mood={mood}
        onChange={setMood}
      />

      <HabitSection
        habits={habits}
        onToggleHabit={handleToggleHabit}
        onAddHabit={handleAddCustomHabit}
      />

      <TaskSection
        tasks={tasks}
        onToggleTask={handleToggleTask}
        onDeleteTask={handleDeleteTask}
        onAddTask={handleAddTask}
      />

      <ReflectionSection
        win={win}
        setWin={setWin}
        lesson={lesson}
        setLesson={setLesson}
        improve={improve}
        setImprove={setImprove}
        tomorrow={tomorrow}
        setTomorrow={setTomorrow}
      />

      <NotesSection
        notes={notes}
        setNotes={setNotes}
      />

      <JournalFooter
        hasEntryId={!!entryId}
        isSaving={isSaving}
        onSave={handleSaveEntry}
        onDelete={handleDeleteEntry}
      />

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
