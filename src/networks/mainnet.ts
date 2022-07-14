import { ethers } from "ethers";

export default (isMainnet: boolean) => {
  if (!isMainnet) return null;

  const USDC_CONTRACT_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

  const SOCIAL_TOKENS_ADDRESSES = [
    "0xF61D510C8cF4218D98E674f0bE0b0FD38e2a1C3a",
  ];

  const provider = new ethers.providers.WebSocketProvider(
    `wss://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  );
  return { USDC_CONTRACT_ADDRESS, SOCIAL_TOKENS_ADDRESSES, provider };
};
