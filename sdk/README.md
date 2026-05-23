# cowcare-sdk

[![npm](https://img.shields.io/npm/v/cowcare-sdk)](https://www.npmjs.com/package/cowcare-sdk)
[![npm downloads](https://img.shields.io/npm/dm/cowcare-sdk)](https://www.npmjs.com/package/cowcare-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](../LICENSE)

JavaScript/TypeScript SDK for the **CowCare MilkSupplyChain** contract on Celo Mainnet.

Zero dependencies. Works in Node.js and the browser.

## Install

```bash
npm install cowcare-sdk
```

## Quick Start

```ts
import { getBatch, getBatchCount, formatCelo } from "cowcare-sdk";

const count = await getBatchCount();
const batch = await getBatch(1);
console.log(batch.productName, formatCelo(batch.pricePerUnit));
```

## API

### Read Functions

#### `getBatchCount(rpc?): Promise<number>`
Returns the total number of batches on-chain.

#### `getBatch(id, rpc?): Promise<Batch>`
Fetches a single batch by ID.

#### `getRecentBatches(n?, rpc?): Promise<Batch[]>`
Returns the latest `n` batches (default 10), most recent first.

#### `getStage(id, rpc?): Promise<Stage>`
Returns the current stage of a batch without fetching the full struct.

#### `getBatchesByStage(stage, rpc?): Promise<Batch[]>`
Returns all batches currently at the given stage.

#### `getStageStats(rpc?): Promise<Record<Stage, number>>`
Returns a count of batches per stage across the entire contract.

### Format Helpers

#### `formatCelo(wei): string`
Converts a wei string to a human-readable CELO amount (e.g. `"1.0000 CELO"`).

#### `shortAddr(addr): string`
Shortens an address for display (e.g. `"0x1234…5678"`). Returns `"—"` for the zero address.

#### `formatTimestamp(ts, locale?): string`
Converts a Unix timestamp to a locale date string (e.g. `"Nov 14, 2023"`).

### URL Helpers

#### `celoScanAddr(addr): string`
Returns the Celoscan URL for an address.

#### `celoScanTx(txHash): string`
Returns the Celoscan URL for a transaction hash.

#### `celoScanBatch(id): string`
Returns the Celoscan URL for a specific batch.

## Types

```ts
type Stage = "Farmed" | "Processed" | "Distributed" | "OnSale" | "Sold";

interface Batch {
  id: number;
  productName: string;
  quantity: number;
  pricePerUnit: string;   // wei as string
  farmer: string;
  processor: string;
  distributor: string;
  retailer: string;
  buyer: string;
  stage: Stage;
  createdAt: number;      // Unix timestamp
  updatedAt: number;      // Unix timestamp
}
```

## Constants

```ts
import { CONTRACT_ADDRESS, CELO_RPC, CELO_CHAIN_ID, STAGES } from "cowcare-sdk";
```

## Custom RPC

All async functions accept an optional `rpc` parameter:

```ts
const batch = await getBatch(1, "https://my-custom-rpc.example.com");
```

## Contract

`MilkSupplyChain` deployed on Celo Mainnet:
[`0x337b04f40036bfb48f22ae58fcf92d2f1f5cc4a8`](https://celoscan.io/address/0x337b04f40036bfb48f22ae58fcf92d2f1f5cc4a8)

## License

MIT
