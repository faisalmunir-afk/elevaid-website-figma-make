import { useEffect, useRef, useState, type RefObject } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useReducedMotion } from "./useReducedMotion";
import { useLenis } from "lenis/react";

/**
 * Snappy stepped scrolling through a pinned track (a tall element with a sticky child).
 * Each wheel gesture moves exactly one step and stops there; momentum, scrollbar drags and
 * keyboard scrolls settle onto the nearest step. Past either end, the page scrolls normally.
 */
export function useStepSnap(trackRef: RefObject<HTMLElement | null>, steps: number) {
  const [[active, direction], setStep] = useState<[number, number]>([0, 1]);
  const activeRef = useRef(0);
  const lockedUntil = useRef(0);
  const wasPinned = useRef(false);
  const settleTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const shouldReduceMotion = useReducedMotion();
  const lenis = useLenis();

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  /** Scroll distance the track stays pinned for; ~0 when it isn't pinned (e.g. mobile). */
  function span() {
    const track = trackRef.current;
    return track ? track.offsetHeight - window.innerHeight : 0;
  }

  function stepTop(index: number) {
    const track = trackRef.current;
    if (!track) return 0;
    const top = window.scrollY + track.getBoundingClientRect().top;
    return top + (index * span()) / Math.max(1, steps - 1);
  }

  function isPinned(slack = 0) {
    const track = trackRef.current;
    if (!track || span() < 50) return false;
    const rect = track.getBoundingClientRect();
    return rect.top <= slack && rect.bottom >= window.innerHeight - slack;
  }

  function goTo(index: number) {
    const top = stepTop(index);
    lockedUntil.current = performance.now() + 900;
    if (lenis) {
      lenis.scrollTo(top, { duration: 0.65, lock: true, force: true });
    } else {
      window.scrollTo({ top, behavior: shouldReduceMotion ? "auto" : "smooth" });
    }
  }

  // Scroll position is the source of truth for which step is showing.
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const next = Math.min(steps - 1, Math.max(0, Math.round(progress * (steps - 1))));
    if (next !== activeRef.current) {
      setStep([next, next > activeRef.current ? 1 : -1]);
      activeRef.current = next;
    }

    if (span() < 50) return;

    // Catch momentum carrying into the pin and park it on the first (or last) step.
    const pinnedNow = progress > 0 && progress < 1;
    if (pinnedNow && !wasPinned.current && performance.now() >= lockedUntil.current) {
      goTo(progress < 0.5 ? 0 : steps - 1);
    }
    wasPinned.current = pinnedNow;

    // Once scrolling settles between steps (momentum, scrollbar, keys), snap to the nearest one.
    clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => {
      if (performance.now() < lockedUntil.current || !isPinned()) return;
      if (Math.abs(window.scrollY - stepTop(activeRef.current)) > 4) goTo(activeRef.current);
    }, 140);
  });

  // While pinned, each wheel gesture advances exactly one step.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function onWheel(event: WheelEvent) {
      if (!isPinned(2) || Math.abs(event.deltaY) < 2) return;

      const next = activeRef.current + Math.sign(event.deltaY);
      // At either end, let the page carry on out of the track (after the current step settles).
      if (next < 0 || next >= steps) {
        if (performance.now() < lockedUntil.current) {
          event.preventDefault();
          event.stopPropagation();
        }
        return;
      }

      // Stop Lenis (listening on window) from also scrolling this gesture.
      event.preventDefault();
      event.stopPropagation();
      if (performance.now() < lockedUntil.current) return;
      goTo(next);
    }

    track.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      track.removeEventListener("wheel", onWheel);
      clearTimeout(settleTimer.current);
    };
    // The handlers only read refs and lenis; re-bind once lenis is available.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lenis, steps]);

  return { active, direction, goTo, scrollYProgress };
}
