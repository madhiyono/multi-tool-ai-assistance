import { Router } from "express";
import { healthCheck, apiInfo } from "./health";
import { databaseHealth } from "./database";
import productRoutes from "./product";
import chatRoutes from "./chat";

const router = Router();

/**
 * Health and Info routes
 */
router.get("/health", healthCheck);
router.get("/info", apiInfo);

/**
 * Database routes
 */
router.get("/database/health", databaseHealth);

/**
 * Product routes
 */
router.use("/products", productRoutes);

/**
 * AI Chat routes
 */
router.use("/chat", chatRoutes);

export default router;
