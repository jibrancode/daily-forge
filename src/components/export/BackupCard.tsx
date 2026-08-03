import React, { memo } from 'react';
import { Button } from '../ui/Button';
import { Download, HardDrive } from 'lucide-react';

interface BackupCardProps {
  entriesCount: number;
  onExportJSON: () => void;
}

export const BackupCard: React.FC<BackupCardProps> = memo(({
  entriesCount,
  onExportJSON,
}) => {
  return (
    <div className="p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-color)] space-y-3">
      <div className="flex items-center space-x-2 text-sm font-bold text-[var(--text-primary)]">
        <HardDrive className="w-4 h-4 accent-text" />
        <span>Create Backup File</span>
      </div>
      <p className="text-xs text-[var(--text-muted)]">
        Saves all {entriesCount} reflections and user preferences to a portable <code className="text-xs">.json</code> file.
      </p>
      <Button
        variant="accent"
        size="sm"
        icon={<Download className="w-4 h-4" />}
        onClick={onExportJSON}
        className="w-full"
      >
        Download JSON Backup
      </Button>
    </div>
  );
});

BackupCard.displayName = 'BackupCard';
