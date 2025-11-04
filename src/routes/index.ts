import { Router } from "express";
import { healthCheck, apiInfo } from "./health";

const router = Router();

/**
 * Health and Info routes
 */
router.get("/health", healthCheck);
router.get("/info", apiInfo);

export default router;
