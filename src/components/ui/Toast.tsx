import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
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
    <div className="fixed top-5 right-5 z-50 animate-in slide-in-from-top-4 duration-300">
      <div
        className={`flex items-center space-x-3 px-4 py-3 rounded-2xl border backdrop-blur-md shadow-2xl ${Config.bgColor}`}
      >
        <Icon className="w-5 h-5 flex-shrink-0" />
        <span className="text-sm font-semibold">{message}</span>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-black/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
