import { motion, type Variants } from "framer-motion";
import { useReducedMotion } from "../../lib/useReducedMotion";
import {
  Building2,
  Check,
  FlaskConical,
  HeartPulse,
  Minus,
  Siren,
  TriangleAlert,
  X,
  type LucideIcon,
} from "lucide-react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { ProblemGap } from "./ProblemGap";
import { cn } from "../../lib/utils";

/* ------------------------------------------------------------------ */
/* Data: one list of Marcus's records, seen from both sides               */
/* ------------------------------------------------------------------ */

type State = "yes" | "partial" | "no";
type Cell = { state: State; note: string };

const SYSTEMS: Record<string, { icon: LucideIcon; name: string; sub: string; hers: boolean }> = {
  mercy: { icon: Building2, name: "Mercy Health", sub: "her network", hers: true },
  er: { icon: Siren, name: "City ER", sub: "separate system", hers: false },
  heart: { icon: HeartPulse, name: "Heart Associates", sub: "out of network", hers: false },
  quest: { icon: FlaskConical, name: "Quest Labs", sub: "separate system", hers: false },
};

const RECORDS: {
  label: string;
  meta: string;
  ali: Cell;
  doctor: Cell;
  lives: keyof typeof SYSTEMS;
  nobody?: boolean;
}[] = [
  {
    label: "Blood pressure meds",
    meta: "lisinopril · since 2019",
    ali: { state: "yes", note: "remembers" },
    doctor: { state: "yes", note: "in her chart" },
    lives: "mercy",
  },
  {
    label: "Type 2 diabetes",
    meta: "diagnosed 2018",
    ali: { state: "partial", note: "“about 6 years”" },
    doctor: { state: "yes", note: "in her chart" },
    lives: "mercy",
  },
  {
    label: "ER visit",
    meta: "chest pain · 2023",
    ali: { state: "yes", note: "remembers" },
    doctor: { state: "no", note: "not visible" },
    lives: "er",
  },
  {
    label: "Cardiology consult",
    meta: "stress test · 2023",
    ali: { state: "partial", note: "went · no results" },
    doctor: { state: "no", note: "not visible" },
    lives: "heart",
  },
  {
    label: "Kidney function",
    meta: "flagged low · 2021",
    ali: { state: "no", note: "never saw it" },
    doctor: { state: "no", note: "not visible" },
    lives: "quest",
  },
  {
    label: "Contrast dye allergy",
    meta: "reaction during CT · 2023",
    ali: { state: "no", note: "never told" },
    doctor: { state: "no", note: "not visible" },
    lives: "heart",
    nobody: true,
  },
];

/* ------------------------------------------------------------------ */
/* Choreography: rows land, Marcus's column fills, then hers, then alarm  */
/* ------------------------------------------------------------------ */

const EASE = [0.16, 1, 0.3, 1] as const;
const STEP = 0.09;
const ROWS_AT = 0.05;
const ALI_AT = 0.4;
const DOCTOR_AT = ALI_AT + RECORDS.length * STEP + 0.15;
const LIVES_AT = DOCTOR_AT + RECORDS.length * STEP + 0.1;
const ALARM_AT = LIVES_AT + 0.35;

const fadeIn: Variants = {
  hidden: { opacity: 0, x: -10 },
  show: (delay: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay, duration: 0.5, ease: EASE },
  }),
};

// Scale overshoots for a snappy pop; opacity eases plainly.
const pop: Variants = {
  hidden: { opacity: 0, scale: 0.4 },
  show: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay,
      duration: 0.45,
      ease: [0.34, 1.56, 0.64, 1],
      opacity: { delay, duration: 0.25 },
    },
  }),
};

const grow: Variants = {
  hidden: { scaleX: 0 },
  show: (delay: number) => ({ scaleX: 1, transition: { delay, duration: 0.35, ease: EASE } }),
};

const alarm: Variants = {
  hidden: { backgroundColor: "rgba(254, 242, 242, 0)" },
  show: { backgroundColor: "rgba(254, 242, 242, 1)", transition: { delay: ALARM_AT, duration: 0.6 } },
};

/* ------------------------------------------------------------------ */
/* Pieces                                                              */
/* ------------------------------------------------------------------ */

const STATE_STYLE: Record<State, { icon: LucideIcon; ring: string; bar: string }> = {
  yes: { icon: Check, ring: "border-good-border bg-good-bg text-good", bar: "bg-good" },
  partial: { icon: Minus, ring: "border-warn-border bg-warn-bg text-warn", bar: "bg-warn" },
  no: { icon: X, ring: "border-bad-border bg-bad-bg text-bad", bar: "bg-bad-border" },
};

// Shared column layout: record · Marcus · Dr. Patel (stacks on small screens).
const ROW_GRID =
  "grid grid-cols-2 gap-x-4 gap-y-2 px-5 py-3 sm:px-6 lg:grid-cols-[1.6fr_1fr_1fr] lg:items-center lg:gap-6";

function StatusCell({ cell, delay }: { cell: Cell; delay: number }) {
  const { icon: Icon, ring } = STATE_STYLE[cell.state];

  return (
    <div className="flex items-center gap-2.5">
      <motion.span
        variants={pop}
        custom={delay}
        className={cn("flex h-6 w-6 shrink-0 items-center justify-center rounded-full border", ring)}
      >
        <Icon className="h-3 w-3" strokeWidth={3} />
      </motion.span>
      <motion.span
        variants={fadeIn}
        custom={delay + 0.05}
        className={cn("text-[13px] leading-tight", cell.state === "no" ? "text-ink-400" : "text-ink-700")}
      >
        {cell.note}
      </motion.span>
    </div>
  );
}

