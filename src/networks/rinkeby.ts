import { ethers } from "ethers";

export default (isRinkeby: boolean) => {
  if (!isRinkeby) return null;
  const USDC_CONTRACT_ADDRESS = "0x63aF7615e795F2cFb8A2f93aFAd7CD1B4d35bA5c";

  const SOCIAL_TOKENS_ADDRESSES = [
    "0x343B81a96a178CECC492d5A942962Ca032151A96",
    "0x03EA90039CDd4b3Aed814c8Faab35Fd2F99d0b0d",
    "0x527145f5d5593b620d4fB32B9a00431f743c76bC",
  ];

  const provider = new ethers.providers.JsonRpcProvider(
    "https://rinkeby.infura.io/v3/6c355ab4385549299505dc40e02951f1"
  );

  return { USDC_CONTRACT_ADDRESS, SOCIAL_TOKENS_ADDRESSES, provider };
};
