export interface BirthdayConfig {
  recipientName: string;
  senderName: string;
  title: string;
  tagline: string;
  ageOrMilestone?: string;
  heartfeltLetter: string;
  theme: 'midnight-rose' | 'celestial-gold' | 'dreamy-lavender' | 'emerald-luxury';
  wishes: Array<{
    id: string;
    title: string;
    message: string;
    icon: string;
    color: string;
  }>;
}

export const DEFAULT_CONFIG: BirthdayConfig = {
  recipientName: 'Ramsha',
  senderName: 'With all my heart',
  title: 'Happy Birthday',
  tagline: 'It was 27th October when the Moon came down on Earth.',
  ageOrMilestone: '27th October · The Day the Moon Arrived',
  heartfeltLetter: `Dearest Ramsha,\n\nThey say the stars shine bright at night, but on the 27th of October, the night sky lost its most radiant light because the Moon itself chose to come down to Earth—and that Moon is you.\n\nTomorrow may be your English paper, but today belongs completely to celebrating the most beautiful, kind-hearted, and brilliant soul in our lives. May your exams be a breeze, your dreams touch the galaxies, and every single prayer you make turn into reality.\n\nYou deserve every happiness, laughter, and sweetness this world has to offer. Happy Birthday, our Moon!`,
  theme: 'midnight-rose',
  wishes: [
    {
      id: '1',
      title: 'Infinite Happiness',
      message: 'May your smile remain as bright and contagious every single day of this year.',
      icon: 'Smile',
      color: 'from-amber-400 to-rose-400'
    },
    {
      id: '2',
      title: 'Boundless Health & Peace',
      message: 'May you always be surrounded by calmness, good energy, and deep serenity.',
      icon: 'HeartHandshake',
      color: 'from-emerald-400 to-teal-400'
    },
    {
      id: '3',
      title: 'Wild Dreams Fulfilled',
      message: 'May every ambition you quietly whisper to the stars find its wings and soar.',
      icon: 'Sparkles',
      color: 'from-purple-400 to-pink-400'
    },
    {
      id: '4',
      title: 'Unconditional Love',
      message: 'May you always remember how deeply cherished, valued, and loved you are.',
      icon: 'Heart',
      color: 'from-rose-400 to-red-400'
    },
    {
      id: '5',
      title: 'Thrilling Adventures',
      message: 'May this year unfold new horizons, beautiful travels, and unforgettable stories.',
      icon: 'Compass',
      color: 'from-cyan-400 to-blue-400'
    },
    {
      id: '6',
      title: 'Golden Success',
      message: 'May your tireless dedication bear sweet fruits and open doors beyond your wildest imagination.',
      icon: 'Crown',
      color: 'from-yellow-400 to-amber-500'
    }
  ]
};

export const MESSAGE_TEMPLATES = [
  {
    label: 'Best Friend & Soul Sister',
    tagline: 'To my favorite partner-in-crime, confidante, and absolute rock.',
    letter: `Happy Birthday to the most irreplaceable friend anyone could ever ask for! Thank you for the endless late-night talks, the tears of laughter, and always knowing what I'm thinking with just a glance.\n\nI hope your birthday is as fabulous, unforgettable, and special as you are. Cheers to another year of creating memories that we'll be laughing about when we're eighty!`
  },
  {
    label: 'Romantic & Deep Love',
    tagline: 'To the love of my life and the keeper of my heart.',
    letter: `Happy Birthday to the most gorgeous person in my universe. Loving you has been the easiest and most breathtaking journey of my life.\n\nEvery day with you feels like a celebration, but today is extra special because it gave the world you. May all your heartfelt wishes come true, and may I get to spend every tomorrow making you smile.`
  },
  {
    label: 'Sister / Family',
    tagline: 'To my beloved family and perpetual source of joy.',
    letter: `Wishing the happiest of birthdays to someone who has been a blessing in my life since day one! You bring so much light, laughter, and stability to our family.\n\nMay this year be your happiest and most prosperous chapter yet. Never forget how proud I am of everything you do!`
  },
  {
    label: 'Poetic & Uplifting',
    tagline: 'To a radiant spirit destined for magnificent things.',
    letter: `Another lap around the sun, and you only grow more luminous with time. May the stars align to bring you tranquility, profound wonder, and boundless inspiration.\n\nCelebrate with open arms and know that your presence on this earth is a gift to everyone lucky enough to know you.`
  }
];
