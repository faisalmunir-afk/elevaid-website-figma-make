import { cn } from "../../lib/utils";
import { Reveal } from "./Reveal";

export function SectionHeading({
  heading,
  lede,
  align = "left",
  tone = "primary",
  className,
}: {
  heading: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  tone?: "primary" | "light";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <Reveal delay={0.05}>
        <h2
          className={cn(
            "text-2xl font-bold leading-[1.15] tracking-tight sm:text-3xl lg:text-4xl",
            tone === "primary" ? "text-ink-900" : "text-white"
          )}
        >
          {heading}
        </h2>
      </Reveal>
      {lede && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "mt-5 text-balance text-base leading-relaxed sm:text-lg",
              tone === "primary" ? "text-ink-500" : "text-white/70"
            )}
          >
            {lede}
          </p>
        </Reveal>
      )}
    </div>
  );
}
