import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "../../lib/useReducedMotion";
import {
  Check,
  ClipboardList,
  Clock,
  Database,
  Download,
  Eye,
  FileText,
  Fingerprint,
  FlaskConical,
  KeyRound,
  Languages,
  Layers,
  ListTree,
  Lock,
  MessageCircle,
  Pill,
  ScanLine,
  ShieldCheck,
  Smartphone,
  Stethoscope,
  TrendingDown,
  Undo2,
  User,
  type LucideIcon,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Avatar } from "../ui/Avatar";

/* ------------------------------------------------------------------ */
/* Stage + primitives                                                  */
/* ------------------------------------------------------------------ */

// Every visual is laid out on a fixed 600×500 canvas, then scaled to fit its column.
const W = 600;
const H = 500;
const EASE = [0.16, 1, 0.3, 1] as const;

const cardShadow =
  "shadow-[0_1px_2px_rgba(11,18,32,0.05),0_20px_44px_-16px_rgba(11,18,32,0.24)]";

function Stage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / W));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative w-full" style={{ aspectRatio: `${W} / ${H}` }}>
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{ width: W, height: H, transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
}

/** Absolutely positioned, centred on (x, y); fades in. */
function Node({
  x,
  y,
  delay = 0,
  rotate = 0,
  className,
  children,
}: {
  x: number;
  y: number;
  delay?: number;
  rotate?: number;
  className?: string;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: x, top: y, rotate: `${rotate}deg` }}
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.15 + delay, ease: EASE }}
      >
        <div className={className}>{children}</div>
      </motion.div>
    </div>
  );
}

function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("rounded-2xl border border-border/70 bg-white", cardShadow, className)}>
      {children}
    </div>
  );
}

const TILE_TONES = {
  primary: "bg-primary-light text-primary-dark ring-primary/20",
  accent: "bg-accent-light text-good ring-accent/30",
  ink: "bg-ink-900 text-white ring-ink-900",
  muted: "bg-surface-sunk text-ink-500 ring-border",
} as const;

function IconTile({
  icon: Icon,
  tone = "primary",
  size = "md",
}: {
  icon: LucideIcon;
  tone?: keyof typeof TILE_TONES;
  size?: "sm" | "md";
}) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center ring-1",
        size === "md" ? "h-9 w-9 rounded-xl" : "h-7 w-7 rounded-lg",
        TILE_TONES[tone]
      )}
    >
      <Icon className={size === "md" ? "h-[18px] w-[18px]" : "h-3.5 w-3.5"} strokeWidth={2} />
    </span>
  );
}

function CardHeader({
  icon,
  tone,
  title,
  sub,
}: {
  icon: LucideIcon;
  tone?: keyof typeof TILE_TONES;
  title: string;
  sub: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <IconTile icon={icon} tone={tone} />
      <div className="min-w-0">
        <p className="truncate font-display text-[14px] font-bold leading-tight text-ink-900">{title}</p>
        <p className="mt-0.5 truncate text-[11.5px] text-ink-400">{sub}</p>
      </div>
    </div>
  );
}

function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-border bg-surface-muted px-2 py-0.5 font-mono text-[10px] font-medium text-ink-500",
        className
      )}
    >
      {children}
    </span>
  );
}

/** A connector drawn in, with a pulse that keeps travelling along it. */
function Flow({
  d,
  delay = 0,
}: {
  d: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <>
      <svg aria-hidden className="pointer-events-none absolute inset-0" width={W} height={H} fill="none">
        <motion.path
          d={d}
          stroke="var(--color-border-strong)"
          strokeWidth={1.5}
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.3 + delay, ease: EASE }}
        />
      </svg>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 1 · Two separate pathways                                           */
/* ------------------------------------------------------------------ */

// Two lanes that never touch: who starts each pull, why, and under whose access.
// Same pipeline and format on both sides, but no shared store and no mixed list.
const LANES = [
  {
    x: 150,
    tag: { icon: User, label: "Patient-initiated", tone: "primary" as const },
    source: { icon: Smartphone, title: "Patient app", sub: "Marcus · his own login", chips: ["Quest", "CVS", "Mercy"] },
    result: {
      title: "Marcus's record",
      sub: "In his app",
      rows: [
        { icon: FlaskConical, label: "A1c · 6.4%" },
        { icon: Pill, label: "Metformin 500 mg" },
      ],
    },
  },
  {
    x: 450,
    tag: { icon: Stethoscope, label: "Treatment only", tone: "accent" as const },
    source: { icon: ClipboardList, title: "Physician dashboard", sub: "Dr. Patel · her patients", chips: ["NPI-scoped", "Consent ✓"] },
    result: {
      title: "Today's chart",
      sub: "Dr. Patel's dashboard",
      rows: [
        { icon: FlaskConical, label: "A1c · 6.4%" },
        { icon: FileText, label: "Discharge summary" },
      ],
    },
  },
];

