import type { LucideIcon } from "lucide-react";
import { cn } from "../../lib/utils";

// Soft 3D icon tile: lit from the top (gloss + rim highlight), shaded at the bottom edge,
// and lifted by a tinted drop shadow. Pure CSS, so every icon on the site stays consistent.
const SIZES = {
  sm: { tile: "h-9 w-9 rounded-[11px]", icon: "h-[18px] w-[18px]" },
  md: { tile: "h-12 w-12 rounded-[14px]", icon: "h-[22px] w-[22px]" },
  lg: { tile: "h-14 w-14 rounded-2xl", icon: "h-6 w-6" },
} as const;

const TONES = {
  // Brand: the logo gradient, deepened at the bottom so the tile reads as a solid object.
  brand:
    "bg-[linear-gradient(150deg,#3be58c_0%,#23bca6_55%,#168f8b_100%)] text-white shadow-[inset_0_1.5px_0_rgba(255,255,255,0.6),inset_0_-3px_6px_rgba(8,82,79,0.35),0_10px_18px_-8px_rgba(33,179,175,0.7),0_2px_4px_rgba(11,18,32,0.08)]",
  // Light: a white porcelain tile for neutral items.
  light:
    "bg-[linear-gradient(160deg,#ffffff_0%,#eef3f6_100%)] text-ink-500 shadow-[inset_0_1.5px_0_#ffffff,inset_0_-3px_5px_rgba(148,163,184,0.25),0_10px_18px_-10px_rgba(11,18,32,0.35),0_1px_2px_rgba(11,18,32,0.08)] ring-1 ring-black/[0.04]",
} as const;

export function Icon3D({
  icon: Icon,
  size = "md",
  tone = "brand",
  className,
}: {
  icon: LucideIcon;
  size?: keyof typeof SIZES;
  tone?: keyof typeof TONES;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "relative isolate inline-flex shrink-0 items-center justify-center overflow-hidden",
        SIZES[size].tile,
        TONES[tone],
        className
      )}
    >
      {/* Top gloss */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-[10%] top-[5%] -z-10 h-[45%] rounded-[40%] bg-gradient-to-b from-white/50 to-white/0"
      />
      <Icon
        className={cn(
          SIZES[size].icon,
          tone === "brand"
            ? "drop-shadow-[0_1.5px_1px_rgba(8,70,68,0.45)]"
            : "drop-shadow-[0_1px_0_rgba(255,255,255,0.9)]"
        )}
        strokeWidth={2.2}
      />
    </span>
  );
}
