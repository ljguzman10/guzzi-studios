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
          <div className="flex flex-col group text-left cursor-pointer" onClick={() => onNavigate('home')}>
            <span className="text-2xl font-light tracking-[0.2em] uppercase leading-none text-white group-hover:text-white/80 transition-colors">
              Guzzi
            </span>
            <span className="text-[10px] tracking-[0.4em] uppercase text-white/50 group-hover:text-white/75 transition-colors font-sans mt-1">
              Photography
            </span>
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
            <li className="text-white/80 py-0.5">
              WEB DESIGN
            </li>
            <li className="text-white/80 py-0.5">
              BRAND & GRAPHIC DESIGN
            </li>
            <li className="text-white/80 py-0.5">
              SALES & MARKETING
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
                <span>(773) 577-7372</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-white/40 flex-shrink-0" />
                <span>luis@guzziphotography.com</span>
              </li>
            </ul>
          </div>

          <div className="pt-5 border-t border-white/10 space-y-3">
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50 font-mono flex items-center gap-1.5">
              <Instagram className="w-3.5 h-3.5 text-white/40" />
              <span>Instagram</span>
            </h4>
            <a 
              href="https://instagram.com/GUZZI_PHOTO" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center space-x-2 text-xs text-white/75 hover:text-white transition-colors group cursor-pointer"
            >
              <span className="font-mono tracking-wider text-white">@GUZZI_PHOTO</span>
              <span className="text-white/40 group-hover:translate-x-1 group-hover:text-white transition-all duration-300 font-mono">&rarr;</span>
            </a>
          </div>
        </div>

      </div>

      {/* Underlay legal details */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <p className="text-[10px] text-white/30 font-mono tracking-[0.25em] uppercase">
          © {currentYear} GUZZI PHOTOGRAPHY. ALL RIGHTS RESERVED.
        </p>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => {
              onNavigate('careers');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center space-x-1.5 text-[10px] text-white/40 hover:text-gold-200 font-mono uppercase tracking-wider transition-colors cursor-pointer"
          >
            <Briefcase className="w-3 h-3 text-gold-200/75" />
            <span>Join our team</span>
          </button>

          <button
            onClick={onOpenAdmin}
            className="text-white/10 hover:text-white/30 transition-colors p-1 flex items-center cursor-pointer"
            title="Luis's Access Only"
          >
            <Lock className="w-2.5 h-2.5" />
          </button>
          
          <span className="text-white/10">|</span>

          <span className="text-[10px] text-white/30 font-mono flex items-center tracking-widest uppercase">
            MADE WITH <Heart className="w-3 h-3 mx-1 text-white/40 fill-white/10" /> IN CHICAGO BY LUIS GUZMAN
          </span>
        </div>
      </div>
    </footer>
  );
}
