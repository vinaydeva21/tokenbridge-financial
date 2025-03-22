
import React from 'react';
import { useParams } from 'react-router-dom';
import { TabsContent } from "@/components/ui/tabs";
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import WalletConnect from '@/components/dashboard/WalletConnect';
import Overview from '@/components/dashboard/Overview';
import StakingTab from '@/components/dashboard/StakingTab';
import VestingTab from '@/components/dashboard/VestingTab';
import RewardsTab from '@/components/dashboard/RewardsTab';
import BenefitsTab from '@/components/dashboard/BenefitsTab';
import { useWallet } from '@/hooks/useWallet';

const Dashboard = () => {
  const { tab = 'overview' } = useParams();
  const { isConnected, address, balance } = useWallet();
  
  // Simulated user data - in a real implementation, this would come from the blockchain
  const userData = {
    tokenBalance: '50,000',
    stakedAmount: '30,000',
    stakingTier: 'Silver',
    stakingApy: '12%',
    nextReward: '2.5 days',
    claimableRewards: '250',
    vestedTotal: '100,000',
    vestedClaimed: '25,000',
    vestedAvailable: '10,000',
    vestedLocked: '65,000',
    currentTierPerks: [
      'Zero-commission trading on equities',
      'Reduced spreads on FX pairs',
      '10% discount on custody fees',
      'Access to select private investments'
    ],
    stakingHistory: [
      { date: '2023-06-15', amount: '10,000', action: 'Stake' },
      { date: '2023-08-22', amount: '5,000', action: 'Stake' },
      { date: '2023-10-05', amount: '15,000', action: 'Stake' },
      { date: '2023-12-18', amount: '2,500', action: 'Claim Rewards' }
    ],
    revenueSharing: [
      { period: 'Q1 2023', amount: '125', status: 'Claimed' },
      { period: 'Q2 2023', amount: '180', status: 'Claimed' },
      { period: 'Q3 2023', amount: '210', status: 'Claimed' },
      { period: 'Q4 2023', amount: '250', status: 'Available' }
    ]
  };
  
  if (!isConnected) {
    return <WalletConnect />;
  }
  
  return (
    <DashboardLayout activeTab={tab}>
      {/* Overview Tab */}
      <TabsContent value="overview">
        <Overview userData={{
          ...userData,
          walletAddress: address || "",
          ethBalance: balance || "0"
        }} />
      </TabsContent>
      
      {/* Staking Tab */}
      <TabsContent value="staking">
        <StakingTab userData={{
          tokenBalance: userData.tokenBalance,
          stakedAmount: userData.stakedAmount,
          claimableRewards: userData.claimableRewards,
          stakingTier: userData.stakingTier // Explicitly passing stakingTier
        }} />
      </TabsContent>
      
      {/* Vesting Tab */}
      <TabsContent value="vesting">
        <VestingTab userData={userData} />
      </TabsContent>
      
      {/* Rewards Tab */}
      <TabsContent value="rewards">
        <RewardsTab userData={userData} />
      </TabsContent>
      
      {/* Benefits Tab */}
      <TabsContent value="benefits">
        <BenefitsTab userData={userData} />
      </TabsContent>
    </DashboardLayout>
  );
};

export default Dashboard;
