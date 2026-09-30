"use client";

/**
 * Last-resort 500 page, used when the root layout itself fails. Fully
 * self-contained: inline styles, no fonts, data or layout dependencies.
 */
export default function GlobalError({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          color: "#0F1E33",
          background: "#F5F8FC",
          textAlign: "center",
          padding: 24,
        }}
      >
        <main>
          <p style={{ fontSize: 64, fontWeight: 700, color: "#56687F", opacity: 0.6, margin: 0 }}>500</p>
          <h1 style={{ fontSize: 24, fontWeight: 600, margin: "24px 0 12px" }}>Something went wrong</h1>
          <p style={{ color: "#56687F", margin: "0 0 32px" }}>We couldn&apos;t load this page. Please try again in a moment.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => retry()}
              style={{ background: "#0045A0", color: "#fff", border: 0, borderRadius: 6, padding: "10px 20px", fontWeight: 600, cursor: "pointer" }}
            >
              Try again
            </button>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- router may be unavailable here */}
            <a href="/en" style={{ border: "1px solid #34506F", color: "#34506F", borderRadius: 6, padding: "10px 20px", fontWeight: 600, textDecoration: "none" }}>
              Back to Home
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
