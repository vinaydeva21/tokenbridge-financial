
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Users, Trophy, Hourglass, DollarSign } from 'lucide-react';

interface UserData {
  tokenBalance: string;
  stakedAmount: string;
  stakingTier: string;
  stakingApy: string;
  nextReward: string;
  claimableRewards: string;
  stakingHistory: Array<{
    date: string;
    amount: string;
    action: string;
  }>;
  walletAddress?: string;
  ethBalance?: string;
}

const Overview: React.FC<{userData: UserData}> = ({ userData }) => {
  return (
    <div className="space-y-6">
      {/* Wallet Info Card */}
      {userData.walletAddress && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Wallet Information</CardTitle>
            <CardDescription>Your connected wallet details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium text-token-gray">Address</div>
                <div className="mt-1 font-mono text-sm break-all">
                  {userData.walletAddress}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-token-gray">ETH Balance</div>
                <div className="mt-1 font-medium">{parseFloat(userData.ethBalance || "0").toFixed(4)} ETH</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Token Balance</CardTitle>
            <DollarSign className="h-5 w-5 text-token-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.tokenBalance}</div>
            <p className="text-xs text-token-gray mt-1">288 Tokens</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Staked</CardTitle>
            <Users className="h-5 w-5 text-token-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.stakedAmount}</div>
            <p className="text-xs text-token-gray mt-1">288 Tokens</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Staking Tier</CardTitle>
            <Trophy className="h-5 w-5 text-token-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.stakingTier}</div>
            <p className="text-xs text-token-gray mt-1">APY: {userData.stakingApy}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Reward</CardTitle>
            <Hourglass className="h-5 w-5 text-token-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.nextReward}</div>
            <p className="text-xs text-token-gray mt-1">{userData.claimableRewards} tokens available</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Activity & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest token transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userData.stakingHistory.map((item, index) => (
                <div key={index} className="flex justify-between items-center border-b border-border pb-2 last:border-0 last:pb-0">
                  <div>
                    <div className="font-medium">{item.action}</div>
                    <div className="text-sm text-token-gray">{item.date}</div>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">{item.amount}</span>
                    {item.action === 'Stake' ? (
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                    ) : item.action === 'Unstake' ? (
                      <ArrowDownRight className="h-4 w-4 text-red-500" />
                    ) : (
                      <ArrowRight className="h-4 w-4 text-token-blue" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common token operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <button className="w-full text-left px-4 py-3 rounded-md bg-muted/50 hover:bg-muted transition-colors flex justify-between items-center">
              <span>Stake Tokens</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            
            <button className="w-full text-left px-4 py-3 rounded-md bg-muted/50 hover:bg-muted transition-colors flex justify-between items-center">
              <span>Claim Rewards</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            
            <button className="w-full text-left px-4 py-3 rounded-md bg-muted/50 hover:bg-muted transition-colors flex justify-between items-center">
              <span>Check Vesting</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            
            <button className="w-full text-left px-4 py-3 rounded-md bg-muted/50 hover:bg-muted transition-colors flex justify-between items-center">
              <span>View Benefits</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
