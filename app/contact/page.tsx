import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact — CowCare",
  description: "Get in touch with the CowCare team.",
};

export default function ContactPage() {
  return (
    <main className="bg-[#f6f3ee] font-sans text-gray-800">
      <Navbar />
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">Contact Us</h1>
          <p className="text-gray-500 mt-3">We&apos;d love to hear from you. Reach out any time.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
            {[
              { icon: <Mail className="w-5 h-5 text-green-700" />,   label: "Email",   value: "hello@cowcare.app" },
              { icon: <Phone className="w-5 h-5 text-green-700" />,  label: "Phone",   value: "+254 700 000 000" },
              { icon: <MapPin className="w-5 h-5 text-green-700" />, label: "Address", value: "Nairobi, Kenya" },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-center gap-4 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                {icon}
                <div>
                  <div className="text-xs text-gray-400">{label}</div>
                  <div className="font-semibold text-gray-800">{value}</div>
                </div>
              </div>
            ))}
          </div>
          <form className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 space-y-4">
            <input type="text" placeholder="Your name" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" />
            <input type="email" placeholder="Email address" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" />
            <textarea rows={4} placeholder="Your message" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 resize-none" />
            <button type="submit" className="w-full bg-green-800 hover:bg-green-900 text-white py-3 rounded-xl text-sm font-medium transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </main>
  );
}
