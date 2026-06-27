import React, { useState, useEffect, useRef } from 'react';
import { PortfolioItem } from '../types';
import { MapPin, X, ChevronLeft, ChevronRight, Sparkles, Maximize2 } from 'lucide-react';

interface PortfolioCategoriesProps {
  onNavigate: (view: string) => void;
  portfolioItems?: PortfolioItem[];
}

const showcasePhotos = [
  {
    id: 'm1',
    category: 'weddings',
    title: 'Cantigny Park',
    subtitle: 'Beth & Trevor',
    location: 'Wheaton, IL',
    image: '/src/assets/images/regenerated_image_1782436761072.jpg',
    year: '2025',
    tags: ['EditorialLove', 'LuxeFlora', 'Historic']
  },
  {
    id: 'm2',
    category: 'weddings',
    title: 'Estate Wedding',
    subtitle: 'Tessa & Douglas',
    location: 'Chicago, IL',
    image: '/src/assets/images/regenerated_image_1782504926122.jpg',
    year: '2024',
    tags: ['Cinematic', 'Outdoor', 'Emotional']
  },
  {
    id: 'm3',
    category: 'weddings',
    title: 'Navy Pier',
    subtitle: 'Steven & Steven',
    location: 'Chicago, IL',
    image: '/src/assets/images/regenerated_image_1782511010199.jpg',
    year: '2025',
    tags: ['Fine Art', 'Coastal', 'Minimalist']
  },
  {
    id: 'm11',
    category: 'weddings',
    title: 'Saint Mary of The Angels Church',
    subtitle: 'Guadalupe & Andy',
    location: 'Chicago, IL',
    image: '/src/assets/images/regenerated_image_1782519856684.jpg',
    year: '2024',
    tags: ['Industrial Chic', 'Night Energy', 'Candid']
  },
  {
    id: 'm5',
    category: 'weddings',
    title: 'Bar Avec Anniversary',
    subtitle: 'Katherine & Cliff',
    location: 'Chicago, IL',
    image: '/src/assets/images/regenerated_image_1782523040836.jpg',
    year: '2024',
    tags: ['Romantic', 'Candid', 'Golden Hour']
  },
  {
    id: 'm4',
    category: 'weddings',
    title: 'Magnificent Mile Engagement Party',
    subtitle: 'Makaela & Diego',
    location: 'Chicago, IL',
    image: '/src/assets/images/regenerated_image_1782516236476.jpg',
    year: '2025',
    tags: ['Vintage', 'Urban', 'Black Tie']
  },
  {
    id: 'm6',
    category: 'events',
    title: 'Penthouse NYE Party',
    subtitle: 'Faceted Light & Shadows',
    location: 'Chicago, IL',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200',
    year: '2025',
    tags: ['Gala', 'Luxury Corporate', 'Cultural']
  },
  {
    id: 'm7',
    category: 'events',
    title: 'Evening Luxury Cocktail Launch',
    subtitle: 'Quinceañera',
    location: 'Gold Coast, Chicago',
    image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=1200',
    year: '2025',
    tags: ['Private Soiree', 'Fashion', 'Candid']
  },
  {
    id: 'm8',
    category: 'djs-artists',
    title: 'DJ Deck Control',
    subtitle: 'Sound-Bar Chicago Headliner',
    location: 'Chicago, IL',
    image: 'https://images.unsplash.com/photo-1516873240891-4bf014598ab4?auto=format&fit=crop&q=80&w=1200',
    year: '2025',
    tags: ['Nightlife', 'High Energy', 'Stage Lighting']
  },
  {
    id: 'm9',
    category: 'djs-artists',
    title: 'Underground Techno Laser Show',
    subtitle: 'The Mid Festival Set',
    location: 'Chicago, IL',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200',
    year: '2025',
    tags: ['Festival', 'Lasers', 'Cinematic']
  },
  {
    id: 'm10',
    category: 'djs-artists',
    title: 'Nightlife Bass Arena',
    subtitle: 'Lollapalooza Chicago Afterparty',
    location: 'Grant Park, Chicago',
    image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&q=80&w=1200',
    year: '2024',
    tags: ['Nightlife', 'Lasers', 'Crowd Shot']
  },
  {
    id: 'm12',
    category: 'djs-artists',
    title: 'Redline Chicago',
    subtitle: 'Deep House Afterhours Session',
    location: 'Chicago, IL',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1200',
    year: '2025',
    tags: ['Intimate Club', 'Deep House', 'Underground']
  }
];

