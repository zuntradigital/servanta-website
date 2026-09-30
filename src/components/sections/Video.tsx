"use client";

import { Play } from "lucide-react";
import { useState } from "react";
import { videoEmbedHosts } from "@/config/embeds";
import styles from "./Video.module.css";

type VideoProps = {
  /** Embed URL on an allow-listed host (config/embeds.ts), e.g. https://www.youtube-nocookie.com/embed/ID. */
  src: string;
  title: string;
  playLabel: string;
  /** Optional poster image (media library). */
  poster?: { src: string; alt: string };
  caption?: string;
};

function isAllowed(src: string): boolean {
  try {
    const url = new URL(src);
    return url.protocol === "https:" && (videoEmbedHosts as readonly string[]).includes(url.host);
  } catch {
    return false;
  }
}

/**
 * Video (spec §9, 15-WEBSITE-SECURITY-SRS): only embeds from allow-listed
 * hosts, and no third-party frame loads until the visitor presses Play.
 * Renders nothing for a URL outside the allow-list.
 */
export function Video({ src, title, playLabel, poster, caption }: VideoProps) {
  const [playing, setPlaying] = useState(false);
  if (!isAllowed(src)) return null;

  const autoplaySrc = `${src}${src.includes("?") ? "&" : "?"}autoplay=1`;

  return (
    <figure className={styles.video}>
      <div className={styles.frame}>
        {playing ? (
          <iframe
            src={autoplaySrc}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            loading="lazy"
          />
        ) : (
          <button type="button" className={styles.facade} onClick={() => setPlaying(true)}>
            {/* eslint-disable-next-line @next/next/no-img-element -- media-library poster of arbitrary size */}
            {poster && <img src={poster.src} alt={poster.alt} className={styles.poster} />}
            <span className={styles.play}>
              <Play size={24} strokeWidth={2} className="flip-rtl" aria-hidden="true" />
            </span>
            <span className="visually-hidden">
              {playLabel}: {title}
            </span>
          </button>
        )}
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
