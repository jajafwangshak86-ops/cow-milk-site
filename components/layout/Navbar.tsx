"use client";
import { useState } from "react";
import Link from "next/link";
import { Leaf, ChevronRight, Menu, X } from "lucide-react";

const NAV_LINKS = ["Home", "Products", "About Us", "Blog"];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-xl font-extrabold text-green-800 tracking-tight">
          <Leaf className="w-5 h-5" /> COWCARE
        </Link>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
          {NAV_LINKS.map((l) => (
            <a key={l} href="#" className="hover:text-green-800 transition-colors">{l}</a>
          ))}
          <Link href="/tracker" className="hover:text-green-800 transition-colors">Tracker</Link>
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <a href="#" className="text-sm text-gray-600 hover:text-green-800 transition-colors">Log in</a>
          <button className="flex items-center gap-2 bg-green-800 hover:bg-green-900 text-white px-5 py-2 rounded-md text-sm transition-colors">
            Sign In <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <button className="md:hidden text-gray-700" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t px-6 py-4 flex flex-col gap-4 text-sm font-medium text-gray-700">
          {NAV_LINKS.map((l) => <a key={l} href="#" className="hover:text-green-800">{l}</a>)}
          <Link href="/tracker" className="hover:text-green-800">Tracker</Link>
          <button className="bg-green-800 text-white px-4 py-2 rounded-md w-full">Sign In</button>
        </div>
      )}
    </header>
  );
}
