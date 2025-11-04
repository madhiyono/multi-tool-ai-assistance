import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { ResponseUtil } from "../utils/response";

const prisma = new PrismaClient();

/**
 * Search products with filters and pagination
 */
export const searchProducts = async (req: Request, res: Response) => {
  try {
    const {
      keyword,
      category,
      subCategory,
      minPrice,
      maxPrice,
      inStock,
      page = "1",
      limit = "10",
    } = req.query;

    // Parse pagination parameters
    const pageNum = Math.max(1, parseInt(page as string));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit as string))); // Max 100 items per page
    const skip = (pageNum - 1) * limitNum;

    // Build where clause
    const where: Prisma.ProductWhereInput = {};

    // Keyword search (name, description, tags)
    if (keyword && typeof keyword === "string") {
      where.OR = [
        { name: { contains: keyword } },
        { description: { contains: keyword } },
        { tags: { contains: keyword } },
      ];
    }

    // Category filter
    if (category && typeof category === "string") {
      where.category = category;
    }

    // Sub-category filter
    if (subCategory && typeof subCategory === "string") {
      where.subCategory = subCategory;
    }

    // Price range filters
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) {
        where.price.gte = parseFloat(minPrice as string);
      }
      if (maxPrice) {
        where.price.lte = parseFloat(maxPrice as string);
      }
    }

    // In stock filter
    if (inStock !== undefined) {
      where.inStock = inStock === "true";
    }

    // Execute query with pagination
    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { createdAt: "desc" },
      }),
      prisma.product.count({ where }),
    ]);

    const totalPages = Math.ceil(totalCount / limitNum);

    return ResponseUtil.success(
      res,
      {
        products,
        pagination: {
          page: pageNum,
          limit: limitNum,
          totalItems: totalCount,
          totalPages,
          hasNextPage: pageNum < totalPages,
          hasPrevPage: pageNum > 1,
        },
      },
      "Products retrieved successfully"
    );
  } catch (error) {
    console.error("Error searching products:", error);
    return ResponseUtil.error(res, "Failed to search products", 500);
  }
};

/**
 * Get all available product categories
 */
export const getAllCategories = async (_req: Request, res: Response) => {
  try {
    // Get categories with product counts
    const categoriesWithCounts = await prisma.product.groupBy({
      by: ["category"],
      _count: {
        category: true,
      },
      orderBy: {
        category: "asc",
      },
    });

    const categories = categoriesWithCounts.map((cat) => ({
      name: cat.category,
      count: cat._count.category,
    }));

    return ResponseUtil.success(
      res,
      {
        categories,
        total: categories.length,
      },
      "Categories retrieved successfully"
    );
  } catch (error) {
    console.error("Error fetching categories:", error);
    return ResponseUtil.error(res, "Failed to fetch categories", 500);
  }
};
