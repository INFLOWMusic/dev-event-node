import { ethers } from "ethers";

import {
  SOCIAL_TOKENS_ADDRESSES,
  SOCIAL_TOKEN_DECIMALS,
  USDC_CONTRACT,
  USDC_DECIMALS,
} from "../utils/constants";
import { contractsCreator } from "../contracts/socialToken";
import { get, includes } from "lodash";

import { updatePrice } from "../utils/updatePrice";

export const usdcListener = async () => {
  const provider = new ethers.providers.WebSocketProvider(
    "wss://rinkeby.infura.io/ws/v3/6c355ab4385549299505dc40e02951f1",
    { name: "rinkeby", chainId: 4 }
  );

  const contract = new ethers.Contract(
    USDC_CONTRACT.address,
    USDC_CONTRACT.abi,
    provider
  );

  console.info(Date.now());

  const contracts = await contractsCreator();
  let transactionIndex = -1;
  contract.on("Transfer", async (from, to, value, data) => {
    console.info("Transfer...");
    if (transactionIndex !== data.transactionIndex) {
      transactionIndex = data.transactionIndex;
      console.log({ from, to, value });
      console.log({ data });
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

        const res = await updatePrice({
          social_token_id: contractAddress,
          price_history: { current_price, created_at },
          address: userAddress,
          balance,
        });

        console.info({ current_price });
        console.info({ res });
      } catch (error) {
        console.error(error);
      }
    }
  });
};
