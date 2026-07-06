import { useState, FormEvent } from 'react';
import { Layout, Shield, Server, RefreshCw, Check, Loader, User, Mail, Phone, Landmark, MessageSquare, Globe } from 'lucide-react';
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
      // Simulate save and database log with a tiny delay
      await new Promise((resolve) => setTimeout(resolve, 1200));

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

      // Save to localStorage so Luis's local system retains it
      const existing = localStorage.getItem('guzzi_web_design_inquiries');
      const list = existing ? JSON.parse(existing) : [];
      list.push(newInquiry);
      localStorage.setItem('guzzi_web_design_inquiries', JSON.stringify(list));

      // Build beautiful prefilled Gmail compose URL
      const typeLabel = projectTypes.find(t => t.id === newInquiry.projectType)?.label || newInquiry.projectType;
      const subject = `Web Design Consultation: ${newInquiry.name} (${newInquiry.businessName})`;
      const body = `Hello Luis,\n\nYou have received a new Web Design & Development inquiry. Here are the project details:\n\n` +
        `- Client Name: ${newInquiry.name}\n` +
        `- Email Address: ${newInquiry.email}\n` +
        `- Phone Number: ${newInquiry.phone}\n` +
        `- Business/Project: ${newInquiry.businessName}\n` +
        `- Project Type: ${typeLabel}\n` +
        `- Continuous Maintenance & Updates Desired: ${newInquiry.maintenanceRequired.toUpperCase()}\n\n` +
        `Project Vision & Goals:\n${newInquiry.details}\n\n` +
        `---\nCaptured in Guzzi Studios client CRM.`;

      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=guzzistudios.luis@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setLastGmailUrl(gmailUrl);

      // Attempt to launch in background/new tab
      window.open(gmailUrl, '_blank', 'noopener,noreferrer');

      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please check your inputs and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="web-design-page" className="pt-24 min-h-screen bg-[#F8F9FA] bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] text-stone-900 font-sans border-b border-stone-200 relative">
      
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-amber-800 text-[10px] tracking-[0.3em] uppercase font-semibold font-mono block">
            Digital Architecture & Design
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
          <div className="lg:col-span-7">
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
                      Start Your Project
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
