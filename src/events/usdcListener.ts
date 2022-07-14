import { get } from "lodash";
import { ethers } from "ethers";

import { contractsCreator } from "../contracts/socialToken";
import { updateDB } from "../utils/updateDB";
import {
  NULL_ADDRESS,
  USDC_DECIMALS,
  SOCIAL_TOKEN_DECIMALS,
  SOCIAL_TOKENS_ADDRESSES,
  SOCIAL_CONTRACT_ABI,
} from "../utils/constants";
import networks from "../networks";

export const usdcListener = async () => {
  const provider = networks.provider;

  const contract = new ethers.Contract(
    SOCIAL_TOKENS_ADDRESSES[0],
    SOCIAL_CONTRACT_ABI,
    provider
  );

  const contracts = await contractsCreator();
  let transactionIndex = -1;
  contract.on("Transfer", async (from, to, value, data) => {
    console.info("Transfer...");
    if (transactionIndex !== data.transactionIndex) {
      transactionIndex = data.transactionIndex;

      const contractAddress = SOCIAL_TOKENS_ADDRESSES[0];
      const userAddress = from === NULL_ADDRESS ? to : from;
      const contract = get(contracts, contractAddress);

      console.info({ userAddress, contractAddress });

      try {
        const price = await contract.getMintPrice(
          ethers.utils.parseUnits("1", SOCIAL_TOKEN_DECIMALS)
        );
        const current_price = ethers.utils.formatUnits(price, USDC_DECIMALS);
        const created_at = new Date();

        let balance = await contract.balanceOf(userAddress);

        balance = ethers.utils.formatUnits(balance, SOCIAL_TOKEN_DECIMALS);

        const response = await updateDB({
          social_token_id: contractAddress,
          price_history: { current_price, created_at },
          address: userAddress,
          balance,
        });
        console.info({ response });
      } catch (error) {
        console.error(error);
      }
    }
  });
};
