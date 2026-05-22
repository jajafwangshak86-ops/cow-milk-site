import { formatCelo, formatDate, shortAddr, isZeroAddr, formatQuantity } from "../lib/format";

describe("formatCelo", () => {
  it("converts wei to CELO", () => {
    expect(formatCelo("1000000000000000000")).toBe("1.0000 CELO");
    expect(formatCelo("500000000000000000")).toBe("0.5000 CELO");
  });
  it("handles invalid input gracefully", () => {
    expect(formatCelo("not-a-number")).toBe("0.0000 CELO");
    expect(formatCelo("")).toBe("0.0000 CELO");
  });
});

describe("shortAddr", () => {
  it("shortens a valid address", () => {
    expect(shortAddr("0x1234567890abcdef1234567890abcdef12345678")).toBe("0x1234…5678");
  });
  it("returns dash for zero address", () => {
    expect(shortAddr("0x" + "0".repeat(40))).toBe("—");
    expect(shortAddr("")).toBe("—");
  });
});

describe("isZeroAddr", () => {
  it("detects zero address", () => {
    expect(isZeroAddr("0x" + "0".repeat(40))).toBe(true);
    expect(isZeroAddr("")).toBe(true);
  });
  it("returns false for real address", () => {
    expect(isZeroAddr("0x337b04f40036bfb48f22ae58fcf92d2f1f5cc4a8")).toBe(false);
  });
});

describe("formatQuantity", () => {
  it("formats with units", () => {
    expect(formatQuantity(1000)).toBe("1,000 units");
    expect(formatQuantity(50)).toBe("50 units");
  });
});

describe("formatDate", () => {
  it("returns dash for zero timestamp", () => {
    expect(formatDate(0)).toBe("—");
  });
  it("returns a non-empty string for valid timestamp", () => {
    const result = formatDate(1700000000);
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });
});
