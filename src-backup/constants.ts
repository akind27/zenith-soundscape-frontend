import type { Sound } from './types';
import { 
  Bird, 
  Cricket, 
  Wave, 
  Wind, 
  Rain, 
  Thunder, 
  Fire, 
  Stream, 
  MeditationBell, 
  TibetanBowl,
  WindChimes,
  ForestNight,
  WhiteNoise,
  BrownNoise,
  Waterfall,
  CatPurr,
  OceanDeep,
  CoffeeShop,
  Heartbeat,
  Fan
} from './components/icons';

// All audio files are now stored locally in /public/sounds/
// These are 100% copyright-free sounds recorded/curated by you
export const SOUNDS: Sound[] = [
  // FREE SOUNDS (5)
  {
    id: 'rain',
    name: 'Rain',
    Icon: Rain,
    src: '/sounds/rain.mp3',
    isPremium: false,
  },
  {
    id: 'waves',
    name: 'Waves',
    Icon: Wave,
    src: '/sounds/waves.mp3',
    isPremium: false,
  },
  {
    id: 'birds',
    name: 'Birds',
    Icon: Bird,
    src: '/sounds/birds.mp3',
    isPremium: false,
  },
  {
    id: 'fire',
    name: 'Fire',
    Icon: Fire,
    src: '/sounds/fire.mp3',
    isPremium: false,
  },
  {
    id: 'wind',
    name: 'Wind',
    Icon: Wind,
    src: '/sounds/wind.mp3',
    isPremium: false,
  },
  
  // PREMIUM SOUNDS (15)
  {
    id: 'crickets',
    name: 'Crickets',
    Icon: Cricket,
    src: '/sounds/crickets.mp3',
    isPremium: true,
  },
  {
    id: 'thunder',
    name: 'Thunder',
    Icon: Thunder,
    src: '/sounds/thunder.mp3',
    isPremium: true,
  },
  {
    id: 'stream',
    name: 'Stream',
    Icon: Stream,
    src: '/sounds/stream.mp3',
    isPremium: true,
  },
  {
    id: 'meditation-bell',
    name: 'Meditation Bell',
    Icon: MeditationBell,
    src: '/sounds/meditation-bell.mp3',
    isPremium: true,
  },
  {
    id: 'tibetan-bowl',
    name: 'Tibetan Bowl',
    Icon: TibetanBowl,
    src: '/sounds/tibetan-bowl.mp3',
    isPremium: true,
  },
  {
    id: 'wind-chimes',
    name: 'Wind Chimes',
    Icon: WindChimes,
    src: '/sounds/wind-chimes.mp3',
    isPremium: true,
  },
  {
    id: 'forest-night',
    name: 'Forest Night',
    Icon: ForestNight,
    src: '/sounds/forest-night.mp3',
    isPremium: true,
  },
  {
    id: 'white-noise',
    name: 'White Noise',
    Icon: WhiteNoise,
    src: '/sounds/white-noise.mp3',
    isPremium: true,
  },
  {
    id: 'brown-noise',
    name: 'Brown Noise',
    Icon: BrownNoise,
    src: '/sounds/brown-noice.mp3', // Note: Using your filename "brown-noice.mp3"
    isPremium: true,
  },
  {
    id: 'waterfall',
    name: 'Waterfall',
    Icon: Waterfall,
    src: '/sounds/waterfall.mp3',
    isPremium: true,
  },
  {
    id: 'cat-purr',
    name: 'Cat Purring',
    Icon: CatPurr,
    src: '/sounds/cat.mp3', // Note: Using your filename "cat.mp3"
    isPremium: true,
  },
  {
    id: 'ocean-deep',
    name: 'Ocean Deep',
    Icon: OceanDeep,
    src: '/sounds/ocean-deep.mp3',
    isPremium: true,
  },
  {
    id: 'coffee-shop',
    name: 'Coffee Shop',
    Icon: CoffeeShop,
    src: '/sounds/coffee-shop.mp3',
    isPremium: true,
  },
  {
    id: 'heartbeat',
    name: 'Heartbeat',
    Icon: Heartbeat,
    src: '/sounds/heartbeat.mp3',
    isPremium: true,
  },
  {
    id: 'fan',
    name: 'Fan',
    Icon: Fan,
    src: '/sounds/fan.mp3',
    isPremium: true,
  },
];
