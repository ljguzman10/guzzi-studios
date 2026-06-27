import { useState } from 'react';
import { testimonials } from '../data';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

export default function TestimonialsCarousel() {
  const [filter, setFilter] = useState<'all' | 'wedding' | 'event' | 'dj-artist'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filtered testimonials
  const filteredList = filter === 'all'
    ? testimonials
    : testimonials.filter(t => t.type === filter);

  // Safely get index
  const safeIndex = currentIndex >= filteredList.length ? 0 : currentIndex;
  const activeTestimonial = filteredList[safeIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? filteredList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === filteredList.length - 1 ? 0 : prev + 1));
  };

  const handleFilterChange = (newFilter: 'all' | 'wedding' | 'event' | 'dj-artist') => {
    setFilter(newFilter);
    setCurrentIndex(0);
  };

  return (
    <section id="testimonials-section" className="py-24 md:py-32 bg-[#0C0C0C] border-b border-white/10 relative overflow-hidden">
      {/* Decorative large quotes watermark */}
      <Quote className="absolute -top-10 -right-10 w-96 h-96 text-white/2 rotate-12 pointer-events-none" />
      <Quote className="absolute -bottom-10 -left-10 w-96 h-96 text-white/2 -rotate-12 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-white/50 text-[10px] tracking-[0.3em] uppercase font-semibold font-mono block">
            Love & Appreciations
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white tracking-tight font-light">
            Client Testimonials
          </h2>
          <div className="h-[1px] w-12 bg-white/20 mx-auto mt-3"></div>
          
          {/* Quick filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-6">
            {(['all', 'wedding', 'event', 'dj-artist'] as const).map((type) => (
              <button
                key={type}
                onClick={() => handleFilterChange(type)}
                className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] font-medium transition-all border cursor-pointer ${
                  filter === type
                    ? 'bg-white text-black border-white font-semibold shadow-sm'
                    : 'bg-transparent text-white/60 border-white/10 hover:border-white/30'
                }`}
              >
                {type === 'all' ? 'All Reviews' : type === 'dj-artist' ? 'DJs & Artists' : `${type}s`}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel Content Card */}
        {filteredList.length > 0 ? (
          <div className="relative bg-[#111111]/40 border border-white/10 p-8 md:p-16 shadow-2xl rounded-sm">
            
            {/* Stars */}
            <div className="flex items-center space-x-1 mb-8 justify-center">
              {[...Array(activeTestimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-white/75 fill-white/10" />
              ))}
            </div>

            {/* Testimonial Quote */}
            <div className="relative text-center max-w-3xl mx-auto">
              <Quote className="w-10 h-10 text-white/5 absolute -top-6 -left-6 md:-left-12 opacity-60" />
              <p className="font-serif text-lg md:text-2xl text-white/90 leading-relaxed italic relative z-10 px-4 md:px-8 font-light">
                "{activeTestimonial.quote}"
              </p>
            </div>

            {/* Author details */}
            <div className="text-center mt-10 space-y-1">
              <h4 className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-white font-sans">
                {activeTestimonial.author}
              </h4>
              <p className="text-[10px] tracking-widest font-mono text-white/50 uppercase">
                {activeTestimonial.role} &nbsp;|&nbsp; {activeTestimonial.location}
              </p>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4 md:-left-6 right-4 md:-right-6 flex justify-between pointer-events-none">
              <button
                onClick={handlePrev}
                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-[#111111] hover:bg-white text-white/70 hover:text-black border border-white/10 hover:border-white transition-all shadow-md cursor-pointer pointer-events-auto rounded-sm"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-[#111111] hover:bg-white text-white/70 hover:text-black border border-white/10 hover:border-white transition-all shadow-md cursor-pointer pointer-events-auto rounded-sm"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Slider dots indicator */}
            <div className="flex justify-center space-x-2 mt-12">
              {filteredList.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-1.5 h-1.5 transition-all cursor-pointer rounded-sm ${
                    safeIndex === index
                      ? 'w-6 bg-white'
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

          </div>
        ) : (
          <div className="text-center bg-[#111111]/30 border border-white/10 p-12 text-white/50 rounded-sm">
            No testimonials found for this category.
          </div>
        )}

      </div>
    </section>
  );
}
