import axios from "axios";
import type { Adapter, Post, PublishResult } from "../types.js";
import { logger } from "../utils/logger.js";

export class GistAdapter implements Adapter {
  name = "gist";
  enabled = true;

  async validate(): Promise<boolean> {
    if (!process.env.GITHUB_TOKEN) {
      logger.warn("GITHUB_TOKEN is missing (required for Gist)");
      return false;
    }
    return true;
  }

  async publish(post: Post): Promise<PublishResult> {
    try {
      const filename = `${post.slug}.md`;

      const response = await axios.post(
        "https://api.github.com/gists",
        {
          description: post.title,
          public: true,
          files: {
            [filename]: {
              content: `# ${post.title}\n\n${post.content}\n\n[Original Post](${post.publishedUrl})`,
            },
          },
        },
        {
          headers: {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
            Accept: "application/vnd.github.v3+json",
          },
        },
      );

      return {
        platform: this.name,
        success: true,
        url: response.data.html_url,
        postId: response.data.id,
      };
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return {
          platform: this.name,
          success: false,
          error: error.response?.data?.message || error.message,
        };
      }
      return {
        platform: this.name,
        success: false,
        error: error.message,
      };
    }
  }
}
