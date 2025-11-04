import { Router } from "express";
import { healthCheck, apiInfo } from "./health";
import { databaseHealth } from "./database";

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

export default router;
