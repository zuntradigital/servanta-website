import { notFound } from "next/navigation";

/** Any path outside the route catalog renders the 404 page (AC-WEB-032). */
export default function CatchAll() {
  notFound();
}
