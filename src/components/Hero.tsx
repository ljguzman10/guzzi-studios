import { useState } from 'react';
import djCloseupHands from '../assets/images/dj_pioneer_two_hands_centered_1782758087409.jpg';
import chicagoGalaLounge from '../assets/images/chicago_gala_lounge_1782763049039.jpg';

interface HeroProps {
  onNavigate: (view: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  // We can offer responsive layout. 
  // Left: content + stats. 
  // Right: visual links to category views!
  return (
    <section id="hero-section" className="relative pt-24 min-h-[90vh] lg:h-screen flex flex-col lg:flex-row bg-[#0C0C0C] text-white border-b border-white/10 overflow-hidden">
      
      {/* Left Content Column (3/5 width on desktop) */}
      <div className="w-full lg:w-3/5 p-8 md:p-16 lg:p-20 flex flex-col justify-between relative z-10 border-r border-white/10">
        
        {/* Ambient top fade */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#121212] to-[#0C0C0C] opacity-60 pointer-events-none -z-10" />

        <div className="space-y-8 my-auto max-w-2xl">
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-12 bg-white/40"></div>
            <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/60 font-mono">
              Chicago &bull; Wisconsin &bull; Michigan &bull; Indiana
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-[76px] font-light leading-[1.05] tracking-tight">
            Capturing <br/> 
            <span className="italic font-serif text-white/90">The Moments</span> <br/> 
            <span className="text-gold-200">You'll Never Forget</span>
          </h1>

          <p className="max-w-md text-sm md:text-base text-white/70 font-light leading-relaxed font-sans">
            Luis Guzman brings an urban, high-contrast creative perspective to luxury wedding and event photography, documented with raw emotion and cinematic energy.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button 
              onClick={() => {
                onNavigate('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-white text-black font-semibold text-xs tracking-widest uppercase transition-all duration-300 hover:bg-white/80 cursor-pointer"
            >
              Book Your Date
            </button>
            <button 
              onClick={() => {
                onNavigate('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-4 border border-white/20 text-white text-xs tracking-widest uppercase hover:bg-white/5 transition-colors cursor-pointer"
            >
              The Photographer
            </button>
          </div>
        </div>

        {/* Trust & Stats Footer Area */}
        <div className="grid grid-cols-3 border-t border-white/10 pt-8 mt-12 gap-4">
          <div>
            <p className="text-xl md:text-2xl font-light mb-1">200+</p>
            <p className="text-[9px] md:text-[10px] tracking-widest uppercase text-white/40 font-mono">Celebrations</p>
          </div>
          <div>
            <p className="text-xl md:text-2xl font-light mb-1">5+ Years</p>
            <p className="text-[9px] md:text-[10px] tracking-widest uppercase text-white/40 font-mono">Experience</p>
          </div>
          <div>
            <p className="text-xl md:text-2xl font-light mb-1">Chicago</p>
            <p className="text-[9px] md:text-[10px] tracking-widest uppercase text-white/40 font-mono">Native</p>
          </div>
        </div>

      </div>

      {/* Right Visual Panel (2/5 width on desktop, beautiful hover category panels) */}
      <div className="w-full lg:w-2/5 flex flex-col min-h-[450px] lg:h-full relative z-10">
        
        {/* Portfolio Category 1: Weddings */}
        <div 
          onClick={() => {
            onNavigate('weddings');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex-1 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-b border-white/10 group cursor-pointer relative overflow-hidden transition-all duration-500"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 p-4">
            <span className="text-[9px] tracking-[0.3em] uppercase text-white/50 block mb-1 font-mono">Editorial Portfolio</span>
            <h3 className="text-xl md:text-2xl font-light tracking-widest uppercase text-white group-hover:text-gold-200 transition-colors">Weddings</h3>
          </div>
        </div>
        
        {/* Portfolio Category 2: Music & DJs */}
        <div 
          onClick={() => {
            onNavigate('djs-artists');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex-1 bg-gradient-to-br from-[#111111] to-[#000000] border-b border-white/10 group cursor-pointer relative overflow-hidden transition-all duration-500"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            style={{ backgroundImage: `url(${djCloseupHands})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 p-4">
            <span className="text-[9px] tracking-[0.3em] uppercase text-white/50 block mb-1 font-mono">Cinematic Coverage</span>
            <h3 className="text-xl md:text-2xl font-light tracking-widest uppercase text-white group-hover:text-gold-200 transition-colors">Music & DJs</h3>
          </div>
        </div>

        {/* Portfolio Category 3: Corporate/Events */}
        <div 
          onClick={() => {
            onNavigate('events');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex-1 bg-gradient-to-br from-[#0a0a0a] to-[#151515] group cursor-pointer relative overflow-hidden transition-all duration-500"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            style={{ backgroundImage: `url(${chicagoGalaLounge})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 p-4">
            <span className="text-[9px] tracking-[0.3em] uppercase text-white/50 block mb-1 font-mono">Atmospheric Galas</span>
            <h3 className="text-xl md:text-2xl font-light tracking-widest uppercase text-white group-hover:text-gold-200 transition-colors">Events</h3>
          </div>
        </div>

      </div>

    </section>
  );
}
