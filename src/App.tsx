import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutLuisSection from './components/AboutLuisSection';
import PortfolioCategories from './components/PortfolioCategories';
import WeddingProcess from './components/WeddingProcess';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';

// Dedicated Page Views
import WeddingsPage from './components/WeddingsPage';
import EventsPage from './components/EventsPage';
import DjsArtistsPage from './components/DjsArtistsPage';
import AboutPage from './components/AboutPage';
import PricingPage from './components/PricingPage';
import ContactPage from './components/ContactPage';
import CareersPage from './components/CareersPage';
import WebDesignPage from './components/WebDesignPage';

import { PortfolioItem, BlogPost, Inquiry } from './types';
import { portfolioItems as defaultPortfolioItems, blogPosts as defaultBlogPosts } from './data';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [adminOpen, setAdminOpen] = useState<boolean>(false);
  
  // Dynamic collections that sync with localStorage (enables CMS to reflect live!)
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Load and synchronize dynamic database from localStorage
  useEffect(() => {
    // 1. Portfolio items
    const storedPortfolio = localStorage.getItem('guzzi_portfolio');
    if (storedPortfolio) {
      const parsed = JSON.parse(storedPortfolio) as PortfolioItem[];
      
      // Ensure all default items exist in parsed list
      let merged = [...parsed];
      defaultPortfolioItems.forEach(defaultItem => {
        if (!merged.some(item => item.id === defaultItem.id)) {
          merged.push(defaultItem);
        }
      });

      const updated = merged.map(item => {
        const defaultItem = defaultPortfolioItems.find(d => d.id === item.id);
        if (item.id === 'w1') {
          return { ...item, title: 'Cantigny Park', location: 'Wheaton, IL', subtitle: 'Beth & Trevor', image: new URL('./assets/images/regenerated_image_1782436761072.jpg', import.meta.url).href, tags: ['EditorialLove', 'LuxeFlora', 'Historic'] };
        }
        if (item.id === 'w2') {
          return { ...item, title: 'Estate Wedding', location: 'Chicago, IL', subtitle: 'Tessa & Douglas', image: new URL('./assets/images/regenerated_image_1782504926122.jpg', import.meta.url).href, year: '2024' };
        }
        if (item.id === 'w3') {
          return { ...item, title: 'Navy Pier', location: 'Chicago, IL', subtitle: 'Steven & Steven', image: new URL('./assets/images/regenerated_image_1782511010199.jpg', import.meta.url).href, year: '2025', tags: ['AnchoredAtThePier', 'SparksFly', 'BoatCeremony'] };
        }
        if (item.id === 'w4') {
          return { ...item, title: 'Mag Mile Engagement Party', subtitle: 'Makaela & Diego', image: new URL('./assets/images/regenerated_image_1782516236476.jpg', import.meta.url).href };
        }
        if (item.id === 'w5') {
          return { ...item, title: 'Bar Avec Anniversary', location: 'Chicago, IL', subtitle: 'Katherine & Cliff', image: new URL('./assets/images/regenerated_image_1782523040836.jpg', import.meta.url).href };
        }
        if (item.id === 'w6') {
          return { ...item, title: 'Saint Mary of The Angels Church', subtitle: 'Guadalupe & Andy', image: new URL('./assets/images/regenerated_image_1782519856684.jpg', import.meta.url).href, location: 'Chicago, IL', year: '2024', tags: ['Industrial Chic', 'Traditional', 'Candid'] };
        }
        if (item.id === 'd1') {
          return { ...item, title: 'Celest', badge: 'HEADLINER DJ: @NEIV.DJ', subtitle: "International Woman's Day", location: 'RIVER NORTH, CHICAGO', tags: ['GirlsToTheFront', 'CelesteAfterDark', 'FlashFever'], image: new URL('./assets/images/regenerated_image_1783364630944.jpg', import.meta.url).href };
        }
        if (item.id === 'd5') {
          return { ...item, title: 'PRYSM', subtitle: 'Lollapalooza Aftershow', location: 'LINCOLN PARK, CHICAGO', tags: ['LollaAfterParty', 'NeonAndNuance', 'AmplifiedAura'], badge: 'HEADLINER DJ: @FORESTERMUSIC', badges: ['HEADLINER DJ: @FORESTERMUSIC', 'OPENER: @NEIV.DJ'], image: new URL('./assets/images/club_crowd_lasers_1782855555903.jpg', import.meta.url).href };
        }
        if (item.id === 'd3') {
          return { ...item, title: 'Crash Site : Music Video BTS', subtitle: "Hosted by the owners of Harold's Chicken", location: 'CRETE, IL', badge: 'RAPPER: @BOOMANFOREVER', badges: ['RAPPER: @BOOMANFOREVER', 'Production: @TranceProductions', 'Host: @CowboyTip'], tags: ['TransProductionsBTS', 'CosmicCowboy', 'MildSauceMuses'], image: new URL('./assets/images/crash_site_bts_1783370119061.jpg', import.meta.url).href };
        }
        if (item.id === 'd4') {
          return { ...item, title: 'Kashmir', subtitle: 'Subversive rhythms wrapped in green onyx and velvet', location: 'FULTON MARKET, CHICAGO', badge: 'HEADLINER: @GIANNIBLU', badges: ['HEADLINER: @GIANNIBLU', 'OPENER: NEIV.DJ'], tags: ['DecadenceOnDecks', 'OnyxAndAudio', 'FultonMarketFrequencies'], image: new URL('./assets/images/regenerated_image_1783368986162.jpg', import.meta.url).href };
        }
        if (item.id === 'd2') {
          return { ...item, title: 'Chop Shop', subtitle: 'Industrial Foundations Met With Unyielding Frequencies', location: 'WICKER PARK, CHICAGO', badge: 'HEADLINER: @TVVIN.OC', badges: ['HEADLINER: @TVVIN.OC', 'OPENERS: @ALLIEVERBEKE & @NEIV.DJ'], tags: ['StrobesAndSteel', 'LowLightLoudRooms', 'GridAndGrit'] };
        }
        if (item.id === 'd6') {
          return { ...item, title: 'Redline Chicago', subtitle: 'Featuring Deep Underground Techno Afterhours Session', location: 'WEST LOOP, CHICAGO', year: '2024', tags: ['AfterHours', 'Underground', 'Lasers'], badge: 'HEADLINERS: @_HHUNTER_ & @KULAAAA', badges: ['HEADLINERS: @_HHUNTER_ & @KULAAAA'], image: new URL('./assets/images/regenerated_image_1783367220371.jpg', import.meta.url).href };
        }
        if (item.id === 'e1') {
          return { ...item, title: 'Penthouse NYE Party', subtitle: "Hosted by Social Hunt Club with Big Local DJ's", tags: ['PenthouseNYE', 'Luxury Corporate', 'Cultural'], image: defaultItem?.image || item.image };
        }
        if (item.id === 'e2') {
          return { ...item, title: 'Quinceañera', subtitle: "Where heritage meets the urban skyline", location: 'LINCOLN PARK, CHICAGO', tags: ['TheGrandDebut', 'Tradition', 'SatinInTheSaddle'], image: defaultItem?.image || item.image };
        }
        if (item.id === 'e3') {
          return { ...item, title: 'Joes On Weed St.: DNC Party', subtitle: 'Official Democratic National Committee After Party', location: 'GOOSE ISLAND, CHICAGO', tags: ['PoliticalParty', 'Gala', 'MidnightChicago'] };
        }
        if (item.id === 'e4') {
          return { ...item, title: 'Regency Inn Banquets', subtitle: "Paola's 70th Birthday Party", tags: ['Celebration', '70AndGolden', 'Atmosphere'] };
        }
        return item;
      });

      // Swap positions of d1 and d5 to respect layout changes requested by user (ensure d5 is before d1)
      const d1Index = updated.findIndex(item => item.id === 'd1');
      const d5Index = updated.findIndex(item => item.id === 'd5');
      if (d1Index !== -1 && d5Index !== -1) {
        const temp = updated[d1Index];
        updated[d1Index] = updated[d5Index];
        updated[d5Index] = temp;
      }

      // Swap positions of d1 and d3 (the 2nd and 3rd elements in the current layout list)
      const d1NewIndex = updated.findIndex(item => item.id === 'd1');
      const d3Index = updated.findIndex(item => item.id === 'd3');
      if (d1NewIndex !== -1 && d3Index !== -1) {
        const temp = updated[d1NewIndex];
        updated[d1NewIndex] = updated[d3Index];
        updated[d3Index] = temp;
      }

      // Swap positions of w4 and w6 to respect layout changes requested by user (ensure w6 is before w4)
      const w4Index = updated.findIndex(item => item.id === 'w4');
      const w6Index = updated.findIndex(item => item.id === 'w6');
      if (w4Index !== -1 && w6Index !== -1 && w4Index < w6Index) {
        const temp = updated[w4Index];
        updated[w4Index] = updated[w6Index];
        updated[w6Index] = temp;
      }

      if (JSON.stringify(parsed) !== JSON.stringify(updated)) {
        localStorage.setItem('guzzi_portfolio', JSON.stringify(updated));
      }
      setPortfolio(updated);
    } else {
      localStorage.setItem('guzzi_portfolio', JSON.stringify(defaultPortfolioItems));
      setPortfolio(defaultPortfolioItems);
    }

    // 2. Blog Posts
    const storedBlogs = localStorage.getItem('guzzi_blogs');
    if (storedBlogs) {
      setBlogs(JSON.parse(storedBlogs));
    } else {
      localStorage.setItem('guzzi_blogs', JSON.stringify(defaultBlogPosts));
      setBlogs(defaultBlogPosts);
    }
  }, [refreshTrigger, adminOpen]);

  // Check session if admin parameter is present in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromQuery = params.get('token');
    if (tokenFromQuery) {
      localStorage.setItem('admin_token', tokenFromQuery);
    }

    const activeToken = tokenFromQuery || localStorage.getItem('admin_token');
    
    if (params.get('admin') === 'true') {
      const fetchUrl = activeToken ? `/api/admin/session?token=${encodeURIComponent(activeToken)}` : '/api/admin/session';
      const headers: Record<string, string> = {};
      if (activeToken) {
        headers['Authorization'] = `Bearer ${activeToken}`;
      }

      fetch(fetchUrl, { headers })
        .then(res => res.json())
        .then(data => {
          if (data.isAdmin) {
            setAdminOpen(true);
            // Clean URL query param
            window.history.replaceState({}, document.title, window.location.pathname);
          } else {
            localStorage.removeItem('admin_token');
            window.location.href = '/login';
          }
        })
        .catch(() => {
          localStorage.removeItem('admin_token');
          window.location.href = '/login';
        });
    } else {
      // Clear admin token on launch if not explicitly opening the admin panel
      localStorage.removeItem('admin_token');
    }
  }, []);

  // Handle a refresh from Admin Panel CMS updates
  const handleRefreshData = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  // Callback for live CRM updates
  const handleNewInquirySubmitted = (newInq: Inquiry) => {
    handleRefreshData();
  };

  const handleOpenAdmin = () => {
    // Clear token and redirect to login screen for fully locked behavior
    localStorage.removeItem('admin_token');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-white selection:bg-white/20 flex flex-col justify-between">
      
      {/* 1. STICKY LUXURY NAVIGATION */}
      <Header
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* 2. MAIN ACTIVE VIEW ROUTER */}
      <main className="flex-grow">
        
        {currentView === 'home' && (
          <div className="animate-fade-in">
            {/* Hero & Slideshow */}
            <Hero onNavigate={(view) => setCurrentView(view)} />

            {/* specialties and Filtered sample portfolio */}
            <PortfolioCategories
              onNavigate={(view) => setCurrentView(view)}
              portfolioItems={portfolio}
            />

            {/* Meet Luis Teaser */}
            <AboutLuisSection onNavigate={(view) => setCurrentView(view)} />

            {/* Step by Step Wedding Process */}
            <WeddingProcess onNavigate={(view) => setCurrentView(view)} />

            {/* Homepage Final Emotional CTA */}
            <section className="relative py-28 md:py-36 bg-[#0C0C0C] overflow-hidden border-b border-white/10">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-20 scale-102"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1519225495810-7512c696505a?auto=format&fit=crop&q=80&w=1600')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-transparent to-[#0C0C0C]" />
              
              <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6">
                <span className="text-white/50 text-[10px] tracking-[0.3em] uppercase font-semibold font-mono block">
                  Midwest & Regional Booking
                </span>
                <h2 className="font-serif text-3xl md:text-5xl text-white tracking-tight font-light">
                  Let’s Tell Your Story
                </h2>
                <div className="h-[1px] w-12 bg-white/20 mx-auto mt-2"></div>
                <p className="text-white/60 max-w-xl mx-auto text-xs md:text-sm font-sans font-light leading-relaxed">
                  Now booking weddings, premium society events, and artist promo diaries throughout Illinois, Wisconsin, Indiana, and destination locations worldwide.
                </p>
                <div className="pt-6 flex flex-col items-center gap-4">
                  <button
                    onClick={() => {
                      setCurrentView('contact');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-10 py-4 bg-white hover:bg-white/80 text-black font-semibold text-xs tracking-widest uppercase transition-all duration-300 shadow-xl cursor-pointer rounded-sm"
                  >
                    Check Date Availability
                  </button>
                  <button
                    onClick={() => {
                      setCurrentView('pricing');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-10 py-4 bg-gold-200 hover:bg-gold-100 text-[#0C0C0C] border border-gold-200 font-semibold text-xs tracking-widest uppercase transition-all duration-300 shadow-[0_0_15px_rgba(229,222,179,0.25)] cursor-pointer rounded-sm"
                  >
                    CHECK OUR PRICES
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {currentView === 'weddings' && (
          <WeddingsPage onNavigate={(view) => setCurrentView(view)} />
        )}

        {currentView === 'events' && (
          <EventsPage onNavigate={(view) => setCurrentView(view)} />
        )}

        {currentView === 'djs-artists' && (
          <DjsArtistsPage onNavigate={(view) => setCurrentView(view)} />
        )}

        {currentView === 'about' && (
          <AboutPage onNavigate={(view) => setCurrentView(view)} />
        )}

        {currentView === 'pricing' && (
          <PricingPage onNavigate={(view) => setCurrentView(view)} />
        )}

        {currentView === 'contact' && (
          <ContactPage
            onSuccessSubmit={handleNewInquirySubmitted}
            defaultType="wedding"
            onNavigate={(view) => setCurrentView(view)}
          />
        )}

        {currentView === 'careers' && (
          <CareersPage onNavigate={(view) => setCurrentView(view)} />
        )}

        {currentView === 'web-design' && (
          <WebDesignPage onNavigate={(view) => setCurrentView(view)} />
        )}

      </main>

      {/* 3. CORE BRAND FOOTER */}
      <Footer
        onNavigate={(view) => setCurrentView(view)}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* 4. ADMIN CMS / CRM INTERACTIVE CONTROL OVERLAY */}
      {adminOpen && (
        <AdminPanel
          onClose={() => setAdminOpen(false)}
          onRefreshData={handleRefreshData}
        />
      )}

    </div>
  );
}
