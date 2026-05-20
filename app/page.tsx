"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  ShoppingCart, Info, ChevronRight, Menu, X, PlayCircle,
  Leaf, TrendingUp, Dumbbell, Truck, FlaskConical, Recycle,
  Search, Star, Phone, ArrowRight, Wheat, Pill, Package,
  CheckCircle, Users, BarChart3, Award
} from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="bg-[#f6f3ee] font-sans text-gray-800 overflow-x-hidden">

      {/* ── NAVBAR ── */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-xl font-extrabold text-green-800 tracking-tight">
            <Leaf className="w-5 h-5" /> COWCARE
          </div>

          <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
            {["Home", "Products", "About Us", "Blog"].map((l) => (
              <a key={l} href="#" className="hover:text-green-800 transition-colors">{l}</a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a href="#" className="text-sm text-gray-600 hover:text-green-800 transition-colors">Log in</a>
            <button className="flex items-center gap-2 bg-green-800 hover:bg-green-900 text-white px-5 py-2 rounded-md text-sm transition-colors">
              Sign In <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button className="md:hidden text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t px-6 py-4 flex flex-col gap-4 text-sm font-medium text-gray-700">
            {["Home", "Products", "About Us", "Blog"].map((l) => (
              <a key={l} href="#" className="hover:text-green-800">{l}</a>
            ))}
            <button className="bg-green-800 text-white px-4 py-2 rounded-md w-full">Sign In</button>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 pt-16 pb-16 grid md:grid-cols-2 items-center gap-10 overflow-hidden">
        <motion.div {...fadeUp()} className="pb-0">
          <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            <Leaf className="w-3.5 h-3.5" /> 100% Organic Feed
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Premium Cow Feed <br />
            <span className="text-green-800">for Better Milk</span> Health
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
              { value: "25%", label: "Milk Increase", icon: <BarChart3 className="w-4 h-4" /> },
              { value: "100%", label: "Organic", icon: <Award className="w-4 h-4" /> },
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
            style={{ clipPath: "polygon(20% 0%, 80% 5%, 100% 25%, 95% 70%, 75% 100%, 25% 95%, 0% 75%, 5% 30%)", borderRadius: "0 40px 40px 0" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/cow.jpg" alt="Cow" className="w-full h-full object-cover" />
          </div>
        </motion.div>
      </section>

      {/* ── TRUST BANNER ── */}
      <div className="bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-8 flex flex-col md:flex-row gap-6 md:gap-0 justify-between items-center text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[1,2,3].map(i => <div key={i} className="w-9 h-9 bg-green-600 border-2 border-white rounded-full" />)}
            </div>
            <div>
              <div className="font-semibold text-sm">10,000+ Reviews</div>
              <div className="flex items-center gap-1 text-yellow-400 text-xs">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-yellow-400" />)}
                <span className="text-green-300 ml-1">4.9 / 5</span>
              </div>
            </div>
          </div>
          <div className="font-bold text-lg">Healthy Life With Fresh Products</div>
          <div className="text-green-200 text-sm">Trusted by thousands of farmers across the country</div>
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-20">
        <motion.div {...fadeUp()} className="text-center mb-14">
          <span className="text-green-800 font-semibold text-sm uppercase tracking-widest">Why Choose Us</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">Everything Your Cattle Needs</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">We combine science and nature to deliver the best nutrition for your livestock.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: <Leaf className="w-7 h-7 text-green-700" />, title: "100% Organic", desc: "No chemicals, no additives. Pure natural ingredients sourced from certified farms." },
            { icon: <TrendingUp className="w-7 h-7 text-amber-600" />, title: "Boosts Milk Yield", desc: "Scientifically formulated to increase milk production by up to 25% within weeks." },
            { icon: <Dumbbell className="w-7 h-7 text-sky-600" />, title: "Stronger Cattle", desc: "Rich in minerals and vitamins that improve bone density and overall health." },
            { icon: <Truck className="w-7 h-7 text-green-700" />, title: "Fast Delivery", desc: "Same-day dispatch with nationwide delivery to your farm gate." },
            { icon: <FlaskConical className="w-7 h-7 text-amber-600" />, title: "Lab Tested", desc: "Every batch is tested in certified labs to ensure quality and safety." },
            { icon: <Recycle className="w-7 h-7 text-sky-600" />, title: "Eco Friendly", desc: "Sustainable packaging and carbon-neutral production processes." },
          ].map((f, i) => {
            const cards = [
              "bg-green-50 border-green-100",
              "bg-amber-50 border-amber-100",
              "bg-sky-50 border-sky-100",
            ];
            return (
              <motion.div key={i} {...fadeUp(i * 0.1)}
                className={`${cards[i % 3]} rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow border`}>
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${["bg-green-100","bg-amber-100","bg-sky-100"][i%3]}`}>{f.icon}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── PRODUCTS ── */}
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
            {[
              { icon: <Wheat className="w-16 h-16 text-green-700" />, bg: "bg-green-50", name: "Premium Dairy Mix", weight: "50kg", price: "$45", badge: "Best Seller" },
              { icon: <Package className="w-16 h-16 text-yellow-600" />, bg: "bg-yellow-50", name: "Organic Hay Blend", weight: "25kg", price: "$28", badge: "New" },
              { icon: <Pill className="w-16 h-16 text-blue-600" />, bg: "bg-blue-50", name: "Mineral Booster", weight: "10kg", price: "$19", badge: "Popular" },
            ].map((p, i) => (
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

      {/* ── HOW IT WORKS ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-20">
        <motion.div {...fadeUp()} className="text-center mb-14">
          <span className="text-green-800 font-semibold text-sm uppercase tracking-widest">Simple Process</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">How It Works</h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { step: "01", icon: <Search className="w-7 h-7 text-green-700" />, title: "Choose Product", desc: "Browse our range of organic feeds.", color: "bg-green-50", iconBg: "bg-green-100" },
            { step: "02", icon: <ShoppingCart className="w-7 h-7 text-amber-600" />, title: "Place Order", desc: "Add to cart and checkout securely.", color: "bg-amber-50", iconBg: "bg-amber-100" },
            { step: "03", icon: <Truck className="w-7 h-7 text-sky-600" />, title: "Fast Delivery", desc: "We deliver straight to your farm.", color: "bg-sky-50", iconBg: "bg-sky-100" },
            { step: "04", icon: <CheckCircle className="w-7 h-7 text-green-700" />, title: "Happy Cattle", desc: "Watch your herd thrive and produce more.", color: "bg-green-50", iconBg: "bg-green-100" },
          ].map((s, i) => (
            <motion.div key={i} {...fadeUp(i * 0.1)} className={`${s.color} rounded-2xl p-6 text-center`}>
              <div className={`w-16 h-16 ${s.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>{s.icon}</div>
              <div className="text-xs font-bold text-green-800 mb-1">{s.step}</div>
              <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── BLOCKCHAIN TRACKER CTA ── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <motion.div {...fadeUp()} className="bg-gradient-to-br from-green-900 to-green-700 rounded-3xl px-8 md:px-16 py-14 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left overflow-hidden relative">
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 80% 50%, #fff 0%, transparent 60%)" }} />
            <div className="relative">
              <span className="inline-flex items-center gap-1.5 bg-green-600/40 text-green-200 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                <Info className="w-3.5 h-3.5" /> Powered by Celo Blockchain
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">Track Your Milk <br /> From Farm to Shelf</h2>
              <p className="text-green-200 mt-3 max-w-md text-sm leading-relaxed">
                Every batch of CowCare milk is recorded on-chain. Scan a batch ID to verify its full supply chain journey — farmer, processor, distributor, and retailer — all transparent and tamper-proof.
              </p>
            </div>
            <div className="relative shrink-0">
              <a href="/tracker"
                className="flex items-center justify-center gap-2 bg-white text-green-900 hover:bg-green-50 px-8 py-4 rounded-xl font-bold text-sm transition-colors shadow-xl">
                <Search className="w-4 h-4" /> Open Batch Tracker <ChevronRight className="w-4 h-4" />
              </a>
              <p className="text-green-300 text-xs mt-3 text-center">23+ batches live on Celo Mainnet</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-green-800 py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="text-green-300 font-semibold text-sm uppercase tracking-widest">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">What Farmers Say</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "James Mwangi", role: "Dairy Farmer, Nakuru", quote: "My milk production went up by 30% in just 3 weeks. CowCare is a game changer!" },
              { name: "Amina Osei", role: "Cattle Rancher, Kumasi", quote: "The organic blend keeps my cows healthy and energetic. I won't use anything else." },
              { name: "Peter Nkosi", role: "Farm Owner, Nairobi", quote: "Fast delivery, great quality, and my vet confirmed the feed is top notch." },
            ].map((t, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)} className="bg-green-700 rounded-2xl p-7">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-green-100 text-sm leading-relaxed mb-5">"{t.quote}"</p>
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

      {/* ── CTA ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-20">
        <motion.div {...fadeUp()}
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

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 text-gray-400 py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-16 grid sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 text-white font-extrabold text-lg mb-3">
              <Leaf className="w-5 h-5 text-green-500" /> COWCARE
            </div>
            <p className="text-sm leading-relaxed">Premium organic cattle feed for healthier herds and better yields.</p>
          </div>
          {[
            { title: "Company", links: ["About Us", "Blog", "Careers", "Press"] },
            { title: "Products", links: ["Dairy Mix", "Hay Blend", "Mineral Booster", "Custom Orders"] },
            { title: "Support", links: ["Contact Us", "FAQ", "Shipping", "Returns"] },
          ].map((col) => (
            <div key={col.title}>
              <div className="text-white font-semibold mb-3 text-sm">{col.title}</div>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l}><a href="#" className="text-sm hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-16 mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-600">
          <span>© 2026 CowCare. All rights reserved.</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

    </main>
  );
}
