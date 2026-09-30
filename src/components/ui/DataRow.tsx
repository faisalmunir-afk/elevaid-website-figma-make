import { motion } from "framer-motion";
import { useReducedMotion } from "../../lib/useReducedMotion";
import { cn } from "../../lib/utils";
import { Chip } from "./Chip";

type ChipVariant = "good" | "warn" | "bad" | "neutral" | "outline";
type Trend = "up" | "flat" | "spike";

const TREND_PATHS: Record<Trend, string> = {
  up: "M2 12 L10 9 L18 7 L30 3",
  flat: "M2 9 L10 8 L18 9 L30 8",
  spike: "M2 11 L10 10 L16 3 L22 8 L30 6",
};

const TREND_COLOR: Record<ChipVariant, string> = {
  good: "var(--color-good)",
  warn: "var(--color-warn)",
  bad: "var(--color-bad)",
  neutral: "var(--color-ink-400)",
  outline: "var(--color-ink-400)",
};

function Sparkline({ trend, variant }: { trend: Trend; variant: ChipVariant }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <svg viewBox="0 0 32 16" fill="none" className="h-4 w-8 shrink-0" aria-hidden>
      <motion.path
        d={TREND_PATHS[trend]}
        stroke={TREND_COLOR[variant]}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={shouldReduceMotion ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      />
    </svg>
  );
}

export function DataRow({
  label,
  value,
  variant = "neutral",
  tone = "light",
  trend,
  className,
  emphasize = false,
}: {
  label: string;
  value: string;
  variant?: ChipVariant;
  tone?: "light" | "dark";
  trend?: Trend;
  className?: string;
  emphasize?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 border-b py-3 last:border-b-0",
        tone === "dark" ? "border-white/10" : "border-border/70",
        className
      )}
    >
      <span
        className={cn(
          "text-sm leading-snug",
          tone === "dark" ? "text-white/70" : "text-ink-700",
          emphasize && (tone === "dark" ? "font-medium text-white" : "font-medium text-ink-900")
        )}
      >
        {label}
      </span>
      <span className="flex shrink-0 items-center gap-2">
        {trend && <Sparkline trend={trend} variant={variant} />}
        <Chip variant={variant} tone={tone}>
          {value}
        </Chip>
      </span>
    </div>
  );
}
