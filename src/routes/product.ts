import { Router } from "express";
import {
  searchProducts,
  getAllCategories,
} from "../controllers/product.controller";

const router = Router();

/**
 * @swagger
 * /products/search:
 *   get:
 *     tags:
 *       - Products
 *     summary: Search products with filters and pagination
 *     description: Search for products by keyword (name, description, tags), filter by category, sub-category, price range, and stock availability with pagination support
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Search keyword to match against product name, description, or tags
 *         example: laptop
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [electronics, fashion, home, beauty, books, sports, toys, grocery, automotive, health]
 *         description: Filter by product category
 *         example: electronics
 *       - in: query
 *         name: subCategory
 *         schema:
 *           type: string
 *         description: Filter by product sub-category
 *         example: laptops
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *           format: float
 *         description: Minimum price filter
 *         example: 100
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *           format: float
 *         description: Maximum price filter
 *         example: 1000
 *       - in: query
 *         name: inStock
 *         schema:
 *           type: boolean
 *         description: Filter by stock availability
 *         example: true
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of items per page (max 100)
 *         example: 10
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Products retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     products:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           name:
 *                             type: string
 *                             example: Dell XPS 13 Laptop
 *                           description:
 *                             type: string
 *                             example: High-performance ultrabook with 13-inch display
 *                           price:
 *                             type: number
 *                             format: float
 *                             example: 999.99
 *                           category:
 *                             type: string
 *                             example: electronics
 *                           subCategory:
 *                             type: string
 *                             example: laptops
 *                           brand:
 *                             type: string
 *                             nullable: true
 *                             example: Dell
 *                           inStock:
 *                             type: boolean
 *                             example: true
 *                           rating:
 *                             type: number
 *                             format: float
 *                             example: 4.5
 *                           imageUrl:
 *                             type: string
 *                             nullable: true
 *                             example: https://example.com/image.jpg
 *                           tags:
 *                             type: string
 *                             example: bestseller,popular,discount
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         page:
 *                           type: integer
 *                           example: 1
 *                         limit:
 *                           type: integer
 *                           example: 10
 *                         totalItems:
 *                           type: integer
 *                           example: 50
 *                         totalPages:
 *                           type: integer
 *                           example: 5
 *                         hasNextPage:
 *                           type: boolean
 *                           example: true
 *                         hasPrevPage:
 *                           type: boolean
 *                           example: false
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Failed to search products
 */
router.get("/search", searchProducts);

/**
 * @swagger
 * /products/categories:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get all product categories
 *     description: Retrieve a list of all available product categories with the count of products in each category
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Categories retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     categories:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: electronics
 *                           count:
 *                             type: integer
 *                             example: 25
 *                     total:
 *                       type: integer
 *                       example: 10
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Failed to fetch categories
 */
router.get("/categories", getAllCategories);

export default router;
