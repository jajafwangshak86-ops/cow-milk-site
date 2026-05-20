export const pad32 = (hex: string) => hex.replace("0x", "").padStart(64, "0");
export const encUint = (n: number | bigint) => pad32(BigInt(n).toString(16));

export function decodeUint(raw: string, slot: number): bigint {
  const start = slot * 64;
  if (start + 64 > raw.length) return 0n;
  return BigInt("0x" + raw.slice(start, start + 64));
}

export function decodeAddr(raw: string, slot: number): string {
  const start = slot * 64;
  if (start + 64 > raw.length) return "0x" + "0".repeat(40);
  return "0x" + raw.slice(start + 24, start + 64);
}

export function decodeString(raw: string, slotOffset: number): string {
  try {
    const dynOffset = Number(decodeUint(raw, slotOffset)) * 2;
    const len = Number(BigInt("0x" + raw.slice(dynOffset, dynOffset + 64)));
    return Buffer.from(raw.slice(dynOffset + 64, dynOffset + 64 + len * 2), "hex").toString("utf8");
  } catch {
    return "";
  }
}
