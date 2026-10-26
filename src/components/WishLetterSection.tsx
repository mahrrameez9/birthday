import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Copy, Check, Edit3, Sparkles } from 'lucide-react';
import { BirthdayConfig } from '../types';
import { sound } from '../utils/audio';
import { heartFlurry } from '../utils/confetti';

interface WishLetterSectionProps {
  config: BirthdayConfig;
  onOpenCustomize: () => void;
}

export const WishLetterSection: React.FC<WishLetterSectionProps> = ({
  config,
  onOpenCustomize,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const fullText = `Dearest ${config.recipientName},\n\n${config.heartfeltLetter}\n\nWith all my love,\n${config.senderName}`;
    navigator.clipboard.writeText(fullText);
    sound.playSparkle();
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleHeartBurst = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    sound.playConfettiPop();
    heartFlurry(
      (rect.left + rect.width / 2) / window.innerWidth,
      (rect.top + rect.height / 2) / window.innerHeight
    );
  };

  return (
    <section id="letter" className="py-20 px-4 sm:px-6 relative z-10 scroll-mt-16">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-neutral-400 mb-2">
            <span>Written from the Soul</span>
            <span aria-hidden="true">·</span>
            <span>Unfiltered Thoughts</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            A Letter for Your Birthday
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-400">
            Every word here was placed with love, admiration, and boundless wishes.
          </p>
        </div>

        {/* Editorial Stationery Letter Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="relative bg-gradient-to-b from-[#1c1924] to-[#121017] border border-rose-500/20 rounded-3xl p-6 sm:p-12 shadow-2xl overflow-hidden"
        >
          {/* Decorative Corner Accents */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-rose-400/30 rounded-tl-lg pointer-events-none" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-rose-400/30 rounded-tr-lg pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-rose-400/30 rounded-bl-lg pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-rose-400/30 rounded-br-lg pointer-events-none" />

          {/* Golden Wax Seal */}
          <div className="flex justify-center -mt-2 mb-6">
            <button
              onClick={handleHeartBurst}
              className="group relative cursor-pointer active:scale-95 transition-transform"
              title="Tap the seal to send love"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 via-rose-500 to-rose-700 flex items-center justify-center shadow-lg shadow-rose-900/50 border-2 border-amber-300/60 group-hover:scale-105 transition-all">
                <Heart className="w-6 h-6 text-amber-100 fill-amber-100 group-hover:scale-110 transition-transform" />
              </div>
              <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] text-amber-300/80 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Tap seal
              </span>
            </button>
          </div>

          {/* Letter Salutation */}
          <div className="mb-6 text-left border-b border-white/10 pb-4 flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-rose-400 font-semibold block mb-1">
                Dedication
              </span>
              <h3 className="font-cursive-calligraphy text-3xl sm:text-4xl text-rose-200">
                Dearest {config.recipientName},
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenCustomize}
                className="p-2 text-xs text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all flex items-center gap-1.5"
                title="Edit this letter"
              >
                <Edit3 className="w-3.5 h-3.5 text-rose-400" />
                <span className="hidden sm:inline">Edit Letter</span>
              </button>
              <button
                onClick={handleCopy}
                className="p-2 text-xs text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all flex items-center gap-1.5"
                title="Copy letter to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="hidden sm:inline text-emerald-400">Copied!</span>
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

          {/* Letter Content */}
          <div className="space-y-4 text-base sm:text-lg leading-relaxed text-neutral-200 font-normal">
            {config.heartfeltLetter.split('\n\n').map((paragraph, index) => (
              <p key={index} className="indent-4 sm:indent-6">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Letter Sign-off */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col items-end">
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">
              With all my affection,
            </span>
            <span className="font-cursive-calligraphy text-3xl sm:text-4xl text-amber-200 mt-1">
              {config.senderName}
            </span>
          </div>

          {/* Interactive footer within card */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleHeartBurst}
              className="inline-flex items-center gap-2 text-xs text-rose-300 hover:text-rose-200 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tap to celebrate this message with hearts</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
