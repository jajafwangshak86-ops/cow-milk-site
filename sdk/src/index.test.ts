import {
  getBatchCount, getBatch, getRecentBatches, getStage,
  getBatchesByStage, getStageStats,
  formatCelo, shortAddr, celoScanAddr, celoScanTx, celoScanBatch,
  formatTimestamp, STAGES,
} from "../src/index";

const mockFetch = jest.fn();
global.fetch = mockFetch as unknown as typeof fetch;

function rpcOk(result: string) {
  mockFetch.mockResolvedValueOnce({
    json: async () => ({ jsonrpc: "2.0", id: 1, result }),
  });
}

// Minimal ABI-encoded batch fixture (id=1, productName="Milk", qty=100, price=1e15, stage=0)
const BATCH_RAW =
  "0000000000000000000000000000000000000000000000000000000000000001" +
  "0000000000000000000000000000000000000000000000000000000000000160" +
  "0000000000000000000000000000000000000000000000000000000000000064" +
  "00000000000000000000000000000000000000000000000000038d7ea4c68000" +
  "000000000000000000000000" + "a".repeat(40) +
  "0000000000000000000000000000000000000000000000000000000000000000" +
  "0000000000000000000000000000000000000000000000000000000000000000" +
  "0000000000000000000000000000000000000000000000000000000000000000" +
  "0000000000000000000000000000000000000000000000000000000000000000" +
  "0000000000000000000000000000000000000000000000000000000000000000" +
  "0000000000000000000000000000000000000000000000000000000067890000" +
  "0000000000000000000000000000000000000000000000000000000067890000" +
  "0000000000000000000000000000000000000000000000000000000000000000" +
  "0000000000000000000000000000000000000000000000000000000000000004" +
  "4d696c6b00000000000000000000000000000000000000000000000000000000";

describe("getBatchCount", () => {
  it("decodes count from hex", async () => {
    rpcOk("0x" + "0".repeat(63) + "5");
    expect(await getBatchCount()).toBe(5);
  });
});

describe("getBatch", () => {
  it("decodes a batch struct", async () => {
    rpcOk("0x" + BATCH_RAW);
    const batch = await getBatch(1);
    expect(batch.id).toBe(1);
    expect(batch.quantity).toBe(100);
    expect(batch.stage).toBe("Farmed");
    expect(batch.pricePerUnit).toBe("1000000000000000");
  });
});

describe("getStage", () => {
  it("returns the correct stage for index 2", async () => {
    rpcOk("0x" + "0".repeat(63) + "2");
    expect(await getStage(1)).toBe("Distributed");
  });

  it("defaults to Farmed for out-of-range index", async () => {
    rpcOk("0x" + "0".repeat(63) + "9");
    expect(await getStage(1)).toBe("Farmed");
  });
});

describe("getBatchesByStage", () => {
  it("filters batches by stage", async () => {
    // count = 1
    rpcOk("0x" + "0".repeat(63) + "1");
    // batch 1 = Farmed
    rpcOk("0x" + BATCH_RAW);
    const result = await getBatchesByStage("Farmed");
    expect(result).toHaveLength(1);
    expect(result[0].stage).toBe("Farmed");
  });

  it("returns empty array when no batches match", async () => {
    rpcOk("0x" + "0".repeat(63) + "1");
    rpcOk("0x" + BATCH_RAW);
    const result = await getBatchesByStage("Sold");
    expect(result).toHaveLength(0);
  });
});

describe("getStageStats", () => {
  it("returns correct counts per stage", async () => {
    rpcOk("0x" + "0".repeat(63) + "1");
    rpcOk("0x" + BATCH_RAW); // stage = Farmed
    const stats = await getStageStats();
    expect(stats.Farmed).toBe(1);
    expect(stats.Sold).toBe(0);
  });
});

describe("getRecentBatches", () => {
  it("returns at most n batches", async () => {
    rpcOk("0x" + "0".repeat(63) + "2"); // count = 2
    rpcOk("0x" + BATCH_RAW);
    rpcOk("0x" + BATCH_RAW);
    const batches = await getRecentBatches(2);
    expect(batches).toHaveLength(2);
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

describe("celoScanAddr", () => {
  it("returns correct URL", () => {
    expect(celoScanAddr("0xabc")).toBe("https://celoscan.io/address/0xabc");
  });
});

describe("celoScanTx", () => {
  it("returns correct tx URL", () => {
    expect(celoScanTx("0xdeadbeef")).toBe("https://celoscan.io/tx/0xdeadbeef");
  });
});

describe("celoScanBatch", () => {
  it("returns correct batch URL", () => {
    const url = celoScanBatch(5);
    expect(url).toContain("celoscan.io/address/");
    expect(url).toContain("?a=5");
  });
});

describe("formatTimestamp", () => {
  it("formats a unix timestamp", () => {
    const result = formatTimestamp(1700000000);
    expect(result).toMatch(/\d{4}/); // contains a year
  });
  it("returns dash for zero", () => {
    expect(formatTimestamp(0)).toBe("—");
  });
});

describe("STAGES", () => {
  it("has 5 stages in order", () => {
    expect(STAGES).toEqual(["Farmed", "Processed", "Distributed", "OnSale", "Sold"]);
  });
});
