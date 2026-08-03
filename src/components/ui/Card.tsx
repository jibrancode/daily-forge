import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverable = false,
}) => {
  const cardClasses = `surface-panel p-4 transition-all duration-[150ms] sm:p-5 ${
    hoverable
      ? 'hover:border-[var(--accent-border)] hover:shadow-[var(--shadow-sm)] cursor-pointer'
      : ''
  } ${className}`;

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`focus-ring w-full text-left ${cardClasses}`}
      >
        {children}
      </button>
    );
  }

  return <div className={cardClasses}>{children}</div>;
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => <div className={`mb-3 flex items-start justify-between gap-3 sm:items-center ${className}`}>{children}</div>;

export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <h3 className={`type-h3 text-[var(--text-primary)] ${className}`}>
    {children}
  </h3>
);

export const CardDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <p className={`type-caption mt-0.5 text-[var(--text-muted)] ${className}`}>
    {children}
  </p>
);

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => <div className={`${className}`}>{children}</div>;
