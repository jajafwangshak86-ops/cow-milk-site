![Celo](https://img.shields.io/badge/Celo-Mainnet-brightgreen) ![Next.js](https://img.shields.io/badge/Next.js-16-black)

# CowCare — Milk Supply Chain DApp

A Next.js 16 + Celo blockchain application for tracking milk batches from farm to consumer.

## Stack
- **Frontend**: Next.js 16, React 19, Tailwind CSS 4, Framer Motion
- **Blockchain**: Solidity 0.8.20, Hardhat, Celo Mainnet
- **Contract**: `0x337b04f40036bfb48f22ae58fcf92d2f1f5cc4a8`

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages
- `/` — Landing page (products, features, testimonials)
- `/tracker` — Live blockchain batch tracker

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

## Tracker URLs
- `/tracker` — Interactive tracker with search
- `/tracker/[id]` — Shareable SSR batch detail page (e.g. `/tracker/19`)
- `/tracker/stats` — On-chain stage distribution stats

## Architecture

```
app/
  page.tsx              ← Landing page (composed from components/home/)
  tracker/
    page.tsx            ← Interactive tracker (client)
    [id]/page.tsx       ← Shareable SSR batch detail
    stats/page.tsx      ← On-chain statistics (SSR)
  api/
    chain/route.ts      ← Batch count + lookup
    chain/[id]/route.ts ← Individual batch REST endpoint
    chain/recent/       ← Latest N batches
    chain/count/        ← Batch count
    health/             ← Uptime check
components/
  home/                 ← Landing page sections
  tracker/              ← Tracker UI components
  layout/               ← Navbar, Footer
  ui/                   ← Reusable primitives
lib/                    ← Constants, RPC, decode, format, utils
hooks/                  ← React hooks
types/                  ← Shared TypeScript types
```

## Contributing
See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License
MIT
