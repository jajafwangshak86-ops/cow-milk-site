"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 },
  viewport: { once: true }, transition: { duration: 0.6, delay },
});

const TESTIMONIALS = [
  { name: "James Mwangi", role: "Dairy Farmer, Nakuru",    quote: "My milk production went up by 30% in just 3 weeks. CowCare is a game changer!" },
  { name: "Amina Osei",   role: "Cattle Rancher, Kumasi",  quote: "The organic blend keeps my cows healthy and energetic. I won't use anything else." },
  { name: "Peter Nkosi",  role: "Farm Owner, Nairobi",     quote: "Fast delivery, great quality, and my vet confirmed the feed is top notch." },
];

export function TestimonialsSection() {
  return (
    <section className="bg-green-800 py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <motion.div {...fadeUp()} className="text-center mb-14">
          <span className="text-green-300 font-semibold text-sm uppercase tracking-widest">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">What Farmers Say</h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={i} {...fadeUp(i * 0.1)} className="bg-green-700 rounded-2xl p-7">
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-green-100 text-sm leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-green-300 text-xs">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
