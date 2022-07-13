import { ethers } from "ethers";
import { get, includes } from "lodash";

import { contractsCreator } from "../contracts/socialToken";
import { updateDB } from "../utils/updateDB";
import {
  USDC_CONTRACT,
  USDC_DECIMALS,
  SOCIAL_TOKEN_DECIMALS,
  SOCIAL_TOKENS_ADDRESSES,
} from "../utils/constants";

export const usdcListener = async () => {
  const provider = new ethers.providers.WebSocketProvider(
    `wss://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
  );
  const contract = new ethers.Contract(
    USDC_CONTRACT.address,
    USDC_CONTRACT.abi,
    provider
  );

  const contracts = await contractsCreator();
  let transactionIndex = -1;
  contract.on("Transfer", async (from, to, value, data) => {
    console.info("Transfer...");
    if (transactionIndex !== data.transactionIndex) {
      transactionIndex = data.transactionIndex;
    
      const contractAddress = includes(SOCIAL_TOKENS_ADDRESSES, from)
        ? from
        : to;
      const userAddress = includes(SOCIAL_TOKENS_ADDRESSES, from) ? to : from;
      const contract = get(contracts, contractAddress);

      try {
        const price = await contract.getMintPrice(
          ethers.utils.parseUnits("1", SOCIAL_TOKEN_DECIMALS)
        );
        const current_price = ethers.utils.formatUnits(price, USDC_DECIMALS);
        const created_at = new Date();

        let balance = await contract.balanceOf(userAddress);

        balance = ethers.utils.formatUnits(balance, SOCIAL_TOKEN_DECIMALS);

        await updateDB({
          social_token_id: contractAddress,
          price_history: { current_price, created_at },
          address: userAddress,
          balance,
        });
      } catch (error) {
        console.error(error);
      }
    }
  });
};