function PersonHeader({
  initials,
  title,
  line,
  tone,
}: {
  initials: string;
  title: string;
  line: string;
  tone: "primary" | "accent";
}) {
  return (
    <div className="flex items-start gap-3">
      <span
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-display text-[11px] font-bold",
          tone === "primary" ? "bg-primary-light text-primary-dark" : "bg-accent-light text-good"
        )}
      >
        {initials}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-ink-900">{title}</p>
        <p className="mt-0.5 hidden text-xs leading-snug text-ink-400 sm:block">{line}</p>
      </div>
    </div>
  );
}

function Tally({ who, delay }: { who: "ali" | "doctor"; delay: number }) {
  const cells = RECORDS.map((r) => r[who]);
  const full = cells.filter((c) => c.state === "yes").length;
  const partial = cells.filter((c) => c.state === "partial").length;

  return (
    <div>
      <p className="text-sm text-ink-500">
        <span className="font-display text-base font-bold text-ink-900">{full} of {RECORDS.length}</span>
        {partial > 0 && (
          <span className="block text-xs text-ink-400 sm:ml-1.5 sm:inline">+{partial} half-remembered</span>
        )}
      </p>
      <div className="mt-1.5 flex h-1.5 gap-1" aria-hidden>
        {cells.map((c, i) => (
          <motion.span
            key={i}
            variants={grow}
            custom={delay + i * 0.05}
            className={cn("h-full flex-1 origin-left rounded-full", STATE_STYLE[c.state].bar)}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function Problem() {
  const reduce = useReducedMotion();

  return (
    <section id="problem" className="scroll-mt-24 pt-24 sm:pt-32">
      <Container>
        <SectionHeading
          align="center"
          heading={
            <>
              Nothing is lost. It&apos;s just everywhere at once.
            </>
          }
          lede="Fourteen years of Marcus's care sits in four systems that don't talk to each other — so the two people who need it most rebuild it from memory."
        />

        <motion.div
          initial={reduce ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border border-border bg-white shadow-card"
        >
          {/* Column headers */}
          <div className={cn(ROW_GRID, "border-b border-border bg-surface-muted")}>
            <p className="hidden text-xs font-semibold text-ink-500 lg:block">Marcus&apos;s record</p>
            <PersonHeader
              initials="MH"
              title="Marcus remembers"
              line="He can't hand over what he was never given."
              tone="primary"
            />
            <PersonHeader
              initials="PP"
              title="Dr. Patel can see"
              line="She can't see past her own walls."
              tone="accent"
            />
          </div>

          {/* One row per record; where it lives sits in the detail line */}
          <div className="divide-y divide-border">
            {RECORDS.map((record, i) => {
              const system = SYSTEMS[record.lives];
              const SystemIcon = system.icon;

              return (
                <motion.div
                  key={record.label}
                  variants={record.nobody ? alarm : undefined}
                  className={cn(ROW_GRID, "relative")}
                >
                  {record.nobody && (
                    <motion.span
                      aria-hidden
                      variants={{
                        hidden: { scaleY: 0 },
                        show: { scaleY: 1, transition: { delay: ALARM_AT, duration: 0.4, ease: EASE } },
                      }}
                      className="absolute inset-y-0 left-0 w-1 origin-top bg-bad"
                    />
                  )}

                  <motion.div variants={fadeIn} custom={ROWS_AT + i * 0.06} className="col-span-2 min-w-0 lg:col-span-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <p className={cn("text-sm font-semibold", record.nobody ? "text-bad" : "text-ink-900")}>
                        {record.label}
                      </p>
                      {record.nobody && (
                        <motion.span
                          variants={pop}
                          custom={ALARM_AT + 0.15}
                          className="inline-flex items-center gap-1 rounded-full bg-bad px-2 py-0.5 text-[10.5px] font-semibold text-white"
                        >
                          <TriangleAlert className="h-3 w-3" /> Nobody in the room has this
                        </motion.span>
                      )}
                    </div>
                    <p className="mt-0.5 flex flex-wrap items-center gap-x-1.5 text-xs text-ink-400">
                      <span>{record.meta}</span>
                      <span aria-hidden>·</span>
                      <span
                        className={cn("inline-flex items-center gap-1", system.hers ? "text-good" : "text-ink-500")}
                        title={system.sub}
                      >
                        <SystemIcon className="h-3 w-3" />
                        {system.name}
                      </span>
                    </p>
                  </motion.div>

                  <StatusCell cell={record.ali} delay={ALI_AT + i * STEP} />
                  <StatusCell cell={record.doctor} delay={DOCTOR_AT + i * STEP} />
                </motion.div>
              );
            })}
          </div>

          {/* Totals */}
          <div className={cn(ROW_GRID, "border-t border-border bg-surface-muted")}>
            <p className="col-span-2 text-sm text-ink-500 lg:col-span-1">
              <span className="font-semibold text-ink-900">Full picture</span>
              <span className="ml-1.5 text-xs text-ink-400">4 systems, none shared</span>
            </p>
            <Tally who="ali" delay={ALI_AT + RECORDS.length * STEP} />
            <Tally who="doctor" delay={DOCTOR_AT + RECORDS.length * STEP} />
          </div>
        </motion.div>

        <Reveal y={16} className="mx-auto mt-8 max-w-4xl text-center">
          <p className="text-balance text-lg leading-relaxed text-ink-500">
            Every piece of Marcus&apos;s record exists.{" "}
            <span className="font-semibold text-ink-900">
              The one that could hurt him is the one nobody has.
            </span>
          </p>
        </Reveal>
      </Container>

      <div className="mt-20">
        <ProblemGap />
      </div>
    </section>
  );
}
