
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { useWallet } from '@/hooks/useWallet';
import { useToast } from '@/hooks/use-toast';
import web3Service, { VestingInfo } from '@/services/web3Service';

interface VestingData {
  vestedTotal: string;
  vestedClaimed: string;
  vestedAvailable: string;
  vestedLocked: string;
}

const VestingTab: React.FC<{userData: VestingData}> = ({ userData }) => {
  const { address, provider } = useWallet();
  const { toast } = useToast();
  const [vestingInfo, setVestingInfo] = useState<VestingInfo | null>(null);
  const [isClaiming, setIsClaiming] = useState(false);
  const [isStaking, setIsStaking] = useState(false);

  // Fetch vesting info when address is available
  useEffect(() => {
    const fetchVestingInfo = async () => {
      if (!address || !provider) return;
      
      try {
        const info = await web3Service.getVestingInfo(address);
        setVestingInfo(info);
      } catch (error) {
        console.error('Error fetching vesting info:', error);
      }
    };

    fetchVestingInfo();
    // Refresh every 30 seconds
    const interval = setInterval(fetchVestingInfo, 30000);
    return () => clearInterval(interval);
  }, [address, provider]);

  const handleClaimVested = async () => {
    if (!address || !provider) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to claim tokens",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsClaiming(true);
      const tx = await web3Service.claimVestedTokens();
      
      toast({
        title: "Transaction Submitted",
        description: "Your claim transaction has been submitted",
      });
      
      await tx.wait();
      
      toast({
        title: "Claim Successful",
        description: "Successfully claimed your vested tokens",
      });
      
      // Refresh vesting info
      const info = await web3Service.getVestingInfo(address);
      setVestingInfo(info);
    } catch (error: any) {
      console.error('Claiming error:', error);
      toast({
        title: "Claim Failed",
        description: error.message || "Failed to claim vested tokens",
        variant: "destructive"
      });
    } finally {
      setIsClaiming(false);
    }
  };

  const handleStakeVested = async () => {
    if (!address || !provider) return;
    
    try {
      setIsStaking(true);
      
      // First claim the tokens
      const claimTx = await web3Service.claimVestedTokens();
      await claimTx.wait();
      
      // Then stake them
      const amount = vestingInfo?.claimable || "0";
      const stakeTx = await web3Service.stakeTokens(amount);
      
      toast({
        title: "Transaction Submitted",
        description: "Your staking transaction has been submitted",
      });
      
      await stakeTx.wait();
      
      toast({
        title: "Staking Successful",
        description: `Successfully staked ${amount} tokens`,
      });
      
      // Refresh vesting info
      const info = await web3Service.getVestingInfo(address);
      setVestingInfo(info);
    } catch (error: any) {
      console.error('Staking error:', error);
      toast({
        title: "Staking Failed",
        description: error.message || "Failed to stake vested tokens",
        variant: "destructive"
      });
    } finally {
      setIsStaking(false);
    }
  };

  // Calculate vesting progress
  const calculateProgress = () => {
    if (vestingInfo && parseFloat(vestingInfo.totalAmount) > 0) {
      const claimed = parseFloat(vestingInfo.claimed);
      const total = parseFloat(vestingInfo.totalAmount);
      return Math.min(Math.round((claimed / total) * 100), 100);
    } else {
      return 35; // Default from the mock data
    }
  };

  // Calculate time remaining
  const calculateTimeRemaining = () => {
    if (vestingInfo) {
      const startTime = vestingInfo.startTime.getTime();
      const durationMs = vestingInfo.duration * 1000;
      const endTime = startTime + durationMs;
      const now = Date.now();
      
      if (now >= endTime) return "Vesting complete";
      
      const remainingMs = endTime - now;
      const remainingDays = Math.ceil(remainingMs / (1000 * 60 * 60 * 24));
      
      // Convert to months/days for display
      if (remainingDays > 60) {
        return `${Math.round(remainingDays / 30)} months remaining`;
      } else {
        return `${remainingDays} days remaining`;
      }
    } else {
      return "8.5 months remaining"; // Default from mock data
    }
  };

  return (
    <div className="space-y-6">
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
                <div className="text-xl font-bold">
                  {vestingInfo?.totalAmount || userData.vestedTotal} tokens
                </div>
              </div>
              <div className="bg-muted/30 p-4 rounded-md">
                <div className="text-sm text-token-gray mb-1">Claimed</div>
                <div className="text-xl font-bold">
                  {vestingInfo?.claimed || userData.vestedClaimed} tokens
                </div>
              </div>
              <div className="bg-muted/30 p-4 rounded-md">
                <div className="text-sm text-token-gray mb-1">Available to Claim</div>
                <div className="text-xl font-bold text-token-blue">
                  {vestingInfo?.claimable || userData.vestedAvailable} tokens
                </div>
              </div>
              <div className="bg-muted/30 p-4 rounded-md">
                <div className="text-sm text-token-gray mb-1">Still Locked</div>
                <div className="text-xl font-bold">
                  {vestingInfo ? 
                    (parseFloat(vestingInfo.totalAmount) - parseFloat(vestingInfo.claimed) - parseFloat(vestingInfo.claimable)).toFixed(2) 
                    : userData.vestedLocked} tokens
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Vesting progress</span>
                <span className="text-sm font-medium">{calculateProgress()}% complete</span>
              </div>
              <Progress value={calculateProgress()} className="h-2.5" />
              <p className="text-xs text-token-gray mt-1">
                Vesting period: {vestingInfo ? `${vestingInfo.duration / (30 * 24 * 60 * 60)} months` : "24 months"} ({calculateTimeRemaining()})
              </p>
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
                {vestingInfo ? (
                  <TableRow>
                    <TableCell>Next Release</TableCell>
                    <TableCell>{vestingInfo.claimable} tokens</TableCell>
                    <TableCell>
                      <span className="text-token-blue font-medium">
                        {parseFloat(vestingInfo.claimable) > 0 ? "Available" : "Locked"}
                      </span>
                    </TableCell>
                  </TableRow>
                ) : (
                  <>
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
                  </>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex justify-center gap-4">
            <Button 
              disabled={isClaiming || !(vestingInfo?.claimable && parseFloat(vestingInfo.claimable) > 0)}
              onClick={handleClaimVested}
              className="button-hover-effect inline-flex items-center justify-center rounded-full bg-token-blue px-8 py-3 text-sm font-medium text-white shadow-sm hover:bg-token-darkBlue transition-all duration-200"
            >
              {isClaiming ? 'Claiming...' : 'Claim Available Tokens'}
            </Button>
            <Button 
              disabled={isStaking || !(vestingInfo?.claimable && parseFloat(vestingInfo.claimable) > 0)}
              onClick={handleStakeVested}
              className="inline-flex items-center justify-center rounded-full border border-token-blue px-8 py-3 text-sm font-medium text-token-blue hover:bg-token-blue/5 transition-all duration-200"
            >
              {isStaking ? 'Staking...' : 'Stake Available Tokens'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VestingTab;
