"use client";
import { motion } from "framer-motion";
import { Users, Package, Globe, TrendingUp } from "lucide-react";

const STATS = [
  { icon: <Users className="w-6 h-6" />,    value: "100,000+", label: "Farmers Served" },
  { icon: <Package className="w-6 h-6" />,  value: "500+",     label: "Batches Tracked" },
  { icon: <Globe className="w-6 h-6" />,    value: "12",       label: "Countries" },
  { icon: <TrendingUp className="w-6 h-6" />, value: "25%",    label: "Avg Yield Increase" },
];

export function StatsSection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="text-center">
              <div className="flex justify-center text-green-700 mb-2">{s.icon}</div>
              <div className="text-3xl font-extrabold text-gray-900">{s.value}</div>
              <div className="text-gray-500 text-sm mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
