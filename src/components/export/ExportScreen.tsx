import React, { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../db/database';
import { useAppStore } from '../../store/useAppStore';
import { exportToTXT, exportToPDF, exportToDOCX, exportToJSON, importFromJSON } from '../../utils/exportUtils';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Toast } from '../ui/Toast';
import { Download, Database, ShieldCheck } from 'lucide-react';

import { ExportCard } from './ExportCard';
import { BackupCard } from './BackupCard';
import { ImportCard } from './ImportCard';

export const ExportScreen: React.FC = () => {
  const settings = useAppStore((state) => state.settings);

  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const entries = useLiveQuery(() => db.journalEntries.toArray(), []) || [];

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setIsToastOpen(true);
  };

  const handleExportTXT = () => {
    if (entries.length === 0) {
      showToast('No entries to export.', 'error');
      return;
    }
    exportToTXT(entries);
    showToast('Exported to TXT file!');
  };

  const handleExportPDF = () => {
    if (entries.length === 0) {
      showToast('No entries to export.', 'error');
      return;
    }
    exportToPDF(entries);
    showToast('Exported to PDF document!');
  };

  const handleExportDOCX = async () => {
    if (entries.length === 0) {
      showToast('No entries to export.', 'error');
      return;
    }
    setIsExporting(true);
    try {
      await exportToDOCX(entries);
      showToast('Exported to Word (.docx) document!');
    } catch (err) {
      console.error(err);
      showToast('Failed to generate DOCX document.', 'error');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportJSON = () => {
    if (entries.length === 0) {
      showToast('No entries to backup.', 'error');
      return;
    }
    exportToJSON(entries, settings);
    showToast('JSON Backup downloaded!');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      const result = await importFromJSON(content);
      if (result.success) {
        showToast(result.message, 'success');
      } else {
        showToast(result.message, 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="screen-enter w-full space-y-5">
      <Toast
        isOpen={isToastOpen}
        onClose={() => setIsToastOpen(false)}
        message={toastMessage}
        type={toastType}
      />

      <Card className="accent-bg-soft accent-border border">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="type-h2 text-[var(--text-primary)] flex items-center gap-2">
              <Download className="w-5 h-5 accent-text" />
              Data Ownership & Export
            </h2>
            <p className="type-caption text-[var(--text-secondary)]">
              Your journal data belongs 100% to you. Export to PDF, Word (DOCX), Plain Text, or raw JSON backup.
            </p>
          </div>

          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Private & Local</span>
          </div>
        </div>
      </Card>

      <ExportCard
        isExporting={isExporting}
        onExportPDF={handleExportPDF}
        onExportDOCX={handleExportDOCX}
        onExportTXT={handleExportTXT}
      />

      <Card className="border border-[var(--border-color)]">
        <CardHeader>
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Database className="w-5 h-5 accent-text" />
              <span>Full Data Backup & Import</span>
            </CardTitle>
            <CardDescription>
              Download a complete JSON snapshot of all journal entries & settings, or restore from a previous backup.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <BackupCard
              entriesCount={entries.length}
              onExportJSON={handleExportJSON}
            />
            <ImportCard
              onFileUpload={handleFileUpload}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
