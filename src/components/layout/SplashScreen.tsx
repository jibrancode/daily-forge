import React, { useEffect, useState } from 'react';
import { Flame } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 350);
    }, 700);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[var(--z-modal)] flex flex-col items-center justify-center bg-[#11151d] text-[#f4f0e8] transition-opacity duration-[350ms] ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center space-y-4" style={{ animation: 'df-scale-in 350ms ease-out' }}>
        <div className="relative">
          <div className="flex h-20 w-20 items-center justify-center rounded-[var(--radius-xl)] border border-[var(--accent-border)] bg-[var(--accent-light)] shadow-[var(--shadow-sm)]">
            <Flame className="h-10 w-10 text-[var(--accent-primary)]" aria-hidden="true" />
          </div>
        </div>

        <div className="text-center space-y-1">
          <h1 className="type-h1 text-[#f4f0e8]">
            Daily Forge
          </h1>
          <p className="text-xs font-medium uppercase tracking-normal text-[var(--accent-primary)] opacity-90">
            Forge Your Day • Reflect Your Growth
          </p>
        </div>
      </div>
    </div>
  );
};
