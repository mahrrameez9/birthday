import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Heart, Sparkles, X, Copy, Check, Edit3, Volume2 } from 'lucide-react';
import { BirthdayConfig } from '../types';
import { sound } from '../utils/audio';
import { heartFlurry, burstAt } from '../utils/confetti';

interface InteractiveLetterBoxProps {
  config: BirthdayConfig;
  onOpenCustomize: () => void;
}

export const InteractiveLetterBox: React.FC<InteractiveLetterBoxProps> = ({
  config,
  onOpenCustomize,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleOpenEnvelope = () => {
    sound.playGiftUnbox();
    heartFlurry(0.5, 0.4);
    setIsOpen(true);
  };

  const handleCloseEnvelope = () => {
    sound.playSparkle();
    setIsOpen(false);
  };

  const handleCopy = () => {
    const fullText = `Dearest ${config.recipientName},\n\n${config.heartfeltLetter}\n\nWith all my love,\n${config.senderName}`;
    navigator.clipboard.writeText(fullText);
    sound.playSparkle();
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSealTap = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    sound.playConfettiPop();
    burstAt(
      (rect.left + rect.width / 2) / window.innerWidth,
      (rect.top + rect.height / 2) / window.innerHeight
    );
  };

  return (
    <section id="letter" className="py-20 px-4 sm:px-6 relative z-10 scroll-mt-16">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-neutral-400 mb-2">
            <span>Special Delivery</span>
            <span aria-hidden="true">·</span>
            <span>Sealed With Love</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            The Royal Birthday Letterbox
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-xl mx-auto">
            A handwritten, wax-sealed letter has arrived in your private postbox. Tap the envelope to unlock its contents.
          </p>
        </div>

        {/* 3D Interactive Letter Box Stage */}
        <div className="max-w-xl mx-auto bg-neutral-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col items-center">
          <div
            onClick={handleOpenEnvelope}
            className="group relative cursor-pointer flex flex-col items-center w-full max-w-sm transition-transform active:scale-95"
          >
            {/* Ambient Envelope Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-rose-500/20 via-amber-500/20 to-purple-500/20 rounded-3xl blur-2xl group-hover:opacity-100 opacity-60 transition-opacity" />

            {/* Handcrafted Postal Mail Envelope SVG */}
            <div className="relative w-72 sm:w-80 h-52 sm:h-56">
              <svg
                viewBox="0 0 320 220"
                className="w-full h-full drop-shadow-[0_15px_35px_rgba(244,63,94,0.35)] group-hover:-translate-y-2 transition-transform duration-300"
              >
                <defs>
                  <linearGradient id="envelopeBody" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2e2738" />
                    <stop offset="50%" stopColor="#201b27" />
                    <stop offset="100%" stopColor="#141119" />
                  </linearGradient>
                  <linearGradient id="envelopeFlap" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#433952" />
                    <stop offset="100%" stopColor="#282233" />
                  </linearGradient>
                  <linearGradient id="goldWax" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fef08a" />
                    <stop offset="50%" stopColor="#eab308" />
                    <stop offset="100%" stopColor="#a16207" />
                  </linearGradient>
                </defs>

                {/* Envelope Base Shadow */}
                <ellipse cx="160" cy="205" rx="140" ry="12" fill="#000000" opacity="0.4" />

                {/* Envelope Body */}
                <rect x="20" y="30" width="280" height="170" rx="12" fill="url(#envelopeBody)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />

                {/* Inner Fold Lines */}
                <path d="M20 30 L160 135 L300 30" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" fill="none" />
                <path d="M20 200 L120 125" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
                <path d="M300 200 L200 125" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />

                {/* Postal Stamps & Airmail Decal */}
                <rect x="235" y="45" width="45" height="35" rx="3" fill="#be123c" opacity="0.8" stroke="#fda4af" strokeWidth="1" />
                <circle cx="257" cy="62" r="10" stroke="#fda4af" strokeWidth="1" fill="none" strokeDasharray="2,2" />
                <text x="257" y="66" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">VIP</text>

                {/* Recipient Addressee Typography */}
                <text x="50" y="80" fill="#f472b6" fontSize="10" letterSpacing="2" fontWeight="600">CONFIDENTIAL DISPATCH</text>
                <text x="50" y="105" fill="#fef08a" fontSize="16" fontFamily="serif" fontWeight="bold">To: {config.recipientName}</text>
                <text x="50" y="125" fill="#9ca3af" fontSize="11">From: {config.senderName} · With Love</text>

                {/* Gold Wax Seal Stamp in Center */}
                <g className="filter drop-shadow-lg">
                  <circle cx="160" cy="135" r="24" fill="url(#goldWax)" stroke="#fef08a" strokeWidth="1.5" />
                  <circle cx="160" cy="135" r="18" fill="none" stroke="#713f12" strokeWidth="1" opacity="0.6" />
                  <path
                    d="M160 143 C155 138 150 133 150 129 C150 126 153 124 156 124 C158 124 159 125 160 127 C161 125 162 124 164 124 C167 124 170 126 170 129 C170 133 165 138 160 143 Z"
                    fill="#713f12"
                  />
                </g>
              </svg>
            </div>

            {/* Tap Affordance */}
            <div className="mt-4 flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-rose-500/20 to-amber-500/20 border border-rose-400/30 rounded-full text-rose-300 text-xs font-semibold group-hover:scale-105 transition-all">
              <Mail className="w-4 h-4 text-amber-300" />
              <span>Tap to Break Wax Seal & Read Letter</span>
            </div>
            <p className="mt-2 text-xs text-neutral-400">
              Interactive 3D opening letter box
            </p>
          </div>
        </div>

        {/* POPUP FULL-SCREEN LUXURY LETTER MODAL */}
        <AnimatePresence>
          {isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-lg">
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 50 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative w-full max-w-2xl bg-gradient-to-b from-[#1f1a26] via-[#17131d] to-[#0f0c13] border-2 border-amber-300/40 rounded-3xl p-6 sm:p-12 shadow-[0_25px_60px_-15px_rgba(244,63,94,0.4)] overflow-hidden max-h-[90vh] flex flex-col"
              >
                {/* Vintage Gilded Corner Accents */}
                <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-amber-400/60 rounded-tl-xl pointer-events-none" />
                <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-amber-400/60 rounded-tr-xl pointer-events-none" />
                <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-amber-400/60 rounded-bl-xl pointer-events-none" />
                <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-amber-400/60 rounded-br-xl pointer-events-none" />

                {/* Close Button */}
                <button
                  onClick={handleCloseEnvelope}
                  className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors z-20"
                  title="Fold letter back into envelope"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Top Toolbar */}
                <div className="flex items-center justify-between border-b border-amber-300/20 pb-4 shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400">✨</span>
                    <span className="text-xs font-semibold tracking-widest uppercase text-amber-300">
                      Handwritten Epistle
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mr-8">
                    <button
                      onClick={onOpenCustomize}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-neutral-300 hover:text-white transition-colors"
                      title="Edit this message"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-rose-400" />
                      <span className="hidden sm:inline">Edit Letter</span>
                    </button>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-neutral-300 hover:text-white transition-colors"
                      title="Copy letter text"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-semibold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Scrollable Letter Body */}
                <div className="overflow-y-auto py-6 pr-2 space-y-6 flex-1 text-left">
                  {/* Salutation */}
                  <div>
                    <span className="font-cursive-calligraphy text-4xl sm:text-5xl text-rose-200 block drop-shadow">
                      Dearest {config.recipientName},
                    </span>
                    <div className="w-24 h-0.5 bg-gradient-to-r from-amber-400 to-transparent mt-2" />
                  </div>

                  {/* Letter Paragraphs with beautiful typography */}
                  <div className="space-y-4 text-base sm:text-lg leading-relaxed text-neutral-200 font-normal">
                    {config.heartfeltLetter.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="first-letter:text-2xl first-letter:font-serif first-letter:text-amber-300 first-letter:font-bold">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Sign-Off with Wax Seal */}
                  <div className="pt-8 border-t border-amber-300/20 flex items-center justify-between">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold block">
                        Forever in your corner,
                      </span>
                      <span className="font-cursive-calligraphy text-3xl sm:text-4xl text-amber-200 block mt-1">
                        {config.senderName}
                      </span>
                    </div>

                    {/* Interactive Wax Stamp */}
                    <button
                      onClick={handleSealTap}
                      className="group cursor-pointer flex flex-col items-center"
                      title="Tap to explode love hearts"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 via-rose-500 to-rose-700 flex items-center justify-center shadow-lg border-2 border-amber-300 group-hover:scale-110 transition-transform">
                        <Heart className="w-5 h-5 text-amber-100 fill-amber-100" />
                      </div>
                      <span className="text-[10px] text-amber-300/80 mt-1">Tap stamp</span>
                    </button>
                  </div>
                </div>

                {/* Footer Modal Action */}
                <div className="pt-4 border-t border-amber-300/20 flex justify-center shrink-0">
                  <button
                    onClick={handleCloseEnvelope}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold text-xs shadow-lg active:scale-95 transition-all"
                  >
                    <span>Fold Letter Back into Envelope</span>
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
