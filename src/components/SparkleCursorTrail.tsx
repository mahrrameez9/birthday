import React, { useEffect, useState } from 'react';

interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export const SparkleCursorTrail: React.FC = () => {
  const [particles, setParticles] = useState<SparkleParticle[]>([]);

  useEffect(() => {
    let idCounter = 0;
    const colors = ['#f43f5e', '#fbbf24', '#f472b6', '#38bdf8', '#ffffff', '#ffd700'];

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      // Throttle slightly
      if (Math.random() > 0.45) return;

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const newParticle: SparkleParticle = {
        id: ++idCounter,
        x: clientX + (Math.random() * 12 - 6),
        y: clientY + (Math.random() * 12 - 6),
        size: Math.random() * 7 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
      };

      setParticles((prev) => [...prev.slice(-18), newParticle]);

      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
      }, 700);
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full animate-ping pointer-events-none"
          style={{
            left: p.x - p.size / 2,
            top: p.y - p.size / 2,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 8px 1px ${p.color}`,
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            opacity: 0.8,
          }}
        />
      ))}
    </div>
  );
};
