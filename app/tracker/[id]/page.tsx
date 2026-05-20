import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { BatchCard } from "@/components/tracker/BatchCard";
import { ContractInfo } from "@/components/tracker/ContractInfo";
import { rpcCall } from "@/lib/rpc";
import { encUint, decodeUint, decodeAddr, decodeString } from "@/lib/decode";
import { CONTRACT_ADDRESS, STAGES } from "@/lib/constants";
import type { Batch } from "@/types/batch";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const revalidate = 60;

async function fetchBatch(id: number): Promise<Batch | null> {
  try {
    const data = "0x5ac86ab7" + encUint(id);
    const hex = await rpcCall("eth_call", [{ to: CONTRACT_ADDRESS, data }, "latest"]);
    const raw = hex.replace("0x", "");
    return {
      id:           Number(decodeUint(raw, 0)),
      productName:  decodeString(raw, 1),
      quantity:     Number(decodeUint(raw, 2)),
      pricePerUnit: decodeUint(raw, 3).toString(),
      farmer:       decodeAddr(raw, 4),
      processor:    decodeAddr(raw, 5),
      distributor:  decodeAddr(raw, 6),
      retailer:     decodeAddr(raw, 7),
      buyer:        decodeAddr(raw, 8),
      stage:        STAGES[Number(decodeUint(raw, 9))] ?? "Unknown" as Batch["stage"],
      createdAt:    Number(decodeUint(raw, 10)),
      updatedAt:    Number(decodeUint(raw, 11)),
    };
  } catch { return null; }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const batch = await fetchBatch(parseInt(id, 10));
  if (!batch) return { title: "Batch Not Found — CowCare" };
  return {
    title: `Batch #${batch.id}: ${batch.productName} — CowCare`,
    description: `Track batch #${batch.id} (${batch.productName}) on the Celo blockchain. Current stage: ${batch.stage}.`,
  };
}

export default async function BatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const numId = parseInt(id, 10);
  if (isNaN(numId) || numId < 1) notFound();

  const batch = await fetchBatch(numId);
  if (!batch || batch.id === 0) notFound();

  return (
    <main className="min-h-screen bg-[#f6f3ee] font-sans">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/tracker" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-800 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Tracker
        </Link>
        <BatchCard batch={batch} />
        <ContractInfo />
      </div>
    </main>
  );
}
