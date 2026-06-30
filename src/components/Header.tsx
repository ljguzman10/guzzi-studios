import { useState, useEffect } from 'react';
import { Menu, X, Camera, Lock } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenAdmin: () => void;
}

export default function Header({ currentView, onNavigate, onOpenAdmin }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll on mobile when the mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'weddings', label: 'Weddings' },
    { id: 'djs-artists', label: 'DJs & Artists' },
    { id: 'events', label: 'Events' },
    { id: 'about', label: 'About Luis' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'contact', label: 'Inquire' },
  ];

  const handleNavClick = (viewId: string) => {
    onNavigate(viewId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        mobileMenuOpen
          ? 'bg-black text-white py-4 border-b border-white/10'
          : isScrolled || currentView !== 'home'
          ? 'bg-[#0C0C0C] text-white py-4 shadow-2xl backdrop-blur-md border-b border-white/10'
          : 'bg-transparent text-white py-6 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo / Wordmark */}
        <button
          id="logo-button"
          onClick={() => handleNavClick('home')}
          className="flex items-center space-x-3 group text-left cursor-pointer"
        >
          {/* Custom camera & G logo based on the provided image */}
          <svg
            viewBox="0 0 200 200"
            className="w-10 h-10 text-white/95 group-hover:text-white group-hover:scale-105 transition-all duration-300"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Camera Body */}
            <path
              d="M 84,44 L 116,44 M 84,44 L 72,62 L 38,62 A 10,10 0 0,0 28,72 L 28,132 A 10,10 0 0,0 38,142 L 72,142 M 116,44 L 128,62 L 162,62 A 10,10 0 0,1 172,72 L 172,132 A 10,10 0 0,1 162,142 L 148,142"
              strokeWidth="5.5"
            />
            
            {/* Outer Left Crescent Arc (Lens Reflection Accent) */}
            <path
              d="M 60,70 A 50,50 0 0,0 60,130"
              strokeWidth="4"
            />

            {/* Main Lens Circle */}
            <circle
              cx="100"
              cy="100"
              r="34"
              strokeWidth="5.5"
            />

            {/* Inner Stylized G Curve */}
            <path
              d="M 116,88 A 20,20 0 1,0 116,112"
              strokeWidth="5.5"
            />

            {/* Inner Stylized G Horizontal Bar */}
            <path
              d="M 118,100 L 100,100"
              strokeWidth="5.5"
            />
          </svg>

          <div className="flex flex-col">
            <span className="text-2xl font-light tracking-[0.2em] uppercase leading-none text-white group-hover:text-white/80 transition-colors">
              Guzzi
            </span>
            <span className="text-[10px] tracking-[0.4em] uppercase text-white/50 group-hover:text-white/75 transition-colors font-sans mt-1">
              Photography
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav id="desktop-nav" className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => {
            const isPricing = item.id === 'pricing';
            const isContact = item.id === 'contact';
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-[11px] uppercase tracking-[0.2em] font-medium transition-all cursor-pointer ${
                  isPricing
                    ? currentView === 'pricing'
                      ? 'bg-gold-200 text-[#0C0C0C] border border-gold-200 px-3.5 py-1.5 rounded-sm font-semibold hover:bg-gold-100 shadow-[0_0_15px_rgba(229,222,179,0.25)]'
                      : 'border border-gold-200/50 hover:border-gold-200 text-gold-200 hover:bg-gold-200/5 hover:text-gold-100 hover:shadow-[0_0_10px_rgba(229,222,179,0.15)] px-3.5 py-1.5 rounded-sm'
                    : isContact
                    ? currentView === 'contact'
                      ? 'bg-white text-[#0C0C0C] border border-white px-3.5 py-1.5 rounded-sm font-semibold hover:bg-white/90 shadow-[0_0_15px_rgba(255,255,255,0.25)]'
                      : 'border border-white/40 hover:border-white text-white hover:bg-white/5 hover:text-white hover:shadow-[0_0_10px_rgba(255,255,255,0.15)] px-3.5 py-1.5 rounded-sm'
                    : currentView === item.id
                    ? 'text-white border-b border-white pb-1 font-semibold'
                    : 'text-white/70 hover:text-white/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center space-x-4 lg:hidden">
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 focus:outline-none focus:ring-0 text-white hover:text-white/80 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-backdrop"
          className="fixed inset-0 top-[68px] bg-black z-40 flex flex-col justify-between py-12 px-8 lg:hidden animate-fade-in"
        >
          <nav className="flex flex-col space-y-6 text-center">
            {navItems.map((item) => {
              const isPricing = item.id === 'pricing';
              const isContact = item.id === 'contact';
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-base uppercase tracking-[0.25em] block py-2 ${
                    isPricing
                      ? 'text-gold-200 font-semibold bg-[#0C0C0C] border border-gold-200/25 py-2.5 rounded-sm mx-auto w-full max-w-xs shadow-[0_0_12px_rgba(229,222,179,0.1)]'
                      : isContact
                      ? 'text-white font-semibold bg-[#0C0C0C] border border-white/20 py-2.5 rounded-sm mx-auto w-full max-w-xs shadow-[0_0_12px_rgba(255,255,255,0.05)]'
                      : currentView === item.id
                      ? 'text-white font-bold border-b border-white/10'
                      : 'text-white/60 border-b border-white/10'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
          <div className="text-center text-[9px] text-white/30 font-mono space-y-2 uppercase tracking-[0.4em]">
            <p>GUZZI PHOTOGRAPHY © 2026</p>
            <p className="text-[8px]">CHICAGO, ILLINOIS</p>
          </div>
        </div>
      )}
    </header>
  );
}
