import { Request, Response, NextFunction } from "express";
import { ResponseUtil } from "../utils/response";

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof AppError) {
    ResponseUtil.error(res, err.message, err.statusCode);
    return;
  }

  // Log error for debugging
  console.error("ERROR 💥:", err);

  // Generic error response
  const statusCode = "statusCode" in err ? (err as any).statusCode : 500;
  const message = err.message || "Internal server error";

  ResponseUtil.error(
    res,
    message,
    statusCode,
    process.env.NODE_ENV === "development" ? err.stack : undefined
  );
};

export const notFoundHandler = (
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  ResponseUtil.notFound(res, `Cannot ${req.method} ${req.originalUrl}`);
};
