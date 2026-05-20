import { Loader2 } from "lucide-react";

export function Spinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const s = { sm: "w-4 h-4", md: "w-6 h-6", lg: "w-8 h-8" }[size];
  return <Loader2 className={`${s} animate-spin text-green-700`} />;
}
