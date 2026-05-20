import { NextRequest, NextResponse } from "next/server";

const RPC = "https://forno.celo.org";
const CONTRACT = "0x337b04f40036bfb48f22ae58fcf92d2f1f5cc4a8";

const pad32 = (hex: string) => hex.replace("0x", "").padStart(64, "0");
const encUint = (n: number | bigint) => pad32(BigInt(n).toString(16));

const SIG = {
  batchCount: "0x06f13056",
  getBatch:   "0x5ac86ab7",
  getStage:   "0x2e325020",
};

async function rpc(method: string, ...params: unknown[]) {
  const res = await fetch(RPC, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
    next: { revalidate: 30 },
  });
  const json = await res.json();
  if (json.error) throw new Error(json.error.message);
  return json.result as string;
}

function call(data: string) {
  return rpc("eth_call", { to: CONTRACT, data }, "latest");
}

function decodeUint(hex: string, offset = 0) {
  return BigInt("0x" + hex.replace("0x", "").slice(offset * 64, offset * 64 + 64));
}

function decodeAddr(hex: string, offset = 0) {
  return "0x" + hex.replace("0x", "").slice(offset * 64 + 24, offset * 64 + 64);
}

function decodeString(hex: string, slotOffset: number) {
  const raw = hex.replace("0x", "");
  // dynamic offset is at slotOffset*64
  const dynOffset = Number(BigInt("0x" + raw.slice(slotOffset * 64, slotOffset * 64 + 64))) * 2;
  const len = Number(BigInt("0x" + raw.slice(dynOffset, dynOffset + 64)));
  const strHex = raw.slice(dynOffset + 64, dynOffset + 64 + len * 2);
  return Buffer.from(strHex, "hex").toString("utf8");
}

const STAGES = ["Farmed", "Processed", "Distributed", "OnSale", "Sold"] as const;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const idParam = searchParams.get("id");

    // Return total count
    if (!idParam) {
      const hex = await call(SIG.batchCount);
      const count = Number(BigInt(hex));
      return NextResponse.json({ count });
    }

    const id = parseInt(idParam, 10);
    if (isNaN(id) || id < 1) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

    // getBatch(uint256) selector = keccak256("getBatch(uint256)")[0..4]
    const data = "0x5ac86ab7" + encUint(id);
    const hex = await call(data);
    const raw = hex.replace("0x", "");

    // Struct layout (all slots):
    // 0: id, 1: productName offset, 2: quantity, 3: pricePerUnit,
    // 4: farmer, 5: processor, 6: distributor, 7: retailer,
    // 8: buyer, 9: stage, 10: createdAt, 11: updatedAt
    // dynamic string follows

    const batch = {
      id:           Number(decodeUint(raw, 0)),
      productName:  decodeString(raw, 1),
      quantity:     Number(decodeUint(raw, 2)),
      pricePerUnit: decodeUint(raw, 3).toString(),
      farmer:       decodeAddr(raw, 4),
      processor:    decodeAddr(raw, 5),
      distributor:  decodeAddr(raw, 6),
      retailer:     decodeAddr(raw, 7),
      buyer:        decodeAddr(raw, 8),
      stage:        STAGES[Number(decodeUint(raw, 9))] ?? "Unknown",
      createdAt:    Number(decodeUint(raw, 10)),
      updatedAt:    Number(decodeUint(raw, 11)),
    };

    return NextResponse.json(batch);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
