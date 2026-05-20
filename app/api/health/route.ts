import { NextResponse } from "next/server";
import { rpcCall } from "@/lib/rpc";
import { CONTRACT_ADDRESS } from "@/lib/constants";

export async function GET() {
  try {
    const blockHex = await rpcCall("eth_blockNumber");
    const block = Number(BigInt(blockHex));
    const countHex = await rpcCall("eth_call", [{ to: CONTRACT_ADDRESS, data: "0x06f13056" }, "latest"]);
    const batchCount = Number(BigInt(countHex));
    return NextResponse.json({ status: "ok", block, batchCount, timestamp: Date.now() });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ status: "error", error: msg }, { status: 503 });
  }
}
