import Link from "next/link";
import { Leaf } from "lucide-react";
import { APP_VERSION, SOCIAL_LINKS } from "@/lib/constants";

const COLS = [
  { title: "Company",  links: [{ label: "About Us", href: "/about" }, { label: "Blog", href: "/blog" }, { label: "Contact", href: "/contact" }] },
  { title: "Products", links: [{ label: "Dairy Mix", href: "#" }, { label: "Hay Blend", href: "#" }, { label: "Mineral Booster", href: "#" }] },
  { title: "Support",  links: [{ label: "Contact Us", href: "/contact" }, { label: "FAQ", href: "#" }, { label: "Tracker", href: "/tracker" }] },
];

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-14">
      <div className="max-w-7xl mx-auto px-6 md:px-16 grid sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 text-white font-extrabold text-lg mb-3">
            <Leaf className="w-5 h-5 text-green-500" /> COWCARE
          </div>
          <p className="text-sm leading-relaxed mb-4">Premium organic cattle feed for healthier herds and better yields.</p>
          <div className="flex gap-3">
            {Object.entries(SOCIAL_LINKS).map(([name, url]) => (
              <a key={name} href={url} target="_blank" rel="noopener noreferrer"
                className="text-xs text-gray-500 hover:text-white capitalize transition-colors">{name}</a>
            ))}
          </div>
          <p className="text-xs text-gray-600 mt-3">v{APP_VERSION}</p>
        </div>
        {COLS.map((col) => (
          <div key={col.title}>
            <div className="text-white font-semibold mb-3 text-sm">{col.title}</div>
            <ul className="space-y-2">
              {col.links.map(({ label, href }) => (
                <li key={label}><Link href={href} className="text-sm hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-16 mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-600">
        <span>© 2026 CowCare. All rights reserved.</span>
        <div className="flex gap-5">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
