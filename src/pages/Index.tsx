
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Overview from '@/components/Overview';
import TokenUtility from '@/components/TokenUtility';
import TokenEconomics from '@/components/TokenEconomics';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    // Observe all section elements with the fade-up-section class
    document.querySelectorAll('.fade-up-section').forEach((section) => {
      observer.observe(section);
    });
    
    return () => {
      document.querySelectorAll('.fade-up-section').forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Overview />
      <TokenUtility />
      <TokenEconomics />
      <Footer />
    </div>
  );
};

export default Index;
