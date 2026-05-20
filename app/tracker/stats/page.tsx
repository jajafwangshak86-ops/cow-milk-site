import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { StatCard } from "@/components/ui/StatCard";
import { BarChart3, Package, Leaf, TrendingUp } from "lucide-react";
import { rpcCall } from "@/lib/rpc";
import { CONTRACT_ADDRESS, STAGES } from "@/lib/constants";
import { encUint, decodeUint, decodeString } from "@/lib/decode";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = { title: "Chain Stats — CowCare" };
export const revalidate = 60;

async function ethCall(data: string) {
  return rpcCall("eth_call", [{ to: CONTRACT_ADDRESS, data }, "latest"]);
}

export default async function StatsPage() {
  const countHex = await ethCall("0x06f13056");
  const total = Number(BigInt(countHex));

  const stageCounts: Record<string, number> = Object.fromEntries(STAGES.map(s => [s, 0]));
  const ids = Array.from({ length: Math.min(total, 50) }, (_, i) => total - i);

  await Promise.all(ids.map(async (id) => {
    try {
      const hex = await ethCall("0x5ac86ab7" + encUint(id));
      const raw = hex.replace("0x", "");
      const stage = STAGES[Number(decodeUint(raw, 9))];
      if (stage) stageCounts[stage]++;
    } catch { /* skip */ }
  }));

  return (
    <main className="min-h-screen bg-[#f6f3ee] font-sans">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/tracker" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-800">
            <ArrowLeft className="w-4 h-4" /> Tracker
          </Link>
          <span className="text-gray-300">/</span>
          <h1 className="text-2xl font-extrabold text-gray-900">Chain Statistics</h1>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Batches" value={total} icon={<Package className="w-5 h-5" />} sub="All time" />
          <StatCard label="On Sale" value={stageCounts.OnSale} icon={<TrendingUp className="w-5 h-5" />} sub="Available now" />
          <StatCard label="Farmed" value={stageCounts.Farmed} icon={<Leaf className="w-5 h-5" />} sub="At farm stage" />
          <StatCard label="Sold" value={stageCounts.Sold} icon={<BarChart3 className="w-5 h-5" />} sub="Completed" />
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-900 mb-4">Stage Distribution</h2>
          <div className="space-y-3">
            {STAGES.map((stage) => (
              <div key={stage} className="flex items-center gap-3">
                <span className="w-24 text-sm text-gray-500">{stage}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full transition-all"
                    style={{ width: total ? `${(stageCounts[stage] / Math.min(total, 50)) * 100}%` : "0%" }} />
                </div>
                <span className="text-sm font-semibold text-gray-700 w-6 text-right">{stageCounts[stage]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
