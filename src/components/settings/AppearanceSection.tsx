import React, { memo } from 'react';
import type { AccentColor, FontSize } from '../../types/journal';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { ThemeSection } from './ThemeSection';
import { Palette, Type, Check } from 'lucide-react';

const ACCENT_OPTIONS: { id: AccentColor; label: string; bgClass: string }[] = [
  { id: 'emerald', label: 'Emerald', bgClass: 'bg-emerald-500' },
  { id: 'indigo', label: 'Indigo', bgClass: 'bg-indigo-500' },
  { id: 'violet', label: 'Violet', bgClass: 'bg-purple-500' },
  { id: 'amber', label: 'Amber', bgClass: 'bg-amber-500' },
  { id: 'rose', label: 'Rose', bgClass: 'bg-rose-500' },
  { id: 'cyan', label: 'Cyan', bgClass: 'bg-cyan-500' },
];

interface AppearanceSectionProps {
  currentTheme: 'dark' | 'light';
  onThemeChange: (theme: 'dark' | 'light') => void;
  currentAccent: AccentColor;
  onAccentChange: (accent: AccentColor) => void;
  currentFontSize: FontSize;
  onFontSizeChange: (size: FontSize) => void;
}

export const AppearanceSection: React.FC<AppearanceSectionProps> = memo(({
  currentTheme,
  onThemeChange,
  currentAccent,
  onAccentChange,
  currentFontSize,
  onFontSizeChange,
}) => {
  return (
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
      <CardContent className="space-y-5">
        <ThemeSection
          currentTheme={currentTheme}
          onThemeChange={onThemeChange}
        />

        {/* Accent Color Palette Selector */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-normal text-[var(--text-secondary)]">
            Accent Color Palette
          </span>
          <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-6" role="radiogroup" aria-label="Accent color palette">
            {ACCENT_OPTIONS.map((opt) => {
              const isSelected = currentAccent === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onAccentChange(opt.id)}
                  className={`focus-ring flex min-h-16 flex-col items-center justify-center rounded-[var(--radius-md)] border p-2.5 transition-all ${
                    isSelected
                      ? 'accent-bg-soft accent-border border-2 shadow-[var(--shadow-sm)] font-bold'
                      : 'bg-[var(--bg-subtle)] border-[var(--border-color)] hover:border-[var(--accent-border)]'
                  }`}
                  role="radio"
                  aria-checked={isSelected}
                  aria-label={`Accent color ${opt.label}`}
                >
                  <div className={`w-7 h-7 rounded-[var(--radius-md)] ${opt.bgClass} flex items-center justify-center text-white mb-1 shadow-sm`}>
                    {isSelected && <Check className="w-4 h-4 stroke-[3]" aria-hidden="true" />}
                  </div>
                  <span className="text-xs">{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Font Size Scaling */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-normal text-[var(--text-secondary)]">
            Typography & Font Sizing
          </span>
          <div className="grid grid-cols-3 gap-2.5" role="radiogroup" aria-label="Font size selection">
            {(['sm', 'md', 'lg'] as FontSize[]).map((size) => {
              const isSelected = currentFontSize === size;
              const labels: Record<FontSize, string> = { sm: 'Small (14px)', md: 'Medium (16px)', lg: 'Large (18px)' };
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => onFontSizeChange(size)}
                  className={`focus-ring min-h-16 rounded-[var(--radius-md)] border p-2.5 text-center transition-all ${
                    isSelected
                      ? 'btn-accent text-white font-bold shadow-[var(--shadow-sm)]'
                      : 'bg-[var(--bg-subtle)] border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                  role="radio"
                  aria-checked={isSelected}
                >
                  <Type className="w-4 h-4 mx-auto mb-1 opacity-70" aria-hidden="true" />
                  <span className="text-xs">{labels[size]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

AppearanceSection.displayName = 'AppearanceSection';
