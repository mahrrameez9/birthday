import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Smile,
  HeartHandshake,
  Sparkles,
  Heart,
  Compass,
  Crown,
  CheckCircle2,
} from 'lucide-react';
import { BirthdayConfig } from '../types';
import { sound } from '../utils/audio';
import { burstAt } from '../utils/confetti';

interface ConstellationWishesProps {
  wishes: BirthdayConfig['wishes'];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Smile,
  HeartHandshake,
  Sparkles,
  Heart,
  Compass,
  Crown,
};

export const ConstellationWishes: React.FC<ConstellationWishesProps> = ({ wishes }) => {
  const [unlockedIds, setUnlockedIds] = useState<string[]>(['1']); // first wish unlocked by default

  const toggleUnlock = (id: string, e: React.MouseEvent) => {
    if (!unlockedIds.includes(id)) {
      sound.playSparkle();
      const rect = e.currentTarget.getBoundingClientRect();
      burstAt(
        (rect.left + rect.width / 2) / window.innerWidth,
        (rect.top + rect.height / 2) / window.innerHeight
      );
      setUnlockedIds((prev) => [...prev, id]);
    }
  };

  const unlockAll = () => {
    sound.playSparkle();
    setUnlockedIds(wishes.map((w) => w.id));
  };

  return (
    <section id="wishes" className="py-20 px-4 sm:px-6 relative z-10 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-neutral-400 mb-2">
            <span>Starlight Blessings</span>
            <span aria-hidden="true">·</span>
            <span>Tap Each Card to Unlock</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            The Constellation of Wishes
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-xl mx-auto">
            Six sacred blessings gathered from across the stars, dedicated to illuminate your path this year.
          </p>

          {/* Progress bar */}
          <div className="mt-6 flex flex-col items-center gap-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-amber-300">
                {unlockedIds.length} of {wishes.length} Wishes Unlocked
              </span>
              {unlockedIds.length < wishes.length && (
                <button
                  onClick={unlockAll}
                  className="text-xs text-rose-400 hover:text-rose-300 underline font-medium"
                >
                  Unlock all
                </button>
              )}
            </div>
            <div className="w-48 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-rose-500 to-amber-400 transition-all duration-500 rounded-full"
                style={{ width: `${(unlockedIds.length / wishes.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishes.map((wish, index) => {
            const Icon = iconMap[wish.icon] || Sparkles;
            const isUnlocked = unlockedIds.includes(wish.id);

            return (
              <motion.div
                key={wish.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onClick={(e) => toggleUnlock(wish.id, e)}
                className={`group relative rounded-2xl p-6 transition-all duration-300 cursor-pointer overflow-hidden ${
                  isUnlocked
                    ? 'bg-neutral-900/80 border border-white/15 shadow-xl hover:border-rose-400/30'
                    : 'bg-neutral-900/40 border border-white/5 hover:border-white/10 opacity-80'
                }`}
              >
                {/* Glow backdrop when unlocked */}
                {isUnlocked && (
                  <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-rose-500/10 blur-2xl pointer-events-none" />
                )}

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      {/* Icon */}
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                          isUnlocked
                            ? `bg-gradient-to-br ${wish.color} text-neutral-950 shadow-md`
                            : 'bg-neutral-800 text-neutral-400'
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>

                      {/* Status indicator */}
                      {isUnlocked ? (
                        <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Unlocked</span>
                        </div>
                      ) : (
                        <span className="text-[11px] text-neutral-400 group-hover:text-amber-300 transition-colors">
                          Tap to reveal
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-rose-200 transition-colors">
                      {wish.title}
                    </h3>

                    <p
                      className={`mt-2 text-sm leading-relaxed transition-all ${
                        isUnlocked
                          ? 'text-neutral-300'
                          : 'text-neutral-400 line-clamp-2 blur-[3px] select-none'
                      }`}
                    >
                      {wish.message}
                    </p>
                  </div>

                  {!isUnlocked && (
                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-center text-xs text-amber-300 font-medium">
                      <span>✨ Click to unleash this blessing</span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
