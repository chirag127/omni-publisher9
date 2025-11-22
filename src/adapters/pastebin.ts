import axios from "axios";
import type { Adapter, Post, PublishResult } from "../types.js";
import { logger } from "../utils/logger.js";

export class PastebinAdapter implements Adapter {
    name = "pastebin";
    enabled = true;

    async validate(): Promise<boolean> {
        if (!process.env.PASTEBIN_API_KEY) {
            logger.warn("PASTEBIN_API_KEY is missing");
            return false;
        }
        return true;
    }

    async publish(post: Post): Promise<PublishResult> {
        try {
            // Pastebin API uses x-www-form-urlencoded
            const params = new URLSearchParams();
            params.append("api_dev_key", process.env.PASTEBIN_API_KEY!);
            params.append("api_option", "paste");
            params.append(
                "api_paste_code",
                `# ${post.title}\n\n${post.content}\n\nOriginal: ${post.publishedUrl}`
            );
            params.append("api_paste_name", post.title);
            params.append("api_paste_format", "markdown");
            params.append("api_paste_private", "0"); // 0=Public, 1=Unlisted, 2=Private

            const response = await axios.post(
                "https://pastebin.com/api/api_post.php",
                params,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            // Pastebin returns the URL directly in the body on success
            const responseText = response.data;

            if (responseText.startsWith("https://pastebin.com")) {
                return {
                    platform: this.name,
                    success: true,
                    url: responseText,
                    postId: responseText.split("/").pop() || "",
                };
            } else {
                throw new Error(responseText); // Error message returned by API
            }
        } catch (error: any) {
            return {
                platform: this.name,
                success: false,
                error: error.message,
            };
        }
    }
}
