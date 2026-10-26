import { BirthdayConfig, DEFAULT_CONFIG } from '../types';

const STORAGE_KEY = 'celestial_birthday_config_v1';

export function loadConfig(): BirthdayConfig {
  if (typeof window === 'undefined') return DEFAULT_CONFIG;

  // 1. Check URL query params first
  try {
    const params = new URLSearchParams(window.location.search);
    const hash = window.location.hash.substring(1);
    const hashParams = new URLSearchParams(hash);

    const name = params.get('name') || hashParams.get('name');
    const from = params.get('from') || hashParams.get('from');
    const tagline = params.get('tagline') || hashParams.get('tagline');
    const age = params.get('age') || hashParams.get('age');
    const letter = params.get('msg') || hashParams.get('msg');
    const theme = (params.get('theme') || hashParams.get('theme')) as BirthdayConfig['theme'] | null;

    if (name || letter) {
      return {
        ...DEFAULT_CONFIG,
        recipientName: name ? decodeURIComponent(name) : DEFAULT_CONFIG.recipientName,
        senderName: from ? decodeURIComponent(from) : DEFAULT_CONFIG.senderName,
        tagline: tagline ? decodeURIComponent(tagline) : DEFAULT_CONFIG.tagline,
        ageOrMilestone: age ? decodeURIComponent(age) : DEFAULT_CONFIG.ageOrMilestone,
        heartfeltLetter: letter ? decodeURIComponent(letter) : DEFAULT_CONFIG.heartfeltLetter,
        theme: theme && ['midnight-rose', 'celestial-gold', 'dreamy-lavender', 'emerald-luxury'].includes(theme)
          ? theme
          : DEFAULT_CONFIG.theme,
      };
    }
  } catch {
    // ignore URL parse errors
  }

  // 2. Check localStorage
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
    }
  } catch {
    // ignore
  }

  return DEFAULT_CONFIG;
}

export function saveConfig(config: BirthdayConfig) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch {
    // ignore
  }
}

export function generateShareableUrl(config: BirthdayConfig): string {
  if (typeof window === 'undefined') return '';
  const url = new URL(window.location.origin + window.location.pathname);
  url.searchParams.set('name', config.recipientName);
  url.searchParams.set('from', config.senderName);
  if (config.ageOrMilestone) url.searchParams.set('age', config.ageOrMilestone);
  if (config.tagline) url.searchParams.set('tagline', config.tagline);
  if (config.heartfeltLetter) url.searchParams.set('msg', config.heartfeltLetter);
  url.searchParams.set('theme', config.theme);
  return url.toString();
}
