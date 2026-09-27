import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, EyeOff, Eye, Volume2 } from 'lucide-react';

interface Petal {
  id: number;
  emoji: string;
  left: number; // percentage
  size: number; // px
  duration: number; // seconds
  delay: number; // seconds
  opacity: number;
}

const FLOWER_EMOJIS = ['🌸', '🌻', '🌼', '🌺', '🍃', '✨', '🌷'];

export const FloatingPetals: React.FC = () => {
  const [petals, setPetals] = useState<Petal[]>([]);
  const [animationsEnabled, setAnimationsEnabled] = useState<boolean>(true);
  const [burstCount, setBurstCount] = useState<number>(0);

  // Initialize randomized petals on mount
  useEffect(() => {
    const generated: Petal[] = [];
    const count = 18; // optimal count for smoothness without CPU burden

    for (let i = 0; i < count; i++) {
      generated.push({
        id: i,
        emoji: FLOWER_EMOJIS[Math.floor(Math.random() * FLOWER_EMOJIS.length)],
        left: Math.random() * 95, // 0% to 95%
        size: Math.floor(Math.random() * 14) + 14, // 14px to 28px
        duration: Math.floor(Math.random() * 12) + 14, // 14s to 26s
        delay: Math.random() * 10, // staggered delay
        opacity: Math.random() * 0.4 + 0.35, // soft pleasant opacity
      });
    }

    setPetals(generated);
  }, []);

  // Trigger celebratory flower confetti shower
  const triggerCelebration = useCallback(() => {
    setBurstCount((prev) => prev + 1);

    // Primary flower colors burst
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#f59e0b', '#f43f5e', '#10b981', '#fbbf24', '#ec4899', '#6366f1'],
      shapes: ['circle', 'square'],
      scalar: 1.2,
    });

    // Secondary delayed side cannons
    setTimeout(() => {
      confetti({
        particleCount: 30,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#f59e0b', '#fbbf24', '#f43f5e'],
      });
      confetti({
        particleCount: 30,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#10b981', '#34d399', '#ec4899'],
      });
    }, 200);
  }, []);

  return (
    <>
      {/* Ambient Floating Flower Petals Container (pointer-events-none so it doesn't block clicks) */}
      {animationsEnabled && (
        <div
          className="fixed inset-0 pointer-events-none z-20 overflow-hidden"
          aria-hidden="true"
        >
          {petals.map((petal) => (
            <div
              key={petal.id}
              className="absolute select-none user-select-none"
              style={{
                left: `${petal.left}%`,
                top: '-30px',
                fontSize: `${petal.size}px`,
                opacity: petal.opacity,
                animation: `petal-fall ${petal.duration}s linear infinite`,
                animationDelay: `${petal.delay}s`,
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.06))',
              }}
            >
              {petal.emoji}
            </div>
          ))}
        </div>
      )}

      {/* Floating Interactive Animation & Celebration Bar (Bottom Right) */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
        {/* Quick Celebration Shower Button */}
        <button
          onClick={triggerCelebration}
          title="ফুল ছড়ান ও উদযাপন করুন!"
          className="group relative flex items-center gap-2 px-3.5 py-2 rounded-full bg-linear-to-r from-amber-500 via-orange-500 to-rose-500 text-white font-extrabold text-xs shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-rose-500/40 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/40"
        >
          <span className="text-base group-hover:rotate-45 transition-transform">🌸</span>
          <span className="hidden sm:inline">ফুল ছড়ান</span>
          <Sparkles className="w-3.5 h-3.5 group-hover:animate-spin text-amber-200" />

          {/* Pulse ping ring */}
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400"></span>
          </span>
        </button>

        {/* Toggle Animations On / Off (Accessibility & Performance) */}
        <button
          onClick={() => setAnimationsEnabled(!animationsEnabled)}
          title={animationsEnabled ? 'অ্যানিমেশন বন্ধ করুন' : 'অ্যানিমেশন চালু করুন'}
          className={`p-2 rounded-full border shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer ${
            animationsEnabled
              ? 'bg-white/90 text-amber-700 border-amber-200 hover:bg-amber-50'
              : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
          }`}
          aria-label="Toggle ambient animation"
        >
          {animationsEnabled ? (
            <Eye className="w-4 h-4" />
          ) : (
            <EyeOff className="w-4 h-4 text-rose-400" />
          )}
        </button>
      </div>
    </>
  );
};
