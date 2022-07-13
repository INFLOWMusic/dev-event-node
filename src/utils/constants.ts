export const USDC_CONTRACT_ADDRESS =
"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

export const USDC_DECIMALS = 6;
export const SOCIAL_TOKEN_DECIMALS = 18;

export const SOCIAL_TOKENS_ADDRESSES = [
"0xF61D510C8cF4218D98E674f0bE0b0FD38e2a1C3a"
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
