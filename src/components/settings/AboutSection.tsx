import React, { memo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Flame, ShieldCheck, HardDrive, Cpu, Heart } from 'lucide-react';

export const AboutSection: React.FC = memo(() => {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle className="flex items-center space-x-2">
            <Flame className="w-5 h-5 accent-text" />
            <span>About Daily Forge</span>
          </CardTitle>
          <CardDescription>Version 1.0.0 â€” Production Release</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 text-xs sm:text-sm text-[var(--text-secondary)]">
        <p className="leading-relaxed">
          Daily Forge is a calm, intentional, offline-first journaling application designed for individuals seeking personal growth, consistency, and clarity.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-3 rounded-[var(--radius-md)] bg-[var(--bg-subtle)] border border-[var(--border-color)] space-y-1">
            <div className="flex items-center space-x-1.5 font-bold accent-text">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Offline-First</span>
            </div>
            <p className="text-[11px] text-[var(--text-muted)]">
              No cloud servers, accounts, or analytics tracking. Your entries never leave your device.
            </p>
          </div>

          <div className="p-3 rounded-[var(--radius-md)] bg-[var(--bg-subtle)] border border-[var(--border-color)] space-y-1">
            <div className="flex items-center space-x-1.5 font-bold text-amber-500">
              <HardDrive className="w-4 h-4" />
              <span>IndexedDB Storage</span>
            </div>
            <p className="text-[11px] text-[var(--text-muted)]">
              Powered by Dexie.js for instant local database queries and high-capacity storage.
            </p>
          </div>

          <div className="p-3 rounded-[var(--radius-md)] bg-[var(--bg-subtle)] border border-[var(--border-color)] space-y-1">
            <div className="flex items-center space-x-1.5 font-bold text-indigo-400">
              <Cpu className="w-4 h-4" />
              <span>Full Data Ownership</span>
            </div>
            <p className="text-[11px] text-[var(--text-muted)]">
              Export to PDF, Word (DOCX), TXT, or JSON backup at any time.
            </p>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between border-t border-[var(--border-color)] text-xs text-[var(--text-muted)]">
          <span>Crafted for clarity & consistency</span>
          <span className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" /> for daily reflection
          </span>
        </div>
      </CardContent>
    </Card>
  );
});

AboutSection.displayName = 'AboutSection';
