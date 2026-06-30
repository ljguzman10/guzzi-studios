import { useState, useEffect } from 'react';
import { BlogPost } from '../types';
import { blogPosts as defaultBlogPosts } from '../data';
import { Calendar, User, Clock, ChevronLeft } from 'lucide-react';
import luisPortrait from '../assets/images/luis_portrait_1782363252216.jpg';

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    const stored = localStorage.getItem('guzzi_blogs');
    if (stored) {
      setBlogs(JSON.parse(stored));
    } else {
      setBlogs(defaultBlogPosts);
    }
  }, []);

  const selectedPost = blogs.find(b => b.id === selectedPostId);

  // Extract distinct categories
  const categories = ['All', ...Array.from(new Set(blogs.map(b => b.category)))];

  const filteredBlogs = activeCategory === 'All'
    ? blogs
    : blogs.filter(b => b.category === activeCategory);

  const handleReadPost = (id: string) => {
    setSelectedPostId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedPostId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="blog-page" className="pt-24 min-h-screen bg-[#0C0C0C] text-white font-sans border-b border-white/10">
      
      {/* 1. READ ARTICLE VIEW */}
      {selectedPost ? (
        <article className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24 space-y-10 animate-fade-in">
          
          {/* Back button */}
          <button
            onClick={handleBackToList}
            className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-white/60 hover:text-white transition-colors group cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-white/50" />
            <span>Back to Journal Articles</span>
          </button>

          {/* Article Header info */}
          <div className="space-y-4">
            <span className="px-3 py-1 bg-white/5 border border-white/10 text-[9px] text-white/80 font-mono uppercase tracking-widest rounded-sm">
              {selectedPost.category}
            </span>
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.15] font-light">
              {selectedPost.title}
            </h1>
            
            {/* Metadata row */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-xs text-white/50 font-mono pt-2 border-y border-white/10 py-3">
              <span className="flex items-center">
                <Calendar className="w-3.5 h-3.5 text-white/40 mr-1.5" />
                {selectedPost.date}
              </span>
              <span className="flex items-center">
                <User className="w-3.5 h-3.5 text-white/40 mr-1.5" />
                By {selectedPost.author}
              </span>
              <span className="flex items-center">
                <Clock className="w-3.5 h-3.5 text-white/40 mr-1.5" />
                {selectedPost.readTime}
              </span>
            </div>
          </div>

          {/* Cover Photo */}
          <div className="border border-white/10 p-3 bg-[#111111] shadow-2xl">
            <div className="aspect-[21/9] w-full overflow-hidden bg-zinc-950 rounded-sm">
              <img
                src={selectedPost.coverImage}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content Block */}
          <div className="space-y-6 text-white/75 text-sm md:text-base font-light leading-relaxed font-sans">
            {selectedPost.content.split('\n\n').map((para, pIdx) => {
              if (para.startsWith('###')) {
                return (
                  <h3 key={pIdx} className="font-serif text-2xl text-white font-light pt-6 tracking-wide">
                    {para.replace('###', '').trim()}
                  </h3>
                );
              }
              if (para.startsWith('* **')) {
                // Bullet points
                return (
                  <div key={pIdx} className="pl-6 border-l-2 border-white/30 py-1 font-sans italic text-white/80 my-4 text-xs md:text-sm">
                    {para.replace('* **', '').replace('**', '').trim()}
                  </div>
                );
              }
              if (para.startsWith('1. **')) {
                // Numbered list items
                const lines = para.split('\n');
                return (
                  <ol key={pIdx} className="space-y-3 pl-4 list-decimal text-white/70 text-xs md:text-sm font-light">
                    {lines.map((line, lIdx) => (
                      <li key={lIdx} className="pl-2">
                        {line.replace(/^\d+\.\s+\*\*/, '').replace(/\*\*/, ': ')}
                      </li>
                    ))}
                  </ol>
                );
              }
              return (
                <p key={pIdx} className="leading-relaxed">
                  {para}
                </p>
              );
            })}
          </div>

          {/* Article Footer taggings */}
          {selectedPost.tags && (
            <div className="flex flex-wrap gap-2 pt-6 border-t border-white/10">
              {selectedPost.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-white/5 border border-white/10 text-[9px] text-white/70 font-mono rounded-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Interactive Author signature */}
          <div className="bg-[#111111]/70 border border-white/10 text-white p-8 rounded-sm mt-12 flex flex-col md:flex-row items-center gap-6 border-l-2 border-white/40 shadow-2xl">
            <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border border-white/20">
              <img
                src={luisPortrait}
                alt="Luis Guzman"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="text-center md:text-left space-y-1.5">
              <h4 className="text-xs uppercase tracking-widest font-mono font-bold text-white/90">Written by Luis Guzman</h4>
              <p className="text-white/60 text-xs font-light leading-relaxed">
                Luis Guzman is a Chicago-based professional photographer with over 5 years of editorial experience. He specializes in documenting luxury weddings, high-energy events, and electronic music artists across the Midwest.
              </p>
            </div>
          </div>

        </article>
      ) : (
        /* 2. JOURNAL LIST FEED VIEW */
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
          
          {/* Header Block */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-white/50 text-[10px] tracking-[0.3em] uppercase font-semibold font-mono block">
              The Guzzi Archive
            </span>
            <h1 className="font-serif text-4xl md:text-6xl text-white tracking-tight leading-tight font-light">
              The Journal
            </h1>
            <div className="h-[1px] w-12 bg-white/20 mx-auto mt-4"></div>
            <p className="text-white/60 font-sans text-xs md:text-sm font-light pt-2 leading-relaxed">
              Photography advice, behind-the-scenes diaries, wedding planning guides, and design trends straight from the Midwest creative hub.
            </p>

            {/* Category tabs */}
            <div className="flex flex-wrap justify-center gap-2 pt-6">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] font-semibold transition-all border cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-white text-black border-white font-bold shadow-sm'
                      : 'bg-transparent text-white/60 border-white/10 hover:border-white/30'
                  }`}
                >
                  {cat === 'All' ? 'All Articles' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid list feed */}
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((post) => (
                <div
                  key={post.id}
                  className="group flex flex-col h-full bg-[#111111]/30 border border-white/10 hover:border-white/20 hover:shadow-2xl transition-all duration-500 p-3 rounded-sm justify-between"
                >
                  <div className="space-y-4">
                    {/* Cover Wrap */}
                    <div className="aspect-[16/10] overflow-hidden bg-zinc-950 rounded-sm relative">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                        loading="lazy"
                      />
                      <span className="absolute bottom-3 left-3 bg-black/85 backdrop-blur-sm text-[8px] text-white/90 font-mono tracking-widest px-2 py-0.5 uppercase">
                        {post.category}
                      </span>
                    </div>

                    <div className="space-y-2 px-1">
                      {/* Meta dates */}
                      <div className="flex items-center space-x-2 text-[9px] text-white/40 font-mono uppercase tracking-wider">
                        <span>{post.date}</span>
                        <span>&bull;</span>
                        <span>{post.readTime}</span>
                      </div>

                      <h3
                        onClick={() => handleReadPost(post.id)}
                        className="font-serif text-lg md:text-xl text-white hover:text-white/80 transition-colors font-light tracking-wide cursor-pointer leading-snug line-clamp-2"
                      >
                        {post.title}
                      </h3>
                      
                      <p className="text-white/60 text-xs leading-relaxed font-sans font-light line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Read Article CTA */}
                  <div className="border-t border-white/10 pt-3 mt-6 px-1">
                    <button
                      onClick={() => handleReadPost(post.id)}
                      className="text-[10px] tracking-[0.2em] uppercase font-bold text-white/80 hover:text-white transition-colors flex items-center cursor-pointer font-sans"
                    >
                      Read Full Article &bull; Study
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-[#111111]/30 border border-white/10 text-white/50 text-xs rounded-sm">
              No journal articles found matching this topic.
            </div>
          )}

        </div>
      )}

    </div>
  );
}
