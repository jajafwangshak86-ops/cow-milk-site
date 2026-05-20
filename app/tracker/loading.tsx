import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f6f3ee] flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-green-700" />
    </div>
  );
}
