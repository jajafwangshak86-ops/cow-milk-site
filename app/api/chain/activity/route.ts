/**
 * POST /api/chain/activity
 * Creates a new batch and advances it through all supply chain stages.
 * Requires PRIVATE_KEY in environment (owner wallet).
 *
 * Body (optional JSON): { productName?: string, quantity?: number, pricePerUnit?: string }
 */
import { NextRequest, NextResponse } from "next/server";
import { CONTRACT_ADDRESS, CELO_RPC, CELO_CHAIN_ID, PRODUCTS } from "@/lib/constants";

// ── ABI encoding ──────────────────────────────────────────────────────────────
const pad32 = (hex: string) => hex.replace("0x", "").padStart(64, "0");
const encUint = (n: number | bigint) => pad32(BigInt(n).toString(16));
const encAddr = (a: string) => pad32(a.replace("0x", "").toLowerCase());

function encStr(s: string): string {
  const b = Buffer.from(s, "utf8");
  return encUint(b.length) + b.toString("hex").padEnd(Math.ceil(b.length / 32) * 64, "0");
}

const SIG = {
  assignRole:      "0x630a195b",
  createBatch:     "0xe7f25c6e",
  processBatch:    "0x6309463b",
  distributeBatch: "0x6a131175",
  listForSale:     "0xc7857fb5",
  batchCount:      "0x06f13056",
};

function callUint(sig: string, n: number) {
  return sig + encUint(n);
}

// ── RPC ───────────────────────────────────────────────────────────────────────
async function rpc(method: string, params: unknown[] = []): Promise<string> {
  const res = await fetch(CELO_RPC, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
    cache: "no-store",
  });
  const json = await res.json();
  if (json.error) throw new Error(`RPC ${method}: ${json.error.message}`);
  return json.result as string;
}

// ── Minimal tx signer (no external deps) ─────────────────────────────────────
// Uses eth_signTransaction via a local node — not available on public RPC.
// Instead we use eth_sendRawTransaction with a hand-rolled EIP-1559 tx.
// We rely on the `micro-eth-signer` already used in interact.js via a dynamic import.
async function sendTx(
  privKey: Buffer,
  wallet: string,
  data: string,
  value?: bigint
): Promise<string> {
  const txValue = value ?? BigInt(0);
  // Dynamic import so this module only loads when the endpoint is called
  const { Transaction, addr } = await import("micro-eth-signer");

  const chainId = BigInt(await rpc("eth_chainId"));
  const gasPrice = (BigInt(await rpc("eth_gasPrice")) * 13n) / 10n;
  const nonce = BigInt(await rpc("eth_getTransactionCount", [wallet, "latest"]));
  const gasEstHex = await rpc("eth_estimateGas", [{
    from: wallet, to: CONTRACT_ADDRESS, data,
    value: "0x" + txValue.toString(16),
  }]);
  const gasLimit = (BigInt(gasEstHex) * 13n) / 10n;

  const tx = Transaction.prepare({
    type: "eip1559", to: CONTRACT_ADDRESS, nonce,
    maxFeePerGas: gasPrice, maxPriorityFeePerGas: gasPrice / 5n,
    gasLimit, chainId, data, value: txValue,
  });

  return rpc("eth_sendRawTransaction", [tx.signBy(privKey).toHex()]);
}

async function waitMined(txHash: string): Promise<void> {
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 3000));
    const receipt = await rpc("eth_getTransactionReceipt", [txHash]);
    if (receipt && receipt !== "0x") {
      const r = receipt as unknown as { status: string };
      if (r.status !== "0x1") throw new Error(`Tx reverted: ${txHash}`);
      return;
    }
  }
  throw new Error(`Timeout waiting for ${txHash}`);
}

// ── Handler ───────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const rawKey = process.env.PRIVATE_KEY?.replace("0x", "");
  if (!rawKey) {
    return NextResponse.json({ error: "PRIVATE_KEY not configured" }, { status: 500 });
  }

  const { addr } = await import("micro-eth-signer");
  const privKey = Buffer.from(rawKey, "hex");
  const wallet = addr.fromPrivateKey(privKey);

  // Pick product from body or random
  let body: { productName?: string; quantity?: number; pricePerUnit?: string } = {};
  try { body = await req.json(); } catch { /* no body */ }

  const product = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
  const productName  = body.productName  ?? product.name;
  const quantity     = body.quantity     ?? product.qty;
  const pricePerUnit = body.pricePerUnit ?? product.price;

  const txs: string[] = [];

  try {
    // 1. Assign Farmer role
    const d1 = "0x" + SIG.assignRole.slice(2) + encAddr(wallet) + encUint(1);
    const h1 = await sendTx(privKey, wallet, d1);
    txs.push(h1); await waitMined(h1);

    // 2. Create batch
    const d2 = "0x" + SIG.createBatch.slice(2) + encUint(96) + encUint(quantity) + encUint(BigInt(pricePerUnit)) + encStr(productName);
    const h2 = await sendTx(privKey, wallet, d2);
    txs.push(h2); await waitMined(h2);

    // Get batch ID from batchCount
    const countHex = await rpc("eth_call", [{ to: CONTRACT_ADDRESS, data: SIG.batchCount }, "latest"]);
    const batchId = Number(BigInt(countHex));

    // 3. Process
    const d3 = "0x" + SIG.assignRole.slice(2) + encAddr(wallet) + encUint(2);
    const h3 = await sendTx(privKey, wallet, d3);
    txs.push(h3); await waitMined(h3);
    const h4 = await sendTx(privKey, wallet, callUint(SIG.processBatch.slice(2), batchId));
    txs.push(h4); await waitMined(h4);

    // 4. Distribute
    const d5 = "0x" + SIG.assignRole.slice(2) + encAddr(wallet) + encUint(3);
    const h5 = await sendTx(privKey, wallet, d5);
    txs.push(h5); await waitMined(h5);
    const h6 = await sendTx(privKey, wallet, callUint(SIG.distributeBatch.slice(2), batchId));
    txs.push(h6); await waitMined(h6);

    // 5. List for sale
    const d7 = "0x" + SIG.assignRole.slice(2) + encAddr(wallet) + encUint(4);
    const h7 = await sendTx(privKey, wallet, d7);
    txs.push(h7); await waitMined(h7);
    const h8 = await sendTx(privKey, wallet, callUint(SIG.listForSale.slice(2), batchId));
    txs.push(h8); await waitMined(h8);

    return NextResponse.json({ batchId, productName, txs });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg, txs }, { status: 500 });
  }
}
