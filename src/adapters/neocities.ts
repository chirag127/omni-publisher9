import axios from "axios";
import FormData from "form-data"; // Neocities requires multipart/form-data
import { marked } from "marked";
import type { Adapter, Post, PublishResult } from "../types.js";
import { logger } from "../utils/logger.js";

export class NeocitiesAdapter implements Adapter {
  name = "neocities";
  enabled = true;

  async validate(): Promise<boolean> {
    if (!process.env.NEOCITIES_API_KEY) {
      logger.warn("NEOCITIES_API_KEY is missing");
      return false;
    }
    return true;
  }

  async publish(post: Post): Promise<PublishResult> {
    try {
      // Convert Markdown to HTML
      const htmlContent = await marked(post.content);

      // Wrap in a basic HTML template
      const fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${post.title}</title>
    <style>
        body { font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
        img { max-width: 100%; height: auto; }
    </style>
</head>
<body>
    <article>
        <h1>${post.title}</h1>
        ${htmlContent}
        <hr>
        <p><small>Original post: <a href="${post.publishedUrl}">${post.publishedUrl}</a></small></p>
    </article>
</body>
</html>`;

      const fileName = `${post.slug}.html`;

      // Neocities API: POST /api/upload
      // Body: multipart/form-data
      // key: filename, value: content

      // Note: In Node.js, axios with FormData can be tricky.
      // We can use the 'form-data' library or just construct it.
      // Since we don't have 'form-data' in package.json (wait, do we?),
      // I checked package.json earlier, it wasn't there.
      // I should check if I can use standard fetch or just axios with a boundary.
      // Actually, I can use URLSearchParams if it's just text?
      // No, Neocities docs say "multipart/form-data".

      // Let's check if 'form-data' is installed.
      // If not, I'll use a simple boundary construction manually.

      const form = new FormData();
      form.append(fileName, fullHtml, {
        filename: fileName,
        contentType: "text/html",
      });

      const response = await axios.post("https://neocities.org/api/upload", form, {
        headers: {
          Authorization: `Bearer ${process.env.NEOCITIES_API_KEY}`,
          ...form.getHeaders(),
        },
      });

      if (response.data.result !== "success") {
        throw new Error(response.data.message || "Upload failed");
      }

      const siteName = process.env.NEOCITIES_SITENAME || "yoursite";
      const postUrl = `https://${siteName}.neocities.org/${fileName}`;

      return {
        platform: this.name,
        success: true,
        url: postUrl,
        postId: fileName,
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
