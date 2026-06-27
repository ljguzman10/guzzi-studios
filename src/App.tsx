import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutLuisSection from './components/AboutLuisSection';
import PortfolioCategories from './components/PortfolioCategories';
import TestimonialsCarousel from './components/TestimonialsCarousel';
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
        if (item.id === 'w1') {
          return { ...item, title: 'Cantigny Park', location: 'Wheaton, IL', subtitle: 'Beth & Trevor', image: '/src/assets/images/regenerated_image_1782436761072.jpg', tags: ['EditorialLove', 'LuxeFlora', 'Historic'] };
        }
        if (item.id === 'w2') {
          return { ...item, title: 'Estate Wedding', location: 'Chicago, IL', subtitle: 'Tessa & Douglas', image: '/src/assets/images/regenerated_image_1782504926122.jpg', year: '2024' };
        }
        if (item.id === 'w3') {
          return { ...item, title: 'Navy Pier', location: 'Chicago, IL', subtitle: 'Steven & Steven', image: '/src/assets/images/regenerated_image_1782511010199.jpg', year: '2025' };
        }
        if (item.id === 'w4') {
          return { ...item, title: 'Magnificent Mile Engagement Party', subtitle: 'Makaela & Diego', image: '/src/assets/images/regenerated_image_1782516236476.jpg' };
        }
        if (item.id === 'w5') {
          return { ...item, title: 'Bar Avec Anniversary', location: 'Chicago, IL', subtitle: 'Katherine & Cliff', image: '/src/assets/images/regenerated_image_1782523040836.jpg' };
        }
        if (item.id === 'w6') {
          return { ...item, title: 'Saint Mary of The Angels Church', subtitle: 'Guadalupe & Andy', image: '/src/assets/images/regenerated_image_1782519856684.jpg', location: 'Chicago, IL', year: '2024' };
        }
        if (item.id === 'd1') {
          return { ...item, title: 'Celest', badge: 'HEADLINER DJ: @NEIV.DJ', subtitle: "International Woman's Day" };
        }
        if (item.id === 'd3') {
          return { ...item, title: 'Music Video BTS', badge: 'RAPPER: @BOOMANFOREVER' };
        }
        if (item.id === 'd6') {
          return { ...item, title: 'Redline Chicago' };
        }
        if (item.id === 'e1') {
          return { ...item, title: 'Penthouse NYE Party' };
        }
        if (item.id === 'e2') {
          return { ...item, title: 'Quinceañera' };
        }
        if (item.id === 'e3') {
          return { ...item, title: 'DNC Afterparty' };
        }
        return item;
      });

      // Swap positions of d2 and d5 to respect layout changes requested by user (ensure d5 is before d2)
      const d2Index = updated.findIndex(item => item.id === 'd2');
      const d5Index = updated.findIndex(item => item.id === 'd5');
      if (d2Index !== -1 && d5Index !== -1 && d2Index < d5Index) {
        const temp = updated[d2Index];
        updated[d2Index] = updated[d5Index];
        updated[d5Index] = temp;
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

  // Handle a refresh from Admin Panel CMS updates
  const handleRefreshData = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  // Callback for live CRM updates
  const handleNewInquirySubmitted = (newInq: Inquiry) => {
    handleRefreshData();
  };

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-white selection:bg-white/20 flex flex-col justify-between">
      
      {/* 1. STICKY LUXURY NAVIGATION */}
      <Header
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        onOpenAdmin={() => setAdminOpen(true)}
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

            {/* Luxury Testimonials Carousel */}
            <TestimonialsCarousel />

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
                <div className="pt-6">
                  <button
                    onClick={() => {
                      setCurrentView('contact');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-10 py-4 bg-white hover:bg-white/80 text-black font-semibold text-xs tracking-widest uppercase transition-all duration-300 shadow-xl cursor-pointer rounded-sm"
                  >
                    Check Date Availability
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
          />
        )}

        {currentView === 'careers' && (
          <CareersPage onNavigate={(view) => setCurrentView(view)} />
        )}

      </main>

      {/* 3. CORE BRAND FOOTER */}
      <Footer
        onNavigate={(view) => setCurrentView(view)}
        onOpenAdmin={() => setAdminOpen(true)}
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
