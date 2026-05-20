import { ReactNode } from "react";
export function Tag({ children }: { children: ReactNode }) {
  return <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded font-medium">{children}</span>;
}
