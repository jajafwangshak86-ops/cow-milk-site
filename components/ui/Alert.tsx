import { ReactNode } from "react";
import { AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";

type AlertVariant = "info" | "success" | "warning" | "error";

const META: Record<AlertVariant, { icon: ReactNode; classes: string }> = {
  info:    { icon: <Info className="w-4 h-4" />,          classes: "bg-blue-50 border-blue-200 text-blue-800" },
  success: { icon: <CheckCircle className="w-4 h-4" />,   classes: "bg-green-50 border-green-200 text-green-800" },
  warning: { icon: <AlertTriangle className="w-4 h-4" />, classes: "bg-amber-50 border-amber-200 text-amber-800" },
  error:   { icon: <AlertCircle className="w-4 h-4" />,   classes: "bg-red-50 border-red-200 text-red-700" },
};

export function Alert({ variant = "info", children }: { variant?: AlertVariant; children: ReactNode }) {
  const { icon, classes } = META[variant];
  return (
    <div className={`flex items-start gap-3 border rounded-xl p-4 text-sm ${classes}`}>
      <span className="shrink-0 mt-0.5">{icon}</span>
      <div>{children}</div>
    </div>
  );
}
