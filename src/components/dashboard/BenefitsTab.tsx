
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface BenefitsData {
  stakingTier: string;
  currentTierPerks: string[];
}

const BenefitsTab: React.FC<{userData: BenefitsData}> = ({ userData }) => {
  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default BenefitsTab;
