# Multi-Tool AI Assistance API 🤖

An intelligent backend service powered by TypeScript, Express, and LangChain that provides AI-powered tools for product search, YouTube discovery, and conversational AI assistance.

## 🎯 What's Implemented

A RESTful API with AI-powered capabilities:

- 🛍️ **E-Commerce Product Search** - AI agent-powered product discovery from MySQL database
- 🎵 **Music Discovery** - YouTube search integration for music videos and playlists
- 📺 **YouTube Search** - Find videos, channels, and content with advanced filters
- 💬 **AI Chat Agent** - LangChain-powered conversational AI with multi-tool orchestration
- 🔧 **Tool Integration** - Automatic tool selection and execution based on user queries

## 📚 Technologies & Skills Applied

- **Backend Architecture** - Scalable TypeScript + Express.js REST API
- **AI Integration** - LangChain agent framework with OpenRouter models
- **Database** - Prisma ORM with MySQL for product management
- **Security** - Helmet, CORS, rate limiting, and secure error handling
- **API Documentation** - Swagger/OpenAPI specification
- **Developer Experience** - Hot reload with nodemon, TypeScript compilation
- **External APIs** - Google YouTube Data API v3 integration
- **Type Safety** - Zod schema validation for AI tool parameters

## 🚀 Features

### Core Infrastructure ✅

- **TypeScript** - Full type safety across the codebase
- **Express.js 5.x** - Modern web framework
- **Prisma + MySQL** - Type-safe database ORM with migrations
- **Helmet** - Security headers and protection
- **CORS** - Configurable cross-origin resource sharing
- **Rate Limiting** - API abuse prevention
- **Morgan** - HTTP request logging
- **Swagger UI** - Interactive API documentation
- **Error Handling** - Centralized error management with proper status codes
- **Environment Config** - dotenv for configuration management

### AI Features ✅

- **LangChain Agent** - Intelligent multi-tool orchestration
- **OpenRouter Integration** - Access to large language models via OpenRouter for natural language understanding
- **Product Search Tool** - Advanced filtering (category, price, brand, stock, ratings)
- **YouTube Search Tool** - Video discovery with filters (duration, order, type)
- **Smart Routing** - Agent automatically selects appropriate tools based on context
- **Conversational Memory** - Context-aware responses

### Implemented Features

- ✅ E-commerce product search with AI agent
- ✅ YouTube video/music search integration
- ✅ AI chat with multi-tool capabilities
- ✅ Database health monitoring
- ✅ RESTful API endpoints
- ✅ Interactive API documentation

## 📁 Project Structure

```
src/
├── config/           # Configuration files (Swagger, general config)
├── controllers/      # Request handlers (chat, product)
├── middleware/       # Security, CORS, rate limiting, logging
├── routes/           # API endpoints (chat, product, health, database)
├── types/            # TypeScript type definitions
├── utils/            # Helper functions
│   ├── ai/          # LangChain agent, LLM config, and tools
│   ├── errorHandler.ts
│   ├── prisma.ts
│   ├── response.ts
│   └── youtube.ts
├── app.ts            # Express app setup with middleware
└── server.ts         # Server entry point

prisma/
├── schema.prisma     # Database schema definition
├── seed.ts           # Database seeding script
└── migrations/       # Database migration history
```

## 🛠️ Installation

### Prerequisites

- Node.js (v16 or higher)
- MySQL database
- OpenRouter API key
- Google YouTube Data API key

### Setup Steps

1. **Clone and install dependencies**

   ```bash
   npm install
   ```

2. **Set up environment variables**

   Copy the example file and configure it:

   ```bash
   copy .env.example .env
   ```

   Edit `.env` with your actual values:

   ```env
   # Server Configuration
   PORT=3000
   NODE_ENV=development

   # API Configuration
   API_PREFIX=/api/v1

   # CORS Configuration
   # Use '*' for all origins, or comma-separated list: http://localhost:3000,http://localhost:4200
   CORS_ORIGIN=*

   # Rate Limiting Configuration
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100

   # Logging Configuration
   # Options: combined, common, dev, short, tiny
   LOG_FORMAT=dev

   # Database Configuration (MySQL)
   # Format: mysql://USER:PASSWORD@HOST:PORT/DATABASE
   DATABASE_URL="mysql://root:password@localhost:3306/multi_tool_ai_db"

   # OpenRouter Configuration
   OPENROUTER_API_KEY=your-openrouter-key
   OPENROUTER_SITE_URL="http://localhost:8000"
   OPENROUTER_APP_NAME="Multi Tool AI Assistance"

   # Youtube Configuration
   YOUTUBE_API_KEY=your-youtube-key
   ```

