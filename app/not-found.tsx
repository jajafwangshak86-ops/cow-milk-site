import Link from "next/link";
import { Leaf } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f6f3ee] flex flex-col items-center justify-center gap-6 text-gray-700">
      <Leaf className="w-12 h-12 text-green-700" />
      <h1 className="text-4xl font-extrabold">404</h1>
      <p className="text-gray-500">This page doesn&apos;t exist.</p>
      <Link href="/" className="bg-green-800 text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-green-900 transition-colors">
        Back to Home
      </Link>
    </div>
  );
}
