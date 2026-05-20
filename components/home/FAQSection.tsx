"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  { q: "What makes CowCare feed different?", a: "Our feed is 100% organic, lab-tested, and scientifically formulated to boost milk yield by up to 25%." },
  { q: "How does blockchain tracking work?", a: "Every milk batch is recorded on the Celo blockchain at each stage — from farm to shelf — creating an immutable, transparent record." },
  { q: "How quickly will I see results?", a: "Most farmers report noticeable improvements in milk yield within 2–3 weeks of switching to CowCare feed." },
  { q: "Do you deliver nationwide?", a: "Yes! We offer same-day dispatch with nationwide delivery directly to your farm gate." },
  { q: "Can I verify a batch I purchased?", a: "Absolutely. Visit our Tracker page and enter the batch ID printed on your packaging to see the full supply chain history." },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="max-w-3xl mx-auto px-6 md:px-16 py-20">
      <div className="text-center mb-12">
        <span className="text-green-800 font-semibold text-sm uppercase tracking-widest">FAQ</span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">Frequently Asked Questions</h2>
      </div>
      <div className="space-y-3">
        {FAQS.map((faq, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <button onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
              {faq.q}
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${open === i ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
                  className="overflow-hidden">
                  <p className="px-6 pb-4 text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
