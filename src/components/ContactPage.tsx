import { useState } from 'react';
import InquiryForm from './InquiryForm';
import WhyChooseUs from './WhyChooseUs';
import WeddingProcess from './WeddingProcess';
import { Inquiry } from '../types';
import { MapPin, Phone, Mail, ChevronDown, ChevronUp, Clock, HelpCircle } from 'lucide-react';

interface ContactPageProps {
  onSuccessSubmit?: (newInquiry: Inquiry) => void;
  defaultType?: 'wedding' | 'event' | 'dj-artist' | 'other';
  onNavigate?: (view: string) => void;
}

export default function ContactPage({ onSuccessSubmit, defaultType = 'wedding', onNavigate }: ContactPageProps) {
  // Collapsible FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is your photography editing style and process?",
      a: "Our aesthetic sits at the intersection of 'Chicago grit meets luxury editorial.' We prefer deep contrast, natural warm skin tones, and rich analog colors that emulate traditional medium-format film. Every single photo you receive in your final gallery is hand-selected and custom color-graded by Luis Guzman—we do not batch-apply automated filters."
    },
    {
      q: "How fast is your gallery turnaround time?",
      a: "For weddings, we deliver a beautifully curated 'Sneak Peek' gallery of 30–40 high-resolution images within 5 days of your celebration so you can share them. Your full, final hand-crafted digital gallery is delivered within 4 to 6 weeks. For corporate events and galas, we offer an expedited 48-hour press delivery for immediate marketing use."
    },
    {
      q: "Do you travel throughout Wisconsin and Indiana?",
      a: "Absolutely. While Luis is born and bred in Chicago, we shoot extensively throughout Illinois, Lake Geneva, Milwaukee, Madison, and Indiana Dunes. Travel within 150 miles of downtown Chicago is fully included in our standard photography collections with zero hidden fees."
    },
    {
      q: "Are you fully insured and registered?",
      a: "Yes, Guzzi Photography is a fully registered, licensed, and insured LLC in the state of Illinois. We carry a standard $2,000,000 commercial general liability policy. We can coordinate directly with your venue coordinator or wedding planner to provide Certificate of Insurance (COI) verifications immediately."
    },
    {
      q: "What equipment do you use and do you bring backups?",
      a: "We shoot with state-of-the-art dual-slot Sony full-frame bodies, capturing every image in real-time onto two separate memory cards. We always bring redundant, duplicate sets of cameras, prime G-Master lenses, off-camera flashes, and lighting stands to every single wedding and event. In 200+ celebrations, our backups have never failed us."
    }
  ];

  return (
    <div id="contact-page" className="pt-24 min-h-screen bg-[#0C0C0C] text-white font-sans border-b border-white/10">
      
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-white/50 text-[10px] tracking-[0.3em] uppercase font-semibold font-mono block">
            Reserve Your Date
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-white tracking-tight leading-tight font-light">
            Let's Tell Your Story
          </h1>
          <div className="h-[1px] w-12 bg-white/20 mx-auto mt-4"></div>
          <p className="text-white/60 text-xs md:text-sm font-sans font-light leading-relaxed pt-2 max-w-2xl mx-auto">
            Now booking Weddings, Private Events, Artist Sessions, and much more! Throughout Illinois, Wisconsin, Indiana, and Michigan. Fill out the form below to hold your date provisionally.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Quick Contact Info Cards */}
          <div className="lg:col-span-5 order-1 lg:pt-10">
            <div className="bg-[#111111]/40 border border-white/10 p-8 shadow-2xl rounded-sm space-y-6">
              <h3 className="font-serif text-xl font-light tracking-wide text-white">
                Chicago Photography Studio
              </h3>
              
              <ul className="space-y-4 text-xs md:text-sm text-white/70 font-sans font-light">
                <li className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-white/40 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-white block">Service Coverage</span>
                    <span className="text-white/60">Chicago, Illinois, Wisconsin & Indiana</span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-white/40 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-white block">Studio Telephone</span>
                    <span className="text-white/60">
                      <a 
                        href="tel:7735777372" 
                        className="hover:text-white transition-colors cursor-pointer underline decoration-white/10 hover:decoration-white"
                      >
                        (773) 577-7372
                      </a>{" "}
                      (Mon - Fri, 9am - 6pm CST)
                    </span>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-white/40 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-white block">Email Inquiry</span>
                    <a 
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=guzzistudios.luis@gmail.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-white/60 hover:text-white transition-colors cursor-pointer underline decoration-white/10 hover:decoration-white"
                    >
                      guzzistudios.luis@gmail.com
                    </a>
                  </div>
                </li>
              </ul>

              <div className="pt-4 border-t border-white/10 flex items-center space-x-2 text-xs text-white/50 font-mono">
                <Clock className="w-4 h-4 text-white/30" />
                <span>Response Time: Under 24 Hours</span>
              </div>
            </div>
          </div>

          {/* Right Column: CRM Inquiry Form (7 columns) */}
          <div className="lg:col-span-7 order-2 lg:row-span-2">
            <InquiryForm onSuccessSubmit={onSuccessSubmit} defaultType={defaultType} />
          </div>

          {/* Collapsible FAQ Section */}
          <div className="lg:col-span-5 order-3 space-y-6 lg:mt-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-white/50">
                <HelpCircle className="w-4 h-4 text-white/30" />
                <span className="text-[10px] tracking-widest font-mono uppercase font-bold text-white/60">Frequently Asked Questions</span>
              </div>
              <h3 className="font-serif text-2xl tracking-tight text-white font-light">
                Client Inquiries FAQ
              </h3>
            </div>

            <div className="divide-y divide-white/10 border-y border-white/10">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="py-4">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between text-left focus:outline-none py-1 group cursor-pointer"
                    >
                      <span className="font-sans text-xs md:text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                        {faq.q}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-white/60 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-white/30 flex-shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <p className="mt-3 text-xs md:text-sm text-white/60 font-sans font-light leading-relaxed animate-fade-in pl-3 border-l border-white/20 py-1">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Experience Process and Specialty Services */}
      <WeddingProcess onNavigate={onNavigate} />

    </div>
  );
}
