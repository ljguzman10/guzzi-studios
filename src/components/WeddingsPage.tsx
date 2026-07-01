import { useState, useEffect } from 'react';
import { PortfolioItem } from '../types';
import { portfolioItems as defaultPortfolioItems } from '../data';
import { MapPin, Sparkles } from 'lucide-react';

interface WeddingsPageProps {
  onNavigate: (view: string) => void;
}

export default function WeddingsPage({ onNavigate }: WeddingsPageProps) {
  const [weddingItems, setWeddingItems] = useState<PortfolioItem[]>([]);

useEffect(() => {
    const stored = localStorage.getItem('guzzi_portfolio');
    if (stored) {
      const parsed = JSON.parse(stored) as PortfolioItem[];
      const updated = parsed.map(item => {
        if (item.id === 'w1') {
          return { ...item, title: 'Cantigny Park', location: 'Wheaton, IL', subtitle: 'Beth & Trevor', image: new URL('../assets/images/regenerated_image_1782436761072.jpg', import.meta.url).href, tags: ['EditorialLove', 'LuxeFlora', 'Historic'] };
        }
        if (item.id === 'w2') {
          return { ...item, title: 'Estate Wedding', location: 'Chicago, IL', subtitle: 'Tessa & Douglas', image: new URL('../assets/images/regenerated_image_1782504926122.jpg', import.meta.url).href, year: '2024' };
        }
        if (item.id === 'w3') {
          return { ...item, title: 'Navy Pier', location: 'Chicago, IL', subtitle: 'Steven & Steven', image: new URL('../assets/images/regenerated_image_1782511010199.jpg', import.meta.url).href, year: '2025', tags: ['AnchoredAtThePier', 'SparksFly', 'BoatCeremony'] };
        }
        if (item.id === 'w4') {
          return { ...item, title: 'Mag Mile Engagement Party', subtitle: 'Makaela & Diego', image: new URL('../assets/images/regenerated_image_1782516236476.jpg', import.meta.url).href, tags: ['Vintage', 'Urban', 'UpAbove'] };
        }
        if (item.id === 'w5') {
          return { ...item, title: 'Bar Avec Anniversary', location: 'Chicago, IL', subtitle: 'Katherine & Cliff', image: new URL('../assets/images/regenerated_image_1782523040836.jpg', import.meta.url).href, tags: ['Anniversary', 'Views', 'Golden Hour'] };
        }
        if (item.id === 'w6') {
          return { ...item, title: 'Saint Mary of The Angels Church', subtitle: 'Guadalupe & Andy', image: new URL('../assets/images/regenerated_image_1782519856684.jpg', import.meta.url).href, location: 'Chicago, IL', year: '2024', tags: ['Industrial Chic', 'Traditional', 'Candid'] };
        }
        return item;
      });
      
      // Swap positions of w2 and w6 to respect layout changes requested by user (ensure w6 is before w2)
      const w2Idx = updated.findIndex(item => item.id === 'w2');
      const w6Idx = updated.findIndex(item => item.id === 'w6');
      if (w2Idx !== -1 && w6Idx !== -1 && w2Idx < w6Idx) {
        const temp = updated[w2Idx];
        updated[w2Idx] = updated[w6Idx];
        updated[w6Idx] = temp;
      }

      // Swap positions of w4 and w6 to respect layout changes requested by user (ensure w6 is before w4)
      const w4Idx = updated.findIndex(item => item.id === 'w4');
      const w6IdxNew = updated.findIndex(item => item.id === 'w6');
      if (w4Idx !== -1 && w6IdxNew !== -1 && w4Idx < w6IdxNew) {
        const temp = updated[w4Idx];
        updated[w4Idx] = updated[w6IdxNew];
        updated[w6IdxNew] = temp;
      }

      if (JSON.stringify(parsed) !== JSON.stringify(updated)) {
        localStorage.setItem('guzzi_portfolio', JSON.stringify(updated));
      }
      setWeddingItems(updated.filter(item => item.category === 'weddings'));
    } else {
      setWeddingItems(defaultPortfolioItems.filter(item => item.category === 'weddings'));
    }
  }, []);

  const signatureQuotes = [
    "Youthful devotion framed by manicured garden elegance. Translating raw, high-end romance into a cinematic narrative.",
    "Capturing the visual rhythm of your legacy. Bold, avant-garde poetry for an iconic love story.",
    "Slowing down time amidst the kinetic rhythm of the city. Translating grand skyline architecture into intimate, high-end narratives.",
    "Capturing contemporary elegance against a backdrop of glass and steel. Where upscale city style meets an intimate, iconic celebration.",
    "Elevating your love above the glittering skyline. Translating the warm glow of twilight and sophisticated rooftop glamour into a candid.",
    "Chasing golden shafts of light beneath soaring, historic domes. Translating timeless cathedral grandeur and sacred, eternal vows into visual poetry."
  ];

  const getQuote = (item: PortfolioItem, idx: number) => {
    const quotesMap: Record<string, string> = {
      'w1': "Youthful devotion framed by manicured garden elegance. Translating raw, high-end romance into a cinematic narrative.",
      'w2': "Capturing the visual rhythm of your legacy. Bold, avant-garde poetry for an iconic love story.",
      'w3': "Slowing down time amidst the kinetic rhythm of the city. Translating grand skyline architecture into intimate, high-end narratives.",
      'w4': "Capturing contemporary elegance against a backdrop of glass and steel. Where upscale city style meets an intimate, iconic celebration.",
      'w5': "Elevating your love above the glittering skyline. Translating the warm glow of twilight and sophisticated rooftop glamour into a candid.",
      'w6': "Chasing golden shafts of light beneath soaring, historic domes. Translating timeless cathedral grandeur and sacred, eternal vows into visual poetry."
    };
    return quotesMap[item.id] || signatureQuotes[idx % signatureQuotes.length];
  };

  return (
    <div id="weddings-page" className="pt-24 min-h-screen bg-[#0C0C0C] text-white border-b border-white/10">
      
      {/* Editorial Header Hero Banner */}
      <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center bg-[#0C0C0C] overflow-hidden border-b border-white/10">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 scale-105 transition-all duration-[3000ms]"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1600')`,
          }}
        />
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-transparent to-[#0C0C0C]" />
        
        <div className="relative z-10 text-center max-w-4xl px-6 space-y-4">
          <span className="text-white/50 text-[10px] tracking-[0.4em] uppercase font-semibold font-mono block">
            Guzzi Bridal & Fine Art
          </span>
          <h1 className="font-serif text-5xl md:text-7xl text-white tracking-tight font-light">
            The Wedding Experience
          </h1>
          <div className="h-[1px] w-16 bg-white/20 mx-auto mt-4"></div>
          <p className="text-white/60 text-[10px] tracking-widest font-mono uppercase mt-2">
            Chicago &bull; Milwaukee &bull; Indianapolis &bull; Destination
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        
        {/* Intro Manifesto block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 border-b border-white/10 pb-16">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-white/50 text-[10px] tracking-[0.3em] uppercase font-semibold font-mono block">
              Our Artistic Perspective
            </span>
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight leading-tight font-light">
              “Chicago Grit <br />
              Meets Luxury Wedding Photography.”
            </h2>
          </div>
          <div className="lg:col-span-7 text-white/70 text-sm md:text-base font-light space-y-4 leading-relaxed">
            <p>
              We believe a wedding is not a stuffy photoshoot—it is an unpredictable, magnificent celebration of raw humanity. Our approach balances the absolute precision of fine-art editorial portraits (making you and your loved ones feel spectacular and natural) with the fast-paced instinct of documentary journalism.
            </p>
            <p>
              Luis Guzman documents the subtle glances, the tearful speeches, and the explosive energy of the dance floor. With over 200 weddings documented across the Midwest, we provide an elite, stress-free partnership that transforms your moments into historic, visual poetry.
            </p>
          </div>
        </div>

        {/* The Magazine Layout Gallery Spread */}
        <div className="space-y-24">
          {weddingItems.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={item.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Image panel (7 columns) */}
                <div className={`lg:col-span-7 relative ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="relative z-10 border border-white/10 bg-[#111111] p-4 shadow-2xl">
                    <div className="aspect-[3/2] overflow-hidden bg-zinc-950 rounded-sm">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover hover:scale-102 transition-all duration-[1200ms]"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  {/* Backdrop subtle luxury block */}
                  <div className={`absolute -bottom-6 -top-6 bg-white/2 pointer-events-none rounded-sm hidden lg:block ${
                    isEven ? '-left-6 right-12' : '-right-6 left-12'
                  }`} />
                </div>

                {/* Text Content (5 columns) */}
                <div className={`lg:col-span-5 space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono text-white/50 uppercase tracking-widest">
                      <span className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1 text-white/30" />
                        {item.location}
                      </span>
                      <span>Year: {item.year || '2025'}</span>
                    </div>
                    <h3 className="font-serif text-2xl md:text-3xl text-white font-light tracking-wide leading-tight">
                      {item.title}
                    </h3>
                    {item.subtitle && (
                      <p className="text-white/50 italic text-sm font-sans font-light">
                        Celebrating {item.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Decorative quote segment */}
                  <p className="font-serif italic text-white/80 text-sm leading-relaxed border-l-2 border-white/30 pl-4 py-1">
                    "{getQuote(item, index)}"
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {item.tags?.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 bg-white/5 border border-white/10 text-[9px] text-white/70 font-mono rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => onNavigate('contact')}
                      className="px-6 py-3 border border-white/25 text-white hover:bg-white hover:text-black hover:border-white transition-all text-xs tracking-[0.2em] font-semibold uppercase cursor-pointer"
                    >
                      Inquire About Your Date
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Badges Footer inside page */}
        <div className="mt-32 p-12 bg-[#111111]/40 border border-white/10 text-white text-center rounded-sm space-y-8 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
          
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <Sparkles className="w-6 h-6 text-white/60 mx-auto" />
            <h3 className="font-serif text-3xl tracking-tight font-light">
              Ready to Capture Your Legacy?
            </h3>
            <p className="text-white/60 text-xs md:text-sm font-sans font-light leading-relaxed">
              We accept a highly limited number of weddings each year to ensure absolute dedication, meticulous handcrafted editing, and an elite personal partnership with our couples.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <button
              onClick={() => {
                onNavigate('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 bg-white hover:bg-white/80 text-black text-xs font-semibold tracking-widest uppercase transition-all duration-300 cursor-pointer"
            >
              Reserve Your Date
            </button>
            <button
              onClick={() => {
                onNavigate('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 bg-transparent border border-white/20 hover:border-white/60 text-white text-xs font-semibold tracking-widest uppercase transition-all duration-300 cursor-pointer"
            >
              Meet Luis Guzman
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
