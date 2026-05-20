import { CELO_RPC } from "./constants";

export class RpcError extends Error {
  constructor(method: string, message: string) {
    super(`RPC ${method}: ${message}`);
    this.name = "RpcError";
  }
}

export async function rpcCall(
  method: string,
  params: unknown[] = [],
  timeoutMs = 15_000
): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  let res: Response;
  try {
    res = await fetch(CELO_RPC, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
      signal: controller.signal,
      next: { revalidate: 30 },
    });
  } catch (e: unknown) {
    const msg = (e instanceof Error && e.name === "AbortError") ? "Request timed out" : "Network request failed";
    throw new RpcError(method, msg);
  } finally {
    clearTimeout(timer);
  }

  if (!res.ok) throw new RpcError(method, `HTTP ${res.status}`);
  const json = await res.json();
  if (json.error) throw new RpcError(method, json.error.message ?? JSON.stringify(json.error));
  return json.result as string;
}
