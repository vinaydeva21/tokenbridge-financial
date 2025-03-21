
export const CONTRACT_ADDRESSES = {
  // Update these addresses when you deploy your contracts
  TOKEN: '0x0000000000000000000000000000000000000000', // Token288 address
  STAKING: '0x0000000000000000000000000000000000000000', // Staking288 address
  VESTING: '0x0000000000000000000000000000000000000000', // Vesting288 address
  REVENUE: '0x0000000000000000000000000000000000000000', // RevenueDistributor address
};

// Update these ABIs with your compiled contract ABIs after deployment
export const CONTRACT_ABIS = {
  TOKEN: [
    // ERC20 interface functions
    'function balanceOf(address owner) view returns (uint256)',
    'function transfer(address to, uint256 amount) returns (bool)',
    'function approve(address spender, uint256 amount) returns (bool)',
    'function allowance(address owner, address spender) view returns (uint256)',
    'event Transfer(address indexed from, address indexed to, uint256 value)',
  ],
  STAKING: [
    'function stake(uint256 amount) external',
    'function unstake() external',
    'function claimRewards() external',
    'function calculateRewards(address user) external view returns (uint256)',
    'function stakes(address) view returns (uint256 amount, uint256 startTime, uint256 lastClaim)',
  ],
  VESTING: [
    'function claim() external',
    'function getClaimable(address user) external view returns (uint256)',
    'function vestings(address) view returns (uint256 totalAmount, uint256 startTime, uint256 cliff, uint256 duration, uint256 claimed)',
  ],
  REVENUE: [
    'function claimRevenue() external',
    'function getClaimable(address user) external view returns (uint256)',
    'function userShares(address) view returns (uint256)',
    'function totalRevenue() view returns (uint256)',
  ],
};
