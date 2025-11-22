import axios from "axios";
import crypto from "crypto";
import type { Adapter, Post, PublishResult } from "../types.js";
import { logger } from "../utils/logger.js";

export class LiveJournalAdapter implements Adapter {
    name = "livejournal";
    enabled = true;

    async validate(): Promise<boolean> {
        if (
            !process.env.LIVEJOURNAL_USERNAME ||
            !process.env.LIVEJOURNAL_PASSWORD
        ) {
            logger.warn(
                "LIVEJOURNAL_USERNAME or LIVEJOURNAL_PASSWORD is missing"
            );
            return false;
        }
        return true;
    }

    private md5(text: string): string {
        return crypto.createHash("md5").update(text).digest("hex");
    }

    async publish(post: Post): Promise<PublishResult> {
        try {
            // Step 1: Get challenge
            const challengeResponse = await axios.post(
                "https://www.livejournal.com/interface/xmlrpc",
                `<?xml version="1.0"?>
<methodCall>
  <methodName>LJ.XMLRPC.getchallenge</methodName>
  <params>
  </params>
</methodCall>`,
                {
                    headers: {
                        "Content-Type": "text/xml",
                    },
                }
            );

            // Parse challenge from XML response
            const challengeMatch = challengeResponse.data.match(
                /<name>challenge<\/name>\s*<value><string>([^<]+)<\/string>/
            );
            if (!challengeMatch) {
                throw new Error("Failed to get challenge from LiveJournal");
            }
            const challenge = challengeMatch[1];

            // Step 2: Create auth response
            const password = process.env.LIVEJOURNAL_PASSWORD!;
            const authResponse = this.md5(challenge + this.md5(password));

            // Step 3: Post event
            const xmlBody = `<?xml version="1.0"?>
<methodCall>
  <methodName>LJ.XMLRPC.postevent</methodName>
  <params>
    <param>
      <value>
        <struct>
          <member>
            <name>username</name>
            <value><string>${process.env.LIVEJOURNAL_USERNAME}</string></value>
          </member>
          <member>
            <name>auth_method</name>
            <value><string>challenge</string></value>
          </member>
          <member>
            <name>auth_challenge</name>
            <value><string>${challenge}</string></value>
          </member>
          <member>
            <name>auth_response</name>
            <value><string>${authResponse}</string></value>
          </member>
          <member>
            <name>event</name>
            <value><string>${this.escapeXml(post.content)}</string></value>
          </member>
          <member>
            <name>subject</name>
            <value><string>${this.escapeXml(post.title)}</string></value>
          </member>
          <member>
            <name>lineendings</name>
            <value><string>unix</string></value>
          </member>
          <member>
            <name>props</name>
            <value>
              <struct>
                ${
                    post.publishedUrl
                        ? `<member><name>syn_link</name><value><string>${this.escapeXml(
                              post.publishedUrl
                          )}</string></value></member>`
                        : ""
                }
                ${
                    post.tags && post.tags.length > 0
                        ? `<member><name>taglist</name><value><string>${this.escapeXml(
                              post.tags.join(", ")
                          )}</string></value></member>`
                        : ""
                }
              </struct>
            </value>
          </member>
        </struct>
      </value>
    </param>
  </params>
</methodCall>`;

            const response = await axios.post(
                "https://www.livejournal.com/interface/xmlrpc",
                xmlBody,
                {
                    headers: {
                        "Content-Type": "text/xml",
                    },
                }
            );

            // Parse itemid from response
            const itemidMatch = response.data.match(
                /<name>itemid<\/name>\s*<value><int>(\d+)<\/int>/
            );
            if (!itemidMatch) {
                throw new Error(
                    "Failed to get post ID from LiveJournal response"
                );
            }

            const itemid = itemidMatch[1];
            const postUrl = `https://${process.env.LIVEJOURNAL_USERNAME}.livejournal.com/${itemid}.html`;

            return {
                platform: this.name,
                success: true,
                url: postUrl,
                postId: itemid,
            };
        } catch (error: any) {
            return {
                platform: this.name,
                success: false,
                error: error.response?.data || error.message,
            };
        }
    }

    private escapeXml(text: string): string {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&apos;");
    }
}
