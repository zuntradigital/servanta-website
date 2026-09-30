import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { brand } from "@/config/brand";
import { isLocale } from "@/i18n/locales";

/**
 * Generated share image (06-WEBSITE-SEO-SRS): the official logo on a light
 * plate (the artwork is navy) and the tagline on the brand navy.
 * The Arabic variant keeps the Latin wordmark and domain only, because the
 * image renderer bundles no Arabic font.
 */
export const alt = `${brand.name} — ${brand.tagline.en}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const english = !isLocale(locale) || locale === "en";
  // The share-image renderer cannot draw GIFs, so it uses a lossless PNG copy
  // of the official GIF (same pixels, same transparency).
  const logo = await readFile(join(process.cwd(), "src/assets/servanta-logo-share.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#001F3B",
          color: "#FFFFFF",
        }}
      >
        <div style={{ display: "flex", width: 64, height: 6, background: "#6FA3E8", borderRadius: 3 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", alignSelf: "flex-start", padding: "24px 32px", background: "#FFFFFF", borderRadius: 14 }}>
            <img src={logoSrc} width={559} height={120} alt="" />
          </div>
          {english && <div style={{ display: "flex", maxWidth: 900, fontSize: 40, lineHeight: 1.3, color: "#C9D5E4" }}>{brand.tagline.en}</div>}
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#9AABC2" }}>{brand.domain}</div>
      </div>
    ),
    size,
  );
}
