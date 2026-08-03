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
      setTimeout(onComplete, 500); // 500ms fade transition
    }, 1800); // Display for 1.8 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0b0f17] text-white transition-opacity duration-500 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center space-y-4 animate-in zoom-in-90 duration-500">
        <div className="relative">
          <div className="w-20 h-20 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shadow-2xl shadow-emerald-500/30 animate-pulse">
            <Flame className="w-10 h-10 text-emerald-400" />
          </div>
          <div className="absolute -inset-1 rounded-3xl bg-emerald-500/20 blur-xl -z-10 animate-pulse" />
        </div>

        <div className="text-center space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-white font-sans">
            Daily Forge
          </h1>
          <p className="text-xs font-medium tracking-widest text-emerald-400/90 uppercase">
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
