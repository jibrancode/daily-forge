import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastProps {
  message: string;
  type?: 'success' | 'warning' | 'error' | 'info';
  isOpen: boolean;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'success',
  isOpen,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  const typeConfig = {
    success: {
      icon: CheckCircle2,
      bgColor: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    },
    warning: {
      icon: AlertCircle,
      bgColor: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    },
    error: {
      icon: AlertCircle,
      bgColor: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
    },
    info: {
      icon: Info,
      bgColor: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400',
    },
  };

  const Config = typeConfig[type];
  const Icon = Config.icon;

  return (
    <div
      className="fixed right-4 top-4 z-[var(--z-toast)] max-w-[calc(100vw-2rem)]"
      role="status"
      aria-live={type === 'error' ? 'assertive' : 'polite'}
      style={{ animation: 'df-fade-in 250ms ease-out' }}
    >
      <div
        className={`flex items-center gap-3 rounded-[var(--radius-lg)] border bg-[var(--bg-card)] px-4 py-3 shadow-[var(--shadow-md)] ${Config.bgColor}`}
      >
        <Icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
        <span className="text-sm font-semibold">{message}</span>
        <button
          type="button"
          onClick={onClose}
          className="focus-ring rounded-[var(--radius-sm)] p-1 transition-colors duration-[150ms] hover:bg-black/10"
          aria-label="Dismiss notification"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
