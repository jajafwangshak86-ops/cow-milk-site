"use client";
import { motion } from "framer-motion";

const PARTNERS = ["AgriCo", "FarmTech", "DairyPlus", "GreenFeed", "CeloFarm", "OrganicHub"];

export function PartnersSection() {
  return (
    <section className="bg-white py-12 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <p className="text-center text-xs text-gray-400 uppercase tracking-widest mb-8">Trusted Partners</p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {PARTNERS.map((name, i) => (
            <motion.div key={name} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="text-gray-300 font-extrabold text-lg tracking-tight hover:text-gray-400 transition-colors cursor-default">
              {name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
