# Multi-Tool AI Assistance API 🤖

My personal learning project to build a Multi-Tool AI Assistant API with TypeScript, Express, and various AI integrations.

## 🎯 What I'm Building

An API that provides multiple AI-powered tools:

- 🛍️ **E-Commerce Assistant** - Product search from my e-commerce database
- 🎵 **Music Discovery** - Search and recommend music
- 📺 **YouTube Search** - Find YouTube videos
- 💬 **AI Chat** - General conversational AI

## 📚 What I'm Learning

- Building scalable backend architecture with TypeScript
- Implementing security best practices (Helmet, CORS, Rate Limiting)
- API documentation with Swagger/OpenAPI
- Error handling and logging strategies
- Integrating multiple AI services
- Database design for e-commerce products
- RESTful API design patterns

## 🚀 Features

### Core Infrastructure

- **TypeScript** - Type-safe code
- **Express.js** - Web framework
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - API protection
- **Morgan** - HTTP request logging
- **Swagger** - API documentation
- **Error Handling** - Centralized error management
- **dotenv** - Environment configuration

### Planned Features

- [ ] E-commerce product search
- [ ] Music search integration
- [ ] YouTube video search
- [ ] AI chat functionality
- [ ] Multi-tool unified endpoint

## 📁 Project Structure

```
src/
├── config/           # Configuration files
├── middleware/       # Security, CORS, rate limiting, logging
├── routes/           # API endpoints
├── types/            # TypeScript types
├── utils/            # Helper functions
├── app.ts            # Express app setup
└── server.ts         # Server entry point
```

## 🛠️ Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set up environment**

   ```bash
   copy .env.example .env
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

## 🏃 Running

```bash
# Development mode (hot-reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Endpoints

- Root: `http://localhost:3000`
- API Base: `http://localhost:3000/api/v1`
- Swagger Docs: `http://localhost:3000/api-docs`
- Health Check: `http://localhost:3000/api/v1/health`

## 📝 License

ISC
