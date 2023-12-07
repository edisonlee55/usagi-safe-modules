import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from 'dotenv';
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.22",
  networks: {
    base_goerli: {
      url: `https://goerli.base.org`,
      accounts: [process.env.BASE_GOERLI_PRIVATE_KEY!]
    }
  }
};

export default config;
