import { NextResponse } from "next/server";
import { rpcCall } from "@/lib/rpc";
import { CONTRACT_ADDRESS } from "@/lib/constants";

export const revalidate = 60;

export async function GET() {
  try {
    const hex = await rpcCall("eth_call", [{ to: CONTRACT_ADDRESS, data: "0x06f13056" }, "latest"]);
    return NextResponse.json({ count: Number(BigInt(hex)) });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
