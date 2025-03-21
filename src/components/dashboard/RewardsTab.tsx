
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

interface RewardsData {
  revenueSharing: Array<{
    period: string;
    amount: string;
    status: string;
  }>;
}

const RewardsTab: React.FC<{userData: RewardsData}> = ({ userData }) => {
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
    </div>
  );
};

export default RewardsTab;
