import { useState, FormEvent } from 'react';
import { Layout, Shield, Server, RefreshCw, Check, Loader, User, Mail, Phone, Landmark, MessageSquare, Globe, DollarSign, Calendar, Clock } from 'lucide-react';
import { WebDesignInquiry } from '../types';

interface WebDesignPageProps {
  onNavigate: (view: string) => void;
}

export default function WebDesignPage({ onNavigate }: WebDesignPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    projectType: 'portfolio-creative',
    maintenanceRequired: 'yes',
    details: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastGmailUrl, setLastGmailUrl] = useState('');

  const projectTypes = [
    { id: 'portfolio-creative', label: 'Creative Portfolio (Artist, Photographer, Model)' },
    { id: 'local-business', label: 'Local Small Business (Restaurant, Studio, Shop)' },
    { id: 'landing-page', label: 'Single-Page Landing / Event Page' },
    { id: 'e-commerce', label: 'E-commerce & Product Store' },
    { id: 'custom-web-app', label: 'Custom Web Application or Portal' }
  ];

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!formData.name || !formData.email || !formData.phone || !formData.details) {
      setError('Please fill in all mandatory fields (*).');
      setIsSubmitting(false);
      return;
    }

    try {
      const newInquiry: WebDesignInquiry = {
        id: 'web-inq-' + Date.now(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        businessName: formData.businessName || 'Not Specified',
        projectType: formData.projectType,
        maintenanceRequired: formData.maintenanceRequired as 'yes' | 'no',
        details: formData.details,
        status: 'new',
        createdAt: new Date().toISOString()
      };

      const typeLabel = projectTypes.find(t => t.id === newInquiry.projectType)?.label || newInquiry.projectType;
      
      const fullMessage = 
        `Project Vision & Goals:\n${formData.details}\n\n` +
        `Continuous Maintenance Desired: ${formData.maintenanceRequired.toUpperCase()}`;

      // Send data to Web3Forms API
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: "0164c78e-152d-4414-a831-61f2621bb059",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: `Web Design Consultation: ${formData.name} (${formData.businessName || 'No Business Named'})`,
          project_type: typeLabel,
          business_name: formData.businessName || 'Not Specified',
          message: fullMessage
        })
      });

      const result = await response.json();

      if (!result.success) {
        console.error("Web3Forms API Error Details:", result);
        throw new Error(result.message || 'Web3Forms failed to process email dispatch.');
      }

      // Save to localStorage so your system retains it
      const existing = localStorage.getItem('guzzi_web_design_inquiries');
      const list = existing ? JSON.parse(existing) : [];
      list.push(newInquiry);
      localStorage.setItem('guzzi_web_design_inquiries', JSON.stringify(list));

      // Clear Form Fields on success
      setFormData({
        name: '',
        email: '',
        phone: '',
        businessName: '',
        projectType: 'portfolio-creative',
        maintenanceRequired: 'yes',
        details: ''
      });

      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setError('Something went wrong sending your request. Please check your inputs and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="web-design-page" className="pt-24 min-h-screen bg-[#F8F9FA] bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] text-stone-900 font-sans border-b border-stone-200 relative">
      
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-12 relative overflow-visible">
        
        {/* Dynamic Vector Rocket Trail */}
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-visible hidden md:block">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 350" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="rocket-trail-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d97706" stopOpacity="0" />
                <stop offset="30%" stopColor="#b45309" stopOpacity="0.2" />
                <stop offset="75%" stopColor="#d97706" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#b45309" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            
            {/* Trail lines wrapping around text area */}
            <path 
              d="M 120 280 C 250 320, 320 180, 480 160 C 640 140, 710 260, 840 80" 
              stroke="url(#rocket-trail-grad)" 
              strokeWidth="2" 
              strokeLinecap="round" 
              fill="none" 
            />
            
            <path 
              d="M 110 290 C 240 330, 310 190, 475 170 C 635 150, 700 270, 835 90" 
              stroke="#f59e0b" 
              strokeWidth="0.75" 
              strokeDasharray="4 6" 
              strokeLinecap="round" 
              fill="none" 
              opacity="0.5"
            />

            {/* Accent loop circling through words */}
            <path 
              d="M 320 150 C 400 110, 480 200, 430 240 C 380 280, 330 200, 410 140" 
              stroke="#b45309" 
              strokeWidth="1" 
              strokeDasharray="1 4" 
              fill="none" 
              opacity="0.25" 
            />

            {/* Sparkles / Unreal stars along the trail */}
            <g transform="translate(180, 270) scale(0.6)">
              <path d="M 0,-10 L 2,-2 L 10,0 L 2,2 L 0,10 L -2,2 L -10,0 L -2,-2 Z" fill="#d97706" opacity="0.5" />
            </g>
            <g transform="translate(440, 190) scale(0.8)">
              <path d="M 0,-10 L 2,-2 L 10,0 L 2,2 L 0,10 L -2,2 L -10,0 L -2,-2 Z" fill="#b45309" opacity="0.6" />
            </g>
            <g transform="translate(620, 210) scale(0.5)">
              <path d="M 0,-10 L 2,-2 L 10,0 L 2,2 L 0,10 L -2,2 L -10,0 L -2,-2 Z" fill="#d97706" opacity="0.4" />
            </g>
            <g transform="translate(790, 120) scale(0.9)">
              <path d="M 0,-10 L 2,-2 L 10,0 L 2,2 L 0,10 L -2,2 L -10,0 L -2,-2 Z" fill="#b45309" />
            </g>
            
            {/* Cosmic dust points */}
            <circle cx="280" cy="270" r="2" fill="#d97706" opacity="0.3" />
            <circle cx="510" cy="150" r="2.5" fill="#b45309" opacity="0.4" />
            <circle cx="730" cy="180" r="1.5" fill="#f59e0b" opacity="0.5" />

            {/* Minimalist modern rocket ship */}
            <g transform="translate(840, 80) rotate(52) scale(1.15)">
              {/* Flame plume */}
              <path d="M -3 14 L 0 30 L 3 14 Z" fill="url(#rocket-trail-grad)" opacity="0.85" />
              <path d="M -1.5 14 L 0 22 L 1.5 14 Z" fill="#f59e0b" />
              
              {/* Fins */}
              <path d="M -7 5 L -14 15 L -6 12 Z" fill="#78350f" stroke="#78350f" strokeWidth="0.5" />
              <path d="M 7 5 L 14 15 L 6 12 Z" fill="#78350f" stroke="#78350f" strokeWidth="0.5" />
              
              {/* Main Body */}
              <path d="M 0 -22 C 5 -10 7 2 5 14 L -5 14 C -7 2 -5 -10 0 -22 Z" fill="#FFFFFF" stroke="#78350f" strokeWidth="1.5" />
              
              {/* Window */}
              <circle cx="0" cy="-3" r="2.5" fill="#d97706" stroke="#78350f" strokeWidth="0.75" />
              
              {/* Tip */}
              <path d="M 0 -22 C 2 -18 3 -15 3 -12 L -3 -12 C -3 -15 -2 -18 0 -22 Z" fill="#78350f" />
            </g>
          </svg>
        </div>

        {/* Dynamic Vector Rocket Trail for Mobile */}
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-visible md:hidden">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 350 250" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M 40 210 Q 120 220 180 140 T 280 50" 
              stroke="#d97706" 
              strokeWidth="1.5" 
              fill="none" 
              opacity="0.5"
            />
            <g transform="translate(280, 50) rotate(52) scale(0.75)">
              <path d="M -3 14 L 0 26 L 3 14 Z" fill="#f59e0b" />
              <path d="M -7 5 L -14 15 L -6 12 Z" fill="#78350f" />
              <path d="M 7 5 L 14 15 L 6 12 Z" fill="#78350f" />
              <path d="M 0 -22 C 5 -10 7 2 5 14 L -5 14 C -7 2 -5 -10 0 -22 Z" fill="#FFFFFF" stroke="#78350f" strokeWidth="1.5" />
            </g>
          </svg>
        </div>

        <div className="text-center max-w-3xl mx-auto space-y-4 relative z-10">
          <span className="text-amber-800 text-[10px] tracking-[0.3em] uppercase font-semibold font-mono block">
            LAUNCH YOUR VISION TODAY
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-stone-900 tracking-tight leading-tight font-light">
            Luxury Websites for Visionaries
          </h1>
          <div className="h-[1px] w-12 bg-stone-300 mx-auto mt-4"></div>
          <p className="text-stone-600 text-xs md:text-sm font-sans font-light leading-relaxed pt-2 max-w-2xl mx-auto">
            We help small businesses, creatives, and independent professionals craft distinctive, lightning-fast digital experiences. From concept to launch, Luis Guzman serves as your dedicated head designer, publisher, and long-term maintenance partner.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Services & Deliverables (5 columns) */}
          <div className="lg:col-span-5 space-y-8 lg:pt-6">
            
            {/* The Pillars of Guzzi Web Design */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-amber-700" />
                <h3 className="font-serif text-lg tracking-tight font-light text-stone-900">Our Complete Web Solution</h3>
              </div>
              <p className="text-stone-600 text-xs font-sans font-light leading-relaxed">
                Most web agencies build a template, dump it on your desktop, and leave you to figure out hosting, domains, and security patches. At Guzzi Studios, Luis provides a premium, fully-managed ecosystem so you can focus entirely on your business.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {/* Feature 1 */}
              <div className="flex gap-4 p-5 bg-white border border-stone-200 rounded-sm hover:border-stone-300 transition-colors shadow-sm">
                <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0 text-amber-700 border border-amber-200">
                  <Layout className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-semibold text-stone-900 tracking-wider uppercase font-sans">Bespoke UI Design</h4>
                  <p className="text-[11px] text-stone-500 font-sans font-light leading-relaxed">
                    No recycled generic themes. Every website features striking modern typography, gorgeous whitespace, and custom animations optimized for high-contrast presentation.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex gap-4 p-5 bg-white border border-stone-200 rounded-sm hover:border-stone-300 transition-colors shadow-sm">
                <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0 text-amber-700 border border-amber-200">
                  <Server className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-semibold text-stone-900 tracking-wider uppercase font-sans">Hassle-Free Publishing</h4>
                  <p className="text-[11px] text-stone-500 font-sans font-light leading-relaxed">
                    We manage your domain connection, set up secure SSL certificates, configure professional DNS records, and host your site on global cloud servers with absolute zero downtime.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex gap-4 p-5 bg-white border border-stone-200 rounded-sm hover:border-stone-300 transition-colors shadow-sm">
                <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0 text-amber-700 border border-amber-200">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-semibold text-stone-900 tracking-wider uppercase font-sans">Lifetime Maintenance & Updates</h4>
                  <p className="text-[11px] text-stone-500 font-sans font-light leading-relaxed">
                    Need to change a photo? Want to add a new service or edit pricing? Simply text or email us. As your publisher & updater, Luis handles all maintenance, backups, and live content tweaks within 24 hours.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex gap-4 p-5 bg-white border border-stone-200 rounded-sm hover:border-stone-300 transition-colors shadow-sm">
                <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0 text-amber-700 border border-amber-200">
                  <Shield className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-semibold text-stone-900 tracking-wider uppercase font-sans">SEO & Speed Optimization</h4>
                  <p className="text-[11px] text-stone-500 font-sans font-light leading-relaxed">
                    Lightning fast load times coupled with clean structured metadata. We ensure your business ranks elegantly on Google and performs flawlessly on mobile devices.
                  </p>
                </div>
              </div>
            </div>

            {/* Quote block */}
            <div className="p-6 border-l-2 border-amber-600 bg-amber-50 space-y-3">
              <span className="text-[9px] tracking-[0.2em] uppercase text-amber-700 font-mono block">PARTNERSHIP VALUE</span>
              <p className="italic font-serif text-stone-800 text-sm leading-relaxed">
                "A great website acts as your 24/7 digital storefront. It should communicate the identical level of luxury and precision that you offer in person."
              </p>
              <p className="text-[10px] text-stone-500 font-mono tracking-wider">— Luis Guzman, Lead Designer</p>
            </div>

          </div>

          {/* Right Column: Interactive Consultation Planner (7 columns) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Bespoke Launch Blueprint (Moved above Launch Your Project and made full-width of the column) */}
            <div className="p-8 md:p-10 border border-stone-200 bg-white shadow-sm space-y-5 rounded-sm">
              <span className="text-[9px] tracking-[0.2em] uppercase text-amber-700 font-mono block">TRANSPARENT VALUE & TIMELINE</span>
              <h3 className="font-serif text-lg md:text-xl tracking-tight font-light text-stone-900">Bespoke Launch Blueprint</h3>
              <p className="text-stone-600 text-xs font-sans font-light leading-relaxed">
                We reject confusing hourly rates or expensive premium agency markups. Our streamlined framework is designed for direct, executive-level speed and value.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 border-t border-stone-100">
                {/* Retainer detail */}
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center flex-shrink-0 text-amber-700 border border-stone-200">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold text-stone-900 tracking-wider uppercase font-sans">50% Retainer</h4>
                    <p className="text-[11px] text-stone-500 font-sans font-light leading-relaxed">
                      Secure your scheduling slot with a standard 50% initial retainer fee. Remaining balance is payable upon satisfaction.
                    </p>
                  </div>
                </div>

                {/* Pricing detail */}
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center flex-shrink-0 text-amber-700 border border-stone-200">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold text-stone-900 tracking-wider uppercase font-sans">Flat $900 Total</h4>
                    <p className="text-[11px] text-stone-500 font-sans font-light leading-relaxed">
                      Flat $900 development cost. Full domain configuration, responsive mobile polish, and hosting setup included.
                    </p>
                  </div>
                </div>

                {/* Timeline detail */}
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center flex-shrink-0 text-amber-700 border border-stone-200">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold text-stone-900 tracking-wider uppercase font-sans">4–6 Weeks</h4>
                    <p className="text-[11px] text-stone-500 font-sans font-light leading-relaxed">
                      Your platform will be fully functional, optimized for SEO, and live for customers worldwide in four to six weeks.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full bg-white border border-stone-200 p-8 md:p-12 shadow-xl rounded-sm text-stone-900">
              
              {isSuccess ? (
                <div className="text-center py-12 space-y-6 animate-fade-in">
                  <div className="w-16 h-16 bg-amber-50 text-amber-700 rounded-full flex items-center justify-center mx-auto border border-amber-200">
                    <Check className="w-8 h-8" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-serif text-3xl text-stone-900 tracking-tight font-light">
                      Consultation Requested
                    </h3>
                    <p className="text-amber-800 text-[10px] font-mono tracking-widest uppercase">
                      Status: ACTIVE PLANNING STAGE
                    </p>
                  </div>
                  <p className="text-stone-600 text-sm font-sans font-light leading-relaxed max-w-md mx-auto">
                    Thank you for detailing your web design requirements. Luis Guzman will evaluate your request to formulate a tailor-made blueprint. If a physical or video consult is required, we will contact you shortly.
                  </p>
                  <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
                    {lastGmailUrl && (
                      <a
                        href={lastGmailUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-[#0C0C0C] text-white hover:bg-black/90 font-bold transition-all text-xs tracking-[0.2em] uppercase cursor-pointer font-sans inline-flex items-center gap-2 shadow-md"
                      >
                        <span>Submit Proposal Email</span>
                      </a>
                    )}
                    <button
                      onClick={() => {
                        onNavigate('home');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-6 py-3 border border-stone-300 text-stone-800 hover:bg-stone-50 transition-all text-xs tracking-[0.2em] uppercase font-semibold cursor-pointer font-sans"
                    >
                      Return to Home
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="text-center mb-8 space-y-2">
                    <h3 className="font-serif text-2xl md:text-3xl text-stone-900 tracking-tight font-light">
                      Launch Your Project
                    </h3>
                    <p className="text-stone-500 text-xs font-sans font-light">
                      Fill out the details below to provision your custom web quote.
                    </p>
                  </div>

                  {error && (
                    <div className="p-4 bg-red-50 text-red-600 text-xs font-medium font-sans border-l-2 border-red-500 rounded-sm">
                      {error}
                    </div>
                  )}

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-stone-500 font-mono font-medium flex items-center gap-1">
                        <User className="w-3.5 h-3.5" /> Your Name <span className="text-amber-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-amber-600 transition-colors rounded-none placeholder:text-stone-400 font-sans"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-stone-500 font-mono font-medium flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5" /> Email Address <span className="text-amber-600">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="john@example.com"
                        className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-amber-600 transition-colors rounded-none placeholder:text-stone-400 font-sans"
                      />
                    </div>
                  </div>

                  {/* Phone & Company Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-stone-500 font-mono font-medium flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5" /> Phone Number <span className="text-amber-600">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="(312) 555-0199"
                        className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-amber-600 transition-colors rounded-none placeholder:text-stone-400 font-sans"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-stone-500 font-mono font-medium flex items-center gap-1">
                        <Landmark className="w-3.5 h-3.5" /> Business / Project Name
                      </label>
                      <input
                        type="text"
                        value={formData.businessName}
                        onChange={(e) => handleInputChange('businessName', e.target.value)}
                        placeholder="e.g. Skyline Creative Studio"
                        className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-amber-600 transition-colors rounded-none placeholder:text-stone-400 font-sans"
                      />
                    </div>
                  </div>

                  {/* Project Type Selection */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-stone-500 font-mono font-medium flex items-center gap-1">
                      <Layout className="w-3.5 h-3.5" /> Desired Digital Framework
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => handleInputChange('projectType', e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-amber-600 transition-colors rounded-none font-sans"
                    >
                      {projectTypes.map(type => (
                        <option key={type.id} value={type.id} className="bg-white text-stone-900">
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Maintenance Requirement */}
                  <div className="space-y-2.5">
                    <label className="text-[10px] uppercase tracking-widest text-stone-500 font-mono font-medium block">
                      Do you require continuous maintenance, hosting & content updates?
                    </label>
                    <div className="flex items-center space-x-6">
                      <label className="flex items-center space-x-2 text-xs font-sans cursor-pointer">
                        <input
                          type="radio"
                          name="maintenanceRequired"
                          value="yes"
                          checked={formData.maintenanceRequired === 'yes'}
                          onChange={() => handleInputChange('maintenanceRequired', 'yes')}
                          className="sr-only"
                        />
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                          formData.maintenanceRequired === 'yes' ? 'border-amber-600 bg-amber-50' : 'border-stone-300'
                        }`}>
                          {formData.maintenanceRequired === 'yes' && <div className="w-2 h-2 rounded-full bg-amber-600" />}
                        </div>
                        <span className="text-stone-700">Yes (Complete Hands-Off Care)</span>
                      </label>

                      <label className="flex items-center space-x-2 text-xs font-sans cursor-pointer">
                        <input
                          type="radio"
                          name="maintenanceRequired"
                          value="no"
                          checked={formData.maintenanceRequired === 'no'}
                          onChange={() => handleInputChange('maintenanceRequired', 'no')}
                          className="sr-only"
                        />
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                          formData.maintenanceRequired === 'no' ? 'border-amber-600 bg-amber-50' : 'border-stone-300'
                        }`}>
                          {formData.maintenanceRequired === 'no' && <div className="w-2 h-2 rounded-full bg-amber-600" />}
                        </div>
                        <span className="text-stone-700">No (Publish Only)</span>
                      </label>
                    </div>
                  </div>

                  {/* Vision Details */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-stone-500 font-mono font-medium flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5" /> Project Vision, Pages & Feature Requirements <span className="text-amber-600">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.details}
                      onChange={(e) => handleInputChange('details', e.target.value)}
                      placeholder="Outline your goal, number of pages, essential features (e.g., gallery, appointment scheduler, product cart, social links) and color themes..."
                      className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-amber-600 transition-colors rounded-none placeholder:text-stone-400 resize-none font-sans"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-[#0C0C0C] hover:bg-black/90 disabled:bg-[#0C0C0C]/50 text-white font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-[#0C0C0C] flex items-center justify-center space-x-2 cursor-pointer font-sans"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader className="w-4 h-4 animate-spin text-white" />
                          <span>Preparing Blueprint...</span>
                        </>
                      ) : (
                        <span>Request Digital Blueprint</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
