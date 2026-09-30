import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** "01 / connect" → "Step 1 · Connect" */
export function stepLabel(code: string) {
  const [num, name = ""] = code.split(" / ");
  return `Step ${Number(num)} · ${name.charAt(0).toUpperCase()}${name.slice(1)}`;
}