/**
 * The patient's optional share: one way, from Marcus's record to Dr. Patel's chart, through a gate
 * only he controls. Static on purpose, with no motion between patient and physician.
 */
function ShareByPatient() {
  return (
    <>
      <motion.svg
        aria-hidden
        className="pointer-events-none absolute inset-0"
        width={W}
        height={H}
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9, ease: EASE }}
      >
        <path
          d="M150 413 L150 424 Q150 438 164 438 L436 438 Q450 438 450 424 L450 421"
          stroke="var(--color-primary-dark)"
          strokeWidth={1.75}
          strokeDasharray="5 5"
          strokeLinecap="round"
        />
        {/* Arrowhead into Dr. Patel's chart */}
        <path d="M444.5 421 L450 411.5 L455.5 421 Z" fill="var(--color-primary-dark)" />
      </motion.svg>

      <Node x={300} y={438} delay={0.95}>
        <span className="flex flex-col items-center whitespace-nowrap rounded-xl border border-primary/30 bg-white px-3 py-1.5 text-center shadow-sm">
          <span className="flex items-center gap-1 text-[11px] font-semibold text-primary-dark">
            <KeyRound className="h-3 w-3" /> Marcus chooses to share
          </span>
          <span className="text-[10px] text-ink-500">what · how long · revoke anytime</span>
        </span>
      </Node>
    </>
  );
}

