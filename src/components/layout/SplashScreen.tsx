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
    }, 900);

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
          <div className="flex h-20 w-20 items-center justify-center rounded-[var(--radius-xl)] border border-emerald-500/30 bg-emerald-500/10 shadow-[var(--shadow-md)]">
            <Flame className="h-10 w-10 text-emerald-400" aria-hidden="true" />
          </div>
        </div>

        <div className="text-center space-y-1">
          <h1 className="type-h1 text-[#f4f0e8]">
            Daily Forge
          </h1>
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-400/90">
            Forge Your Day • Reflect Your Growth
          </p>
        </div>

        <div className="pt-8 flex items-center space-x-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
};
