import { Camera, Instagram, MapPin } from 'lucide-react';
import luisPortrait from '../assets/images/luis_portrait_1782363252216.jpg';

interface AboutPageProps {
  onNavigate: (view: string) => void;
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
  const accentDots = [
    { top: '12%', left: '6%', size: 'w-1 h-1', opacity: 'opacity-30' },
    { top: '22%', left: '88%', size: 'w-1.5 h-1.5', opacity: 'opacity-40' },
    { top: '38%', left: '15%', size: 'w-1 h-1', opacity: 'opacity-20' },
    { top: '62%', left: '94%', size: 'w-1 h-1', opacity: 'opacity-35' },
    { top: '78%', left: '18%', size: 'w-1.5 h-1.5', opacity: 'opacity-25' },
    { top: '45%', left: '80%', size: 'w-1 h-1', opacity: 'opacity-15' },
    { top: '70%', left: '8%', size: 'w-1.5 h-1.5', opacity: 'opacity-30' },
    { top: '8%', left: '52%', size: 'w-1 h-1', opacity: 'opacity-25' },
    { top: '32%', left: '48%', size: 'w-1.5 h-1.5', opacity: 'opacity-20' },
    { top: '50%', left: '4%', size: 'w-1 h-1', opacity: 'opacity-45' },
    { top: '85%', left: '90%', size: 'w-1 h-1', opacity: 'opacity-30' },
    { top: '18%', left: '72%', size: 'w-1.5 h-1.5', opacity: 'opacity-15' },
    { top: '58%', left: '64%', size: 'w-1 h-1', opacity: 'opacity-20' },
    { top: '88%', left: '42%', size: 'w-1.5 h-1.5', opacity: 'opacity-25' },
  ];

