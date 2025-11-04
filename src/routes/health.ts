import { Request, Response } from "express";
import { ResponseUtil } from "../utils/response";
import { HealthCheckResponse } from "../types";

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     description: Check if the API is running and healthy
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: healthy
 *                     timestamp:
 *                       type: string
 *                       example: 2025-11-04T10:30:00.000Z
 *                     uptime:
 *                       type: number
 *                       example: 123.45
 *                     environment:
 *                       type: string
 *                       example: development
 */
export const healthCheck = (_req: Request, res: Response): Response => {
  const healthData: HealthCheckResponse = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
  };

  return ResponseUtil.success(res, healthData, "API is healthy");
};

/**
 * @swagger
 * /info:
 *   get:
 *     summary: API information endpoint
 *     description: Get API version and basic information
 *     tags:
 *       - Info
 *     responses:
 *       200:
 *         description: API information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     version:
 *                       type: string
 *                     description:
 *                       type: string
 */
export const apiInfo = (_req: Request, res: Response): Response => {
  const info = {
    name: "Multi-Tool AI Assistance API",
    version: "1.0.0",
    description: "A scalable backend API with industrial standards",
    documentation: "/api-docs",
  };

  return ResponseUtil.success(res, info, "API information");
};
