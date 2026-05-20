"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  BatchCard, BatchCardSkeleton, BatchSearch, EmptyState,
  ErrorState, RecentBatches, ContractInfo,
} from "@/components/tracker";
import { useBatch, useBatchCount } from "@/hooks";

export default function TrackerPage() {
  const [batchId, setBatchId] = useState<number | null>(null);
  const { batch, loading, error, fetchBatch } = useBatch();
  const totalBatches = useBatchCount();

  const recentIds = totalBatches
    ? Array.from({ length: Math.min(5, totalBatches) }, (_, i) => totalBatches - i)
    : [];

  const handleSearch = useCallback((id: number) => {
    setBatchId(id);
    fetchBatch(id);
  }, [fetchBatch]);

  return (
    <main className="min-h-screen bg-[#f6f3ee] font-sans">
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-green-800 font-extrabold text-lg">
            <Leaf className="w-5 h-5" /> COWCARE
          </Link>
          <Link href="/" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-800 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </header>
      <div className="max-w-5xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            <Leaf className="w-3.5 h-3.5" /> Powered by Celo Blockchain
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">Milk Supply Chain Tracker</h1>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto text-sm">
            Every batch of milk is recorded on-chain. Enter a batch ID to trace its full journey from farm to shelf.
          </p>
          {totalBatches !== null && (
            <p className="text-green-700 font-semibold text-sm mt-2">{totalBatches} batches tracked on-chain</p>
          )}
        </motion.div>
        <div className="grid md:grid-cols-[1fr_320px] gap-8 items-start">
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6">
              <BatchSearch onSearch={handleSearch} recentIds={recentIds} activeId={batchId} />
            </motion.div>
            <AnimatePresence mode="wait">
              {loading && <BatchCardSkeleton />}
              {error && !loading && (
                <motion.div key="error" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <ErrorState message={error} onRetry={() => batchId && fetchBatch(batchId)} />
                </motion.div>
              )}
              {batch && !loading && <BatchCard key={`batch-${batch.id}`} batch={batch} />}
              {!batch && !loading && !error && <EmptyState />}
            </AnimatePresence>
          </div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <RecentBatches onSelect={handleSearch} activeId={batchId} />
          </motion.div>
        </div>
        <ContractInfo />
      </div>
    </main>
  );
}
