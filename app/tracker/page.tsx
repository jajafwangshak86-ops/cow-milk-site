"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Leaf, Search, ArrowLeft, CheckCircle, Clock, Truck,
  FlaskConical, ShoppingBag, Package, AlertCircle, Loader2,
  ExternalLink, RefreshCw,
} from "lucide-react";
import Link from "next/link";

const STAGES = ["Farmed", "Processed", "Distributed", "OnSale", "Sold"] as const;
type Stage = typeof STAGES[number];

interface Batch {
  id: number;
  productName: string;
  quantity: number;
  pricePerUnit: string;
  farmer: string;
  processor: string;
  distributor: string;
  retailer: string;
  buyer: string;
  stage: Stage;
  createdAt: number;
  updatedAt: number;
}

const STAGE_META: Record<Stage, { icon: React.ReactNode; color: string; bg: string; label: string }> = {
  Farmed:      { icon: <Leaf className="w-5 h-5" />,        color: "text-green-700",  bg: "bg-green-100",  label: "Farmed" },
  Processed:   { icon: <FlaskConical className="w-5 h-5" />, color: "text-blue-700",   bg: "bg-blue-100",   label: "Processed" },
  Distributed: { icon: <Truck className="w-5 h-5" />,        color: "text-amber-700",  bg: "bg-amber-100",  label: "Distributed" },
  OnSale:      { icon: <ShoppingBag className="w-5 h-5" />,  color: "text-purple-700", bg: "bg-purple-100", label: "On Sale" },
  Sold:        { icon: <CheckCircle className="w-5 h-5" />,  color: "text-gray-700",   bg: "bg-gray-100",   label: "Sold" },
};

function shortAddr(addr: string) {
  if (!addr || addr === "0x" + "0".repeat(40)) return "—";
  return addr.slice(0, 6) + "…" + addr.slice(-4);
}

function celoScan(addr: string) {
  return `https://celoscan.io/address/${addr}`;
}

function formatCelo(wei: string) {
  const val = Number(BigInt(wei)) / 1e18;
  return val.toFixed(4) + " CELO";
}

function formatDate(ts: number) {
  return new Date(ts * 1000).toLocaleString();
}

