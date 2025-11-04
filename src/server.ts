import { Server } from "http";
import createApp from "./app";
import config from "./config";
import prisma from "./utils/prisma";

/**
 * Start the server
 */
const startServer = (): Server => {
  const app = createApp();

  const server = app.listen(config.port, () => {
    console.log("");
    console.log("🚀 Server started successfully!");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`📌 Environment: ${config.nodeEnv}`);
    console.log(`🌐 Server running on: http://localhost:${config.port}`);
    console.log(
      `📚 API Documentation: http://localhost:${config.port}/api-docs`
    );
    console.log(
      `🏥 Health Check: http://localhost:${config.port}${config.apiPrefix}/health`
    );
    console.log(
      `🗄️  Database Health: http://localhost:${config.port}${config.apiPrefix}/database/health`
    );
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("");
  });

  // Graceful shutdown
  const gracefulShutdown = async (signal: string) => {
    console.log(`\n${signal} received. Starting graceful shutdown...`);

    // Disconnect Prisma
    await prisma.$disconnect();
    console.log("🗄️  Database disconnected");

    server.close(() => {
      console.log("✅ Server closed successfully");
      process.exit(0);
    });

    // Force shutdown after 10 seconds
    setTimeout(() => {
      console.error("❌ Forced shutdown after timeout");
      process.exit(1);
    }, 10000);
  };

  // Handle shutdown signals
  process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
  process.on("SIGINT", () => gracefulShutdown("SIGINT"));

  // Handle unhandled promise rejections
  process.on("unhandledRejection", (reason: Error, promise: Promise<any>) => {
    console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
    // In production, you might want to send this to a logging service
  });

  // Handle uncaught exceptions
  process.on("uncaughtException", (error: Error) => {
    console.error("❌ Uncaught Exception:", error);
    // In production, you might want to send this to a logging service
    process.exit(1);
  });

  return server;
};

// Start the server if this file is run directly
if (require.main === module) {
  startServer();
}

export default startServer;
