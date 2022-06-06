export const USDC_CONTRACT_ADDRESS =
  "0x63aF7615e795F2cFb8A2f93aFAd7CD1B4d35bA5c";

export const USDC_DECIMALS = 6;
export const SOCIAL_TOKEN_DECIMALS = 18;

export const SOCIAL_TOKENS_ADDRESSES = [
  "0x343B81a96a178CECC492d5A942962Ca032151A96",
  "0x03EA90039CDd4b3Aed814c8Faab35Fd2F99d0b0d",
  "0x527145f5d5593b620d4fB32B9a00431f743c76bC",
  // '0xE07324556B9502B72464333AD766aa0AC8Bb3D6E',
];

export const USDC_CONTRACT = {
  address: USDC_CONTRACT_ADDRESS,
  abi: [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "event block()",
    "function gimmeSome() external",
    "function balanceOf(address _owner) public view returns (uint256 balance)",
    "function transfer(address _to, uint256 _value) public returns (bool success)",
    "event Transfer(address indexed from, address indexed to, uint256 value)",
    "function approve(address spender, uint256 amount) public virtual override returns (bool)",
  ],
};

export const SOCIAL_CONTRACT_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "event block()",
  "function balanceOf(address _owner) public view returns (uint256 balance)",
  "function transfer(address _to, uint256 _value) public returns (bool success)",
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "function getMintPrice(uint256 amount) public view override returns (uint256)",
  "function getBurnPrice(uint256 amount) public view override returns (uint256)",
  "function totalSupply() public view virtual override returns (uint256)",
  "function mint(uint256 amount, address collateralAddress) external override nonReentrant",
  "function burn(uint256 amount) external override nonReentrant",
];
