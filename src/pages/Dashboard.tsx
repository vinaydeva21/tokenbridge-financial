import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Wallet, Layers, Clock, PieChart, Award } from 'lucide-react';
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const Dashboard = () => {
  const { tab = 'overview' } = useParams();
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  
  // Simulated wallet connection
  const handleConnectWallet = () => {
    setIsWalletConnected(true);
  };
  
  // Simulated user data
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
  
  if (!isWalletConnected) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Connect Your Wallet</CardTitle>
              <CardDescription>
                Connect your wallet to access the 288 Token dashboard and manage your tokens.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <button 
                onClick={handleConnectWallet}
                className="button-hover-effect w-full inline-flex items-center justify-center rounded-full bg-token-blue px-5 py-3 text-sm font-medium text-white shadow-sm hover:bg-token-darkBlue transition-all duration-200"
              >
                <Wallet className="mr-2 h-5 w-5" />
                Connect Wallet
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
  return (
    <DashboardLayout activeTab={tab}>
      {/* Overview Tab */}
      <TabsContent value="overview" className="space-y-6">
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
      </TabsContent>
      
      {/* Staking Tab */}
      <TabsContent value="staking" className="space-y-6">
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
      </TabsContent>
      
      {/* Vesting Tab */}
      <TabsContent value="vesting" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Vesting Schedule</CardTitle>
            <CardDescription>Track your vesting schedule and claim available tokens</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="bg-muted/30 p-4 rounded-md">
                  <div className="text-sm text-token-gray mb-1">Total Allocation</div>
                  <div className="text-xl font-bold">{userData.vestedTotal} tokens</div>
                </div>
                <div className="bg-muted/30 p-4 rounded-md">
                  <div className="text-sm text-token-gray mb-1">Claimed</div>
                  <div className="text-xl font-bold">{userData.vestedClaimed} tokens</div>
                </div>
                <div className="bg-muted/30 p-4 rounded-md">
                  <div className="text-sm text-token-gray mb-1">Available to Claim</div>
                  <div className="text-xl font-bold text-token-blue">{userData.vestedAvailable} tokens</div>
                </div>
                <div className="bg-muted/30 p-4 rounded-md">
                  <div className="text-sm text-token-gray mb-1">Still Locked</div>
                  <div className="text-xl font-bold">{userData.vestedLocked} tokens</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Vesting progress</span>
                  <span className="text-sm font-medium">35% complete</span>
                </div>
                <Progress value={35} className="h-2.5" />
                <p className="text-xs text-token-gray mt-1">Vesting period: 24 months (8.5 months remaining)</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Upcoming Releases</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>March 15, 2024</TableCell>
                    <TableCell>5,000 tokens</TableCell>
                    <TableCell><span className="text-token-blue font-medium">Available</span></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>April 15, 2024</TableCell>
                    <TableCell>5,000 tokens</TableCell>
                    <TableCell><span className="text-token-gray">Locked</span></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>May 15, 2024</TableCell>
                    <TableCell>5,000 tokens</TableCell>
                    <TableCell><span className="text-token-gray">Locked</span></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>June 15, 2024</TableCell>
                    <TableCell>5,000 tokens</TableCell>
                    <TableCell><span className="text-token-gray">Locked</span></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            
            <div className="flex justify-center gap-4">
              <button className="button-hover-effect inline-flex items-center justify-center rounded-full bg-token-blue px-8 py-3 text-sm font-medium text-white shadow-sm hover:bg-token-darkBlue transition-all duration-200">
                Claim Available Tokens
              </button>
              <button className="inline-flex items-center justify-center rounded-full border border-token-blue px-8 py-3 text-sm font-medium text-token-blue hover:bg-token-blue/5 transition-all duration-200">
                Stake Available Tokens
              </button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      {/* Rewards Tab */}
      <TabsContent value="rewards" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Sharing</CardTitle>
            <CardDescription>Earn a share of the brokerage's revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-muted/30 p-4 rounded-md">
                  <div className="text-sm text-token-gray mb-1">Your Stake Share</div>
                  <div className="text-xl font-bold">0.015%</div>
                  <div className="text-xs text-token-gray mt-1">of total staked tokens</div>
                </div>
                <div className="bg-muted/30 p-4 rounded-md">
                  <div className="text-sm text-token-gray mb-1">Last Quarter Earnings</div>
                  <div className="text-xl font-bold">250 tokens</div>
                  <div className="text-xs text-token-gray mt-1">Q4 2023</div>
                </div>
                <div className="bg-muted/30 p-4 rounded-md">
                  <div className="text-sm text-token-gray mb-1">Total Earnings To Date</div>
                  <div className="text-xl font-bold">765 tokens</div>
                  <div className="text-xs text-token-gray mt-1">Since joining</div>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Earnings History</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Period</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userData.revenueSharing.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.period}</TableCell>
                      <TableCell>{item.amount} tokens</TableCell>
                      <TableCell>
                        <span className={item.status === 'Available' ? 'text-token-blue font-medium' : 'text-token-gray'}>
                          {item.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        {item.status === 'Available' ? (
                          <button className="text-xs font-medium text-token-blue hover:underline">
                            Claim
                          </button>
                        ) : (
                          <span className="text-xs text-token-gray">—</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="bg-muted/20 p-4 rounded-md text-sm">
              <p className="mb-2 font-medium">How revenue sharing works:</p>
              <p className="text-token-gray mb-2">
                Up to 18% of STAK Securities' brokerage revenue is distributed to token stakers quarterly.
                Your share is proportional to your stake relative to all staked tokens.
              </p>
              <p className="text-token-gray">
                Increase your stake to earn a larger share of the revenue distribution.
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      {/* Benefits Tab */}
      <TabsContent value="benefits" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Benefits</CardTitle>
            <CardDescription>Current tier: <span className="font-medium">{userData.stakingTier}</span></CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-8">
              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="flex-1 p-6 border border-token-blue/20 bg-token-blue/5 rounded-xl">
                  <h3 className="text-lg font-medium mb-4 text-token-blue">Active Benefits</h3>
                  
                  <div className="space-y-4">
                    {userData.currentTierPerks.map((perk, index) => (
                      <div key={index} className="flex items-start">
                        <div className="rounded-full p-1 bg-token-blue/10 mr-3 mt-0.5">
                          <svg className="h-3 w-3 text-token-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-sm">{perk}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex-1 p-6 border border-muted rounded-xl">
                  <h3 className="text-lg font-medium mb-4 text-token-gray">Next Tier Benefits</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="rounded-full p-1 bg-muted mr-3 mt-0.5">
                        <svg className="h-3 w-3 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-sm">Zero-commission trading on all asset classes</p>
                    </div>
                    <div className="flex items-start">
                      <div className="rounded-full p-1 bg-muted mr-3 mt-0.5">
                        <svg className="h-3 w-3 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-sm">25% discount on custody fees</p>
                    </div>
                    <div className="flex items-start">
                      <div className="rounded-full p-1 bg-muted mr-3 mt-0.5">
                        <svg className="h-3 w-3 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-sm">Priority access to all private investments</p>
                    </div>
                    <div className="flex items-start">
                      <div className="rounded-full p-1 bg-muted mr-3 mt-0.5">
                        <svg className="h-3 w-3 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-sm">VIP customer support</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-lg font-medium">Tier Progress</h3>
                <div className="flex gap-4 mb-3">
                  <div className="flex-1 text-center p-2 rounded-lg bg-muted/20">
                    <div className="text-sm text-token-gray">Bronze</div>
                  </div>
                  <div className="flex-1 text-center p-2 rounded-lg bg-token-blue/10 font-medium text-token-blue">
                    <div className="text-sm">Silver</div>
                  </div>
                  <div className="flex-1 text-center p-2 rounded-lg bg-muted/20">
                    <div className="text-sm text-token-gray">Gold</div>
                  </div>
                  <div className="flex-1 text-center p-2 rounded-lg bg-muted/20">
                    <div className="text-sm text-token-gray">Platinum</div>
                  </div>
                </div>
                
                <Progress value={60} className="h-2.5" />
                
                <div className="flex justify-between text-xs text-token-gray">
                  <span>10,000 tokens</span>
                  <span>30,000 tokens</span>
                  <span>50,000 tokens</span>
                  <span>100,000 tokens</span>
                </div>
                
                <p className="text-sm text-token-gray mt-2">
                  Stake 20,000 more tokens to reach Gold tier and unlock additional benefits.
                </p>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button className="button-hover-effect inline-flex items-center justify-center rounded-full bg-token-blue px-8 py-3 text-sm font-medium text-white shadow-sm hover:bg-token-darkBlue transition-all duration-200">
                Stake More Tokens
              </button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Connect to Brokerage</CardTitle>
            <CardDescription>Link your STAK Securities account to activate token benefits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/20 p-6 rounded-md text-center">
              <p className="mb-4">
                Connect your wallet to your STAK Securities brokerage account to unlock all token benefits.
              </p>
              <button className="inline-flex items-center justify-center rounded-full border border-token-blue px-8 py-3 text-sm font-medium text-token-blue hover:bg-token-blue/5 transition-all duration-200">
                Connect to Brokerage
              </button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </DashboardLayout>
  );
};

export default Dashboard;
