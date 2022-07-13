import map from "lodash/map";
import { Contract, ContractFunction, ethers } from "ethers";

import {
  USDC_DECIMALS,
  SOCIAL_CONTRACT_ABI,
  USDC_CONTRACT_ADDRESS,
  SOCIAL_TOKEN_DECIMALS,
  SOCIAL_TOKENS_ADDRESSES,
} from "../utils/constants";

const getAbi = (address: string) => ({
  address,
  abi: SOCIAL_CONTRACT_ABI,
});

const abis = map(SOCIAL_TOKENS_ADDRESSES, (address) => getAbi(address));
  const provider = new ethers.providers.WebSocketProvider(
    `wss://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
  );

const getContract = async (social: { address: string; abi: string[] }) => {
  const socialContract = new ethers.Contract(
    social.address,
    social.abi,
    provider
  );
  return socialContract;
};

export const contractsCreator = async () => {
  let contracts: { [key: string]: ContractFunction | any } = {};
  for (const social of abis) {
    const socialContract = await getContract(social);
    contracts = { ...contracts, [social.address]: socialContract };
    // if (socialContract) {
    //   let totalPrice = await socialContract.getMintPrice(
    //     ethers.utils.parseUnits(balance, SOCIAL_TOKEN_DECIMALS)
    //   );

    //   totalPrice = ethers.utils.formatUnits(totalPrice, USDC_DECIMALS);
    // }
  }
  return contracts;
};
