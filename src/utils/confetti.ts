import confetti from 'canvas-confetti';

export function fireFullCelebration() {
  const duration = 3.5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval: ReturnType<typeof setInterval> = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // since particles fall down, start a bit higher than random
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ['#f43f5e', '#ec4899', '#fbbf24', '#a855f7', '#38bdf8', '#ffd700']
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#f43f5e', '#ec4899', '#fbbf24', '#a855f7', '#38bdf8', '#ffd700']
    });
  }, 250);
}

export function burstAt(xRatio: number, yRatio: number) {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { x: xRatio, y: yRatio },
    colors: ['#fb7185', '#f43f5e', '#fbbf24', '#c084fc', '#fde047'],
    disableForReducedMotion: true,
    zIndex: 9999
  });
}

export function heartFlurry(xRatio = 0.5, yRatio = 0.5) {
  confetti({
    particleCount: 50,
    spread: 60,
    origin: { x: xRatio, y: yRatio },
    shapes: ['circle'],
    colors: ['#fda4af', '#f43f5e', '#e11d48', '#fb7185', '#ffe4e6'],
    scalar: 1.2,
    zIndex: 9999
  });
}

export function goldEmberBurst(xRatio = 0.5, yRatio = 0.5) {
  confetti({
    particleCount: 60,
    spread: 80,
    startVelocity: 25,
    origin: { x: xRatio, y: yRatio },
    colors: ['#fbbf24', '#f59e0b', '#d97706', '#fef08a', '#ffffff'],
    scalar: 0.9,
    ticks: 80,
    zIndex: 9999
  });
}

export function starsBlast() {
  confetti({
    particleCount: 100,
    spread: 100,
    origin: { y: 0.6 },
    colors: ['#fde047', '#f472b6', '#38bdf8', '#a78bfa', '#ffffff'],
    zIndex: 9999
  });
}
