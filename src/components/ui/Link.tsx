import type { AnchorHTMLAttributes } from "react";

// Plain anchor standing in for next/link: this build is a single-page Vite app.
export function Link(props: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return <a {...props} />;
}
