/**
 * Mock page data for testing MongoDB/Mongoose operations
 */

export const mockPage = {
  _id: '507f1f77bcf86cd799439011',
  slug: 'hanoi',
  title: 'Hanoi Travel Guide',
  content: 'Complete travel guide for Hanoi, Vietnam. Discover the best things to do, where to stay, and local tips.',
  metaDescription: 'Your complete guide to visiting Hanoi, Vietnam. Find the best attractions, hotels, restaurants, and travel tips.',
  status: 'published' as const,
  createdAt: new Date('2024-01-15T10:00:00Z'),
  updatedAt: new Date('2024-06-15T14:30:00Z'),
};

export const mockPageDraft = {
  _id: '507f1f77bcf86cd799439012',
  slug: 'upcoming-destination',
  title: 'Upcoming Destination',
  content: 'This is a draft page not yet published.',
  metaDescription: 'Draft page description',
  status: 'draft' as const,
  createdAt: new Date('2024-06-01T10:00:00Z'),
  updatedAt: new Date('2024-06-10T16:00:00Z'),
};

export const mockPageAbout = {
  _id: '507f1f77bcf86cd799439013',
  slug: 'about',
  title: 'About Us',
  content: 'Learn more about our Vietnam travel guide and team.',
  metaDescription: 'About our Vietnam travel guide website',
  status: 'published' as const,
  createdAt: new Date('2024-01-01T10:00:00Z'),
  updatedAt: new Date('2024-01-01T10:00:00Z'),
};

export const mockPages = [mockPage, mockPageAbout];

/**
 * Factory function to create a mock page with custom values
 */
export function createMockPage(overrides: Partial<typeof mockPage> = {}) {
  return {
    ...mockPage,
    ...overrides,
  };
}
