import config from "@/config";
import { ChatOpenAI } from "@langchain/openai";

if (!config.openRouterApiKey) {
  throw new Error("OPENROUTER_API_KEY is required");
}

export const llm = new ChatOpenAI({
  model: "openchat/openchat-8b",
  openAIApiKey: config.openRouterApiKey,
  configuration: {
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders: {
      "HTTP-Referer": config.openRouterSiteUrl,
      "X-Title": config.openRouterAppName,
    },
  },
  temperature: 0.3,
  maxTokens: 2000,
});
