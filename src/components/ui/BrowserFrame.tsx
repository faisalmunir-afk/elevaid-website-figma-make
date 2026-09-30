import { cn } from "../../lib/utils";

export function BrowserFrame({
  url,
  children,
  className,
  dense = false,
  tone = "light",
}: {
  url: string;
  children: React.ReactNode;
  className?: string;
  dense?: boolean;
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border shadow-[0_20px_60px_-25px_rgba(11,18,32,0.25)]",
        tone === "dark" ? "border-white/10 bg-ink-900" : "border-border bg-white",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3 border-b",
          tone === "dark" ? "border-white/10 bg-white/5" : "border-border bg-surface-muted",
          dense ? "px-3 py-2" : "px-4 py-3"
        )}
      >
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ECAEA6]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#F0D3A0]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#B7DCC0]" />
        </div>
        <div
          className={cn(
            "flex-1 truncate rounded-md px-3 py-1 text-center font-mono text-[11px] border",
            tone === "dark"
              ? "border-white/10 bg-white/5 text-white/50"
              : "border-border bg-white text-ink-500"
          )}
        >
          {url}
        </div>
      </div>
      {children}
    </div>
  );
}
