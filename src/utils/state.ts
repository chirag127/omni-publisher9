import fs from "fs/promises";
import { PostMap } from "../types.js";
import { logger } from "./logger.js";

const STATE_FILE = ".postmap.json";

export async function loadState(): Promise<PostMap> {
    try {
        const content = await fs.readFile(STATE_FILE, "utf-8");
        return JSON.parse(content);
    } catch (error) {
        return {};
    }
}

export async function saveState(state: PostMap): Promise<void> {
    try {
        await fs.writeFile(STATE_FILE, JSON.stringify(state, null, 2));
    } catch (error) {
        logger.error("Failed to save state", { error });
    }
}

export function updatePostState(
    state: PostMap,
    slug: string,
    platform: string,
    url: string,
    _postId?: string
): void {
    if (!state[slug]) {
        state[slug] = {};
    }
    state[slug][platform] = url;
    // We could store postId if we updated the PostMap type, but for now just URL is standard
}

export function isPublished(
    state: PostMap,
    slug: string,
    platform: string
): boolean {
    return !!(state[slug] && state[slug][platform]);
}
