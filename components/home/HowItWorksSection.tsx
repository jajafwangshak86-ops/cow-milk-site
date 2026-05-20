"use client";
import { motion } from "framer-motion";
import { Search, ShoppingCart, Truck, CheckCircle } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 },
  viewport: { once: true }, transition: { duration: 0.6, delay },
});

const STEPS = [
  { step: "01", icon: <Search className="w-7 h-7 text-green-700" />,      title: "Choose Product", desc: "Browse our range of organic feeds.",          color: "bg-green-50", iconBg: "bg-green-100" },
  { step: "02", icon: <ShoppingCart className="w-7 h-7 text-amber-600" />, title: "Place Order",    desc: "Add to cart and checkout securely.",          color: "bg-amber-50", iconBg: "bg-amber-100" },
  { step: "03", icon: <Truck className="w-7 h-7 text-sky-600" />,          title: "Fast Delivery",  desc: "We deliver straight to your farm.",           color: "bg-sky-50",   iconBg: "bg-sky-100"   },
  { step: "04", icon: <CheckCircle className="w-7 h-7 text-green-700" />,  title: "Happy Cattle",   desc: "Watch your herd thrive and produce more.",    color: "bg-green-50", iconBg: "bg-green-100" },
];

export function HowItWorksSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-16 py-20">
      <motion.div {...fadeUp()} className="text-center mb-14">
        <span className="text-green-800 font-semibold text-sm uppercase tracking-widest">Simple Process</span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">How It Works</h2>
      </motion.div>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
        {STEPS.map((s, i) => (
          <motion.div key={i} {...fadeUp(i * 0.1)} className={`${s.color} rounded-2xl p-6 text-center`}>
            <div className={`w-16 h-16 ${s.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>{s.icon}</div>
            <div className="text-xs font-bold text-green-800 mb-1">{s.step}</div>
            <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
            <p className="text-gray-500 text-sm">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
