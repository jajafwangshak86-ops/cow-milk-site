export const CONTRACT_ADDRESS = "0x337b04f40036bfb48f22ae58fcf92d2f1f5cc4a8";
export const CELO_RPC = "https://forno.celo.org";
export const CELO_CHAIN_ID = 42220;
export const STAGES = ["Farmed", "Processed", "Distributed", "OnSale", "Sold"] as const;
export type Stage = (typeof STAGES)[number];

export interface Batch {
  id: number;
  productName: string;
  quantity: number;
  pricePerUnit: string;
  farmer: string;
  processor: string;
  distributor: string;
  retailer: string;
  buyer: string;
  stage: Stage;
  createdAt: number;
  updatedAt: number;
}

// ── ABI-encoding helpers ──────────────────────────────────────────────────────
const pad32 = (hex: string) => hex.replace("0x", "").padStart(64, "0");
const encUint = (n: number | bigint) => pad32(BigInt(n).toString(16));

function decodeUint(raw: string, slot: number): bigint {
  const s = slot * 64;
  return s + 64 > raw.length ? 0n : BigInt("0x" + raw.slice(s, s + 64));
}

function decodeAddr(raw: string, slot: number): string {
  const s = slot * 64;
  return s + 64 > raw.length ? "0x" + "0".repeat(40) : "0x" + raw.slice(s + 24, s + 64);
}

function decodeString(raw: string, slotOffset: number): string {
  try {
    const dynOffset = Number(decodeUint(raw, slotOffset)) * 2;
    const len = Number(BigInt("0x" + raw.slice(dynOffset, dynOffset + 64)));
    return Buffer.from(raw.slice(dynOffset + 64, dynOffset + 64 + len * 2), "hex").toString("utf8");
  } catch {
    return "";
  }
}

// ── RPC ───────────────────────────────────────────────────────────────────────
async function ethCall(data: string, rpc = CELO_RPC): Promise<string> {
  const res = await fetch(rpc, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0", id: 1, method: "eth_call",
      params: [{ to: CONTRACT_ADDRESS, data }, "latest"],
    }),
  });
  const json = await res.json();
  if (json.error) throw new Error(`RPC error: ${json.error.message}`);
  return json.result as string;
}

// ── Public API ────────────────────────────────────────────────────────────────

/** Returns the total number of batches recorded on-chain. */
export async function getBatchCount(rpc?: string): Promise<number> {
  const hex = await ethCall("0x06f13056", rpc);
  return Number(BigInt(hex));
}

/** Fetches a single batch by ID. */
export async function getBatch(id: number, rpc?: string): Promise<Batch> {
  const data = "0x5ac86ab7" + encUint(id);
  const hex = await ethCall(data, rpc);
  const raw = hex.replace("0x", "");
  return {
    id:           Number(decodeUint(raw, 0)),
    productName:  decodeString(raw, 1),
    quantity:     Number(decodeUint(raw, 2)),
    pricePerUnit: decodeUint(raw, 3).toString(),
    farmer:       decodeAddr(raw, 4),
    processor:    decodeAddr(raw, 5),
    distributor:  decodeAddr(raw, 6),
    retailer:     decodeAddr(raw, 7),
    buyer:        decodeAddr(raw, 8),
    stage:        STAGES[Number(decodeUint(raw, 9))] ?? "Farmed",
    createdAt:    Number(decodeUint(raw, 10)),
    updatedAt:    Number(decodeUint(raw, 11)),
  };
}

/** Fetches the latest `n` batches (most recent first). */
export async function getRecentBatches(n = 10, rpc?: string): Promise<Batch[]> {
  const count = await getBatchCount(rpc);
  const ids = Array.from({ length: Math.min(n, count) }, (_, i) => count - i).filter(id => id > 0);
  return Promise.all(ids.map(id => getBatch(id, rpc)));
}

/** Formats a wei amount as a CELO string. */
export function formatCelo(wei: string): string {
  try { return (Number(BigInt(wei)) / 1e18).toFixed(4) + " CELO"; }
  catch { return "0.0000 CELO"; }
}

/** Shortens an Ethereum address for display. */
export function shortAddr(addr: string): string {
  if (!addr || addr === "0x" + "0".repeat(40)) return "—";
  return addr.slice(0, 6) + "…" + addr.slice(-4);
}

/** Returns a Celoscan URL for an address. */
export function celoScanAddr(addr: string): string {
  return `https://celoscan.io/address/${addr}`;
}
