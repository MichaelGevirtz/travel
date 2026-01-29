/// <reference types="vitest/globals" />
import { destinationContent, fallbackContent } from "@/lib/constants/destination-content";

// Helper to calculate similarity between two strings (Jaccard similarity)
const calculateSimilarity = (str1: string, str2: string): number => {
  const words1 = new Set(str1.toLowerCase().split(/\s+/));
  const words2 = new Set(str2.toLowerCase().split(/\s+/));

  const intersection = new Set([...words1].filter((x) => words2.has(x)));
  const union = new Set([...words1, ...words2]);

  return intersection.size / union.size;
};

// Get all non-placeholder destinations
const getNonPlaceholderDestinations = () => {
  return Object.entries(destinationContent).filter(
    ([_, content]) => content.status !== "placeholder"
  );
};

describe("Destination Content Uniqueness", () => {
  describe("Overview paragraphs", () => {
    it("should not have identical overview paragraphs across destinations", () => {
      const destinations = getNonPlaceholderDestinations();
      const duplicates: string[] = [];

      for (let i = 0; i < destinations.length; i++) {
        for (let j = i + 1; j < destinations.length; j++) {
          const [slug1, content1] = destinations[i];
          const [slug2, content2] = destinations[j];

          // Check each overview paragraph
          for (const para1 of content1.overview) {
            for (const para2 of content2.overview) {
              const similarity = calculateSimilarity(para1, para2);
              if (similarity > 0.8) {
                duplicates.push(
                  `${slug1} and ${slug2} have similar overview (${(similarity * 100).toFixed(0)}%)`
                );
              }
            }
          }
        }
      }

      expect(duplicates).toEqual([]);
    });

    it("should not use fallback overview content", () => {
      const destinations = getNonPlaceholderDestinations();
      const usingFallback: string[] = [];

      for (const [slug, content] of destinations) {
        for (const para of content.overview) {
          for (const fallbackPara of fallbackContent.overview) {
            if (calculateSimilarity(para, fallbackPara) > 0.8) {
              usingFallback.push(`${slug} is using fallback overview content`);
            }
          }
        }
      }

      expect(usingFallback).toEqual([]);
    });
  });

  describe("Things to do", () => {
    it("should not have identical activities across destinations", () => {
      const destinations = getNonPlaceholderDestinations();
      const duplicates: string[] = [];

      for (let i = 0; i < destinations.length; i++) {
        for (let j = i + 1; j < destinations.length; j++) {
          const [slug1, content1] = destinations[i];
          const [slug2, content2] = destinations[j];

          // Check each activity
          for (const activity1 of content1.thingsToDo) {
            for (const activity2 of content2.thingsToDo) {
              const similarity = calculateSimilarity(activity1, activity2);
              if (similarity > 0.8) {
                duplicates.push(
                  `${slug1} and ${slug2} have similar activity: "${activity1.substring(0, 50)}..."`
                );
              }
            }
          }
        }
      }

      expect(duplicates).toEqual([]);
    });

    it("should not use fallback activities", () => {
      const destinations = getNonPlaceholderDestinations();
      const usingFallback: string[] = [];

      for (const [slug, content] of destinations) {
        for (const activity of content.thingsToDo) {
          for (const fallbackActivity of fallbackContent.thingsToDo) {
            if (calculateSimilarity(activity, fallbackActivity) > 0.8) {
              usingFallback.push(`${slug} is using fallback activity: "${activity.substring(0, 40)}..."`);
            }
          }
        }
      }

      expect(usingFallback).toEqual([]);
    });
  });

  describe("FAQs", () => {
    it("should not have identical FAQ answers across destinations", () => {
      const destinations = getNonPlaceholderDestinations();
      const duplicates: string[] = [];

      for (let i = 0; i < destinations.length; i++) {
        for (let j = i + 1; j < destinations.length; j++) {
          const [slug1, content1] = destinations[i];
          const [slug2, content2] = destinations[j];

          // Check each FAQ answer
          for (const faq1 of content1.faqs) {
            for (const faq2 of content2.faqs) {
              const similarity = calculateSimilarity(faq1.answer, faq2.answer);
              if (similarity > 0.8) {
                duplicates.push(
                  `${slug1} and ${slug2} have similar FAQ answer for "${faq1.question.substring(0, 30)}..."`
                );
              }
            }
          }
        }
      }

      expect(duplicates).toEqual([]);
    });

    it("should not use fallback FAQ answers", () => {
      const destinations = getNonPlaceholderDestinations();
      const usingFallback: string[] = [];

      for (const [slug, content] of destinations) {
        for (const faq of content.faqs) {
          for (const fallbackFaq of fallbackContent.faqs) {
            if (calculateSimilarity(faq.answer, fallbackFaq.answer) > 0.8) {
              usingFallback.push(`${slug} is using fallback FAQ answer`);
            }
          }
        }
      }

      expect(usingFallback).toEqual([]);
    });
  });

  describe("Getting Around", () => {
    it("should not have identical transport info across destinations", () => {
      const destinations = getNonPlaceholderDestinations();
      const duplicates: string[] = [];

      for (let i = 0; i < destinations.length; i++) {
        for (let j = i + 1; j < destinations.length; j++) {
          const [slug1, content1] = destinations[i];
          const [slug2, content2] = destinations[j];

          // Check each transport type
          const types: Array<keyof typeof content1.gettingAround> = ["byAir", "byTrain", "local"];
          for (const type of types) {
            const similarity = calculateSimilarity(
              content1.gettingAround[type],
              content2.gettingAround[type]
            );
            if (similarity > 0.8) {
              duplicates.push(`${slug1} and ${slug2} have similar ${type} info`);
            }
          }
        }
      }

      expect(duplicates).toEqual([]);
    });
  });

  describe("Content completeness", () => {
    it("non-placeholder destinations should have all required fields filled", () => {
      const destinations = getNonPlaceholderDestinations();
      const incomplete: string[] = [];

      for (const [slug, content] of destinations) {
        if (content.overview.length !== 2) {
          incomplete.push(`${slug}: overview should have 2 paragraphs`);
        }
        if (content.thingsToDo.length !== 6) {
          incomplete.push(`${slug}: thingsToDo should have 6 items`);
        }
        if (content.faqs.length !== 4) {
          incomplete.push(`${slug}: faqs should have 4 items`);
        }
        if (!content.gettingAround.byAir || !content.gettingAround.byTrain || !content.gettingAround.local) {
          incomplete.push(`${slug}: gettingAround has empty fields`);
        }
      }

      expect(incomplete).toEqual([]);
    });
  });
});
