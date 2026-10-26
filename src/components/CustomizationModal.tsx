import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Check, Share2, RotateCcw } from 'lucide-react';
import { BirthdayConfig, DEFAULT_CONFIG, MESSAGE_TEMPLATES } from '../types';
import { generateShareableUrl } from '../utils/urlConfig';
import { sound } from '../utils/audio';

interface CustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: BirthdayConfig;
  onSave: (newConfig: BirthdayConfig) => void;
}

export const CustomizationModal: React.FC<CustomizationModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
}) => {
  const [draft, setDraft] = useState<BirthdayConfig>(config);
  const [copiedLink, setCopiedLink] = useState(false);

  // Sync draft whenever modal opens
  React.useEffect(() => {
    if (isOpen) {
      setDraft(config);
      setCopiedLink(false);
    }
  }, [isOpen, config]);

  const handleApplyTemplate = (template: typeof MESSAGE_TEMPLATES[0]) => {
    sound.playSparkle();
    setDraft((prev) => ({
      ...prev,
      tagline: template.tagline,
      heartfeltLetter: template.letter,
    }));
  };

  const handleSave = () => {
    sound.playSparkle();
    onSave(draft);
    onClose();
  };

  const handleReset = () => {
    sound.playSparkle();
    setDraft(DEFAULT_CONFIG);
  };

  const handleCopyLink = () => {
    sound.playSparkle();
    const url = generateShareableUrl(draft);
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-neutral-900 border border-white/15 rounded-3xl p-5 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 shrink-0">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant Personalization</span>
              </div>
              <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-white mt-0.5">
                Customize Birthday Wish in Seconds
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Scroll Area */}
          <div className="overflow-y-auto space-y-6 py-5 pr-1 text-left flex-1">
            {/* Quick Presets */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                ⚡ 1-Click Message Presets
              </label>
              <div className="grid grid-cols-2 gap-2">
                {MESSAGE_TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl.label}
                    type="button"
                    onClick={() => handleApplyTemplate(tmpl)}
                    className="p-2.5 rounded-xl text-left bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-neutral-200 hover:text-white transition-all active:scale-[0.98]"
                  >
                    <span className="font-semibold block text-rose-300">{tmpl.label}</span>
                    <span className="text-[11px] text-neutral-400 line-clamp-1 mt-0.5">
                      {tmpl.tagline}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Names Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Her Name (Recipient)
                </label>
                <input
                  type="text"
                  value={draft.recipientName}
                  onChange={(e) => setDraft({ ...draft, recipientName: e.target.value })}
                  placeholder="e.g. Ramsha"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-white/15 text-white text-sm focus:outline-none focus:border-rose-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Your Name / Signature (Sender)
                </label>
                <input
                  type="text"
                  value={draft.senderName}
                  onChange={(e) => setDraft({ ...draft, senderName: e.target.value })}
                  placeholder="e.g. With all my heart"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-white/15 text-white text-sm focus:outline-none focus:border-rose-400 transition-colors"
                />
              </div>
            </div>

            {/* Age & Tagline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Date / Milestone (Optional)
                </label>
                <input
                  type="text"
                  value={draft.ageOrMilestone || ''}
                  onChange={(e) => setDraft({ ...draft, ageOrMilestone: e.target.value })}
                  placeholder="e.g. 27th October · The Day the Moon Arrived"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-white/15 text-white text-sm focus:outline-none focus:border-rose-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Theme Palette
                </label>
                <select
                  value={draft.theme}
                  onChange={(e) =>
                    setDraft({ ...draft, theme: e.target.value as BirthdayConfig['theme'] })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-white/15 text-white text-sm focus:outline-none focus:border-rose-400 transition-colors"
                >
                  <option value="midnight-rose">Midnight Rose Gold (Romantic & Glow)</option>
                  <option value="celestial-gold">Celestial Starlight (Pure Gold & Amber)</option>
                  <option value="dreamy-lavender">Dreamy Lavender (Cosmic Purple)</option>
                  <option value="emerald-luxury">Emerald Luxury (Royal Green & Gold)</option>
                </select>
              </div>
            </div>

            {/* Subheading / Tagline */}
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                Hero Tagline / Subtitle
              </label>
              <input
                type="text"
                value={draft.tagline}
                onChange={(e) => setDraft({ ...draft, tagline: e.target.value })}
                placeholder="A short poetic one-liner about her"
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-white/15 text-white text-sm focus:outline-none focus:border-rose-400 transition-colors"
              />
            </div>

            {/* Heartfelt Letter */}
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                Heartfelt Wish Letter
              </label>
              <textarea
                rows={5}
                value={draft.heartfeltLetter}
                onChange={(e) => setDraft({ ...draft, heartfeltLetter: e.target.value })}
                placeholder="Write your genuine wishes, memories, and blessings..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-white/15 text-white text-sm focus:outline-none focus:border-rose-400 transition-colors leading-relaxed"
              />
              <span className="text-[11px] text-neutral-400 block mt-1">
                Tip: Separate paragraphs with blank lines for editorial layout.
              </span>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-2 text-xs text-neutral-400 hover:text-white bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                title="Reset to original template"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-lg transition-colors"
                title="Copy unique link with this customized message"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Personalized Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Copy Shareable Link</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 rounded-xl shadow-md shadow-rose-500/20 active:scale-95 transition-all"
              >
                <Check className="w-4 h-4" />
                <span>Apply Changes</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
