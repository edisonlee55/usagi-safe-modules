import { ethers } from 'hardhat';
import dotenv from 'dotenv';
dotenv.config();

async function main() {
  const network = await ethers.provider.getNetwork();
  const accounts = await ethers.getSigners();

  const ownerAddress = await accounts[0].getAddress();
  const safeAddress = process.env.SAFE_ADDRESS || "0x051393250d6d9F580dD62c31bcbbC4030C225E0a";

  console.log(`Deploying to network: ${network.name} (${network.chainId})`);
  console.log(`Owner address: ${ownerAddress}`);
  console.log(`Safe address: ${safeAddress}`);

  const safeGovernance = await ethers.deployContract("SafeGovernance", [safeAddress, ownerAddress], {
    deterministicDeployment: process.env.DETERMINISTIC_DEPLOYMENT || false
  });

  await safeGovernance.waitForDeployment();
  console.log(`SafeGovernance deployed to: ${safeGovernance.target}`);

  const sendModule = await ethers.deployContract("SendModule", [safeAddress, safeGovernance.target], {
    deterministicDeployment: process.env.DETERMINISTIC_DEPLOYMENT || false
  });

  await sendModule.waitForDeployment();
  console.log(`SendModule deployed to: ${sendModule.target}`);

  const ownableSendModule = await ethers.deployContract("OwnableSendModule", [safeAddress, ownerAddress], {
    deterministicDeployment: process.env.DETERMINISTIC_DEPLOYMENT || false
  });

  await ownableSendModule.waitForDeployment();
  console.log(`OwnableSendModule deployed to: ${ownableSendModule.target}`);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
