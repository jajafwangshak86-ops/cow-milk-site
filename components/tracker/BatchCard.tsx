"use client";
import { motion } from "framer-motion";
import { Package } from "lucide-react";
import { StageTimeline } from "./StageTimeline";
import { CustodyRow } from "./CustodyRow";
import { BatchShareButton } from "./BatchShareButton";
import { Badge } from "@/components/ui/Badge";
import { formatCelo, formatDate } from "@/lib/format";
import { Stage } from "@/lib/constants";

interface Batch {
  id: number; productName: string; quantity: number; pricePerUnit: string;
  farmer: string; processor: string; distributor: string; retailer: string;
  buyer: string; stage: Stage; createdAt: number; updatedAt: number;
}

const STAGE_VARIANT: Record<Stage, "green" | "blue" | "amber" | "purple" | "gray"> = {
  Farmed: "green", Processed: "blue", Distributed: "amber", OnSale: "purple", Sold: "gray",
};

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
        <div className="flex items-center gap-2">
          <Badge variant={STAGE_VARIANT[batch.stage]}>{batch.stage}</Badge>
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
