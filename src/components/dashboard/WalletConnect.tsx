
import React from 'react';
import { Wallet, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWallet } from '@/hooks/useWallet';

const WalletConnect: React.FC = () => {
  const { connectWallet, isConnecting, error } = useWallet();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Connect Your Wallet</CardTitle>
            <CardDescription>
              Connect your wallet to access the 288 Token dashboard and manage your tokens.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button 
              onClick={connectWallet}
              disabled={isConnecting}
              className="button-hover-effect w-full inline-flex items-center justify-center rounded-full bg-token-blue px-5 py-3 text-sm font-medium text-white shadow-sm hover:bg-token-darkBlue transition-all duration-200"
            >
              <Wallet className="mr-2 h-5 w-5" />
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </Button>
            
            {error && (
              <div className="text-sm text-red-500 p-3 bg-red-50 rounded-md">
                {error}
              </div>
            )}
            
            <div className="text-sm text-token-gray">
              <p>Don't have a wallet?</p>
              <a 
                href="https://metamask.io/download/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center mt-2 text-token-blue hover:underline"
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                Install MetaMask
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WalletConnect;
