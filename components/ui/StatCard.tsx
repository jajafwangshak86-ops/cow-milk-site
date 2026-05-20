import { ReactNode } from "react";
interface Props { label: string; value: string | number; icon?: ReactNode; sub?: string; }
export function StatCard({ label, value, icon, sub }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</span>
        {icon && <span className="text-green-700">{icon}</span>}
      </div>
      <div className="text-2xl font-extrabold text-gray-900">{value}</div>
      {sub && <div className="text-xs text-gray-400 mt-1">{sub}</div>}
    </div>
  );
}
