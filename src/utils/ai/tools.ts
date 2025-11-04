import { type ProductSearchQuery } from "@/types/product.type";
import { tool } from "langchain";
import { z } from "zod";
import { searchYouTube } from "../youtube";
import { PrismaClient, type Product } from "@prisma/client";

const prisma = new PrismaClient();

async function searchProductsForAI(
  query: ProductSearchQuery
): Promise<Product[]> {
  const where: any = {};

  if (query.keyword) {
    where.OR = [
      { name: { contains: query.keyword } },
      { description: { contains: query.keyword } },
      { tags: { contains: query.keyword } },
    ];
  }

  if (query.category) where.category = query.category;
  if (query.subCategory) where.subCategory = query.subCategory;
  if (query.minPrice || query.maxPrice) {
    where.price = {};
    if (query.minPrice) where.price.gte = query.minPrice;
    if (query.maxPrice) where.price.lte = query.maxPrice;
  }
  if (query.inStock !== undefined) where.inStock = query.inStock;

  const limitValue =
    typeof query.limit === "string" ? parseInt(query.limit) : query.limit || 5;
  const limit = Math.min(limitValue, 20);

  return await prisma.product.findMany({
    where,
    take: limit,
    orderBy: { createdAt: "desc" },
  });
}

const productSearchSchema = z.object({
  keyword: z
    .string()
    .describe(
      "Search keywords to match against product name, description, or tags (e.g., 'wireless earbuds', 'gaming laptop', 'organic coffee')"
    ),
  category: z
    .string()
    .optional()
    .describe(
      "Filter by main product category. Valid options: 'electronics', 'fashion', 'home', 'beauty', 'books', 'sports', 'toys', 'grocery', 'automotive', 'health'"
    ),
  subCategory: z
    .string()
    .optional()
    .describe(
      "Filter by specific sub-category within the main category (e.g., 'headphones', 'smartphones', 't-shirts', 'jeans', 'fiction', 'sci-fi')"
    ),
  minPrice: z
    .number()
    .optional()
    .describe(
      "Minimum price threshold in USD (e.g., 50 for products $50 and above)"
    ),
  maxPrice: z
    .number()
    .optional()
    .describe(
      "Maximum price threshold in USD (e.g., 200 for products $200 and below)"
    ),
  inStock: z
    .boolean()
    .optional()
    .describe(
      "Filter by availability - set to true to show only in-stock products, false for out-of-stock, or omit to show all"
    ),
  limit: z
    .number()
    .optional()
    .default(5)
    .describe("Maximum number of products to return (1-20, defaults to 5)"),
});

export const productSearchTool = tool(
  async (input: z.infer<typeof productSearchSchema>) => {
    console.log("🔍 Search Product Function Called with input:", input);
    const startTime = Date.now();
    const results = await searchProductsForAI(input as any);
    const duration = Date.now() - startTime;
    console.log(
      `✅ Search completed in ${duration}ms, found ${results.length} products`
    );
    if (results.length === 0)
      return "No products found matching your criteria. Try broadening your search terms or adjusting filters.";

    return results
      .map(
        (p: Product) =>
          `**${p.name}** - $${p.price.toFixed(2)}\n` +
          `Category: ${p.category}${
            p.subCategory ? ` > ${p.subCategory}` : ""
          }\n` +
          `Brand: ${p.brand || "N/A"} | Rating: ${p.rating}/5 | Stock: ${
            p.inStock ? "✓ Available" : "✗ Out of Stock"
          }\n` +
          `${p.description.substring(0, 150)}${
            p.description.length > 150 ? "..." : ""
          }`
      )
      .join("\n\n---\n\n");
  },
  {
    name: "search_products",
    description:
      "Search and filter products from the online store inventory. Use this tool when users ask about products, prices, availability, or want recommendations. Returns detailed product information including name, price, category, brand, ratings, and availability. Supports filtering by keywords, categories, price ranges, and stock status.",
    schema: productSearchSchema,
  }
);

const youtubeSearchSchema = z.object({
  query: z
    .string()
    .describe(
      "Search query to find videos (e.g., 'lofi hip hop beats', 'Python pandas tutorial', 'iPhone 15 review', 'funny cat videos')"
    ),
  maxResults: z
    .number()
    .optional()
    .default(5)
    .describe(
      "Maximum number of video results to return (1-20, defaults to 5)"
    ),
  order: z
    .enum(["date", "rating", "relevance", "title", "videoCount", "viewCount"])
    .optional()
    .describe(
      "Sort order: 'relevance' (best matches), 'date' (newest first), 'viewCount' (most popular), 'rating' (highest rated)"
    ),
  videoDuration: z
    .enum(["any", "short", "medium", "long"])
    .optional()
    .describe(
      "Filter by video length: 'short' (under 4 min), 'medium' (4-20 min), 'long' (over 20 min), 'any' (no filter)"
    ),
  type: z
    .enum(["video", "channel", "playlist"])
    .optional()
    .default("video")
    .describe(
      "Type of result to return: 'video' (individual videos), 'channel' (YouTube channels), 'playlist' (video playlists)"
    ),
});

export const youtubeSearchTool = tool(
  async (input: z.infer<typeof youtubeSearchSchema>) => {
    console.log("Search Youtube Function Called");
    const results = await searchYouTube(input as any);

    if (!results.success || !results.data || results.data.length === 0) {
      return (
        results.error ||
        "No videos found matching your search query. Try different keywords or adjust your filters."
      );
    }

    return results.data
      .map(
        (v) =>
          `**${v.title}**\n` +
          `Channel: ${v.channelTitle} | Published: ${new Date(
            v.publishedAt
          ).toLocaleDateString()}\n` +
          `${v.description.substring(0, 120)}${
            v.description.length > 120 ? "..." : ""
          }\n` +
          `🔗 Watch: ${v.videoUrl}`
      )
      .join("\n\n---\n\n");
  },
  {
    name: "search_youtube",
    description:
      "Search YouTube for videos, music, tutorials, reviews, or any video content. Use this tool when users ask to find, search, or recommend YouTube videos OR music (music videos, songs, albums, playlists, live performances). Returns video title, channel, description, publish date, and direct video links. Supports advanced filtering by sort order, video duration, and content type.",
    schema: youtubeSearchSchema,
  }
);
