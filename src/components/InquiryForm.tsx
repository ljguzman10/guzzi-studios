import { useState, ChangeEvent, FormEvent } from 'react';
import { Inquiry } from '../types';
import { Check, Calendar, Mail, Phone, User, Landmark, MessageSquare, Loader } from 'lucide-react';

interface InquiryFormProps {
  onSuccessSubmit?: (newInquiry: Inquiry) => void;
  defaultType?: 'wedding' | 'event' | 'dj-artist' | 'other';
}

export default function InquiryForm({ onSuccessSubmit, defaultType = 'wedding' }: InquiryFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    type: defaultType,
    venue: '',
    budget: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Basic Validation
    if (!formData.name || !formData.email || !formData.date || !formData.message) {
      setError('Please fill in all mandatory fields (*)');
      setIsSubmitting(false);
      return;
    }

    // Process Submission
    setTimeout(() => {
      const newInquiry: Inquiry = {
        id: 'inq_' + Math.random().toString(36).substr(2, 9),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: formData.date,
        type: formData.type as any,
        venue: formData.venue || 'TBD / Not Specified',
        budget: formData.budget || 'TBD / Flexible',
        message: formData.message,
        status: 'new',
        createdAt: new Date().toISOString()
      };

      try {
        // Fetch existing from localStorage
        const stored = localStorage.getItem('guzzi_inquiries');
        const list = stored ? JSON.parse(stored) : [];
        list.unshift(newInquiry);
        localStorage.setItem('guzzi_inquiries', JSON.stringify(list));

        // Call callback if provided to update the live CRM view in AdminPanel
        if (onSuccessSubmit) {
          onSuccessSubmit(newInquiry);
        }

        setIsSuccess(true);
        // Clear Form
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          type: 'wedding',
          venue: '',
          budget: '',
          message: ''
        });
      } catch (err) {
        console.error('CRM local write error:', err);
        setError('There was an issue processing your request. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }, 1200);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto pt-10">
      {/* "Why choose Guzzi?" button positioned above the div on the top right hand corner */}
      <div className="absolute top-0 right-0">
        <button
          type="button"
          onClick={() => {
            const el = document.getElementById('why-guzzi');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="px-4 py-1.5 rounded-full border border-gold-200/40 hover:border-gold-200 text-gold-200 bg-gold-200/5 hover:bg-gold-200/10 hover:shadow-[0_0_12px_rgba(229,222,179,0.15)] text-[10px] tracking-wider uppercase font-semibold transition-all cursor-pointer flex items-center gap-1.5 font-sans"
        >
          Why choose Guzzi?
          <span className="text-[9px]">↓</span>
        </button>
      </div>

      <div id="inquiry-form-container" className="w-full bg-[#111111]/40 border border-white/10 p-8 md:p-12 shadow-2xl rounded-sm text-white">
        {isSuccess ? (
          <div className="text-center py-12 space-y-6 animate-fade-in">
            <div className="w-16 h-16 bg-white/5 text-white/90 rounded-full flex items-center justify-center mx-auto border border-white/20">
              <Check className="w-8 h-8" />
            </div>
            <div className="space-y-3">
              <h3 className="font-serif text-3xl text-white tracking-tight font-light">
                Your Date is Provisionally Held
              </h3>
              <p className="text-white/50 text-[10px] font-mono tracking-widest uppercase">
                Provisional Booking Status: ACTIVE
              </p>
            </div>
            <p className="text-white/60 text-sm font-sans font-light leading-relaxed max-w-md mx-auto">
              Thank you for reaching out, your inquiry has been logged into our client database. Luis Guzman will personally review your timeline, check availability, and contact you via email or phone within 24 hours.
            </p>
            <div className="pt-6">
              <button
                onClick={() => setIsSuccess(false)}
                className="px-6 py-3 border border-white/20 text-white hover:bg-white hover:text-black hover:border-white transition-all text-xs tracking-[0.2em] uppercase font-semibold cursor-pointer font-sans"
              >
                Submit Another Inquiry
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-8 space-y-2">
              <h3 className="font-serif text-2xl md:text-3xl text-white tracking-tight font-light">
                Check Date Availability
              </h3>
              <p className="text-white/50 text-xs font-sans font-light">
                Submit your project details to lock in a complimentary virtual planning session.
              </p>
            </div>

          {error && (
            <div className="p-4 bg-red-950/20 text-red-400 text-xs font-medium font-sans border-l-2 border-red-500 rounded-sm">
              {error}
            </div>
          )}

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="block text-[10px] uppercase tracking-[0.15em] font-semibold text-white/60 font-sans">
                Full Name <span className="text-white/40">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-white/30 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Elena Rostova"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 focus:border-white/30 focus:ring-0 text-xs text-white font-sans outline-none rounded-sm transition-all placeholder-white/25"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="block text-[10px] uppercase tracking-[0.15em] font-semibold text-white/60 font-sans">
                Email Address <span className="text-white/40">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-white/30 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="elena@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 focus:border-white/30 focus:ring-0 text-xs text-white font-sans outline-none rounded-sm transition-all placeholder-white/25"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5">
              <label className="block text-[10px] uppercase tracking-[0.15em] font-semibold text-white/60 font-sans">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-white/30 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(773) 577-7372"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 focus:border-white/30 focus:ring-0 text-xs text-white font-sans outline-none rounded-sm transition-all placeholder-white/25"
                />
              </div>
            </div>

            {/* Event / Wedding Date */}
            <div className="space-y-1.5">
              <label className="block text-[10px] uppercase tracking-[0.15em] font-semibold text-white/60 font-sans">
                Wedding/Event Date <span className="text-white/40">*</span>
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-white/30 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 focus:border-white/30 focus:ring-0 text-xs text-white font-sans outline-none rounded-sm transition-all"
                />
              </div>
            </div>

            {/* Service Type */}
            <div className="space-y-1.5">
              <label className="block text-[10px] uppercase tracking-[0.15em] font-semibold text-white/60 font-sans">
                Service Focus
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-white/30 focus:ring-0 text-xs text-white font-sans outline-none rounded-sm transition-all appearance-none cursor-pointer"
              >
                <option value="wedding" className="bg-[#111111] text-white">Wedding Celebration</option>
                <option value="event" className="bg-[#111111] text-white">Corporate Event / Gala</option>
                <option value="dj-artist" className="bg-[#111111] text-white">DJ & Music Artist Branding</option>
                <option value="other" className="bg-[#111111] text-white">Other Unique Celebration</option>
              </select>
            </div>

            {/* Venue / Location */}
            <div className="space-y-1.5">
              <label className="block text-[10px] uppercase tracking-[0.15em] font-semibold text-white/60 font-sans">
                Event Venue / Location
              </label>
              <div className="relative">
                <Landmark className="w-4 h-4 text-white/30 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  placeholder="e.g. Blackstone Hotel, Chicago"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 focus:border-white/30 focus:ring-0 text-xs text-white font-sans outline-none rounded-sm transition-all placeholder-white/25"
                />
              </div>
            </div>

            {/* Budget */}
            <div className="col-span-1 md:col-span-2 space-y-1.5">
              <label className="block text-[10px] uppercase tracking-[0.15em] font-semibold text-white/60 font-sans">
                Estimated Photography Budget
              </label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-white/30 focus:ring-0 text-xs text-white font-sans outline-none rounded-sm transition-all cursor-pointer"
              >
                <option value="" className="bg-[#111111] text-white/50">Select a range...</option>
                <option value="$3,000 - $5,000" className="bg-[#111111] text-white">$3,000 – $5,000</option>
                <option value="$5,000 - $8,000" className="bg-[#111111] text-white">$5,000 – $8,000 (Most Popular)</option>
                <option value="$8,000 - $12,000" className="bg-[#111111] text-white">$8,000 – $12,000 (Luxury Full Day)</option>
                <option value="$12,000+" className="bg-[#111111] text-white">$12,000+ (Custom multi-day/destination)</option>
                <option value="flexible" className="bg-[#111111] text-white">I am flexible / Custom request</option>
              </select>
            </div>

            {/* Message */}
            <div className="col-span-1 md:col-span-2 space-y-1.5">
              <label className="block text-[10px] uppercase tracking-[0.15em] font-semibold text-white/60 font-sans">
                Tell Us Your Story & Vision <span className="text-white/40">*</span>
              </label>
              <div className="relative">
                <MessageSquare className="w-4 h-4 text-white/30 absolute left-3.5 top-3.5 pointer-events-none" />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Share a bit about yourselves, the style of coverage you desire, or the details of your event..."
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 focus:border-white/30 focus:ring-0 text-xs text-white font-sans outline-none rounded-sm transition-all resize-none placeholder-white/25"
                />
              </div>
            </div>
          </div>

          {/* Submit button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gold-200 hover:bg-gold-100 disabled:bg-gold-200/50 text-[#0C0C0C] font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(229,222,179,0.25)] border border-gold-200 flex items-center justify-center space-x-2 cursor-pointer font-sans"
            >
              {isSubmitting ? (
                <>
                  <Loader className="w-4 h-4 animate-spin text-[#0C0C0C]" />
                  <span>Reserving Date in CRM...</span>
                </>
              ) : (
                <span>Reserve Your Date</span>
              )}
            </button>
          </div>
        </form>
      )}
      </div>
    </div>
  );
}
