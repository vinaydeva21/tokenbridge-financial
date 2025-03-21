
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useToast } from './use-toast';

interface WalletState {
  address: string | null;
  balance: string | null;
  chainId: number | null;
  provider: ethers.providers.Web3Provider | null;
  isConnecting: boolean;
  isConnected: boolean;
  error: string | null;
}

const initialState: WalletState = {
  address: null,
  balance: null,
  chainId: null,
  provider: null,
  isConnecting: false,
  isConnected: false,
  error: null,
};

export const useWallet = () => {
  const [walletState, setWalletState] = useState<WalletState>(initialState);
  const { toast } = useToast();

  // Check if wallet is already connected
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum && window.ethereum.selectedAddress) {
        try {
          await connectWallet();
        } catch (error) {
          console.error("Failed to reconnect wallet:", error);
        }
      }
    };
    
    checkConnection();
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = async (accounts: string[]) => {
      if (accounts.length === 0) {
        // User disconnected their wallet
        disconnectWallet();
        toast({
          title: "Wallet Disconnected",
          description: "Your wallet has been disconnected.",
          variant: "destructive",
        });
      } else if (accounts[0] !== walletState.address) {
        // Account changed, update state
        await updateWalletState();
        toast({
          title: "Account Changed",
          description: `Connected to: ${accounts[0].substring(0, 6)}...${accounts[0].substring(38)}`,
        });
      }
    };

    const handleChainChanged = async (chainId: string) => {
      // Chain changed, update state and reload page
      toast({
        title: "Network Changed",
        description: "Refreshing to update network data.",
      });
      window.location.reload();
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    return () => {
      if (window.ethereum?.removeListener) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, [walletState.address]);

  const connectWallet = async () => {
    if (!window.ethereum) {
      setWalletState({
        ...initialState,
        error: "No Ethereum wallet found. Please install MetaMask or another Web3 wallet.",
      });
      toast({
        title: "Wallet Connection Failed",
        description: "No Ethereum wallet found. Please install MetaMask.",
        variant: "destructive",
      });
      return;
    }

    try {
      setWalletState(prev => ({ ...prev, isConnecting: true, error: null }));

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      
      // Request account access
      const accounts = await provider.send("eth_requestAccounts", []);
      const address = accounts[0];
      
      // Get chain ID
      const { chainId } = await provider.getNetwork();
      
      // Get ETH balance
      const balanceWei = await provider.getBalance(address);
      const balance = ethers.utils.formatEther(balanceWei);

      setWalletState({
        address,
        balance,
        chainId,
        provider,
        isConnecting: false,
        isConnected: true,
        error: null,
      });

      toast({
        title: "Wallet Connected",
        description: `Connected to: ${address.substring(0, 6)}...${address.substring(38)}`,
      });

      return address;
    } catch (error: any) {
      console.error("Error connecting wallet:", error);
      setWalletState({
        ...initialState,
        error: error.message || "Failed to connect wallet",
      });
      
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect wallet",
        variant: "destructive",
      });
      return null;
    }
  };

  const updateWalletState = async () => {
    if (!window.ethereum) return;

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.listAccounts();
      
      if (accounts.length === 0) {
        disconnectWallet();
        return;
      }
      
      const address = accounts[0];
      const { chainId } = await provider.getNetwork();
      const balanceWei = await provider.getBalance(address);
      const balance = ethers.utils.formatEther(balanceWei);

      setWalletState({
        address,
        balance,
        chainId,
        provider,
        isConnecting: false,
        isConnected: true,
        error: null,
      });
    } catch (error) {
      console.error("Error updating wallet state:", error);
    }
  };

  const disconnectWallet = () => {
    setWalletState(initialState);
  };

  // Function to check if the correct network is connected
  const switchToArbitrum = async () => {
    if (!window.ethereum || !walletState.provider) return;

    try {
      // Arbitrum One Chain ID (decimal: 42161, hex: 0xa4b1)
      const arbitrumChainId = '0xa4b1';
      
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: arbitrumChainId }],
      });
    } catch (error: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0xa4b1',
                chainName: 'Arbitrum One',
                nativeCurrency: {
                  name: 'ETH',
                  symbol: 'ETH',
                  decimals: 18,
                },
                rpcUrls: ['https://arb1.arbitrum.io/rpc'],
                blockExplorerUrls: ['https://arbiscan.io/'],
              },
            ],
          });
        } catch (addError) {
          console.error("Error adding Arbitrum network:", addError);
          toast({
            title: "Network Error",
            description: "Could not add Arbitrum network to your wallet",
            variant: "destructive",
          });
        }
      } else {
        console.error("Error switching network:", error);
        toast({
          title: "Network Error",
          description: "Could not switch to Arbitrum network",
          variant: "destructive",
        });
      }
    }
  };

  return {
    ...walletState,
    connectWallet,
    disconnectWallet,
    switchToArbitrum,
  };
};

// Add type definitions for window.ethereum
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (request: { method: string; params?: any[] }) => Promise<any>;
      on: (eventName: string, listener: (...args: any[]) => void) => void;
      removeListener: (eventName: string, listener: (...args: any[]) => void) => void;
      selectedAddress?: string;
    };
  }
}
