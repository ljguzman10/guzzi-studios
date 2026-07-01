export interface PortfolioItem {
  id: string;
  category: 'weddings' | 'events' | 'djs-artists';
  title: string;
  subtitle?: string;
  location: string;
  image: string;
  year?: string;
  date?: string;
  featured?: boolean;
  tags?: string[];
  badge?: string;
  badges?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  coverImage: string;
  tags?: string[];
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  type: 'wedding' | 'event' | 'dj-artist' | 'other';
  venue: string;
  budget: string;
  message: string;
  status: 'new' | 'contacted' | 'booked' | 'archived';
  createdAt: string;
  notes?: string;
}

export interface TeamApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  portfolio: string;
  instagram: string;
  about: string;
  gear: string;
  status: 'new' | 'reviewed' | 'shortlisted' | 'archived';
  createdAt: string;
}
