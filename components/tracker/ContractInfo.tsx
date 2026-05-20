import { ExternalLink } from "lucide-react";
import { CONTRACT_ADDRESS, CELO_EXPLORER_ADDR } from "@/lib/constants";
import { shortAddr } from "@/lib/format";
import { CopyButton } from "@/components/ui/CopyButton";

export function ContractInfo() {
  return (
    <div className="text-center text-xs text-gray-400 mt-10">
      Contract:{" "}
      <a href={CELO_EXPLORER_ADDR(CONTRACT_ADDRESS)} target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-green-700 font-mono hover:underline">
        {shortAddr(CONTRACT_ADDRESS)} <ExternalLink className="w-3 h-3" />
      </a>
      <CopyButton text={CONTRACT_ADDRESS} />
      {" "}on Celo Mainnet
    </div>
  );
}
