import { useState, FormEvent } from 'react';
import { Briefcase, Mail, Phone, Globe, Instagram, BookOpen, PenTool, Check, Loader, User } from 'lucide-react';
import { TeamApplication } from '../types';

interface CareersPageProps {
  onNavigate: (view: string) => void;
}

export default function CareersPage({ onNavigate }: CareersPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'second-photographer',
    portfolio: '',
    instagram: '',
    about: '',
    gear: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastGmailUrl, setLastGmailUrl] = useState('');

  const roles = [
    { id: 'second-photographer', label: 'Second Photographer' },
    { id: 'videographer', label: 'Videographer / Cinematographer' },
    { id: 'media-editor', label: 'Media Editor (Photo/Video)' },
    { id: 'web-designer', label: 'Web Designer & Developer' },
    { id: 'sales-rep', label: 'Sales & Marketing Representative' }
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.portfolio) {
      setError('Please fill out all required fields, including your portfolio link.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API saving with 1.5s delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const newApplication: TeamApplication = {
        id: 'app-' + Date.now(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        portfolio: formData.portfolio,
        instagram: formData.instagram,
        about: formData.about,
        gear: formData.gear,
        status: 'new',
        createdAt: new Date().toISOString()
      };

      // Retrieve existing applications
      const existing = localStorage.getItem('guzzi_applications');
      const apps = existing ? JSON.parse(existing) : [];
      apps.push(newApplication);
      localStorage.setItem('guzzi_applications', JSON.stringify(apps));

      // Construct Gmail redirection URL
      const roleLabel = roles.find(r => r.id === newApplication.role)?.label || newApplication.role;
      const subject = `New Team Application: ${newApplication.name} - ${roleLabel}`;
      const body = `Hello Luis,\n\nYou have received a new team application. Here are the details:\n\n` +
        `- Name: ${newApplication.name}\n` +
        `- Email: ${newApplication.email}\n` +
        `- Phone: ${newApplication.phone}\n` +
        `- Role of Interest: ${roleLabel}\n` +
        `- Portfolio: ${newApplication.portfolio}\n` +
        `- Instagram: ${newApplication.instagram || 'N/A'}\n` +
        `- Gear setup: ${newApplication.gear || 'N/A'}\n\n` +
        `About / Experience:\n${newApplication.about || 'N/A'}\n\n` +
        `---\nLogged in client application queue.`;

      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=guzzistudios.luis@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setLastGmailUrl(gmailUrl);

      // Open Gmail in a new tab/window to submit
      window.open(gmailUrl, '_blank', 'noopener,noreferrer');

      setIsSuccess(true);
    } catch (err) {
      setError('An error occurred while submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="careers-page" className="pt-24 min-h-screen bg-[#0C0C0C] bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] text-white font-sans border-b border-white/10 relative">
      
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-gold-200 text-[10px] tracking-[0.3em] uppercase font-semibold font-mono block">
            Join the Guzzi Team
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-white tracking-tight leading-tight font-light">
            Build the Future of Visual Luxury
          </h1>
          <div className="h-[1px] w-12 bg-white/20 mx-auto mt-4"></div>
          <p className="text-white/60 text-xs md:text-sm font-sans font-light leading-relaxed pt-2 max-w-2xl mx-auto">
            We are looking for elite creatives, meticulous media editors, and passionate designers who want to elevate the standard of visual storytelling. Learn, grow, and execute at the absolute highest level.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Role Details & Culture (5 columns) */}
          <div className="lg:col-span-5 space-y-8 lg:pt-10">
            
            {/* Open Roles Guide */}
            <div className="bg-[#111111]/40 border border-white/10 p-8 shadow-2xl rounded-sm space-y-6">
              <div className="flex items-center space-x-3">
                <Briefcase className="w-5 h-5 text-gold-200" />
                <h3 className="font-serif text-lg tracking-tight font-light text-white">Current Opportunities</h3>
              </div>
              <p className="text-white/60 text-xs font-sans font-light leading-relaxed">
                Whether you’re on-site in the heat of a wedding dance floor, or refining a brand design asset in the studio, we provide elite training, top-tier compensation, and professional room to scale.
              </p>
              
              <div className="space-y-4 pt-2">
                <div className="p-3 bg-white/2 border border-white/5 rounded-sm hover:border-white/10 transition-colors">
                  <h4 className="text-xs font-semibold text-white tracking-wider uppercase font-sans">Creative Roles</h4>
                  <p className="text-[11px] text-white/50 font-sans font-light mt-1">
                    Seeking Second Photographers & Videographers with reliable full-frame gear to capture luxury weddings and artist diaries across the Midwest.
                  </p>
                </div>

                <div className="p-3 bg-white/2 border border-white/5 rounded-sm hover:border-white/10 transition-colors">
                  <h4 className="text-xs font-semibold text-white tracking-wider uppercase font-sans">Media Editing</h4>
                  <p className="text-[11px] text-white/50 font-sans font-light mt-1">
                    Meticulous editors with strict color grading expertise and video narrative flow knowledge to work on premium galleries & recap film reels.
                  </p>
                </div>

                <div className="p-3 bg-white/2 border border-white/5 rounded-sm hover:border-white/10 transition-colors">
                  <h4 className="text-xs font-semibold text-white tracking-wider uppercase font-sans">Web & Business</h4>
                  <p className="text-[11px] text-white/50 font-sans font-light mt-1">
                    Looking for web designers and marketing/sales representatives who can communicate the high-end Guzzi aesthetic and handle premium client consultations.
                  </p>
                </div>
              </div>
            </div>

            {/* Why Join Us Accent Box */}
            <div className="p-6 border-l-2 border-gold-200 bg-gold-200/5 space-y-3">
              <span className="text-[9px] tracking-[0.2em] uppercase text-gold-200 font-mono block">OUR PHILOSOPHY</span>
              <p className="italic font-serif text-white/90 text-sm md:text-base leading-relaxed">
                "We do not settle for average. We empower our team to experiment, learn modern luxury branding, and master the art of client experience."
              </p>
              <p className="text-[10px] text-white/40 font-mono tracking-wider">— Luis Guzman, Founder</p>
            </div>

          </div>

          {/* Right Column: Application Form (7 columns) */}
          <div className="lg:col-span-7">
            <div id="application-form-container" className="w-full bg-[#111111]/40 border border-white/10 p-8 md:p-12 shadow-2xl rounded-sm text-white">
              
              {isSuccess ? (
                <div className="text-center py-12 space-y-6 animate-fade-in">
                  <div className="w-16 h-16 bg-gold-200/5 text-gold-200 rounded-full flex items-center justify-center mx-auto border border-gold-200/20">
                    <Check className="w-8 h-8" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-serif text-3xl text-white tracking-tight font-light">
                      Application Submitted
                    </h3>
                    <p className="text-gold-200 text-[10px] font-mono tracking-widest uppercase">
                      Status: RECEIVED & IN QUEUE
                    </p>
                  </div>
                  <p className="text-white/60 text-sm font-sans font-light leading-relaxed max-w-md mx-auto">
                    Thank you for applying to join our creative team. Luis Guzman and our brand coordinators will review your portfolio and work history. If your visual style matches our aesthetic, we will contact you via email to schedule a video screening.
                  </p>
                  <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
                    {lastGmailUrl && (
                      <a
                        href={lastGmailUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-white text-[#0C0C0C] hover:bg-white/90 font-bold transition-all text-xs tracking-[0.2em] uppercase cursor-pointer font-sans inline-flex items-center gap-2"
                      >
                        <span>Send via Gmail</span>
                      </a>
                    )}
                    <button
                      onClick={() => {
                        onNavigate('home');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-6 py-3 border border-white/20 text-white hover:bg-white hover:text-black hover:border-white transition-all text-xs tracking-[0.2em] uppercase font-semibold cursor-pointer font-sans"
                    >
                      Return to Home
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="text-center mb-8 space-y-2">
                    <h3 className="font-serif text-2xl md:text-3xl text-white tracking-tight font-light">
                      Submit Your Portfolio
                    </h3>
                    <p className="text-white/50 text-xs font-sans font-light">
                      Let us know who you are and share your best creative work below.
                    </p>
                  </div>

                  {error && (
                    <div className="p-4 bg-red-950/20 text-red-400 text-xs font-medium font-sans border-l-2 border-red-500 rounded-sm">
                      {error}
                    </div>
                  )}

                  {/* Form fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/50 font-mono font-medium flex items-center gap-1">
                        <User className="w-3.5 h-3.5" /> Full Name <span className="text-gold-200">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sarah Connor"
                        className="w-full bg-[#161616]/60 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-200 transition-colors rounded-none placeholder:text-white/20 font-sans"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/50 font-mono font-medium flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5" /> Email Address <span className="text-gold-200">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. sarah@example.com"
                        className="w-full bg-[#161616]/60 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-200 transition-colors rounded-none placeholder:text-white/20 font-sans"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/50 font-mono font-medium flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5" /> Phone Number <span className="text-gold-200">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. (312) 555-0199"
                        className="w-full bg-[#161616]/60 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-200 transition-colors rounded-none placeholder:text-white/20 font-sans"
                      />
                    </div>

                    {/* Role */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/50 font-mono font-medium flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5" /> Position of Interest
                      </label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full bg-[#161616]/60 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-200 transition-colors rounded-none font-sans"
                      >
                        {roles.map(role => (
                          <option key={role.id} value={role.id} className="bg-[#111111] text-white">
                            {role.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Portfolio Link */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/50 font-mono font-medium flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5" /> Portfolio or Website URL <span className="text-gold-200">*</span>
                    </label>
                    <input
                      type="url"
                      required
                      value={formData.portfolio}
                      onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                      placeholder="e.g. https://www.yourwork.com"
                      className="w-full bg-[#161616]/60 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-200 transition-colors rounded-none placeholder:text-white/20 font-sans"
                    />
                  </div>

                  {/* Instagram Link */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/50 font-mono font-medium flex items-center gap-1">
                      <Instagram className="w-3.5 h-3.5" /> Instagram Handle
                    </label>
                    <input
                      type="text"
                      value={formData.instagram}
                      onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                      placeholder="e.g. @yourcreative"
                      className="w-full bg-[#161616]/60 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-200 transition-colors rounded-none placeholder:text-white/20 font-sans"
                    />
                  </div>

                  {/* Gear Setup (Optional) */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/50 font-mono font-medium flex items-center gap-1">
                      <PenTool className="w-3.5 h-3.5" /> Creative Gear / Software Setup
                    </label>
                    <input
                      type="text"
                      value={formData.gear}
                      onChange={(e) => setFormData({ ...formData, gear: e.target.value })}
                      placeholder="e.g. Sony A7R V, 24-70 GM II, Lightroom CC, Premiere Pro"
                      className="w-full bg-[#161616]/60 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-200 transition-colors rounded-none placeholder:text-white/20 font-sans"
                    />
                  </div>

                  {/* Tell us about your background / experience */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/50 font-mono font-medium flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" /> Tell Us About Your Style & Experience
                    </label>
                    <textarea
                      rows={4}
                      value={formData.about}
                      onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                      placeholder="Tell us about your creative journey, your style, and why you want to collaborate with Guzzi Photography..."
                      className="w-full bg-[#161616]/60 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-200 transition-colors rounded-none placeholder:text-white/20 resize-none font-sans"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-white hover:bg-white/90 disabled:bg-white/50 text-[#0C0C0C] font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)] border border-white flex items-center justify-center space-x-2 cursor-pointer font-sans"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader className="w-4 h-4 animate-spin text-[#0C0C0C]" />
                          <span>Submitting Application...</span>
                        </>
                      ) : (
                        <span>Submit Team Application</span>
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
