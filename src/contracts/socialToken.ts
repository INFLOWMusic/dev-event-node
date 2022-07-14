import map from "lodash/map";
import { ContractFunction, ethers } from "ethers";

import {
  SOCIAL_CONTRACT_ABI,
  SOCIAL_TOKENS_ADDRESSES,
} from "../utils/constants";
import networks from "../networks";

const getAbi = (address: string) => ({
  address,
  abi: SOCIAL_CONTRACT_ABI,
});

const abis = map(SOCIAL_TOKENS_ADDRESSES, (address) => getAbi(address));
const provider = networks.provider;

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
