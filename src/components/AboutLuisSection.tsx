import { MapPin, Award, Shield } from 'lucide-react';
import luisPortrait from '../assets/images/luis_portrait_1782363252216.jpg';

interface AboutLuisSectionProps {
  onNavigate: (view: string) => void;
}

export default function AboutLuisSection({ onNavigate }: AboutLuisSectionProps) {
  return (
    <section id="about-luis-teaser" className="pt-24 pb-12 md:py-32 bg-[#0C0C0C] relative overflow-hidden">
      {/* Subtle modern radial gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/2 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
          
          {/* Column 1: Image Frame & Overlays (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative z-10 border border-white/10 p-3 bg-[#111111] shadow-2xl max-w-md mx-auto">
              <div className="aspect-[4/5] overflow-hidden bg-zinc-900 relative group">
                <img
                  src={luisPortrait}
                  alt="Luis Guzman - Lead Photographer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <p className="text-white text-[10px] tracking-[0.2em] font-mono uppercase">Luis Guzman | Founder & Principal</p>
                </div>
              </div>
            </div>

            {/* Chicago Grid Stamp Accent */}
            <div className="absolute -bottom-6 -right-4 lg:-right-6 bg-white text-black p-6 shadow-2xl z-20 max-w-[180px] font-sans">
              <span className="font-serif text-3xl font-light block leading-none">5+</span>
              <span className="text-[9px] tracking-[0.2em] uppercase text-black/60 block font-mono mt-1.5 leading-tight">
                Years Shooting
              </span>
            </div>
            
            {/* Outline accent frame */}
            <div className="absolute -top-6 -left-6 w-full h-full border border-white/5 pointer-events-none rounded-sm hidden sm:block" />
          </div>

          {/* Column 2: Editorial Text Content (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="h-[1px] w-6 bg-white/40 block"></span>
                <span className="text-white/50 text-[10px] tracking-[0.3em] uppercase font-semibold font-mono">
                  The Artist Behind the Lens
                </span>
              </div>
              <h2 className="font-serif text-3xl md:text-5xl text-white tracking-tight leading-tight font-light">
                Meet Guzzi
              </h2>
            </div>

            <p className="font-sans text-white/75 text-base md:text-lg leading-relaxed font-light">
              Raised in Chicago and driven by an intense passion for visual storytelling, Luis Guzman has spent the last five years documenting high-end weddings, society galas, and nightlife celebrations across the Midwest. 
            </p>

            <blockquote className="border-l-2 border-white/40 pl-6 my-6 italic font-serif text-white/90 text-lg md:text-xl leading-relaxed">
              "My mission is simple: Capture every real moment exactly as it felt."
            </blockquote>

            <p className="font-sans text-white/60 text-sm md:text-base leading-relaxed font-light">
              With more than 200 celebrations documented, Luis combines clean composition, authentic emotion, and a distinct fashion-editorial perspective. Whether it is a quiet black-tie reception in a high rise or a heavy bass-line underground music event in Chicago, he delivers absolute professional craftsmanship.
            </p>

            {/* Core Stats Inline */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 border-t border-white/10">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-white/40 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-white font-sans">Location</h4>
                  <p className="text-xs text-white/50 font-mono mt-0.5">Chicago, IL</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Award className="w-5 h-5 text-white/40 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-white font-sans">Experience</h4>
                  <p className="text-xs text-white/50 font-mono mt-0.5">200+ Celebrations</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 col-span-2 sm:col-span-1">
                <Shield className="w-5 h-5 text-white/40 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-white font-sans">Coverage</h4>
                  <p className="text-xs text-white/50 font-mono mt-0.5">IL, WI & IN</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <button
                onClick={() => {
                  onNavigate('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-white hover:bg-white/90 text-black text-xs tracking-widest uppercase font-semibold transition-all duration-300 shadow-md cursor-pointer font-sans"
              >
                Read Luis's Full Story
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
