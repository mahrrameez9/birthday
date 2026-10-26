import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, AlertTriangle, ArrowRight, CheckCircle2, Moon, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';
import { burstAt, fireFullCelebration } from '../utils/confetti';

interface MysteryQuestIntroProps {
  recipientName: string;
  onComplete: () => void;
}

export const MysteryQuestIntro: React.FC<MysteryQuestIntroProps> = ({
  recipientName,
  onComplete,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [dodgeCount, setDodgeCount] = useState<number>(0);
  const [dodgeOffset, setDodgeOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [funnyTaunt, setFunnyTaunt] = useState<string>('Unlock Leaked English Guess Paper');
  const [wrongButtonOffset, setWrongButtonOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [countdown, setCountdown] = useState<number>(3);

  // Phase 1: Dodging Exam Paper Button
  const handleDodgeAttempt = () => {
    sound.playSparkle();
    const nextCount = dodgeCount + 1;
    setDodgeCount(nextCount);

    if (nextCount === 1) {
      setDodgeOffset({ x: 80, y: -40 });
      setFunnyTaunt('⚡ Checking Shakespeare citations... Too slow!');
    } else if (nextCount === 2) {
      setDodgeOffset({ x: -90, y: 35 });
      setFunnyTaunt('📖 Grammar police alert! Almost had it!');
    } else if (nextCount === 3) {
      setDodgeOffset({ x: 45, y: 65 });
      setFunnyTaunt('💨 Analyzing Essay Topics... Catch me!');
    } else {
      setDodgeOffset({ x: 0, y: 0 });
      setFunnyTaunt('✨ OKAY OKAY! Paper Decrypted! Click Now!');
    }
  };

  const handleStep1Success = () => {
    if (dodgeCount < 3) {
      handleDodgeAttempt();
      return;
    }
    sound.playConfettiPop();
    setStep(2);
  };

  // Phase 2: English Exam Riddle
  const handleCorrectAnswer = () => {
    sound.playConfettiPop();
    setStep(3);
    startOverloadSequence();
  };

  const handleDodgeWrongOption = () => {
    sound.playSparkle();
    const rx = (Math.random() * 140 - 70);
    const ry = (Math.random() * 60 - 30);
    setWrongButtonOffset({ x: rx, y: ry });
  };

  // Phase 3: Dramatic Glitch & Grand Birthday Reveal
  const startOverloadSequence = () => {
    let count = 3;
    setCountdown(count);

    const interval = setInterval(() => {
      count -= 1;
      setCountdown(count);
      sound.playSparkle();

      if (count <= 0) {
        clearInterval(interval);
        setStep(4);
        sound.playConfettiPop();
        fireFullCelebration();
        setTimeout(() => {
          onComplete();
        }, 2400);
      }
    }, 950);
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/95 backdrop-blur-xl flex items-center justify-center p-4 select-none">
      {/* Background Matrix/Glitch Grid */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #f43f5e 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Skip Button */}
      <button
        onClick={onComplete}
        className="absolute top-6 right-6 text-xs text-neutral-400 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors z-50"
      >
        Skip Exam Prank →
      </button>

      <div className="relative w-full max-w-xl bg-neutral-900 border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl text-center overflow-hidden">
        {/* Top Official Banner */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-rose-500 to-sky-400" />

        <AnimatePresence mode="wait">
          {/* STEP 1: Leaked English Paper Verification */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                <FileText className="w-8 h-8 animate-pulse" />
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-semibold">
                  CONFIDENTIAL · BOARD EXAMINATION 2026
                </span>
                <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-white mt-1">
                  Urgent: Leaked English Guess Paper
                </h3>
                <div className="mt-2.5 inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg border border-white/10 text-xs text-neutral-300">
                  <span>Candidate: <strong className="text-rose-300">{recipientName}</strong></span>
                  <span>·</span>
                  <span>Exam Date: <strong className="text-amber-300">27th October</strong></span>
                </div>
                <p className="mt-3 text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-md mx-auto">
                  A high-priority English leak file with 100% guaranteed tomorrow questions was detected for candidate <strong>{recipientName}</strong>. Prove your identity to download:
                </p>
              </div>

              {/* Dodging Button Container */}
              <div className="py-6 flex justify-center items-center relative min-h-[90px]">
                <motion.button
                  animate={{ x: dodgeOffset.x, y: dodgeOffset.y }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  onMouseEnter={dodgeCount < 3 ? handleDodgeAttempt : undefined}
                  onTouchStart={dodgeCount < 3 ? handleDodgeAttempt : undefined}
                  onClick={handleStep1Success}
                  className={`px-6 py-3 rounded-xl font-bold text-sm shadow-xl transition-colors whitespace-nowrap ${
                    dodgeCount >= 3
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white animate-pulse'
                      : 'bg-gradient-to-r from-sky-500 to-rose-500 text-white'
                  }`}
                >
                  {funnyTaunt}
                </motion.button>
              </div>

              <p className="text-[11px] text-neutral-400">
                {dodgeCount < 3
                  ? '⚠️ Warning: Server is checking student reflex speed!'
                  : 'Target acquired! Tap the button to view the English questions!'}
              </p>
            </motion.div>
          )}

          {/* STEP 2: The English Exam Riddle */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-semibold">
                  SECTION A: COMPULSORY LITERATURE (50 MARKS)
                </span>
                <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-white mt-1">
                  Question 1: Explain the Literary Truth
                </h3>
                <div className="mt-2 p-3 bg-neutral-950/80 rounded-xl border border-white/10 text-xs sm:text-sm text-neutral-200 font-serif italic text-balance">
                  &ldquo;On the 27th of October, the night sky looked dimmer because the Moon itself chose to walk on Earth, named {recipientName}.&rdquo;
                </div>
              </div>

              {/* Riddle Options */}
              <div className="space-y-3 pt-1 text-left">
                <button
                  onClick={handleCorrectAnswer}
                  className="w-full p-3.5 rounded-xl bg-white/5 hover:bg-rose-500/20 border border-white/10 hover:border-rose-400/40 text-xs sm:text-sm font-semibold text-white flex items-center justify-between transition-all group"
                >
                  <span>A) 100% True — {recipientName} is the literal Moon on Earth! 🌙</span>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-rose-400 transition-colors" />
                </button>

                <button
                  onClick={handleCorrectAnswer}
                  className="w-full p-3.5 rounded-xl bg-white/5 hover:bg-rose-500/20 border border-white/10 hover:border-rose-400/40 text-xs sm:text-sm font-semibold text-white flex items-center justify-between transition-all group"
                >
                  <span>B) Universal Scientific Fact — Maximum Radiance Verified!</span>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-rose-400 transition-colors" />
                </button>

                {/* The Dodging Wrong Option */}
                <motion.button
                  animate={{ x: wrongButtonOffset.x, y: wrongButtonOffset.y }}
                  transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                  onMouseEnter={handleDodgeWrongOption}
                  onTouchStart={handleDodgeWrongOption}
                  onClick={handleDodgeWrongOption}
                  className="w-full p-3 rounded-xl bg-neutral-800/40 border border-white/5 text-xs text-neutral-400 hover:text-rose-300 transition-colors cursor-not-allowed"
                >
                  C) This is grammatically incorrect (Option disabled)
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: System Overload & Countdown */}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <motion.div
                animate={{ rotate: [-2, 2, -2] }}
                transition={{ repeat: Infinity, duration: 0.2 }}
                className="w-20 h-20 mx-auto rounded-3xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400"
              >
                <AlertTriangle className="w-10 h-10 animate-pulse text-amber-400" />
              </motion.div>

              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-red-400 font-bold animate-pulse">
                  CRITICAL SYLLABUS BREACH
                </span>
                <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-white mt-1">
                  Wait... Forget the English Paper!
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-neutral-300">
                  Who cares about English exams when it&apos;s the most special day of the year?! Emergency surprise reveal in...
                </p>
              </div>

              {/* Big Countdown */}
              <div className="py-2">
                <span className="font-serif-display text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-rose-400 animate-pulse">
                  {countdown}
                </span>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Sudden Big Birthday Reveal */}
          {step === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4 py-6"
            >
              <div className="flex justify-center items-center gap-3 text-4xl animate-bounce">
                <span>🎂</span>
                <Moon className="w-10 h-10 text-amber-300 fill-amber-300" />
                <span>✨</span>
              </div>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-extrabold text-white">
                SURPRISE RAMSHA!
              </h2>
              <p className="font-cursive-calligraphy text-4xl sm:text-5xl text-rose-300">
                Happy Birthday to our Moon!
              </p>
              <p className="text-xs sm:text-sm text-amber-200 pt-1 font-medium">
                27th October — The day the Moon came down on Earth! 🌙
              </p>
              <p className="text-xs text-neutral-400 pt-2">
                (You are definitely getting full marks on tomorrow&apos;s English paper anyway! ❤️)
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
