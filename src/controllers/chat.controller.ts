import { Request, Response } from "express";
import { ResponseUtil } from "../utils/response";
import { agent } from "../utils/ai/agent";

/**
 * Handle AI chat requests
 */
export const chat = async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;

    // Validate prompt
    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return ResponseUtil.error(res, "Please provide a valid prompt", 400);
    }

    console.log("📝 Received prompt:", prompt);
    const startTime = Date.now();

    // Invoke the AI agent with the user's prompt
    console.log("🤖 Invoking AI agent...");
    const result = await agent.invoke({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const duration = Date.now() - startTime;
    console.log(`✅ Agent completed in ${duration}ms`);

    // Extract the AI's response
    const aiResponse = result.messages[result.messages.length - 1].content;

    return ResponseUtil.success(res, {
      message: "Chat response generated successfully",
      prompt: prompt,
      response: aiResponse,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Chat error:", error);
    return ResponseUtil.error(
      res,
      error instanceof Error
        ? error.message
        : "An error occurred while processing the chat request",
      500
    );
  }
};
