
import React, { useState } from 'react';
import { Shield, UploadCloud, Users, PieChart, LineChart } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  // Mock authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
  };
  
  // Mock data
  const platformStats = {
    totalTokensStaked: '4,250,000,000',
    activeStakers: '12,345',
    averageStakingPeriod: '180 days',
    totalRevenueDistributed: '2,450,000',
    stakingTiers: [
      { tier: 'Bronze', count: 8250, percentage: 67 },
      { tier: 'Silver', count: 2845, percentage: 23 },
      { tier: 'Gold', count: 1020, percentage: 8 },
      { tier: 'Platinum', count: 230, percentage: 2 }
    ],
    revenueDistributions: [
      { period: 'Q1 2023', amount: '500,000', date: '2023-04-15' },
      { period: 'Q2 2023', amount: '580,000', date: '2023-07-15' },
      { period: 'Q3 2023', amount: '620,000', date: '2023-10-15' },
      { period: 'Q4 2023', amount: '750,000', date: '2024-01-15' }
    ]
  };
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Admin Authentication</CardTitle>
              <CardDescription>
                Enter your admin credentials to access the platform management dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Username</label>
                  <input 
                    type="text" 
                    value="admin"
                    readOnly
                    className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-token-blue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-token-blue"
                  />
                  <p className="text-xs text-token-gray mt-1">Hint: admin123</p>
                </div>
                <button 
                  type="submit"
                  className="button-hover-effect w-full inline-flex items-center justify-center rounded-full bg-token-blue px-5 py-3 text-sm font-medium text-white shadow-sm hover:bg-token-darkBlue transition-all duration-200"
                >
                  <Shield className="mr-2 h-5 w-5" />
                  Login as Admin
                </button>
              </form>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 container max-w-7xl mx-auto px-6 py-8 mt-20">
        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-token-gray">Platform management and analytics</p>
            </div>
            <div className="flex items-center gap-2 bg-muted/30 px-4 py-2 rounded-full">
              <Shield className="h-5 w-5 text-token-blue" />
              <span className="font-medium">Admin Mode</span>
            </div>
          </div>
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="revenue">Revenue Distribution</TabsTrigger>
              <TabsTrigger value="users">User Management</TabsTrigger>
              <TabsTrigger value="settings">Platform Settings</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Staked</CardTitle>
                    <PieChart className="h-5 w-5 text-token-blue" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{platformStats.totalTokensStaked}</div>
                    <p className="text-xs text-token-gray mt-1">288 Tokens</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Stakers</CardTitle>
                    <Users className="h-5 w-5 text-token-blue" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{platformStats.activeStakers}</div>
                    <p className="text-xs text-token-gray mt-1">Unique wallets</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Staking Period</CardTitle>
                    <LineChart className="h-5 w-5 text-token-blue" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{platformStats.averageStakingPeriod}</div>
                    <p className="text-xs text-token-gray mt-1">Weighted average</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Revenue Distributed</CardTitle>
                    <UploadCloud className="h-5 w-5 text-token-blue" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{platformStats.totalRevenueDistributed}</div>
                    <p className="text-xs text-token-gray mt-1">288 Tokens</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>User Tiers Distribution</CardTitle>
                    <CardDescription>Breakdown of users by staking tier</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {platformStats.stakingTiers.map((tier) => (
                        <div key={tier.tier}>
                          <div className="flex justify-between mb-1">
                            <span>{tier.tier} Tier</span>
                            <span>{tier.count} users ({tier.percentage}%)</span>
                          </div>
                          <Progress value={tier.percentage} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Platform Activity</CardTitle>
                    <CardDescription>Last 24 hours</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>New stakers</span>
                        <span className="font-medium">45</span>
                      </div>
                      <div className="flex justify-between">
                        <span>New tokens staked</span>
                        <span className="font-medium">1,250,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tokens unstaked</span>
                        <span className="font-medium">320,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rewards claimed</span>
                        <span className="font-medium">85,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>New vesting claims</span>
                        <span className="font-medium">120,000</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Revenue Distribution Tab */}
            <TabsContent value="revenue" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Distribution</CardTitle>
                  <CardDescription>Manage and distribute revenue to token stakers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-8">
                    <h3 className="text-lg font-medium mb-4">Upload New Revenue Data</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Period</label>
                            <select className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-token-blue">
                              <option value="Q1-2024">Q1 2024</option>
                              <option value="Q2-2024">Q2 2024</option>
                              <option value="Q3-2024">Q3 2024</option>
                              <option value="Q4-2024">Q4 2024</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-2">Amount (288 Tokens)</label>
                            <input 
                              type="text" 
                              placeholder="Enter amount" 
                              className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-token-blue"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-2">Distribution Date</label>
                            <input 
                              type="date" 
                              className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-token-blue"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-muted/20 p-4 rounded-md">
                        <h4 className="font-medium mb-2">Distribution Simulation</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Total staked tokens:</span>
                            <span>4,250,000,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Active stakers:</span>
                            <span>12,345</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Token per 10,000 staked:</span>
                            <span>~1.76 tokens</span>
                          </div>
                          <div className="flex justify-between font-medium mt-4">
                            <span>Estimated gas cost:</span>
                            <span>~0.045 ETH</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <button className="button-hover-effect inline-flex items-center justify-center rounded-full bg-token-blue px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-token-darkBlue transition-all duration-200">
                        <UploadCloud className="mr-2 h-4 w-4" />
                        Upload & Distribute
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Distribution History</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Period</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Distribution Date</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {platformStats.revenueDistributions.map((dist, index) => (
                          <TableRow key={index}>
                            <TableCell>{dist.period}</TableCell>
                            <TableCell>{dist.amount} tokens</TableCell>
                            <TableCell>{dist.date}</TableCell>
                            <TableCell>
                              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                Completed
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* User Management Tab */}
            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>View and manage platform users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between mb-6">
                    <div className="relative w-64">
                      <input 
                        type="text" 
                        placeholder="Search users..." 
                        className="w-full pl-10 pr-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-token-blue"
                      />
                      <div className="absolute left-3 top-2.5 text-token-gray">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <select className="px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-token-blue">
                        <option value="all">All Tiers</option>
                        <option value="bronze">Bronze</option>
                        <option value="silver">Silver</option>
                        <option value="gold">Gold</option>
                        <option value="platinum">Platinum</option>
                      </select>
                      <button className="px-3 py-2 border border-input rounded-md hover:bg-muted/20 transition-colors">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                      </button>
                      <button className="px-3 py-2 border border-input rounded-md hover:bg-muted/20 transition-colors">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Wallet Address</TableHead>
                        <TableHead>Tier</TableHead>
                        <TableHead>Staked Amount</TableHead>
                        <TableHead>Date Joined</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-mono">0x1a2b...3c4d</TableCell>
                        <TableCell>Platinum</TableCell>
                        <TableCell>150,000</TableCell>
                        <TableCell>2023-01-15</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            Active
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <button className="text-xs text-token-blue hover:underline">View</button>
                            <button className="text-xs text-token-gray hover:underline">Edit</button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-mono">0x5e6f...7g8h</TableCell>
                        <TableCell>Gold</TableCell>
                        <TableCell>75,000</TableCell>
                        <TableCell>2023-02-18</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            Active
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <button className="text-xs text-token-blue hover:underline">View</button>
                            <button className="text-xs text-token-gray hover:underline">Edit</button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-mono">0x9i0j...1k2l</TableCell>
                        <TableCell>Silver</TableCell>
                        <TableCell>35,000</TableCell>
                        <TableCell>2023-03-24</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                            Pending
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <button className="text-xs text-token-blue hover:underline">View</button>
                            <button className="text-xs text-token-gray hover:underline">Edit</button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-mono">0x3m4n...5o6p</TableCell>
                        <TableCell>Bronze</TableCell>
                        <TableCell>8,000</TableCell>
                        <TableCell>2023-05-10</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                            Inactive
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <button className="text-xs text-token-blue hover:underline">View</button>
                            <button className="text-xs text-token-gray hover:underline">Edit</button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  
                  <div className="flex justify-between items-center mt-6">
                    <div className="text-sm text-token-gray">
                      Showing 4 of 12,345 users
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-2 border border-input rounded-md hover:bg-muted/20 transition-colors">
                        Previous
                      </button>
                      <button className="px-3 py-2 bg-token-blue text-white rounded-md hover:bg-token-darkBlue transition-colors">
                        1
                      </button>
                      <button className="px-3 py-2 border border-input rounded-md hover:bg-muted/20 transition-colors">
                        2
                      </button>
                      <button className="px-3 py-2 border border-input rounded-md hover:bg-muted/20 transition-colors">
                        3
                      </button>
                      <button className="px-3 py-2 border border-input rounded-md hover:bg-muted/20 transition-colors">
                        Next
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Settings</CardTitle>
                  <CardDescription>Configure staking parameters and platform behavior</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Staking Parameters</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Minimum Staking Period (days)</label>
                            <input 
                              type="number" 
                              value="30"
                              className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-token-blue"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-2">Maximum Staking Period (days)</label>
                            <input 
                              type="number" 
                              value="365"
                              className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-token-blue"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-2">Base APY (%)</label>
                            <input 
                              type="number" 
                              value="8"
                              className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-token-blue"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-2">Max APY (%)</label>
                            <input 
                              type="number" 
                              value="15"
                              className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-token-blue"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-4">Tier Thresholds</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Bronze Tier Threshold</label>
                            <input 
                              type="number" 
                              value="10000"
                              className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-token-blue"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-2">Silver Tier Threshold</label>
                            <input 
                              type="number" 
                              value="30000"
                              className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-token-blue"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-2">Gold Tier Threshold</label>
                            <input 
                              type="number" 
                              value="50000"
                              className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-token-blue"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-2">Platinum Tier Threshold</label>
                            <input 
                              type="number" 
                              value="100000"
                              className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-token-blue"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Revenue Distribution Settings</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">Revenue Share Percentage (%)</label>
                          <input 
                            type="number" 
                            value="18"
                            className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-token-blue"
                          />
                          <p className="text-xs text-token-gray mt-1">Maximum percentage of brokerage revenue to distribute to stakers</p>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Distribution Frequency</label>
                          <select className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-token-blue">
                            <option value="monthly">Monthly</option>
                            <option value="quarterly" selected>Quarterly</option>
                            <option value="biannually">Bi-annually</option>
                            <option value="annually">Annually</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-4">
                      <button className="px-6 py-2.5 border border-input rounded-md hover:bg-muted/20 transition-colors">
                        Reset to Defaults
                      </button>
                      <button className="button-hover-effect px-6 py-2.5 bg-token-blue text-white rounded-md hover:bg-token-darkBlue transition-colors">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
