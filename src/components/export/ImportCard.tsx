import React, { memo } from 'react';
import { Upload } from 'lucide-react';

interface ImportCardProps {
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImportCard: React.FC<ImportCardProps> = memo(({ onFileUpload }) => {
  return (
    <div className="space-y-3 rounded-[var(--radius-md)] border border-[var(--border-color)] bg-[var(--bg-subtle)] p-3.5">
      <div className="flex items-center space-x-2 text-sm font-bold text-[var(--text-primary)]">
        <Upload className="w-4 h-4 text-amber-500" />
        <span>Restore Backup File</span>
      </div>
      <p className="text-xs text-[var(--text-muted)]">
        Import a previously saved <code className="text-xs">.json</code> backup into IndexedDB without overwriting unrelated data.
      </p>

      <label className="block w-full cursor-pointer">
        <span className="sr-only">Choose backup file</span>
        <input
          type="file"
          accept=".json"
          onChange={onFileUpload}
          className="focus-ring block w-full text-xs text-[var(--text-muted)] file:mr-3 file:py-1.5 file:px-3 file:rounded-[var(--radius-md)] file:border-0 file:text-xs file:font-semibold file:btn-accent file:text-white hover:file:cursor-pointer"
        />
      </label>
    </div>
  );
});

ImportCard.displayName = 'ImportCard';
