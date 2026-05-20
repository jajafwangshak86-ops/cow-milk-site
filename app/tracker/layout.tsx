import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Batch Tracker — CowCare",
  description: "Track any milk batch on the Celo blockchain. Verify the full supply chain from farm to shelf.",
};

export default function TrackerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
