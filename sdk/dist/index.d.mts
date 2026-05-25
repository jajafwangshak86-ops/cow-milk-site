declare const CONTRACT_ADDRESS = "0x337b04f40036bfb48f22ae58fcf92d2f1f5cc4a8";
declare const CELO_RPC = "https://forno.celo.org";
declare const CELO_CHAIN_ID = 42220;
declare const STAGES: readonly ["Farmed", "Processed", "Distributed", "OnSale", "Sold"];
type Stage = (typeof STAGES)[number];
interface Batch {
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
/** Returns the total number of batches recorded on-chain. */
declare function getBatchCount(rpc?: string): Promise<number>;
/** Fetches a single batch by ID. */
declare function getBatch(id: number, rpc?: string): Promise<Batch>;
/** Fetches the latest `n` batches (most recent first). */
declare function getRecentBatches(n?: number, rpc?: string): Promise<Batch[]>;
/** Returns the current stage index (0–4) for a batch. */
declare function getStage(id: number, rpc?: string): Promise<Stage>;
/**
 * Fetches all batches and filters by stage.
 * For large datasets, prefer fetching a range manually.
 */
declare function getBatchesByStage(stage: Stage, rpc?: string): Promise<Batch[]>;
/** Returns stage distribution counts across all batches. */
declare function getStageStats(rpc?: string): Promise<Record<Stage, number>>;
/** Formats a wei amount as a CELO string. */
declare function formatCelo(wei: string): string;
/** Shortens an Ethereum address for display. */
declare function shortAddr(addr: string): string;
/** Returns a Celoscan URL for an address. */
declare function celoScanAddr(addr: string): string;
/** Returns a Celoscan URL for a transaction hash. */
declare function celoScanTx(txHash: string): string;
/** Returns a Celoscan URL for a specific batch token. */
declare function celoScanBatch(id: number): string;
/** Converts a Unix timestamp to a locale date string. */
declare function formatTimestamp(ts: number, locale?: string): string;

export { type Batch, CELO_CHAIN_ID, CELO_RPC, CONTRACT_ADDRESS, STAGES, type Stage, celoScanAddr, celoScanBatch, celoScanTx, formatCelo, formatTimestamp, getBatch, getBatchCount, getBatchesByStage, getRecentBatches, getStage, getStageStats, shortAddr };
