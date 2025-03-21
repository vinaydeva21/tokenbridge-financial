
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface StakingData {
  tokenBalance: string;
  stakedAmount: string;
  claimableRewards: string;
}

const StakingTab: React.FC<{userData: StakingData}> = ({ userData }) => {
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
                    <input 
                      type="text" 
                      placeholder="Enter amount" 
                      className="flex-1 px-4 py-2 border border-input rounded-l-md focus:outline-none focus:ring-2 focus:ring-token-blue"
                    />
                    <button className="bg-token-blue text-white px-4 py-2 rounded-r-md hover:bg-token-darkBlue transition-colors">
                      Max
                    </button>
                  </div>
                  <p className="text-xs text-token-gray mt-1">Available: {userData.tokenBalance} tokens</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Lock Period</label>
                  <select className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-token-blue">
                    <option value="30">30 days (min) - 8% APY</option>
                    <option value="90">90 days - 10% APY</option>
                    <option value="180">180 days - 12% APY</option>
                    <option value="365">365 days - 15% APY</option>
                  </select>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-md">
                  <div className="flex justify-between mb-2">
                    <span>Estimated APY:</span>
                    <span className="font-bold">12%</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Estimated rewards:</span>
                    <span className="font-bold">1,800 tokens/year</span>
                  </div>
                  <div className="flex justify-between">
                    <span>New tier after staking:</span>
                    <span className="font-bold text-token-blue">Gold</span>
                  </div>
                </div>
                
                <button className="button-hover-effect w-full inline-flex items-center justify-center rounded-full bg-token-blue px-5 py-3 text-sm font-medium text-white shadow-sm hover:bg-token-darkBlue transition-all duration-200">
                  Stake Tokens
                </button>
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
                <span className="text-sm font-bold">{userData.stakedAmount} tokens</span>
              </div>
              
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
              
              <div className="pt-4 border-t border-border">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Claimable rewards:</span>
                  <span className="text-sm font-bold">{userData.claimableRewards} tokens</span>
                </div>
                <button className="w-full mt-2 inline-flex items-center justify-center rounded-full border border-token-blue px-5 py-2 text-sm font-medium text-token-blue hover:bg-token-blue/5 transition-all duration-200">
                  Claim Rewards
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StakingTab;
