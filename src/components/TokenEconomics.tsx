
import React, { useEffect, useRef } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const tokenDistribution = [
  { name: 'Public Sale', value: 45, color: '#0A84FF' },
  { name: 'Team & Advisors', value: 15, color: '#5AC8FA' },
  { name: 'Foundation', value: 20, color: '#32D74B' },
  { name: 'Ecosystem Growth', value: 15, color: '#FF9F0A' },
  { name: 'Reserve', value: 5, color: '#BF5AF2' },
];

const economicsData = [
  { label: 'Token Name', value: '288 Token' },
  { label: 'Token Symbol', value: '288' },
  { label: 'Blockchain', value: 'Arbitrum' },
  { label: 'Total Supply', value: '8,000,000,000' },
  { label: 'Initial Price', value: '$0.10 USD' },
  { label: 'Staking Rewards', value: 'Up to 18% Revenue Share' },
];

const TokenEconomics = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );
    
    const elements = [sectionRef.current, chartRef.current, detailsRef.current];
    elements.forEach(el => {
      if (el) observer.observe(el);
    });
    
    return () => {
      elements.forEach(el => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-soft border border-token-lightGray">
          <p className="font-medium">{`${payload[0].name}: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <section id="economics" className="py-20 md:py-32 bg-token-lightGray relative">
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-background to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent z-10"></div>
      
      <div className="container max-w-7xl mx-auto px-6">
        <div ref={sectionRef} className="text-center mb-16 fade-up-section">
          <div className="inline-flex items-center px-3 py-1 mb-5 rounded-full bg-token-blue/10 text-token-blue text-xs font-medium">
            TOKEN ECONOMICS
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Tokenomics & Distribution</h2>
          <p className="max-w-2xl mx-auto text-lg text-token-gray text-pretty">
            A transparent overview of 288 Token's supply, distribution, and economic model designed for 
            long-term sustainability and value.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div ref={chartRef} className="fade-up-section">
            <div className="bg-white rounded-2xl p-6 shadow-soft h-full">
              <h3 className="text-xl font-semibold mb-8 text-center">Token Distribution</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={tokenDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius="60%"
                      outerRadius="80%"
                      paddingAngle={2}
                      dataKey="value"
                      stroke="none"
                    >
                      {tokenDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend 
                      verticalAlign="bottom" 
                      layout="horizontal" 
                      iconType="circle"
                      iconSize={10}
                      formatter={(value) => <span className="text-sm text-token-darkGray">{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <p className="text-token-gray mt-4 text-sm text-center">
                *Token allocation percentages are subject to change before final deployment.
              </p>
            </div>
          </div>
          
          <div ref={detailsRef} className="fade-up-section">
            <div className="bg-white rounded-2xl p-6 shadow-soft h-full">
              <h3 className="text-xl font-semibold mb-8">Token Details</h3>
              <div className="space-y-6">
                {economicsData.map((item, index) => (
                  <div key={index} className="flex justify-between border-b border-token-lightGray pb-4">
                    <span className="text-token-gray font-medium">{item.label}</span>
                    <span className="font-semibold">{item.value}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-10 p-5 bg-token-blue/5 rounded-xl border border-token-blue/20">
                <h4 className="font-semibold mb-3">Vesting Schedule</h4>
                <p className="text-token-gray mb-3">
                  Team & Advisor tokens are subject to a 24-month vesting schedule with a 6-month cliff.
                  Public sale tokens are released in stages to ensure market stability.
                </p>
                <a href="#" className="text-token-blue font-medium hover:underline inline-flex items-center">
                  Read Full Tokenomics Paper
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TokenEconomics;
