import { Heart, Film, Zap, Compass, MessageSquare, MapPin } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      icon: Heart,
      title: 'Authentic Storytelling',
      desc: 'We do not manufacture moments. We document raw emotion, candid interactions, and real laughs as they naturally unfold. Your photos will feel authentic, raw, and completely personal.',
      badge: 'ELITE STORYTELLING'
    },
    {
      icon: Film,
      title: 'Cinematic Editing',
      desc: 'Our post-processing combines Chicago grit with editorial luxury. We hand-select and color-grade every image with deep contrast, organic color palettes, and a timeless film-like finish.',
      badge: 'Elite Craftsmanship'
    },
    {
      icon: Zap,
      title: 'High-Energy Coverage',
      desc: 'We bring intense, contagious excitement to your reception or event dance floor. Luis gets right into the heat of the action, capturing high-energy movement, lasers, and authentic fun.',
      badge: 'Elite Craftsmanship'
    },
    {
      icon: Compass,
      title: 'Natural Direction',
      desc: 'Forget stiff, uncomfortable posing. We give relaxed, natural cues and direction that allow your true relationship and personalities to shine, making the camera feel completely invisible.',
      badge: 'Elite Craftsmanship'
    },
    {
      icon: MessageSquare,
      title: 'Fast Communication',
      desc: 'No ghosting, no endless waiting. We pride ourselves on immediate response times, detailed consultation guides, planning timeline reviews, and transparent digital contracts.',
      badge: 'Elite Craftsmanship'
    },
    {
      icon: MapPin,
      title: 'Local Midwest Expertise',
      desc: 'Born and bred in Chicago, Luis knows the best editorial spots in Illinois, Wisconsin, and Indiana. From historic downtown alleys to windswept Lake Michigan dunes.',
      badge: 'Elite Craftsmanship'
    }
  ];

  return (
    <section id="why-guzzi" className="py-24 md:py-32 bg-[#0C0C0C] border-b border-white/10 text-white relative">
      {/* Decorative subtle texture */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-end">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-white/50 text-[10px] tracking-[0.3em] uppercase font-semibold font-mono block">
              The Guzzi Difference
            </span>
            <h2 className="font-serif text-3xl md:text-5xl tracking-tight text-white font-light leading-tight">
              Why Couples & Artists <br />
              <span className="italic text-white/90">Choose Guzzi Photography</span>
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="text-white/60 text-sm md:text-base font-light leading-relaxed font-sans border-l border-white/10 pl-6">
              Luis Guzman does not just take pictures—he creates timeless visual legacies. 
              We blend editorial fashion sensibilities with high-energy party coverage, 
              giving you a gallery that captures both the fine-art details and the wildest moments.
            </p>
          </div>
        </div>

        {/* Bento/Modern Grid for features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                className="group border border-white/10 bg-[#111111]/40 p-8 hover:bg-[#111111]/80 hover:border-white/20 transition-all duration-300 flex flex-col justify-between rounded-sm"
              >
                <div>
                  {/* Icon and Accent circle */}
                  <div className="mb-6 w-12 h-12 flex items-center justify-center border border-white/10 group-hover:border-white/30 bg-[#0C0C0C] rounded-sm text-white/80 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  {/* Title and Description */}
                  <h3 className="font-serif text-lg text-white group-hover:text-white/90 transition-colors mb-3 font-light tracking-wide">
                    {feat.title}
                  </h3>
                  <p className="text-white/60 text-xs md:text-sm leading-relaxed font-sans font-light">
                    {feat.desc}
                  </p>
                </div>
                
                {/* Visual arrow decoration */}
                <div className="mt-8 flex items-center space-x-2 text-[9px] text-white/30 font-mono tracking-widest uppercase group-hover:text-white/60 transition-colors">
                  <span>{feat.badge}</span>
                  <span className="w-4 h-[1px] bg-white/10 group-hover:bg-white/40 block transition-all group-hover:w-8"></span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
