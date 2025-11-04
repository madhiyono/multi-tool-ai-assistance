import { Request, Response } from "express";
import prisma from "../utils/prisma";
import { ResponseUtil } from "../utils/response";

/**
 * @swagger
 * /database/health:
 *   get:
 *     summary: Database health check
 *     description: Check database connection status
 *     tags:
 *       - Database
 *     responses:
 *       200:
 *         description: Database is connected
 *       500:
 *         description: Database connection failed
 */
export const databaseHealth = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return ResponseUtil.success(
      res,
      {
        status: "connected",
        type: "MySQL",
      },
      "Database is connected"
    );
  } catch (error) {
    console.error("Database health check failed:", error);
    return ResponseUtil.error(res, "Database connection failed", 500);
  }
};
