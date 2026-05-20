import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "green" | "amber" | "blue" | "purple" | "gray";
  className?: string;
}

const variants = {
  green:  "bg-green-100 text-green-800",
  amber:  "bg-amber-100 text-amber-800",
  blue:   "bg-blue-100 text-blue-800",
  purple: "bg-purple-100 text-purple-800",
  gray:   "bg-gray-100 text-gray-700",
};

export function Badge({ children, variant = "green", className = "" }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
