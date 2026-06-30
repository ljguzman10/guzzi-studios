import { useState, useEffect } from 'react';
import { PortfolioItem } from '../types';
import { portfolioItems as defaultPortfolioItems } from '../data';
import { MapPin, Building } from 'lucide-react';
import chicagoGalaLounge from '../assets/images/chicago_gala_lounge_1782763049039.jpg';

interface EventsPageProps {
  onNavigate: (view: string) => void;
}

export default function EventsPage({ onNavigate }: EventsPageProps) {
  const [eventItems, setEventItems] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('guzzi_portfolio');
    let items: PortfolioItem[] = [];
    if (stored) {
      const parsed = JSON.parse(stored) as PortfolioItem[];
      items = parsed.filter(item => item.category === 'events');
    } else {
      items = defaultPortfolioItems.filter(item => item.category === 'events');
    }
    const updated = items.map(item => {
      if (item.id === 'e1') {
        return { ...item, title: 'Penthouse NYE Party', subtitle: "Hosted by Social Hunt Club with Big Local DJ's", tags: ['PenthouseNYE', 'Luxury Corporate', 'Cultural'] };
      }
      if (item.id === 'e2') {
        return { ...item, title: 'Quinceañera', subtitle: "Where heritage meets the urban skyline", location: 'LINCOLN PARK, CHICAGO', tags: ['TheGrandDebut', 'Tradition', 'SatinInTheSaddle'] };
      }
      if (item.id === 'e3') {
        return { ...item, title: 'Joes On Weed St.: DNC Party', subtitle: 'Official Democratic National Committee After Party', location: 'GOOSE ISLAND, CHICAGO', badge: 'HEADLINER: @FOURCOLORZACK', badges: ['HEADLINER: @FOURCOLORZACK', 'OPENER: @DJ_QUAD'], tags: ['PoliticalParty', 'Gala', 'MidnightChicago'] };
      }
      if (item.id === 'e4') {
        return { ...item, title: 'Regency Inn Banquets', subtitle: "Paola's 70th Birthday Party", tags: ['Celebration', '70AndGolden', 'Atmosphere'] };
      }
      return item;
    });
    setEventItems(updated);
  }, []);

  return (
    <div id="events-page" className="pt-24 min-h-screen bg-[#0C0C0C] text-white border-b border-white/10">
      
      {/* Editorial Header Hero Banner */}
      <div className="relative h-[45vh] min-h-[350px] flex items-center justify-center bg-[#0C0C0C] overflow-hidden border-b border-white/10">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 scale-105"
          style={{
            backgroundImage: `url(${chicagoGalaLounge})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-transparent to-[#0C0C0C]" />
        
        <div className="relative z-10 text-center max-w-4xl px-6 space-y-4">
          <span className="text-white/50 text-[10px] tracking-[0.4em] uppercase font-semibold font-mono block animate-fade-in">
            Guzzi Corporate & Private
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-white tracking-tight font-light">
            Events
          </h1>
          <div className="h-[1px] w-12 bg-white/20 mx-auto mt-4"></div>
          <p className="text-white/60 text-[10px] md:text-xs tracking-widest font-mono uppercase">
            Sophisticated Candid Documentation &bull; Chicago &bull; Midwest
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        
        {/* Intro Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 border-b border-white/10 pb-16">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-white/50 text-[10px] tracking-[0.3em] uppercase font-semibold font-mono block">
              Elevating the Narrative
            </span>
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight leading-tight font-light">
              Making Corporate & <br />
              Private Events Feel Cinematic.
            </h2>
          </div>
          <div className="lg:col-span-7 text-white/70 text-sm md:text-base font-light space-y-4 leading-relaxed font-sans">
            <p>
              Corporate events, annual fundraisers, museum galas, and private anniversary celebrations do not have to feel stuffy or rigid. At Guzzi Photography, we apply our signature fashion-editorial, low-light composition strategies to high-level affairs.
            </p>
            <p>
              We treat your venue’s custom architecture, fine décor, and VIP guests with absolute aesthetic respect. We coordinate seamlessly with event managers and marketing directors, providing high-resolution, magazine-ready assets with an exceptionally rapid turnaround.
            </p>
          </div>
        </div>

        {/* The Bento-style Grid or Spread list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {eventItems.map((item) => (
            <div
              key={item.id}
              className="group border border-white/10 p-4 bg-[#111111]/30 hover:bg-[#111111]/80 hover:border-white/20 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between rounded-sm"
            >
              <div className="space-y-4">
                <div className="aspect-[4/3] w-full overflow-hidden bg-zinc-950 rounded-sm relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/45 transition-colors" />
                  <div className="absolute top-4 left-4 bg-black/85 backdrop-blur-sm text-[8px] text-white/80 font-mono tracking-widest px-2.5 py-0.5 uppercase">
                    Event File
                  </div>
                  <div className="absolute bottom-3 left-3 flex flex-col gap-1 items-start">
                    {item.badges && item.badges.length > 0 ? (
                      item.badges.map((b, bIdx) => (
                        <div
                          key={bIdx}
                          className="bg-black/80 backdrop-blur-sm text-[8px] text-white/80 font-mono tracking-widest px-2.5 py-0.5 uppercase"
                        >
                          {b}
                        </div>
                      ))
                    ) : item.badge ? (
                      <div className="bg-black/80 backdrop-blur-sm text-[8px] text-white/80 font-mono tracking-widest px-2.5 py-0.5 uppercase">
                        {item.badge}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[9px] text-white/50 font-mono uppercase tracking-wider">
                    <span className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1 text-white/40" />
                      {item.location}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl md:text-2xl text-white font-light tracking-wide group-hover:text-white/80 transition-colors">
                    {item.title}
                  </h3>
                  {item.subtitle && (
                    <p className="text-white/50 text-xs italic font-sans font-light">
                      {item.subtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Tags & Action CTA */}
              <div className="border-t border-white/10 pt-4 mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1">
                  {item.tags?.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 bg-white/5 text-[9px] text-white/70 border border-white/10 font-mono rounded-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-[10px] tracking-[0.2em] uppercase font-bold text-white hover:text-white/60 transition-colors flex items-center cursor-pointer font-sans"
                >
                  Book Event &bull; Inquire
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Corporate Trust Banner */}
        <div className="mt-32 border border-white/10 p-8 md:p-12 rounded-sm bg-[#111111]/40 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center space-x-2">
              <Building className="w-5 h-5 text-white/40" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-white/50 font-mono">B2B Event Partnerships</span>
            </div>
            <h3 className="font-serif text-2xl text-white font-light tracking-wide">
              Rapid 48-Hour Press Image Deliveries
            </h3>
            <p className="text-white/60 text-xs md:text-sm font-sans font-light leading-relaxed">
              We understand PR cycles. For all major corporate fundraisers and society galas, we deliver a curated "Press Ready Highlight Folder" containing 25 fully color-graded images within 48 hours of the event climax. Fully insured, venue COIs provided instantly.
            </p>
          </div>
          
          <button
            onClick={() => {
              onNavigate('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full md:w-auto px-8 py-4 bg-white hover:bg-white/85 text-black text-xs font-semibold tracking-widest uppercase transition-all shadow-md cursor-pointer font-sans flex-shrink-0"
          >
            Inquire For Event Date
          </button>
        </div>

      </div>
    </div>
  );
}
