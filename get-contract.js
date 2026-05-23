require('dotenv').config();
const { initiateSmartContractPlatformClient } = require('@circle-fin/smart-contract-platform');

const circleContractSdk = initiateSmartContractPlatformClient({
  apiKey: process.env.CIRCLE_API_KEY,
  entitySecret: process.env.CIRCLE_ENTITY_SECRET,
});

async function main() {
  if (!process.env.CONTRACT_ID) {
    console.error("❌ Set CONTRACT_ID di .env terlebih dahulu!");
    process.exit(1);
  }

  try {
    const contractResponse = await circleContractSdk.getContract({
      id: process.env.CONTRACT_ID,
    });

    console.log("✅ Contract Info:");
    console.log(JSON.stringify(contractResponse.data, null, 2));
  } catch (error) {
    console.error("❌ Failed to get contract info:", error);
  }
}

main();