import { ethers } from 'hardhat';
import { EthersAdapter, SafeFactory, SafeAccountConfig } from '@safe-global/protocol-kit';
import dotenv from 'dotenv';
dotenv.config();

async function main() {
    const network = await ethers.provider.getNetwork();
    const accounts = await ethers.getSigners();

    const owner1Address = await accounts[0].getAddress();

    // Initialize signers
    const ethAdapterOwner1 = new EthersAdapter({
        ethers,
        signerOrProvider: accounts[0]
    });

    console.log(`Deploying to network: ${network.name} (${network.chainId})`);
    console.log(`Owner 1 address: ${owner1Address}`);

    const safeFactory = await SafeFactory.create({ ethAdapter: ethAdapterOwner1 });

    const safeAccountConfig: SafeAccountConfig = {
        owners: [
            owner1Address
        ],
        threshold: 1
    };

    const safeSdkOwner1 = await safeFactory.deploySafe({ safeAccountConfig });
    const safeAddress = await safeSdkOwner1.getAddress();

    console.log('Your Safe has been deployed:');
    console.log(`${safeAddress}`);
};

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
