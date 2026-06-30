import { PortfolioItem, BlogPost } from './types';

export const portfolioItems: PortfolioItem[] = [
  // Weddings
  {
    id: 'w1',
    category: 'weddings',
    title: 'Cantigny Park',
    subtitle: 'Beth & Trevor',
    location: 'Wheaton, IL',
    image: '/src/assets/images/regenerated_image_1782436761072.jpg',
    year: '2025',
    featured: true,
    tags: ['EditorialLove', 'LuxeFlora', 'Historic']
  },
  {
    id: 'w2',
    category: 'weddings',
    title: 'Estate Wedding',
    subtitle: 'Tessa & Douglas',
    location: 'Chicago, IL',
    image: '/src/assets/images/regenerated_image_1782504926122.jpg',
    year: '2024',
    featured: true,
    tags: ['Cinematic', 'Outdoor', 'Emotional']
  },
  {
    id: 'w3',
    category: 'weddings',
    title: 'Navy Pier',
    subtitle: 'Steven & Steven',
    location: 'Chicago, IL',
    image: '/src/assets/images/regenerated_image_1782511010199.jpg',
    year: '2025',
    featured: true,
    tags: ['Fine Art', 'Coastal', 'Minimalist']
  },
  {
    id: 'w6',
    category: 'weddings',
    title: 'Saint Mary of The Angels Church',
    subtitle: 'Guadalupe & Andy',
    location: 'Chicago, IL',
    image: '/src/assets/images/regenerated_image_1782519856684.jpg',
    year: '2024',
    featured: false,
    tags: ['Industrial Chic', 'Night Energy', 'Candid']
  },
  {
    id: 'w5',
    category: 'weddings',
    title: 'Bar Avec Anniversary',
    subtitle: 'Katherine & Cliff',
    location: 'Chicago, IL',
    image: '/src/assets/images/regenerated_image_1782523040836.jpg',
    year: '2024',
    featured: false,
    tags: ['Romantic', 'Candid', 'Golden Hour']
  },
  {
    id: 'w4',
    category: 'weddings',
    title: 'Magnificent Mile Engagement Party',
    subtitle: 'Makaela & Diego',
    location: 'Chicago, IL',
    image: '/src/assets/images/regenerated_image_1782516236476.jpg',
    year: '2025',
    featured: false,
    tags: ['Vintage', 'Urban', 'Black Tie']
  },

  // Events
  {
    id: 'e1',
    category: 'events',
    title: 'Penthouse NYE Party',
    subtitle: "Hosted by Social Hunt Club with Big Local DJ's",
    location: 'Chicago, IL',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200',
    year: '2025',
    featured: true,
    tags: ['PenthouseNYE', 'Luxury Corporate', 'Cultural']
  },
  {
    id: 'e2',
    category: 'events',
    title: 'Quinceañera',
    subtitle: "Where heritage meets the urban skyline",
    location: 'LINCOLN PARK, CHICAGO',
    image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=1200',
    year: '2025',
    featured: true,
    tags: ['TheGrandDebut', 'Tradition', 'SatinInTheSaddle']
  },
  {
    id: 'e3',
    category: 'events',
    title: 'Joes On Weed St.: DNC Party',
    subtitle: 'Official Democratic National Committee After Party',
    location: 'GOOSE ISLAND, CHICAGO',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1200',
    year: '2024',
    featured: false,
    tags: ['PoliticalParty', 'Gala', 'MidnightChicago'],
    badge: 'HEADLINER: @FOURCOLORZACK',
    badges: ['HEADLINER: @FOURCOLORZACK', 'OPENER: @DJ_QUAD']
  },
  {
    id: 'e4',
    category: 'events',
    title: 'Regency Inn Banquets',
    subtitle: "Paola's 70th Birthday Party",
    location: 'Chicago, IL',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1200',
    year: '2025',
    featured: false,
    tags: ['Celebration', '70AndGolden', 'Atmosphere']
  },

  // DJs & Artists
  {
    id: 'd1',
    category: 'djs-artists',
    title: 'Celest',
    subtitle: "International Woman's Day",
    location: 'RIVER NORTH, CHICAGO',
    image: 'https://images.unsplash.com/photo-1516873240891-4bf014598ab4?auto=format&fit=crop&q=80&w=1200',
    year: '2025',
    featured: true,
    tags: ['GirlsToTheFront', 'CelesteAfterDark', 'FlashFever'],
    badge: 'HEADLINER DJ: @NEIV.DJ'
  },
  {
    id: 'd5',
    category: 'djs-artists',
    title: 'PRYSM',
    subtitle: 'Lollapalooza Aftershow',
    location: 'LINCOLN PARK, CHICAGO',
    image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&q=80&w=1200',
    year: '2024',
    featured: false,
    tags: ['LollaAfterParty', 'NeonAndNuance', 'AmplifiedAura'],
    badge: 'HEADLINER DJ: @FORESTERMUSIC',
    badges: ['HEADLINER DJ: @FORESTERMUSIC', 'OPENER: @NEIV.DJ']
  },
  {
    id: 'd3',
    category: 'djs-artists',
    title: 'Crash Site : Music Video BTS',
    subtitle: "Hosted by the owners of Harold's Chicken",
    location: 'CRETE, IL',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=1200',
    year: '2024',
    featured: false,
    tags: ['TransProductionsBTS', 'CosmicCowboy', 'MildSauceMuses'],
    badge: 'RAPPER: @BOOMANFOREVER',
    badges: ['RAPPER: @BOOMANFOREVER', 'Production: @TranceProductions', 'Host: @CowboyTip']
  },
  {
    id: 'd4',
    category: 'djs-artists',
    title: 'Kashmir',
    subtitle: 'Subversive rhythms wrapped in green onyx and velvet',
    location: 'FULTON MARKET, CHICAGO',
    image: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&q=80&w=1200',
    year: '2025',
    featured: false,
    tags: ['DecadenceOnDecks', 'OnyxAndAudio', 'FultonMarketFrequencies'],
    badge: 'HEADLINER: @GIANNIBLU',
    badges: ['HEADLINER: @GIANNIBLU', 'OPENER: NEIV.DJ']
  },
  {
    id: 'd2',
    category: 'djs-artists',
    title: 'Chop Shop',
    subtitle: 'Industrial Foundations Met With Unyielding Frequencies',
    location: 'WICKER PARK, CHICAGO',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200',
    year: '2025',
    featured: true,
    tags: ['StrobesAndSteel', 'LowLightLoudRooms', 'GridAndGrit'],
    badge: 'HEADLINER: @TVVIN.OC',
    badges: ['HEADLINER: @TVVIN.OC', 'OPENERS: @ALLIEVERBEKE & @NEIV.DJ']
  },
  {
    id: 'd6',
    category: 'djs-artists',
    title: 'Redline Chicago',
    subtitle: 'Featuring Deep Underground Techno Afterhours Session',
    location: 'WEST LOOP, CHICAGO',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1200',
    year: '2024',
    featured: false,
    tags: ['AfterHours', 'Underground', 'Lasers'],
    badge: 'HEADLINERS: @_HHUNTER_ & @KULAAAA',
    badges: ['HEADLINERS: @_HHUNTER_ & @KULAAAA']
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: 'b1',
    title: 'How to Design Your Wedding Timeline for Golden Hour Perfection',
    excerpt: 'The secret to jaw-dropping, editorial couples portraits lies in planning your itinerary around the Midwest’s beautiful evening golden hour.',
    content: `### Why Golden Hour Matters

Ask any editorial photographer when they prefer to shoot, and they'll answer in unison: **Golden Hour**. This magical window—occurring roughly one hour before sunset—provides the softest, warmest, and most flattering light of the day.

At Guzzi Photography, we believe your wedding day is a once-in-a-lifetime cinematic story. To make sure you get those breathtaking, glowy couple portraits, aligning your wedding timeline with the sun's natural trajectory is essential.

---

### Key Timeline Tips

1. **Calculate the Sunset Time Precisely**
   Sunset times in the Midwest fluctuate wildly. A July sunset in Chicago occurs around 8:30 PM, whereas a November sunset happens by 4:45 PM. Always check the exact sunset time for your specific date and location.

2. **The 45-Minute Window**
   Schedule your dedicated Couples Session to start roughly **45 minutes before** the official sunset time. This gives us the absolute prime light—transitioning from soft golden rays to the warm ambient "blue hour" twilight.

3. **Incorporate a "First Look"**
   If your ceremony is set close to sunset, we highly suggest doing a "First Look" earlier in the afternoon. This ensures we capture all your core family and bridal party portraits in crisp, bright light, leaving the golden hour entirely open for intimate, stress-free couple portraits.

4. **Communicate with Your Coordinator**
   Make sure your caterers and venue coordinator are aware of this timing. Sneaking away from dinner for just 15 minutes during golden hour will yield some of the most romantic, timeless frames in your entire gallery.`,
    category: 'Weddings',
    date: 'June 18, 2026',
    author: 'Luis Guzman',
    readTime: '4 min read',
    coverImage: 'https://images.unsplash.com/photo-1519225495810-7512c696505a?auto=format&fit=crop&q=80&w=1200',
    tags: ['Wedding Advice', 'Golden Hour', 'Timeline Planning']
  },
  {
    id: 'b2',
    title: 'Chicago’s Nightlife Photography: Documenting High-Energy Music Events',
    excerpt: 'Capturing the sweat, the bass, and the neon lasers. Luis shares his techniques for snapping high-end DJ events and underground music sets.',
    content: `### Capturing the Bass and the Light

Photographing artists and DJs isn't just about taking a picture of someone standing behind decks. It's about translating **sound, energy, and atmosphere** into a single, high-intensity visual frame. 

Chicago is the birthplace of house music. From historic underground clubs to modern mega-venues like Radius and Sound-Bar, the energy here is raw, fast, and electric.

---

### My Nightlife Photography Philosophy

* **Embrace the Ambient Light**
  Rather than overpowering the venue's custom laser displays with blinding flash, I prefer to sync with the lighting directors. Capturing the lens flare of a neon laser or the backlighting of a smoke machine adds immense drama and depth to the artist's profile.

* **Motion Blur with Purpose**
  Perfectly frozen shots are clean, but deliberate motion blur conveys speed and rhythm. Using a slow shutter speed combined with a rear-curtain flash sync creates those iconic, high-octane trails of light that make the viewer feel like they are standing in the center of the dance floor.

* **Documenting the Candid BTS**
  Some of the most compelling artist shots happen backstage. The quiet preparation, the adjustment of headphones, the look of anticipation before walking out to a crowd of thousands—these raw, candid moments represent the "grit meets luxury" aesthetic of Guzzi Photography.`,
    category: 'Music & DJs',
    date: 'May 24, 2026',
    author: 'Luis Guzman',
    readTime: '5 min read',
    coverImage: 'https://images.unsplash.com/photo-1516873240891-4bf014598ab4?auto=format&fit=crop&q=80&w=1200',
    tags: ['Nightlife', 'DJ Photography', 'Music Events', 'Behind The Scenes']
  },
  {
    id: 'b3',
    title: 'The Art of Candid Event Photography: Making Corporate Feel Cinematic',
    excerpt: 'Corporate events and high-end galas do not have to feel stuffy. Discover how Guzzi Photography captures real connection, authentic laughs, and premium vibes.',
    content: `### Moving Beyond Staged Group Photos

Too often, corporate event photography consists of stiff, posed line-ups of guests holding champagne flutes. While formal records have their place, the true essence of a luxury gala lies in the **unplanned, candid interactions**.

A genuine laugh, an animated conversation, a focused speaker mid-gesture—these are the emotional anchors that elevate corporate event reporting.

---

### The Guzzi Method for Events

1. **Be the Silent Observer**
   I move through event spaces like a ghost. By using high-end telephoto lenses, I can document authentic laughter and emotional connections without guests even realizing there is a camera pointed their way. This completely avoids the "forced smile" look.

2. **Chasing Editorial Angles**
   We treat an Art Institute gala with the same stylistic respect as a high-fashion runway. Strong architectural symmetry, playing with shadows, and capturing reflective surfaces creates a premium gallery aesthetic.

3. **Post-Processing with Polish**
   Corporate events deserve rich, sophisticated color grading. We apply our signature custom cinematic tones to make every indoor space feel warm, inviting, and extraordinarily high-end.`,
    category: 'Events',
    date: 'April 12, 2026',
    author: 'Luis Guzman',
    readTime: '3 min read',
    coverImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200',
    tags: ['Event Photography', 'Candid', 'Corporate Gala', 'Editorial Style']
  }
];

