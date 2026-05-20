"use client";
import { useState } from "react";
import { Share2, Check } from "lucide-react";

export function BatchShareButton({ batchId }: { batchId: number }) {
  const [copied, setCopied] = useState(false);
  const share = () => {
    const url = `${window.location.origin}/tracker/${batchId}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button onClick={share}
      className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-green-700 transition-colors border border-gray-200 rounded-lg px-3 py-1.5">
      {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Share2 className="w-3.5 h-3.5" />}
      {copied ? "Copied!" : "Share"}
    </button>
  );
}
