require('dotenv').config();
const { initiateSmartContractPlatformClient } = require('@circle-fin/smart-contract-platform');
const { v4: uuidv4 } = require('uuid'); // untuk idempotencyKey

const circleContractSdk = initiateSmartContractPlatformClient({
  apiKey: process.env.CIRCLE_API_KEY,
  entitySecret: process.env.CIRCLE_ENTITY_SECRET,
});

async function main() {
  try {
    const response = await circleContractSdk.deployContractTemplate({
      id: "aea21da6-0aa2-4971-9a1a-5098842b1248", // ERC-1155 template
      blockchain: "ARC-TESTNET",
      name: "MyMultiTokenContract",
      walletId: process.env.WALLET_ID,
      idempotencyKey: uuidv4(),
      templateParameters: {
        name: "MyMultiToken",
        symbol: "MMTK",
        defaultAdmin: process.env.WALLET_ADDRESS,
        primarySaleRecipient: process.env.WALLET_ADDRESS,
        royaltyRecipient: process.env.WALLET_ADDRESS,
        royaltyPercent: 0.01
      },
      fee: {
        type: "level",
        config: { feeLevel: "MEDIUM" }
      }
    });

    console.log("✅ ERC-1155 Deployment initiated:");
    console.log(JSON.stringify(response.data, null, 2));
    console.log("Simpan transactionId di .env sebagai TRANSACTION_ID untuk langkah selanjutnya.");
  } catch (error) {
    console.error("❌ Deployment failed:", error);
  }
}

main();