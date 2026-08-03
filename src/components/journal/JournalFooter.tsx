import React, { memo } from 'react';
import { Button } from '../ui/Button';
import { Save, Trash2 } from 'lucide-react';

interface JournalFooterProps {
  hasEntryId: boolean;
  isSaving: boolean;
  onSave: () => void;
  onDelete: () => void;
}

export const JournalFooter: React.FC<JournalFooterProps> = memo(({
  hasEntryId,
  isSaving,
  onSave,
  onDelete,
}) => {
  return (
    <div className="sticky bottom-16 z-30 glass-panel p-4 rounded-2xl border border-[var(--border-color)] flex items-center justify-between shadow-2xl">
      {hasEntryId ? (
        <Button
          variant="danger"
          size="sm"
          icon={<Trash2 className="w-4 h-4" />}
          onClick={onDelete}
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
        onClick={onSave}
      >
        {isSaving ? 'Saving...' : 'Close My Day & Save'}
      </Button>
    </div>
  );
});

JournalFooter.displayName = 'JournalFooter';
