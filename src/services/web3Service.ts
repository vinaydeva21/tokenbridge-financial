
import { ethers } from 'ethers';
import { CONTRACT_ADDRESSES, CONTRACT_ABIS } from '@/constants/contracts';

// Contract interface types
export interface StakingInfo {
  amount: string;
  startTime: Date;
  lastClaim: Date;
  rewards: string;
}

export interface VestingInfo {
  totalAmount: string;
  startTime: Date;
  cliff: number;
  duration: number;
  claimed: string;
  claimable: string;
}

export interface RevenueInfo {
  share: string;
  claimable: string;
  totalRevenue: string;
}

class Web3Service {
  private provider: ethers.providers.Web3Provider | null = null;
  private signer: ethers.Signer | null = null;
  private tokenContract: ethers.Contract | null = null;
  private stakingContract: ethers.Contract | null = null;
  private vestingContract: ethers.Contract | null = null;
  private revenueContract: ethers.Contract | null = null;

  // Initialize the service with provider from wallet connection
  public initialize(provider: ethers.providers.Web3Provider) {
    this.provider = provider;
    this.signer = provider.getSigner();
    
    // Initialize contract instances
    this.tokenContract = new ethers.Contract(
      CONTRACT_ADDRESSES.TOKEN,
      CONTRACT_ABIS.TOKEN,
      this.signer
    );
    
    this.stakingContract = new ethers.Contract(
      CONTRACT_ADDRESSES.STAKING,
      CONTRACT_ABIS.STAKING,
      this.signer
    );
    
    this.vestingContract = new ethers.Contract(
      CONTRACT_ADDRESSES.VESTING,
      CONTRACT_ABIS.VESTING,
      this.signer
    );
    
    this.revenueContract = new ethers.Contract(
      CONTRACT_ADDRESSES.REVENUE,
      CONTRACT_ABIS.REVENUE,
      this.signer
    );
  }

  // Check if service is initialized
  private ensureInitialized() {
    if (!this.provider || !this.signer) {
      throw new Error("Web3Service not initialized. Connect wallet first.");
    }
  }

  // Token functions
  public async getTokenBalance(address: string): Promise<string> {
    this.ensureInitialized();
    const balance = await this.tokenContract!.balanceOf(address);
    return ethers.utils.formatEther(balance);
  }

  public async approveTokens(spender: string, amount: string): Promise<ethers.ContractTransaction> {
    this.ensureInitialized();
    const amountWei = ethers.utils.parseEther(amount);
    return this.tokenContract!.approve(spender, amountWei);
  }

  // Staking functions
  public async stakeTokens(amount: string): Promise<ethers.ContractTransaction> {
    this.ensureInitialized();
    const amountWei = ethers.utils.parseEther(amount);
    
    // First approve tokens to be spent by staking contract
    const allowance = await this.tokenContract!.allowance(
      await this.signer!.getAddress(),
      CONTRACT_ADDRESSES.STAKING
    );
    
    if (allowance.lt(amountWei)) {
      const approveTx = await this.tokenContract!.approve(CONTRACT_ADDRESSES.STAKING, amountWei);
      await approveTx.wait(); // Wait for approval to be mined
    }
    
    // Now stake the tokens
    return this.stakingContract!.stake(amountWei);
  }

  public async unstakeTokens(): Promise<ethers.ContractTransaction> {
    this.ensureInitialized();
    return this.stakingContract!.unstake();
  }

  public async claimStakingRewards(): Promise<ethers.ContractTransaction> {
    this.ensureInitialized();
    return this.stakingContract!.claimRewards();
  }

  public async getStakingInfo(address: string): Promise<StakingInfo> {
    this.ensureInitialized();
    const stakeData = await this.stakingContract!.stakes(address);
    const rewards = await this.stakingContract!.calculateRewards(address);
    
    return {
      amount: ethers.utils.formatEther(stakeData.amount),
      startTime: new Date(stakeData.startTime.toNumber() * 1000),
      lastClaim: new Date(stakeData.lastClaim.toNumber() * 1000),
      rewards: ethers.utils.formatEther(rewards)
    };
  }

  // Vesting functions
  public async claimVestedTokens(): Promise<ethers.ContractTransaction> {
    this.ensureInitialized();
    return this.vestingContract!.claim();
  }

  public async getVestingInfo(address: string): Promise<VestingInfo> {
    this.ensureInitialized();
    const vestingData = await this.vestingContract!.vestings(address);
    const claimable = await this.vestingContract!.getClaimable(address);
    
    return {
      totalAmount: ethers.utils.formatEther(vestingData.totalAmount),
      startTime: new Date(vestingData.startTime.toNumber() * 1000),
      cliff: vestingData.cliff.toNumber(),
      duration: vestingData.duration.toNumber(),
      claimed: ethers.utils.formatEther(vestingData.claimed),
      claimable: ethers.utils.formatEther(claimable)
    };
  }

  // Revenue functions
  public async claimRevenue(): Promise<ethers.ContractTransaction> {
    this.ensureInitialized();
    return this.revenueContract!.claimRevenue();
  }

  public async getRevenueInfo(address: string): Promise<RevenueInfo> {
    this.ensureInitialized();
    const share = await this.revenueContract!.userShares(address);
    const claimable = await this.revenueContract!.getClaimable(address);
    const totalRevenue = await this.revenueContract!.totalRevenue();
    
    return {
      share: ethers.utils.formatEther(share),
      claimable: ethers.utils.formatEther(claimable),
      totalRevenue: ethers.utils.formatEther(totalRevenue)
    };
  }
}

// Create a singleton instance
const web3Service = new Web3Service();
export default web3Service;
