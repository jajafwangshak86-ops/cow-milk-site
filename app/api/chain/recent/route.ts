import { NextRequest, NextResponse } from "next/server";
import { rpcCall } from "@/lib/rpc";
import { encUint, decodeUint, decodeAddr, decodeString } from "@/lib/decode";
import { CONTRACT_ADDRESS, STAGES } from "@/lib/constants";

export const revalidate = 60;

async function ethCall(data: string) {
  return rpcCall("eth_call", [{ to: CONTRACT_ADDRESS, data }, "latest"]);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "5", 10), 20);

  try {
    const countHex = await ethCall("0x06f13056");
    const total = Number(BigInt(countHex));
    const ids = Array.from({ length: Math.min(limit, total) }, (_, i) => total - i);

    const batches = await Promise.all(ids.map(async (id) => {
      const data = "0x5ac86ab7" + encUint(id);
      const hex = await ethCall(data);
      const raw = hex.replace("0x", "");
      return {
        id,
        productName: decodeString(raw, 1),
        quantity:    Number(decodeUint(raw, 2)),
        stage:       STAGES[Number(decodeUint(raw, 9))] ?? "Unknown",
        farmer:      decodeAddr(raw, 4),
        updatedAt:   Number(decodeUint(raw, 11)),
      };
    }));

    return NextResponse.json({ batches, total });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
