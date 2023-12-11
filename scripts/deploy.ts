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

  const council = await ethers.deployContract("Council", [ownerAddress, safeAddress], {
    deterministicDeployment: process.env.DETERMINISTIC_DEPLOYMENT || false
  });

  await council.waitForDeployment();
  console.log(`Council deployed to: ${council.target}`);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
