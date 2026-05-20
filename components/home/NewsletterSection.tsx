"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="bg-green-50 py-16">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Mail className="w-10 h-10 text-green-700 mx-auto mb-4" />
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Stay Updated</h2>
          <p className="text-gray-500 text-sm mb-6">Get the latest farming tips and product updates delivered to your inbox.</p>
          {submitted ? (
            <div className="flex items-center justify-center gap-2 text-green-700 font-semibold">
              <CheckCircle className="w-5 h-5" /> Thanks! You&apos;re subscribed.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com" required
                className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 bg-white" />
              <button type="submit" className="bg-green-800 hover:bg-green-900 text-white px-5 py-3 rounded-xl text-sm font-medium transition-colors">
                Subscribe
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
