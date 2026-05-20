import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — CowCare",
  description: "Tips, news, and insights on dairy farming, cattle nutrition, and blockchain traceability.",
};

const POSTS = [
  { title: "How Blockchain is Transforming Dairy Supply Chains", date: "May 10, 2026", tag: "Blockchain", excerpt: "Discover how on-chain batch tracking brings unprecedented transparency to milk production." },
  { title: "Top 5 Organic Feed Ingredients for Higher Milk Yield", date: "Apr 28, 2026", tag: "Nutrition",   excerpt: "Science-backed ingredients that consistently boost milk production in dairy cattle." },
  { title: "Understanding Celo: The Carbon-Negative Blockchain", date: "Apr 15, 2026", tag: "Technology",  excerpt: "Why we chose Celo for our supply chain DApp and what makes it ideal for agriculture." },
];

export default function BlogPage() {
  return (
    <main className="bg-[#f6f3ee] font-sans text-gray-800">
      <Navbar />
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="mb-12">
          <span className="text-green-800 font-semibold text-sm uppercase tracking-widest">Blog</span>
          <h1 className="text-4xl font-extrabold text-gray-900 mt-2">Latest Articles</h1>
        </div>
        <div className="space-y-6">
          {POSTS.map((post, i) => (
            <div key={i} className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold bg-green-100 text-green-800 px-2.5 py-0.5 rounded-full">{post.tag}</span>
                <span className="text-xs text-gray-400">{post.date}</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h2>
              <p className="text-gray-500 text-sm mb-4">{post.excerpt}</p>
              <a href="#" className="flex items-center gap-1 text-green-800 text-sm font-medium hover:underline">
                Read more <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
