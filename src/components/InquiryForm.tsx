import { useState, ChangeEvent, FormEvent } from 'react';
import { Inquiry } from '../types';
import { Check, Calendar, Mail, Phone, User, Landmark, MessageSquare, Loader, DollarSign } from 'lucide-react';

const weddingCoveragePhases = [
  {
    phase: "Beginning of the Day",
    items: [
      { id: "detail_shots", label: "Detail Shots (Rings, invitations, shoes)" },
      { id: "dress_shots", label: "Dress Shots" },
      { id: "getting_ready", label: "Getting Ready Shots" },
      { id: "bridal_gown", label: "Bridal Gown / Flat Lay" },
      { id: "button_up", label: "Button-Up / Suit & Tux" },
    ]
  },
  {
    phase: "Middle of the Day / Ceremony",
    items: [
      { id: "first_look", label: "First Look" },
      { id: "ceremony_vows", label: "Ceremony & Vows" },
      { id: "wedding_party", label: "Wedding Party Portraits" },
      { id: "family_formals", label: "Family Formals" },
      { id: "couples_portraits", label: "Couples Portraits" },
    ]
  },
  {
    phase: "End of the Day / Reception",
    items: [
      { id: "grand_entrance", label: "Grand Entrance" },
      { id: "cake_cutting", label: "Cake Cutting" },
      { id: "first_dances", label: "First Dances" },
      { id: "speeches", label: "Speeches" },
      { id: "dancing_candids", label: "Dancing & Reception Candids" },
      { id: "bouquet_toss", label: "Bouquet / Garter Toss" },
      { id: "grand_exit", label: "Grand Exit (Sparklers / Send-off)" },
    ]
  }
];

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

  const [selectedCoverage, setSelectedCoverage] = useState<string[]>([]);
  const [secondLocation, setSecondLocation] = useState(false);
  const [secondVenue, setSecondVenue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCoverageToggle = (id: string) => {
    setSelectedCoverage((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Basic Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.type || !formData.venue || !formData.message || (secondLocation && !secondVenue)) {
      setError('Please fill in all mandatory fields (*)');
      setIsSubmitting(false);
      return;
    }

    // Process Submission
    setTimeout(async () => {
      // Find coverage names selected
      const coverageLabels = selectedCoverage.map(id => {
        for (const phase of weddingCoveragePhases) {
          const item = phase.items.find(i => i.id === id);
          if (item) return item.label;
        }
        return id;
      });

      const coverageText = coverageLabels.length > 0 
        ? `\n\n[Wedding Day Coverage Desired]:\n` + coverageLabels.map(l => `- ${l}`).join('\n')
        : '';

      const secondLocText = secondLocation ? `\n\n[Second Location Required]: Yes (Location: ${secondVenue})` : '';
      const fullMessage = formData.message + coverageText + secondLocText;

      const newInquiry: Inquiry = {
        id: 'inq_' + Math.random().toString(36).substr(2, 9),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: formData.date,
        type: formData.type as any,
        venue: formData.venue || 'TBD / Not Specified',
        budget: formData.budget || 'TBD / Flexible',
        message: fullMessage,
        status: 'new',
        createdAt: new Date().toISOString()
      };

      try {
        // Asynchronous background fetch request to Web3Forms
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            // Ensure this key exactly matches your new Web3Forms access key
            access_key: "0164c78e-152d-4414-a831-61f2621bb059",
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            date: formData.date,
            type: formData.type,
            venue: formData.venue + (secondLocation ? ` (Second Location: ${secondVenue})` : ''),
            budget: formData.budget,
            message: fullMessage,
            // Explicitly pass the subject so your email doesn't get marked as spam
            subject: `New ${formData.type.toUpperCase()} Inquiry from ${formData.name}`
          })
        });

        const result = await response.json();

        // Web3Forms explicitly sends a boolean 'success' flag in the JSON response
        if (!result.success) {
          console.error("Web3Forms API Error Details:", result);
          throw new Error(result.message || 'Web3Forms failed to process email dispatch.');
        }

        // Fetch existing from localStorage for CRM Sync
        const stored = localStorage.getItem('guzzi_inquiries');
        const list = stored ? JSON.parse(stored) : [];

        // Call callback if provided to update the live CRM view in AdminPanel
        if (onSuccessSubmit) {
          onSuccessSubmit(newInquiry);
        }

        // Toggle success state directly
        setIsSuccess(true);
        
        // Clear Form Fields
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
        setSelectedCoverage([]);
        setSecondLocation(false);
        setSecondVenue('');
      } catch (err) {
        console.error('Submission error:', err);
        setError('There was an issue processing your request and sending the email. Please try again.');
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
              Thank you for reaching out, your inquiry has been logged into our client database and emailed over to us. Luis Guzman will personally review your timeline, check availability, and contact you via email or phone within 24 hours.
            </p>
            <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
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
                  placeholder="John Doe"
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
                Phone Number <span className="text-white/40">*</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-white/30 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
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
                Service Focus <span className="text-white/40">*</span>
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-white/30 focus:ring-0 text-xs text-white font-sans outline-none rounded-sm transition-all appearance-none cursor-pointer"
              >
                <option value="wedding" className="bg-[#111111] text-white">Wedding Celebration</option>
                <option value="event" className="bg-[#111111] text-white">Event / Gala / Party</option>
                <option value="dj-artist" className="bg-[#111111] text-white">DJ & Music Artist Branding</option>
                <option value="other" className="bg-[#111111] text-white">Other Unique Celebration</option>
              </select>
            </div>

            {/* Venue / Location */}
            <div className="space-y-1.5">
              <label className="block text-[10px] uppercase tracking-[0.15em] font-semibold text-white/60 font-sans">
                Event Venue / Location <span className="text-white/40">*</span>
              </label>
              <div className="relative">
                <Landmark className="w-4 h-4 text-white/30 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Blackstone Hotel, Chicago"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 focus:border-white/30 focus:ring-0 text-xs text-white font-sans outline-none rounded-sm transition-all placeholder-white/25"
                />
              </div>
              <div className="pt-1 flex items-center justify-between gap-4">
                <label className="inline-flex items-center space-x-2 text-[11px] text-white/60 hover:text-white cursor-pointer select-none flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={secondLocation}
                    onChange={(e) => setSecondLocation(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center transition-all duration-200 ${
                      secondLocation
                        ? 'border-gold-200 bg-gold-200 text-[#0C0C0C]'
                        : 'border-white/20 hover:border-white/40 bg-transparent'
                    }`}
                  >
                    {secondLocation && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                  <span className="font-sans font-light">Second Location?</span>
                </label>

                {secondLocation && (
                  <div className="relative flex-1">
                    <Landmark className="w-3.5 h-3.5 text-white/30 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      name="secondVenue"
                      value={secondVenue}
                      onChange={(e) => setSecondVenue(e.target.value)}
                      required
                      placeholder="Enter second location..."
                      className="w-full pl-9 pr-3 py-1.5 bg-white/5 border border-white/10 focus:border-white/30 focus:ring-0 text-xs text-white font-sans outline-none rounded-sm transition-all placeholder-white/25"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Budget */}
            <div className="col-span-1 md:col-span-2 space-y-1.5">
              <label className="block text-[10px] uppercase tracking-[0.15em] font-semibold text-white/60 font-sans">
                Estimated Photography Budget (USD)
              </label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-white/30 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="number"
                  name="budget"
                  min="100"
                  max="100000"
                  step="500"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="Enter your custom budget (e.g. 5000)"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 focus:border-white/30 focus:ring-0 text-xs text-white font-sans outline-none rounded-sm transition-all placeholder-white/25"
                />
              </div>
              <p className="text-[10px] text-white/40 font-light font-mono">
                Please specify an amount within our service range of $100 to $100,000.
              </p>
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

            {/* Wedding Coverage Checklist */}
            {formData.type === 'wedding' && (
              <div className="col-span-1 md:col-span-2 space-y-4 pt-6 mt-2 border-t border-white/10">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] font-semibold text-gold-200 font-sans">
                    Wedding Day Coverage Checklist
                  </label>
                  <p className="text-[10px] text-white/40 font-light font-mono mt-1">
                    Select the key moments you would like your photographer to cover, sequentially from beginning to end of day.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {weddingCoveragePhases.map((phase) => (
                    <div key={phase.phase} className="space-y-3 bg-white/[0.02] border border-white/5 p-4 rounded-sm">
                      <h4 className="text-[10px] font-mono tracking-wider text-white/80 uppercase pb-1.5 border-b border-white/10">
                        {phase.phase}
                      </h4>
                      <div className="space-y-2">
                        {phase.items.map((item) => {
                          const isChecked = selectedCoverage.includes(item.id);
                          return (
                            <label
                              key={item.id}
                              className={`flex items-start space-x-2.5 text-xs font-sans cursor-pointer group select-none py-1.5 px-2 rounded-sm transition-all duration-200 ${
                                isChecked 
                                  ? 'bg-gold-200/5 text-gold-200 border border-gold-200/10' 
                                  : 'text-white/60 hover:text-white hover:bg-white/[0.02] border border-transparent'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleCoverageToggle(item.id)}
                                className="sr-only"
                              />
                              <div
                                className={`w-4 h-4 rounded-sm border flex items-center justify-center mt-0.5 transition-all duration-200 ${
                                  isChecked
                                    ? 'border-gold-200 bg-gold-200 text-[#0C0C0C]'
                                    : 'border-white/20 group-hover:border-white/40 bg-transparent'
                                }`}
                              >
                                {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                              <span className="flex-1 text-[11px] leading-tight font-light">{item.label}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
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