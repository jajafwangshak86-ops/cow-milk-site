/**
 * interact.js — Full supply chain walkthrough for MilkSupplyChain contract
 * Each tx is fully confirmed before the next is sent.
 */

import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { readFileSync, writeFileSync } from "fs";
import { execSync } from "child_process";
import { Transaction, addr } from "micro-eth-signer";
import { config } from "dotenv";

config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const RPC = "https://forno.celo.org";
const CONTRACT = "0x337b04f40036bfb48f22ae58fcf92d2f1f5cc4a8";
const PRIVATE_KEY = process.env.PRIVATE_KEY?.replace("0x", "");
if (!PRIVATE_KEY) { console.error("Missing PRIVATE_KEY"); process.exit(1); }

// ── RPC ──────────────────────────────────────────────────────────────────────
function rpc(method, ...params) {
  const body = JSON.stringify({ jsonrpc: "2.0", id: 1, method, params });
  const out = execSync(
    `curl -s --max-time 15 -X POST '${RPC}' -H 'Content-Type: application/json' --data-binary @-`,
    { input: body }
  ).toString();
  const json = JSON.parse(out);
  if (json.error) throw new Error(`RPC ${method}: ${JSON.stringify(json.error)}`);
  return json.result;
}

function sleep(ms) { execSync(`sleep ${ms / 1000}`); }

// ── Encoding ─────────────────────────────────────────────────────────────────
const pad32 = (hex) => hex.replace("0x", "").padStart(64, "0");
const encUint = (n) => pad32(BigInt(n).toString(16));
const encAddr = (a) => pad32(a.replace("0x", "").toLowerCase());
function encStr(s) {
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
  getStage:        "0x2e325020",
};

const calldata = {
  assignRole: (a, r) => "0x" + SIG.assignRole.slice(2) + encAddr(a) + encUint(r),
  createBatch: (name, qty, price) =>
    "0x" + SIG.createBatch.slice(2) + encUint(96) + encUint(qty) + encUint(price) + encStr(name),
  uint256: (sel, n) => sel + encUint(n),
};

// ── Wallet ───────────────────────────────────────────────────────────────────
const privKey = Buffer.from(PRIVATE_KEY, "hex");
const wallet = addr.fromPrivateKey(privKey);
const chainId = BigInt(rpc("eth_chainId"));
const gasPrice = (BigInt(rpc("eth_gasPrice")) * 13n) / 10n; // +30% buffer

function getNonce() {
  return BigInt(rpc("eth_getTransactionCount", wallet, "latest"));
}

// ── Send one tx and wait for it to be mined ───────────────────────────────────
function sendAndWait(data, label, value = 0n) {
  let txHash;

  // Retry up to 3 times on nonce errors
  for (let attempt = 0; attempt < 3; attempt++) {
    const nonce = getNonce();
    const gasEstHex = rpc("eth_estimateGas", {
      from: wallet, to: CONTRACT, data,
      value: "0x" + value.toString(16),
    });
    const gasLimit = (BigInt(gasEstHex) * 13n) / 10n;
    const tx = Transaction.prepare({
      type: "eip1559", to: CONTRACT, nonce,
      maxFeePerGas: gasPrice, maxPriorityFeePerGas: gasPrice / 5n,
      gasLimit, chainId, data, value,
    });

    try {
      txHash = rpc("eth_sendRawTransaction", tx.signBy(privKey).toHex());
      break;
    } catch (e) {
      if (e.message.includes("nonce too low") && attempt < 2) {
        sleep(2000);
        continue;
      }
      throw e;
    }
  }

  process.stdout.write(`  ${label} → ${txHash}\n`);

  // Poll until nonce advances (tx confirmed) — max 90s
  const expectedNonce = getNonce(); // nonce after broadcast
  for (let i = 0; i < 30; i++) {
    sleep(3000);
    const current = getNonce();
    if (current > expectedNonce - 1n) {
      const receipt = rpc("eth_getTransactionReceipt", txHash);
      if (receipt) {
        if (receipt.status !== "0x1") throw new Error(`Reverted: ${txHash}`);
        return receipt;
      }
    }
    process.stdout.write(".");
  }
  throw new Error(`Timeout waiting for ${txHash}`);
}

// ── Products ─────────────────────────────────────────────────────────────────
const PRODUCTS = [
  { name: "Whole Milk 1L",         qty: 100, price: "1000000000000000" },
  { name: "Skimmed Milk 1L",       qty: 80,  price: "900000000000000"  },
  { name: "Full Cream Milk 2L",    qty: 50,  price: "1800000000000000" },
  { name: "Low Fat Milk 500ml",    qty: 200, price: "500000000000000"  },
  { name: "Organic Whole Milk 1L", qty: 60,  price: "1500000000000000" },
];

const STAGES = ["Farmed", "Processed", "Distributed", "OnSale", "Sold"];

// ── Main ─────────────────────────────────────────────────────────────────────
const batchIds = [];

console.log(`Wallet:   ${wallet}`);
console.log(`Contract: ${CONTRACT}\n`);

for (const product of PRODUCTS) {
  console.log(`\n══ ${product.name} ══`);

  // Farmer → create
  sendAndWait(calldata.assignRole(wallet, 1), "assignRole(Farmer)");
  const receipt = sendAndWait(
    calldata.createBatch(product.name, product.qty, product.price),
    "createBatch"
  );

  // BatchCreated event: topics[1] = batchId (indexed uint256)
  const batchId = Number(BigInt(receipt.logs[0].topics[1]));
  console.log(`  Batch ID: ${batchId}`);
  batchIds.push(batchId);

  // Processor → process
  sendAndWait(calldata.assignRole(wallet, 2), "assignRole(Processor)");
  sendAndWait(calldata.uint256(SIG.processBatch, batchId), "processBatch");

  // Distributor → distribute
  sendAndWait(calldata.assignRole(wallet, 3), "assignRole(Distributor)");
  sendAndWait(calldata.uint256(SIG.distributeBatch, batchId), "distributeBatch");

  // Retailer → list
  sendAndWait(calldata.assignRole(wallet, 4), "assignRole(Retailer)");
  sendAndWait(calldata.uint256(SIG.listForSale, batchId), "listForSale");

  const stageHex = rpc("eth_call", { to: CONTRACT, data: calldata.uint256(SIG.getStage, batchId) }, "latest");
  console.log(`  ✓ Stage: ${STAGES[Number(BigInt(stageHex))]}`);
}

console.log("\n── Summary ──");
const total = Number(BigInt(rpc("eth_call", { to: CONTRACT, data: SIG.batchCount }, "latest")));
console.log(`Total batches on-chain: ${total}`);
console.log(`Batch IDs this run: ${batchIds.join(", ")}`);
console.log("✅ Done");
