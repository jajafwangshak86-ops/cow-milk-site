"use client";
import { motion } from "framer-motion";
import { ShoppingCart, Phone } from "lucide-react";

export function CTASection() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-16 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="bg-[#f0faf0] border border-green-200 rounded-3xl px-8 md:px-16 py-14 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Ready to Transform <br /> Your Farm?</h2>
          <p className="text-gray-500 mt-3 max-w-md">Join over 100,000 farmers already using CowCare to boost productivity and cattle health.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 shrink-0">
          <button className="flex items-center justify-center gap-2 bg-green-800 hover:bg-green-900 text-white px-8 py-3.5 rounded-md font-medium transition-colors shadow-lg">
            <ShoppingCart className="w-4 h-4" /> Get Started Free
          </button>
          <button className="flex items-center justify-center gap-2 border-2 border-green-800 text-green-800 hover:bg-green-50 px-8 py-3.5 rounded-md font-medium transition-colors">
            <Phone className="w-4 h-4" /> Talk to an Expert
          </button>
        </div>
      </motion.div>
    </section>
  );
}
