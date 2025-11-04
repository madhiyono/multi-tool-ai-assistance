import config from "@/config";
import { google, youtube_v3 } from "googleapis";

if (!config.youtubeApiKey) {
  throw new Error("YOUTUBE_API_KEY is required");
}

// YouTube API configuration
const youtube = google.youtube({
  version: "v3",
  auth: config.youtubeApiKey,
});

// Types for YouTube search results
export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  channelTitle: string;
  channelId: string;
  publishedAt: string;
  thumbnails: {
    default?: string;
    medium?: string;
    high?: string;
  };
  videoUrl: string;
}

export interface YouTubeSearchOptions {
  query: string;
  maxResults?: number;
  order?:
    | "date"
    | "rating"
    | "relevance"
    | "title"
    | "videoCount"
    | "viewCount";
  videoDuration?: "any" | "short" | "medium" | "long";
  type?: "video" | "channel" | "playlist";
  channelId?: string;
  publishedAfter?: string; // ISO 8601 format
  publishedBefore?: string; // ISO 8601 format
}

export interface YouTubeSearchResponse {
  success: boolean;
  data?: YouTubeVideo[];
  totalResults?: number;
  error?: string;
}

export async function searchYouTube(
  options: YouTubeSearchOptions
): Promise<YouTubeSearchResponse> {
  try {
    // Validate API key
    if (!process.env.YOUTUBE_API_KEY) {
      return {
        success: false,
        error: "YouTube API key is not configured",
      };
    }

    // Validate required parameters
    if (!options.query || options.query.trim() === "") {
      return {
        success: false,
        error: "Search query is required",
      };
    }

    // Set default values
    const maxResults = options.maxResults || 10;
    const order = options.order || "relevance";
    const type = options.type || "video";

    // Build search parameters
    const searchParams: youtube_v3.Params$Resource$Search$List = {
      part: ["snippet"],
      q: options.query,
      maxResults,
      order,
      type: [type],
    };

    // Add optional parameters if provided
    if (options.videoDuration) {
      searchParams.videoDuration = options.videoDuration;
    }
    if (options.channelId) {
      searchParams.channelId = options.channelId;
    }
    if (options.publishedAfter) {
      searchParams.publishedAfter = options.publishedAfter;
    }
    if (options.publishedBefore) {
      searchParams.publishedBefore = options.publishedBefore;
    }

    // Execute search
    const response = await youtube.search.list(searchParams);

    // Process results
    const videos: YouTubeVideo[] = (response.data.items || []).map((item) => ({
      id: item.id?.videoId || item.id?.channelId || item.id?.playlistId || "",
      title: item.snippet?.title || "No title",
      description: item.snippet?.description || "No description",
      channelTitle: item.snippet?.channelTitle || "Unknown channel",
      channelId: item.snippet?.channelId || "",
      publishedAt: item.snippet?.publishedAt || "",
      thumbnails: {
        default: item.snippet?.thumbnails?.default?.url || undefined,
        medium: item.snippet?.thumbnails?.medium?.url || undefined,
        high: item.snippet?.thumbnails?.high?.url || undefined,
      },
      videoUrl: `https://www.youtube.com/watch?v=${item.id?.videoId || ""}`,
    }));

    return {
      success: true,
      data: videos,
      totalResults: response.data.pageInfo?.totalResults || 0,
    };
  } catch (error: any) {
    console.error("YouTube API Error:", error);
    return {
      success: false,
      error: error.message || "Failed to search YouTube",
    };
  }
}
