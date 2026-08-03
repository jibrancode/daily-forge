import React, { useState, memo } from 'react';
import type { TaskItem } from '../../types/journal';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { TaskCard } from '../ui/TaskCard';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Plus } from 'lucide-react';

interface TaskSectionProps {
  tasks: TaskItem[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onAddTask: (text: string) => void;
}

export const TaskSection: React.FC<TaskSectionProps> = memo(({
  tasks,
  onToggleTask,
  onDeleteTask,
  onAddTask,
}) => {
  const [newTaskText, setNewTaskText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    onAddTask(newTaskText.trim());
    setNewTaskText('');
  };

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>3. Daily Tasks & Action Items</CardTitle>
          <CardDescription>Key tasks accomplished or set for today</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            placeholder="Add a new task (Press Enter)..."
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            aria-label="New task description"
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
                onToggle={onToggleTask}
                onDelete={onDeleteTask}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
});

TaskSection.displayName = 'TaskSection';
