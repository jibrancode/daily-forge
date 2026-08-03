import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './Card';
import { TextArea } from './Input';
import { Button } from './Button';
import { CheckCircle2, Edit3, Save, Sparkles, ListChecks } from 'lucide-react';

const PROJECT_PHASES = [
  { id: 1, name: 'Phase 1: Project Setup & Init', completed: true },
  { id: 2, name: 'Phase 2: Design System & Components', completed: true },
  { id: 3, name: 'Phase 3: Navigation & Splash Screen', completed: true },
  { id: 4, name: 'Phase 4: Home Screen Dashboard', completed: true },
  { id: 5, name: 'Phase 5: Journal Screen (Close My Day)', completed: true },
  { id: 6, name: 'Phase 6: Database Persistence Layer', completed: true },
  { id: 7, name: 'Phase 7: History & Calendar View', completed: true },
  { id: 8, name: 'Phase 8: Statistics & Analytics Dashboard', completed: true },
  { id: 9, name: 'Phase 9: Offline Export System (PDF, DOCX, TXT)', completed: true },
  { id: 10, name: 'Phase 10: Settings, Themes & Mobile View', completed: true },
  { id: 11, name: 'Phase 11: Testing & PWA Service Worker', completed: false },
  { id: 12, name: 'Phase 12: Capacitor Android APK Packaging', completed: false },
];

export const ScratchpadWidget: React.FC = () => {
  const [scratchText, setScratchText] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('daily_forge_scratchpad');
    if (saved) setScratchText(saved);
  }, []);

  const handleSaveScratchpad = () => {
    localStorage.setItem('daily_forge_scratchpad', scratchText);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const completedCount = PROJECT_PHASES.filter((p) => p.completed).length;
  const progressPercent = Math.round((completedCount / PROJECT_PHASES.length) * 100);

  return (
    <Card className="border border-[var(--accent-border)] accent-bg-soft space-y-6">
      <CardHeader>
        <div>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-md bg-[var(--bg-card)] border border-[var(--border-color)] text-xs font-bold accent-text mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Scratchpad & Tracker</span>
          </div>
          <CardTitle className="text-xl font-extrabold">Build Progress & Scratchpad</CardTitle>
          <CardDescription>View live phase completion and write scratchpad notes.</CardDescription>
        </div>

        {/* Progress Badge */}
        <div className="text-right">
          <span className="text-2xl font-black accent-text">{progressPercent}%</span>
          <p className="text-[11px] font-bold text-[var(--text-muted)] uppercase">Completed</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="w-full h-3 rounded-full bg-[var(--bg-subtle)] overflow-hidden border border-[var(--border-color)]">
            <div
              className="h-full btn-accent transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-[var(--text-muted)] font-medium">
            <span>{completedCount} of {PROJECT_PHASES.length} Phases Done</span>
            <span>{PROJECT_PHASES.length - completedCount} Remaining</span>
          </div>
        </div>

        {/* Grid: Phase checklist + Scratchpad textarea */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Phase Checklist */}
          <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
              <ListChecks className="w-4 h-4 accent-text" />
              <span>Project Roadmap Progress</span>
            </div>
            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {PROJECT_PHASES.map((phase) => (
                <div
                  key={phase.id}
                  className={`flex items-center justify-between p-2 rounded-lg text-xs font-medium border transition-colors ${
                    phase.completed
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                      : 'bg-[var(--bg-subtle)] border-[var(--border-color)] text-[var(--text-muted)]'
                  }`}
                >
                  <span className="line-clamp-1">{phase.name}</span>
                  {phase.completed ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 ml-2" />
                  ) : (
                    <div className="w-3 h-3 rounded-full border border-[var(--border-color)] flex-shrink-0 ml-2" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Scratchpad Note Area */}
          <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                <Edit3 className="w-4 h-4 accent-text" />
                <span>Scratchpad Notes</span>
              </div>
              {isSaved && <span className="text-xs text-emerald-400 font-semibold animate-in fade-in">Saved!</span>}
            </div>

            <TextArea
              placeholder="Write down any quick ideas, scratch thoughts, or tasks..."
              value={scratchText}
              onChange={(e) => setScratchText(e.target.value)}
              rows={5}
              className="text-xs"
            />

            <Button
              variant="accent"
              size="sm"
              icon={<Save className="w-3.5 h-3.5" />}
              onClick={handleSaveScratchpad}
            >
              Save Scratchpad
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