function StageTimeline({ stage }: { stage: Stage }) {
  const idx = STAGES.indexOf(stage);
  return (
    <div className="flex items-center gap-0 w-full mt-6 mb-2">
      {STAGES.map((s, i) => {
        const meta = STAGE_META[s];
        const done = i <= idx;
        const active = i === idx;
        return (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div className={`flex flex-col items-center gap-1 ${done ? meta.color : "text-gray-300"}`}>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all
                ${active ? `${meta.bg} border-current ring-4 ring-offset-1 ring-current/20` : done ? `${meta.bg} border-current` : "bg-gray-50 border-gray-200"}`}>
                {meta.icon}
              </div>
              <span className="text-[10px] font-semibold hidden sm:block">{meta.label}</span>
            </div>
            {i < STAGES.length - 1 && (
              <div className={`flex-1 h-0.5 mx-1 ${i < idx ? "bg-green-400" : "bg-gray-200"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function BatchCard({ batch }: { batch: Batch }) {
  const meta = STAGE_META[batch.stage] ?? STAGE_META.Farmed;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8"
    >
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Package className="w-5 h-5 text-green-700" />
            <h2 className="text-xl font-extrabold text-gray-900">{batch.productName}</h2>
          </div>
          <p className="text-gray-400 text-sm">Batch #{batch.id}</p>
        </div>
        <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold ${meta.bg} ${meta.color}`}>
          {meta.icon} {meta.label}
        </span>
      </div>

      <StageTimeline stage={batch.stage} />

      <div className="grid sm:grid-cols-2 gap-4 mt-6 text-sm">
        {[
          { label: "Quantity", value: `${batch.quantity} units` },
          { label: "Price / Unit", value: formatCelo(batch.pricePerUnit) },
          { label: "Created", value: formatDate(batch.createdAt) },
          { label: "Last Updated", value: formatDate(batch.updatedAt) },
        ].map(({ label, value }) => (
          <div key={label} className="bg-gray-50 rounded-xl p-3">
            <div className="text-gray-400 text-xs mb-0.5">{label}</div>
            <div className="font-semibold text-gray-800">{value}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-2 text-sm">
        <div className="text-gray-500 font-semibold text-xs uppercase tracking-widest mb-2">Chain of Custody</div>
        {(["farmer", "processor", "distributor", "retailer", "buyer"] as const).map((role) => {
          const addr = batch[role];
          const empty = !addr || addr === "0x" + "0".repeat(40);
          return (
            <div key={role} className="flex items-center justify-between gap-2 py-1.5 border-b border-gray-100 last:border-0">
              <span className="capitalize text-gray-500 w-24">{role}</span>
              {empty ? (
                <span className="text-gray-300 italic text-xs">Not assigned</span>
              ) : (
                <a href={celoScan(addr)} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1 text-green-700 font-mono hover:underline">
                  {shortAddr(addr)} <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default function TrackerPage() {
  const [inputId, setInputId] = useState("");
  const [batchId, setBatchId] = useState<number | null>(null);
  const [batch, setBatch] = useState<Batch | null>(null);
  const [totalBatches, setTotalBatches] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recentIds, setRecentIds] = useState<number[]>([]);

  useEffect(() => {
    fetch("/api/chain")
      .then((r) => r.json())
      .then((d) => {
        if (d.count) {
          setTotalBatches(d.count);
          // Show last 5 batch IDs as quick links
          const ids: number[] = [];
          for (let i = d.count; i > Math.max(0, d.count - 5); i--) ids.push(i);
          setRecentIds(ids);
        }
      })
      .catch(() => {});
  }, []);

  const fetchBatch = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    setBatch(null);
    setBatchId(id);
    try {
      const res = await fetch(`/api/chain?id=${id}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setBatch(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to fetch batch");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const id = parseInt(inputId, 10);
    if (!isNaN(id) && id > 0) fetchBatch(id);
  };

  return (
    <main className="min-h-screen bg-[#f6f3ee] font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-green-800 font-extrabold text-lg">
            <Leaf className="w-5 h-5" /> COWCARE
          </Link>
          <Link href="/" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-800 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            <Leaf className="w-3.5 h-3.5" /> Powered by Celo Blockchain
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">Milk Supply Chain Tracker</h1>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto text-sm">
            Every batch of milk is recorded on-chain. Enter a batch ID to trace its full journey from farm to shelf.
          </p>
          {totalBatches !== null && (
            <p className="text-green-700 font-semibold text-sm mt-2">
              {totalBatches} batches tracked on-chain
            </p>
          )}
        </motion.div>

        {/* Search */}
        <motion.form initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          onSubmit={handleSearch} className="flex gap-3 mb-4">
          <input
            type="number" min={1} value={inputId}
            onChange={(e) => setInputId(e.target.value)}
            placeholder="Enter batch ID (e.g. 19)"
            className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 bg-white"
          />
          <button type="submit"
            className="flex items-center gap-2 bg-green-800 hover:bg-green-900 text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors">
            <Search className="w-4 h-4" /> Track
          </button>
        </motion.form>

        {/* Quick links */}
        {recentIds.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="text-xs text-gray-400 self-center">Recent:</span>
            {recentIds.map((id) => (
              <button key={id} onClick={() => { setInputId(String(id)); fetchBatch(id); }}
                className={`text-xs px-3 py-1 rounded-full border transition-colors font-medium
                  ${batchId === id ? "bg-green-800 text-white border-green-800" : "bg-white text-green-800 border-green-200 hover:border-green-600"}`}>
                #{id}
              </button>
            ))}
          </div>
        )}

        {/* States */}
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3 py-16 text-gray-400">
              <Loader2 className="w-8 h-8 animate-spin text-green-700" />
              <span className="text-sm">Fetching from Celo blockchain…</span>
            </motion.div>
          )}

          {error && !loading && (
            <motion.div key="error" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
              <button onClick={() => batchId && fetchBatch(batchId)} className="ml-auto flex items-center gap-1 hover:underline">
                <RefreshCw className="w-3.5 h-3.5" /> Retry
              </button>
            </motion.div>
          )}

          {batch && !loading && (
            <BatchCard key={`batch-${batch.id}`} batch={batch} />
          )}

          {!batch && !loading && !error && (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3 py-16 text-gray-300">
              <Clock className="w-12 h-12" />
              <span className="text-sm">Enter a batch ID to start tracking</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contract info */}
        <div className="mt-10 text-center text-xs text-gray-400">
          Contract:{" "}
          <a href="https://celoscan.io/address/0x337b04f40036bfb48f22ae58fcf92d2f1f5cc4a8"
            target="_blank" rel="noopener noreferrer"
            className="text-green-700 font-mono hover:underline">
            0x337b…c4a8
          </a>{" "}
          on Celo Mainnet
        </div>
      </div>
    </main>
  );
}
