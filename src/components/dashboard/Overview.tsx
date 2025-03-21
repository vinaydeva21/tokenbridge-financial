
import React from 'react';
import { Wallet, Layers, Clock, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

interface UserData {
  tokenBalance: string;
  stakedAmount: string;
  stakingTier: string;
  stakingApy: string;
  nextReward: string;
  stakingHistory: Array<{date: string; amount: string; action: string}>;
  currentTierPerks: string[];
}

const Overview: React.FC<{userData: UserData}> = ({ userData }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Token Balance</CardTitle>
            <Wallet className="h-5 w-5 text-token-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.tokenBalance}</div>
            <p className="text-xs text-token-gray mt-1">288 Tokens</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Staked Amount</CardTitle>
            <Layers className="h-5 w-5 text-token-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.stakedAmount}</div>
            <p className="text-xs text-token-gray mt-1">60% of holdings</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Tier</CardTitle>
            <Award className="h-5 w-5 text-token-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.stakingTier}</div>
            <p className="text-xs text-token-gray mt-1">APY: {userData.stakingApy}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Reward</CardTitle>
            <Clock className="h-5 w-5 text-token-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.nextReward}</div>
            <p className="text-xs text-token-gray mt-1">Estimated: 120 tokens</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Staking History</CardTitle>
            <CardDescription>Your recent staking activity</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userData.stakingHistory.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.amount}</TableCell>
                    <TableCell>{item.action}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Current Benefits</CardTitle>
            <CardDescription>Unlock more by staking additional tokens</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {userData.currentTierPerks.map((perk, index) => (
              <div key={index} className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-token-blue mt-1.5 mr-2"></div>
                <p>{perk}</p>
              </div>
            ))}
            
            <div className="mt-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Progress to Gold Tier</span>
                <span className="text-sm font-medium">60%</span>
              </div>
              <Progress value={60} className="h-2" />
              <p className="text-xs text-token-gray mt-2">Need 20,000 more tokens staked to reach Gold Tier</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
