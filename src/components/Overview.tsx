
import React, { useEffect, useRef } from 'react';
import { Coins, Shield, Zap, BarChart3 } from 'lucide-react';

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  delay = 0 
}: { 
  icon: React.ElementType, 
  title: string, 
  description: string, 
  delay?: number 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.style.transitionDelay = `${delay}ms`;
    }
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cardRef.current?.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);
  
  return (
    <div ref={cardRef} className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 fade-up-section">
      <div className="w-12 h-12 rounded-xl bg-token-blue/10 flex items-center justify-center mb-6">
        <Icon className="h-6 w-6 text-token-blue" />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-token-gray text-pretty">{description}</p>
    </div>
  );
};

const Overview = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current?.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section id="overview" className="py-20 md:py-32 bg-token-lightGray relative">
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-background to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent z-10"></div>
      
      <div className="container max-w-7xl mx-auto px-6">
        <div ref={sectionRef} className="text-center mb-16 fade-up-section">
          <div className="inline-flex items-center px-3 py-1 mb-5 rounded-full bg-token-blue/10 text-token-blue text-xs font-medium">
            TOKEN OVERVIEW
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">The 288 Token Advantage</h2>
          <p className="max-w-2xl mx-auto text-lg text-token-gray text-pretty">
            Combining the benefits of decentralized finance with robust services of a 
            licensed EU-based securities brokerage.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            icon={Coins} 
            title="Utility Token" 
            description="Powers an exclusive financial ecosystem on the Arbitrum blockchain with a fixed supply of 8 billion tokens."
            delay={100}
          />
          <FeatureCard 
            icon={Zap} 
            title="Zero-Commission" 
            description="Stake tokens to unlock zero-commission trading and institutional-grade spreads for all your transactions."
            delay={200}
          />
          <FeatureCard 
            icon={Shield} 
            title="Regulated Platform" 
            description="Enjoy the security of a regulated EU-based brokerage with the flexibility of decentralized finance."
            delay={300}
          />
          <FeatureCard 
            icon={BarChart3} 
            title="Revenue Sharing" 
            description="Up to 18% of brokerage revenue allocated to reward token stakers, incentivizing participation."
            delay={400}
          />
        </div>
      </div>
    </section>
  );
};

export default Overview;
