export const CONTRACT_ADDRESS = "0x337b04f40036bfb48f22ae58fcf92d2f1f5cc4a8";
export const CELO_RPC = "https://forno.celo.org";
export const CELO_CHAIN_ID = 42220;
export const CELOSCAN_BASE = "https://celoscan.io";
export const STAGES = ["Farmed", "Processed", "Distributed", "OnSale", "Sold"] as const;
export type Stage = typeof STAGES[number];

export const PRODUCTS = [
  { name: "Whole Milk 1L",         qty: 100, price: "1000000000000000" },
  { name: "Skimmed Milk 1L",       qty: 80,  price: "900000000000000"  },
  { name: "Full Cream Milk 2L",    qty: 50,  price: "1800000000000000" },
  { name: "Low Fat Milk 500ml",    qty: 200, price: "500000000000000"  },
  { name: "Organic Whole Milk 1L", qty: 60,  price: "1500000000000000" },
] as const;

export const NAV_LINKS = [
  { label: "Home",    href: "/" },
  { label: "About",   href: "/about" },
  { label: "Blog",    href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Tracker", href: "/tracker" },
] as const;

export const CELO_EXPLORER = "https://celoscan.io";
export const CELO_EXPLORER_TX = (hash: string) => `${CELO_EXPLORER}/tx/${hash}`;
export const CELO_EXPLORER_ADDR = (addr: string) => `${CELO_EXPLORER}/address/${addr}`;

export const APP_VERSION = "1.0.0";
export const APP_NAME = "CowCare";
