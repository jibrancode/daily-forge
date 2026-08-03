import React from 'react';

interface ScreenProps {
  children: React.ReactNode;
  className?: string;
}

interface ScreenHeaderProps {
  icon?: React.ReactNode;
  label: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const Screen: React.FC<ScreenProps> = ({ children, className = '' }) => (
  <section className={`screen-enter w-full max-w-3xl space-y-5 ${className}`}>
    {children}
  </section>
);

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  icon,
  label,
  title,
  description,
  action,
}) => (
  <header className="surface-panel bg-[var(--accent-light)] border-[var(--accent-border)] p-4 sm:p-5">
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] bg-[var(--bg-card)] px-2.5 py-0.5 text-xs font-semibold text-[var(--accent-primary)] ring-1 ring-[var(--border-color)]">
          {icon}
          <span>{label}</span>
        </div>
        <div className="space-y-0.5">
          <h2 className="type-h2 text-[var(--text-primary)]">{title}</h2>
          {description && (
            <p className="type-caption max-w-xl text-[var(--text-secondary)]">{description}</p>
          )}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  </header>
);

export const ScreenContent: React.FC<ScreenProps> = ({ children, className = '' }) => (
  <div className={`space-y-6 ${className}`}>{children}</div>
);

export const Section: React.FC<ScreenProps> = ({ children, className = '' }) => (
  <section className={`space-y-4 ${className}`}>{children}</section>
);

export const Footer: React.FC<ScreenProps> = ({ children, className = '' }) => (
  <footer className={className}>{children}</footer>
);
