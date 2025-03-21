
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

interface VestingData {
  vestedTotal: string;
  vestedClaimed: string;
  vestedAvailable: string;
  vestedLocked: string;
}

const VestingTab: React.FC<{userData: VestingData}> = ({ userData }) => {
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
    </div>
  );
};

export default VestingTab;
