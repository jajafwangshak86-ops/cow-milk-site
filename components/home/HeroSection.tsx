"use client";
import { motion } from "framer-motion";
import { ShoppingCart, PlayCircle, Leaf, Users, BarChart3, Award } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 },
  viewport: { once: true }, transition: { duration: 0.6, delay },
});

export function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-16 pt-16 pb-16 grid md:grid-cols-2 items-center gap-10 overflow-hidden">
      <motion.div {...fadeUp()}>
        <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-4">
          <Leaf className="w-3.5 h-3.5" /> 100% Organic Feed
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          Premium Cow Feed <br /><span className="text-green-800">for Better Milk</span> Health
        </h1>
        <p className="mt-5 text-gray-500 max-w-md text-base leading-relaxed">
          Providing high-quality organic feed to improve milk production and keep your cattle healthy, strong, and thriving.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button className="flex items-center justify-center gap-2 bg-green-800 hover:bg-green-900 text-white px-7 py-3.5 rounded-md font-medium transition-colors shadow-lg">
            <ShoppingCart className="w-5 h-5" /> Shop Now
          </button>
          <button className="flex items-center justify-center gap-2 border-2 border-green-800 text-green-800 hover:bg-green-50 px-7 py-3.5 rounded-md font-medium transition-colors">
            <PlayCircle className="w-5 h-5" /> Watch Demo
          </button>
        </div>
        <div className="flex gap-10 mt-12">
          {[
            { value: "100k+", label: "Happy Farmers", icon: <Users className="w-4 h-4" /> },
            { value: "25%",   label: "Milk Increase",  icon: <BarChart3 className="w-4 h-4" /> },
            { value: "100%",  label: "Organic",         icon: <Award className="w-4 h-4" /> },
          ].map((s, i) => (
            <motion.div key={i} {...fadeUp(i * 0.15)}>
              <div className="flex items-center gap-1.5 text-green-800 mb-0.5">{s.icon}
                <span className="text-2xl font-extrabold">{s.value}</span>
              </div>
              <div className="text-gray-500 text-sm">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }}
        className="flex justify-center md:justify-end items-center">
        <div className="w-[98vw] sm:w-[85vw] md:w-full md:max-w-[560px] aspect-[4/5] overflow-hidden"
          style={{ clipPath: "polygon(20% 0%, 80% 5%, 100% 25%, 95% 70%, 75% 100%, 25% 95%, 0% 75%, 5% 30%)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/cow.jpg" alt="Cow" className="w-full h-full object-cover" />
        </div>
      </motion.div>
    </section>
  );
}
