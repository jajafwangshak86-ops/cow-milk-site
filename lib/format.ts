export function formatCelo(wei: string): string {
  return (Number(BigInt(wei)) / 1e18).toFixed(4) + " CELO";
}

export function formatDate(ts: number): string {
  return new Date(ts * 1000).toLocaleString();
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
