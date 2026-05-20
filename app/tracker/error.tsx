"use client";
import { AlertCircle } from "lucide-react";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="min-h-screen bg-[#f6f3ee] flex flex-col items-center justify-center gap-4 text-gray-600">
      <AlertCircle className="w-10 h-10 text-red-500" />
      <p className="font-semibold">Something went wrong loading the tracker.</p>
      <button onClick={reset} className="bg-green-800 text-white px-5 py-2 rounded-md text-sm">Try again</button>
    </div>
  );
}
