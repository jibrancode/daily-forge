import React, { memo } from 'react';
import type { JournalEntry, MoodRating } from '../../types/journal';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { 
  Trophy, 
  Lightbulb, 
  Target, 
  Sparkles, 
  FileText, 
  Trash2, 
  Edit3 
} from 'lucide-react';
import { formatDisplayDate } from '../../utils/dateUtils';

const moodEmojiMap: Record<MoodRating, { emoji: string; label: string }> = {
  1: { emoji: '😖', label: 'Terrible' },
  2: { emoji: '🙁', label: 'Low' },
  3: { emoji: '😐', label: 'Okay' },
  4: { emoji: '🙂', label: 'Good' },
  5: { emoji: '🤩', label: 'Great' },
};

interface ReflectionModalProps {
  entry: JournalEntry | null;
  onClose: () => void;
  onDelete: (id?: number) => void;
  onEdit: (dateStr: string) => void;
}

export const ReflectionModal: React.FC<ReflectionModalProps> = memo(({
  entry,
  onClose,
  onDelete,
  onEdit,
}) => {
  if (!entry) return null;

  return (
    <Modal
      isOpen={!!entry}
      onClose={onClose}
      title={`Reflection — ${formatDisplayDate(entry.date, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}`}
      footer={
        <>
          <Button
            variant="danger"
            size="sm"
            icon={<Trash2 className="w-4 h-4" />}
            onClick={() => onDelete(entry.id)}
          >
            Delete
          </Button>

          <Button
            variant="accent"
            size="sm"
            icon={<Edit3 className="w-4 h-4" />}
            onClick={() => onEdit(entry.date)}
          >
            Edit Entry
          </Button>
        </>
      }
    >
      <div className="space-y-4 text-sm">
        <div className="flex items-center space-x-3 p-3 rounded-xl accent-bg-soft accent-border border">
          <span className="text-3xl">{moodEmojiMap[entry.mood]?.emoji}</span>
          <div>
            <span className="text-xs uppercase font-bold text-[var(--text-muted)]">Mood Level</span>
            <h4 className="text-base font-bold accent-text">{moodEmojiMap[entry.mood]?.label}</h4>
          </div>
        </div>

        {entry.win && (
          <div className="p-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-color)] space-y-1">
            <div className="flex items-center space-x-1.5 text-amber-500 font-bold text-xs uppercase">
              <Trophy className="w-4 h-4" />
              <span>Win of the Day</span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed">{entry.win}</p>
          </div>
        )}

        {entry.lesson && (
          <div className="p-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-color)] space-y-1">
            <div className="flex items-center space-x-1.5 text-indigo-400 font-bold text-xs uppercase">
              <Lightbulb className="w-4 h-4" />
              <span>Key Lesson</span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed">{entry.lesson}</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {entry.improve && (
            <div className="p-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-color)] space-y-1">
              <div className="flex items-center space-x-1.5 text-emerald-500 font-bold text-xs uppercase">
                <Target className="w-4 h-4" />
                <span>Improvement</span>
              </div>
              <p className="text-xs text-[var(--text-primary)]">{entry.improve}</p>
            </div>
          )}

          {entry.tomorrow && (
            <div className="p-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-color)] space-y-1">
              <div className="flex items-center space-x-1.5 text-purple-400 font-bold text-xs uppercase">
                <Sparkles className="w-4 h-4" />
                <span>Tomorrow's Focus</span>
              </div>
              <p className="text-xs text-[var(--text-primary)]">{entry.tomorrow}</p>
            </div>
          )}
        </div>

        {entry.notes && (
          <div className="p-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-color)] space-y-1">
            <div className="flex items-center space-x-1.5 accent-text font-bold text-xs uppercase">
              <FileText className="w-4 h-4" />
              <span>Journal Notes</span>
            </div>
            <p className="text-xs text-[var(--text-primary)] whitespace-pre-wrap">{entry.notes}</p>
          </div>
        )}
      </div>
    </Modal>
  );
});

ReflectionModal.displayName = 'ReflectionModal';
