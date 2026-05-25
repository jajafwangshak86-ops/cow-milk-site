"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  CELO_CHAIN_ID: () => CELO_CHAIN_ID,
  CELO_RPC: () => CELO_RPC,
  CONTRACT_ADDRESS: () => CONTRACT_ADDRESS,
  STAGES: () => STAGES,
  celoScanAddr: () => celoScanAddr,
  celoScanBatch: () => celoScanBatch,
  celoScanTx: () => celoScanTx,
  formatCelo: () => formatCelo,
  formatTimestamp: () => formatTimestamp,
  getBatch: () => getBatch,
  getBatchCount: () => getBatchCount,
  getBatchesByStage: () => getBatchesByStage,
  getRecentBatches: () => getRecentBatches,
  getStage: () => getStage,
  getStageStats: () => getStageStats,
  shortAddr: () => shortAddr
});
module.exports = __toCommonJS(index_exports);
var CONTRACT_ADDRESS = "0x337b04f40036bfb48f22ae58fcf92d2f1f5cc4a8";
var CELO_RPC = "https://forno.celo.org";
var CELO_CHAIN_ID = 42220;
var STAGES = ["Farmed", "Processed", "Distributed", "OnSale", "Sold"];
var pad32 = (hex) => hex.replace("0x", "").padStart(64, "0");
var encUint = (n) => pad32(BigInt(n).toString(16));
function decodeUint(raw, slot) {
  const s = slot * 64;
  return s + 64 > raw.length ? 0n : BigInt("0x" + raw.slice(s, s + 64));
}
function decodeAddr(raw, slot) {
  const s = slot * 64;
  return s + 64 > raw.length ? "0x" + "0".repeat(40) : "0x" + raw.slice(s + 24, s + 64);
}
function decodeString(raw, slotOffset) {
  try {
    const dynOffset = Number(decodeUint(raw, slotOffset)) * 2;
    const len = Number(BigInt("0x" + raw.slice(dynOffset, dynOffset + 64)));
    return Buffer.from(raw.slice(dynOffset + 64, dynOffset + 64 + len * 2), "hex").toString("utf8");
  } catch {
    return "";
  }
}
async function ethCall(data, rpc = CELO_RPC) {
  const res = await fetch(rpc, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "eth_call",
      params: [{ to: CONTRACT_ADDRESS, data }, "latest"]
    })
  });
  const json = await res.json();
  if (json.error) throw new Error(`RPC error: ${json.error.message}`);
  return json.result;
}
async function getBatchCount(rpc) {
  const hex = await ethCall("0x06f13056", rpc);
  return Number(BigInt(hex));
}
async function getBatch(id, rpc) {
  const data = "0x5ac86ab7" + encUint(id);
  const hex = await ethCall(data, rpc);
  const raw = hex.replace("0x", "");
  return {
    id: Number(decodeUint(raw, 0)),
    productName: decodeString(raw, 1),
    quantity: Number(decodeUint(raw, 2)),
    pricePerUnit: decodeUint(raw, 3).toString(),
    farmer: decodeAddr(raw, 4),
    processor: decodeAddr(raw, 5),
    distributor: decodeAddr(raw, 6),
    retailer: decodeAddr(raw, 7),
    buyer: decodeAddr(raw, 8),
    stage: STAGES[Number(decodeUint(raw, 9))] ?? "Farmed",
    createdAt: Number(decodeUint(raw, 10)),
    updatedAt: Number(decodeUint(raw, 11))
  };
}
async function getRecentBatches(n = 10, rpc) {
  const count = await getBatchCount(rpc);
  const ids = Array.from({ length: Math.min(n, count) }, (_, i) => count - i).filter((id) => id > 0);
  return Promise.all(ids.map((id) => getBatch(id, rpc)));
}
async function getStage(id, rpc) {
  const data = "0x2e325020" + encUint(id);
  const hex = await ethCall(data, rpc);
  return STAGES[Number(BigInt(hex))] ?? "Farmed";
}
async function getBatchesByStage(stage, rpc) {
  const count = await getBatchCount(rpc);
  const all = await Promise.all(
    Array.from({ length: count }, (_, i) => getBatch(i + 1, rpc))
  );
  return all.filter((b) => b.stage === stage);
}
async function getStageStats(rpc) {
  const count = await getBatchCount(rpc);
  const all = await Promise.all(
    Array.from({ length: count }, (_, i) => getBatch(i + 1, rpc))
  );
  const stats = Object.fromEntries(STAGES.map((s) => [s, 0]));
  for (const b of all) stats[b.stage]++;
  return stats;
}
function formatCelo(wei) {
  try {
    return (Number(BigInt(wei)) / 1e18).toFixed(4) + " CELO";
  } catch {
    return "0.0000 CELO";
  }
}
function shortAddr(addr) {
  if (!addr || addr === "0x" + "0".repeat(40)) return "\u2014";
  return addr.slice(0, 6) + "\u2026" + addr.slice(-4);
}
function celoScanAddr(addr) {
  return `https://celoscan.io/address/${addr}`;
}
function celoScanTx(txHash) {
  return `https://celoscan.io/tx/${txHash}`;
}
function celoScanBatch(id) {
  return `https://celoscan.io/address/${CONTRACT_ADDRESS}?a=${id}`;
}
function formatTimestamp(ts, locale = "en-US") {
  if (!ts) return "\u2014";
  return new Date(ts * 1e3).toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CELO_CHAIN_ID,
  CELO_RPC,
  CONTRACT_ADDRESS,
  STAGES,
  celoScanAddr,
  celoScanBatch,
  celoScanTx,
  formatCelo,
  formatTimestamp,
  getBatch,
  getBatchCount,
  getBatchesByStage,
  getRecentBatches,
  getStage,
  getStageStats,
  shortAddr
});
