import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { experienceSteps } from '../data';
import { ArrowRight, MessageSquare, Clipboard, Camera, Edit3, Send, User, Heart, Building, GraduationCap, Video, Palette, Sparkles, Gift, Shirt, ChevronDown, ChevronUp } from 'lucide-react';

interface WeddingProcessProps {
  onNavigate?: (view: string) => void;
}

export default function WeddingProcess({ onNavigate }: WeddingProcessProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const stepIcons = [
    MessageSquare,  // Step 1
    Clipboard,      // Step 2
    Camera,         // Step 3
    Edit3,          // Step 4
    Send            // Step 5
  ];

  const additionalServices = [
    {
      name: "Professional Headshots",
      description: "Clean, high-end editorial and executive portraits.",
      icon: User
    },
    {
      name: "Pet Photography",
      description: "Candid, character-filled studio and outdoor sets.",
      icon: Heart
    },
    {
      name: "Engagements",
      description: "Bespoke engagement, anniversary, and surprise proposal capture in editorial styles.",
      icon: Sparkles
    },
    {
      name: "Graduations",
      description: "Candid campus walk-arounds and high-contrast senior sets.",
      icon: GraduationCap
    },
    {
      name: "Videography & Motion",
      description: "Cinematic short films, event recaps, and social media loops.",
      icon: Video
    },
    {
      name: "Brand & Graphic Design",
      description: "Bespoke print design, logos, and visual brand identity.",
      icon: Palette
    },
    {
      name: "Real Estate",
      description: "Bespoke interior showcases, luxury property walk-throughs, and high-contrast aerial drone views.",
      icon: Building
    },
    {
      name: "Holiday Photos",
      description: "Holiday sets and themed photography for corporate buildings or family & friends events.",
      icon: Gift
    },
    {
      name: "Fashion & Editorial",
      description: "High-fashion model portfolios, designer catalogs, and editorial lookbooks.",
      icon: Shirt
    }
  ];

  return (
    <section id="experience-process-section" className="pt-12 pb-24 md:py-32 bg-[#0C0C0C] border-b border-white/10 text-white relative overflow-hidden">
      {/* Grid background with fade-out masks */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      
      {/* Gradients to fade grid background into darkness at top and bottom */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0C0C0C] to-transparent pointer-events-none z-0" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0C0C0C] to-transparent pointer-events-none z-0" />

      <div className="absolute top-1/2 left-0 w-80 h-80 bg-white/2 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-white/50 text-[10px] tracking-[0.3em] uppercase font-semibold font-mono block">
            The Journey Together
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white tracking-tight font-light">
            The Guzzi Experience Process
          </h2>
          <div className="h-[1px] w-12 bg-white/20 mx-auto mt-3"></div>
          <p className="text-white/70 font-sans text-sm md:text-base font-light pt-2 leading-relaxed">
            From your very first digital inquiry to the final high-resolution gallery delivery, 
            here is how we plan, capture, and hand-craft your legacy frames.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative">
          
          {/* Connector Line across steps on Desktop */}
          <div className="absolute top-16 left-12 right-12 h-[1px] bg-white/10 hidden lg:block pointer-events-none z-0" />

          {experienceSteps.map((step, idx) => {
            const Icon = stepIcons[idx];
            return (
              <div
                key={step.step}
                className="relative bg-[#111111]/40 border border-white/10 hover:border-white/20 hover:bg-[#111111]/80 p-8 flex flex-col justify-between transition-all duration-500 shadow-sm hover:shadow-2xl rounded-sm z-10"
              >
                <div>
                  {/* Step indicator layout */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-3xl font-light text-white/35 tracking-tight">
                      {step.step}
                    </span>
                    <div className="w-10 h-10 flex items-center justify-center border border-white/10 bg-[#0C0C0C] rounded-sm text-white/80">
                      <Icon className="w-4 h-4 text-white/70" />
                    </div>
                  </div>

                  <h3 className="font-serif text-lg text-white font-light tracking-wide mb-3">
                    {step.title}
                  </h3>
                  <p className="text-white/60 text-xs leading-relaxed font-sans font-light">
                    {step.description}
                  </p>
                </div>

                {/* Mobile visual connector indicator */}
                <div className="mt-8 flex items-center text-[9px] text-white/40 font-mono tracking-widest uppercase">
                  <span>Step {step.step}</span>
                  {idx < 4 && <ArrowRight className="w-3 h-3 ml-2 text-white/40 block lg:hidden" />}
                </div>
              </div>
            );
          })}

        </div>

        {/* Additional Services Grid */}
        <div className="mt-24 pt-16 border-t border-white/10 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-semibold font-mono block">
              Expanding the Canvas
            </span>
            <h3 className="font-serif text-2xl md:text-3xl text-white tracking-tight font-light">
              Additional Specialty Services
            </h3>
            <p className="text-white/50 text-xs md:text-sm font-sans font-light leading-relaxed">
              In addition to our signature wedding, event, and DJ packages, we offer high-end, bespoke creative services tailored to your personal or brand vision.
            </p>
          </div>

          {/* Top 3 Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {additionalServices.slice(0, 3).map((service, idx) => {
              const ServiceIcon = service.icon;
              return (
                <div 
                  key={idx}
                  className="p-6 bg-[#111111]/20 border border-white/5 rounded-sm hover:border-white/15 hover:bg-[#111111]/50 transition-all duration-300 group"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 flex items-center justify-center border border-white/10 bg-[#0C0C0C] rounded-sm text-white/60 group-hover:text-white group-hover:border-white/25 transition-all duration-300 flex-shrink-0 mt-0.5">
                      <ServiceIcon className="w-4.5 h-4.5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-serif text-sm text-white font-light tracking-wide group-hover:text-white transition-colors">
                        {service.name}
                      </h4>
                      <p className="text-[11px] text-white/50 font-light leading-normal">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Collapsible Remaining Services Grid */}
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mt-6">
                  {additionalServices.slice(3).map((service, idx) => {
                    const ServiceIcon = service.icon;
                    return (
                      <div 
                        key={idx + 3}
                        className="p-6 bg-[#111111]/20 border border-white/5 rounded-sm hover:border-white/15 hover:bg-[#111111]/50 transition-all duration-300 group"
                      >
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 flex items-center justify-center border border-white/10 bg-[#0C0C0C] rounded-sm text-white/60 group-hover:text-white group-hover:border-white/25 transition-all duration-300 flex-shrink-0 mt-0.5">
                            <ServiceIcon className="w-4.5 h-4.5" />
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-serif text-sm text-white font-light tracking-wide group-hover:text-white transition-colors">
                              {service.name}
                            </h4>
                            <p className="text-[11px] text-white/50 font-light leading-normal">
                              {service.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle Action Button */}
          <div className="mt-12 flex flex-col items-center justify-center space-y-4">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-black text-[10px] tracking-widest uppercase hover:bg-white/90 transition-all duration-300 rounded-sm cursor-pointer font-semibold"
            >
              <span>{isExpanded ? 'See Less' : 'See More'}</span>
              {isExpanded ? (
                <ChevronUp className="w-3.5 h-3.5 text-black" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-black" />
              )}
            </button>


          </div>
        </div>

      </div>
    </section>
  );
}