export function IngestionVisual() {
  return (
    <Stage>
      {/* The divider: the two pathways stay apart. It stops at the one gate, which only the patient opens. */}
      <div aria-hidden className="absolute left-[300px] top-[18px] h-[402px] border-l-2 border-dashed border-border-strong" />
      <Node x={300} y={190} delay={0.35}>
        <span className="flex items-center gap-1 rounded-full border border-border bg-white px-2.5 py-1 text-[10.5px] font-semibold text-ink-500 shadow-sm">
          <Lock className="h-3 w-3" /> Kept apart
        </span>
      </Node>

      {LANES.map((lane, i) => (
        <div key={lane.source.title}>
          <Flow d={`M${lane.x} 144 L${lane.x} 170`} delay={0.2 + i * 0.2} />
          <Flow d={`M${lane.x} 211 L${lane.x} 236`} delay={0.4 + i * 0.2} />

          <Node x={lane.x} y={20} delay={i * 0.1}>
            <span
              className={cn(
                "flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold",
                lane.tag.tone === "primary" ? "bg-primary-light text-primary-dark" : "bg-accent-light text-good"
              )}
            >
              <lane.tag.icon className="h-3.5 w-3.5" /> {lane.tag.label}
            </span>
          </Node>

          <Node x={lane.x} y={92} delay={0.05 + i * 0.1}>
            <Card className="w-[224px] p-4">
              <CardHeader icon={lane.source.icon} tone={lane.tag.tone} title={lane.source.title} sub={lane.source.sub} />
              <div className="mt-3 flex flex-wrap gap-1.5">
                {lane.source.chips.map((chip) => (
                  <Chip key={chip}>{chip}</Chip>
                ))}
              </div>
            </Card>
          </Node>

          <Node x={lane.x} y={190} delay={0.3 + i * 0.1}>
            <Card className="flex items-center gap-2 whitespace-nowrap rounded-full py-1.5 pl-1.5 pr-3.5">
              <IconTile icon={Layers} tone="ink" size="sm" />
              <span className="text-[11.5px] font-semibold text-ink-700">Organized</span>
            </Card>
          </Node>

          <Node x={lane.x} y={323} delay={0.45 + i * 0.1}>
            <Card className="w-[232px] p-4">
              <CardHeader icon={Database} tone={lane.tag.tone} title={lane.result.title} sub={lane.result.sub} />
              <div className="mt-3 space-y-1.5">
                {lane.result.rows.map((row) => (
                  <div key={row.label} className="flex items-center gap-2.5 rounded-xl bg-surface-muted px-2.5 py-2">
                    <IconTile icon={row.icon} tone={lane.tag.tone} size="sm" />
                    <span className="truncate text-[12px] font-medium text-ink-700">{row.label}</span>
                  </div>
                ))}
              </div>
            </Card>
          </Node>
        </div>
      ))}

      {/* Optional, one-way and patient-controlled: the only path across the divider */}
      <ShareByPatient />

      <Node x={300} y={484} delay={0.7}>
        <span className="flex items-center gap-1.5 whitespace-nowrap text-[11px] font-medium text-ink-500">
          <ListTree className="h-3.5 w-3.5 text-primary-dark" /> Same pipeline · same clean format · separate access
        </span>
      </Node>
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* 2 · Identity binding                                                */
/* ------------------------------------------------------------------ */

export function IdentityVisual() {
  return (
    <Stage>

      <Flow d="M104 156 C104 222, 150 222, 184 222" />
      <Flow d="M496 156 C496 222, 450 222, 416 222" delay={0.4} />
      <Flow d="M300 322 L300 382" delay={0.8} />

      <Node x={104} y={112} delay={0}>
        <Card className="w-[188px] p-3.5">
          <CardHeader icon={User} title="App account" sub="Marcus's own login" />
        </Card>
      </Node>

      <Node x={496} y={112} delay={0.1}>
        <Card className="w-[188px] p-3.5">
          <CardHeader icon={ClipboardList} tone="accent" title="Panel record" sub="MRN 00482" />
        </Card>
      </Node>

      <Node x={300} y={222} delay={0.25}>
        <Card className="w-[232px] overflow-hidden">
          <div className="flex items-center justify-between bg-primary-dark px-4 py-2.5">
            <span className="flex items-center gap-1.5 text-[12px] font-semibold text-white">
              <ShieldCheck className="h-4 w-4" /> Verified identity
            </span>
            <span className="rounded-full bg-white/25 px-2 py-0.5 font-mono text-[10px] font-semibold text-white">
              IAL2
            </span>
          </div>
          <div className="flex items-center gap-3 px-4 py-4">
            <span className="block h-12 w-12 shrink-0 overflow-hidden rounded-full ring-4 ring-white shadow-md">
              <Avatar person="marcus" />
            </span>
            <div>
              <p className="font-display text-[15px] font-bold text-ink-900">Marcus Hale</p>
              <p className="font-mono text-[10.5px] text-ink-400">DOB ••/••/1981</p>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-border px-4 py-2.5">
            <span className="font-mono text-[10px] text-ink-400">via ID.me</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-white">
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
          </div>
        </Card>
      </Node>

      <Node x={300} y={414} delay={0.55}>
        <Card className="flex w-[244px] items-center gap-3 rounded-full py-2 pl-2 pr-4">
          <IconTile icon={Fingerprint} tone="accent" size="sm" />
          <div className="flex-1">
            <div className="flex items-baseline justify-between">
              <span className="text-[11.5px] font-semibold text-ink-700">Verato match</span>
              <span className="font-mono text-[11px] font-semibold text-good">99.2%</span>
            </div>
            <div className="mt-1 h-1 overflow-hidden rounded-full bg-surface-sunk">
              <motion.div
                className="h-full rounded-full bg-accent"
                initial={{ width: "0%" }}
                animate={{ width: "99.2%" }}
                transition={{ duration: 1.2, delay: 0.9, ease: EASE }}
              />
            </div>
          </div>
        </Card>
      </Node>
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* 3 · Harmonization pipeline                                          */
/* ------------------------------------------------------------------ */

const RAW_SOURCES = [
  { text: "E11.9", source: "Quest", rotate: -7, y: 180 },
  { text: "Type 2 DM", source: "Mercy", rotate: 4, y: 250 },
  { text: "DM2, uncontrolled", source: "Patient", rotate: -3, y: 320 },
];

const PIPELINE_STEPS = [
  { icon: Download, label: "Extract" },
  { icon: Languages, label: "Normalize" },
  { icon: Layers, label: "Dedup" },
  { icon: ListTree, label: "Group" },
];

export function PipelineVisual() {
  return (
    <Stage>
      <Flow d="M196 250 L262 250" />
      <Flow d="M338 250 L392 250" delay={0.6} />

      {RAW_SOURCES.map((src, i) => (
        <Node key={src.text} x={112} y={src.y} rotate={src.rotate} delay={i * 0.08}>
          <Card className="w-[160px] px-3.5 py-2.5">
            <p className="font-mono text-[9.5px] uppercase tracking-wide text-ink-400">{src.source}</p>
            <p className="mt-0.5 font-mono text-[12.5px] font-medium text-ink-700">{src.text}</p>
          </Card>
        </Node>
      ))}

      <Node x={300} y={250} delay={0.25}>
        <Card className="flex w-[76px] flex-col items-center gap-1 rounded-full px-2 py-3">
          {PIPELINE_STEPS.map((step) => (
            <div key={step.label} className="flex flex-col items-center gap-1 py-1.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-sunk text-ink-500">
                <step.icon className="h-4 w-4" />
              </span>
              <span className="font-mono text-[8.5px] font-medium uppercase text-ink-400">{step.label}</span>
            </div>
          ))}
        </Card>
      </Node>

      <Node x={494} y={250} delay={0.45}>
        <Card className="w-[196px] p-4">
          <CardHeader icon={ListTree} tone="accent" title="Problem list" sub="Deduped · coded" />
          <div className="mt-3 rounded-xl bg-surface-muted px-3 py-2.5">
            <p className="text-[12.5px] font-semibold text-ink-900">Type 2 diabetes</p>
            <p className="font-mono text-[9.5px] text-ink-400">SNOMED 44054006</p>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex -space-x-1.5">
              <span className="block h-6 w-6 overflow-hidden rounded-full ring-2 ring-white">
                <Avatar person="marcus" />
              </span>
              <span className="block h-6 w-6 overflow-hidden rounded-full ring-2 ring-white">
                <Avatar person="patel" />
              </span>
            </div>
            <span className="text-right text-[10.5px] font-semibold leading-tight text-good">same format ·<br />separate views</span>
          </div>
        </Card>
      </Node>
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* 4 · Plain language                                                  */
/* ------------------------------------------------------------------ */

const TREND = [6.9, 6.8, 6.7, 6.6, 6.4];

export function PlainLanguageVisual() {
  const points = TREND.map((v, i) => `${8 + i * 52},${8 + ((6.95 - v) / 0.6) * 40}`).join(" ");

  return (
    <Stage>
      <Flow d="M196 238 C196 300, 232 318, 264 318" />

      <Node x={196} y={150} rotate={-4} delay={0}>
        <div className="w-[248px] rounded-2xl border border-border bg-surface-sunk/90 p-4 shadow-[0_14px_30px_-18px_rgba(11,18,32,0.3)]">
          <p className="font-mono text-[9.5px] uppercase tracking-wide text-ink-400">Observation · LOINC 4548-4</p>
          <div className="mt-2 space-y-1 font-mono text-[11px] leading-relaxed text-ink-500">
            <p>
              valueQuantity: <span className="text-ink-900">6.4 %</span>
            </p>
            <p>refRange: 4.0–5.6</p>
            <p>interpretation: H</p>
            <p>status: final</p>
          </div>
        </div>
      </Node>

      <Node x={410} y={312} delay={0.3}>
        <Card className="w-[290px] p-4">
          <CardHeader icon={Languages} title="In plain words" sub="Translated from your record" />
          <p className="mt-3 font-display text-[18px] font-bold leading-snug text-ink-900">
            Your blood sugar is <span className="text-primary-dark">improving.</span>
          </p>
          <p className="mt-1 text-[12px] leading-snug text-ink-500">
            Still above the normal range (4.0–5.6%), and moving the right way.
          </p>
          <svg viewBox="0 0 224 56" className="mt-3 h-14 w-full" fill="none">
            <motion.polyline
              points={points}
              stroke="var(--color-primary)"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.1, delay: 0.8, ease: EASE }}
            />
            {TREND.map((v, i) => (
              <circle
                key={i}
                cx={8 + i * 52}
                cy={8 + ((6.95 - v) / 0.6) * 40}
                r={i === TREND.length - 1 ? 4 : 2.5}
                fill={i === TREND.length - 1 ? "var(--color-primary)" : "white"}
                stroke="var(--color-primary)"
                strokeWidth={1.5}
              />
            ))}
          </svg>
          <div className="mt-2 flex items-center justify-between">
            <span className="font-mono text-[10px] text-ink-400">Mar 6.9% → Sep 6.4%</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-accent-light px-2 py-0.5 text-[10.5px] font-semibold text-good">
              <TrendingDown className="h-3 w-3" /> 0.5
            </span>
          </div>
        </Card>
      </Node>

      <Node x={150} y={404} delay={0.6}>
        <Card className="flex items-center gap-2 whitespace-nowrap rounded-full rounded-bl-md py-2 pl-2.5 pr-4">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink-900 text-white">
            <MessageCircle className="h-3.5 w-3.5" />
          </span>
          <span className="text-[12.5px] font-medium text-ink-700">Is 6.4 good for me?</span>
        </Card>
      </Node>
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* 5 · Permission                                                      */
/* ------------------------------------------------------------------ */

function Toggle({ on, delay = 0 }: { on: boolean; delay?: number }) {
  return (
    <motion.span
      className="relative flex h-5 w-9 shrink-0 items-center rounded-full px-0.5"
      initial={{ backgroundColor: "#cbd5e1" }}
      animate={{ backgroundColor: on ? "#56afac" : "#cbd5e1" }}
      transition={{ duration: 0.3, delay }}
    >
      <motion.span
        className="h-4 w-4 rounded-full bg-white shadow"
        initial={{ x: 0 }}
        animate={{ x: on ? 16 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30, delay }}
      />
    </motion.span>
  );
}

const PERMISSION_ROWS = [
  { icon: FlaskConical, label: "Conditions & labs", on: true },
  { icon: Pill, label: "Medications", on: true },
  { icon: ScanLine, label: "Imaging", on: false },
];

export function PermissionVisual() {
  return (
    <Stage>
      <Flow d="M412 180 C448 180, 478 164, 478 146" />
      <Flow d="M412 330 C448 330, 478 348, 478 372" delay={0.5} />
      <Flow d="M132 330 C104 330, 96 360, 96 392" delay={0.9} />

      <Node x={272} y={255} delay={0.15}>
        <Card className="w-[280px] p-4">
          <div className="flex items-center gap-3">
            <span className="block h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-accent/40">
              <Avatar person="patel" />
            </span>
            <div className="min-w-0">
              <p className="truncate font-display text-[14px] font-bold text-ink-900">Share with Dr. Patel</p>
              <p className="flex items-center gap-1 text-[11.5px] text-ink-400">
                <Stethoscope className="h-3 w-3" /> Primary care · Mercy
              </p>
            </div>
          </div>
          <div className="mt-3 space-y-1.5">
            {PERMISSION_ROWS.map((row, i) => (
              <div
                key={row.label}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl px-2.5 py-2",
                  row.on ? "bg-surface-muted" : "border border-dashed border-border-strong"
                )}
              >
                <IconTile icon={row.icon} tone={row.on ? "primary" : "muted"} size="sm" />
                <span className={cn("flex-1 text-[12px] font-medium", row.on ? "text-ink-700" : "text-ink-400")}>
                  {row.label}
                </span>
                {row.on ? <Toggle on delay={0.7 + i * 0.2} /> : <Lock className="mr-2 h-3.5 w-3.5 text-ink-400" />}
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-center rounded-xl bg-ink-900 py-2 text-[12px] font-semibold text-white">
            Share 2 of 3
          </div>
        </Card>
      </Node>

      <Node x={478} y={112} delay={0.4}>
        <Card className="flex items-center gap-2.5 whitespace-nowrap p-2.5 pr-4">
          <svg viewBox="0 0 36 36" className="h-9 w-9 -rotate-90">
            <circle cx="18" cy="18" r="15" stroke="var(--color-surface-sunk)" strokeWidth="3.5" fill="none" />
            <motion.circle
              cx="18"
              cy="18"
              r="15"
              stroke="var(--color-primary)"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 0.7 }}
              transition={{ duration: 1.2, delay: 0.8, ease: EASE }}
            />
          </svg>
          <div>
            <p className="flex items-center gap-1 text-[12px] font-semibold text-ink-900">
              <Clock className="h-3.5 w-3.5 text-primary-dark" /> Expires in 7 days
            </p>
            <p className="font-mono text-[9.5px] text-ink-400">auto-revokes Oct 1</p>
          </div>
        </Card>
      </Node>

      <Node x={478} y={400} delay={0.55}>
        <Card className="flex items-center gap-2.5 whitespace-nowrap rounded-full py-2 pl-2 pr-4">
          <IconTile icon={Undo2} tone="ink" size="sm" />
          <span className="text-[12px] font-semibold text-ink-700">Revoke anytime</span>
        </Card>
      </Node>

      <Node x={96} y={416} delay={0.7}>
        <Card className="flex items-center gap-2 whitespace-nowrap rounded-full py-1.5 pl-1.5 pr-3.5">
          <IconTile icon={Eye} tone="accent" size="sm" />
          <span className="text-[11.5px] font-medium text-ink-500">Viewed 2× today</span>
        </Card>
      </Node>
    </Stage>
  );
}
