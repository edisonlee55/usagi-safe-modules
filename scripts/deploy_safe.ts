import { ethers } from 'hardhat';
import { EthersAdapter, ContractNetworksConfig, SafeFactory, SafeAccountConfig, DEFAULT_SAFE_VERSION } from '@safe-global/protocol-kit';
import { randomBytes } from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

async function main() {
    const network = await ethers.provider.getNetwork();
    const accounts = await ethers.getSigners();

    const ethAdapterOwner1 = new EthersAdapter({
        ethers,
        signerOrProvider: accounts[0]
    });
    const owner1Address = await ethAdapterOwner1.getSignerAddress();

    const safeVersion = process.env.SAFE_VERSION || DEFAULT_SAFE_VERSION;
    console.log(`Deploying Safe ${safeVersion} to network: ${network.name} (${network.chainId})`);
    console.log(`Owner 1 address: ${owner1Address}`);

    let safeFactory;
    if (process.env.USE_SAFE_DEPLOYMENTS === "false") {
        const contractNetworks: ContractNetworksConfig = {
            [network.chainId]: {
                safeSingletonAddress: process.env.SAFE_SINGLETON_ADDRESS,
                safeProxyFactoryAddress: process.env.SAFE_PROXY_FACTORY_ADDRESS,
                multiSendAddress: process.env.MULTI_SEND_ADDRESS,
                multiSendCallOnlyAddress: process.env.MULTI_SEND_CALL_ONLY_ADDRESS,
                fallbackHandlerAddress: process.env.FALLBACK_HANDLER_ADDRESS,
                signMessageLibAddress: process.env.SIGN_MESSAGE_LIB_ADDRESS,
                createCallAddress: process.env.CREATE_CALL_ADDRESS,
                simulateTxAccessorAddress: process.env.SIMULATE_TX_ACCESSOR_ADDRESS
            }
        };

        safeFactory = await SafeFactory.create({ ethAdapter: ethAdapterOwner1, contractNetworks, safeVersion });
    } else {
        // Only support networks that are added to https://github.com/safe-global/safe-deployments
        safeFactory = await SafeFactory.create({ ethAdapter: ethAdapterOwner1, safeVersion });
    }

    const safeAccountConfig: SafeAccountConfig = {
        owners: [
            owner1Address!
        ],
        threshold: 1
    };

    let safeSdkOwner1;
    if (process.env.USE_RANDOM_SALT_NONCE === "false") {
        safeSdkOwner1 = await safeFactory.deploySafe({ safeAccountConfig });
    } else {
        const saltNonce = `0x${randomBytes(32).toString('hex')}`;
        console.log(`Using random saltNonce for Safe deployment: ${saltNonce}`);
        safeSdkOwner1 = await safeFactory.deploySafe({ safeAccountConfig, saltNonce });
    }

    const safeAddress = await safeSdkOwner1.getAddress();
    console.log('Your Safe has been deployed:');
    console.log(`${safeAddress}`);
};

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
