import { createPublicClient, http, parseAbi, formatEther } from "viem";
import { celo } from "viem/chains";

export const CONTRACT_ADDRESS = "0x337b04f40036bfb48f22ae58fcf92d2f1f5cc4a8" as const;
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

const ABI = parseAbi([
  "function batchCount() view returns (uint256)",
  "function getBatch(uint256 id) view returns (uint256,string,uint256,uint256,address,address,address,address,address,uint8,uint256,uint256)",
  "function getStage(uint256 id) view returns (uint8)",
]);

function makeClient(rpcUrl = CELO_RPC) {
  return createPublicClient({ chain: celo, transport: http(rpcUrl) });
}

function decodeBatch(id: number, raw: readonly unknown[]): Batch {
  return {
    id:           Number(raw[0]),
    productName:  raw[1] as string,
    quantity:     Number(raw[2]),
    pricePerUnit: (raw[3] as bigint).toString(),
    farmer:       raw[4] as string,
    processor:    raw[5] as string,
    distributor:  raw[6] as string,
    retailer:     raw[7] as string,
    buyer:        raw[8] as string,
    stage:        STAGES[Number(raw[9])] ?? "Farmed",
    createdAt:    Number(raw[10]),
    updatedAt:    Number(raw[11]),
  };
}

/** Returns the total number of batches recorded on-chain. */
export async function getBatchCount(rpc?: string): Promise<number> {
  const client = makeClient(rpc);
  const count = await client.readContract({ address: CONTRACT_ADDRESS, abi: ABI, functionName: "batchCount" });
  return Number(count);
}

/** Fetches a single batch by ID. */
export async function getBatch(id: number, rpc?: string): Promise<Batch> {
  const client = makeClient(rpc);
  const raw = await client.readContract({ address: CONTRACT_ADDRESS, abi: ABI, functionName: "getBatch", args: [BigInt(id)] });
  return decodeBatch(id, raw as readonly unknown[]);
}

/** Fetches the latest `n` batches (most recent first). */
export async function getRecentBatches(n = 10, rpc?: string): Promise<Batch[]> {
  const count = await getBatchCount(rpc);
  const ids = Array.from({ length: Math.min(n, count) }, (_, i) => count - i).filter(id => id > 0);
  return Promise.all(ids.map(id => getBatch(id, rpc)));
}

/** Returns the current stage of a batch. */
export async function getStage(id: number, rpc?: string): Promise<Stage> {
  const client = makeClient(rpc);
  const stage = await client.readContract({ address: CONTRACT_ADDRESS, abi: ABI, functionName: "getStage", args: [BigInt(id)] });
  return STAGES[Number(stage)] ?? "Farmed";
}

/** Returns all batches at the given stage. */
export async function getBatchesByStage(stage: Stage, rpc?: string): Promise<Batch[]> {
  const count = await getBatchCount(rpc);
  const all = await Promise.all(Array.from({ length: count }, (_, i) => getBatch(i + 1, rpc)));
  return all.filter(b => b.stage === stage);
}

/** Returns stage distribution counts across all batches. */
export async function getStageStats(rpc?: string): Promise<Record<Stage, number>> {
  const count = await getBatchCount(rpc);
  const all = await Promise.all(Array.from({ length: count }, (_, i) => getBatch(i + 1, rpc)));
  const stats = Object.fromEntries(STAGES.map(s => [s, 0])) as Record<Stage, number>;
  for (const b of all) stats[b.stage]++;
  return stats;
}

/** Formats a wei amount as a CELO string. */
export function formatCelo(wei: string): string {
  try { return parseFloat(formatEther(BigInt(wei))).toFixed(4) + " CELO"; }
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

/** Returns a Celoscan URL for a transaction hash. */
export function celoScanTx(txHash: string): string {
  return `https://celoscan.io/tx/${txHash}`;
}

/** Returns a Celoscan URL for a specific batch. */
export function celoScanBatch(id: number): string {
  return `https://celoscan.io/address/${CONTRACT_ADDRESS}?a=${id}`;
}

/** Converts a Unix timestamp to a locale date string. */
export function formatTimestamp(ts: number, locale = "en-US"): string {
  if (!ts) return "—";
  return new Date(ts * 1000).toLocaleDateString(locale, {
    year: "numeric", month: "short", day: "numeric",
  });
}
