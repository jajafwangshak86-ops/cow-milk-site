import { ExternalLink } from "lucide-react";
import { shortAddr, celoScanAddr } from "@/lib/format";

const ZERO_ADDR = "0x" + "0".repeat(40);

export function CustodyRow({ role, address }: { role: string; address: string }) {
  const empty = !address || address.toLowerCase() === ZERO_ADDR;
  return (
    <div className="flex items-center justify-between gap-2 py-1.5 border-b border-gray-100 last:border-0 text-sm">
      <span className="capitalize text-gray-500 w-24">{role}</span>
      {empty ? (
        <span className="text-gray-300 italic text-xs">Not assigned</span>
      ) : (
        <a href={celoScanAddr(address)} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1 text-green-700 font-mono hover:underline">
          {shortAddr(address)} <ExternalLink className="w-3 h-3" />
        </a>
      )}
    </div>
  );
}
