import { motion, useScroll, useTransform } from 'motion/react';
import React, { useMemo } from 'react';
import { BirthdayConfig } from '../types';

interface BackgroundParallaxProps {
  theme: BirthdayConfig['theme'];
}

export const BackgroundParallax: React.FC<BackgroundParallaxProps> = ({ theme }) => {
  const { scrollY } = useScroll();

  // Multi-tier parallax offsets
  const yBg = useTransform(scrollY, [0, 2000], [0, -120]);
  const yMid = useTransform(scrollY, [0, 2000], [0, -280]);
  const yFore = useTransform(scrollY, [0, 2000], [0, -450]);

  // Theme palettes
  const themeGradients = useMemo(() => {
    switch (theme) {
      case 'celestial-gold':
        return {
          blob1: 'from-amber-600/20 via-yellow-500/10 to-transparent',
          blob2: 'from-yellow-400/15 via-amber-800/10 to-transparent',
          blob3: 'from-amber-500/10 via-orange-600/10 to-transparent',
          accent: 'rgba(251, 191, 36, 0.15)',
        };
      case 'dreamy-lavender':
        return {
          blob1: 'from-purple-600/20 via-fuchsia-500/10 to-transparent',
          blob2: 'from-indigo-500/15 via-violet-800/10 to-transparent',
          blob3: 'from-pink-500/10 via-purple-700/10 to-transparent',
          accent: 'rgba(192, 132, 252, 0.15)',
        };
      case 'emerald-luxury':
        return {
          blob1: 'from-emerald-600/20 via-teal-500/10 to-transparent',
          blob2: 'from-emerald-400/15 via-teal-900/10 to-transparent',
          blob3: 'from-amber-500/10 via-emerald-700/10 to-transparent',
          accent: 'rgba(52, 211, 153, 0.15)',
        };
      case 'midnight-rose':
      default:
        return {
          blob1: 'from-rose-600/20 via-pink-500/10 to-transparent',
          blob2: 'from-rose-400/15 via-amber-700/10 to-transparent',
          blob3: 'from-fuchsia-600/10 via-rose-900/10 to-transparent',
          accent: 'rgba(244, 114, 182, 0.15)',
        };
    }
  }, [theme]);

  // Generate static star coordinates
  const stars = useMemo(() => {
    return Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      x: (i * 19.3) % 100,
      y: (i * 23.7) % 100,
      size: (i % 3) + 1.5,
      delay: (i * 0.27) % 4,
      duration: 2.5 + ((i * 0.4) % 3),
      opacity: 0.3 + ((i % 5) * 0.15),
    }));
  }, []);

  // Floating celebratory orbs
  const floatingOrbs = useMemo(() => {
    return [
      { left: '10%', top: '15%', size: 280, color: 'bg-rose-500/10' },
      { left: '80%', top: '25%', size: 360, color: 'bg-amber-400/10' },
      { left: '20%', top: '55%', size: 320, color: 'bg-pink-600/10' },
      { left: '75%', top: '75%', size: 400, color: 'bg-purple-600/10' },
    ];
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Dynamic Aurora Glows */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 transition-colors duration-1000"
      >
        <div
          className={`absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[140px] bg-gradient-to-tr ${themeGradients.blob1} animate-float-slow`}
        />
        <div
          className={`absolute top-1/3 -right-40 w-[650px] h-[650px] rounded-full blur-[160px] bg-gradient-to-bl ${themeGradients.blob2} animate-float-medium`}
        />
        <div
          className={`absolute bottom-10 left-1/4 w-[700px] h-[700px] rounded-full blur-[150px] bg-gradient-to-t ${themeGradients.blob3} animate-float-reverse`}
        />
      </motion.div>

      {/* Midground Subtle Bokeh Orbs */}
      <motion.div style={{ y: yMid }} className="absolute inset-0">
        {floatingOrbs.map((orb, index) => (
          <div
            key={index}
            className={`absolute rounded-full blur-3xl ${orb.color}`}
            style={{
              left: orb.left,
              top: orb.top,
              width: orb.size,
              height: orb.size,
            }}
          />
        ))}
      </motion.div>

      {/* Foreground Twinkling Stars & Dust */}
      <motion.div style={{ y: yFore }} className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
              boxShadow: `0 0 6px 1px rgba(255, 255, 255, ${star.opacity})`,
            }}
          />
        ))}

        {/* Ambient floating golden dust particles */}
        <div className="absolute top-1/4 left-1/3 w-1.5 h-1.5 rounded-full bg-amber-300/40 blur-[0.5px] animate-float-slow" />
        <div className="absolute top-2/3 right-1/4 w-2 h-2 rounded-full bg-rose-300/40 blur-[0.5px] animate-float-medium" />
        <div className="absolute top-1/2 left-3/4 w-1 h-1 rounded-full bg-yellow-200/50 blur-[0.5px] animate-float-reverse" />
      </motion.div>

      {/* Subtle grid texture overlay for modern depth */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  );
};
