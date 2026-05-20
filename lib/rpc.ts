import { CELO_RPC } from "./constants";

export async function rpcCall(method: string, params: unknown[] = []): Promise<string> {
  const res = await fetch(CELO_RPC, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
    next: { revalidate: 30 },
  });
  const json = await res.json();
  if (json.error) throw new Error(`RPC ${method}: ${json.error.message}`);
  return json.result as string;
}
