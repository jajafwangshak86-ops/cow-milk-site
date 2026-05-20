export const pad32 = (hex: string) => hex.replace("0x", "").padStart(64, "0");
export const encUint = (n: number | bigint) => pad32(BigInt(n).toString(16));

export function decodeUint(raw: string, slot: number): bigint {
  return BigInt("0x" + raw.slice(slot * 64, slot * 64 + 64));
}

export function decodeAddr(raw: string, slot: number): string {
  return "0x" + raw.slice(slot * 64 + 24, slot * 64 + 64);
}

export function decodeString(raw: string, slotOffset: number): string {
  const dynOffset = Number(decodeUint(raw, slotOffset)) * 2;
  const len = Number(BigInt("0x" + raw.slice(dynOffset, dynOffset + 64)));
  return Buffer.from(raw.slice(dynOffset + 64, dynOffset + 64 + len * 2), "hex").toString("utf8");
}
