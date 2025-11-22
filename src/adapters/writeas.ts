import axios from "axios";
import type { Adapter, Post, PublishResult } from "../types.js";
import { logger } from "../utils/logger.js";

export class WriteAsAdapter implements Adapter {
    name = "writeas";
    enabled = true;

    async validate(): Promise<boolean> {
        // Write.as can work without authentication (anonymous posting)
        // But if username and password are provided, we can authenticate
        if (process.env.WRITEAS_USERNAME && !process.env.WRITEAS_PASSWORD) {
            logger.warn(
                "WRITEAS_USERNAME provided but WRITEAS_PASSWORD is missing"
            );
            return false;
        }
        if (process.env.WRITEAS_PASSWORD && !process.env.WRITEAS_USERNAME) {
            logger.warn(
                "WRITEAS_PASSWORD provided but WRITEAS_USERNAME is missing"
            );
            return false;
        }
        return true; // Anonymous posting is allowed
    }

    async authenticate(): Promise<string | null> {
        if (!process.env.WRITEAS_USERNAME || !process.env.WRITEAS_PASSWORD) {
            return null; // Anonymous posting
        }

        try {
            const response = await axios.post(
                "https://write.as/api/auth/login",
                {
                    alias: process.env.WRITEAS_USERNAME,
                    pass: process.env.WRITEAS_PASSWORD,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            return response.data.data.access_token;
        } catch (error: any) {
            logger.error("Write.as authentication failed", {
                error: error.response?.data || error.message,
            });
            return null;
        }
    }

    async publish(post: Post): Promise<PublishResult> {
        try {
            const accessToken = await this.authenticate();
            const headers: any = {
                "Content-Type": "application/json",
            };

            if (accessToken) {
                headers.Authorization = `Token ${accessToken}`;
            }

            const response = await axios.post(
                "https://write.as/api/posts",
                {
                    body: post.content,
                    title: post.title,
                    // Optional: Add crosspost URL if publishing from Blogger
                    ...(post.publishedUrl && {
                        crosspost: [{ url: post.publishedUrl }],
                    }),
                },
                { headers }
            );

            const postId = response.data.data.id;
            const postUrl = `https://write.as/${postId}`;

            return {
                platform: this.name,
                success: true,
                url: postUrl,
                postId: postId,
            };
        } catch (error: any) {
            return {
                platform: this.name,
                success: false,
                error: error.response?.data?.error_msg || error.message,
            };
        }
    }

    async update(post: Post, postId: string): Promise<PublishResult> {
        try {
            const accessToken = await this.authenticate();

            if (!accessToken) {
                return {
                    platform: this.name,
                    success: false,
                    error: "Authentication required for updating posts",
                };
            }

            const response = await axios.post(
                `https://write.as/api/posts/${postId}`,
                {
                    body: post.content,
                    title: post.title,
                    ...(post.publishedUrl && {
                        crosspost: [{ url: post.publishedUrl }],
                    }),
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${accessToken}`,
                    },
                }
            );

            const postUrl = `https://write.as/${postId}`;

            return {
                platform: this.name,
                success: true,
                url: postUrl,
                postId: response.data.data.id,
            };
        } catch (error: any) {
            return {
                platform: this.name,
                success: false,
                error: error.response?.data?.error_msg || error.message,
            };
        }
    }
}
