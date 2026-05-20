import { Clock } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-gray-300">
      <Clock className="w-12 h-12" />
      <span className="text-sm">Enter a batch ID to start tracking</span>
    </div>
  );
}
