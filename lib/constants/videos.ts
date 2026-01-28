import type { VideoCardData } from "@/types";

export const travelTipVideos: VideoCardData[] = [
  {
    id: "HJCX4XvnCHM",
    title: "Vietnam on $5 - SO CHEAP!",
    channelName: "Tom from Texas",
    description: "Vietnam budget",
    duration: "00:30",
    category: "tips",
  },
  {
    id: "767xPIjTm2A",
    title: "Vietnam $100 Street Food Challenge!! Best Street Food in Saigon!!!",
    channelName: "Best Ever Food Review Show",
    description: "Saigon Street Food",
    duration: "18:51",
    category: "food",
  },
  {
    id: "VQiSm-oidmU",
    title: "21 Tips I Wish I Knew Before Visiting Vietnam",
    channelName: "Camden",
    description: "21 Tips",
    duration: "10:45",
    category: "tips",
  },
  {
    id: "ppfusm6vat0",
    title: "10 Days in VIETNAM",
    channelName: "Monkey",
    description: "10 Days in VIETNAM.",
    duration: "25:32",
    category: "guide",
  },
  {
    id: "u9VswvjJtfI",
    title: "4 Days in Hanoi Vietnam 2026",
    channelName: "Gabriel Traveler",
    description: "4 Days in Hanoi Vietnam 2026 - A Travel Guide for First-Time Visitors",
    duration: "15:13",
    category: "guide",
  },
  {
    id: "KuKHih_QwhM",
    title: "3 Days in Sapa Vietnam 2026",
    channelName: "Lais",
    description: "3 Days in Sapa Vietnam 2026 - What to do in Sapa Vietnam",
    duration: "10:37",
    category: "guide",
  },
];

export const videoCategories = [
  { value: "all", label: "All Videos" },
  { value: "tips", label: "Travel Tips" },
  { value: "guide", label: "Guides" },
  { value: "vlog", label: "Vlogs" },
  { value: "food", label: "Food" },
] as const;
