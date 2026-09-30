import type { ImgHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string;
  alt: string;
  /** Fill the nearest positioned parent, like next/image's `fill`. */
  fill?: boolean;
  /** Load eagerly (above the fold), like next/image's `preload` / `priority`. */
  preload?: boolean;
  priority?: boolean;
};

// Plain <img> standing in for next/image in this Vite build.
export function Image({ fill, preload, priority, className, loading, ...rest }: ImageProps) {
  const eager = preload || priority;
  return (
    <img
      {...rest}
      loading={loading ?? (eager ? "eager" : "lazy")}
      fetchPriority={eager ? "high" : undefined}
      decoding="async"
      className={cn(fill && "absolute inset-0 h-full w-full", className)}
    />
  );
}
