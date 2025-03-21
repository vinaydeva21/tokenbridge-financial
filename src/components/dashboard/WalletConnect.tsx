
import React from 'react';
import { Wallet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface WalletConnectProps {
  onConnect: () => void;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ onConnect }) => {
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
              onClick={onConnect}
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
};

export default WalletConnect;
