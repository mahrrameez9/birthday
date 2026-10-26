import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Share2, Check } from 'lucide-react';
import { BirthdayConfig } from '../types';
import { sound } from '../utils/audio';
import { burstAt, fireFullCelebration } from '../utils/confetti';

interface CelebrationReactionWallProps {
  config: BirthdayConfig;
  onShare: () => void;
}

interface FlyingReaction {
  id: number;
  emoji: string;
  x: number;
}

export const CelebrationReactionWall: React.FC<CelebrationReactionWallProps> = ({
  config,
  onShare,
}) => {
  const [reactionCount, setReactionCount] = useState<number>(142);
  const [flyingReactions, setFlyingReactions] = useState<FlyingReaction[]>([]);
  const [copiedGreeting, setCopiedGreeting] = useState(false);

  const reactionEmojis = [
    { emoji: '🎂', label: 'Cake' },
    { emoji: '💖', label: 'Love' },
    { emoji: '✨', label: 'Magic' },
    { emoji: '🥂', label: 'Cheers' },
    { emoji: '👑', label: 'Queen' },
    { emoji: '🎁', label: 'Gift' },
    { emoji: '🎉', label: 'Party' },
  ];

  const handleSendReaction = (emoji: string, e: React.MouseEvent) => {
    sound.playSparkle();
    const rect = e.currentTarget.getBoundingClientRect();
    const xRatio = (rect.left + rect.width / 2) / window.innerWidth;
    const yRatio = (rect.top + rect.height / 2) / window.innerHeight;

    burstAt(xRatio, yRatio);
    setReactionCount((prev) => prev + 1);

    // Spawn 2 flying emojis
    const newId = Date.now() + Math.random();
    setFlyingReactions((prev) => [
      ...prev.slice(-15),
      { id: newId, emoji, x: rect.left + rect.width / 2 },
    ]);

    setTimeout(() => {
      setFlyingReactions((prev) => prev.filter((r) => r.id !== newId));
    }, 1800);
  };

  const copyGreetingCard = () => {
    sound.playSparkle();
    const text = `🌟 Happy Birthday ${config.recipientName}! 🌟\n\n${config.tagline}\n\n"${config.heartfeltLetter}"\n\nLovingly sent by ${config.senderName} ✨`;
    navigator.clipboard.writeText(text);
    setCopiedGreeting(true);
    setTimeout(() => setCopiedGreeting(false), 2500);
  };

  return (
    <section className="py-20 px-4 sm:px-6 relative z-10 scroll-mt-16">
      <div className="max-w-4xl mx-auto">
        {/* Floating Emojis Portal Container */}
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          <AnimatePresence>
            {flyingReactions.map((r) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 1, y: window.innerHeight - 150, x: r.x - 20, scale: 0.6 }}
                animate={{
                  opacity: 0,
                  y: window.innerHeight - 550,
                  x: r.x - 20 + (Math.random() * 80 - 40),
                  scale: 1.6,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.8, ease: 'easeOut' }}
                className="absolute text-3xl sm:text-4xl select-none"
              >
                {r.emoji}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Reaction Hub Card */}
        <div className="bg-neutral-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-neutral-400 mb-2">
            <span>Shower With Love</span>
            <span aria-hidden="true">·</span>
            <span>Live Interactive Cheers</span>
          </div>

          <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            Send Hugs & Birthday Cheers to {config.recipientName}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto">
            Tap any celebratory reaction below to send floating blessings and pump up the birthday meter!
          </p>

          {/* Reaction Counter Display */}
          <div className="mt-6 inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 rounded-2xl">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
            <span className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-white">
              {reactionCount}
            </span>
            <span className="text-xs text-neutral-400 font-medium">Smiles & Hugs Sent</span>
          </div>

          {/* Emoji Reaction Buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-2.5 sm:gap-3.5">
            {reactionEmojis.map(({ emoji, label }) => (
              <button
                key={label}
                onClick={(e) => handleSendReaction(emoji, e)}
                className="group flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-rose-400/40 active:scale-90 transition-all shadow-sm hover:shadow-rose-500/10"
                title={`Send ${label}`}
              >
                <span className="text-2xl sm:text-3xl group-hover:scale-125 transition-transform duration-200">
                  {emoji}
                </span>
                <span className="text-[10px] text-neutral-400 group-hover:text-rose-200 mt-0.5">
                  {label}
                </span>
              </button>
            ))}
          </div>

          {/* Grand Finale Buttons */}
          <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                sound.playConfettiPop();
                fireFullCelebration();
              }}
              className="flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 hover:from-amber-600 hover:to-pink-600 rounded-xl shadow-lg shadow-rose-500/20 active:scale-95 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Full Screen Fireworks Finale</span>
            </button>

            <button
              onClick={copyGreetingCard}
              className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-neutral-200 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl hover:text-white active:scale-95 transition-all"
            >
              {copiedGreeting ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Greeting Copied!</span>
                </>
              ) : (
                <>
                  <span>Copy Full Greeting Text</span>
                </>
              )}
            </button>

            <button
              onClick={onShare}
              className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-neutral-200 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl hover:text-white active:scale-95 transition-all"
            >
              <Share2 className="w-4 h-4 text-sky-400" />
              <span>Share Website Link</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
