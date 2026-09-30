import { cn } from "../../lib/utils";
import { Link } from "./Link";
import { ArrowRight } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-gradient font-semibold text-ink-900 shadow-sm shadow-accent/20 hover:shadow-md hover:shadow-accent/30 hover:bg-brand-shift transition-[background-position,box-shadow,scale] duration-700 ease-in-out [&>svg]:transition-transform [&>svg]:duration-500 hover:[&>svg]:translate-x-1",
  secondary:
    "bg-white text-ink-900 border border-border-strong hover:border-ink-500 hover:bg-surface-sunk",
  ghost: "text-ink-700 hover:bg-white/10",
};

export function Button({
  children,
  href = "#",
  variant = "primary",
  icon = false,
  className,
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  variant?: ButtonVariant;
  icon?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-2.5 font-display text-sm font-medium tracking-[0.02em] transition-all duration-200 active:scale-[0.985]",
        variantClasses[variant],
        className
      )}
    >
      {children}
      {icon && (
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      )}
    </Link>
  );
}
