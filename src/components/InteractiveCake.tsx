import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Wind, RotateCcw, Sparkles, Heart } from 'lucide-react';
import { sound } from '../utils/audio';
import { fireFullCelebration, goldEmberBurst, heartFlurry } from '../utils/confetti';

interface InteractiveCakeProps {
  recipientName: string;
}

export const InteractiveCake: React.FC<InteractiveCakeProps> = ({ recipientName }) => {
  // Candles state
  const [candles, setCandles] = useState<[boolean, boolean, boolean]>([true, true, true]);
  const [allBlown, setAllBlown] = useState<boolean>(false);

  // Cake cutting state
  const [isCutting, setIsCutting] = useState<boolean>(false);
  const [isCut, setIsCut] = useState<boolean>(false);
  const [hasEatenBite, setHasEatenBite] = useState<boolean>(false);

  const extinguishCandle = (index: number, e?: React.MouseEvent) => {
    if (!candles[index]) return;

    sound.playCandleBlow();
    if (e) {
      const rect = e.currentTarget.getBoundingClientRect();
      goldEmberBurst(
        (rect.left + rect.width / 2) / window.innerWidth,
        (rect.top + rect.height / 2) / window.innerHeight
      );
    }

    const nextCandles: [boolean, boolean, boolean] = [...candles];
    nextCandles[index] = false;
    setCandles(nextCandles);

    if (nextCandles.every((c) => !c)) {
      handleAllBlown();
    }
  };

  const blowAllCandles = () => {
    sound.playCandleBlow();
    setCandles([false, false, false]);
    handleAllBlown();
  };

  const handleAllBlown = () => {
    setAllBlown(true);
    setTimeout(() => {
      sound.playConfettiPop();
      fireFullCelebration();
    }, 400);
  };

  const relightCandles = () => {
    sound.playSparkle();
    setCandles([true, true, true]);
    setAllBlown(false);
  };

  // Cutting the cake
  const handleCutCake = () => {
    sound.playSparkle();
    setIsCutting(true);

    setTimeout(() => {
      sound.playConfettiPop();
      setIsCutting(false);
      setIsCut(true);
      heartFlurry(0.5, 0.4);
    }, 1200);
  };

  const handleEatBite = () => {
    sound.playSparkle();
    heartFlurry(0.5, 0.5);
    setHasEatenBite(true);
  };

  const resetCakeSlice = () => {
    sound.playSparkle();
    setIsCut(false);
    setHasEatenBite(false);
  };

  return (
    <section id="cake" className="py-20 px-4 sm:px-6 relative z-10 scroll-mt-16">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-neutral-400 mb-2">
            <span>Ritual of Joy</span>
            <span aria-hidden="true">·</span>
            <span>27th October Ceremony</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Blow Candles & Cut the Birthday Cake
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-xl mx-auto">
            Blow out your candles, make a wish, and grab the ceremonial golden knife to slice the cake!
          </p>
        </div>

        {/* Cake Container */}
        <div className="relative max-w-xl mx-auto bg-neutral-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col items-center">
          {/* Subtle Ambient Halo */}
          <div className="absolute top-1/4 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Interactive Birthday Cake SVG */}
          <div className="relative w-72 sm:w-80 h-72 flex items-center justify-center select-none">
            {/* Animated Cutting Knife */}
            <AnimatePresence>
              {isCutting && (
                <motion.div
                  initial={{ opacity: 0, x: 60, y: -40, rotate: -35 }}
                  animate={{
                    opacity: 1,
                    x: [60, 0, -20],
                    y: [-40, 20, 50],
                    rotate: [-35, -15, -45],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.1, ease: 'easeInOut' }}
                  className="absolute z-30 pointer-events-none"
                >
                  {/* Golden Ceremonial Knife SVG */}
                  <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
                    <defs>
                      <linearGradient id="bladeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="50%" stopColor="#e2e8f0" />
                        <stop offset="100%" stopColor="#cbd5e1" />
                      </linearGradient>
                      <linearGradient id="handleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fef08a" />
                        <stop offset="100%" stopColor="#ca8a04" />
                      </linearGradient>
                    </defs>
                    {/* Knife Blade */}
                    <path d="M15 75 L70 20 Q75 15 78 18 Q80 23 72 30 L25 80 Z" fill="url(#bladeGrad)" stroke="#94a3b8" strokeWidth="1" />
                    {/* Golden Handle */}
                    <rect x="8" y="72" width="22" height="10" rx="3" fill="url(#handleGrad)" transform="rotate(-45 8 72)" />
                    <circle cx="16" cy="78" r="2.5" fill="#fef08a" />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>

            <svg
              viewBox="0 0 320 280"
              className="w-full h-full overflow-visible drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
            >
              <defs>
                <linearGradient id="tierTopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f472b6" />
                  <stop offset="100%" stopColor="#db2777" />
                </linearGradient>
                <linearGradient id="tierBottomGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#fb7185" />
                  <stop offset="100%" stopColor="#e11d48" />
                </linearGradient>
                <linearGradient id="icingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#ffe4e6" />
                </linearGradient>
                <linearGradient id="standGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#e2e8f0" />
                  <stop offset="50%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#cbd5e1" />
                </linearGradient>
                <linearGradient id="candleGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="50%" stopColor="#fde047" />
                  <stop offset="100%" stopColor="#eab308" />
                </linearGradient>
                <linearGradient id="candleGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="50%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#7e22ce" />
                </linearGradient>
                <linearGradient id="candleGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#67e8f9" />
                  <stop offset="50%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#0891b2" />
                </linearGradient>
              </defs>

              {/* Cake Stand Base */}
              <ellipse cx="160" cy="255" rx="125" ry="16" fill="url(#standGrad)" opacity="0.9" />
              <path d="M145 255 L135 272 H185 L175 255 Z" fill="#94a3b8" />
              <ellipse cx="160" cy="272" rx="35" ry="6" fill="#cbd5e1" />

              {/* Bottom Tier */}
              <g id="bottom-tier">
                <rect x="55" y="170" width="210" height="75" rx="12" fill="url(#tierBottomGrad)" />
                <path d="M55 210 Q 160 220 265 210" stroke="#fef08a" strokeWidth="2.5" fill="none" opacity="0.7" />
                {/* Cream drips bottom tier */}
                <path
                  d="M55 170 C70 185 80 185 95 170 C110 185 125 185 140 170 C155 185 170 185 185 170 C200 185 215 185 230 170 C245 185 255 185 265 170 V165 H55 Z"
                  fill="url(#icingGrad)"
                />
                <circle cx="85" cy="225" r="3.5" fill="#fde047" />
                <circle cx="125" cy="230" r="3.5" fill="#fde047" />
                <circle cx="160" cy="232" r="3.5" fill="#fde047" />
                <circle cx="195" cy="230" r="3.5" fill="#fde047" />
                <circle cx="235" cy="225" r="3.5" fill="#fde047" />
              </g>

              {/* Top Tier */}
              <g id="top-tier">
                <rect x="85" y="115" width="150" height="60" rx="10" fill="url(#tierTopGrad)" />
                {/* Cream drips top tier */}
                <path
                  d="M85 115 C98 128 108 128 120 115 C132 128 142 128 155 115 C168 128 178 128 190 115 C202 128 215 128 235 115 V110 H85 Z"
                  fill="url(#icingGrad)"
                />
                <circle cx="110" cy="150" r="3" fill="#ffffff" opacity="0.8" />
                <circle cx="135" cy="154" r="3" fill="#ffffff" opacity="0.8" />
                <circle cx="160" cy="156" r="3" fill="#ffffff" opacity="0.8" />
                <circle cx="185" cy="154" r="3" fill="#ffffff" opacity="0.8" />
                <circle cx="210" cy="150" r="3" fill="#ffffff" opacity="0.8" />

                {/* Slice Cut Indicator on cake if cut */}
                {isCut && (
                  <path
                    d="M135 115 L160 145 L175 115 Z"
                    fill="#be123c"
                    opacity="0.9"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                )}
              </g>

              {/* Top Cream Frosting Surface */}
              <ellipse cx="160" cy="115" rx="75" ry="14" fill="url(#icingGrad)" />

              {/* CANDLE 1 (Left) */}
              <g className="cursor-pointer" onClick={(e) => extinguishCandle(0, e)}>
                <rect x="115" y="65" width="10" height="50" rx="3" fill="url(#candleGrad1)" />
                <line x1="120" y1="65" x2="120" y2="58" stroke="#334155" strokeWidth="1.5" />
                {candles[0] ? (
                  <g className="animate-flame origin-bottom">
                    <ellipse cx="120" cy="46" rx="6" ry="12" fill="#f59e0b" />
                    <ellipse cx="120" cy="48" rx="3.5" ry="7" fill="#fef08a" />
                    <circle cx="120" cy="48" r="1.5" fill="#ffffff" />
                  </g>
                ) : (
                  <g opacity="0.5">
                    <path d="M120 56 Q115 45 122 38 T118 24" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                  </g>
                )}
              </g>

              {/* CANDLE 2 (Center) */}
              <g className="cursor-pointer" onClick={(e) => extinguishCandle(1, e)}>
                <rect x="155" y="55" width="10" height="60" rx="3" fill="url(#candleGrad2)" />
                <line x1="160" y1="55" x2="160" y2="47" stroke="#334155" strokeWidth="1.5" />
                {candles[1] ? (
                  <g className="animate-flame origin-bottom" style={{ animationDelay: '0.2s' }}>
                    <ellipse cx="160" cy="35" rx="7" ry="13" fill="#f59e0b" />
                    <ellipse cx="160" cy="37" rx="4" ry="8" fill="#fef08a" />
                    <circle cx="160" cy="37" r="2" fill="#ffffff" />
                  </g>
                ) : (
                  <g opacity="0.5">
                    <path d="M160 45 Q166 35 158 26 T162 14" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                  </g>
                )}
              </g>

              {/* CANDLE 3 (Right) */}
              <g className="cursor-pointer" onClick={(e) => extinguishCandle(2, e)}>
                <rect x="195" y="65" width="10" height="50" rx="3" fill="url(#candleGrad3)" />
                <line x1="200" y1="65" x2="200" y2="58" stroke="#334155" strokeWidth="1.5" />
                {candles[2] ? (
                  <g className="animate-flame origin-bottom" style={{ animationDelay: '0.4s' }}>
                    <ellipse cx="200" cy="46" rx="6" ry="12" fill="#f59e0b" />
                    <ellipse cx="200" cy="48" rx="3.5" ry="7" fill="#fef08a" />
                    <circle cx="200" cy="48" r="1.5" fill="#ffffff" />
                  </g>
                ) : (
                  <g opacity="0.5">
                    <path d="M200 56 Q205 45 198 38 T202 24" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                  </g>
                )}
              </g>
            </svg>
          </div>

          {/* FIRST BITE TRAY MODAL/POPUP FOR RAMSHA */}
          <AnimatePresence>
            {isCut && (
              <motion.div
                initial={{ opacity: 0, scale: 0.7, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="mt-6 w-full max-w-md bg-gradient-to-br from-neutral-900 to-neutral-950 border-2 border-amber-300/40 rounded-2xl p-5 shadow-2xl text-center relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500" />

                {!hasEatenBite ? (
                  <div className="space-y-4">
                    {/* Animated Plate with Slice of Cake */}
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-amber-200 to-amber-50 border-2 border-amber-300 flex items-center justify-center shadow-lg relative"
                    >
                      <span className="text-4xl">🍰</span>
                      <span className="absolute -top-1 -right-1 text-sm">✨</span>
                    </motion.div>

                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold block">
                        CEREMONIAL FIRST BITE
                      </span>
                      <h4 className="font-serif-display text-xl sm:text-2xl font-bold text-white mt-0.5">
                        First Bite is for {recipientName} — It&apos;s Your Right! 🍰
                      </h4>
                      <p className="text-xs sm:text-sm text-neutral-300 mt-1.5 leading-relaxed">
                        The birthday girl gets the sweetest, biggest first slice. Take your bite and make your 27th October wish!
                      </p>
                    </div>

                    <div className="flex justify-center gap-3 pt-1">
                      <button
                        onClick={handleEatBite}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white font-bold text-xs sm:text-sm shadow-lg hover:from-rose-600 hover:to-amber-600 active:scale-95 transition-all"
                      >
                        <Heart className="w-4 h-4 fill-white" />
                        <span>Take Bite / Feed {recipientName} 💖</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 py-2">
                    <div className="text-3xl animate-bounce">😋 ✨ 🎂</div>
                    <h4 className="font-serif-display text-xl font-bold text-amber-300">
                      Delicious! So Sweet!
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-300">
                      May every day of your new year be filled with this much joy, sweetness, and blessings!
                    </p>
                    <button
                      onClick={resetCakeSlice}
                      className="text-xs text-rose-400 hover:text-rose-300 underline font-medium pt-1"
                    >
                      Cut another slice for friends
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cake Action Controls */}
          <div className="mt-6 text-center space-y-4 w-full">
            <div className="flex flex-wrap justify-center items-center gap-3">
              {/* Blow Candles Button */}
              {!allBlown ? (
                <button
                  onClick={blowAllCandles}
                  className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 rounded-xl shadow-md active:scale-95 transition-all"
                >
                  <Wind className="w-4 h-4" />
                  <span>Blow Candles</span>
                </button>
              ) : (
                <button
                  onClick={relightCandles}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-neutral-300 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl active:scale-95 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Relight</span>
                </button>
              )}

              {/* Cut Cake Knife Button */}
              <button
                onClick={handleCutCake}
                disabled={isCutting}
                className="flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 rounded-xl shadow-md shadow-rose-500/20 active:scale-95 transition-all"
              >
                <span>🔪</span>
                <span>{isCut ? 'Cut Another Slice' : 'Cut Birthday Cake'}</span>
              </button>
            </div>

            <p className="text-[11px] text-neutral-400">
              Tip: Blow out the candles first, then grab the knife to cut the first slice for {recipientName}!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
