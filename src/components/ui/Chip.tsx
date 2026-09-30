import { cn } from "../../lib/utils";

type ChipVariant = "good" | "warn" | "bad" | "neutral" | "outline";

const variantClasses: Record<ChipVariant, string> = {
  good: "bg-good-bg text-good border-good-border",
  warn: "bg-warn-bg text-warn border-warn-border",
  bad: "bg-bad-bg text-bad border-bad-border",
  neutral: "bg-neutral-bg text-neutral-text border-neutral-border",
  outline: "bg-transparent text-ink-500 border-border-strong",
};

export function Chip({
  children,
  variant = "neutral",
  tone = "light",
  className,
}: {
  children: React.ReactNode;
  variant?: ChipVariant;
  tone?: "light" | "dark";
  className?: string;
}) {
  const isOutlineDark = variant === "outline" && tone === "dark";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-medium tracking-tight whitespace-nowrap",
        isOutlineDark
          ? "bg-white/5 text-white/60 border-white/15"
          : variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
