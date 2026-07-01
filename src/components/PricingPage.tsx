import { useState } from 'react';
import { Check, Sparkles, Clock, Shield, Camera, Award, ChevronRight, ArrowRight, HelpCircle } from 'lucide-react';
import chicagoCouple from '../assets/images/chicago_couple_1782429073568.jpg';
import chicagoGala from '../assets/images/chicago_gala_lounge_1782763049039.jpg';
import djCloseupHands from '../assets/images/dj_pioneer_two_hands_centered_1782758087409.jpg';

interface PricingPageProps {
  onNavigate: (view: string) => void;
}

export default function PricingPage({ onNavigate }: PricingPageProps) {
  const [activeTab, setActiveTab] = useState<'weddings' | 'events' | 'djs-artists'>('weddings');

  const tabImages = {
    weddings: chicagoCouple,
    events: chicagoGala,
    'djs-artists': djCloseupHands,
  };

  const pricingTabs = [
    { id: 'weddings', label: 'Weddings', subtitle: 'Fine Art & Editorial' },
    { id: 'djs-artists', label: 'DJs & Artists', subtitle: 'Nightlife & Creative Profiles' },
    { id: 'events', label: 'Events & Galas', subtitle: 'Sophisticated Corporate' },
  ] as const;

  const weddingPackages = [
    {
      name: "The Classic Collection",
      price: "$1,800",
      description: "60-Minute Creative Studio, Street Location Session or event set coverage.",
      features: [
        "6 Hours Continuous Coverage",
        "Online Gallery with High-Resolution Digital Files",
        "500+ Downloadable High Resolution Images",
        "Sneak Peek Highlights within 48 Hours",
        "Complimentary Pre-Wedding Planning Consultation"
      ],
      tag: "Essential Coverage"
    },
    {
      name: "The Editorial Heirloom",
      price: "$2,400",
      description: "Our signature collection. Expands coverage and adds an associate shooter to capture every angle with custom-designed print assets.",
      features: [
        "8 Hours Continuous Coverage",
        "Premium Online Gallery with Web & Print-Ready Files",
        "45-Minute Engagement Portrait Session in Chicago",
        "Luis's Signature Hand-Selected & Color-Graded Proofs",
        "10x10 Custom Flush-mount Album (20 Pages)",
        "Sneak Peek Highlights within 48 Hours",
        "Complimentary Pre-Wedding Planning Consultation"
      ],
      tag: "Most Requested",
      popular: true
    },
    {
      name: "The Fine Art Legacy",
      price: "$2,900",
      description: "The ultimate documentation experience. Blends classic film with state-of-the-art digital, securing a massive physical legacy.",
      features: [
        "10 Hours of Continuous Coverage",
        "2 Lead Photographers + 1 Professional Assistant",
        "Analog Medium-Format Film & Digital Hybrid Shooting",
        "1-Hour Rehearsal Dinner or Day-Before Portrait Session",
        "60-Minute couples shoot in any midwest location",
        "Premium 12x12 Flush-mount Album (40 Prints)"
      ],
      tag: "Full Legacy"
    }
  ];

  const eventPackages = [
    {
      name: "The Half-Day Elite",
      price: "$1,100",
      description: "Perfect for intimate gatherings, private dinings, or streamlined corporate panel sessions.",
      features: [
        "4 Hours of Continuous Coverage",
        "1 Photographer (Luis Guzman)",
        "Dedicated Candid Shots & Guest Step-and-Repeat",
        "Online Gallery with High-Resolution Digital Downloads",
        "72-Hour Rapid Highlights Delivery",
        "Standard Commercial Usage Rights for Digital Media"
      ],
      tag: "Compact Events"
    },
    {
      name: "The Gala Premium",
      price: "$2,800",
      description: "Robust coverage designed for full-scale society galas, product launches, or multi-room corporate events.",
      features: [
        "8 Hours of Continuous Coverage",
        "2 Photographers (Luis + Associate) for full room scope",
        "Main Ballroom Coverage + Secondary Room Candid documentation",
        "Next-Morning PR Press Image Deliveries (Up to 15 Selected Shots)",
        "Signature High-Contrast Black & White Candid Gallery Accent",
        "Standard Delivery of Complete Gallery within 5 Business Days",
        "Full Commercial & Editorial Usage Rights"
      ],
      tag: "Most Popular",
      popular: true
    },
    {
      name: "The Summit Multi-Day",
      price: "$4,500",
      description: "Ultimate multi-day coverage engineered for conventions, conferences, or highly publicized weekend events.",
      features: [
        "Up to 16 Hours of Coverage across 2-3 consecutive days",
        "2 Photographers + Dedicated On-Site Media Coordinator",
        "Full Panel, Keynote, Step-and-Repeat, and Cocktail Mixers",
        "Same-Day Digital Image Snippets for Live Social Posting",
        "Comprehensive VIP / Speaker Portrait Corner Set-Up",
        "High-Resolution Archive with Lifetime Cloud Storage Hosting",
        "Unlimited Global Media Distribution License"
      ],
      tag: "Enterprise Scope"
    }
  ];

  const djPackages = [
    {
      name: "The Press Kit Profile",
      price: "$300",
      description: "High-end, striking editorial portraits designed for press releases, label signatures, and social branding.",
      features: [
        "90-Minute Creative Studio or Street Location Session",
        "Up to 3 Custom Looks & Wardrobe Changes",
        "5 Signature High-Contrast 'Grit & Luxe' Editorial Retouches",
        "30 Color-Graded Proofs in High-Resolution",
        "Dedicated Electronic Press Kit (EPK) Usage License",
        "Same-Day Concept & Mood-board Alignment Call"
      ],
      tag: "Artist Promo"
    },
    {
      name: "The Club Live Set",
      price: "$800",
      description: "Dynamic, fast-paced documentation of a live headlining performance or underground club night.",
      features: [
        "Single Venue Event Coverage (Up to 3 Hours)",
        "High-Impact DJ Booth, Crowd Energy, & Behind-the-Scenes",
        "Low-Light Club Motion & Long-Exposure Specialty Grits",
        "Optimized 9:16 Social Media Crop Deliveries Included",
        "Express 48-Hour Digital Gallery Delivery",
        "Promotional Commercial License for Artist & Venue"
      ],
      popular: true,
      tag: "Live Performance"
    },
    {
      name: "The Tour & Studio Pack",
      price: "$1,500",
      description: "The complete visual asset engine. Combines a raw live-performance documentation set with an editorial portrait shoot.",
      features: [
        "Single Day Coverage (Up to 6 Hours)",
        "Next-Morning Delivery of 5 Hero Shots for immediate press push",
        "Complete Tour Electronic Press Kit (EPK) Branding Assets",
        "Custom Animated GIF / Motion Loops from live performance shots",
        "Full Artist & Label Lifetime Commercial Distribution Rights"
      ],
      tag: "Full Visual Asset Pack"
    }
  ];

  const activePackages = 
    activeTab === 'weddings' ? weddingPackages :
    activeTab === 'events' ? eventPackages :
    djPackages;

  return (
    <div id="pricing-page" className="pt-24 min-h-screen bg-[#0C0C0C] text-white font-sans border-b border-white/10">
      
      {/* Editorial Header Hero Banner */}
      <div className="relative h-[40vh] min-h-[300px] flex items-center justify-center bg-white overflow-hidden border-b border-white/10">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-90 scale-105 transition-all duration-700 ease-in-out"
          style={{
            backgroundImage: `url(${tabImages[activeTab]})`,
          }}
        />
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-transparent to-[#0C0C0C]/20" />
        
        <div className="relative z-10 text-center max-w-4xl px-6 space-y-4">
          <span className="text-white/50 text-[10px] tracking-[0.4em] uppercase font-semibold font-mono block animate-fade-in">
            Investments & Collections
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-white tracking-tight font-light">
            Luxury Packages
          </h1>
          <div className="h-[1px] w-12 bg-white/20 mx-auto mt-4"></div>
          <p className="text-white/60 text-[10px] md:text-xs tracking-widest font-mono uppercase">
            Transparent Pricing &bull; Chicago Grit Meets Editorial Polish &bull; Serve IL, WI & IN
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        
        {/* Navigation Tabs */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-6 mb-16 border-b border-white/10 pb-8">
          {pricingTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full md:w-auto px-8 py-4 text-left md:text-center transition-all duration-300 border rounded-sm relative group cursor-pointer ${
                  isActive 
                    ? 'border-white bg-white/5 text-white' 
                    : 'border-white/10 hover:border-white/30 text-white/60 hover:text-white'
                }`}
              >
                <div className="text-xs uppercase tracking-widest font-mono font-semibold">
                  {tab.label}
                </div>
                <div className={`text-[10px] mt-1 font-sans ${isActive ? 'text-gold-200' : 'text-white/40'}`}>
                  {tab.subtitle}
                </div>
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white" />
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-20">
          {activePackages.map((pkg, idx) => (
            <div
              key={idx}
              className={`relative border rounded-sm p-8 flex flex-col justify-between transition-all duration-500 hover:translate-y-[-4px] ${
                pkg.popular 
                  ? 'border-white bg-[#111111]/90 shadow-2xl scale-102 lg:-translate-y-1' 
                  : 'border-white/10 bg-[#111111]/30 hover:border-white/20'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-white text-[#0C0C0C] text-[9px] uppercase tracking-[0.25em] font-mono py-1 px-4 rounded-sm font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-gold-500 fill-gold-500" />
                  <span>Most Preferred</span>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-white/40 font-mono">
                    {pkg.tag}
                  </span>
                  <h3 className="text-2xl font-serif text-white tracking-wide mt-1">
                    {pkg.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mt-4">
                    <span className="text-4xl font-light font-serif tracking-tight text-white">
                      {pkg.price}
                    </span>
                    <span className="text-white/40 text-xs font-mono">USD</span>
                  </div>
                </div>

                <div className="h-[1px] bg-white/10 w-full" />

                <div className="space-y-3">
                  <span className="text-[10px] uppercase tracking-wider text-white/50 font-mono block font-semibold">
                    What is Included:
                  </span>
                  <ul className="space-y-2.5">
                    {pkg.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start text-xs text-white/80 font-light leading-snug gap-2.5">
                        <Check className="w-3.5 h-3.5 text-gold-200 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-white/5">
                <button
                  onClick={() => onNavigate('contact')}
                  className={`w-full py-3.5 rounded-sm text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                    pkg.popular
                      ? 'bg-white text-black hover:bg-white/90'
                      : 'border border-white/20 text-white hover:bg-white/5 hover:border-white'
                  }`}
                >
                  <span>Book This Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Trust Accents & FAQs Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 px-8 border border-white/10 bg-[#111111]/30 rounded-sm mb-20">
          <div className="space-y-2">
            <div className="flex items-center space-x-2.5 text-white">
              <Shield className="w-4 h-4 text-gold-200" />
              <h4 className="text-xs font-mono uppercase tracking-wider font-semibold">Transparent Agreements</h4>
            </div>
            <p className="text-xs text-white/60 leading-relaxed font-light">
              No hidden travel fees for bookings within 75 miles of downtown Chicago. All prices are explicitly locked-in at the moment of booking signature.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2.5 text-white">
              <Clock className="w-4 h-4 text-gold-200" />
              <h4 className="text-xs font-mono uppercase tracking-wider font-semibold">Flexible Payment Plans</h4>
            </div>
            <p className="text-xs text-white/60 leading-relaxed font-light">
              Secure your date with a standard 30% retainer. The remaining balance can be divided into simple monthly segments or a final payment due 30 days prior to event.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2.5 text-white">
              <Award className="w-4 h-4 text-gold-200" />
              <h4 className="text-xs font-mono uppercase tracking-wider font-semibold">Licensed & Fully Insured</h4>
            </div>
            <p className="text-xs text-white/60 leading-relaxed font-light">
              Comprehensive liability coverage for high-end properties (up to $2M). Certificates of insurance can be furnished directly to any venue coordinator on request.
            </p>
          </div>
        </div>

        {/* Quick F.A.Q. Accent */}
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center">
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/50 font-mono font-semibold block mb-1">Got Questions?</span>
            <h3 className="text-3xl font-serif text-white tracking-wide">Investment F.A.Q.</h3>
          </div>

          <div className="space-y-6">
            <div className="p-6 border border-white/5 bg-[#111111]/20 rounded-sm">
              <h5 className="text-sm font-serif text-white mb-2">Can we customize any of these packages?</h5>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                Absolutely. Every event has its own specific cadence. We can adjust coverage hours, add second shooters, build custom wedding invitations, or add day-after portrait opportunities. Simply specify your vision on the inquiry form and we will tailor it.
              </p>
            </div>

            <div className="p-6 border border-white/5 bg-[#111111]/20 rounded-sm">
              <h5 className="text-sm font-serif text-white mb-2">What is the exact turnaround time for photos?</h5>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                For DJ sets and Press kits, standard turnaround is 48 to 96 hours. For corporate events, it is within 5 business days. For weddings, full curated and color-graded legacy galleries are completed and delivered within 4 to 6 weeks.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
