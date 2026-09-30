import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/brand";
import { routes, type RouteKey } from "@/config/routes";
import { blogPosts, isPostAvailable } from "@/content/blog";
import { getModules } from "@/content/catalog";
import { publicLegalDocuments } from "@/content/pages/legal";
import { locales } from "@/i18n/locales";

/** Sitemap generated from the route catalog and published posts, with hreflang alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = (Object.keys(routes) as RouteKey[]).flatMap((key) => {
    const { path, locales } = routes[key];
    const languages = Object.fromEntries(locales.map((l) => [l, `${siteUrl}/${l}${path}`]));
    return locales.map((locale) => ({ url: `${siteUrl}/${locale}${path}`, alternates: { languages } }));
  });

  const posts = blogPosts.flatMap((post) => {
    const postLocales = locales.filter((l) => isPostAvailable(post, l));
    const languages = Object.fromEntries(postLocales.map((l) => [l, `${siteUrl}/${l}/blog/${post.slug}`]));
    return postLocales.map((locale) => ({
      url: `${siteUrl}/${locale}/blog/${post.slug}`,
      lastModified: new Date(`${post.publishedAt}T00:00:00Z`),
      alternates: { languages },
    }));
  });

  // Published module pages (WEB-MKT-SRS-002 §102), in every locale.
  const modules = getModules().flatMap((module) => {
    const path = `${routes.features.path}/${module.key}`;
    const languages = Object.fromEntries(locales.map((l) => [l, `${siteUrl}/${l}${path}`]));
    return locales.map((locale) => ({ url: `${siteUrl}/${locale}${path}`, alternates: { languages } }));
  });

  // Legal Center documents not already in the route catalog (e.g. /legal/subscription).
  const routePaths = new Set<string>(Object.values(routes).map((r) => r.path));
  const legalDocs = publicLegalDocuments()
    .map((doc) => `${routes.legal.path}/${doc.slug}`)
    .filter((path) => !routePaths.has(path))
    .flatMap((path) => {
      const languages = Object.fromEntries(locales.map((l) => [l, `${siteUrl}/${l}${path}`]));
      return locales.map((locale) => ({ url: `${siteUrl}/${locale}${path}`, alternates: { languages } }));
    });

  return [...pages, ...modules, ...legalDocs, ...posts];
}
