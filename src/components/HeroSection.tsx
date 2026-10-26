import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, Gift, Flame, Heart, Share2 } from 'lucide-react';
import { BirthdayConfig } from '../types';
import { sound } from '../utils/audio';
import { burstAt, fireFullCelebration } from '../utils/confetti';

interface HeroSectionProps {
  config: BirthdayConfig;
  onOpenCustomize: () => void;
  onShare: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  config,
  onOpenCustomize,
  onShare,
}) => {
  const { scrollY } = useScroll();

  // Parallax shifts for floating elements
  const balloonY1 = useTransform(scrollY, [0, 600], [0, -180]);
  const balloonY2 = useTransform(scrollY, [0, 600], [0, -260]);
  const crownY = useTransform(scrollY, [0, 600], [0, -120]);
  const cardScale = useTransform(scrollY, [0, 400], [1, 0.95]);

  const handleHeroBurst = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    sound.playConfettiPop();
    burstAt(x, y);
  };

  return (
    <section id="hero" className="relative pt-28 pb-20 sm:pt-36 sm:pb-32 px-4 sm:px-6 overflow-hidden">
      {/* Floating Animated Balloons (Left & Right) */}
      <motion.div
        style={{ y: balloonY1 }}
        className="hidden lg:block absolute left-8 top-32 z-10 pointer-events-none"
      >
        <div className="relative animate-float-slow">
          {/* Trio of Luxury Birthday Balloons */}
          <svg width="140" height="220" viewBox="0 0 140 220" fill="none" className="drop-shadow-2xl">
            {/* Balloon 1: Rose Gold */}
            <defs>
              <radialGradient id="balloonRose" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#fda4af" />
                <stop offset="50%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#881337" />
              </radialGradient>
              <radialGradient id="balloonGold" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#713f12" />
              </radialGradient>
              <radialGradient id="balloonViolet" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#e9d5ff" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#581c87" />
              </radialGradient>
            </defs>

            {/* Balloon string paths */}
            <path d="M45 105 Q30 150 70 210" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" />
            <path d="M85 85 Q95 140 70 210" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none" />
            <path d="M60 65 Q70 130 70 210" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" fill="none" />

            {/* Balloon bodies */}
            <ellipse cx="45" cy="70" rx="30" ry="38" fill="url(#balloonRose)" />
            <polygon points="45,108 40,116 50,116" fill="#be123c" />
            <ellipse cx="37" cy="56" rx="6" ry="12" fill="white" opacity="0.4" transform="rotate(-20 37 56)" />

            <ellipse cx="88" cy="55" rx="26" ry="34" fill="url(#balloonGold)" />
            <polygon points="88,89 83,97 93,97" fill="#a16207" />
            <ellipse cx="80" cy="42" rx="5" ry="10" fill="white" opacity="0.45" transform="rotate(-15 80 42)" />

            <ellipse cx="62" cy="38" rx="22" ry="28" fill="url(#balloonViolet)" />
            <polygon points="62,66 58,72 66,72" fill="#7e22ce" />
            <ellipse cx="55" cy="27" rx="4" ry="8" fill="white" opacity="0.4" transform="rotate(-20 55 27)" />
          </svg>
        </div>
      </motion.div>

      <motion.div
        style={{ y: balloonY2 }}
        className="hidden lg:block absolute right-12 top-40 z-10 pointer-events-none"
      >
        <div className="relative animate-float-medium">
          <svg width="120" height="200" viewBox="0 0 120 200" fill="none" className="drop-shadow-2xl">
            {/* Balloon strings */}
            <path d="M60 90 Q80 140 50 195" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" fill="none" />
            <path d="M35 70 Q25 130 50 195" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" />

            {/* Balloon bodies */}
            <ellipse cx="60" cy="58" rx="28" ry="36" fill="url(#balloonRose)" />
            <polygon points="60,94 55,102 65,102" fill="#be123c" />
            <ellipse cx="52" cy="45" rx="5" ry="10" fill="white" opacity="0.4" transform="rotate(-20 52 45)" />

            <ellipse cx="35" cy="40" rx="22" ry="28" fill="url(#balloonGold)" />
            <polygon points="35,68 31,74 39,74" fill="#a16207" />
            <ellipse cx="29" cy="30" rx="4" ry="8" fill="white" opacity="0.4" transform="rotate(-15 29 30)" />
          </svg>
        </div>
      </motion.div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto text-center relative z-20">
        {/* Unboxed Metadata (Zero-Pill Discipline) */}
        <div className="flex items-center justify-center gap-2.5 text-xs sm:text-sm font-medium text-neutral-400 mb-6 flex-wrap">
          <span className="text-amber-300 font-semibold flex items-center gap-1">
            <span>🌙 27th October</span>
          </span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span className="text-rose-300">The Day the Moon Came on Earth</span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span className="text-amber-200">Dedicated to Ramsha</span>
        </div>

        {/* Floating Crown Animation */}
        <motion.div
          style={{ y: crownY }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex justify-center mb-4"
        >
          <div className="relative group cursor-pointer" onClick={handleHeroBurst}>
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-500/20 via-rose-500/20 to-purple-500/20 border border-amber-400/30 flex items-center justify-center shadow-lg shadow-amber-500/10 group-hover:scale-110 transition-transform">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" className="text-amber-300 drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]">
                <path
                  d="M3 18H21L19 9L15 13L12 6L9 13L5 9L3 18Z"
                  fill="url(#crownGradient)"
                  stroke="#fbbf24"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <circle cx="3.5" cy="8.5" r="1.5" fill="#fef08a" />
                <circle cx="12" cy="5.5" r="1.5" fill="#fef08a" />
                <circle cx="20.5" cy="8.5" r="1.5" fill="#fef08a" />
                <defs>
                  <linearGradient id="crownGradient" x1="12" y1="6" x2="12" y2="18" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#fef08a" />
                    <stop offset="0.5" stopColor="#f59e0b" />
                    <stop offset="1" stopColor="#d97706" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            {/* Sparkle badge */}
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500 items-center justify-center text-[9px] text-white font-bold">
                ★
              </span>
            </span>
          </div>
        </motion.div>

        {/* Grand Headline with Shimmer */}
        <motion.div
          style={{ scale: cardScale }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="space-y-4"
        >
          <h1 className="font-serif-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.1] text-balance">
            Happy Birthday,{' '}
            <span className="block mt-2 font-cursive-calligraphy text-5xl sm:text-7xl md:text-8xl bg-gradient-to-r from-rose-300 via-pink-300 to-amber-200 bg-clip-text text-transparent filter drop-shadow-[0_2px_15px_rgba(244,114,182,0.35)] py-1">
              {config.recipientName}
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-neutral-300 font-normal leading-relaxed text-balance pt-2">
            {config.tagline}
          </p>
        </motion.div>

        {/* Sender Dedication (Editorial style, no pill) */}
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-neutral-400">
          <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
          <span>Lovingly dedicated by</span>
          <span className="font-semibold text-rose-200">{config.senderName}</span>
        </div>

        {/* Primary Action Suite */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          {/* Action 1: Make a Wish (Scrolls to cake) */}
          <a
            href="#cake"
            className="flex items-center gap-2 px-5 py-3 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 rounded-xl shadow-lg shadow-rose-500/25 active:scale-95 transition-all whitespace-nowrap"
          >
            <Flame className="w-4 h-4 text-amber-200" />
            <span>Blow Candles</span>
          </a>

          {/* Action 2: Open Letterbox */}
          <a
            href="#letter"
            className="flex items-center gap-2 px-5 py-3 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 rounded-xl shadow-lg shadow-amber-500/20 active:scale-95 transition-all whitespace-nowrap"
          >
            <Heart className="w-4 h-4 text-white fill-white" />
            <span>Open Letterbox</span>
          </a>

          {/* Action 3: Open Surprise Box */}
          <a
            href="#surprise"
            className="flex items-center gap-2 px-4 py-3 text-sm sm:text-base font-semibold text-neutral-200 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl hover:text-white active:scale-95 transition-all whitespace-nowrap"
          >
            <Gift className="w-4 h-4 text-purple-400" />
            <span>Gift Box</span>
          </a>

          {/* Action 4: Pop Fireworks */}
          <button
            onClick={handleHeroBurst}
            className="flex items-center gap-2 px-4 py-3 text-sm sm:text-base font-semibold text-amber-300 bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/20 rounded-xl active:scale-95 transition-all whitespace-nowrap"
            title="Pop Confetti"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">Sparkles</span>
          </button>

          {/* Action 5: Share Link */}
          <button
            onClick={onShare}
            className="flex items-center gap-2 px-4 py-3 text-sm sm:text-base font-medium text-neutral-300 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl hover:text-white active:scale-95 transition-all whitespace-nowrap"
            title="Share with the birthday girl"
          >
            <Share2 className="w-4 h-4 text-sky-400" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </motion.div>

        {/* Interactive Helper Hint */}
        <p className="mt-8 text-xs text-neutral-500 flex items-center justify-center gap-1.5">
          <span>Scroll down for the virtual cake, interactive gifts & personalized wishes</span>
          <span className="animate-bounce">↓</span>
        </p>
      </div>
    </section>
  );
};
