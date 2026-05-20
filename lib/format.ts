export function formatCelo(wei: string): string {
  try {
    return (Number(BigInt(wei)) / 1e18).toFixed(4) + " CELO";
  } catch {
    return "0.0000 CELO";
  }
}

export function formatDate(ts: number): string {
  if (!ts) return "—";
  return new Date(ts * 1000).toLocaleString(undefined, {
    year: "numeric", month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export function shortAddr(addr: string): string {
  if (!addr || addr === "0x" + "0".repeat(40)) return "—";
  return addr.slice(0, 6) + "…" + addr.slice(-4);
}

export function celoScanAddr(addr: string): string {
  return `https://celoscan.io/address/${addr}`;
}

export function celoScanTx(hash: string): string {
  return `https://celoscan.io/tx/${hash}`;
}

export function isZeroAddr(addr: string): boolean {
  return !addr || addr.toLowerCase() === "0x" + "0".repeat(40);
}

export function formatQuantity(qty: number): string {
  return qty.toLocaleString() + " units";
}

export function formatTimestamp(ts: number): string {
  const d = new Date(ts * 1000);
  return d.toISOString().replace("T", " ").slice(0, 19) + " UTC";
}
