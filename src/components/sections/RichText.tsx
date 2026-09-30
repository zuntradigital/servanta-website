import type { ReactNode } from "react";
import type { RichBlock } from "@/content/blog";
import styles from "./RichText.module.css";

/** Rich Text (spec §9): sanitized subset rendered as semantic HTML, no raw markup. `children` are appended in the same flow. */
export function RichText({ blocks, children }: { blocks: RichBlock[]; children?: ReactNode }) {
  return (
    <div className={styles.rich} dir="auto">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "p":
            return <p key={index}>{block.text}</p>;
          case "h2":
            return <h2 key={index}>{block.text}</h2>;
          case "h3":
            return <h3 key={index}>{block.text}</h3>;
          case "ul":
            return (
              <ul key={index}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={index}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            );
          case "quote":
            return (
              <blockquote key={index}>
                <p>{block.text}</p>
              </blockquote>
            );
        }
      })}
      {children}
    </div>
  );
}
