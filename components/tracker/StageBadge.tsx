import { Badge } from "@/components/ui/Badge";
import { Stage } from "@/lib/constants";

const VARIANT: Record<Stage, "green" | "blue" | "amber" | "purple" | "gray"> = {
  Farmed: "green", Processed: "blue", Distributed: "amber", OnSale: "purple", Sold: "gray",
};

export function StageBadge({ stage }: { stage: Stage }) {
  return <Badge variant={VARIANT[stage] ?? "gray"}>{stage}</Badge>;
}
