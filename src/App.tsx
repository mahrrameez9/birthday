import { useState, useEffect } from 'react';
import { BirthdayConfig } from './types';
import { loadConfig, saveConfig, generateShareableUrl } from './utils/urlConfig';
import { sound } from './utils/audio';
import { fireFullCelebration } from './utils/confetti';
import { BackgroundParallax } from './components/BackgroundParallax';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { InteractiveCake } from './components/InteractiveCake';
import { InteractiveSurpriseBox } from './components/InteractiveSurpriseBox';
import { InteractiveLetterBox } from './components/InteractiveLetterBox';
import { CharmingMemoriesGallery } from './components/CharmingMemoriesGallery';
import { ConstellationWishes } from './components/ConstellationWishes';
import { CelebrationReactionWall } from './components/CelebrationReactionWall';
import { Footer } from './components/Footer';
import { CustomizationModal } from './components/CustomizationModal';
import { MysteryQuestIntro } from './components/MysteryQuestIntro';
import { SparkleCursorTrail } from './components/SparkleCursorTrail';
import { Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [config, setConfig] = useState<BirthdayConfig>(loadConfig);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [showMysteryIntro, setShowMysteryIntro] = useState(true);
  const [isMelodyPlaying, setIsMelodyPlaying] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync title when config updates
  useEffect(() => {
    document.title = `Happy Birthday, ${config.recipientName}! ✨`;
  }, [config.recipientName]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveConfig = (newConfig: BirthdayConfig) => {
    setConfig(newConfig);
    saveConfig(newConfig);
    showToast('✨ Birthday wishes updated beautifully!');
    sound.playConfettiPop();
  };

  const handleShare = () => {
    const url = generateShareableUrl(config);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      sound.playSparkle();
      showToast('🔗 Personalized birthday link copied to clipboard!');
    }
  };

  const triggerCelebration = () => {
    sound.playConfettiPop();
    fireFullCelebration();
  };

  const handleMysteryComplete = () => {
    setShowMysteryIntro(false);
    // Auto-start celebratory music after passing the prank
    sound.startCelebratoryMelody();
    setIsMelodyPlaying(true);
  };

  return (
    <div className="min-h-screen text-neutral-100 relative selection:bg-rose-500/30 selection:text-rose-200">
      {/* Interactive Cursor / Touch Sparkle Trail */}
      <SparkleCursorTrail />

      {/* Gamified Mystery Verification Quest (Confusing / Frustrating Prank Intro) */}
      <AnimatePresence>
        {showMysteryIntro && (
          <MysteryQuestIntro
            recipientName={config.recipientName}
            onComplete={handleMysteryComplete}
          />
        )}
      </AnimatePresence>

      {/* Dynamic Parallax Background Layers */}
      <BackgroundParallax theme={config.theme} />

      {/* Top Navigation */}
      <Navbar
        onOpenCustomize={() => setIsCustomizeOpen(true)}
        onReplayMystery={() => setShowMysteryIntro(true)}
        isMelodyPlaying={isMelodyPlaying}
        setIsMelodyPlaying={setIsMelodyPlaying}
      />

      {/* Main Content Flow */}
      <main id="top" className="relative z-10">
        {/* 1. Hero Celebration Section */}
        <HeroSection
          config={config}
          onOpenCustomize={() => setIsCustomizeOpen(true)}
          onShare={handleShare}
        />

        {/* 2. Interactive Birthday Cake with Candle Blowing */}
        <InteractiveCake recipientName={config.recipientName} />

        {/* 3. Interactive 3D Gift Box Unwrapping */}
        <InteractiveSurpriseBox recipientName={config.recipientName} />

        {/* 4. Luxury Pop-up Letterbox with 3D Envelope */}
        <InteractiveLetterBox
          config={config}
          onOpenCustomize={() => setIsCustomizeOpen(true)}
        />

        {/* 5. Charming Visual Reverie / Aesthetic Gallery */}
        <CharmingMemoriesGallery />

        {/* 6. Constellation of 6 Interactive Blessings */}
        <ConstellationWishes wishes={config.wishes} />

        {/* 7. Live Reaction Wall & Greeting Generator */}
        <CelebrationReactionWall
          config={config}
          onShare={handleShare}
        />
      </main>

      {/* Editorial Footer */}
      <Footer
        config={config}
        onOpenCustomize={() => setIsCustomizeOpen(true)}
      />

      {/* Instant Customization Modal */}
      <CustomizationModal
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        config={config}
        onSave={handleSaveConfig}
      />

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-neutral-900/95 border border-rose-500/30 rounded-2xl shadow-2xl backdrop-blur-md text-sm text-white"
          >
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-medium">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Mobile Celebration Fab */}
      <div className="sm:hidden fixed bottom-5 right-5 z-40">
        <button
          onClick={triggerCelebration}
          className="w-12 h-12 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 text-white shadow-xl flex items-center justify-center active:scale-90 transition-transform border border-white/20"
          aria-label="Celebrate with confetti"
        >
          <Sparkles className="w-5 h-5 animate-spin" />
        </button>
      </div>
    </div>
  );
}
