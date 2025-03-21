
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 md:px-10 py-4",
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold text-token-darkGray flex items-center gap-2">
            <div className="h-8 w-8 bg-token-blue rounded-full flex items-center justify-center text-white font-mono text-sm">288</div>
            <span className="hidden md:block">288 Token</span>
          </a>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#overview" className="text-token-darkGray hover:text-token-blue transition-colors duration-200 text-sm font-medium">
            Overview
          </a>
          <a href="#utility" className="text-token-darkGray hover:text-token-blue transition-colors duration-200 text-sm font-medium">
            Utility
          </a>
          <a href="#economics" className="text-token-darkGray hover:text-token-blue transition-colors duration-200 text-sm font-medium">
            Economics
          </a>
        </nav>
        
        <div>
          <a href="#" className="button-hover-effect inline-flex items-center justify-center rounded-full bg-token-blue px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-token-darkBlue transition-all duration-200">
            Connect Wallet
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
