import Link from "next/link";
import { Package } from "lucide-react";

export default function BatchNotFound() {
  return (
    <div className="min-h-screen bg-[#f6f3ee] flex flex-col items-center justify-center gap-4 text-gray-600">
      <Package className="w-12 h-12 text-gray-300" />
      <h1 className="text-2xl font-extrabold">Batch Not Found</h1>
      <p className="text-gray-400 text-sm">This batch ID doesn&apos;t exist on-chain.</p>
      <Link href="/tracker" className="bg-green-800 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-green-900">
        Back to Tracker
      </Link>
    </div>
  );
}