  return (
    <div id="about-page" className="pt-12 md:pt-16 min-h-screen bg-[#0C0C0C] text-white font-sans border-b border-white/10 relative overflow-hidden">
      
      {/* Moody ambient background glows */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/30 to-[#0C0C0C] pointer-events-none z-0" />
      <div className="absolute top-[15%] left-[5%] w-[380px] h-[380px] bg-gold-500/[0.03] rounded-full blur-[110px] pointer-events-none z-0 animate-pulse duration-10000" />
      <div className="absolute bottom-[25%] right-[5%] w-[450px] h-[450px] bg-white/[0.015] rounded-full blur-[130px] pointer-events-none z-0" />

      {/* Random Accent Dots / Subtle Light Catchers */}
      {accentDots.map((dot, idx) => (
        <div
          key={idx}
          className={`absolute rounded-full bg-white/70 ${dot.size} ${dot.opacity} pointer-events-none z-0`}
          style={{ top: dot.top, left: dot.left }}
        />
      ))}

      {/* Modern Minimalistic Chicago Skyline Vector Outline */}
      <div className="absolute bottom-0 left-0 right-0 h-44 md:h-64 w-full pointer-events-none z-0 overflow-hidden select-none">
        <svg viewBox="0 0 1600 400" className="w-full h-full text-white/[0.035] fill-none stroke-current" strokeWidth="1" preserveAspectRatio="none">
          <path d="
            M 0,400 
            L 50,400 L 50,280 L 100,280 L 100,400
            L 130,400 L 130,220 L 180,220 L 180,400
            L 220,400 L 220,180 L 235,180 L 235,90 L 236,90 L 236,180 L 250,180 L 250,400
            L 290,400 L 290,260 L 350,260 L 350,400
            L 390,400 L 390,140 L 415,140 L 415,90 L 428,90 L 428,40 L 431,40 L 431,10 L 433,10 L 433,40 L 437,40 L 437,10 L 439,10 L 439,40 L 442,40 L 442,95 L 455,95 L 455,140 L 480,140 L 480,400
            L 520,400 L 520,240 L 570,240 L 570,400
            L 610,400 L 610,160 L 625,120 L 625,60 L 627,60 L 627,120 L 640,160 L 640,400
            L 680,400 L 695,110 L 697,110 L 697,20 L 698,20 L 698,110 L 706,110 L 706,20 L 707,20 L 707,110 L 709,110 L 724,400
            L 760,400 L 760,190 L 795,150 L 795,400
            L 830,400 L 830,230 L 890,230 L 890,400
            L 930,400 L 930,170 L 980,170 L 980,400
            L 1020,400 L 1020,100 L 1045,100 L 1045,50 L 1046,50 L 1046,100 L 1070,100 L 1070,400
            L 1110,400 L 1110,250 L 1170,250 L 1170,400
            L 1210,400 L 1210,180 L 1260,180 L 1260,400
            L 1300,400 L 1300,120 L 1350,90 L 1350,400
            L 1390,400 L 1390,270 L 1450,270 L 1450,400
            L 1500,400 L 1500,320 L 1550,320 L 1550,400
            L 1600,400
          " />
        </svg>
      </div>

      {/* Big Editorial Profile Intro */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-10 pb-16 md:pt-14 md:pb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-start">
          
          {/* Column 1: Luis's Professional Portraits & Frame (5 columns) */}
          <div className="lg:col-span-5 space-y-6 relative lg:self-center">
            <div id="artist-behind-guzzi-text" className="space-y-1">
              <span className="text-[9px] tracking-[0.3em] font-mono text-white/40 uppercase block">DIRECTOR & PHOTOGRAPHER</span>
              <h2 className="font-serif text-xl text-white tracking-wider uppercase font-light">The Artist Behind Guzzi</h2>
            </div>

            <div className="relative z-10 border border-white/10 p-3 bg-[#111111] shadow-2xl">
              <div className="aspect-[4/5] bg-zinc-900 overflow-hidden rounded-sm relative">
                <img
                  src={luisPortrait}
                  alt="Luis Guzman Portrait"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-102"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Relocated Instagram Connection Button */}
            <div className="flex justify-center pt-2 pb-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-full p-3.5 border border-slate-300/40 hover:border-slate-200 text-slate-300 hover:text-white bg-slate-300/5 hover:bg-slate-300/10 hover:shadow-[0_0_15px_rgba(203,213,225,0.2)] transition-all rounded-sm font-mono flex items-center justify-center space-x-2.5 text-xs font-semibold tracking-wider uppercase"
              >
                <Instagram className="w-4 h-4 text-slate-400" />
                <span>FOLLOW @GUZZISTUDIOS</span>
              </a>
            </div>


            {/* Decorative Grid accent */}
            <div className="absolute -top-6 -left-6 w-full h-full border border-white/5 pointer-events-none rounded-sm hidden sm:block" />
          </div>

          {/* Column 2: Full Story Copy (7 columns) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-white/50">
                <span className="h-[1px] w-6 bg-white/40"></span>
                <span className="text-[10px] tracking-[0.3em] uppercase font-semibold font-mono">The Story of Guzzi</span>
              </div>
              <h1 className="font-serif text-4xl md:text-6xl text-white tracking-tight leading-tight font-light">
                About Luis Guzman
              </h1>
              <p className="font-serif text-lg md:text-xl text-white/90 italic font-light leading-relaxed">
                “Raised in Chicago, driven by a raw passion for authentic storytelling, and dedicated to fine art.”
              </p>
            </div>

            <div className="space-y-6 text-white/75 text-sm md:text-base font-light leading-relaxed">
              <p>
                My name is Luis Guzman, and I am a Chicago native. For the past five years, I have professionally documented the honest, unscripted, and high-energy celebrations of people and artists throughout the Midwest.
              </p>
              <p>
                Growing up in Chicago, I was drawn to the unique contrasts of our city—the architectural symmetry, the gritty industrial street alleys, the warm, reflective sunset light reflecting off the skyscrapers, and the heavy bass-lines of our historic house music clubs. I wanted to capture these worlds, merging a street-level creative perspective with luxury editorial design.
              </p>
              <p>
                With more than 200 celebrations across Illinois, Wisconsin, and Indiana, Guzzi Photography was born.
              </p>
            </div>

            {/* Manifesto Block */}
            <div className="bg-[#111111]/70 text-white p-8 border-l-2 border-white/40 shadow-lg rounded-sm space-y-4">
              <h4 className="font-serif text-lg text-white font-light">My Personal Mission Statement:</h4>
              <p className="text-white/75 text-xs md:text-sm font-light leading-relaxed font-sans italic">
                "I do not want to manufacture fake, stuffy smiles or pose you in ways that do not feel like you. I want to build true relationships of trust. My mission is simple: Capture every real moment exactly as it felt, creating a visual legacy that remains timeless and alive."
              </p>
            </div>

            {/* Chicago Roots & Trust Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-white/10">
              <div className="space-y-2">
                <h4 className="text-xs uppercase font-bold tracking-widest text-white font-sans font-medium">Chicago Native</h4>
                <p className="text-xs text-white/60 font-sans leading-relaxed font-light">
                  I know the city’s secret visual corners. Whether it is an editorial street corridor in the West Loop or a golden-hour beach cliff at Lake Geneva, I guide you to backdrops that feel cinematic.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-xs uppercase font-bold tracking-widest text-white font-sans font-medium">Relationships & Trust</h4>
                <p className="text-xs text-white/60 font-sans leading-relaxed font-light">
                  From coffee consultations to prompt timeline coordination, I prioritize fast, human communication. When the wedding day arrives, my presence feels like a supportive friend who happens to carry world-class gear.
                </p>
              </div>
            </div>

            {/* Social & Connect Action */}
            <div className="pt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
              <button
                onClick={() => {
                  onNavigate('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-60 py-4 bg-white hover:bg-white/80 text-black text-xs font-semibold tracking-widest uppercase transition-all shadow-md cursor-pointer font-sans flex items-center justify-center"
              >
                Inquire For Your Date
              </button>
              
              <button
                onClick={() => {
                  onNavigate('pricing');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-60 py-4 border border-gold-200 text-gold-200 bg-gold-200/5 hover:bg-gold-200 hover:text-[#0C0C0C] text-xs font-semibold tracking-widest uppercase transition-all shadow-[0_0_15px_rgba(229,222,179,0.15)] cursor-pointer font-sans flex items-center justify-center"
              >
                Pricing
              </button>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
