import type { RouteKey } from "./routes";

export type NavLink = { key: RouteKey; label: string };
export type NavGroup = { label: string; items: NavLink[] };
export type NavItem = NavLink | NavGroup;

export function isNavGroup(item: NavItem): item is NavGroup {
  return "items" in item;
}
