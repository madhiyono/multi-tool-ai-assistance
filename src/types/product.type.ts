export const CATEGORIES = [
  "electronics",
  "fashion",
  "home",
  "beauty",
  "books",
  "sports",
  "toys",
  "grocery",
  "automotive",
  "health",
] as const;

export type Category = (typeof CATEGORIES)[number];