export default function PortfolioCategories({ onNavigate }: PortfolioCategoriesProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const isTouchingRef = useRef(false);
  const hasCenteredRef = useRef(false);

  const [isButtonPaused, setIsButtonPaused] = useState(false);
  const buttonPauseTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto scroll effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    const scrollSpeed = 0.5; // elegant slow speed

    const animate = () => {
      const isPausedByAny = isButtonPaused || isDraggingRef.current || isTouchingRef.current;
      if (container && isPlaying && !isPausedByAny) {
        const singleSetWidth = container.scrollWidth / 3;
        
        // Dynamically center as soon as we have a valid width on load
        if (singleSetWidth > 0 && !hasCenteredRef.current) {
          container.scrollLeft = singleSetWidth;
          hasCenteredRef.current = true;
        }

        container.scrollLeft += scrollSpeed;

        // Loop wrapper check
        if (singleSetWidth > 0) {
          if (container.scrollLeft >= singleSetWidth * 2) {
            container.scrollLeft -= singleSetWidth;
          } else if (container.scrollLeft <= singleSetWidth * 0.5) {
            container.scrollLeft += singleSetWidth;
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (buttonPauseTimerRef.current) {
        clearTimeout(buttonPauseTimerRef.current);
      }
    };
  }, [isPlaying, isButtonPaused]);

  // Set initial scroll to center once the layout width is loaded
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const initScroll = () => {
      const singleSetWidth = container.scrollWidth / 3;
      if (singleSetWidth > 0) {
        container.scrollLeft = singleSetWidth;
        hasCenteredRef.current = true;
      }
    };

    initScroll();
    const timer = setTimeout(initScroll, 300);
    return () => clearTimeout(timer);
  }, []);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') handleNextLightbox();
      if (e.key === 'ArrowLeft') handlePrevLightbox();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const handlePrevLightbox = () => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev === 0 ? showcasePhotos.length - 1 : prev - 1;
    });
  };

  const handleNextLightbox = () => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev === showcasePhotos.length - 1 ? 0 : prev + 1;
    });
  };

  // Button manual scroll
  const scrollLeftBtn = () => {
    setIsButtonPaused(true);
    if (buttonPauseTimerRef.current) {
      clearTimeout(buttonPauseTimerRef.current);
    }
    const container = containerRef.current;
    if (container) {
      container.scrollBy({ left: -380, behavior: 'smooth' });
    }
    buttonPauseTimerRef.current = setTimeout(() => {
      setIsButtonPaused(false);
    }, 5000);
  };

  const scrollRightBtn = () => {
    setIsButtonPaused(true);
    if (buttonPauseTimerRef.current) {
      clearTimeout(buttonPauseTimerRef.current);
    }
    const container = containerRef.current;
    if (container) {
      container.scrollBy({ left: 380, behavior: 'smooth' });
    }
    buttonPauseTimerRef.current = setTimeout(() => {
      setIsButtonPaused(false);
    }, 5000);
  };

  // Mouse drag logic
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - container.offsetLeft;
    scrollLeftRef.current = container.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const container = containerRef.current;
    if (!container) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    container.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  const handleScrollEvent = () => {
    const container = containerRef.current;
    if (!container) return;

    const singleSetWidth = container.scrollWidth / 3;
    if (singleSetWidth > 0) {
      if (container.scrollLeft >= singleSetWidth * 2) {
        container.scrollLeft -= singleSetWidth;
      } else if (container.scrollLeft <= singleSetWidth * 0.5) {
        container.scrollLeft += singleSetWidth;
      }
    }
  };

  return (
    <section id="portfolio-preview-section" className="py-2 md:py-3 bg-[#0C0C0C] text-white border-b border-white/10 overflow-hidden relative">
      
      {/* Scrollable Gallery Track with Arrows and Drag Wrapper */}
      <div className="relative group/gallery max-w-[100vw] select-none py-1">
        
        {/* Left Arrow Button */}
        <button
          onClick={scrollLeftBtn}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/60 backdrop-blur-md hover:bg-white hover:text-black border border-white/10 rounded-full text-white shadow-lg opacity-0 group-hover/gallery:opacity-100 focus:opacity-100 transition-all duration-300 transform hover:scale-105"
          aria-label="Scroll Gallery Left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={scrollRightBtn}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/60 backdrop-blur-md hover:bg-white hover:text-black border border-white/10 rounded-full text-white shadow-lg opacity-0 group-hover/gallery:opacity-100 focus:opacity-100 transition-all duration-300 transform hover:scale-105"
          aria-label="Scroll Gallery Right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Scroll Container */}
        <div
          ref={containerRef}
          onScroll={handleScrollEvent}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onTouchStart={() => { isTouchingRef.current = true; }}
          onTouchEnd={() => { isTouchingRef.current = false; }}
          onTouchCancel={() => { isTouchingRef.current = false; }}
          className="flex overflow-x-auto scrollbar-none gap-6 md:gap-8 px-6 md:px-12 select-none cursor-grab active:cursor-grabbing pb-2"
        >
          {/* Direct list: Loop showcasePhotos 3 times for a flawless infinite scroll experience */}
          {[...showcasePhotos, ...showcasePhotos, ...showcasePhotos].map((item, index) => (
            <div
              key={`r1-${item.id}-${index}`}
              onClick={() => setLightboxIndex(showcasePhotos.findIndex(p => p.id === item.id))}
              className="w-[320px] sm:w-[460px] aspect-[4/3] relative overflow-hidden rounded-sm border border-white/10 group cursor-pointer flex-shrink-0 transition-transform duration-500 hover:border-white/30"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />
              
              {/* Visual info and hover zoom icons */}
              <div className="absolute top-4 right-4 p-2 bg-black/70 backdrop-blur-md rounded-full border border-white/15 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-left transition-transform duration-300 transform group-hover:translate-y-[-4px]">
                <div className="flex items-center space-x-1.5 text-white/50 text-[8px] font-mono tracking-widest uppercase mb-1">
                  <MapPin className="w-3 h-3 text-white/40" />
                  <span>{item.location}</span>
                  <span>•</span>
                  <span>{item.year}</span>
                </div>
                <h4 className="font-serif text-sm sm:text-base text-white tracking-wide truncate">
                  {item.title}
                </h4>
                {item.subtitle && (
                  <p className="text-white/40 text-[10px] font-sans font-light italic truncate">
                    {item.subtitle}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* STUNNING IMMERSIVE FULLSCREEN LIGHTBOX MODAL */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 bg-black/98 backdrop-blur-xl z-[150] flex flex-col justify-between p-6 select-none animate-fade-in">
          
          {/* Top Bar inside modal */}
          <div className="flex items-center justify-between py-2 border-b border-white/10 max-w-7xl mx-auto w-full">
            <div>
              <span className="text-[10px] text-white/50 font-mono uppercase tracking-[0.25em]">
                Guzzi Masterpiece Portfolio
              </span>
              <p className="text-xs text-white/30 font-mono mt-0.5">
                Image {lightboxIndex + 1} of {showcasePhotos.length}
              </p>
            </div>
            
            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2 bg-white/5 hover:bg-white/15 border border-white/15 text-white/75 hover:text-white rounded-full transition cursor-pointer"
              title="Close Showcase"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Central Showcase Area */}
          <div className="flex-grow flex items-center justify-between max-w-7xl mx-auto w-full gap-4 relative my-8">
            
            {/* Left controller */}
            <button
              onClick={handlePrevLightbox}
              className="absolute left-2 sm:relative p-3 sm:p-4 bg-black/60 sm:bg-white/5 hover:bg-white/15 border border-white/10 text-white hover:scale-105 transition rounded-full z-10 cursor-pointer"
              title="Previous Photo"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Immersive high resolution photo card */}
            <div className="flex-grow h-full max-h-[60vh] sm:max-h-[70vh] flex items-center justify-center overflow-hidden px-2">
              <img
                src={showcasePhotos[lightboxIndex].image}
                alt={showcasePhotos[lightboxIndex].title}
                className="max-w-full max-h-full object-contain rounded-sm border border-white/10 shadow-2xl select-text"
              />
            </div>

            {/* Right controller */}
            <button
              onClick={handleNextLightbox}
              className="absolute right-2 sm:relative p-3 sm:p-4 bg-black/60 sm:bg-white/5 hover:bg-white/15 border border-white/10 text-white hover:scale-105 transition rounded-full z-10 cursor-pointer"
              title="Next Photo"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Bottom Specifications Meta */}
          <div className="max-w-4xl mx-auto w-full text-center space-y-4 pb-6">
            <div className="flex items-center justify-center space-x-1.5 text-white/50 text-xs font-mono tracking-widest uppercase">
              <MapPin className="w-4 h-4 text-white/40" />
              <span>{showcasePhotos[lightboxIndex].location}</span>
              <span>•</span>
              <span>{showcasePhotos[lightboxIndex].year}</span>
            </div>
            
            <h3 className="font-serif text-2xl sm:text-3xl text-white tracking-wide font-light">
              {showcasePhotos[lightboxIndex].title}
            </h3>
            
            {showcasePhotos[lightboxIndex].subtitle && (
              <p className="text-white/50 text-xs sm:text-sm font-sans font-light italic">
                {showcasePhotos[lightboxIndex].subtitle}
              </p>
            )}

            {/* Tag Badges */}
            <div className="flex flex-wrap justify-center gap-2 pt-1">
              {showcasePhotos[lightboxIndex].tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2.5 py-1 bg-white/5 border border-white/10 text-[10px] text-white/60 font-mono tracking-wide rounded-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

        </div>
      )}

    </section>
  );
}
