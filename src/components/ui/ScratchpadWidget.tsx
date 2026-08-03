import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './Card';
import { TextArea } from './Input';
import { Button } from './Button';
import { Edit3, Save, Sparkles } from 'lucide-react';

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

  return (
    <Card className="border border-[var(--accent-border)] accent-bg-soft">
      <CardHeader>
        <div>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-md bg-[var(--bg-card)] border border-[var(--border-color)] text-xs font-bold accent-text mb-1">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Quick Scratchpad</span>
          </div>
          <CardTitle>Scratchpad & Ideas</CardTitle>
          <CardDescription>Jot down quick thoughts, unformatted ideas, or reminder notes.</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
            <Edit3 className="w-4 h-4 accent-text" aria-hidden="true" />
            <span>Quick Note</span>
          </div>
          {isSaved && <span className="text-xs font-semibold text-emerald-400">Saved to browser storage!</span>}
        </div>

        <TextArea
          placeholder="Type any quick thoughts or temporary ideas here..."
          value={scratchText}
          onChange={(e) => setScratchText(e.target.value)}
          rows={4}
          className="text-xs"
          aria-label="Scratchpad note text"
        />

        <div className="flex justify-end">
          <Button
            variant="accent"
            size="sm"
            icon={<Save className="w-3.5 h-3.5" />}
            onClick={handleSaveScratchpad}
          >
            Save Scratchpad
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
