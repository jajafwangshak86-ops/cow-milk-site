import { Leaf } from "lucide-react";

const COLS = [
  { title: "Company",  links: ["About Us", "Blog", "Careers", "Press"] },
  { title: "Products", links: ["Dairy Mix", "Hay Blend", "Mineral Booster", "Custom Orders"] },
  { title: "Support",  links: ["Contact Us", "FAQ", "Shipping", "Returns"] },
];

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-14">
      <div className="max-w-7xl mx-auto px-6 md:px-16 grid sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 text-white font-extrabold text-lg mb-3">
            <Leaf className="w-5 h-5 text-green-500" /> COWCARE
          </div>
          <p className="text-sm leading-relaxed">Premium organic cattle feed for healthier herds and better yields.</p>
        </div>
        {COLS.map((col) => (
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
  );
}
