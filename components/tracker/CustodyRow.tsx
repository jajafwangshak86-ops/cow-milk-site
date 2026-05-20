import { ExternalLink } from "lucide-react";
import { shortAddr, celoScanAddr, isZeroAddr } from "@/lib/format";
import { CopyButton } from "@/components/ui/CopyButton";

export function CustodyRow({ role, address }: { role: string; address: string }) {
  const empty = isZeroAddr(address);
  return (
    <div className="flex items-center justify-between gap-2 py-1.5 border-b border-gray-100 last:border-0 text-sm">
      <span className="capitalize text-gray-500 w-24">{role}</span>
      {empty ? (
        <span className="text-gray-300 italic text-xs">Not assigned</span>
      ) : (
        <div className="flex items-center gap-1.5">
          <a href={celoScanAddr(address)} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 text-green-700 font-mono hover:underline">
            {shortAddr(address)} <ExternalLink className="w-3 h-3" />
          </a>
          <CopyButton text={address} />
        </div>
      )}
    </div>
  );
}
