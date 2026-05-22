# cowcare-sdk

[![npm](https://img.shields.io/npm/v/cowcare-sdk)](https://www.npmjs.com/package/cowcare-sdk)
[![npm downloads](https://img.shields.io/npm/dm/cowcare-sdk)](https://www.npmjs.com/package/cowcare-sdk)

JavaScript/TypeScript SDK for the [CowCare](https://github.com/jajafwangshak86-ops/cow-milk-site) MilkSupplyChain contract on Celo.

## Install

```bash
npm install cowcare-sdk
```

## Usage

```ts
import { getBatchCount, getBatch, getRecentBatches, formatCelo } from "cowcare-sdk";

// Total batches on-chain
const count = await getBatchCount();

// Fetch a single batch
const batch = await getBatch(1);
console.log(batch.productName, batch.stage);

// Latest 5 batches
const recent = await getRecentBatches(5);

// Format price
console.log(formatCelo(batch.pricePerUnit)); // "0.0010 CELO"
```

## API

| Function | Description |
|---|---|
| `getBatchCount(rpc?)` | Total batches on-chain |
| `getBatch(id, rpc?)` | Fetch one batch by ID |
| `getRecentBatches(n?, rpc?)` | Latest N batches |
| `formatCelo(wei)` | Format wei as CELO string |
| `shortAddr(addr)` | Shorten address for display |
| `celoScanAddr(addr)` | Celoscan URL for address |

## Contract

`0x337b04f40036bfb48f22ae58fcf92d2f1f5cc4a8` on [Celo Mainnet](https://celoscan.io/address/0x337b04f40036bfb48f22ae58fcf92d2f1f5cc4a8)

## License

MIT
