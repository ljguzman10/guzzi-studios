import { Mail, Phone, MapPin, ShieldCheck, Heart, Lock, Instagram, Briefcase } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
  onOpenAdmin: () => void;
}

export default function Footer({ onNavigate, onOpenAdmin }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="site-footer" className="bg-[#0C0C0C] text-white pt-20 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
        
        {/* Column 1: Brand Wordmark & Location (4 columns) */}
        <div className="md:col-span-4 space-y-6">
          <div className="inline-flex items-center space-x-4 group text-left cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="flex flex-col">
              <span className="text-2xl font-light tracking-[0.2em] uppercase leading-none text-white group-hover:text-white/80 transition-colors">
                Guzzi
              </span>
              <span className="text-[10px] tracking-[0.4em] uppercase text-white/50 group-hover:text-white/75 transition-colors font-sans mt-1">
                Studios
              </span>
            </div>
            {/* Golden Logo */}
            <svg
              viewBox="0 0 200 200"
              className="w-10 h-10 text-gold-200 group-hover:text-gold-100 group-hover:scale-105 transition-all duration-300"
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
          </div>
          
          <p className="text-white/60 text-xs md:text-sm leading-relaxed font-light font-sans max-w-sm">
            “Chicago grit meets luxury wedding photography.” Hand-crafting high-end visual legacies for weddings, event planners, nightlife promoters, and music artists throughout the Midwest.
          </p>

          <div className="flex items-center space-x-2 text-xs text-white/50 font-mono tracking-wider">
            <ShieldCheck className="w-4 h-4 text-white/40" />
            <span>Fully Insured & Registered LLC</span>
          </div>
        </div>

        {/* Column 2: Services (3 columns) */}
        <div className="md:col-span-3 md:col-start-6 space-y-4">
          <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50 font-mono">
            Services
          </h4>
          <ul className="space-y-2 text-[10px] text-white/70 font-mono tracking-wider uppercase">
            <li className="text-white/80 py-0.5">
              PHOTOGRAPHY
            </li>
            <li className="text-white/80 py-0.5">
              VIDEOGRAPHY
            </li>
            <li className="text-white/80 py-0.5">
              MEDIA EDITING
            </li>
            <li 
              onClick={() => {
                onNavigate('web-design');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-gold-200 hover:text-gold-100 py-1.5 cursor-pointer flex items-center gap-2 group transition-colors duration-200"
              title="Web Design & Managed Publishing by Luis"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 text-gold-200 group-hover:scale-110 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="14" x="2" y="3" rx="2" />
                <line x1="8" x2="16" y1="21" y2="21" />
                <line x1="12" x2="12" y1="17" y2="21" />
              </svg>
              <span className="font-semibold tracking-widest">WEB DESIGN</span>
              <span className="text-[7px] tracking-normal px-1 bg-gold-200/20 text-gold-200 border border-gold-200/30 rounded-sm scale-95">NEW</span>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Details & Instagram (3 columns) */}
        <div className="md:col-span-3 space-y-6">
          <div className="space-y-4">
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50 font-mono">
              Chicago Studio
            </h4>
            <ul className="space-y-3 text-xs text-white/70 font-sans font-light">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-white/40 flex-shrink-0 mt-0.5" />
                <span>Chicago, Illinois (Serving IL, WI & IN)</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-white/40 flex-shrink-0" />
                <a
                  href="tel:7735777372"
                  className="hover:text-white transition-colors cursor-pointer underline decoration-white/10 hover:decoration-white"
                >
                  (773) 577-7372
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-white/40 flex-shrink-0" />
                <a 
                  href="mailto:guzzistudios.luis@gmail.com" 
                  className="hover:text-white transition-colors cursor-pointer underline decoration-white/10 hover:decoration-white"
                >
                  guzzistudios.luis@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div className="pt-5 border-t border-white/10 space-y-3">
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50 font-mono flex items-center gap-1.5">
              <Instagram className="w-3.5 h-3.5 text-white/40" />
              <span>Instagram</span>
            </h4>
            <a 
              href="https://instagram.com/GUZZISTUDIOS" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center space-x-2 text-xs text-white/75 hover:text-white transition-colors group cursor-pointer mb-1"
            >
              <span className="font-mono tracking-wider text-white font-medium">@GUZZISTUDIOS</span>
              <span className="text-white/40 group-hover:translate-x-1 group-hover:text-white transition-all duration-300 font-mono">&rarr;</span>
            </a>
            <div className="mt-6 pt-6 border-t border-white/10">
              <button
                onClick={() => {
                  onNavigate('careers');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center space-x-1.5 text-[10px] text-white/40 hover:text-gold-200 font-mono uppercase tracking-wider transition-colors cursor-pointer"
              >
                <Briefcase className="w-3.5 h-3.5 text-gold-200/75" />
                <span>Join our team</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Underlay legal details */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <p className="text-[10px] text-white/30 font-mono tracking-[0.25em] uppercase">
          © {currentYear} GUZZI PHOTOGRAPHY. ALL RIGHTS RESERVED.
        </p>

        <div className="flex items-center space-x-4">
          <a
            href="/login"
            className="text-white/10 hover:text-white/30 transition-colors p-1 flex items-center cursor-pointer"
            title="Luis's Access Only"
          >
            <Lock className="w-2.5 h-2.5" />
          </a>
          
          <span className="text-white/10">|</span>

          <span className="text-[10px] text-white/30 font-mono flex items-center tracking-widest uppercase">
            MADE WITH <Heart className="w-3 h-3 mx-1 text-white/40 fill-white/10" /> IN CHICAGO BY LUIS GUZMAN
          </span>
        </div>
      </div>
    </footer>
  );
}
