import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/**
 * Hydration-safe replacement for framer-motion's useReducedMotion.
 * Reports `false` on the server and during hydration (so the client's first
 * render matches the server HTML), then re-renders with the real preference.
 * <MotionProvider> covers the gap by skipping transform animations for these users.
 */
export function useReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false
  );
}
