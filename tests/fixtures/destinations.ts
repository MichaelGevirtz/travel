import type { DestinationCardData } from '@/types';

/**
 * Mock destination for testing
 * Matches the real data structure from lib/constants/destinations.ts
 */
export const mockDestination: DestinationCardData = {
  slug: 'hanoi',
  name: 'Hanoi',
  description:
    "Vietnam's charming capital blends ancient temples, colonial architecture, and the country's best street food scene.",
  image: '/images/destinations/hanoi.jpg',
  imageAlt: 'Hoan Kiem Lake in Hanoi Old Quarter',
  region: 'north',
  type: 'city',
  highlights: [
    { type: 'days', text: '3-4 days recommended' },
    { type: 'budget', text: '$30-50 per day' },
    { type: 'bestFor', text: 'Culture, food, history' },
  ],
};

/**
 * Alternative mock destination for testing multiple items
 */
export const mockDestinationHCMC: DestinationCardData = {
  slug: 'ho-chi-minh-city',
  name: 'Ho Chi Minh City',
  description:
    "Vietnam's vibrant southern hub combines French colonial charm, buzzing street life, and world-class cuisine.",
  image: '/images/destinations/ho-chi-minh-city.jpg',
  imageAlt: 'Ho Chi Minh City skyline with Notre Dame Cathedral',
  region: 'south',
  type: 'city',
  highlights: [
    { type: 'days', text: '3-4 days recommended' },
    { type: 'budget', text: '$35-60 per day' },
    { type: 'bestFor', text: 'Food, history, nightlife' },
  ],
};

/**
 * Beach destination for testing different types
 */
export const mockDestinationBeach: DestinationCardData = {
  slug: 'da-nang',
  name: 'Da Nang',
  description:
    'Modern coastal city with beautiful beaches, the famous Golden Bridge, and easy access to Hoi An.',
  image: '/images/destinations/da-nang.jpg',
  imageAlt: 'Dragon Bridge in Da Nang at night',
  region: 'central',
  type: 'beach',
  highlights: [
    { type: 'days', text: '2-3 days recommended' },
    { type: 'budget', text: '$35-70 per day' },
    { type: 'bestFor', text: 'Beach, families' },
  ],
};

/**
 * Mountain destination for testing different types
 */
export const mockDestinationMountain: DestinationCardData = {
  slug: 'sapa',
  name: 'Sapa',
  description:
    'Mountain town surrounded by terraced rice fields and home to diverse ethnic minorities.',
  image: '/images/destinations/sapa.jpg',
  imageAlt: 'Terraced rice fields in Sapa with mountains',
  region: 'north',
  type: 'mountain',
  highlights: [
    { type: 'days', text: '2-3 days trekking' },
    { type: 'budget', text: '$30-60 per day' },
    { type: 'bestFor', text: 'Trekking, culture' },
  ],
};

/**
 * Array of multiple destinations for testing lists
 */
export const mockDestinations: DestinationCardData[] = [
  mockDestination,
  mockDestinationHCMC,
  mockDestinationBeach,
  mockDestinationMountain,
];

/**
 * Minimal destination for testing required fields only
 */
export const mockDestinationMinimal: DestinationCardData = {
  slug: 'test-destination',
  name: 'Test Destination',
  description: 'A test destination for unit tests',
  image: '/images/test.jpg',
  imageAlt: 'Test image',
  region: 'north',
  type: 'city',
  highlights: [
    { type: 'days', text: '1 day' },
    { type: 'budget', text: '$10 per day' },
    { type: 'bestFor', text: 'Testing' },
  ],
};
