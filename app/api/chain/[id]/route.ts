import { NextRequest, NextResponse } from "next/server";
import { rpcCall } from "@/lib/rpc";
import { encUint, decodeUint, decodeAddr, decodeString } from "@/lib/decode";
import { CONTRACT_ADDRESS, STAGES } from "@/lib/constants";
import type { Batch } from "@/types/batch";

export const revalidate = 30;

async function ethCall(data: string) {
  return rpcCall("eth_call", [{ to: CONTRACT_ADDRESS, data }, "latest"]);
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  if (isNaN(id) || id < 1) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  try {
    const data = "0x5ac86ab7" + encUint(id);
    const hex = await ethCall(data);
    const raw = hex.replace("0x", "");

    const batch: Batch = {
      id:           Number(decodeUint(raw, 0)),
      productName:  decodeString(raw, 1),
      quantity:     Number(decodeUint(raw, 2)),
      pricePerUnit: decodeUint(raw, 3).toString(),
      farmer:       decodeAddr(raw, 4),
      processor:    decodeAddr(raw, 5),
      distributor:  decodeAddr(raw, 6),
      retailer:     decodeAddr(raw, 7),
      buyer:        decodeAddr(raw, 8),
      stage:        STAGES[Number(decodeUint(raw, 9))] ?? "Unknown" as Batch["stage"],
      createdAt:    Number(decodeUint(raw, 10)),
      updatedAt:    Number(decodeUint(raw, 11)),
    };

    return NextResponse.json(batch);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
