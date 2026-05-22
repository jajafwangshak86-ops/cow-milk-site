import { decodeUint, decodeAddr, decodeString, encUint, pad32 } from "../lib/decode";

describe("pad32", () => {
  it("pads to 64 hex chars", () => {
    expect(pad32("0x1")).toBe("0".repeat(63) + "1");
    expect(pad32("ff")).toBe("0".repeat(62) + "ff");
  });
});

describe("encUint", () => {
  it("encodes numbers", () => {
    expect(encUint(1)).toBe("0".repeat(63) + "1");
    expect(encUint(255)).toBe("0".repeat(62) + "ff");
  });
  it("encodes bigints", () => {
    expect(encUint(BigInt("1000000000000000000"))).toBe(
      "0000000000000000000000000000000000000000000000000de0b6b3a7640000"
    );
  });
});

describe("decodeUint", () => {
  it("reads a slot from raw hex", () => {
    const raw = "0".repeat(63) + "5" + "0".repeat(63) + "a";
    expect(decodeUint(raw, 0)).toBe(5n);
    expect(decodeUint(raw, 1)).toBe(10n);
  });
  it("returns 0n for out-of-bounds slot", () => {
    expect(decodeUint("", 0)).toBe(0n);
  });
});

describe("decodeAddr", () => {
  it("extracts address from slot", () => {
    const addr = "337b04f40036bfb48f22ae58fcf92d2f1f5cc4a8";
    const raw = "0".repeat(24) + addr;
    expect(decodeAddr(raw, 0)).toBe("0x" + addr);
  });
});
