import React, { useState, memo } from 'react';
import type { HabitItem } from '../../types/journal';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { HabitCheckbox } from '../ui/HabitCheckbox';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Plus } from 'lucide-react';

interface HabitSectionProps {
  habits: HabitItem[];
  onToggleHabit: (id: string) => void;
  onAddHabit: (name: string) => void;
}

export const HabitSection: React.FC<HabitSectionProps> = memo(({
  habits,
  onToggleHabit,
  onAddHabit,
}) => {
  const [newHabitName, setNewHabitName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;
    onAddHabit(newHabitName.trim());
    setNewHabitName('');
  };

  return (
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
              onToggle={onToggleHabit}
            />
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2 pt-2">
          <Input
            placeholder="Add a custom habit..."
            value={newHabitName}
            onChange={(e) => setNewHabitName(e.target.value)}
            className="text-xs"
            aria-label="New habit name"
          />
          <Button variant="secondary" size="sm" type="submit" icon={<Plus className="w-4 h-4" />}>
            Add
          </Button>
        </form>
      </CardContent>
    </Card>
  );
});

HabitSection.displayName = 'HabitSection';
