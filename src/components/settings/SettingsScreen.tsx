import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { db } from '../../db/database';
import type { AccentColor, FontSize } from '../../types/journal';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { Toast } from '../ui/Toast';
import { Settings as SettingsIcon, ShieldCheck, Trash2 } from 'lucide-react';

import { AppearanceSection } from './AppearanceSection';
import { BackupSection } from './BackupSection';
import { AboutSection } from './AboutSection';

export const SettingsScreen: React.FC = () => {
  const settings = useAppStore((state) => state.settings);
  const updateSettings = useAppStore((state) => state.updateSettings);
  const setActiveTab = useAppStore((state) => state.setActiveTab);

  const [isClearDataModalOpen, setIsClearDataModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isToastOpen, setIsToastOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setIsToastOpen(true);
  };

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
      showToast('Failed to clear data.');
    }
  };

  return (
    <div className="screen-enter w-full space-y-5">
      <Toast
        isOpen={isToastOpen}
        onClose={() => setIsToastOpen(false)}
        message={toastMessage}
        type="success"
      />

      <Card className="accent-bg-soft accent-border border">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-md bg-[var(--bg-card)] border border-[var(--border-color)] text-xs font-bold accent-text">
              <SettingsIcon className="w-3.5 h-3.5" />
              <span>Personalization & Layout</span>
            </div>
            <h2 className="type-h2 text-[var(--text-primary)]">
              App Settings & Preferences
            </h2>
            <p className="type-caption text-[var(--text-secondary)]">
              Customize theme mode, accent colors, font scaling, and data management.
            </p>
          </div>

          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-xs font-bold accent-text">
            <ShieldCheck className="w-4 h-4" />
            <span>Settings Saved Locally</span>
          </div>
        </div>
      </Card>

      <AppearanceSection
        currentTheme={settings.theme}
        onThemeChange={(theme) => updateSettings({ theme })}
        currentAccent={settings.accentColor}
        onAccentChange={handleAccentChange}
        currentFontSize={settings.fontSize}
        onFontSizeChange={handleFontSizeChange}
      />

      <AboutSection />

      <BackupSection
        onGoToExport={() => setActiveTab('export')}
        onOpenClearModal={() => setIsClearDataModalOpen(true)}
      />

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