export const testimonials = [
  {
    id: 't1',
    quote: "Luis captured our Blackstone Hotel wedding, and we were speechless when we saw the gallery. He brought a cinematic, high-fashion vibe that made us look like we belonged in Vogue. His energy during the reception dancing was contagious—he got right in the middle of the dance floor to capture the madness. Absolutely worth every single dollar.",
    author: "Elena & Marcus V.",
    role: "Bride & Groom",
    location: "Chicago, IL",
    rating: 5,
    type: "wedding"
  },
  {
    id: 't2',
    quote: "As a wedding planner, I have worked with hundreds of photographers. Luis is in a class of his own. He is professional, incredibly fast to respond, and has a unique creative eye that stands out in a crowded market. He understands light and handles unpredictable timelines with perfect calm.",
    author: "Samantha Croft",
    role: "Principal Planner, Croft & Co Events",
    location: "Milwaukee, WI",
    rating: 5,
    type: "wedding"
  },
  {
    id: 't3',
    quote: "Luis documented my headline set at Sound-Bar. His ability to capture the energy of the crowd and the lighting of the booth is unparalleled. The photos were delivered in under 48 hours and they are hands down the best press shots I have ever had. The guy is a genius.",
    author: "DJ Alok (Helix)",
    role: "Electronic Music Producer",
    location: "River North, Chicago",
    rating: 5,
    type: "dj-artist"
  },
  {
    id: 't4',
    quote: "We hired Guzzi Photography for our annual museum fundraiser. Not only did he deliver extremely polished, editorial-quality candids, but he was incredibly courteous and professional with our high-net-worth board members. The turnaround time was astonishingly fast.",
    author: "Julian Vance",
    role: "Director of Development, Chicago Art Alliance",
    location: "Chicago, IL",
    rating: 5,
    type: "event"
  },
  {
    id: 't5',
    quote: "Our beachside wedding at the Indiana Dunes was windy and the lighting was harsh, but Luis turned it into an editorial masterpiece. His natural direction made us feel completely relaxed, resulting in photos that feel honest, emotional, and absolutely timeless.",
    author: "Chloe & Julian K.",
    role: "Bride & Groom",
    location: "Indiana Dunes, IN",
    rating: 5,
    type: "wedding"
  },
  {
    id: 't6',
    quote: "Finding a photographer who can shoot both a high-luxury, intimate wedding reception and a high-octane DJ set is almost impossible. Luis Guzman bridges those two worlds perfectly. His low-light and flash-sync work is simply phenomenal.",
    author: "Marcella G.",
    role: "Music Booking Agent & Bride",
    location: "West Loop, Chicago",
    rating: 5,
    type: "dj-artist"
  },
  {
    id: 't7',
    quote: "Luis did our artist branding photos and behind-the-scenes concert shoots. He has a spectacular understanding of music culture and street-level aesthetic. He does not just photograph a DJ; he captures the soul of the Chicago electronic scene.",
    author: "Nora V.",
    role: "Techno Producer & DJ",
    location: "Wicker Park, Chicago",
    rating: 5,
    type: "dj-artist"
  },
  {
    id: 't8',
    quote: "Guzzi Photography is our absolute go-to for all high-end corporate events. Luis has an amazing eye for candid connection. He managed to capture our executives laughing naturally instead of looking stiff. Truly an exceptional artist.",
    author: "Victoria Sterling",
    role: "VP of Brand, Sterling & Chase Tech",
    location: "Chicago, IL",
    rating: 5,
    type: "event"
  },
  {
    id: 't9',
    quote: "If you want photographs that feel alive and emotional rather than robotic and posed, Luis is your photographer. From our initial coffee consultation to the final gallery delivery, he exceeded every expectation. He has become our family photographer for life.",
    author: "Sarah & David L.",
    role: "Bride & Groom",
    location: "Lake Geneva, WI",
    rating: 5,
    type: "wedding"
  },
  {
    id: 't10',
    quote: "We hired Luis for our private launch party in the Gold Coast. He captured the mood, the decor, the fashion, and the crowd with stunning premium aesthetics. Our guests were raving about his friendly, high-end demeanor.",
    author: "Christian Montgomery",
    role: "Luxury Event Organizer",
    location: "Gold Coast, Chicago",
    rating: 5,
    type: "event"
  }
];

export const experienceSteps = [
  {
    step: '01',
    title: 'Inquire & Connect',
    description: 'Fill out our high-converting digital inquiry form. We check our availability for your specific date immediately and schedule a discovery call to hear all about your vision.'
  },
  {
    step: '02',
    title: 'Editorial Consultation',
    description: 'We respond quickly through email to plan your big event, curate your aesthetic mood, and finalize a completely bespoke photography package.'
  },
  {
    step: '03',
    title: 'The Celebration Day',
    description: 'Luis captures your wedding or event using our high-energy, candid, and cinematic approach. We bring perfect calm and a highly organized direction.'
  },
  {
    step: '04',
    title: 'Bespoke Digital Editing',
    description: 'Every single frame is hand-selected and custom-color graded. We apply our signature luxury tone palettes—marrying high contrast urban grit with warm editorial skin tones.'
  },
  {
    step: '05',
    title: 'Luxury Gallery Delivery',
    description: 'Receive your private, high-resolution digital gallery from 48 hours to 5 weeks (Depending on the event). Complete with easy download features, and a premium print shop integration.'
  }
];
