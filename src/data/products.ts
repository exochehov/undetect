import { Shield, Target, Crosshair } from 'lucide-react';

// Import product images
import eftPreview1 from '../assets/products/eft/preview1.jpg';
import eftPreview2 from '../assets/products/eft/preview2.jpg';
import apexPreview1 from '../assets/products/apex/preview1.jpg';
import apexPreview2 from '../assets/products/apex/preview2.jpg';
import fortnitePreview1 from '../assets/products/fortnite/preview1.jpg';
import fortnitePreview2 from '../assets/products/fortnite/preview2.jpg';

export const products = {
  'eft-full': {
    id: 'eft-full',
    name: 'EFT External',
    icon: Shield,
    description:
      'Premium external cheat for Escape from Tarkov with advanced features.',
    systemRequirements: [
      'AES (CPU)',
      'SVM / VT-X (BIOS)',
      'Support Windows 10-11 (1903-23h2)',
      'INTEL + AMD CPU',
    ],
    features: [
      'Built-in HWID spoofer',
      'Advanced Aimbot System',
      'ESP & Wallhack',
      'Comprehensive Loot ESP',
    ],
    featureCategories: {
      aimbot: {
        vector: [
          'Smooth settings',
          'Prediction',
          'Visible only',
          'Bones settings',
          'FOV settings',
        ],
        silent: [
          'Enabled',
          'FOV settings',
          'Visible only',
          'Ignore Vector if silent enabled',
        ],
        other: ['No Recoil', 'No Sway', 'No ADS'],
      },
      visuals: {
        player: [
          'All color filters for selected category',
          'Health',
          'Player Info (Name/LVL/KD/Hours/Role)',
          'Chams',
          'Enemy/PMC ESP',
          'Teammates ESP',
          'Skeleton',
          'Distance',
          'Weapon',
        ],
        world: [
          'Custom Loot Filters',
          'Price Loot Filters',
          'All color filters settings',
          'Show Price',
          'Containers',
          'Body',
          'Player Body Price',
          'PMC/BOT/BOSSES total body prices',
          'Min/Max Price slider',
          'Quests items / Quest places',
        ],
      },
      misc: [
        'Battlemode (bind)',
        'Night Vision',
        'Thermal Vision',
        'Show Bot names',
        'No Visor',
        'Speed Hack',
        'Speed Hack Setting (Slider)',
        'Infinity Stamina',
        'Loot through walls',
        'Loot Range Slider',
        'Show Info',
        'Show Ammo',
      ],
      'temporary removed': [
        'Multi Search',
        'Instant Search',
        'Instant examine',
      ],
    },
    images: [eftPreview1, eftPreview2],
    videoUrl: 'https://www.youtube.com/embed/7HLhBT3lqas',
    videoThumbnail: eftPreview1,
    pricing: [
      { period: '2h', price: 1.0 },
      { period: 'day', price: 14.99 },
      { period: 'week', price: 49.99 },
      { period: 'month', price: 149.99 },
    ],
  },
  apex: {
    id: 'apex',
    name: 'Apex External',
    icon: Target,
    description:
      'Advanced external cheat for Apex Legends with comprehensive features.',
    systemRequirements: [
      'SVM [AMD] / VT-X [INTEL] (BIOS)',
      'TPM - OFF (BIOS)',
      '16GB RAM (or more)',
      'Vanilla Windows version required',
      'RAID / Rapid Storage - OFF (BIOS)',
    ],
    features: [
      'Advanced Aimbot System',
      'ESP & Wallhack',
      'Movement Enhancement',
      'HWID Spoofer Included',
    ],
    featureCategories: {
      aimbot: {
        vector: [
          'Static FOV in Zoom',
          'Aim if Out if FOV',
          'Prediction',
          'Visible Check',
          'Ignore knocked',
          'Draw FOV',
          'Hitbox Selection',
        ],
        silent: ['Enable', 'FOV settings', 'Visible Check', 'Ignore knocked'],
        other: [
          'Smooth settings',
          'Randomization',
          'Aim Step',
          'Sway Compensation',
          'Recoil Compensation',
        ],
      },
      visuals: {
        player: [
          'Draw Box',
          'Draw Name',
          'Draw Health',
          'Draw Shield',
          'Draw Skeleton',
          'Draw Weapon',
          'Draw Distance',
          'Draw Barrel',
          'Draw Glow',
        ],
        world: [
          'Enable',
          'Draw Glow',
          'Glow Material',
          'Draw Distance',
          'Render Distance',
          'Smart Loot',
          'Custom Loot',
        ],
      },
      misc: [
        'Auto Tap Strafe',
        'Auto Super Glide',
        'Adaptive Super Glide',
        'BunnyHop',
      ],
    },
    images: [apexPreview1, apexPreview2],
    videoUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID',
    videoThumbnail: apexPreview1,
    pricing: [
      { period: 'day', price: 3.0 },
      { period: '3day', price: 5.0 },
      { period: 'week', price: 15.0 },
      { period: 'month', price: 30.0 },
    ],
  },
  fortnite: {
    id: 'fortnite',
    name: 'Fortnite',
    icon: Crosshair,
    description:
      'Currently in development. Our team is working hard to bring you the best Fortnite gaming tools.',
    features: [
      'Coming Soon',
      'Under Development',
      'Join Discord for Updates',
      'Early Access Available Soon',
    ],
    featureCategories: {
      aimbot: {
        vector: ['Under Development'],
        silent: ['Under Development'],
        other: ['Under Development'],
      },
      visuals: {
        player: ['Under Development'],
        world: ['Under Development'],
      },
      misc: ['Under Development'],
    },
    images: [fortnitePreview1, fortnitePreview2],
    videoUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID',
    videoThumbnail: fortnitePreview1,
    pricing: [],
  },
};