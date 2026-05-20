export interface ApiError { error: string; }
export interface HealthResponse { status: "ok" | "error"; block?: number; batchCount?: number; timestamp?: number; error?: string; }
export interface RecentBatch { id: number; productName: string; quantity: number; stage: string; farmer: string; updatedAt: number; }
export interface RecentBatchesResponse { batches: RecentBatch[]; total: number; }
