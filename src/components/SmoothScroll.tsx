import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "../lib/useReducedMotion";

export function SmoothScroll() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <ReactLenis
      root
      options={{
        duration: 1.1,
        smoothWheel: true,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
      }}
    />
  );
}
