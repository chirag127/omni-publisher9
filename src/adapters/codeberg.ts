import axios from "axios";
import type { Adapter, Post, PublishResult } from "../types.js";
import { logger } from "../utils/logger.js";

export class CodebergAdapter implements Adapter {
  name = "codeberg";
  enabled = true;

  async validate(): Promise<boolean> {
    if (!process.env.CODEBERG_TOKEN || !process.env.CODEBERG_OWNER || !process.env.CODEBERG_REPO) {
      logger.warn("CODEBERG credentials are missing");
      return false;
    }
    return true;
  }

  async publish(post: Post): Promise<PublishResult> {
    try {
      const owner = process.env.CODEBERG_OWNER!;
      const repo = process.env.CODEBERG_REPO!;
      const branch = process.env.CODEBERG_BRANCH || "main";
      const filePath = `content/posts/${post.slug}.md`;

      // Codeberg (Gitea) API requires content to be Base64 encoded
      const contentBase64 = Buffer.from(post.content).toString("base64");

      const requestBody = {
        content: contentBase64,
        message: `Publish: ${post.title}`,
        branch: branch,
      };

      // Check if file exists to update it (Gitea requires SHA to update)
      // For now, we assume create. If it fails, we might need to fetch SHA.
      // Let's try to fetch first.
      let sha: string | undefined;
      try {
        const existing = await axios.get(
          `https://codeberg.org/api/v1/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`,
          {
            headers: {
              Authorization: `token ${process.env.CODEBERG_TOKEN}`,
            },
          },
        );
        sha = existing.data.sha;
      } catch (_e) {
        // File doesn't exist, proceed with create
      }

      if (sha) {
        // Update
        (requestBody as any).sha = sha;
      }

      await axios.post(
        `https://codeberg.org/api/v1/repos/${owner}/${repo}/contents/${filePath}`,
        requestBody,
        {
          headers: {
            Authorization: `token ${process.env.CODEBERG_TOKEN}`,
            "Content-Type": "application/json",
          },
        },
      );

      const postUrl = `https://codeberg.org/${owner}/${repo}/src/branch/${branch}/${filePath}`;

      return {
        platform: this.name,
        success: true,
        url: postUrl,
        postId: filePath,
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
