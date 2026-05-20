"use client";
import { motion } from "framer-motion";
import { Leaf, TrendingUp, Dumbbell, Truck, FlaskConical, Recycle } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 },
  viewport: { once: true }, transition: { duration: 0.6, delay },
});

const FEATURES = [
  { icon: <Leaf className="w-7 h-7 text-green-700" />,      title: "100% Organic",     desc: "No chemicals, no additives. Pure natural ingredients sourced from certified farms." },
  { icon: <TrendingUp className="w-7 h-7 text-amber-600" />, title: "Boosts Milk Yield", desc: "Scientifically formulated to increase milk production by up to 25% within weeks." },
  { icon: <Dumbbell className="w-7 h-7 text-sky-600" />,     title: "Stronger Cattle",   desc: "Rich in minerals and vitamins that improve bone density and overall health." },
  { icon: <Truck className="w-7 h-7 text-green-700" />,      title: "Fast Delivery",     desc: "Same-day dispatch with nationwide delivery to your farm gate." },
  { icon: <FlaskConical className="w-7 h-7 text-amber-600" />, title: "Lab Tested",      desc: "Every batch is tested in certified labs to ensure quality and safety." },
  { icon: <Recycle className="w-7 h-7 text-sky-600" />,      title: "Eco Friendly",      desc: "Sustainable packaging and carbon-neutral production processes." },
];

const CARDS = ["bg-green-50 border-green-100", "bg-amber-50 border-amber-100", "bg-sky-50 border-sky-100"];
const ICON_BG = ["bg-green-100", "bg-amber-100", "bg-sky-100"];

export function FeaturesSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-16 py-20">
      <motion.div {...fadeUp()} className="text-center mb-14">
        <span className="text-green-800 font-semibold text-sm uppercase tracking-widest">Why Choose Us</span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">Everything Your Cattle Needs</h2>
        <p className="text-gray-500 mt-3 max-w-xl mx-auto">We combine science and nature to deliver the best nutrition for your livestock.</p>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {FEATURES.map((f, i) => (
          <motion.div key={i} {...fadeUp(i * 0.1)}
            className={`${CARDS[i % 3]} rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow border`}>
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${ICON_BG[i % 3]}`}>{f.icon}</div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">{f.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
