import React, { memo } from 'react';
import { Button } from '../ui/Button';
import { Trash2 } from 'lucide-react';

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
    <div className="sticky bottom-0 z-30 flex flex-col gap-3 border-t border-[var(--border-color)] bg-[var(--bg-main)]/90 backdrop-blur-md pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-4 px-4 -mx-4 sm:flex-row sm:items-center sm:justify-between sm:mx-0 sm:px-0 sm:bg-transparent sm:backdrop-blur-none sm:border-none">
      {hasEntryId && (
        <Button
          variant="danger"
          size="sm"
          icon={<Trash2 className="w-4 h-4" />}
          onClick={onDelete}
          className="w-full sm:w-auto order-2 sm:order-1"
        >
          Delete Entry
        </Button>
      )}

      <Button
        variant="accent"
        size="lg"
        disabled={isSaving}
        onClick={onSave}
        className="w-full sm:w-auto order-1 sm:order-2"
      >
        {isSaving ? 'Saving...' : 'Save Entry'}
      </Button>
    </div>
  );
});

JournalFooter.displayName = 'JournalFooter';
