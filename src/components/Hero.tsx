
import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
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

  const scrollToOverview = () => {
    const overviewSection = document.getElementById('overview');
    if (overviewSection) {
      overviewSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 pb-10">
      {/* Background elements */}
      <div className="absolute inset-0 bg-hero-pattern z-0"></div>
      <div className="absolute top-1/4 -left-40 w-80 h-80 bg-token-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-token-lightBlue/5 rounded-full blur-3xl"></div>
      
      <div ref={sectionRef} className="container max-w-7xl mx-auto px-6 z-10 fade-up-section">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center px-3 py-1 mb-8 rounded-full bg-token-blue/10 text-token-blue text-xs font-medium">
            <span className="animate-pulse-soft">• </span>
            <span className="ml-1">ARBITRUM POWERED</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            <span className="block">The Future of</span>
            <span className="text-token-blue">DeFi</span>
            <span className="block">is Here</span>
          </h1>
          
          <p className="max-w-2xl text-xl text-token-gray mb-12 text-pretty">
            288 Token bridges traditional finance with DeFi, offering a secure, regulated, 
            and reward-driven platform in a decentralized ecosystem.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#" 
              className="button-hover-effect inline-flex items-center justify-center rounded-full bg-token-blue px-8 py-3 text-base font-medium text-white shadow-md hover:bg-token-darkBlue transition-all duration-200"
            >
              Buy Token
            </a>
            <a 
              href="#economics" 
              className="button-hover-effect inline-flex items-center justify-center rounded-full bg-white border border-token-blue/30 px-8 py-3 text-base font-medium text-token-blue shadow-sm hover:bg-token-blue/5 transition-all duration-200"
            >
              Token Economics
            </a>
          </div>
          
          <div className="mt-24 animate-bounce cursor-pointer" onClick={scrollToOverview}>
            <ArrowDown className="h-6 w-6 text-token-gray" />
          </div>
        </div>
      </div>
      
      {/* Token visualization */}
      <div className="absolute bottom-10 right-10 w-40 h-40 md:w-64 md:h-64 opacity-20 pointer-events-none">
        <div className="absolute inset-0 border-4 border-token-blue/30 rounded-full animate-pulse-soft"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-token-blue/20 h-20 w-20 md:h-32 md:w-32 rounded-full backdrop-blur-sm animate-float"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
