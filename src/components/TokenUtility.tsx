
import React, { useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: '0%', value: 0 },
  { name: '10%', value: 5 },
  { name: '25%', value: 9 },
  { name: '50%', value: 12 },
  { name: '75%', value: 15 },
  { name: '100%', value: 18 },
];

const benefits = [
  { title: "Zero-Commission Trading", description: "Enjoy trading without fees across all asset classes." },
  { title: "Institutional Spreads", description: "Access tighter spreads typically reserved for institutional clients." },
  { title: "Discounted Fees", description: "Lower custody and subscription fees based on staking level." },
  { title: "Higher Interest Rates", description: "Earn increased interest on deposits and margin accounts." },
  { title: "Exclusive Investments", description: "Gain access to private investment opportunities." },
  { title: "Revenue Sharing", description: "Participate in up to 18% of brokerage revenue distribution." },
];

const TokenUtility = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );
    
    const elements = [sectionRef.current, chartRef.current, benefitsRef.current];
    elements.forEach(el => {
      if (el) observer.observe(el);
    });
    
    return () => {
      elements.forEach(el => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);
  
  return (
    <section id="utility" className="py-20 md:py-32 relative">
      <div className="absolute top-1/3 -left-40 w-80 h-80 bg-token-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 -right-40 w-80 h-80 bg-token-lightBlue/5 rounded-full blur-3xl"></div>
      
      <div className="container max-w-7xl mx-auto px-6">
        <div ref={sectionRef} className="text-center mb-16 fade-up-section">
          <div className="inline-flex items-center px-3 py-1 mb-5 rounded-full bg-token-blue/10 text-token-blue text-xs font-medium">
            TOKEN UTILITY
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Stake & Unlock Benefits</h2>
          <p className="max-w-2xl mx-auto text-lg text-token-gray text-pretty">
            Staking your 288 Tokens unlocks a progressive tier of benefits and rewards,
            enhancing your financial experience across the platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div ref={chartRef} className="fade-up-section">
            <div className="bg-white rounded-2xl p-6 shadow-soft h-full">
              <h3 className="text-xl font-semibold mb-6">Revenue Sharing by Staking Level</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F2F2F7" />
                    <XAxis dataKey="name" tick={{ fill: '#8E8E93' }} />
                    <YAxis 
                      tick={{ fill: '#8E8E93' }} 
                      domain={[0, 20]} 
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        borderRadius: '0.5rem',
                        boxShadow: '0 10px 50px -12px rgba(0, 0, 0, 0.1)',
                        border: 'none'
                      }}
                      formatter={(value) => [`${value}%`, 'Revenue Share']}
                      labelFormatter={(value) => `Staking Level: ${value}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#0A84FF" 
                      strokeWidth={3}
                      dot={{ stroke: '#0A84FF', strokeWidth: 3, r: 6, fill: 'white' }}
                      activeDot={{ r: 8, stroke: '#0A84FF', strokeWidth: 2, fill: '#0A84FF' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-token-gray mt-4 text-sm">
                * Revenue sharing increases with your staking level, up to 18% at maximum stake.
              </p>
            </div>
          </div>
          
          <div ref={benefitsRef} className="fade-up-section">
            <h3 className="text-xl font-semibold mb-6">Staking Benefits</h3>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl p-5 shadow-soft border border-token-lightGray transition-all duration-300 hover:shadow-medium"
                >
                  <h4 className="text-lg font-medium mb-2">{benefit.title}</h4>
                  <p className="text-token-gray">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TokenUtility;
