export const CONTRACT_ADDRESS = "0x337b04f40036bfb48f22ae58fcf92d2f1f5cc4a8";
export const CELO_RPC = "https://forno.celo.org";
export const CELO_CHAIN_ID = 42220;
export const CELOSCAN_BASE = "https://celoscan.io";
export const STAGES = ["Farmed", "Processed", "Distributed", "OnSale", "Sold"] as const;
export type Stage = typeof STAGES[number];
