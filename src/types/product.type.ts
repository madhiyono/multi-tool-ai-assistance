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

export interface ProductSearchQuery {
  keyword?: string;
  category?: Category;
  subCategory?: string;
  minPrice?: string;
  maxPrice?: string;
  inStock?: string;
  page?: string;
  limit?: string;
}