3. **Set up database**

   ```bash
   # Generate Prisma Client
   npm run prisma:generate

   # Run migrations to create tables
   npm run prisma:migrate

   # Seed sample data (optional but recommended)
   npm run prisma:seed
   ```

4. **Run development server**

   ```bash
   npm run dev
   ```

   The server will start at `http://localhost:8000`

## 🏃 Available Scripts

```bash
# Development mode with hot-reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Prisma commands
npm run prisma:generate    # Generate Prisma Client
npm run prisma:migrate     # Run database migrations
npm run prisma:seed        # Seed database with sample data
npm run prisma:studio      # Open Prisma Studio GUI
```

## 🌐 API Endpoints

### Base URLs

- API Base: `http://localhost:8000/api/v1`
- Swagger Docs: `http://localhost:8000/api-docs`

### Available Endpoints

#### Health & Info

- `GET /api/v1/health` - API health check
- `GET /api/v1/info` - API information
- `GET /api/v1/database/health` - Database connection status

#### Products

- `GET /api/v1/products` - List all products
- `GET /api/v1/products/:id` - Get product by ID
- `GET /api/v1/products/search` - Search products
  - Query params: `keyword`, `category`, `subCategory`, `minPrice`, `maxPrice`, `inStock`, `limit`

#### AI Chat

- `POST /api/v1/chat` - Send message to AI agent
  - Body: `{ "prompt": "your message here" }`
  - The agent automatically uses appropriate tools (product search, YouTube search)

## 🤖 AI Agent Capabilities

The LangChain-powered agent can:

1. **Product Search** - Natural language queries like:

   - "Show me wireless earbuds under $100"
   - "Find gaming laptops in stock"
   - "What electronics do you have?"

2. **YouTube Search** - Music and video discovery:

   - "Find lofi hip hop music"
   - "Search for Python tutorial videos"
   - "Show me the latest tech reviews"

3. **Smart Tool Selection** - Automatically chooses the right tool based on context
4. **Conversational** - Maintains context and provides helpful responses

## 📦 Database Schema

### Product Model

```prisma
- id: Int (Auto-increment primary key)
- name: String
- description: Text
- price: Float
- category: String (indexed)
- subCategory: String (optional)
- brand: String (optional)
- inStock: Boolean (default: true)
- rating: Float (default: 4.0)
- imageUrl: String (optional)
- tags: Text
- createdAt: DateTime
- updatedAt: DateTime
```

Categories available: electronics, fashion, home, beauty, books, sports, toys, grocery, automotive, health

## 🔧 Configuration

### Environment Variables

| Variable                  | Description                                   | Required | Default                  |
| ------------------------- | --------------------------------------------- | -------- | ------------------------ |
| `PORT`                    | Server port                                   | No       | 3000                     |
| `NODE_ENV`                | Environment mode (development/production)     | No       | development              |
| `API_PREFIX`              | API route prefix                              | No       | /api/v1                  |
| `CORS_ORIGIN`             | Allowed origins (\* or comma-separated list)  | No       | \*                       |
| `RATE_LIMIT_WINDOW_MS`    | Rate limit time window in milliseconds        | No       | 900000 (15 min)          |
| `RATE_LIMIT_MAX_REQUESTS` | Maximum requests per window                   | No       | 100                      |
| `LOG_FORMAT`              | Morgan logging format (dev, combined, common) | No       | dev                      |
| `DATABASE_URL`            | MySQL connection string                       | Yes      | -                        |
| `OPENROUTER_API_KEY`      | OpenRouter API key for LLM                    | Yes      | -                        |
| `OPENROUTER_SITE_URL`     | Your site URL for OpenRouter analytics        | No       | http://localhost:8000    |
| `OPENROUTER_APP_NAME`     | App name for OpenRouter identification        | No       | Multi Tool AI Assistance |
| `YOUTUBE_API_KEY`         | YouTube Data API v3 key                       | Yes      | -                        |

### Rate Limiting

- Default: 100 requests per 15 minutes per IP
- Configurable in `src/middleware/rateLimiter.ts`

