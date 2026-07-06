import { useState, useEffect } from 'react';
import { PortfolioItem } from '../types';
import { portfolioItems as defaultPortfolioItems } from '../data';
import { MapPin, Radio } from 'lucide-react';
import djCloseupHands from '../assets/images/dj_pioneer_two_hands_centered_1782758087409.jpg';

interface DjsArtistsPageProps {
  onNavigate: (view: string) => void;
}

export default function DjsArtistsPage({ onNavigate }: DjsArtistsPageProps) {
  const [djItems, setDjItems] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('guzzi_portfolio');
    let items: PortfolioItem[] = [];
    if (stored) {
      const parsed = JSON.parse(stored) as PortfolioItem[];
      items = parsed.filter(item => item.category === 'djs-artists');
    } else {
      items = defaultPortfolioItems.filter(item => item.category === 'djs-artists');
    }
    const updated = items.map(item => {
      if (item.id === 'd1') {
        return { ...item, title: 'Celest', badge: 'HEADLINER DJ: @NEIV.DJ', subtitle: "International Woman's Day", location: 'RIVER NORTH, CHICAGO', tags: ['GirlsToTheFront', 'CelesteAfterDark', 'FlashFever'] };
      }
      if (item.id === 'd5') {
        return { ...item, title: 'PRYSM', subtitle: 'Lollapalooza Aftershow', location: 'LINCOLN PARK, CHICAGO', tags: ['LollaAfterParty', 'NeonAndNuance', 'AmplifiedAura'], badge: 'HEADLINER DJ: @FORESTERMUSIC', badges: ['HEADLINER DJ: @FORESTERMUSIC', 'OPENER: @NEIV.DJ'] };
      }
      if (item.id === 'd3') {
        return { ...item, title: 'Crash Site : Music Video BTS', subtitle: "Hosted by the owners of Harold's Chicken", location: 'CRETE, IL', badge: 'RAPPER: @BOOMANFOREVER', badges: ['RAPPER: @BOOMANFOREVER', 'Production: @TranceProductions', 'Host: @CowboyTip'], tags: ['TransProductionsBTS', 'CosmicCowboy', 'MildSauceMuses'] };
      }
      if (item.id === 'd4') {
        return { ...item, title: 'Kashmir', subtitle: 'Subversive rhythms wrapped in green onyx and velvet', location: 'FULTON MARKET, CHICAGO', badge: 'HEADLINER: @GIANNIBLU', badges: ['HEADLINER: @GIANNIBLU', 'OPENER: NEIV.DJ'], tags: ['DecadenceOnDecks', 'OnyxAndAudio', 'FultonMarketFrequencies'] };
      }
      if (item.id === 'd2') {
        return { ...item, title: 'Chop Shop', subtitle: 'Industrial Foundations Met With Unyielding Frequencies', location: 'WICKER PARK, CHICAGO', badge: 'HEADLINER: @TVVIN.OC', badges: ['HEADLINER: @TVVIN.OC', 'OPENERS: @ALLIEVERBEKE & @NEIV.DJ'], tags: ['StrobesAndSteel', 'LowLightLoudRooms', 'GridAndGrit'] };
      }
      if (item.id === 'd6') {
        return { ...item, title: 'Redline Chicago', subtitle: 'Featuring Deep Underground Techno Afterhours Session', location: 'WEST LOOP, CHICAGO', year: '2024', tags: ['AfterHours', 'Underground', 'Lasers'], badge: 'HEADLINERS: @_HHUNTER_ & @KULAAAA', badges: ['HEADLINERS: @_HHUNTER_ & @KULAAAA'] };
      }
      return item;
    });

    // Swap positions of d1 and d5 to respect layout changes requested by user (ensure d5 is before d1)
    const d1Idx = updated.findIndex(item => item.id === 'd1');
    const d5Idx = updated.findIndex(item => item.id === 'd5');
    if (d1Idx !== -1 && d5Idx !== -1) {
      const temp = updated[d1Idx];
      updated[d1Idx] = updated[d5Idx];
      updated[d5Idx] = temp;
    }

    // Swap positions of d1 and d3 (the 2nd and 3rd elements in the current layout list)
    const d1NewIdx = updated.findIndex(item => item.id === 'd1');
    const d3Idx = updated.findIndex(item => item.id === 'd3');
    if (d1NewIdx !== -1 && d3Idx !== -1) {
      const temp = updated[d1NewIdx];
      updated[d1NewIdx] = updated[d3Idx];
      updated[d3Idx] = temp;
    }

    setDjItems(updated);
  }, []);

  return (
    <div id="djs-artists-page" className="pt-24 min-h-screen bg-[#0C0C0C] text-white border-b border-white/10">
      
      {/* Editorial Header Hero Banner */}
      <div className="relative h-[55vh] min-h-[400px] flex items-center justify-center overflow-hidden border-b border-white/10">
        {/* Gritty high-contrast dark image overlay background */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 scale-105 grayscale"
          style={{
            backgroundImage: `url(${djCloseupHands})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-transparent to-[#0C0C0C]" />
        
        <div className="relative z-10 text-center max-w-4xl px-6 space-y-4">
          <span className="text-white/50 text-[10px] tracking-[0.4em] uppercase font-semibold font-mono block animate-fade-in">
            GUZZI NIGHTLIFE
          </span>
          <h1 className="font-serif text-4xl md:text-7xl tracking-tight text-white leading-none font-light">
            Artists & DJs
          </h1>
          <div className="h-[1px] w-16 bg-white/20 mx-auto mt-4"></div>
          <p className="text-white/60 text-[10px] tracking-[0.25em] font-mono uppercase">
            MUSIC ARTIST PHOTOGRAPHY
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 relative z-10">
        
        {/* Editorial Grit Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 border-b border-white/10 pb-16">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-white/50 text-[10px] tracking-[0.3em] uppercase font-semibold font-mono block">
              Chicago House Heritage
            </span>
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight leading-tight text-white font-light">
              Bass, Lasers & <br />Behind-the-Scenes.
            </h2>
          </div>
          <div className="lg:col-span-7 text-white/70 text-sm md:text-base font-light space-y-4 leading-relaxed font-sans">
            <p>
              Chicago is the spiritual home of house music. Photographing local and touring DJs, producers, and nightlife artists requires more than just holding a camera—it requires translating <span className="text-white font-semibold">sound, sweat, and electricity</span> into high-impact visual frames.
            </p>
            <p>
              Luis Guzman bridges high-end commercial fashion-editorial portraits with the raw, high-energy adrenaline of club main stages. Whether it is a studio promo package, a behind-the-scenes festival tour diary, or high-octane laser-sync nightlife coverage, we hand-craft imagery that elevates your brand and locks in bookings.
            </p>
          </div>
        </div>

        {/* Cinematic Magazine Layout List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {djItems.map((item) => (
            <div
              key={item.id}
              className="group border border-white/10 bg-[#111111]/30 p-4 hover:bg-[#111111]/80 hover:border-white/20 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between rounded-sm"
            >
              <div className="space-y-4">
                <div className="aspect-[4/3] w-full overflow-hidden bg-zinc-950 rounded-sm relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/45 transition-colors" />
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
                    ) : (
                      <div className="bg-black/80 backdrop-blur-sm text-[8px] text-white/80 font-mono tracking-widest px-2.5 py-0.5 uppercase">
                        {item.badge || 'Artist Doc'}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[9px] text-white/50 font-mono uppercase tracking-wider">
                    <span className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1 text-white/40" />
                      {item.location}
                    </span>
                    <span>{item.year || '2025'}</span>
                  </div>

                  <h3 className="font-serif text-lg md:text-xl text-white font-light group-hover:text-white/80 transition-colors tracking-wide leading-tight">
                    {item.title}
                  </h3>
                  {item.subtitle && (
                    <p className="text-white/50 text-xs italic font-sans font-light">
                      {item.subtitle.startsWith('Featuring') || item.id === 'd1' || item.id === 'd3' || item.id === 'd5' || item.id === 'd4' ? item.subtitle : `Featuring ${item.subtitle}`}
                    </p>
                  )}
                </div>
              </div>

              {/* Tags & Actions */}
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
                  className="text-[9px] tracking-[0.2em] uppercase font-bold text-white/80 hover:text-white transition-colors cursor-pointer font-sans"
                >
                  Book Artist Promo
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Nightlife Technical Accents with Grid Background */}
        <div className="relative mt-24 py-16 px-6 -mx-6 md:-mx-12 overflow-hidden">
          {/* Grid background with fade-out masks */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
          
          {/* Gradients to fade grid background into darkness at top and bottom */}
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0C0C0C] to-transparent pointer-events-none z-0" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0C0C0C] to-transparent pointer-events-none z-0" />

          <div className="relative z-10 p-8 md:p-16 border border-white/10 bg-[#111111] text-center rounded-sm overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:20px_20px] opacity-5 pointer-events-none" />
            
            <div className="max-w-2xl mx-auto space-y-6 relative z-10">
              <Radio className="w-6 h-6 text-white/40 mx-auto" />
              <h3 className="font-serif text-3xl tracking-tight font-light">
                DJ's & Music Artist's
              </h3>
              <p className="text-white/60 text-xs md:text-sm font-sans font-light leading-relaxed">
                We specialize in full-scale artist representation. From studio portraits and product sponsorships to live concert coverage, we curate your press pack with high-end editorial aesthetics that help you stand out.
              </p>

              <div className="pt-4">
                <button
                  onClick={() => {
                    onNavigate('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-8 py-3.5 bg-white hover:bg-white/80 text-black text-xs font-semibold tracking-widest uppercase transition-all duration-300 cursor-pointer"
                >
                  Inquire For Promo Package
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
