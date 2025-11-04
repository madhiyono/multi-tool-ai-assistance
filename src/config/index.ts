import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  apiPrefix: string;
  corsOrigin: string | string[];
  rateLimitWindowMs: number;
  rateLimitMaxRequests: number;
  logFormat: string;
  openRouterApiKey?: string;
  openRouterSiteUrl: string;
  openRouterAppName: string;
  youtubeApiKey?: string;
}

const config: Config = {
  port: parseInt(process.env.PORT || "3000", 10),
  nodeEnv: process.env.NODE_ENV || "development",
  apiPrefix: process.env.API_PREFIX || "/api/v1",
  corsOrigin: process.env.CORS_ORIGIN || "*",
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000", 10), // 15 minutes
  rateLimitMaxRequests: parseInt(
    process.env.RATE_LIMIT_MAX_REQUESTS || "100",
    10
  ),
  logFormat: process.env.LOG_FORMAT || "combined",
  openRouterApiKey: process.env.OPENROUTER_API_KEY,
  openRouterSiteUrl: process.env.OPENROUTER_SITE_URL || "http://localhost:8000",
  openRouterAppName:
    process.env.OPENROUTER_APP_NAME || "Multi Tool AI Assistance",
  youtubeApiKey: process.env.YOUTUBE_API_KEY,
};

export default config;
