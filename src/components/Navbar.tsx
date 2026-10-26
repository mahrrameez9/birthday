import React from 'react';
import { Volume2, VolumeX, Sparkles, SlidersHorizontal } from 'lucide-react';
import { sound } from '../utils/audio';
import { fireFullCelebration } from '../utils/confetti';

interface NavbarProps {
  onOpenCustomize: () => void;
  onReplayMystery: () => void;
  isMelodyPlaying: boolean;
  setIsMelodyPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCustomize,
  onReplayMystery,
  isMelodyPlaying,
  setIsMelodyPlaying,
}) => {
  const toggleSound = () => {
    sound.toggleCelebratoryMelody((playing) => {
      setIsMelodyPlaying(playing);
    });
  };

  const handleBurstCelebration = () => {
    sound.playConfettiPop();
    fireFullCelebration();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a
          href="#top"
          className="font-serif-display text-lg sm:text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-rose-300 transition-colors flex items-center gap-2"
        >
          <span className="text-rose-400">✨</span>
          <span>Celestial Wishes</span>
        </a>

        {/* Zone 2: Clean Single-Line Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-neutral-300">
          <a
            href="#hero"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Celebration
          </a>
          <a
            href="#cake"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Cake
          </a>
          <a
            href="#surprise"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Gift Box
          </a>
          <a
            href="#letter"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Letterbox
          </a>
          <a
            href="#gallery"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Visions
          </a>
          <a
            href="#wishes"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Constellation
          </a>
        </nav>

        {/* Zone 3: Actions (Sound toggle, Customize, Celebrate CTA) */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Audio Chime Toggle */}
          <button
            onClick={toggleSound}
            aria-label={isMelodyPlaying ? 'Mute celebratory music' : 'Play celebratory music'}
            title={isMelodyPlaying ? 'Mute Music' : 'Play Celebration Melody'}
            className={`p-2 rounded-lg text-xs font-medium transition-all ${
              isMelodyPlaying
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                : 'bg-white/5 text-neutral-400 hover:text-white border border-white/10 hover:bg-white/10'
            }`}
          >
            {isMelodyPlaying ? (
              <Volume2 className="w-4 h-4 animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* Mystery English Paper Prank Replay Button */}
          <button
            onClick={onReplayMystery}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-amber-300 bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/20 rounded-lg transition-all active:scale-95 whitespace-nowrap shrink-0"
            title="Replay Leaked English Paper Prank"
          >
            <span>📝 English Paper Prank</span>
          </button>

          {/* Customize Button */}
          <button
            onClick={onOpenCustomize}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-200 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all active:scale-95 whitespace-nowrap shrink-0"
            title="Edit recipient, name and letter"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">Customize</span>
          </button>

          {/* Primary Action Button */}
          <button
            onClick={handleBurstCelebration}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 rounded-lg shadow-sm shadow-rose-500/20 active:scale-95 transition-all whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Celebrate!</span>
          </button>
        </div>
      </div>
    </header>
  );
};
