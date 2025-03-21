
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const isHomePage = location.pathname === '/';
  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 md:px-10 py-4",
        scrolled || !isHomePage ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-token-darkGray flex items-center gap-2">
            <div className="h-8 w-8 bg-token-blue rounded-full flex items-center justify-center text-white font-mono text-sm">288</div>
            <span className="hidden md:block">288 Token</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          {isHomePage ? (
            <>
              <a href="#overview" className="text-token-darkGray hover:text-token-blue transition-colors duration-200 text-sm font-medium">
                Overview
              </a>
              <a href="#utility" className="text-token-darkGray hover:text-token-blue transition-colors duration-200 text-sm font-medium">
                Utility
              </a>
              <a href="#economics" className="text-token-darkGray hover:text-token-blue transition-colors duration-200 text-sm font-medium">
                Economics
              </a>
            </>
          ) : (
            <>
              <Link 
                to="/" 
                className="text-token-darkGray hover:text-token-blue transition-colors duration-200 text-sm font-medium"
              >
                Home
              </Link>
            </>
          )}
          <Link 
            to="/dashboard" 
            className={cn(
              "transition-colors duration-200 text-sm font-medium",
              isActive('/dashboard') ? "text-token-blue" : "text-token-darkGray hover:text-token-blue"
            )}
          >
            Dashboard
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="button-hover-effect inline-flex items-center justify-center rounded-full bg-token-blue px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-token-darkBlue transition-all duration-200">
            Connect Wallet
          </Link>
          
          <button 
            className="md:hidden flex items-center justify-center p-2 rounded-md text-token-darkGray hover:text-token-blue transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md rounded-b-xl mt-2 px-6 py-4 absolute left-0 right-0">
          <nav className="flex flex-col space-y-4">
            {isHomePage ? (
              <>
                <a 
                  href="#overview" 
                  className="text-token-darkGray hover:text-token-blue transition-colors duration-200 text-sm font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Overview
                </a>
                <a 
                  href="#utility" 
                  className="text-token-darkGray hover:text-token-blue transition-colors duration-200 text-sm font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Utility
                </a>
                <a 
                  href="#economics" 
                  className="text-token-darkGray hover:text-token-blue transition-colors duration-200 text-sm font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Economics
                </a>
              </>
            ) : (
              <Link 
                to="/" 
                className="text-token-darkGray hover:text-token-blue transition-colors duration-200 text-sm font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
            )}
            <Link 
              to="/dashboard" 
              className={cn(
                "transition-colors duration-200 text-sm font-medium",
                isActive('/dashboard') ? "text-token-blue" : "text-token-darkGray hover:text-token-blue"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
