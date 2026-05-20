/** Clamp a number between min and max */
export const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

/** Truncate a string to maxLen with ellipsis */
export const truncate = (s: string, maxLen: number) =>
  s.length > maxLen ? s.slice(0, maxLen) + "…" : s;

/** Sleep for ms milliseconds (client-side) */
export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Format a large number with commas */
export const formatNumber = (n: number) => n.toLocaleString();
