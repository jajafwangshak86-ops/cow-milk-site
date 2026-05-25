import {
  getBatchCount, getBatch, getRecentBatches, getStage,
  getBatchesByStage, getStageStats,
  formatCelo, shortAddr, celoScanAddr, celoScanTx, celoScanBatch,
  formatTimestamp, STAGES,
} from "../src/index";

// Mock viem
jest.mock("viem", () => ({
  createPublicClient: jest.fn(() => ({ readContract: mockReadContract })),
  http: jest.fn(),
  parseAbi: jest.fn((abi) => abi),
  formatEther: jest.fn((wei: bigint) => (Number(wei) / 1e18).toString()),
}));
jest.mock("viem/chains", () => ({ celo: { id: 42220 } }));

const mockReadContract = jest.fn();

const BATCH_TUPLE = [
  1n, "Milk", 100n, 1000000000000000n,
  "0x" + "a".repeat(40),
  "0x" + "0".repeat(40),
  "0x" + "0".repeat(40),
  "0x" + "0".repeat(40),
  "0x" + "0".repeat(40),
  0, // stage = Farmed
  1700000000n, 1700000000n,
] as const;

beforeEach(() => mockReadContract.mockReset());

describe("getBatchCount", () => {
  it("returns count", async () => {
    mockReadContract.mockResolvedValueOnce(5n);
    expect(await getBatchCount()).toBe(5);
  });
});

describe("getBatch", () => {
  it("decodes a batch", async () => {
    mockReadContract.mockResolvedValueOnce(BATCH_TUPLE);
    const b = await getBatch(1);
    expect(b.id).toBe(1);
    expect(b.productName).toBe("Milk");
    expect(b.stage).toBe("Farmed");
    expect(b.quantity).toBe(100);
  });
});

describe("getStage", () => {
  it("returns correct stage", async () => {
    mockReadContract.mockResolvedValueOnce(2);
    expect(await getStage(1)).toBe("Distributed");
  });
  it("defaults to Farmed for out-of-range", async () => {
    mockReadContract.mockResolvedValueOnce(99);
    expect(await getStage(1)).toBe("Farmed");
  });
});

describe("getBatchesByStage", () => {
  it("filters by stage", async () => {
    mockReadContract.mockResolvedValueOnce(1n);
    mockReadContract.mockResolvedValueOnce(BATCH_TUPLE);
    expect(await getBatchesByStage("Farmed")).toHaveLength(1);
  });
  it("returns empty when no match", async () => {
    mockReadContract.mockResolvedValueOnce(1n);
    mockReadContract.mockResolvedValueOnce(BATCH_TUPLE);
    expect(await getBatchesByStage("Sold")).toHaveLength(0);
  });
});

describe("getStageStats", () => {
  it("counts per stage", async () => {
    mockReadContract.mockResolvedValueOnce(1n);
    mockReadContract.mockResolvedValueOnce(BATCH_TUPLE);
    const stats = await getStageStats();
    expect(stats.Farmed).toBe(1);
    expect(stats.Sold).toBe(0);
  });
});

describe("getRecentBatches", () => {
  it("returns n batches", async () => {
    mockReadContract.mockResolvedValueOnce(2n);
    mockReadContract.mockResolvedValueOnce(BATCH_TUPLE);
    mockReadContract.mockResolvedValueOnce(BATCH_TUPLE);
    expect(await getRecentBatches(2)).toHaveLength(2);
  });
});

describe("formatCelo", () => {
  it("formats wei", () => {
    expect(formatCelo("1000000000000000000")).toBe("1.0000 CELO");
  });
  it("handles invalid", () => {
    expect(formatCelo("bad")).toBe("0.0000 CELO");
  });
});

describe("shortAddr", () => {
  it("shortens address", () => {
    expect(shortAddr("0x1234567890abcdef1234567890abcdef12345678")).toBe("0x1234…5678");
  });
  it("returns dash for zero", () => {
    expect(shortAddr("0x" + "0".repeat(40))).toBe("—");
  });
});

describe("celoScanAddr", () => {
  it("returns URL", () => {
    expect(celoScanAddr("0xabc")).toBe("https://celoscan.io/address/0xabc");
  });
});

describe("celoScanTx", () => {
  it("returns tx URL", () => {
    expect(celoScanTx("0xdeadbeef")).toBe("https://celoscan.io/tx/0xdeadbeef");
  });
});

describe("celoScanBatch", () => {
  it("returns batch URL", () => {
    expect(celoScanBatch(5)).toContain("?a=5");
  });
});

describe("formatTimestamp", () => {
  it("formats timestamp", () => {
    expect(formatTimestamp(1700000000)).toMatch(/\d{4}/);
  });
  it("returns dash for zero", () => {
    expect(formatTimestamp(0)).toBe("—");
  });
});

describe("STAGES", () => {
  it("has 5 stages", () => {
    expect(STAGES).toEqual(["Farmed", "Processed", "Distributed", "OnSale", "Sold"]);
  });
});
