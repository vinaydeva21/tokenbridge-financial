
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useWallet } from '@/hooks/useWallet';
import { useToast } from '@/hooks/use-toast';
import web3Service, { StakingInfo } from '@/services/web3Service';
import { CONTRACT_ADDRESSES } from '@/constants/contracts';

interface StakingData {
  tokenBalance: string;
  stakedAmount: string;
  claimableRewards: string;
}

const StakingTab: React.FC<{userData: StakingData}> = ({ userData }) => {
  const { address, provider, tokenBalance } = useWallet();
  const { toast } = useToast();
  const [stakeAmount, setStakeAmount] = useState('');
  const [apy, setApy] = useState('8');
  const [lockPeriod, setLockPeriod] = useState('30');
  const [isStaking, setIsStaking] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [isUnstaking, setIsUnstaking] = useState(false);
  const [stakingInfo, setStakingInfo] = useState<StakingInfo | null>(null);

  // Fetch staking info when address is available
  useEffect(() => {
    const fetchStakingInfo = async () => {
      if (!address || !provider) return;
      
      try {
        const info = await web3Service.getStakingInfo(address);
        setStakingInfo(info);
      } catch (error) {
        console.error('Error fetching staking info:', error);
      }
    };

    fetchStakingInfo();
    // Refresh every 30 seconds
    const interval = setInterval(fetchStakingInfo, 30000);
    return () => clearInterval(interval);
  }, [address, provider]);

  const handleStake = async () => {
    if (!address || !provider) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to stake tokens",
        variant: "destructive"
      });
      return;
    }

    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to stake",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsStaking(true);
      const tx = await web3Service.stakeTokens(stakeAmount);
      
      toast({
        title: "Transaction Submitted",
        description: "Your staking transaction has been submitted",
      });
      
      await tx.wait();
      
      toast({
        title: "Staking Successful",
        description: `Successfully staked ${stakeAmount} tokens`,
      });
      
      // Refresh staking info
      const info = await web3Service.getStakingInfo(address);
      setStakingInfo(info);
      
      // Clear input
      setStakeAmount('');
    } catch (error: any) {
      console.error('Staking error:', error);
      toast({
        title: "Staking Failed",
        description: error.message || "Failed to stake tokens",
        variant: "destructive"
      });
    } finally {
      setIsStaking(false);
    }
  };

  const handleUnstake = async () => {
    if (!address || !provider) return;
    
    try {
      setIsUnstaking(true);
      const tx = await web3Service.unstakeTokens();
      
      toast({
        title: "Transaction Submitted",
        description: "Your unstaking transaction has been submitted",
      });
      
      await tx.wait();
      
      toast({
        title: "Unstaking Successful",
        description: "Successfully unstaked your tokens",
      });
      
      // Refresh staking info
      const info = await web3Service.getStakingInfo(address);
      setStakingInfo(info);
    } catch (error: any) {
      console.error('Unstaking error:', error);
      toast({
        title: "Unstaking Failed",
        description: error.message || "Failed to unstake tokens",
        variant: "destructive"
      });
    } finally {
      setIsUnstaking(false);
    }
  };

  const handleClaimRewards = async () => {
    if (!address || !provider) return;
    
    try {
      setIsClaiming(true);
      const tx = await web3Service.claimStakingRewards();
      
      toast({
        title: "Transaction Submitted",
        description: "Your claim transaction has been submitted",
      });
      
      await tx.wait();
      
      toast({
        title: "Claim Successful",
        description: "Successfully claimed your rewards",
      });
      
      // Refresh staking info
      const info = await web3Service.getStakingInfo(address);
      setStakingInfo(info);
    } catch (error: any) {
      console.error('Claiming error:', error);
      toast({
        title: "Claim Failed",
        description: error.message || "Failed to claim rewards",
        variant: "destructive"
      });
    } finally {
      setIsClaiming(false);
    }
  };

  const handleSetMaxAmount = () => {
    if (tokenBalance) {
      setStakeAmount(tokenBalance);
    }
  };

  const handleLockPeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const period = e.target.value;
    setLockPeriod(period);
    
    // Update APY based on lock period
    switch (period) {
      case '30':
        setApy('8');
        break;
      case '90':
        setApy('10');
        break;
      case '180':
        setApy('12');
        break;
      case '365':
        setApy('15');
        break;
      default:
        setApy('8');
    }
  };

  // Calculate estimated rewards
  const calculateEstimatedRewards = () => {
    if (!stakeAmount) return '0';
    const amount = parseFloat(stakeAmount);
    const apr = parseFloat(apy) / 100;
    const days = parseFloat(lockPeriod);
    return ((amount * apr * days) / 365).toFixed(2);
  };

  // Calculate new tier after staking
  const getNewTier = () => {
    if (!stakeAmount) return userData.stakingTier || 'Bronze';
    
    const amount = parseFloat(stakeAmount) + (stakingInfo ? parseFloat(stakingInfo.amount) : 0);
    
    if (amount >= 100000) return 'Platinum';
    if (amount >= 50000) return 'Gold';
    if (amount >= 10000) return 'Silver';
    return 'Bronze';
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Stake Your Tokens</CardTitle>
              <CardDescription>Stake your 288 Tokens to earn rewards and unlock benefits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Amount to Stake</label>
                  <div className="flex">
                    <Input 
                      type="text" 
                      placeholder="Enter amount" 
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      className="flex-1 rounded-r-none"
                    />
                    <Button 
                      onClick={handleSetMaxAmount}
                      className="rounded-l-none bg-token-blue hover:bg-token-darkBlue"
                    >
                      Max
                    </Button>
                  </div>
                  <p className="text-xs text-token-gray mt-1">
                    Available: {tokenBalance || userData.tokenBalance} tokens
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Lock Period</label>
                  <select 
                    className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-token-blue"
                    value={lockPeriod}
                    onChange={handleLockPeriodChange}
                  >
                    <option value="30">30 days (min) - 8% APY</option>
                    <option value="90">90 days - 10% APY</option>
                    <option value="180">180 days - 12% APY</option>
                    <option value="365">365 days - 15% APY</option>
                  </select>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-md">
                  <div className="flex justify-between mb-2">
                    <span>Estimated APY:</span>
                    <span className="font-bold">{apy}%</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Estimated rewards:</span>
                    <span className="font-bold">{calculateEstimatedRewards()} tokens</span>
                  </div>
                  <div className="flex justify-between">
                    <span>New tier after staking:</span>
                    <span className="font-bold text-token-blue">{getNewTier()}</span>
                  </div>
                </div>
                
                <Button 
                  onClick={handleStake}
                  disabled={isStaking || !stakeAmount}
                  className="button-hover-effect w-full inline-flex items-center justify-center rounded-full bg-token-blue px-5 py-3 text-sm font-medium text-white shadow-sm hover:bg-token-darkBlue transition-all duration-200"
                >
                  {isStaking ? 'Staking...' : 'Stake Tokens'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Currently Staked</CardTitle>
              <CardDescription>Your active staking positions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Total staked:</span>
                <span className="text-sm font-bold">
                  {stakingInfo?.amount || userData.stakedAmount} tokens
                </span>
              </div>
              
              {stakingInfo && parseFloat(stakingInfo.amount) > 0 ? (
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Staking position</span>
                    <span className="text-sm font-medium text-token-blue">{stakingInfo.amount} tokens</span>
                  </div>
                  <div className="text-xs text-token-gray mb-2">
                    Started {stakingInfo.startTime.toLocaleDateString()}
                  </div>
                  <Progress value={50} className="h-2" />
                </div>
              ) : userData.stakedAmount && parseFloat(userData.stakedAmount) > 0 ? (
                <>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Staking position #1</span>
                      <span className="text-sm font-medium text-token-blue">25,000 tokens</span>
                    </div>
                    <div className="text-xs text-token-gray mb-2">Locked for 180 days (120 days remaining)</div>
                    <Progress value={33} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Staking position #2</span>
                      <span className="text-sm font-medium text-token-blue">5,000 tokens</span>
                    </div>
                    <div className="text-xs text-token-gray mb-2">Locked for 30 days (5 days remaining)</div>
                    <Progress value={83} className="h-2" />
                  </div>
                </>
              ) : (
                <div className="text-sm text-token-gray">No active stakes</div>
              )}
              
              <div className="pt-4 border-t border-border">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Claimable rewards:</span>
                  <span className="text-sm font-bold">
                    {stakingInfo?.rewards || userData.claimableRewards} tokens
                  </span>
                </div>
                {(stakingInfo && parseFloat(stakingInfo.rewards) > 0) || parseFloat(userData.claimableRewards) > 0 ? (
                  <Button 
                    onClick={handleClaimRewards}
                    disabled={isClaiming}
                    className="w-full mt-2 inline-flex items-center justify-center rounded-full border border-token-blue px-5 py-2 text-sm font-medium text-token-blue hover:bg-token-blue/5 transition-all duration-200"
                  >
                    {isClaiming ? 'Claiming...' : 'Claim Rewards'}
                  </Button>
                ) : null}
                
                {stakingInfo && parseFloat(stakingInfo.amount) > 0 && (
                  <Button 
                    onClick={handleUnstake}
                    disabled={isUnstaking}
                    className="w-full mt-2 inline-flex items-center justify-center rounded-full border border-destructive px-5 py-2 text-sm font-medium text-destructive hover:bg-destructive/5 transition-all duration-200"
                  >
                    {isUnstaking ? 'Unstaking...' : 'Unstake Tokens'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StakingTab;
