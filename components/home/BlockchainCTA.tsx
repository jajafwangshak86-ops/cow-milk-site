"use client";
import { motion } from "framer-motion";
import { Info, Search, ChevronRight } from "lucide-react";

export function BlockchainCTA() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-gradient-to-br from-green-900 to-green-700 rounded-3xl px-8 md:px-16 py-14 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left overflow-hidden relative">
          <div className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle at 80% 50%, #fff 0%, transparent 60%)" }} />
          <div className="relative">
            <span className="inline-flex items-center gap-1.5 bg-green-600/40 text-green-200 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              <Info className="w-3.5 h-3.5" /> Powered by Celo Blockchain
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Track Your Milk <br /> From Farm to Shelf</h2>
            <p className="text-green-200 mt-3 max-w-md text-sm leading-relaxed">
              Every batch of CowCare milk is recorded on-chain. Scan a batch ID to verify its full supply chain journey — all transparent and tamper-proof.
            </p>
          </div>
          <div className="relative shrink-0">
            <a href="/tracker"
              className="flex items-center justify-center gap-2 bg-white text-green-900 hover:bg-green-50 px-8 py-4 rounded-xl font-bold text-sm transition-colors shadow-xl">
              <Search className="w-4 h-4" /> Open Batch Tracker <ChevronRight className="w-4 h-4" />
            </a>
            <p className="text-green-300 text-xs mt-3 text-center">23+ batches live on Celo Mainnet</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
