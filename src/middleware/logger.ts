import morgan from "morgan";
import config from "../config";

/**
 * Morgan logger middleware
 * Logs HTTP requests in the specified format
 */
export const morganMiddleware = morgan(config.logFormat, {
  skip: (req, _res) => {
    // Skip logging for health check endpoints
    return req.url === "/health" || req.url === "/api/v1/health";
  },
});

/**
 * Custom Morgan token for response time in milliseconds
 */
morgan.token("response-time-ms", (_req, _res) => {
  return "0";
});
