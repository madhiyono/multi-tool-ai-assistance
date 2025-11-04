import express, { Application, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import config from "./config";
import swaggerSpec from "./config/swagger";
import {
  securityMiddleware,
  additionalSecurityHeaders,
  corsMiddleware,
  generalRateLimiter,
  morganMiddleware,
} from "./middleware";
import { errorHandler, notFoundHandler } from "./utils/errorHandler";
import routes from "./routes";

/**
 * Create and configure Express application
 */
const createApp = (): Application => {
  const app: Application = express();

  // Trust proxy - important for rate limiting behind proxies/load balancers
  app.set("trust proxy", 1);

  // Body parsing middleware
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // Security middleware
  app.use(securityMiddleware);
  app.use(additionalSecurityHeaders);

  // CORS middleware
  app.use(corsMiddleware);

  // Logging middleware
  app.use(morganMiddleware);

  // Rate limiting middleware
  app.use(generalRateLimiter);

  // API Documentation
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      explorer: true,
      customCss: ".swagger-ui .topbar { display: none }",
      customSiteTitle: "API Documentation",
    })
  );

  // Root endpoint
  app.get("/", (_req: Request, res: Response) => {
    res.json({
      success: true,
      message: "Multi-Tool AI Assistance API",
      version: "1.0.0",
      documentation: "/api-docs",
      endpoints: {
        health: `${config.apiPrefix}/health`,
        info: `${config.apiPrefix}/info`,
      },
    });
  });

  // API routes
  app.use(config.apiPrefix, routes);

  // 404 handler
  app.use(notFoundHandler);

  // Global error handler (must be last)
  app.use(errorHandler);

  return app;
};

export default createApp;
