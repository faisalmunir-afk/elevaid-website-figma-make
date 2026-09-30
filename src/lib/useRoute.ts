import { useSyncExternalStore } from "react";

export type Route = "home" | "privacy";

// Hash routes (/#/privacy) work on any static host, including Figma Make, with no server rewrites.
function currentRoute(): Route {
  const { pathname, hash } = window.location;
  return pathname.replace(/\/+$/, "") === "/privacy" || hash.startsWith("#/privacy") ? "privacy" : "home";
}

function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  window.addEventListener("popstate", onChange);
  return () => {
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener("popstate", onChange);
  };
}

export function useRoute(): Route {
  return useSyncExternalStore(subscribe, currentRoute, () => "home");
}
