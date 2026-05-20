import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Leaf, Users, Award, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — CowCare",
  description: "Learn about CowCare's mission to bring transparency to the milk supply chain using blockchain technology.",
};

export default function AboutPage() {
  return (
    <main className="bg-[#f6f3ee] font-sans text-gray-800">
      <Navbar />
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            <Leaf className="w-3.5 h-3.5" /> Our Story
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900">About CowCare</h1>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
            CowCare was founded with a simple mission: make the dairy supply chain transparent, traceable, and trustworthy for everyone — from farmer to consumer.
          </p>
        </div>
        <div className="grid sm:grid-cols-3 gap-8 text-center">
          {[
            { icon: <Users className="w-8 h-8 text-green-700" />, title: "100k+ Farmers", desc: "Trusted by farmers across Africa and beyond." },
            { icon: <Award className="w-8 h-8 text-amber-600" />, title: "Certified Organic", desc: "All products meet international organic standards." },
            { icon: <Globe className="w-8 h-8 text-sky-600" />,   title: "On-Chain Verified", desc: "Every batch recorded on Celo blockchain." },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
