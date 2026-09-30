import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useReducedMotion } from "../../lib/useReducedMotion";
import {
  ArrowDown,
  Building2,
  Check,
  FlaskConical,
  Pill,
  Stethoscope,
  Unlink2,
  type LucideIcon,
} from "lucide-react";
import { Container } from "../ui/Container";
import { Icon3D } from "../ui/Icon3D";
import { Avatar, type AvatarPerson } from "../ui/Avatar";
import { cn } from "../../lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

const LEAD = "The patient can't remember it. The doctor can't see it.".split(" ");
const PUNCH = "They're three feet apart.";

/** One word of the headline: brightens and sharpens as its slice of the scroll passes. */
function Word({
  progress,
  range,
  className,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
  children: string;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);

  return (
    <motion.span
      style={{ opacity }}
      className={className}
    >
      {children}
    </motion.span>
  );
}

const INSTITUTIONS: { icon: LucideIcon; label: string }[] = [
  { icon: Building2, label: "Hospital" },
  { icon: FlaskConical, label: "Lab" },
  { icon: Pill, label: "Pharmacy" },
  { icon: Stethoscope, label: "Specialist" },
];

function Person({
  person,
  name,
  status,
  tone,
  from,
}: {
  person: AvatarPerson;
  name: string;
  status: string;
  tone: "primary" | "accent";
  from: "left" | "right";
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, x: from === "left" ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
      className="flex flex-col items-center text-center"
    >
      <span
        className={cn(
          "block h-16 w-16 overflow-hidden rounded-full border-2 bg-white shadow-card sm:h-20 sm:w-20",
          tone === "primary" ? "border-primary/40" : "border-accent/50"
        )}
      >
        <Avatar person={person} />
      </span>
      <p className="mt-3 text-sm font-semibold text-ink-900">{name}</p>
      <p className="mt-1 font-mono text-[11px] text-ink-400">{status}</p>
    </motion.div>
  );
}

export function ProblemGap() {
  const reduce = useReducedMotion();
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: headlineRef,
    offset: ["start 0.85", "end 0.45"],
  });
  // The punch line gets two word-slices of scroll so it lands last.
  const step = 1 / (LEAD.length + 2);

  return (
    <div className="relative isolate overflow-hidden bg-primary-light py-24 sm:py-32">

      <Container>

        <h2
          ref={headlineRef}
          className="mx-auto max-w-4xl text-center font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-ink-900 sm:text-5xl"
        >
          {LEAD.map((w, i) => (
            <span key={i}>
              {reduce ? w : <Word progress={scrollYProgress} range={[i * step, (i + 1) * step]}>{w}</Word>}{" "}
            </span>
          ))}
          <br className="hidden sm:block" />
          {/* One span, one gradient: splitting it per word would restart the gradient on every word */}
          {reduce ? (
            <span className="brand-text-gradient">{PUNCH}</span>
          ) : (
            <Word progress={scrollYProgress} range={[LEAD.length * step, 1]} className="brand-text-gradient">
              {PUNCH}
            </Word>
          )}
        </h2>

        {/* The picture: institutions wired together, the two people not */}
        <div className="mx-auto mt-16 max-w-3xl sm:mt-20">
          {/* Institutions row */}
          <div className="relative">
            <div className="absolute inset-x-[12.5%] top-6 h-px bg-border-strong">
              <motion.div
                className="h-full origin-left bg-[linear-gradient(90deg,transparent,var(--color-primary),transparent)]"
                initial={reduce ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1.2, ease: EASE }}
              />
            </div>

            <div className="relative grid grid-cols-4">
              {INSTITUTIONS.map(({ icon: Icon, label }, i) => (
                <motion.div
                  key={label}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
                  className="flex flex-col items-center"
                >
                  <Icon3D icon={Icon} tone="light" />
                  <span className="mt-2 font-mono text-[10px] uppercase tracking-wide text-ink-400">{label}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-5 flex justify-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 font-mono text-[11px] text-primary-dark">
                <Check className="h-3.5 w-3.5" strokeWidth={3} /> institutions · connected for 20 years
              </span>
            </div>
          </div>

          {/* People row */}
          <div className="mt-14 grid grid-cols-[auto_1fr_auto] items-start gap-4 sm:mt-16 sm:gap-8">
            <Person person="marcus" name="Marcus" status="can't remember" tone="primary" from="left" />

            {/* Same height as the avatars, so the line runs centre to centre */}
            <div className="relative flex h-16 items-center sm:h-20">
              {/* Dimension line with end ticks */}
              <div className="relative w-full">
                <span className="absolute bottom-full left-1/2 mb-7 -translate-x-1/2 whitespace-nowrap font-mono text-[11px] tracking-wide text-ink-500">
                  ≈ 3 ft
                </span>
                <motion.div
                  className="h-px w-full origin-center border-t border-dashed border-border-strong"
                  initial={reduce ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
                />
                <span className="absolute left-0 top-1/2 h-3 w-px -translate-y-1/2 bg-border-strong" />
                <span className="absolute right-0 top-1/2 h-3 w-px -translate-y-1/2 bg-border-strong" />
                <motion.span
                  className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-bad/40 bg-white text-bad"
                  initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16, delay: 1.3 }}
                >
                  <Unlink2 className="h-4 w-4" />
                </motion.span>
                <span className="absolute left-1/2 top-full mt-7 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] text-bad sm:text-[11px]">
                  people · never connected
                </span>
              </div>
            </div>

            <Person person="patel" name="Dr. Patel" status="can't see" tone="accent" from="right" />
          </div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mx-auto mt-16 max-w-2xl text-center sm:mt-20"
        >
          <p className="text-base leading-relaxed text-ink-500 sm:text-lg">
            For twenty years the fix has been connecting institutions —{" "}
            <span className="font-semibold text-ink-900">not the two people in the room.</span>
          </p>
          <a
            href="#platform"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-dark transition-colors hover:text-good"
          >
            So we connected them <ArrowDown className="h-4 w-4" />
          </a>
        </motion.div>
      </Container>
    </div>
  );
}
