import { NextResponse } from "next/server";
import { rpcCall } from "@/lib/rpc";
import { encUint, decodeUint } from "@/lib/decode";
import { CONTRACT_ADDRESS, STAGES } from "@/lib/constants";

export const revalidate = 120;

async function ethCall(data: string) {
  return rpcCall("eth_call", [{ to: CONTRACT_ADDRESS, data }, "latest"]);
}

export async function GET() {
  try {
    const countHex = await ethCall("0x06f13056");
    const total = Number(BigInt(countHex));
    const stageCounts: Record<string, number> = Object.fromEntries(STAGES.map(s => [s, 0]));

    const ids = Array.from({ length: Math.min(total, 100) }, (_, i) => total - i);
    await Promise.all(ids.map(async (id) => {
      try {
        const hex = await ethCall("0x5ac86ab7" + encUint(id));
        const stage = STAGES[Number(decodeUint(hex.replace("0x", ""), 9))];
        if (stage) stageCounts[stage]++;
      } catch { /* skip */ }
    }));

    return NextResponse.json({ total, stageCounts, sampledLast: Math.min(total, 100) });
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Unknown" }, { status: 500 });
  }
}
