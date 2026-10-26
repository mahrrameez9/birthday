import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Sparkles, Heart, Compass, Shield, Smile, X, Check } from 'lucide-react';
import { sound } from '../utils/audio';
import { heartFlurry, starsBlast, burstAt } from '../utils/confetti';

interface InteractiveSurpriseBoxProps {
  recipientName: string;
}

export const InteractiveSurpriseBox: React.FC<InteractiveSurpriseBoxProps> = ({ recipientName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUnwrapped, setIsUnwrapped] = useState(false);
  const [selectedGift, setSelectedGift] = useState<number | null>(null);

  const handleOpenModal = () => {
    sound.playGiftUnbox();
    setIsModalOpen(true);
    // Auto-trigger unwrap animation shortly after opening
    setTimeout(() => {
      handleTriggerUnwrap();
    }, 400);
  };

  const handleTriggerUnwrap = () => {
    sound.playGiftUnbox();
    heartFlurry(0.5, 0.4);
    setTimeout(() => {
      starsBlast();
    }, 300);
    setIsUnwrapped(true);
  };

  const handleCloseModal = () => {
    sound.playSparkle();
    setIsModalOpen(false);
    setSelectedGift(null);
  };

  const giftTokens = [
    {
      title: 'English Exam A+ Brainpower Charm 🎓',
      desc: 'Special good-luck blessing for tomorrow’s English paper on 27th October! Guaranteed calm nerves, crystal-clear vocabulary, and an effortless A+!',
      icon: Shield,
      badge: '27th Oct Special',
      gradient: 'from-amber-400 to-rose-400',
      note: 'Dearest Ramsha, don’t stress about tomorrow’s exam for even a single second. You have worked so hard, you are exceptionally smart, and you will shine bright like you always do!',
    },
    {
      title: 'Crown of the Earthly Moon 🌙',
      desc: 'Awarded to the Moon who descended to Earth on October 27th. A lifetime symbol of your grace, warmth, and peerless beauty.',
      icon: Smile,
      badge: 'Priceless',
      gradient: 'from-purple-400 to-pink-500',
      note: 'You brighten the entire world around you. When life feels gloomy, remember you carry the light of the entire cosmos in your smile.',
    },
    {
      title: 'Stress-Free Pass & Sweet Treats 🍫',
      desc: 'Free pass for unlimited chocolates, sweet treats, and zero worries during and after exam week.',
      icon: Compass,
      badge: 'Unlimited',
      gradient: 'from-rose-500 to-pink-500',
      note: 'Whenever you feel overwhelmed, redeem this pass for an emergency treat and instant relaxation!',
    },
    {
      title: 'Infinite Affection & Late-Night Talks 💖',
      desc: 'Permanent access to heartfelt late-night talks, unfiltered laughter, and someone who will always cheer for you.',
      icon: Heart,
      badge: 'Forever',
      gradient: 'from-pink-400 to-rose-400',
      note: 'No matter how busy or chaotic life gets, you will never walk alone. I am always in your corner, celebrating you!',
    },
  ];

  return (
    <section id="surprise" className="py-20 px-4 sm:px-6 relative z-10 scroll-mt-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-neutral-400 mb-2">
            <span>Confidential Delivery</span>
            <span aria-hidden="true">·</span>
            <span>Unwrap the Magic</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            The Royal Mystery Gift Box
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-xl mx-auto">
            A handcrafted box with four lifetime gifts prepared especially for Ramsha on 27th October.
          </p>
        </div>

        {/* Gift Box Stage */}
        <div className="relative max-w-xl mx-auto bg-neutral-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col items-center">
          <div
            onClick={handleOpenModal}
            className="group cursor-pointer flex flex-col items-center w-full transition-transform active:scale-95"
          >
            {/* Ambient Glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-rose-500/20 via-amber-500/20 to-purple-500/20 rounded-3xl blur-2xl group-hover:opacity-100 opacity-60 transition-opacity" />

            {/* 3D Styled SVG Gift Box */}
            <div className="relative w-64 h-64 flex items-center justify-center">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 1.5, -1.5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative"
              >
                <svg
                  width="210"
                  height="210"
                  viewBox="0 0 200 200"
                  fill="none"
                  className="drop-shadow-[0_20px_35px_rgba(244,63,94,0.35)] group-hover:scale-105 transition-transform duration-300"
                >
                  <defs>
                    <linearGradient id="boxBodyGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f43f5e" />
                      <stop offset="50%" stopColor="#be123c" />
                      <stop offset="100%" stopColor="#881337" />
                    </linearGradient>
                    <linearGradient id="lidGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fb7185" />
                      <stop offset="100%" stopColor="#e11d48" />
                    </linearGradient>
                    <linearGradient id="ribbonGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fef08a" />
                      <stop offset="50%" stopColor="#facc15" />
                      <stop offset="100%" stopColor="#ca8a04" />
                    </linearGradient>
                  </defs>

                  <ellipse cx="100" cy="188" rx="68" ry="10" fill="#000000" opacity="0.4" />
                  <rect x="40" y="80" width="120" height="98" rx="10" fill="url(#boxBodyGrad2)" />
                  <rect x="90" y="80" width="20" height="98" fill="url(#ribbonGrad2)" />
                  <rect x="40" y="120" width="120" height="18" fill="url(#ribbonGrad2)" opacity="0.9" />
                  <rect x="32" y="62" width="136" height="26" rx="6" fill="url(#lidGrad2)" />
                  <rect x="90" y="62" width="20" height="26" fill="url(#ribbonGrad2)" />

                  <path d="M100 64 C70 40 50 30 75 22 C95 15 100 50 100 64 Z" fill="url(#ribbonGrad2)" />
                  <path d="M100 64 C130 40 150 30 125 22 C105 15 100 50 100 64 Z" fill="url(#ribbonGrad2)" />
                  <circle cx="100" cy="62" r="8" fill="#fef08a" />
                  <circle cx="28" cy="70" r="2.5" fill="#fef08a" opacity="0.8" />
                  <circle cx="175" cy="110" r="3" fill="#fef08a" opacity="0.8" />
                  <circle cx="35" cy="155" r="2" fill="#fef08a" opacity="0.8" />
                </svg>
              </motion.div>
            </div>

            <div className="mt-3 flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-rose-500/20 to-amber-500/20 border border-rose-400/30 rounded-full text-rose-300 text-xs font-semibold group-hover:scale-105 transition-all">
              <Gift className="w-4 h-4 text-amber-300" />
              <span>Tap Gift Box to Pop Open</span>
            </div>
            <p className="mt-2 text-xs text-neutral-400">
              Interactive 3D unboxing showcase
            </p>
          </div>
        </div>

        {/* POPUP FULL-SCREEN SPECIAL 3D GIFT SHOWCASE MODAL */}
        <AnimatePresence>
          {isModalOpen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md cursor-pointer"
              onClick={handleCloseModal}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 40 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-2xl w-full bg-gradient-to-b from-[#1e1925] via-[#16121c] to-[#0e0b12] border-2 border-amber-300/40 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col cursor-default"
              >
                {/* Close Button */}
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/90 text-white text-xs font-semibold border border-white/20 transition-all"
                >
                  <X className="w-4 h-4" />
                  <span>Close</span>
                </button>

                {/* Top Header */}
                <div className="text-center border-b border-amber-300/20 pb-4 shrink-0">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold block">
                    EXCLUSIVE 27TH OCTOBER GIFTS
                  </span>
                  <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-white mt-1">
                    Special Gifts for Ramsha 🎁
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 mt-1">
                    Tap any gift card below to read its personal blessing and unlock your good-luck charm!
                  </p>
                </div>

                {/* Gifts List / Grid */}
                <div className="overflow-y-auto py-5 pr-1 space-y-3.5 flex-1 text-left">
                  {giftTokens.map((gift, idx) => {
                    const Icon = gift.icon;
                    const isSelected = selectedGift === idx;

                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          sound.playSparkle();
                          burstAt(0.5, 0.4);
                          setSelectedGift(isSelected ? null : idx);
                        }}
                        className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-neutral-800/90 border-amber-300 shadow-lg'
                            : 'bg-white/5 hover:bg-white/10 border-white/10'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gift.gradient} flex items-center justify-center text-white shrink-0 shadow-md`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-sm sm:text-base font-bold text-white">
                                {gift.title}
                              </h4>
                              <span className="text-[10px] text-amber-300 font-medium">
                                {gift.badge}
                              </span>
                            </div>
                          </div>
                          <span className="text-xs text-rose-400 font-semibold shrink-0">
                            {isSelected ? 'Hide Note' : 'Tap to Read'}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-neutral-300 mt-2.5 leading-relaxed">
                          {gift.desc}
                        </p>

                        {/* Expanded Personalized Note */}
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-3 pt-3 border-t border-white/10 text-xs sm:text-sm text-rose-200 bg-rose-500/10 p-3 rounded-xl font-serif italic"
                          >
                            &ldquo;{gift.note}&rdquo;
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Footer Modal Action */}
                <div className="pt-4 border-t border-amber-300/20 flex justify-center shrink-0">
                  <button
                    onClick={handleCloseModal}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold text-xs shadow-lg active:scale-95 transition-all"
                  >
                    <span>Done with Gifts</span>
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
