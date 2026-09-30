import heroImage from "../../assets/images/hero-consult-light.png";
import { useRef, type ReactNode } from "react";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { Image } from "../ui/Image";
import {
  ArrowDown,
  ArrowRight,
  Check,
  ClipboardCheck,
  Clock,
  FlaskConical,
  MoveRight,
  Pill,
  ShieldCheck,
} from "lucide-react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import { useStepSnap } from "../../lib/useStepSnap";

/* ------------------------------------------------------------------ */
/* Card shell                                                          */
/* ------------------------------------------------------------------ */

function HeroCard({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-card sm:p-7">
      {children}
    </div>
  );
}

function CardTitle({ icon, title, meta }: { icon: ReactNode; title: string; meta?: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-dark text-white">
        {icon}
      </span>
      <p className="text-sm font-semibold text-ink-900">{title}</p>
      {meta && <span className="ml-auto font-mono text-[11px] text-ink-400">{meta}</span>}
    </div>
  );
}

function SeenBy({ initials, name, tone }: { initials: string; name: string; tone: "primary" | "accent" }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-muted py-1 pl-1 pr-3">
      <span
        className={
          tone === "primary"
            ? "flex h-6 w-6 items-center justify-center rounded-full bg-primary-light font-display text-[10px] font-bold text-primary-dark"
            : "flex h-6 w-6 items-center justify-center rounded-full bg-accent-light font-display text-[10px] font-bold text-good"
        }
      >
        {initials}
      </span>
      <span className="text-xs text-ink-500">{name}</span>
      <Check className="h-3.5 w-3.5 text-good" strokeWidth={3} />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Card contents                                                       */
/* ------------------------------------------------------------------ */

function RecordCard() {
  return (
    <RevealGroup stagger={0.12} amount={0.3}>
      <RevealItem>
        <CardTitle icon={<Check className="h-3.5 w-3.5" strokeWidth={3} />} title="Verified patient record" />
      </RevealItem>

      <RevealItem>
        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-light font-display text-sm font-bold text-primary-dark">
              MH
            </span>
            <div className="text-left">
              <p className="text-sm font-semibold text-ink-900">Marcus Hale</p>
              <p className="text-xs text-ink-400">Patient</p>
            </div>
          </div>

          <div aria-hidden className="hidden h-px flex-1 bg-border-strong sm:block" />

          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-light font-display text-sm font-bold text-good">
              PP
            </span>
            <div className="text-left">
              <p className="text-sm font-semibold text-ink-900">Dr. Priya Patel</p>
              <p className="text-xs text-ink-400">Physician</p>
            </div>
          </div>
        </div>
      </RevealItem>

      <RevealItem>
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-border pt-5">
          <p className="text-sm text-ink-400">A1c</p>
          <p className="font-display text-3xl font-bold tracking-tight text-ink-900">6.4%</p>
          <span aria-hidden className="h-6 w-px bg-border-strong" />
          <p className="text-sm text-ink-400">Previously 6.9%</p>
          <span className="ml-auto inline-flex items-center rounded-full border border-accent/30 bg-accent-light px-3 py-1 font-mono text-[11px] font-medium text-good">
            Improving
          </span>
        </div>
      </RevealItem>

      <RevealItem>
        <p className="mt-5 border-t border-border pt-4 text-center text-sm text-ink-400">
          Verified. Organized. Ready.
        </p>
      </RevealItem>
    </RevealGroup>
  );
}

function LabCard() {
  return (
    <>
      <CardTitle icon={<FlaskConical className="h-3.5 w-3.5" />} title="New lab result" meta="Quest · 2m ago" />

      <div className="mt-6 flex flex-wrap items-end gap-x-4 gap-y-3">
        <div>
          <p className="text-sm text-ink-400">LDL cholesterol</p>
          <p className="mt-1 font-display text-3xl font-bold tracking-tight text-ink-900">
            98 <span className="text-lg font-semibold text-ink-400">mg/dL</span>
          </p>
        </div>
        <span className="mb-1 ml-auto inline-flex items-center rounded-full border border-accent/30 bg-accent-light px-3 py-1 font-mono text-[11px] font-medium text-good">
          In range
        </span>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-border pt-5">
        <SeenBy initials="MH" name="Marcus" tone="primary" />
        <SeenBy initials="PP" name="Dr. Patel" tone="accent" />
      </div>

      <p className="mt-5 border-t border-border pt-4 text-center text-sm text-ink-400">
        Arrived once. No re-entry needed.
      </p>
    </>
  );
}

function CarePlanCard() {
  return (
    <>
      <CardTitle icon={<ClipboardCheck className="h-3.5 w-3.5" />} title="Care plan updated" meta="Dr. Patel · today" />

      <div className="mt-6 flex items-center gap-3 rounded-2xl border border-border bg-surface-muted p-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary-dark">
          <Pill className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-ink-900">Metformin</p>
          <p className="flex items-center gap-1.5 font-mono text-xs text-ink-400">
            500 mg <MoveRight className="h-3.5 w-3.5 text-good" /> <span className="text-ink-900">1000 mg</span>
          </p>
        </div>
      </div>

      <p className="mt-4 rounded-2xl rounded-tl-md bg-primary-light px-4 py-3 text-sm text-ink-700">
        “Take one more tablet with dinner.”
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-border pt-5">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent-light px-3 py-1 text-xs font-medium text-good">
          <Check className="h-3.5 w-3.5" strokeWidth={3} /> Marcus acknowledged
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-muted px-3 py-1 font-mono text-[11px] text-ink-500">
          <Clock className="h-3.5 w-3.5" /> shared 7 days
        </span>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Scroll-driven deck                                                  */
/* ------------------------------------------------------------------ */

// Scroll windows (0..1 of the pinned hero) in which cards 2 and 3 arrive; steps snap to 0, 0.5, 1.
const ARRIVALS = [
  [0.05, 0.45],
  [0.55, 0.95],
] as const;

function arrival(progress: number, index: number) {
  if (index === 0) return 1;
  const [start, end] = ARRIVALS[index - 1];
  return Math.min(1, Math.max(0, (progress - start) / (end - start)));
}

/** How many cards have landed on top of this one (fractional while one is arriving). */
function depth(progress: number, index: number, count: number) {
  let d = 0;
  for (let j = index + 1; j < count; j++) d += arrival(progress, j);
  return d;
}

function DeckLayer({
  progress,
  index,
  count,
  children,
}: {
  progress: MotionValue<number>;
  index: number;
  count: number;
  children: ReactNode;
}) {
  const y = useTransform(progress, (p) => (1 - arrival(p, index)) * 80 - depth(p, index, count) * 34);
  const scale = useTransform(
    progress,
    (p) => (0.94 + 0.06 * arrival(p, index)) * (1 - depth(p, index, count) * 0.05)
  );
  const opacity = useTransform(
    progress,
    (p) => arrival(p, index) * (1 - depth(p, index, count) * 0.3)
  );
  // Any filter (even blur(0)) cuts the glass off from the photo behind it, so drop it when settled.
  const filter = useTransform(progress, (p) => {
    const amount = (1 - arrival(p, index)) * 18 + depth(p, index, count) * 1.5;
    return amount < 0.05 ? "none" : `blur(${amount}px)`;
  });

  return (
    <motion.div
      style={{ y, scale, opacity, filter, zIndex: index }}
      className="origin-top [grid-area:1/1]"
    >
      {children}
    </motion.div>
  );
}


/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Three cards, one per scroll step.
  const { scrollYProgress } = useStepSnap(sectionRef, 3);

  const cards = [<RecordCard key="record" />, <LabCard key="lab" />, <CarePlanCard key="plan" />];

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative scroll-mt-24 bg-white lg:h-[260vh]"
    >
      <div className="relative isolate flex min-h-dvh flex-col justify-center overflow-hidden pb-20 pt-28 sm:pb-28 sm:pt-32 lg:pt-20 lg:sticky lg:top-0 lg:h-dvh lg:pb-12">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-20">
          <Image
            src={heroImage}
            alt=""
            fill
            preload
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        {/* Keeps the headline legible over the photo: full wash on phones, left-side fade on desktop */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-white/70 lg:bg-transparent lg:bg-[linear-gradient(90deg,rgba(255,255,255,0.94)_0%,rgba(255,255,255,0.82)_34%,rgba(255,255,255,0.3)_56%,rgba(255,255,255,0)_74%)]"
        />

        <Container className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Left — the pitch */}
          <div className="text-center lg:text-left">
            <Reveal>
              <p className="text-balance text-sm font-medium text-ink-700">
                <ShieldCheck className="mr-1.5 inline h-4 w-4 -translate-y-px align-middle text-primary-dark" />
                Verified access for physicians. Verified access for patients.
              </p>
            </Reveal>

            <Reveal delay={0.05} className="mt-5">
              <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-ink-900 sm:text-5xl xl:text-[3.5rem]">
                <span className="brand-text-gradient pb-1">One record.</span>
                <span className="block text-balance">Not between institutions.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.1} className="mt-6">
              <p className="mx-auto max-w-md text-balance text-lg leading-relaxed text-ink-700 lg:mx-0">
                Physicians query it for their patients. Patients manage it for themselves.
              </p>
            </Reveal>

            <Reveal
              delay={0.15}
              className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-6 lg:justify-start"
            >
              <Button href="#cta" variant="primary" className="px-6 py-3 text-base">
                Book a demo
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                href="#problem"
                variant="ghost"
                className="px-2 py-3 text-base text-ink-700 hover:text-ink-900"
              >
                See the problem
                <ArrowDown className="h-4 w-4" />
              </Button>
            </Reveal>

            <Reveal delay={0.2} className="mt-5">
              <p className="text-xs font-medium text-ink-500">
                Free to connect your first records · No card required
              </p>
            </Reveal>
          </div>

          {/* Right — desktop: cards land on a deck as the pinned hero scrolls */}
          <Reveal delay={0.25} y={32} className="hidden lg:block">
            <div className="grid pt-16">
              {cards.map((card, i) => (
                <DeckLayer key={i} progress={scrollYProgress} index={i} count={cards.length}>
                  <HeroCard>{card}</HeroCard>
                </DeckLayer>
              ))}
            </div>
          </Reveal>

          {/* Mobile / tablet: cards stack */}
          <div className="space-y-5 lg:hidden">
            {cards.map((card, i) => (
              <Reveal key={i} delay={i === 0 ? 0.25 : 0} y={32}>
                <HeroCard>{card}</HeroCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
