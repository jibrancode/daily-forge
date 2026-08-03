import React, { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../db/database';
import { useAppStore } from '../../store/useAppStore';
import { exportToTXT, exportToPDF, exportToDOCX, exportToJSON, importFromJSON } from '../../utils/exportUtils';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Toast } from '../ui/Toast';
import { 
  Download, 
  FileText, 
  FileType, 
  FileCode, 
  Database, 
  Upload, 
  ShieldCheck, 
  HardDrive 
} from 'lucide-react';

export const ExportScreen: React.FC = () => {
  const { settings } = useAppStore();

  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Live query from Dexie IndexedDB
  const entries = useLiveQuery(() => db.journalEntries.toArray(), []) || [];

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
    e.target.value = ''; // reset file input
  };

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setIsToastOpen(true);
  };

  return (
    <div className="screen-enter mx-auto max-w-4xl space-y-6">
      <Toast
        isOpen={isToastOpen}
        onClose={() => setIsToastOpen(false)}
        message={toastMessage}
        type={toastType}
      />

      {/* Header Banner */}
      <Card className="accent-bg-soft accent-border border">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-md bg-[var(--bg-card)] border border-[var(--border-color)] text-xs font-bold accent-text">
              <Download className="w-3.5 h-3.5" />
              <span>Offline Export & Data Backup</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
              Data Ownership & Export
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              Your journal data belongs 100% to you. Export to PDF, Word (DOCX), Plain Text, or raw JSON backup.
            </p>
          </div>

          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Private & Local</span>
          </div>
        </div>
      </Card>

      {/* Document Exporters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* PDF Export Card */}
        <Card hoverable className="flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center border border-rose-500/20">
              <FileType className="w-6 h-6" />
            </div>
            <CardTitle>PDF Document</CardTitle>
            <CardDescription>
              Export a clean, formatted PDF version of your journal entries for printing or archiving.
            </CardDescription>
          </div>

          <Button
            variant="accent"
            size="md"
            icon={<Download className="w-4 h-4" />}
            onClick={handleExportPDF}
            className="w-full"
          >
            Export PDF
          </Button>
        </Card>

        {/* Word (.docx) Export Card */}
        <Card hoverable className="flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
              <FileCode className="w-6 h-6" />
            </div>
            <CardTitle>Word Document (.docx)</CardTitle>
            <CardDescription>
              Export editable Microsoft Word .docx files structured by date and headings.
            </CardDescription>
          </div>

          <Button
            variant="secondary"
            size="md"
            icon={<Download className="w-4 h-4" />}
            disabled={isExporting}
            onClick={handleExportDOCX}
            className="w-full"
          >
            {isExporting ? 'Generating...' : 'Export DOCX'}
          </Button>
        </Card>

        {/* Plain Text (.txt) Export Card */}
        <Card hoverable className="flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
              <FileText className="w-6 h-6" />
            </div>
            <CardTitle>Plain Text (.txt)</CardTitle>
            <CardDescription>
              Lightweight plain text export suitable for reading in any text editor or note app.
            </CardDescription>
          </div>

          <Button
            variant="outline"
            size="md"
            icon={<Download className="w-4 h-4" />}
            onClick={handleExportTXT}
            className="w-full"
          >
            Export TXT
          </Button>
        </Card>
      </div>

      {/* JSON Backup & Restore System */}
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
            {/* Backup JSON */}
            <div className="p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-color)] space-y-3">
              <div className="flex items-center space-x-2 text-sm font-bold text-[var(--text-primary)]">
                <HardDrive className="w-4 h-4 accent-text" />
                <span>Create Backup File</span>
              </div>
              <p className="text-xs text-[var(--text-muted)]">
                Saves all {entries.length} reflections and user preferences to a portable <code className="text-xs">.json</code> file.
              </p>
              <Button
                variant="accent"
                size="sm"
                icon={<Download className="w-4 h-4" />}
                onClick={handleExportJSON}
                className="w-full"
              >
                Download JSON Backup
              </Button>
            </div>

            {/* Restore JSON */}
            <div className="p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-color)] space-y-3">
              <div className="flex items-center space-x-2 text-sm font-bold text-[var(--text-primary)]">
                <Upload className="w-4 h-4 text-amber-500" />
                <span>Restore Backup File</span>
              </div>
              <p className="text-xs text-[var(--text-muted)]">
                Import a previously saved <code className="text-xs">.json</code> backup into IndexedDB without overwriting unrelated data.
              </p>

              <label className="block w-full">
                <span className="sr-only">Choose backup file</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="block w-full text-xs text-[var(--text-muted)] file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:btn-accent file:text-white hover:file:cursor-pointer"
                />
              </label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
