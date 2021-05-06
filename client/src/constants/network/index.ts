import { ethers } from "ethers";


const common = {
  multicallAddress: "0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441",
  rpcUrl: `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`,
  etherscanApiKey: process.env.REACT_APPE_THERSCAN_API_KEY,
  etherscanTransactionsUrl: "https://etherscan.io/tx",
  etherscanAddresssUrl: "https://etherscan.io/address",
  balancerSubgraphUrl:
    "https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-beta",
  airdropSubgraphUrl:
    "https://api.thegraph.com/subgraphs/name/developerfred/airdrop-graph",
};

export const networkConfig =
  process.env.REACT_APP_NETWORK_ID === "1"
    ? {
        networkId: ethers.providers.getNetwork("homestead").chainId,
        ...common,
      }
    : {
        networkId: ethers.providers.getNetwork("ropsten").chainId,
        ...common,
      };
