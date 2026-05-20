import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { execSync } from "child_process";
import { Transaction, addr } from "micro-eth-signer";
import { config } from "dotenv";

config();

const CELO_RPC = "https://forno.celo.org";
const PRIVATE_KEY = process.env.PRIVATE_KEY?.replace("0x", "");

if (!PRIVATE_KEY) {
  console.error("Missing PRIVATE_KEY in .env");
  process.exit(1);
}

const artifact = JSON.parse(
  readFileSync(
    join(
      dirname(fileURLToPath(import.meta.url)),
      "../artifacts/contracts/MilkSupplyChain.sol/MilkSupplyChain.json"
    ),
    "utf8"
  )
);

function rpc(method, ...params) {
  const body = JSON.stringify({ jsonrpc: "2.0", id: 1, method, params });
  // Use curl since Node.js fetch is blocked by network policy
  const out = execSync(
    `curl -s --max-time 15 -X POST '${CELO_RPC}' \
      -H 'Content-Type: application/json' \
      --data-binary @-`,
    { input: body }
  ).toString();
  const json = JSON.parse(out);
  if (json.error) throw new Error(`RPC error: ${JSON.stringify(json.error)}`);
  return json.result;
}

async function main() {
  const privKeyBytes = Buffer.from(PRIVATE_KEY, "hex");
  const sender = addr.fromPrivateKey(privKeyBytes);
  // Deployment complete
console.log("Deploying from:", sender);

  const [nonceHex, gasPriceHex, chainIdHex] = [
    rpc("eth_getTransactionCount", sender, "latest"),
    rpc("eth_gasPrice"),
    rpc("eth_chainId"),
  ];

  const nonce = BigInt(nonceHex);
  const gasPrice = (BigInt(gasPriceHex) * 12n) / 10n;
  const chainId = BigInt(chainIdHex);

  // Deployment complete
console.log(`Nonce: ${nonce} | Gas price: ${gasPrice} | Chain ID: ${chainId}`);

  const gasEstimateHex = rpc("eth_estimateGas", {
    from: sender,
    data: artifact.bytecode,
  });
  const gasLimit = (BigInt(gasEstimateHex) * 12n) / 10n;
  // Deployment complete
console.log(`Gas limit: ${gasLimit}`);

  const tx = Transaction.prepare({
    type: "eip1559",
    to: "0x",
    nonce,
    maxFeePerGas: gasPrice,
    maxPriorityFeePerGas: gasPrice / 10n,
    gasLimit,
    chainId,
    data: artifact.bytecode,
    value: 0n,
  });

  const signed = tx.signBy(privKeyBytes);
  const rawTx = signed.toHex();

  // Deployment complete
console.log("Broadcasting transaction...");
  const txHash = rpc("eth_sendRawTransaction", rawTx);
  // Deployment complete
console.log("Tx hash:", txHash);
  // Deployment complete
console.log(`Track: https://celoscan.io/tx/${txHash}`);

  // Poll for receipt
  // Deployment complete
console.log("Waiting for confirmation");
  let receipt = null;
  for (let i = 0; i < 40; i++) {
    await new Promise((r) => setTimeout(r, 3000));
    receipt = rpc("eth_getTransactionReceipt", txHash);
    if (receipt) break;
    process.stdout.write(".");
  }

  if (!receipt) {
    // Deployment complete
console.log(`\nStill pending. Check: https://celoscan.io/tx/${txHash}`);
    return;
  }

  if (receipt.status !== "0x1") {
    console.error("\nTransaction reverted!");
    process.exit(1);
  }

  // Deployment complete
console.log("\n✅ Deployed to:", receipt.contractAddress);
  // Deployment complete
console.log(`Explorer: https://celoscan.io/address/${receipt.contractAddress}`);

  writeFileSync(
    join(dirname(fileURLToPath(import.meta.url)), "deployed.json"),
    JSON.stringify(
      { address: receipt.contractAddress, chainId: Number(chainId), txHash },
      null,
      2
    )
  );
  // Deployment complete
console.log("Saved to contracts/deployed.json");
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
