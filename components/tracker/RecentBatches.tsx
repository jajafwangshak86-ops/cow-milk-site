"use client";
import { useRecentBatches } from "@/hooks";
import { formatDate, shortAddr } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";
import { Spinner } from "@/components/ui/Spinner";
import { Stage } from "@/lib/constants";

const VARIANT: Record<string, "green" | "blue" | "amber" | "purple" | "gray"> = {
  Farmed: "green", Processed: "blue", Distributed: "amber", OnSale: "purple", Sold: "gray",
};

interface Props { onSelect: (id: number) => void; activeId?: number | null; }

export function RecentBatches({ onSelect, activeId }: Props) {
  const { batches, loading } = useRecentBatches(5);

  if (loading) return <div className="flex justify-center py-6"><Spinner /></div>;
  if (!batches.length) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-3 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-widest">
        Recent Batches
      </div>
      {batches.map((b) => (
        <button key={b.id} onClick={() => onSelect(b.id)}
          className={`w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0
            ${activeId === b.id ? "bg-green-50" : ""}`}>
          <div>
            <div className="font-semibold text-gray-900 text-sm">#{b.id} — {b.productName}</div>
            <div className="text-xs text-gray-400 mt-0.5">{shortAddr(b.farmer)} · {formatDate(b.updatedAt)}</div>
          </div>
          <Badge variant={VARIANT[b.stage] ?? "gray"}>{b.stage as Stage}</Badge>
        </button>
      ))}
    </div>
  );
}
