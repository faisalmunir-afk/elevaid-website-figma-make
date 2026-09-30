import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "../../lib/useReducedMotion";
import { useStepSnap } from "../../lib/useStepSnap";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { cn } from "../../lib/utils";
import {
  IdentityVisual,
  IngestionVisual,
  PermissionVisual,
  PipelineVisual,
  PlainLanguageVisual,
} from "./platform-visuals";

const FEATURES = [
  {
    tag: "two separate pathways",
    title: "Two ways in, kept apart",
    body: "Patients pull their own records, on their own initiative. Physicians pull records for their own patients, for treatment. Two separate processes, one organized result.",
    visual: <IngestionVisual />,
  },
  {
    tag: "identity binding",
    title: "Verified person, not a name match",
    body: "ID.me at IAL2 and Verato enrichment tie a patient's app account to their record in a physician's panel.",
    visual: <IdentityVisual />,
  },
  {
    tag: "harmonization",
    title: "One problem list, both sides",
    body: "The same deterministic pipeline runs for patient and physician — not two interpretations.",
    visual: <PipelineVisual />,
  },
  {
    tag: "plain language",
    title: "Readable by the person it's about",
    body: "The record is translated, not just displayed. Ask it anything.",
    visual: <PlainLanguageVisual />,
  },
  {
    tag: "patient-initiated sharing",
    title: "Partial, timed, revocable",
    body: "Patients choose to share, on their own terms, whenever they choose.",
    visual: <PermissionVisual />,
  },
];

// Direction-aware swap: incoming content rises from below when moving forward.
const swap = {
  enter: (dir: number) => ({ opacity: 0, y: dir * 36 }),
  center: { opacity: 1, y: 0 },
  exit: (dir: number) => ({ opacity: 0, y: dir * -36 }),
};

const swapTransition = { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const };

export function Platform() {
  const trackRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { active, direction, goTo } = useStepSnap(trackRef, FEATURES.length);

  const feature = FEATURES[active];

  return (
    <section id="platform" className="scroll-mt-24 bg-surface-muted pt-24 sm:pt-32">
      <Container>
        <SectionHeading
          heading={
            <>
              One record, two windows. Everything else follows from that.
            </>
          }
          lede="The app and the dashboard are two separate tools on the same infrastructure — one for patients managing their own records, one for physicians treating their own patients."
        />
      </Container>

      {/* Desktop: pinned stage, one feature per scroll step */}
      <div
        ref={trackRef}
        className="relative hidden lg:block"
        style={{ height: `${FEATURES.length * 100}vh` }}
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <Container className="relative z-10 grid w-full grid-cols-2 items-center gap-16 pt-16">
            <div className="flex gap-8">
              {/* Step rail */}
              <div className="flex flex-col gap-2 pt-1">
                {FEATURES.map((f, i) => (
                  <button
                    key={f.tag}
                    type="button"
                    aria-label={`Show ${f.title}`}
                    aria-current={active === i}
                    onClick={() => goTo(i)}
                    className="group flex h-8 w-1.5 items-stretch"
                  >
                    <span
                      className={cn(
                        "w-full rounded-full transition-colors duration-300",
                        active === i ? "bg-accent" : "bg-border-strong group-hover:bg-ink-400"
                      )}
                    />
                  </button>
                ))}
              </div>

              <div className="relative min-h-[220px] flex-1">
                <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                  <motion.div
                    key={feature.tag}
                    custom={direction}
                    variants={shouldReduceMotion ? undefined : swap}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={swapTransition}
                  >
                    <p className="font-mono text-xs font-medium text-accent">{feature.tag}</p>
                    <h3 className="mt-3 text-3xl font-bold tracking-tight text-ink-900 xl:text-4xl">
                      {feature.title}
                    </h3>
                    <p className="mt-4 max-w-md text-base leading-relaxed text-ink-500">
                      {feature.body}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="relative w-full">
              <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                <motion.div
                  key={feature.tag}
                  custom={direction}
                  variants={shouldReduceMotion ? undefined : swap}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ ...swapTransition, delay: 0.05 }}
                  className="w-full"
                >
                  {feature.visual}
                </motion.div>
              </AnimatePresence>
            </div>
          </Container>
        </div>
      </div>

      {/* Mobile / tablet: stacked, no pinning */}
      <Container className="pb-24 sm:pb-32 lg:hidden">
        <div className="mt-16 space-y-16">
          {FEATURES.map((f, i) => (
            <Reveal key={f.tag} delay={i * 0.05} y={20}>
              <article>
                <p className="font-mono text-xs font-medium text-accent">{f.tag}</p>
                <h3 className="mt-3 text-lg font-bold text-ink-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{f.body}</p>
                <div className="mt-6">{f.visual}</div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
