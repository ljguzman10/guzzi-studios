import { useState, useEffect, FormEvent } from 'react';
import { PortfolioItem, BlogPost, Inquiry, TeamApplication } from '../types';
import { portfolioItems as defaultPortfolioItems, blogPosts as defaultBlogPosts } from '../data';
import {
  Users,
  Image as ImageIcon,
  BookOpen,
  X,
  Search,
  Save,
  Plus,
  Trash2,
  Lock,
  Download,
  FolderOpen,
  Briefcase,
  LogOut
} from 'lucide-react';

interface AdminPanelProps {
  onClose: () => void;
  onRefreshData?: () => void;
}

export default function AdminPanel({ onClose, onRefreshData }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'crm' | 'portfolio' | 'blogs' | 'applications'>('crm');
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [applications, setApplications] = useState<TeamApplication[]>([]);
  const [selectedApplicationId, setSelectedApplicationId] = useState<string | null>(null);
  const [adminData, setAdminData] = useState<{ administrator: string; systemTime: string; status: string; scopes: string[] } | null>(null);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Selected Inquiry for details view
  const [selectedInquiryId, setSelectedInquiryId] = useState<string | null>(null);
  const [editingNotes, setEditingNotes] = useState('');

  // Add Item States
  const [showAddPhoto, setShowAddPhoto] = useState(false);
  const [newPhoto, setNewPhoto] = useState({
    title: '',
    subtitle: '',
    category: 'weddings' as PortfolioItem['category'],
    location: '',
    image: '',
    tags: '',
    featured: false,
    year: '2026'
  });

  const [showAddBlog, setShowAddBlog] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Weddings',
    coverImage: '',
    tags: '',
    readTime: '4 min read'
  });

  // Load database items on open
  useEffect(() => {
    loadDatabase();

    // Securely fetch administrative session metadata from backend
    const activeToken = localStorage.getItem('admin_token');
    const headers: Record<string, string> = {};
    if (activeToken) {
      headers['Authorization'] = `Bearer ${activeToken}`;
    }

    fetch('/api/admin/data', { headers })
      .then(res => {
        if (!res.ok) throw new Error('Failed to retrieve secure session information');
        return res.json();
      })
      .then(data => {
        setAdminData(data);
      })
      .catch(err => {
        console.error('[Admin API Error]', err);
      });
  }, []);

  const handleLogout = () => {
    const activeToken = localStorage.getItem('admin_token');
    const logoutUrl = activeToken ? `/logout?token=${encodeURIComponent(activeToken)}` : '/logout';
    
    fetch(logoutUrl)
      .then(() => {
        localStorage.removeItem('admin_token');
        window.location.href = '/';
      })
      .catch(() => {
        localStorage.removeItem('admin_token');
        window.location.href = '/';
      });
  };

  const loadDatabase = () => {
    // 1. Inquiries
    const storedInquiries = localStorage.getItem('guzzi_inquiries');
    if (storedInquiries) {
      setInquiries(JSON.parse(storedInquiries));
    } else {
      // Seed initial inquiries for CRM demonstration
      const seeds: Inquiry[] = [
        {
          id: 'inq_seed1',
          name: 'Isabella Rodriguez',
          email: 'isabella.r@chicagoevents.org',
          phone: '(312) 555-8921',
          date: '2026-09-12',
          type: 'wedding',
          venue: 'The Peninsula Hotel, Chicago',
          budget: '$8,000 - $12,000 (Luxury Full Day)',
          message: 'Hi Luis! We absolutely love your raw editorial style. We are planning a black-tie autumn wedding with 180 guests. We would love a full day package with a secondary photographer.',
          status: 'new',
          createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
          notes: 'Reached out from Instagram. Sounds like a perfect fit for our brand vibe.'
        },
        {
          id: 'inq_seed2',
          name: 'DJ Soren (Magnus)',
          email: 'magnus.beats@gmail.com',
          phone: '(773) 555-0143',
          date: '2026-07-31',
          type: 'dj-artist',
          venue: 'Spybar Chicago',
          budget: '$3,000 - $5,000',
          message: 'Yo Luis! Looking for high-octane backstage shots and main-deck coverage for my residency launch at Spybar. I saw your nightlife work at Radius and it is incredible. Let me know if you are open.',
          status: 'contacted',
          createdAt: new Date(Date.now() - 3600000 * 20).toISOString(),
          notes: 'Texted him on WhatsApp. Scheduled call for Friday.'
        },
        {
          id: 'inq_seed3',
          name: 'Christian Dior Chicago PR',
          email: 'chicago.pr@dior.corp',
          phone: '(312) 555-4001',
          date: '2026-08-15',
          type: 'event',
          venue: 'Oak Street Boutique, Gold Coast',
          budget: '$5,000 - $8,000',
          message: 'We are organizing an exclusive private evening trunk launch party. We need luxury editorial coverage of our guests, champagne toast, and products.',
          status: 'booked',
          createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
          notes: 'Contract signed! Retainer received.'
        }
      ];
      localStorage.setItem('guzzi_inquiries', JSON.stringify(seeds));
      setInquiries(seeds);
    }

    // 2. Portfolio CMS
    const storedPortfolio = localStorage.getItem('guzzi_portfolio');
    if (storedPortfolio) {
      setPortfolio(JSON.parse(storedPortfolio));
    } else {
      localStorage.setItem('guzzi_portfolio', JSON.stringify(defaultPortfolioItems));
      setPortfolio(defaultPortfolioItems);
    }

    // 3. Blogs CMS
    const storedBlogs = localStorage.getItem('guzzi_blogs');
    if (storedBlogs) {
      setBlogs(JSON.parse(storedBlogs));
    } else {
      localStorage.setItem('guzzi_blogs', JSON.stringify(defaultBlogPosts));
      setBlogs(defaultBlogPosts);
    }

    // 4. Team Applications
    const storedApps = localStorage.getItem('guzzi_applications');
    if (storedApps) {
      setApplications(JSON.parse(storedApps));
    } else {
      const appSeeds: TeamApplication[] = [
        {
          id: 'app_seed1',
          name: 'Marcus Vance',
          email: 'marcus.vance@creative.com',
          phone: '(312) 555-0987',
          role: 'second-photographer',
          portfolio: 'https://marcusvance.myportfolio.com',
          instagram: '@marcus_vance',
          about: 'I have been shooting second camera for 3 years, passionate about candid moments and crisp black & white editorial frames. Would love to learn from Luis.',
          gear: 'Sony A7 IV, 35mm f/1.4 GM, 85mm f/1.8',
          status: 'new',
          createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
        }
      ];
      localStorage.setItem('guzzi_applications', JSON.stringify(appSeeds));
      setApplications(appSeeds);
    }
  };

  // Update inquiry status
  const handleUpdateStatus = (id: string, status: Inquiry['status']) => {
    const updated = inquiries.map((inq) => {
      if (inq.id === id) {
        return { ...inq, status };
      }
      return inq;
    });
    localStorage.setItem('guzzi_inquiries', JSON.stringify(updated));
    setInquiries(updated);
    if (onRefreshData) onRefreshData();
  };

  // Save personal notes for inquiry
  const handleSaveNotes = (id: string) => {
    const updated = inquiries.map((inq) => {
      if (inq.id === id) {
        return { ...inq, notes: editingNotes };
      }
      return inq;
    });
    localStorage.setItem('guzzi_inquiries', JSON.stringify(updated));
    setInquiries(updated);
    if (onRefreshData) onRefreshData();
  };

  // Delete an inquiry
  const handleDeleteInquiry = (id: string) => {
    if (window.confirm('Are you sure you want to delete this inquiry from CRM?')) {
      const filtered = inquiries.filter(inq => inq.id !== id);
      localStorage.setItem('guzzi_inquiries', JSON.stringify(filtered));
      setInquiries(filtered);
      if (selectedInquiryId === id) setSelectedInquiryId(null);
      if (onRefreshData) onRefreshData();
    }
  };

  // Export inquiries to mock CSV file
  const handleExportCSV = () => {
    const headers = 'ID,Name,Email,Phone,Date,Type,Venue,Budget,Status,CreatedAt\n';
    const rows = inquiries.map(i => 
      `"${i.id}","${i.name}","${i.email}","${i.phone}","${i.date}","${i.type}","${i.venue}","${i.budget}","${i.status}","${i.createdAt}"`
    ).join('\n');
    
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `Guzzi_Photography_Leads_${new Date().toISOString().slice(0,10)}.csv`);
    a.click();
  };

  // ADD NEW PORTFOLIO PHOTO
  const handleAddPhoto = (e: FormEvent) => {
    e.preventDefault();
    if (!newPhoto.title || !newPhoto.image || !newPhoto.location) {
      alert('Mandatory fields missing');
      return;
    }

    const newItem: PortfolioItem = {
      id: 'photo_' + Math.random().toString(36).substr(2, 9),
      category: newPhoto.category,
      title: newPhoto.title,
      subtitle: newPhoto.subtitle || undefined,
      location: newPhoto.location,
      image: newPhoto.image,
      featured: newPhoto.featured,
      year: newPhoto.year,
      tags: newPhoto.tags ? newPhoto.tags.split(',').map(t => t.trim()) : []
    };

    const updated = [newItem, ...portfolio];
    localStorage.setItem('guzzi_portfolio', JSON.stringify(updated));
    setPortfolio(updated);
    setShowAddPhoto(false);
    // Reset state
    setNewPhoto({
      title: '',
      subtitle: '',
      category: 'weddings',
      location: '',
      image: '',
      tags: '',
      featured: false,
      year: '2026'
    });
    if (onRefreshData) onRefreshData();
  };

  // DELETE PORTFOLIO PHOTO
  const handleDeletePhoto = (id: string) => {
    if (window.confirm('Are you sure you want to delete this photo from the portfolio?')) {
      const filtered = portfolio.filter(item => item.id !== id);
      localStorage.setItem('guzzi_portfolio', JSON.stringify(filtered));
      setPortfolio(filtered);
      if (onRefreshData) onRefreshData();
    }
  };

  // ADD NEW JOURNAL BLOG POST
  const handleAddBlog = (e: FormEvent) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.excerpt || !newBlog.content || !newBlog.coverImage) {
      alert('Mandatory fields missing');
      return;
    }

    const newItem: BlogPost = {
      id: 'blog_' + Math.random().toString(36).substr(2, 9),
      title: newBlog.title,
      excerpt: newBlog.excerpt,
      content: newBlog.content,
      category: newBlog.category,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      author: 'Luis Guzman',
      readTime: newBlog.readTime,
      coverImage: newBlog.coverImage,
      tags: newBlog.tags ? newBlog.tags.split(',').map(t => t.trim()) : []
    };

    const updated = [newItem, ...blogs];
    localStorage.setItem('guzzi_blogs', JSON.stringify(updated));
    setBlogs(updated);
    setShowAddBlog(false);
    // Reset
    setNewBlog({
      title: '',
      excerpt: '',
      content: '',
      category: 'Weddings',
      coverImage: '',
      tags: '',
      readTime: '4 min read'
    });
    if (onRefreshData) onRefreshData();
  };

  // DELETE JOURNAL BLOG POST
  const handleDeleteBlog = (id: string) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      const filtered = blogs.filter(post => post.id !== id);
      localStorage.setItem('guzzi_blogs', JSON.stringify(filtered));
      setBlogs(filtered);
      if (onRefreshData) onRefreshData();
    }
  };

  // Filtered inquiries list
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || inq.status === statusFilter;
    const matchesType = typeFilter === 'all' || inq.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const selectedInquiry = inquiries.find(i => i.id === selectedInquiryId);

  // Set notes on click
  useEffect(() => {
    if (selectedInquiry) {
      setEditingNotes(selectedInquiry.notes || '');
    }
  }, [selectedInquiryId]);

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl h-[90vh] bg-[#0C0C0C] text-white shadow-2xl rounded-sm flex flex-col overflow-hidden border border-white/10">
        
        {/* Header Bar */}
        <div className="bg-[#111111] p-6 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/5 text-white/80 rounded-sm">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl md:text-2xl font-light tracking-wide text-white flex items-center gap-2.5">
                Guzzi Photography — Studio Admin
                {adminData && (
                  <span className="inline-flex items-center px-2 py-0.5 text-[8px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-widest">
                    SECURE SESSION: {adminData.administrator}
                  </span>
                )}
              </h2>
              <p className="text-[10px] uppercase tracking-widest text-white/40 font-mono">
                Bespoke CRM & Portfolio CMS Suite
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/5 text-white/40 hover:text-white rounded-sm transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Sidebar + Action Screen Grid */}
        <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
          
          {/* Dashboard Left Tabs Sidebar */}
          <div className="w-full md:w-64 bg-[#111111]/40 border-r border-white/10 flex flex-row md:flex-col p-4 space-x-2 md:space-x-0 md:space-y-2 flex-shrink-0">
            <button
              onClick={() => { setActiveTab('crm'); setSelectedInquiryId(null); }}
              className={`flex-grow md:flex-grow-0 flex items-center justify-center md:justify-start space-x-3 px-4 py-3 text-[10px] uppercase tracking-widest font-semibold rounded-sm transition-all cursor-pointer ${
                activeTab === 'crm'
                  ? 'bg-white text-black font-semibold shadow'
                  : 'hover:bg-white/5 text-white/60'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>CRM Inquiries ({inquiries.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`flex-grow md:flex-grow-0 flex items-center justify-center md:justify-start space-x-3 px-4 py-3 text-[10px] uppercase tracking-widest font-semibold rounded-sm transition-all cursor-pointer ${
                activeTab === 'portfolio'
                  ? 'bg-white text-black font-semibold shadow'
                  : 'hover:bg-white/5 text-white/60'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Portfolio CMS ({portfolio.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('blogs')}
              className={`flex-grow md:flex-grow-0 flex items-center justify-center md:justify-start space-x-3 px-4 py-3 text-[10px] uppercase tracking-widest font-semibold rounded-sm transition-all cursor-pointer ${
                activeTab === 'blogs'
                  ? 'bg-white text-black font-semibold shadow'
                  : 'hover:bg-white/5 text-white/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Journal CMS ({blogs.length})</span>
            </button>
            <button
              onClick={() => { setActiveTab('applications'); setSelectedApplicationId(null); }}
              className={`flex-grow md:flex-grow-0 flex items-center justify-center md:justify-start space-x-3 px-4 py-3 text-[10px] uppercase tracking-widest font-semibold rounded-sm transition-all cursor-pointer ${
                activeTab === 'applications'
                  ? 'bg-white text-black font-semibold shadow'
                  : 'hover:bg-white/5 text-white/60'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Applications ({applications.length})</span>
            </button>
            <div className="hidden md:block flex-grow" />
            <button
              onClick={handleLogout}
              className="flex-grow md:flex-grow-0 flex items-center justify-center md:justify-start space-x-3 px-4 py-3 text-[10px] uppercase tracking-widest font-semibold rounded-sm transition-all cursor-pointer bg-red-600/15 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/20 font-mono"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>

          {/* Action Screen Right Content */}
          <div className="flex-grow flex flex-col overflow-hidden bg-[#0C0C0C] p-6">
            
            {/* TAB 1: CRM LEADS */}
            {activeTab === 'crm' && (
              <div className="flex-grow flex flex-col h-full overflow-hidden space-y-4">
                
                {/* Search Bar & Export */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <div className="flex-grow flex items-center space-x-2 bg-white/5 p-2 border border-white/10 rounded-sm max-w-md">
                    <Search className="w-4 h-4 text-white/30 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Search lead, email, message or venue..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-transparent text-xs text-white border-0 focus:outline-none placeholder-white/20"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    {/* Status Filters */}
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="p-2 border border-white/10 text-xs text-white bg-[#111111] rounded-sm cursor-pointer outline-none"
                    >
                      <option value="all">All Statuses</option>
                      <option value="new">New / Unread</option>
                      <option value="contacted">Contacted</option>
                      <option value="booked">Booked</option>
                      <option value="archived">Archived</option>
                    </select>

                    <button
                      onClick={handleExportCSV}
                      className="p-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-sm flex items-center space-x-2 text-xs font-semibold cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-white/50" />
                      <span className="hidden sm:inline">Export CSV</span>
                    </button>
                  </div>
                </div>

                {/* Sub-grid of inquiries list vs details */}
                <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">
                  
                  {/* Left Column: Leads List */}
                  <div className="lg:col-span-7 border border-white/10 rounded-sm overflow-y-auto space-y-2 p-2 bg-[#111111]/30">
                    {filteredInquiries.length > 0 ? (
                      filteredInquiries.map((inq) => (
                        <div
                          key={inq.id}
                          onClick={() => setSelectedInquiryId(inq.id)}
                          className={`p-4 border rounded-sm bg-[#111111]/40 border-white/10 hover:border-white/30 transition-all cursor-pointer ${
                            selectedInquiryId === inq.id
                              ? 'border-white shadow-2xl bg-[#111111]'
                              : ''
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-light tracking-wide text-sm text-white">{inq.name}</h4>
                              <p className="text-[10px] text-white/50 font-mono mt-0.5">{inq.email}</p>
                            </div>
                            <span
                              className={`px-2 py-0.5 text-[8px] font-mono tracking-widest uppercase rounded-sm ${
                                inq.status === 'new'
                                  ? 'bg-red-950/20 text-red-400 border border-red-900/30'
                                  : inq.status === 'contacted'
                                  ? 'bg-blue-950/20 text-blue-400 border border-blue-900/30'
                                  : inq.status === 'booked'
                                  ? 'bg-green-950/20 text-green-400 border border-green-900/30'
                                  : 'bg-white/5 text-white/50 border border-white/10'
                              }`}
                            >
                              {inq.status}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 mt-3 text-[10px] text-white/40">
                            <div>
                              <span className="font-semibold text-white/50">Event:</span> {inq.type.toUpperCase()}
                            </div>
                            <div>
                              <span className="font-semibold text-white/50">Date:</span> {inq.date}
                            </div>
                          </div>

                          <p className="text-[10px] text-white/60 line-clamp-1 mt-2.5 italic border-t border-white/10 pt-2 font-light">
                            "{inq.message}"
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12 text-white/40 font-sans text-xs">
                        No digital inquiries matched your filter.
                      </div>
                    )}
                  </div>

                  {/* Right Column: Detailed View */}
                  <div className="lg:col-span-5 border border-white/10 rounded-sm p-4 overflow-y-auto space-y-4 bg-[#111111]/30 flex flex-col justify-between">
                    {selectedInquiry ? (
                      <div className="space-y-4 flex-grow">
                        <div className="flex items-center justify-between border-b border-white/10 pb-3">
                          <div>
                            <span className="text-[8px] text-white/40 font-mono uppercase tracking-widest">Selected Lead</span>
                            <h3 className="font-serif text-lg text-white font-light mt-0.5 tracking-wide">{selectedInquiry.name}</h3>
                          </div>
                          <button
                            onClick={() => handleDeleteInquiry(selectedInquiry.id)}
                            className="p-1.5 hover:bg-red-950/20 text-white/40 hover:text-red-400 rounded-sm transition-colors cursor-pointer"
                            title="Delete Inquiry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Fast Contact Options */}
                        <div className="grid grid-cols-2 gap-2">
                          <a
                            href={`mailto:${selectedInquiry.email}`}
                            className="p-2 border border-white/10 text-center text-[9px] uppercase tracking-widest font-semibold hover:bg-white hover:text-black transition duration-300 text-white"
                          >
                            Email Client
                          </a>
                          {selectedInquiry.phone && (
                            <a
                              href={`tel:${selectedInquiry.phone}`}
                              className="p-2 border border-white/10 text-center text-[9px] uppercase tracking-widest font-semibold hover:bg-white hover:text-black transition duration-300 text-white"
                            >
                              Call {selectedInquiry.phone}
                            </a>
                          )}
                        </div>

                        {/* Raw Grid Info */}
                        <div className="bg-[#111111]/50 border border-white/10 p-3 rounded-sm space-y-2 text-xs text-white/60">
                          <div>
                            <span className="text-white/40 font-medium">Desired Date:</span>{' '}
                            <span className="font-mono text-white/90">{selectedInquiry.date}</span>
                          </div>
                          <div>
                            <span className="text-white/40 font-medium">Inquiry Type:</span>{' '}
                            <span className="text-white font-light uppercase">{selectedInquiry.type}</span>
                          </div>
                          <div>
                            <span className="text-white/40 font-medium">Requested Venue:</span>{' '}
                            <span className="text-white font-light">{selectedInquiry.venue}</span>
                          </div>
                          <div>
                            <span className="text-white/40 font-medium">Budget Selected:</span>{' '}
                            <span className="text-white font-light">{selectedInquiry.budget}</span>
                          </div>
                          <div>
                            <span className="text-white/40 font-medium">Logged Date:</span>{' '}
                            <span className="font-mono text-white/50">
                              {new Date(selectedInquiry.createdAt).toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Raw Message */}
                        <div>
                          <h4 className="text-[10px] uppercase font-bold tracking-widest text-white/70 mb-1">Vision / Message:</h4>
                          <div className="p-3 bg-white/5 border border-white/10 rounded-sm text-xs text-white/80 leading-relaxed font-light italic">
                            "{selectedInquiry.message}"
                          </div>
                        </div>

                        {/* CRM Management actions */}
                        <div className="border-t border-white/10 pt-4 space-y-3">
                          <h4 className="text-[10px] uppercase font-bold tracking-widest text-white/70">Lead Status Action:</h4>
                          <div className="flex gap-1">
                            {(['new', 'contacted', 'booked', 'archived'] as const).map((st) => (
                              <button
                                key={st}
                                onClick={() => handleUpdateStatus(selectedInquiry.id, st)}
                                className={`flex-grow py-1.5 px-1 text-[8px] uppercase tracking-widest font-semibold border rounded-sm transition-all cursor-pointer ${
                                  selectedInquiry.status === st
                                    ? 'bg-white text-black border-white'
                                    : 'bg-transparent hover:bg-white/5 text-white/50 border-white/10'
                                }`}
                              >
                                {st}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Notes form */}
                        <div className="space-y-1.5">
                          <label className="block text-[10px] uppercase tracking-widest font-bold text-white/70">
                            Personal Studio Notes:
                          </label>
                          <textarea
                            value={editingNotes}
                            onChange={(e) => setEditingNotes(e.target.value)}
                            rows={3}
                            placeholder="Add phone summaries, checklist items, or photoshoot ideas..."
                            className="w-full p-2 border border-white/10 text-xs text-white bg-white/5 focus:border-white/30 focus:outline-none resize-none rounded-sm outline-none"
                          />
                          <button
                            onClick={() => handleSaveNotes(selectedInquiry.id)}
                            className="w-full py-2.5 bg-white hover:bg-white/80 text-black font-semibold text-[10px] tracking-widest uppercase transition-all duration-300 flex items-center justify-center space-x-1.5 cursor-pointer rounded-sm"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>Save Notes</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex-grow flex flex-col items-center justify-center text-center p-8 text-white/40 font-sans text-xs">
                        <FolderOpen className="w-10 h-10 text-white/20 mb-2" />
                        <p className="leading-relaxed">Select an active digital inquiry from the list to view specifications, manage status, send emails, or write private staff notes.</p>
                      </div>
                    )}
                  </div>

                </div>

              </div>
            )}

            {/* TAB 2: PORTFOLIO CMS */}
            {activeTab === 'portfolio' && (
              <div className="flex-grow flex flex-col h-full overflow-hidden space-y-4">
                
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="font-serif text-lg text-white font-light tracking-wide">
                    Live Photo Gallery CMS ({portfolio.length})
                  </h3>
                  <button
                    onClick={() => setShowAddPhoto(!showAddPhoto)}
                    className="px-4 py-2 bg-white hover:bg-white/80 text-black text-xs tracking-widest font-semibold uppercase flex items-center space-x-2 transition cursor-pointer rounded-sm"
                  >
                    <Plus className="w-4 h-4 text-black" />
                    <span>{showAddPhoto ? 'Cancel' : 'Add Photo'}</span>
                  </button>
                </div>

                {/* Expandable Add Form */}
                {showAddPhoto && (
                  <form onSubmit={handleAddPhoto} className="p-4 border border-white/10 bg-[#111111] rounded-sm space-y-4 animate-fade-in max-h-[50vh] overflow-y-auto shadow-2xl">
                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-white/70 font-mono">Upload New Portfolio Photo</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-white/80">
                      <div className="space-y-1">
                        <label className="block text-white/60">Photo Title *</label>
                        <input
                          type="text"
                          required
                          value={newPhoto.title}
                          onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                          placeholder="e.g. Blackstone Hotel Ballroom Exchange"
                          className="w-full p-2 border border-white/10 bg-white/5 text-white rounded-sm outline-none placeholder-white/20"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-white/60">Subtitle / Couples name</label>
                        <input
                          type="text"
                          value={newPhoto.subtitle}
                          onChange={(e) => setNewPhoto({ ...newPhoto, subtitle: e.target.value })}
                          placeholder="e.g. Elena & Marcus"
                          className="w-full p-2 border border-white/10 bg-white/5 text-white rounded-sm outline-none placeholder-white/20"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-white/60">Category *</label>
                        <select
                          value={newPhoto.category}
                          onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value as any })}
                          className="w-full p-2 border border-white/10 bg-white/5 text-white rounded-sm outline-none"
                        >
                          <option value="weddings" className="bg-[#111111]">Weddings</option>
                          <option value="events" className="bg-[#111111]">Events & Galas</option>
                          <option value="djs-artists" className="bg-[#111111]">DJs & Artists</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="block text-white/60">Location *</label>
                        <input
                          type="text"
                          required
                          value={newPhoto.location}
                          onChange={(e) => setNewPhoto({ ...newPhoto, location: e.target.value })}
                          placeholder="e.g. West Loop, Chicago"
                          className="w-full p-2 border border-white/10 bg-white/5 text-white rounded-sm outline-none placeholder-white/20"
                        />
                      </div>
                      <div className="space-y-1 col-span-1 md:col-span-2">
                        <label className="block text-white/60">Direct Image URL *</label>
                        <input
                          type="url"
                          required
                          value={newPhoto.image}
                          onChange={(e) => setNewPhoto({ ...newPhoto, image: e.target.value })}
                          placeholder="https://images.unsplash.com/..."
                          className="w-full p-2 border border-white/10 bg-white/5 text-white rounded-sm outline-none font-mono text-[10px]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-white/60">Comma-separated tags</label>
                        <input
                          type="text"
                          value={newPhoto.tags}
                          onChange={(e) => setNewPhoto({ ...newPhoto, tags: e.target.value })}
                          placeholder="Fine Art, Cinematic, Candid"
                          className="w-full p-2 border border-white/10 bg-white/5 text-white rounded-sm outline-none placeholder-white/20"
                        />
                      </div>
                      <div className="space-y-1 flex items-center space-x-2 pt-6">
                        <input
                          type="checkbox"
                          id="newFeat"
                          checked={newPhoto.featured}
                          onChange={(e) => setNewPhoto({ ...newPhoto, featured: e.target.checked })}
                          className="w-4 h-4 text-white bg-white/5 border border-white/10 rounded-sm focus:ring-0 cursor-pointer"
                        />
                        <label htmlFor="newFeat" className="text-white/80 cursor-pointer">
                          Mark as Featured on Home Feed
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-3 bg-white hover:bg-white/80 text-black text-xs tracking-widest uppercase font-semibold font-sans cursor-pointer rounded-sm"
                    >
                      Publish to Live Site Portfolio
                    </button>
                  </form>
                )}

                {/* CMS Item Cards List */}
                <div className="flex-grow overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-1">
                  {portfolio.map((item) => (
                    <div key={item.id} className="border border-white/10 rounded-sm p-2.5 bg-[#111111]/40 space-y-2 relative group hover:border-white/20 transition-all">
                      <div className="aspect-[4/3] w-full bg-zinc-950 overflow-hidden rounded-sm relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-2 left-2 bg-black/80 text-[8px] text-white px-2 py-0.5 uppercase tracking-widest font-mono">
                          {item.category}
                        </span>
                        {item.featured && (
                          <span className="absolute top-2 left-2 bg-white text-black text-[8px] px-2 py-0.5 uppercase font-bold tracking-widest">
                            Featured
                          </span>
                        )}
                      </div>

                      <div className="space-y-1 text-xs px-1">
                        <h4 className="font-light tracking-wide text-white truncate" title={item.title}>
                          {item.title}
                        </h4>
                        <p className="text-[10px] text-white/40 font-mono">
                          {item.location}
                        </p>
                      </div>

                      {/* Deletion overlay hover */}
                      <button
                        onClick={() => handleDeletePhoto(item.id)}
                        className="absolute top-4 right-4 p-2 bg-red-950/40 border border-red-900/30 text-red-400 hover:bg-red-500 hover:text-white rounded-sm transition opacity-0 group-hover:opacity-100 shadow-md cursor-pointer"
                        title="Delete Portfolio Item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* TAB 4: APPLICATIONS VIEWER */}
            {activeTab === 'applications' && (
              <div className="flex-grow flex flex-col h-full overflow-hidden space-y-4">
                <div className="border-b border-white/10 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                  <div>
                    <h3 className="font-serif text-lg text-white font-light tracking-wide">
                      Team Applications ({applications.length})
                    </h3>
                    <p className="text-white/50 text-[10px] font-sans font-light mt-1">
                      Review incoming portfolios, handles, and role experience for Guzzi Photography.
                    </p>
                  </div>
                  {adminData && (
                    <div className="text-left sm:text-right flex flex-row sm:flex-col gap-2 sm:gap-1 items-center sm:items-end">
                      <span className="inline-block text-[8px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/20 uppercase tracking-widest rounded-sm">
                        API STATUS: {adminData.status.toUpperCase()}
                      </span>
                      <span className="inline-block text-[8px] font-mono text-white/40 uppercase tracking-wider">
                        SCOPES: {adminData.scopes.join(', ')}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">
                  {/* Left list (5 cols) */}
                  <div className="lg:col-span-5 flex flex-col h-full overflow-y-auto space-y-2 pr-2">
                    {applications.length === 0 ? (
                      <p className="text-white/40 text-xs font-sans font-light py-4">No applications received yet.</p>
                    ) : (
                      applications.map((app) => (
                        <button
                          key={app.id}
                          onClick={() => setSelectedApplicationId(app.id)}
                          className={`w-full text-left p-4 border rounded-sm transition-all flex flex-col space-y-1.5 cursor-pointer ${
                            selectedApplicationId === app.id
                              ? 'bg-white text-black border-white'
                              : 'bg-[#111111]/40 border-white/10 text-white hover:border-white/20'
                          }`}
                        >
                          <div className="flex justify-between items-start w-full">
                            <h4 className="font-medium text-xs tracking-wide truncate max-w-[70%]">
                              {app.name}
                            </h4>
                            <span className={`text-[8px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-full ${
                              selectedApplicationId === app.id
                                ? 'bg-black text-white'
                                : 'bg-white/10 text-white/80'
                            }`}>
                              {app.role.replace('-', ' ')}
                            </span>
                          </div>
                          <p className={`text-[10px] font-mono ${selectedApplicationId === app.id ? 'text-black/60' : 'text-white/50'}`}>
                            {new Date(app.createdAt).toLocaleDateString()}
                          </p>
                        </button>
                      ))
                    )}
                  </div>

                  {/* Right Detail Pane (7 cols) */}
                  <div className="lg:col-span-7 border border-white/10 bg-[#111111]/20 p-6 rounded-sm overflow-y-auto h-full space-y-6">
                    {selectedApplicationId ? (() => {
                      const app = applications.find(a => a.id === selectedApplicationId);
                      if (!app) return null;
                      return (
                        <div className="space-y-6 animate-fade-in text-xs text-white/90">
                          <div className="border-b border-white/10 pb-4 space-y-2">
                            <span className="text-gold-200 text-[9px] font-mono tracking-wider uppercase">
                              Applicant Profile Details
                            </span>
                            <h3 className="font-serif text-2xl font-light text-white leading-tight">
                              {app.name}
                            </h3>
                            <p className="text-white/50 text-xs font-mono">{app.role.toUpperCase().replace('-', ' ')}</p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/2 p-4 border border-white/5 rounded-sm">
                            <div className="space-y-1">
                              <span className="text-[9px] text-white/40 uppercase font-mono block">Email</span>
                              <a href={`mailto:${app.email}`} className="text-white hover:text-gold-200 transition-colors break-all">
                                {app.email}
                              </a>
                            </div>
                            <div className="space-y-1">
                              <span className="text-[9px] text-white/40 uppercase font-mono block">Phone</span>
                              <p className="text-white font-mono">{app.phone}</p>
                            </div>
                            <div className="space-y-1 col-span-1 md:col-span-2">
                              <span className="text-[9px] text-white/40 uppercase font-mono block">Portfolio Link</span>
                              <a
                                href={app.portfolio}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gold-200 hover:underline hover:text-gold-100 transition-colors break-all font-mono"
                              >
                                {app.portfolio}
                              </a>
                            </div>
                            <div className="space-y-1 col-span-1 md:col-span-2">
                              <span className="text-[9px] text-white/40 uppercase font-mono block">Instagram</span>
                              <span className="text-white/80 font-mono">{app.instagram || 'Not provided'}</span>
                            </div>
                          </div>

                          {app.gear && (
                            <div className="space-y-1 bg-[#111111] p-4 border border-white/5 rounded-sm">
                              <span className="text-[9px] text-white/40 uppercase font-mono block">Gear & Software Setup</span>
                              <p className="text-white/80 font-sans leading-relaxed">{app.gear}</p>
                            </div>
                          )}

                          <div className="space-y-2">
                            <span className="text-[9px] text-white/40 uppercase font-mono block">Style & Experience</span>
                            <p className="text-white/80 font-sans leading-relaxed whitespace-pre-wrap p-4 bg-white/2 rounded border border-white/5">
                              {app.about || 'No detailed background statement provided.'}
                            </p>
                          </div>

                          <div className="flex items-center space-x-3 pt-4 border-t border-white/10">
                            <button
                              type="button"
                              onClick={() => {
                                const filtered = applications.filter(a => a.id !== app.id);
                                localStorage.setItem('guzzi_applications', JSON.stringify(filtered));
                                setApplications(filtered);
                                setSelectedApplicationId(null);
                              }}
                              className="px-4 py-2 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white transition duration-300 text-[10px] uppercase font-mono tracking-wider rounded-sm cursor-pointer"
                            >
                              Archive / Delete
                            </button>
                          </div>
                        </div>
                      );
                    })() : (
                      <div className="flex flex-col items-center justify-center text-center h-full py-12 text-white/30 space-y-2">
                        <Briefcase className="w-8 h-8 text-white/15" />
                        <p className="text-xs font-sans font-light">Select an application from the list to view full portfolios and gears details.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: JOURNAL CMS */}
            {activeTab === 'blogs' && (
              <div className="flex-grow flex flex-col h-full overflow-hidden space-y-4">
                
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="font-serif text-lg text-white font-light tracking-wide">
                    Live Journal & Articles CMS ({blogs.length})
                  </h3>
                  <button
                    onClick={() => setShowAddBlog(!showAddBlog)}
                    className="px-4 py-2 bg-white hover:bg-white/80 text-black text-xs tracking-widest font-semibold uppercase flex items-center space-x-2 transition cursor-pointer rounded-sm"
                  >
                    <Plus className="w-4 h-4 text-black" />
                    <span>{showAddBlog ? 'Cancel' : 'Add Article'}</span>
                  </button>
                </div>

                {/* Expandable Add Form */}
                {showAddBlog && (
                  <form onSubmit={handleAddBlog} className="p-4 border border-white/10 bg-[#111111] rounded-sm space-y-4 animate-fade-in max-h-[50vh] overflow-y-auto shadow-2xl">
                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-white/70 font-mono">Publish New Journal Post</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-white/80">
                      <div className="space-y-1">
                        <label className="block text-white/60">Article Title *</label>
                        <input
                          type="text"
                          required
                          value={newBlog.title}
                          onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                          placeholder="e.g. How to Plan Your Golden Hour Photos"
                          className="w-full p-2 border border-white/10 bg-white/5 text-white rounded-sm outline-none placeholder-white/20"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-white/60">Cover Image URL *</label>
                        <input
                          type="url"
                          required
                          value={newBlog.coverImage}
                          onChange={(e) => setNewBlog({ ...newBlog, coverImage: e.target.value })}
                          placeholder="https://images.unsplash.com/..."
                          className="w-full p-2 border border-white/10 bg-white/5 text-white rounded-sm outline-none font-mono text-[10px]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-white/60">Category *</label>
                        <select
                          value={newBlog.category}
                          onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })}
                          className="w-full p-2 border border-white/10 bg-white/5 text-white rounded-sm outline-none"
                        >
                          <option value="Weddings" className="bg-[#111111]">Weddings Advice</option>
                          <option value="Events" className="bg-[#111111]">Corporate & Gala Focus</option>
                          <option value="Music & DJs" className="bg-[#111111]">Nightlife & Artists Focus</option>
                          <option value="Midwest" className="bg-[#111111]">Midwest Locations</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="block text-white/60">Read Time (e.g. 4 min read)</label>
                        <input
                          type="text"
                          value={newBlog.readTime}
                          onChange={(e) => setNewBlog({ ...newBlog, readTime: e.target.value })}
                          placeholder="5 min read"
                          className="w-full p-2 border border-white/10 bg-white/5 text-white rounded-sm outline-none placeholder-white/20"
                        />
                      </div>
                      <div className="space-y-1 col-span-1 md:col-span-2">
                        <label className="block text-white/60">Excerpt / Short Description *</label>
                        <input
                          type="text"
                          required
                          value={newBlog.excerpt}
                          onChange={(e) => setNewBlog({ ...newBlog, excerpt: e.target.value })}
                          placeholder="A quick summary that displays on the Journal feed grid..."
                          className="w-full p-2 border border-white/10 bg-white/5 text-white rounded-sm outline-none placeholder-white/20"
                        />
                      </div>
                      <div className="space-y-1 col-span-1 md:col-span-2">
                        <label className="block text-white/60">Article Content *</label>
                        <textarea
                          required
                          rows={6}
                          value={newBlog.content}
                          onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                          placeholder="Write the body of your editorial here..."
                          className="w-full p-2 border border-white/10 bg-white/5 text-white rounded-sm outline-none resize-none"
                        />
                      </div>
                      <div className="space-y-1 col-span-1 md:col-span-2">
                        <label className="block text-white/60">Tags (comma separated)</label>
                        <input
                          type="text"
                          value={newBlog.tags}
                          onChange={(e) => setNewBlog({ ...newBlog, tags: e.target.value })}
                          placeholder="Chicago, Planning, Golden Hour"
                          className="w-full p-2 border border-white/10 bg-white/5 text-white rounded-sm outline-none placeholder-white/20"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-3 bg-white hover:bg-white/80 text-black text-xs tracking-widest uppercase font-semibold font-sans cursor-pointer rounded-sm"
                    >
                      Publish Article to Live Journal
                    </button>
                  </form>
                )}

                {/* Blogs CMS Lists */}
                <div className="flex-grow overflow-y-auto space-y-3">
                  {blogs.map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-4 border border-white/10 rounded-sm bg-[#111111]/40 hover:border-white/20 transition-all">
                      <div className="flex items-center space-x-4 overflow-hidden">
                        <div className="w-16 h-12 rounded bg-zinc-950 overflow-hidden flex-shrink-0">
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="overflow-hidden">
                          <span className="text-[9px] text-white/50 font-mono uppercase tracking-widest block">
                            {post.category} &nbsp;|&nbsp; {post.date}
                          </span>
                          <h4 className="font-light tracking-wide text-xs text-white truncate max-w-lg">
                            {post.title}
                          </h4>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleDeleteBlog(post.id)}
                          className="p-2 hover:bg-red-950/40 border border-white/10 text-white/40 hover:text-red-400 rounded-sm transition cursor-pointer"
                          title="Delete Post"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

          </div>

        </div>

        {/* Action Panel Footer */}
        <div className="bg-[#111111] p-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-white/40">
          <div className="space-y-1.5 text-center sm:text-left">
            <p className="font-mono text-white/60">
              Secure browser session. Changes apply instantly using high-fidelity local state engines.
            </p>
            <p className="font-mono">
              GUZZI STUDIO CRM/CMS V1.2 • CHICAGOLAND
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full sm:w-auto px-10 py-4 bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white font-bold text-xs tracking-[0.25em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.35)] cursor-pointer font-sans inline-flex items-center justify-center gap-3 border border-red-500/20"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out of Admin Portal</span>
          </button>
        </div>

      </div>
    </div>
  );
}
