import cors, { CorsOptions } from "cors";
import config from "../config";

/**
 * CORS configuration
 * Configure allowed origins, methods, and headers
 */
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = Array.isArray(config.corsOrigin)
      ? config.corsOrigin
      : config.corsOrigin === "*"
      ? true
      : [config.corsOrigin];

    if (allowedOrigins === true) {
      callback(null, true);
    } else if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
  ],
  exposedHeaders: ["Content-Range", "X-Content-Range"],
  maxAge: 86400, // 24 hours
  optionsSuccessStatus: 200,
};

export const corsMiddleware = cors(corsOptions);
