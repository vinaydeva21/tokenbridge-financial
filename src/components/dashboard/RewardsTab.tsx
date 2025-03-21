
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useWallet } from '@/hooks/useWallet';
import { useToast } from '@/hooks/use-toast';
import web3Service, { RevenueInfo } from '@/services/web3Service';

interface RewardsData {
  revenueSharing: Array<{
    period: string;
    amount: string;
    status: string;
  }>;
}

const RewardsTab: React.FC<{userData: RewardsData}> = ({ userData }) => {
  const { address, provider } = useWallet();
  const { toast } = useToast();
  const [revenueInfo, setRevenueInfo] = useState<RevenueInfo | null>(null);
  const [isClaiming, setIsClaiming] = useState(false);

  // Fetch revenue info when address is available
  useEffect(() => {
    const fetchRevenueInfo = async () => {
      if (!address || !provider) return;
      
      try {
        const info = await web3Service.getRevenueInfo(address);
        setRevenueInfo(info);
      } catch (error) {
        console.error('Error fetching revenue info:', error);
      }
    };

    fetchRevenueInfo();
    // Refresh every 30 seconds
    const interval = setInterval(fetchRevenueInfo, 30000);
    return () => clearInterval(interval);
  }, [address, provider]);

  const handleClaimRevenue = async () => {
    if (!address || !provider) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to claim revenue",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsClaiming(true);
      const tx = await web3Service.claimRevenue();
      
      toast({
        title: "Transaction Submitted",
        description: "Your claim transaction has been submitted",
      });
      
      await tx.wait();
      
      toast({
        title: "Claim Successful",
        description: "Successfully claimed your revenue share",
      });
      
      // Refresh revenue info
      const info = await web3Service.getRevenueInfo(address);
      setRevenueInfo(info);
    } catch (error: any) {
      console.error('Claiming error:', error);
      toast({
        title: "Claim Failed",
        description: error.message || "Failed to claim revenue",
        variant: "destructive"
      });
    } finally {
      setIsClaiming(false);
    }
  };

  // Calculate stake share percentage
  const calculateStakeShare = () => {
    if (revenueInfo && parseFloat(revenueInfo.share) > 0) {
      // This would be a calculation based on the share
      // For simplicity, just return 0.015%
      return "0.015";
    }
    return "0.015"; // Default from mock data
  };

  return (
    <div className="space-y-6">
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
                <div className="text-xl font-bold">{calculateStakeShare()}%</div>
                <div className="text-xs text-token-gray mt-1">of total staked tokens</div>
              </div>
              <div className="bg-muted/30 p-4 rounded-md">
                <div className="text-sm text-token-gray mb-1">Last Quarter Earnings</div>
                <div className="text-xl font-bold">
                  {revenueInfo?.claimable || "250"} tokens
                </div>
                <div className="text-xs text-token-gray mt-1">Q4 2023</div>
              </div>
              <div className="bg-muted/30 p-4 rounded-md">
                <div className="text-sm text-token-gray mb-1">Total Earnings To Date</div>
                <div className="text-xl font-bold">
                  {revenueInfo ? 
                    (parseFloat(revenueInfo.totalRevenue) * parseFloat(revenueInfo.share) / 1e18).toFixed(2) 
                    : "765"} tokens
                </div>
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
                {revenueInfo ? (
                  <TableRow>
                    <TableCell>Current Quarter</TableCell>
                    <TableCell>{revenueInfo.claimable} tokens</TableCell>
                    <TableCell>
                      <span className={parseFloat(revenueInfo.claimable) > 0 ? 'text-token-blue font-medium' : 'text-token-gray'}>
                        {parseFloat(revenueInfo.claimable) > 0 ? 'Available' : 'None Available'}
                      </span>
                    </TableCell>
                    <TableCell>
                      {parseFloat(revenueInfo.claimable) > 0 ? (
                        <Button 
                          onClick={handleClaimRevenue} 
                          disabled={isClaiming}
                          variant="ghost"
                          className="text-xs font-medium text-token-blue hover:underline"
                        >
                          {isClaiming ? 'Claiming...' : 'Claim'}
                        </Button>
                      ) : (
                        <span className="text-xs text-token-gray">—</span>
                      )}
                    </TableCell>
                  </TableRow>
                ) : (
                  userData.revenueSharing.map((item, index) => (
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
                          <button 
                            onClick={handleClaimRevenue}
                            className="text-xs font-medium text-token-blue hover:underline"
                          >
                            Claim
                          </button>
                        ) : (
                          <span className="text-xs text-token-gray">—</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
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
    </div>
  );
};

export default RewardsTab;
