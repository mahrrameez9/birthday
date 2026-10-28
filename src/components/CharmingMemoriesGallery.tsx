import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Maximize2, X, Heart } from 'lucide-react';
import { sound } from '../utils/audio';
import { burstAt } from '../utils/confetti';

import castleImg from '../assets/images/celestial_starlight_castle_1793032396869.jpg';
import champagneImg from '../assets/images/luxury_champagne_roses_1793032397866.jpg';
import lanternsImg from '../assets/images/floating_sky_lanterns_1793032398628.jpg';
import bouquetImg from '../assets/images/blush_peonies_bouquet_1793032398385.jpg';

interface PhotoItem {
  id: string;
  src: string;
  title: string;
  subtitle: string;
  tag: string;
  rotation: string;
}

const GALLERY_PHOTOS: PhotoItem[] = [
  {
    id: 'castle',
    src: castleImg,
    title: 'Fairytale Horizons',
    subtitle: 'May your next chapter unfold like the dreamiest, most breathtaking storybook.',
    tag: 'Wonder & Magic',
    rotation: '-rotate-1',
  },
  {
    id: 'champagne',
    src: champagneImg,
    title: 'A Toast to Your Elegance',
    subtitle: 'Here’s to laughter that makes you tear up and celebrations that never fade.',
    tag: 'Joy & Radiance',
    rotation: 'rotate-1',
  },
  {
    id: 'lanterns',
    src: lanternsImg,
    title: 'Wishes Written in the Stars',
    subtitle: 'A thousand lanterns sent to the heavens, each carrying a quiet blessing for you.',
    tag: 'Serenity & Hope',
    rotation: '-rotate-2',
  },
  {
    id: 'bouquet',
    src: bouquetImg,
    title: 'Bloom with Grace',
    subtitle: 'Gentle like petals, resilient like stems, and radiant like morning sunshine.',
    tag: 'Everlasting Bloom',
    rotation: 'rotate-2',
  },
];

export const CharmingMemoriesGallery: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);

  const handleOpenPhoto = (photo: PhotoItem, e: React.MouseEvent) => {
    sound.playSparkle();
    const rect = e.currentTarget.getBoundingClientRect();
    burstAt(
      (rect.left + rect.width / 2) / window.innerWidth,
      (rect.top + rect.height / 2) / window.innerHeight
    );
    setActivePhoto(photo);
  };

  const handleClosePhoto = () => {
    sound.playSparkle();
    setActivePhoto(null);
  };

  // Escape key to dismiss
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActivePhoto(null);
      }
    };
    if (activePhoto) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhoto]);

  return (
    <section id="gallery" className="py-20 px-4 sm:px-6 relative z-10 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-neutral-400 mb-2">
            <span>Visual Reverie</span>
            <span aria-hidden="true">·</span>
            <span>Charming Visions</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Visions of Beauty & Magic
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-xl mx-auto">
            A curated gallery of charming scenes capturing the warmth, wonder, and elegance of this celebration.
          </p>
        </div>

        {/* 4-Item Visual Bento / Polaroid Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GALLERY_PHOTOS.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={(e) => handleOpenPhoto(photo, e)}
              className={`group relative bg-neutral-900/80 border border-white/10 hover:border-rose-400/40 rounded-3xl p-3.5 shadow-xl cursor-pointer hover:shadow-rose-500/10 transition-all duration-300 ${photo.rotation} hover:rotate-0 hover:scale-[1.03]`}
            >
              {/* Photo Frame Container */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-950">
                <img
                  src={photo.src}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Corner Tag */}
                <span className="absolute top-3 left-3 text-[10px] font-semibold text-white/90 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
                  {photo.tag}
                </span>

                {/* Maximize Icon */}
                <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              {/* Caption */}
              <div className="mt-3.5 px-1 pb-1">
                <h3 className="font-serif-display text-base font-bold text-white group-hover:text-rose-200 transition-colors">
                  {photo.title}
                </h3>
                <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                  {photo.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal with Backdrop Dismiss & Keyboard Close */}
        <AnimatePresence>
          {activePhoto && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md cursor-pointer"
              onClick={handleClosePhoto}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-3xl w-full bg-neutral-900 border border-white/20 rounded-3xl overflow-hidden shadow-2xl cursor-default"
              >
                {/* Prominent Close Button */}
                <button
                  onClick={handleClosePhoto}
                  className="absolute top-4 right-4 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 hover:bg-black/90 text-white text-xs font-semibold backdrop-blur-md border border-white/20 transition-all active:scale-95 shadow-lg"
                  aria-label="Close photo preview"
                >
                  <X className="w-4 h-4" />
                  <span>Close</span>
                </button>

                <div className="aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-neutral-950 relative">
                  <img
                    src={activePhoto.src}
                    alt={activePhoto.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-80" />
                </div>

                <div className="p-5 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-neutral-900">
                  <div>
                    <span className="text-xs font-semibold text-rose-400 uppercase tracking-widest">
                      {activePhoto.tag}
                    </span>
                    <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-white mt-0.5">
                      {activePhoto.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-xl">
                      {activePhoto.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        sound.playSparkle();
                        burstAt(0.5, 0.5);
                      }}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-semibold shadow-lg hover:from-rose-600 hover:to-pink-600 transition-all active:scale-95 whitespace-nowrap shrink-0"
                    >
                      <Heart className="w-4 h-4 fill-white" />
                      <span>Send Love</span>
                    </button>
                    <button
                      onClick={handleClosePhoto}
                      className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-neutral-300 text-xs font-medium transition-all"
                    >
                      Done
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
