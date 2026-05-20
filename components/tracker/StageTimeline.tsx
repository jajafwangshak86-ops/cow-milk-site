"use client";
import { Leaf, FlaskConical, Truck, ShoppingBag, CheckCircle } from "lucide-react";
import { Stage, STAGES, STAGE_DESCRIPTIONS } from "@/lib/constants";
import { Tooltip } from "@/components/ui/Tooltip";

const STAGE_META = {
  Farmed:      { icon: <Leaf className="w-4 h-4" />,        color: "text-green-700",  bg: "bg-green-100",  label: "Farmed" },
  Processed:   { icon: <FlaskConical className="w-4 h-4" />, color: "text-blue-700",   bg: "bg-blue-100",   label: "Processed" },
  Distributed: { icon: <Truck className="w-4 h-4" />,        color: "text-amber-700",  bg: "bg-amber-100",  label: "Distributed" },
  OnSale:      { icon: <ShoppingBag className="w-4 h-4" />,  color: "text-purple-700", bg: "bg-purple-100", label: "On Sale" },
  Sold:        { icon: <CheckCircle className="w-4 h-4" />,  color: "text-gray-700",   bg: "bg-gray-100",   label: "Sold" },
} as const;

export function StageTimeline({ stage }: { stage: Stage }) {
  const idx = STAGES.indexOf(stage);
  return (
    <div className="flex items-center w-full my-4">
      {STAGES.map((s, i) => {
        const meta = STAGE_META[s];
        const done = i <= idx;
        const active = i === idx;
        return (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <Tooltip text={STAGE_DESCRIPTIONS[s] ?? s}>
              <div className={`flex flex-col items-center gap-1 ${done ? meta.color : "text-gray-300"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all
                  ${active ? `${meta.bg} border-current ring-4 ring-offset-1 ring-current/20` : done ? `${meta.bg} border-current` : "bg-gray-50 border-gray-200"}`}>
                  {meta.icon}
                </div>
                <span className="text-[10px] font-semibold hidden sm:block">{meta.label}</span>
              </div>
            </Tooltip>
            {i < STAGES.length - 1 && (
              <div className={`flex-1 h-0.5 mx-1 ${i < idx ? "bg-green-400" : "bg-gray-200"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
