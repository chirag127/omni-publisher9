import { google } from "googleapis";
import { Adapter, Post, PublishResult } from "../types.js";
import { logger } from "../utils/logger.js";
import { markdownToHtml } from "../utils/markdown.js";

export class BloggerAdapter implements Adapter {
    name = "blogger";
    enabled = true;

    async validate(): Promise<boolean> {
        if (
            !process.env.BLOGGER_CLIENT_EMAIL ||
            !process.env.BLOGGER_PRIVATE_KEY ||
            !process.env.BLOGGER_BLOG_ID
        ) {
            logger.warn(
                "BLOGGER_CLIENT_EMAIL, BLOGGER_PRIVATE_KEY, or BLOGGER_BLOG_ID is missing"
            );
            return false;
        }
        return true;
    }

    async publish(post: Post): Promise<PublishResult> {
        try {
            const auth = new google.auth.GoogleAuth({
                credentials: {
                    client_email: process.env.BLOGGER_CLIENT_EMAIL,
                    private_key: process.env.BLOGGER_PRIVATE_KEY?.replace(
                        /\\n/g,
                        "\n"
                    ),
                },
                scopes: ["https://www.googleapis.com/auth/blogger"],
            });

            const blogger = google.blogger({ version: "v3", auth });

            const response = await blogger.posts.insert({
                blogId: process.env.BLOGGER_BLOG_ID,
                requestBody: {
                    title: post.title,
                    content: markdownToHtml(post.content),
                    labels: post.tags,
                },
            });

            return {
                platform: this.name,
                success: true,
                url: response.data.url || "",
                postId: response.data.id || "",
            };
        } catch (error: any) {
            return {
                platform: this.name,
                success: false,
                error: error.message || JSON.stringify(error),
            };
        }
    }
}
