/**
 * Synthesized Web Audio Engine for Celebratory Sound Effects and Birthday Chimes.
 * Requires no external audio assets; 100% reliable across all modern browsers.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private melodyInterval: number | null = null;
  private isMelodyPlaying: boolean = false;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.isMelodyPlaying) {
      this.stopCelebratoryMelody();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public playSparkle() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C5, E5, G5, C6, E6
    notes.forEach((freq, index) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + index * 0.06);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime + index * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + index * 0.06 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + index * 0.06 + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + index * 0.06);
      osc.stop(this.ctx.currentTime + index * 0.06 + 0.4);
    });
  }

  public playConfettiPop() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.15);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.22);

    // Complementary shimmer
    setTimeout(() => this.playSparkle(), 80);
  }

  public playCandleBlow() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Whoosh / breath noise
    const bufferSize = this.ctx.sampleRate * 0.4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.exponentialRampToValueAtTime(200, now + 0.35);
    filter.Q.value = 3;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(now);
    noise.stop(now + 0.4);
  }

  public playGiftUnbox() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Pleasant harp roll
    const freqs = [392.0, 523.25, 659.25, 783.99, 1046.5];
    freqs.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.01, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.08 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.55);
    });
  }

  public playHappyBirthdayNotes() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    // Melody: Happy Birthday (G4 G4 A4 G4 C5 B4 | G4 G4 A4 G4 D5 C5)
    // Notes frequencies
    const notes: Array<[number, number]> = [
      [392.0, 0.3], // G4
      [392.0, 0.3], // G4
      [440.0, 0.5], // A4
      [392.0, 0.5], // G4
      [523.25, 0.5], // C5
      [493.88, 0.8], // B4
    ];

    let currentOffset = 0;
    const now = this.ctx.currentTime;

    notes.forEach(([freq, duration]) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + currentOffset);

      gain.gain.setValueAtTime(0.001, now + currentOffset);
      gain.gain.linearRampToValueAtTime(0.09, now + currentOffset + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + currentOffset + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + currentOffset);
      osc.stop(now + currentOffset + duration + 0.05);

      currentOffset += duration + 0.05;
    });
  }

  public toggleCelebratoryMelody(onStateChange?: (playing: boolean) => void) {
    if (this.isMelodyPlaying) {
      this.stopCelebratoryMelody();
      onStateChange?.(false);
    } else {
      this.startCelebratoryMelody();
      onStateChange?.(true);
    }
  }

  public startCelebratoryMelody() {
    this.initCtx();
    this.isMuted = false;
    this.isMelodyPlaying = true;
    this.playHappyBirthdayNotes();

    if (this.melodyInterval) {
      clearInterval(this.melodyInterval);
    }

    this.melodyInterval = window.setInterval(() => {
      if (this.isMelodyPlaying && !this.isMuted) {
        this.playHappyBirthdayNotes();
      }
    }, 4500);
  }

  public stopCelebratoryMelody() {
    this.isMelodyPlaying = false;
    if (this.melodyInterval) {
      clearInterval(this.melodyInterval);
      this.melodyInterval = null;
    }
  }

  public getIsMelodyPlaying(): boolean {
    return this.isMelodyPlaying;
  }
}

export const sound = new SoundEngine();
