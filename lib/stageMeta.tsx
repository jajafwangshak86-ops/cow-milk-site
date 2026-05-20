import { Leaf, FlaskConical, Truck, ShoppingBag, CheckCircle } from "lucide-react";
import { Stage } from "./constants";

export const STAGE_META: Record<Stage, {
  label: string;
  color: string;
  bg: string;
  icon: React.ReactNode;
  variant: "green" | "blue" | "amber" | "purple" | "gray";
}> = {
  Farmed:      { label: "Farmed",      color: "text-green-700",  bg: "bg-green-100",  icon: <Leaf className="w-4 h-4" />,        variant: "green" },
  Processed:   { label: "Processed",   color: "text-blue-700",   bg: "bg-blue-100",   icon: <FlaskConical className="w-4 h-4" />, variant: "blue" },
  Distributed: { label: "Distributed", color: "text-amber-700",  bg: "bg-amber-100",  icon: <Truck className="w-4 h-4" />,        variant: "amber" },
  OnSale:      { label: "On Sale",     color: "text-purple-700", bg: "bg-purple-100", icon: <ShoppingBag className="w-4 h-4" />,  variant: "purple" },
  Sold:        { label: "Sold",        color: "text-gray-700",   bg: "bg-gray-100",   icon: <CheckCircle className="w-4 h-4" />,  variant: "gray" },
};
