import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { db } from '../../db/database';
import type { AccentColor, FontSize } from '../../types/journal';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { Toast } from '../ui/Toast';
import { ScratchpadWidget } from '../ui/ScratchpadWidget';
import { 
  Settings as SettingsIcon, 
  Sun, 
  Moon, 
  Palette, 
  Type, 
  Trash2, 
  Download, 
  ShieldCheck, 
  Check
} from 'lucide-react';

const ACCENT_OPTIONS: { id: AccentColor; label: string; bgClass: string; borderClass: string }[] = [
  { id: 'emerald', label: 'Emerald', bgClass: 'bg-emerald-500', borderClass: 'border-emerald-500' },
  { id: 'indigo', label: 'Indigo', bgClass: 'bg-indigo-500', borderClass: 'border-indigo-500' },
  { id: 'violet', label: 'Violet', bgClass: 'bg-purple-500', borderClass: 'border-purple-500' },
  { id: 'amber', label: 'Amber', bgClass: 'bg-amber-500', borderClass: 'border-amber-500' },
  { id: 'rose', label: 'Rose', bgClass: 'bg-rose-500', borderClass: 'border-rose-500' },
  { id: 'cyan', label: 'Cyan', bgClass: 'bg-cyan-500', borderClass: 'border-cyan-500' },
];

export const SettingsScreen: React.FC = () => {
  const { settings, updateSettings, setActiveTab } = useAppStore();

  const [isClearDataModalOpen, setIsClearDataModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isToastOpen, setIsToastOpen] = useState(false);

  const handleAccentChange = (color: AccentColor) => {
    updateSettings({ accentColor: color });
    showToast(`Accent color updated to ${color}! ✨`);
  };

  const handleFontSizeChange = (size: FontSize) => {
    updateSettings({ fontSize: size });
    showToast(`Font size updated to ${size.toUpperCase()}!`);
  };

  const handleClearAllData = async () => {
    try {
      await db.journalEntries.clear();
      setIsClearDataModalOpen(false);
      showToast('All journal entries have been cleared from local storage.');
    } catch (err) {
      console.error(err);
      showToast('Failed to clear data.', 'error');
    }
  };

  const showToast = (msg: string, _type: 'success' | 'error' = 'success') => {
    setToastMessage(msg);
    setIsToastOpen(true);
  };

  return (
    <div className="screen-enter mx-auto max-w-4xl space-y-8">
      <Toast
        isOpen={isToastOpen}
        onClose={() => setIsToastOpen(false)}
        message={toastMessage}
        type="success"
      />

      {/* Header Banner */}
      <Card className="accent-bg-soft accent-border border">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-md bg-[var(--bg-card)] border border-[var(--border-color)] text-xs font-bold accent-text">
              <SettingsIcon className="w-3.5 h-3.5" />
              <span>Personalization & Layout</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
              App Settings & Preferences
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              Customize theme mode, accent colors, font scaling, mobile view preview, and data management.
            </p>
          </div>

          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-xs font-bold accent-text">
            <ShieldCheck className="w-4 h-4" />
            <span>Settings Saved Locally</span>
          </div>
        </div>
      </Card>

      {/* Embedded Scratchpad & Progress Tracker Widget */}
      <ScratchpadWidget />

      {/* Appearance Customization (Theme, Accent, Font Size) */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Palette className="w-5 h-5 accent-text" />
              <span>Appearance & Color Themes</span>
            </CardTitle>
            <CardDescription>Tailor the visual style of Daily Forge to your liking</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Theme Switcher (Dark vs Light) */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
              Theme Mode
            </span>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => updateSettings({ theme: 'dark' })}
                className={`flex items-center justify-center space-x-3 p-4 rounded-2xl border transition-all ${
                  settings.theme === 'dark'
                    ? 'accent-bg-soft accent-border border-2 font-bold shadow-md'
                    : 'bg-[var(--bg-subtle)] border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Moon className="w-5 h-5 text-indigo-400" />
                <span>Dark Mode</span>
              </button>

              <button
                type="button"
                onClick={() => updateSettings({ theme: 'light' })}
                className={`flex items-center justify-center space-x-3 p-4 rounded-2xl border transition-all ${
                  settings.theme === 'light'
                    ? 'accent-bg-soft accent-border border-2 font-bold shadow-md'
                    : 'bg-[var(--bg-subtle)] border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Sun className="w-5 h-5 text-amber-400" />
                <span>Light Mode</span>
              </button>
            </div>
          </div>

          {/* Accent Color Palette Selector */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
              Accent Color Palette
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {ACCENT_OPTIONS.map((opt) => {
                const isSelected = settings.accentColor === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleAccentChange(opt.id)}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${
                      isSelected
                        ? 'accent-bg-soft accent-border border-2 scale-105 shadow-md font-bold'
                        : 'bg-[var(--bg-subtle)] border-[var(--border-color)] hover:border-[var(--accent-border)]'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-xl ${opt.bgClass} flex items-center justify-center text-white mb-1 shadow-sm`}>
                      {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                    </div>
                    <span className="text-xs">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Font Size Scaling */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
              Typography & Font Sizing
            </span>
            <div className="grid grid-cols-3 gap-3">
              {(['sm', 'md', 'lg'] as FontSize[]).map((size) => {
                const isSelected = settings.fontSize === size;
                const labels: Record<FontSize, string> = { sm: 'Small (14px)', md: 'Medium (16px)', lg: 'Large (18px)' };
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handleFontSizeChange(size)}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      isSelected
                        ? 'btn-accent text-white font-bold shadow-md'
                        : 'bg-[var(--bg-subtle)] border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <Type className="w-4 h-4 mx-auto mb-1 opacity-70" />
                    <span className="text-xs">{labels[size]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Management & Danger Zone */}
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
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-rose-500/20 bg-[var(--bg-card)]">
            <div>
              <h4 className="text-sm font-bold text-[var(--text-primary)]">Export Backup Before Changes</h4>
              <p className="text-xs text-[var(--text-muted)]">Download a copy of your journal before performing data resets.</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              icon={<Download className="w-4 h-4" />}
              onClick={() => setActiveTab('export')}
            >
              Export Center
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-rose-500/30 bg-rose-500/10">
            <div>
              <h4 className="text-sm font-bold text-rose-400">Clear All Journal Entries</h4>
              <p className="text-xs text-rose-300/80">Permanently delete all reflections from IndexedDB storage.</p>
            </div>
            <Button
              variant="danger"
              size="sm"
              icon={<Trash2 className="w-4 h-4" />}
              onClick={() => setIsClearDataModalOpen(true)}
            >
              Clear All Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Clear Data Confirmation Modal */}
      <Modal
        isOpen={isClearDataModalOpen}
        onClose={() => setIsClearDataModalOpen(false)}
        title="Permanently Clear All Journal Data?"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsClearDataModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleClearAllData}>
              Yes, Clear Everything
            </Button>
          </>
        }
      >
        <div className="text-center py-4 space-y-3">
          <div className="w-16 h-16 rounded-3xl bg-rose-500/20 text-rose-400 border border-rose-500/40 flex items-center justify-center mx-auto">
            <Trash2 className="w-8 h-8" />
          </div>
          <h4 className="text-base font-bold text-[var(--text-primary)]">Are you absolutely sure?</h4>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
            This action will delete all journal entries and reset your streaks. This cannot be undone unless you have a JSON backup file.
          </p>
        </div>
      </Modal>
    </div>
  );
};
