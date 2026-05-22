import { getBatchCount, getBatch, getRecentBatches, formatCelo, shortAddr, STAGES } from "../src/index";

// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch as unknown as typeof fetch;

function rpcOk(result: string) {
  mockFetch.mockResolvedValueOnce({
    json: async () => ({ jsonrpc: "2.0", id: 1, result }),
  });
}

describe("getBatchCount", () => {
  it("decodes count from hex", async () => {
    rpcOk("0x" + "0".repeat(63) + "5"); // 5
    expect(await getBatchCount()).toBe(5);
  });
});

describe("getBatch", () => {
  it("decodes a batch struct", async () => {
    // Minimal raw ABI-encoded response for id=1, productName="Milk", qty=100, price=1e15
    // We test the shape, not exact bytes — use a real hex from the chain fixture
    const raw =
      "0000000000000000000000000000000000000000000000000000000000000001" + // id=1
      "0000000000000000000000000000000000000000000000000000000000000160" + // productName offset=352 (0xb*32=352? let's use 0x160=352)
      "0000000000000000000000000000000000000000000000000000000000000064" + // qty=100
      "00000000000000000000000000000000000000000000000000038d7ea4c68000" + // price=1e15
      "000000000000000000000000" + "a".repeat(40) +                        // farmer
      "0000000000000000000000000000000000000000000000000000000000000000" + // processor (zero)
      "0000000000000000000000000000000000000000000000000000000000000000" + // distributor
      "0000000000000000000000000000000000000000000000000000000000000000" + // retailer
      "0000000000000000000000000000000000000000000000000000000000000000" + // buyer
      "0000000000000000000000000000000000000000000000000000000000000000" + // stage=0 (Farmed)
      "0000000000000000000000000000000000000000000000000000000067890000" + // createdAt
      "0000000000000000000000000000000000000000000000000000000067890000" + // updatedAt
      // padding to reach offset 0x160 = slot 11 (11*64=704 chars from start)
      "0000000000000000000000000000000000000000000000000000000000000000" + // slot 12 padding
      "0000000000000000000000000000000000000000000000000000000000000004" + // string length=4
      "4d696c6b00000000000000000000000000000000000000000000000000000000"; // "Milk"

    rpcOk("0x" + raw);
    const batch = await getBatch(1);
    expect(batch.id).toBe(1);
    expect(batch.quantity).toBe(100);
    expect(batch.stage).toBe("Farmed");
    expect(batch.pricePerUnit).toBe("1000000000000000");
  });
});

describe("formatCelo", () => {
  it("formats wei to CELO", () => {
    expect(formatCelo("1000000000000000000")).toBe("1.0000 CELO");
    expect(formatCelo("500000000000000000")).toBe("0.5000 CELO");
  });
  it("handles invalid input", () => {
    expect(formatCelo("bad")).toBe("0.0000 CELO");
  });
});

describe("shortAddr", () => {
  it("shortens an address", () => {
    expect(shortAddr("0x1234567890abcdef1234567890abcdef12345678")).toBe("0x1234…5678");
  });
  it("returns dash for zero address", () => {
    expect(shortAddr("0x" + "0".repeat(40))).toBe("—");
  });
});

describe("STAGES", () => {
  it("has 5 stages in order", () => {
    expect(STAGES).toEqual(["Farmed", "Processed", "Distributed", "OnSale", "Sold"]);
  });
});
