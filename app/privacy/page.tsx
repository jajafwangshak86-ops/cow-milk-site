import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = { title: "Privacy Policy — CowCare" };

export default function PrivacyPage() {
  return (
    <main className="bg-[#f6f3ee] font-sans">
      <Navbar />
      <section className="max-w-3xl mx-auto px-6 py-20 prose prose-green">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Privacy Policy</h1>
        <p className="text-gray-500 text-sm mb-4">Last updated: May 2026</p>
        <p className="text-gray-700 leading-relaxed">
          CowCare does not collect personal data beyond what is necessary to operate the service.
          Blockchain interactions are public by nature. We do not store private keys or wallet credentials.
        </p>
        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Data We Collect</h2>
        <ul className="text-gray-700 space-y-1 text-sm">
          <li>Search history stored locally in your browser (localStorage)</li>
          <li>No cookies, no tracking pixels, no analytics</li>
        </ul>
        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">Blockchain Data</h2>
        <p className="text-gray-700 text-sm leading-relaxed">
          All supply chain data is stored on the Celo public blockchain and is publicly accessible.
          CowCare reads this data via the Celo RPC endpoint.
        </p>
      </section>
      <Footer />
    </main>
  );
}