## 🧪 Testing the API

### Using Swagger UI

Navigate to `http://localhost:8000/api-docs` for interactive API documentation.

### Example cURL Requests

**Chat with AI Agent:**

```bash
curl -X POST http://localhost:8000/api/v1/chat \
  -H "Content-Type: application/json" \
  -d "{\"prompt\": \"Show me wireless headphones under $150\"}"
```

**Search Products:**

```bash
curl "http://localhost:8000/api/v1/products/search?keyword=laptop&category=electronics&maxPrice=1500&inStock=true"
```

**Health Check:**

```bash
curl http://localhost:8000/api/v1/health
```

## 📸 Screenshots

### Swagger API Documentation

Interactive API documentation is available at `http://localhost:8000/api-docs` with a user-friendly interface to explore and test all endpoints.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/f10ff66a-519a-4d53-9608-ccb67afaa14a" />

_Swagger UI showing all available endpoints_

<img width="1418" height="510" alt="image" src="https://github.com/user-attachments/assets/b0ae3247-d97a-4081-9f97-379e04d7df19" />

<img width="1417" height="590" alt="image" src="https://github.com/user-attachments/assets/e5d5fbb3-a2ec-4a90-be75-813550a87dfb" />

<img width="1418" height="577" alt="image" src="https://github.com/user-attachments/assets/5bcb59dc-1430-40d8-af51-1be5c4f6e588" />

_Testing the AI chat endpoint directly from Swagger_

<img width="1417" height="702" alt="image" src="https://github.com/user-attachments/assets/5c9255e8-071f-4c28-94f3-8cb53aad080b" />

_Product search endpoint with query parameters_

### LangSmith Tracing & Monitoring

LangSmith provides detailed tracing of AI agent execution, showing tool calls, reasoning steps, and performance metrics.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/0feae24d-ffab-4b3e-b46a-e7fb37dd4a7b" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/6f4089c3-b11e-47c9-9368-5d0957343794" />

_Ask the AI to get me Japanese Song from Youtube_

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/8496926e-07ac-44b0-b04c-c770eedb1b89" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/39c6bfab-10e7-4a22-822a-6d8ffcc0aacf" />

_Ask the AI to get me T-Shirt Product from my Database_

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/1e6462cb-e231-48ae-9a88-c7cf96135313" />

_AI General Conversational_

> **Note:** To enable LangSmith tracing, add the following to your `.env` file:
>
> ```env
> LANGSMITH_TRACING=true
> LANGSMITH_ENDPOINT="https://api.smith.langchain.com"
> LANGSMITH_API_KEY=your_langsmith_api_key
> LANGSMITH_PROJECT=multi-tool-ai-assistant
> ```

## 🔒 Security Features

- **Helmet.js** - Sets secure HTTP headers
- **CORS** - Configured cross-origin resource sharing
- **Rate Limiting** - Prevents API abuse (100 req/15min per IP)
- **Input Validation** - Zod schema validation for AI tools
- **Error Handling** - Secure error messages without exposing internals
- **Environment Variables** - Sensitive data stored in .env

## 📚 Tech Stack

**Backend:**

- Node.js with TypeScript
- Express.js 5.x
- LangChain (AI orchestration)
- OpenRouter (Multi-model AI gateway)

**Database:**

- MySQL
- Prisma ORM

**APIs:**

- Google YouTube Data API v3
- OpenRouter API

**Security & Middleware:**

- Helmet
- CORS
- express-rate-limit
- Morgan (logging)

**Documentation:**

- Swagger/OpenAPI
- swagger-ui-express

**Development:**

- ts-node
- nodemon
- TypeScript
- Zod validation

## 🐛 Troubleshooting

### Common Issues

**Database Connection Error:**

- Verify `DATABASE_URL` in `.env` is correct
- Ensure MySQL server is running
- Check database exists: `CREATE DATABASE your_database;`

**OpenRouter API Error:**

- Verify `OPENROUTER_API_KEY` is set correctly in `.env`
- Check API key has sufficient credits
- Ensure key has proper permissions

**Port Already in Use:**

- Change `PORT` in `.env` to a different port
- Or stop the process using port 8000

**Prisma Client Not Generated:**

```bash
npm run prisma:generate
```

## 📄 License

ISC

---

**Made with ❤️ using TypeScript, Express, LangChain, and OpenRouter**
