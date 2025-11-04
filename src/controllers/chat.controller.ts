import { Request, Response } from "express";
import { ResponseUtil } from "../utils/response";

/**
 * Handle AI chat requests
 */
export const chat = async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;

    console.log("Received prompt:", prompt);

    // TODO: Implement AI chat logic here

    ResponseUtil.success(res, {
      message: "Chat endpoint - implementation pending",
      prompt: prompt,
    });
  } catch (error) {
    console.error("Chat error:", error);
    ResponseUtil.error(
      res,
      "An error occurred while processing the chat request"
    );
  }
};
