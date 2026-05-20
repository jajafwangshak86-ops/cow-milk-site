/** Clamp a number between min and max */
export const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

/** Truncate a string to maxLen with ellipsis */
export const truncate = (s: string, maxLen: number) =>
  s.length > maxLen ? s.slice(0, maxLen) + "…" : s;

/** Sleep for ms milliseconds (client-side) */
export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Format a large number with commas */
export const formatNumber = (n: number) => n.toLocaleString();

/** Debounce a function */
export function debounce<T extends (...args: unknown[]) => void>(fn: T, ms: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  }) as T;
}

/** Check if running in browser */
export const isBrowser = typeof window !== "undefined";
