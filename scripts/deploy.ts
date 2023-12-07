import { ethers } from "hardhat";
import dotenv from 'dotenv';
dotenv.config();

async function main() {
  const network = await ethers.provider.getNetwork();
  const accounts = await ethers.getSigners();

  const ownerAddress = await accounts[0].getAddress();
  const safeAddress = process.env.SAFE_ADDRESS;

  console.log(`Deploying to network: ${network.name} (${network.chainId})`);
  console.log(`Owner address: ${ownerAddress}`);
  console.log(`Safe address: ${safeAddress}`);

  const council = await ethers.deployContract("Council", [ownerAddress, safeAddress]);

  await council.waitForDeployment();
  console.log(`Council deployed to: ${council.target}`);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
