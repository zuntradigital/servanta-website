/**
 * Hosts the Video component may embed from (15-WEBSITE-SECURITY-SRS: only
 * the Video component accepts an embed, and only from an allow-listed
 * domain set). Also feeds the Content-Security-Policy frame-src.
 */
export const videoEmbedHosts = ["www.youtube-nocookie.com", "player.vimeo.com"] as const;
