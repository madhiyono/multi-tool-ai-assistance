import swaggerJsdoc from "swagger-jsdoc";
import config from "./index";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Multi-Tool AI Assistance API",
      version: "1.0.0",
      description: `
        Multi-Tool AI Assistance API - A comprehensive AI-powered backend service that provides:
        
        🛍️ **E-Commerce Assistant**: Help users find and discover products from your e-commerce database
        
        🎵 **Music Discovery**: Intelligent music search and recommendations
        
        📺 **YouTube Search**: Find and retrieve YouTube videos based on user queries
        
        💬 **AI Chat**: General conversational AI capabilities for customer support and engagement
        
        Built with scalability, security, and modern best practices in mind.
      `,
      license: {
        name: "ISC",
        url: "https://opensource.org/licenses/ISC",
      },
    },
    servers: [
      {
        url: `http://localhost:${config.port}${config.apiPrefix}`,
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [],
  },
  apis: ["./src/routes/*.ts", "./src/routes/**/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
