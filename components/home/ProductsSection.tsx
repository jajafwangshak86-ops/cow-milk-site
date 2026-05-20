"use client";
import { motion } from "framer-motion";
import { ShoppingCart, ArrowRight, Wheat, Package, Pill } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 },
  viewport: { once: true }, transition: { duration: 0.6, delay },
});

const PRODUCTS = [
  { icon: <Wheat className="w-16 h-16 text-green-700" />,  bg: "bg-green-50",  name: "Premium Dairy Mix",  weight: "50kg", price: "$45", badge: "Best Seller" },
  { icon: <Package className="w-16 h-16 text-yellow-600" />, bg: "bg-yellow-50", name: "Organic Hay Blend",  weight: "25kg", price: "$28", badge: "New" },
  { icon: <Pill className="w-16 h-16 text-blue-600" />,    bg: "bg-blue-50",   name: "Mineral Booster",    weight: "10kg", price: "$19", badge: "Popular" },
];

export function ProductsSection() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <motion.div {...fadeUp()} className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-green-800 font-semibold text-sm uppercase tracking-widest">Our Products</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">Best Selling Feed</h2>
          </div>
          <a href="#" className="flex items-center gap-1 text-green-800 font-medium text-sm hover:underline">
            View all products <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((p, i) => (
            <motion.div key={i} {...fadeUp(i * 0.1)}
              className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className={`${p.bg} h-48 flex items-center justify-center`}>{p.icon}</div>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-semibold bg-green-100 text-green-800 px-2 py-0.5 rounded-full">{p.badge}</span>
                    <h3 className="font-bold text-gray-900 text-lg mt-2">{p.name}</h3>
                    <p className="text-gray-400 text-sm">{p.weight} bag</p>
                  </div>
                  <div className="text-2xl font-extrabold text-green-800">{p.price}</div>
                </div>
                <button className="mt-5 w-full flex items-center justify-center gap-2 bg-green-800 hover:bg-green-900 text-white py-2.5 rounded-md text-sm font-medium transition-colors">
                  <ShoppingCart className="w-4 h-4" /> Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
