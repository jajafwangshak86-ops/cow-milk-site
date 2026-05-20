import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = { title: "Terms of Service — CowCare" };

export default function TermsPage() {
  return (
    <main className="bg-[#f6f3ee] font-sans">
      <Navbar />
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Terms of Service</h1>
        <p className="text-gray-500 text-sm mb-4">Last updated: May 2026</p>
        <div className="space-y-6 text-gray-700 text-sm leading-relaxed">
          <p>By using CowCare, you agree to these terms. The service is provided as-is without warranty.</p>
          <p>Blockchain transactions are irreversible. CowCare is not responsible for any losses arising from on-chain interactions.</p>
          <p>You are responsible for securing your private keys. Never share them with anyone.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
