
import React, { ReactNode } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useNavigate, useLocation } from 'react-router-dom';

interface DashboardLayoutProps {
  children: ReactNode;
  activeTab: string;
}

const DashboardLayout = ({ children, activeTab }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  
  const handleTabChange = (value: string) => {
    navigate(`/dashboard/${value}`);
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 container max-w-7xl mx-auto px-6 py-8 mt-20">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">288 Token Dashboard</h1>
            <p className="text-token-gray">Manage your tokens, staking, and benefits</p>
          </div>
          
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="staking">Staking</TabsTrigger>
              <TabsTrigger value="vesting">Vesting</TabsTrigger>
              <TabsTrigger value="rewards">Rewards</TabsTrigger>
              <TabsTrigger value="benefits">Benefits</TabsTrigger>
            </TabsList>
            
            {children}
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
