import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key !== 'Tab' || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!first || !last) return;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    if (isOpen) {
      previouslyFocusedElement.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      requestAnimationFrame(() => {
        const focusTarget = dialogRef.current?.querySelector<HTMLElement>(
          'button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        focusTarget?.focus();
      });
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      previouslyFocusedElement.current?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[var(--z-overlay)] flex items-end justify-center p-3 sm:items-center sm:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/55 transition-opacity duration-[250ms]"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative z-[var(--z-modal)] w-full max-w-lg rounded-t-[var(--radius-2xl)] sm:rounded-[var(--radius-xl)] border border-[var(--border-color)] bg-[var(--bg-card)] p-4 shadow-[var(--shadow-lg)] sm:p-5 animate-slide-up sm:animate-scale-in"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-[var(--border-color)] pb-3">
          <h3 id="modal-title" className="type-h3 text-[var(--text-primary)]">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="focus-ring rounded-[var(--radius-sm)] p-1.5 text-[var(--text-muted)] transition-colors duration-[150ms] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)]"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[70dvh] overflow-y-auto py-4">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="flex flex-col-reverse gap-2 border-t border-[var(--border-color)] pt-3 sm:flex-row sm:items-center sm:justify-end">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
