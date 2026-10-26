import React from 'react';
import { Heart, Sparkles, SlidersHorizontal, ArrowUp } from 'lucide-react';
import { BirthdayConfig } from '../types';

interface FooterProps {
  config: BirthdayConfig;
  onOpenCustomize: () => void;
}

export const Footer: React.FC<FooterProps> = ({ config, onOpenCustomize }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-neutral-950/90 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Dedication */}
        <div className="text-center md:text-left space-y-1">
          <div className="font-serif-display text-lg font-bold text-white flex items-center justify-center md:justify-start gap-2">
            <Sparkles className="w-4 h-4 text-rose-400" />
            <span>Celestial Birthday Wishes</span>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-2 text-xs text-neutral-400">
            <span>Crafted for {config.recipientName}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              With <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" /> from {config.senderName}
            </span>
          </div>
        </div>

        {/* Quick Nav Anchors */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-400">
          <a href="#hero" className="hover:text-white transition-colors">
            Celebration
          </a>
          <a href="#cake" className="hover:text-white transition-colors">
            Birthday Cake
          </a>
          <a href="#surprise" className="hover:text-white transition-colors">
            Gift Box
          </a>
          <a href="#letter" className="hover:text-white transition-colors">
            Letterbox
          </a>
          <a href="#gallery" className="hover:text-white transition-colors">
            Visions
          </a>
          <a href="#wishes" className="hover:text-white transition-colors">
            Constellation
          </a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCustomize}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-rose-400" />
            <span>Customize</span>
          </button>

          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="p-2 text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
            title="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
