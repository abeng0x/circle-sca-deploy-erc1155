require('dotenv').config();
const { initiateDeveloperControlledWalletsClient } = require('@circle-fin/developer-controlled-wallets');

const circleDeveloperSdk = initiateDeveloperControlledWalletsClient({
  apiKey: process.env.CIRCLE_API_KEY,
  entitySecret: process.env.CIRCLE_ENTITY_SECRET,
});

async function main() {
  if (!process.env.TRANSACTION_ID) {
    console.error("❌ Set TRANSACTION_ID di .env terlebih dahulu!");
    process.exit(1);
  }

  try {
    const transactionResponse = await circleDeveloperSdk.getTransaction({
      id: process.env.TRANSACTION_ID,
    });

    console.log("✅ Transaction Status:");
    console.log(JSON.stringify(transactionResponse.data, null, 2));
  } catch (error) {
    console.error("❌ Failed to get transaction status:", error);
  }
}

main();