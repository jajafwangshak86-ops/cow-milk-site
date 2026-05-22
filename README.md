![Celo](https://img.shields.io/badge/Celo-Mainnet-brightgreen) ![Next.js](https://img.shields.io/badge/Next.js-16-black) ![npm](https://img.shields.io/npm/v/cowcare-sdk) ![npm downloads](https://img.shields.io/npm/dm/cowcare-sdk)

![CowCare](https://img.shields.io/badge/CowCare-v1.0.0-green) ![CI](https://github.com/jajafwangshak86-ops/cow-milk-site/actions/workflows/ci.yml/badge.svg)

# CowCare — Milk Supply Chain DApp

A Next.js 16 + Celo blockchain application for tracking milk batches from farm to consumer.

## Stack
- **Frontend**: Next.js 16, React 19, Tailwind CSS 4, Framer Motion
- **Blockchain**: Solidity 0.8.20, Hardhat, Celo Mainnet
- **Contract**: [`0x337b04f40036bfb48f22ae58fcf92d2f1f5cc4a8`](https://celoscan.io/address/0x337b04f40036bfb48f22ae58fcf92d2f1f5cc4a8)
- **SDK**: [`cowcare-sdk`](https://www.npmjs.com/package/cowcare-sdk) on npm

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## SDK

Install the standalone JavaScript/TypeScript SDK:

```bash
npm install cowcare-sdk
```

```ts
import { getBatch, getBatchCount, formatCelo } from "cowcare-sdk";

const count = await getBatchCount();
const batch = await getBatch(1);
console.log(batch.productName, formatCelo(batch.pricePerUnit));
```

See [`sdk/README.md`](./sdk/README.md) for full API docs.

## Pages
- `/` — Landing page (products, features, testimonials)
- `/tracker` — Live blockchain batch tracker
- `/tracker/[id]` — Shareable SSR batch detail (e.g. `/tracker/19`)
- `/tracker/stats` — On-chain stage distribution stats

## Environment
Create a `.env` file:
```
PRIVATE_KEY=your_private_key_here
```

## Smart Contract
The `MilkSupplyChain` contract on Celo tracks batches through 5 stages:
`Farmed → Processed → Distributed → OnSale → Sold`

## Scripts
```bash
node contracts/deploy.js    # Deploy contract
node contracts/interact.js  # Run full supply chain walkthrough
```

## API Routes
- `GET  /api/chain`           — Batch count + lookup by `?id=N`
- `GET  /api/chain/[id]`      — Individual batch REST endpoint
- `GET  /api/chain/recent`    — Latest N batches
- `GET  /api/chain/count`     — Batch count
- `POST /api/chain/activity`  — Create + advance a batch on-chain (requires `PRIVATE_KEY`)
- `GET  /api/health`          — Uptime check

## Architecture

```
app/
  page.tsx              ← Landing page
  tracker/
    page.tsx            ← Interactive tracker (client)
    [id]/page.tsx       ← Shareable SSR batch detail
    stats/page.tsx      ← On-chain statistics (SSR)
  api/
    chain/route.ts      ← Batch count + lookup
    chain/[id]/         ← Individual batch REST endpoint
    chain/recent/       ← Latest N batches
    chain/count/        ← Batch count
    chain/activity/     ← Drive on-chain transactions
    health/             ← Uptime check
components/
  home/                 ← Landing page sections
  tracker/              ← Tracker UI components
  layout/               ← Navbar, Footer
  ui/                   ← Reusable primitives
lib/                    ← Constants, RPC, decode, format, utils
hooks/                  ← React hooks
types/                  ← Shared TypeScript types
sdk/                    ← cowcare-sdk npm package
__tests__/              ← Unit tests
```

## Contributing
See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License
MIT
