import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'accent' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'accent',
  size = 'md',
  icon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses =
    'focus-ring inline-flex min-h-10 items-center justify-center rounded-[var(--radius-md)] font-medium transition-all duration-[150ms] disabled:cursor-not-allowed disabled:opacity-50 select-none active:scale-[0.99]';

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-5 py-3 gap-2.5 font-semibold',
  };

  const variantClasses = {
    accent: 'btn-accent shadow-[var(--shadow-sm)]',
    secondary:
      'bg-[var(--bg-subtle)] text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-color)]',
    outline:
      'border-2 border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] bg-transparent',
    ghost:
      'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]',
    danger:
      'bg-rose-600 text-white hover:bg-rose-700 shadow-[var(--shadow-sm)]',
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="flex-shrink-0" aria-hidden="true">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
