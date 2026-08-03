import React, { memo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Trash2, Download } from 'lucide-react';

interface BackupSectionProps {
  onGoToExport: () => void;
  onOpenClearModal: () => void;
}

export const BackupSection: React.FC<BackupSectionProps> = memo(({
  onGoToExport,
  onOpenClearModal,
}) => {
  return (
    <Card className="border-rose-500/30 bg-rose-500/5">
      <CardHeader>
        <div>
          <CardTitle className="text-rose-500 flex items-center space-x-2">
            <Trash2 className="w-5 h-5 text-rose-500" />
            <span>Data Management & Privacy</span>
          </CardTitle>
          <CardDescription>Manage local device data storage</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-start justify-between gap-3 rounded-[var(--radius-md)] border border-rose-500/20 bg-[var(--bg-card)] p-3.5 sm:flex-row sm:items-center">
          <div>
            <h4 className="text-sm font-bold text-[var(--text-primary)]">Export Backup Before Changes</h4>
            <p className="text-xs text-[var(--text-muted)]">Download a copy of your journal before performing data resets.</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            icon={<Download className="w-4 h-4" />}
            onClick={onGoToExport}
          >
            Export Center
          </Button>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 rounded-[var(--radius-md)] border border-rose-500/30 bg-rose-500/10 p-3.5 sm:flex-row sm:items-center">
          <div>
            <h4 className="text-sm font-bold text-rose-400">Clear All Journal Entries</h4>
            <p className="text-xs text-rose-300/80">Permanently delete all reflections from IndexedDB storage.</p>
          </div>
          <Button
            variant="danger"
            size="sm"
            icon={<Trash2 className="w-4 h-4" />}
            onClick={onOpenClearModal}
          >
            Clear All Data
          </Button>
        </div>
      </CardContent>
    </Card>
  );
});

BackupSection.displayName = 'BackupSection';
