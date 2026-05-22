"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Package, ShoppingCart, ExternalLink } from "lucide-react";
import { StageTimeline } from "./StageTimeline";
import { CustodyRow } from "./CustodyRow";
import { BatchShareButton } from "./BatchShareButton";
import { Badge } from "@/components/ui/Badge";
import { formatCelo, formatDate } from "@/lib/format";
import { Stage, CONTRACT_ADDRESS, CELO_CHAIN_ID } from "@/lib/constants";

interface Batch {
  id: number; productName: string; quantity: number; pricePerUnit: string;
  farmer: string; processor: string; distributor: string; retailer: string;
  buyer: string; stage: Stage; createdAt: number; updatedAt: number;
}

const STAGE_VARIANT: Record<Stage, "green" | "blue" | "amber" | "purple" | "gray"> = {
  Farmed: "green", Processed: "blue", Distributed: "amber", OnSale: "purple", Sold: "gray",
};

// purchaseBatch(uint256) selector
const PURCHASE_SIG = "0x6e5b676b";

function PurchaseButton({ batch }: { batch: Batch }) {
  const [status, setStatus] = useState<"idle" | "pending" | "done" | "error">("idle");
  const [txHash, setTxHash] = useState<string | null>(null);

  async function handlePurchase() {
    const { ethereum } = window as unknown as { ethereum?: { request: (a: { method: string; params?: unknown[] }) => Promise<unknown> } };
    if (!ethereum) { alert("Please install MetaMask or a Celo-compatible wallet."); return; }

    setStatus("pending");
    try {
      // Switch to Celo Mainnet
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x" + CELO_CHAIN_ID.toString(16) }],
      }).catch(() => ethereum.request({
        method: "wallet_addEthereumChain",
        params: [{ chainId: "0x" + CELO_CHAIN_ID.toString(16), chainName: "Celo Mainnet",
          nativeCurrency: { name: "CELO", symbol: "CELO", decimals: 18 },
          rpcUrls: ["https://forno.celo.org"], blockExplorerUrls: ["https://celoscan.io"] }],
      }));

      const [from] = await ethereum.request({ method: "eth_requestAccounts" }) as string[];
      const value = "0x" + (BigInt(batch.pricePerUnit) * BigInt(batch.quantity)).toString(16);
      const data = PURCHASE_SIG + BigInt(batch.id).toString(16).padStart(64, "0");

      const hash = await ethereum.request({
        method: "eth_sendTransaction",
        params: [{ from, to: CONTRACT_ADDRESS, data, value }],
      }) as string;

      setTxHash(hash);
      setStatus("done");
    } catch (e: unknown) {
      console.error(e);
      setStatus("error");
    }
  }

  if (status === "done") return (
    <a href={`https://celoscan.io/tx/${txHash}`} target="_blank" rel="noopener noreferrer"
      className="flex items-center gap-1.5 text-sm text-green-700 font-semibold hover:underline">
      <ExternalLink className="w-4 h-4" /> View on Celoscan
    </a>
  );

  return (
    <button onClick={handlePurchase} disabled={status === "pending"}
      className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
      <ShoppingCart className="w-4 h-4" />
      {status === "pending" ? "Confirm in wallet…" : status === "error" ? "Try again" : `Buy · ${formatCelo((BigInt(batch.pricePerUnit) * BigInt(batch.quantity)).toString())}`}
    </button>
  );
}

export function BatchCard({ batch }: { batch: Batch }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
      className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Package className="w-5 h-5 text-green-700" />
            <h2 className="text-xl font-extrabold text-gray-900">{batch.productName}</h2>
          </div>
          <p className="text-gray-400 text-sm">Batch #{batch.id}</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant={STAGE_VARIANT[batch.stage]}>{batch.stage}</Badge>
          {batch.stage === "OnSale" && <PurchaseButton batch={batch} />}
          <BatchShareButton batchId={batch.id} />
        </div>
      </div>
      <StageTimeline stage={batch.stage} />
      <div className="grid sm:grid-cols-2 gap-4 mt-4 text-sm">
        {[
          { label: "Quantity",     value: `${batch.quantity} units` },
          { label: "Price / Unit", value: formatCelo(batch.pricePerUnit) },
          { label: "Created",      value: formatDate(batch.createdAt) },
          { label: "Last Updated", value: formatDate(batch.updatedAt) },
        ].map(({ label, value }) => (
          <div key={label} className="bg-gray-50 rounded-xl p-3">
            <div className="text-gray-400 text-xs mb-0.5">{label}</div>
            <div className="font-semibold text-gray-800">{value}</div>
          </div>
        ))}
      </div>
      <div className="mt-6 space-y-0">
        <div className="text-gray-500 font-semibold text-xs uppercase tracking-widest mb-2">Chain of Custody</div>
        {(["farmer", "processor", "distributor", "retailer", "buyer"] as const).map((role) => (
          <CustodyRow key={role} role={role} address={batch[role]} />
        ))}
      </div>
    </motion.div>
  );
}
